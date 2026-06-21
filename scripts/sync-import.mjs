#!/usr/bin/env node
/**
 * Import Storygraph or Goodreads CSV exports into js/books.json.
 *
 * Usage:
 *   node scripts/sync-import.mjs path/to/export.csv
 *   node scripts/sync-import.mjs path/to/export.csv --enrich
 *   node scripts/sync-import.mjs imports/storygraph.csv --limit 48
 *
 * Storygraph: Account → Manage Account → Export StoryGraph Library
 * Goodreads:  My Books → Import and export → Export Library
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { enrichBooks } from './enrich-openlibrary.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'js', 'books.json');

const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith('--'));
const shouldEnrich = args.includes('--enrich');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : null;

if (!csvPath) {
  console.error('Usage: node scripts/sync-import.mjs <export.csv> [--enrich] [--limit=N]');
  process.exit(1);
}

const absCsv = resolve(csvPath);
if (!existsSync(absCsv)) {
  console.error(`File not found: ${absCsv}`);
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || (c === '\r' && next === '\n')) {
      row.push(field);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = '';
      if (c === '\r') i++;
    } else {
      field += c;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }

  if (!rows.length) return [];

  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cells) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (cells[i] ?? '').trim();
    });
    return obj;
  });
}

function slugify(title, author) {
  return `${title}-${author}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function detectFormat(headers) {
  const set = new Set(headers);
  if (set.has('Read Status') && set.has('ISBN/UID')) return 'storygraph';
  if (set.has('Exclusive Shelf') && set.has('My Rating')) return 'goodreads';
  return 'unknown';
}

function parseStorygraphRow(row) {
  const status = (row['Read Status'] || '').toLowerCase();
  if (status !== 'read') return null;

  const rating = parseFloat(row['Star Rating']) || 0;
  const isbnRaw = row['ISBN/UID'] || '';
  const isbn = isbnRaw.replace(/[^0-9X]/gi, '') || undefined;

  let dateRead = row['Last Date Read'] || '';
  const datesRead = row['Dates Read'] || '';
  if (!dateRead && datesRead.includes('-')) {
    dateRead = datesRead.split('-').pop()?.trim() || '';
  }

  const tags = (row['Tags'] || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const genre = tags[0] || row['Moods']?.split(',')[0]?.trim() || '';

  return {
    id: slugify(row['Title'], row['Authors']),
    title: row['Title'],
    author: row['Authors'],
    pages: 0,
    genre: genre || undefined,
    rating: rating || undefined,
    isbn,
    dateRead: normalizeDate(dateRead),
    source: 'storygraph',
  };
}

function parseGoodreadsRow(row) {
  const shelf = (row['Exclusive Shelf'] || '').toLowerCase();
  if (shelf !== 'read') return null;

  const rating = parseInt(row['My Rating'], 10) || 0;
  const isbn = (row['ISBN13'] || row['ISBN'] || '').replace(/=/g, '').replace(/"/g, '').trim() || undefined;
  const pages = parseInt(row['Number of Pages'], 10) || 0;

  const shelves = (row['Bookshelves'] || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const genre = shelves.find((s) => !['read', 'to-read', 'currently-reading'].includes(s.toLowerCase()));

  return {
    id: slugify(row['Title'], row['Author']),
    title: row['Title'],
    author: row['Author'],
    pages: pages || undefined,
    genre: genre || undefined,
    rating: rating || undefined,
    isbn,
    dateRead: normalizeDate(row['Date Read'] || row['Date Added']),
    source: 'goodreads',
  };
}

function normalizeDate(raw) {
  if (!raw) return undefined;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function coverFromIsbn(isbn) {
  if (!isbn) return undefined;
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
}

async function main() {
  const text = readFileSync(absCsv, 'utf8');
  const rows = parseCsv(text);
  if (!rows.length) {
    console.error('CSV appears empty.');
    process.exit(1);
  }

  const headers = Object.keys(rows[0]);
  const format = detectFormat(headers);
  console.log(`Detected format: ${format} (${rows.length} rows)`);

  if (format === 'unknown') {
    console.error('Unrecognized CSV headers. Expected Storygraph or Goodreads export.');
    console.error('Headers:', headers.join(', '));
    process.exit(1);
  }

  const parser = format === 'storygraph' ? parseStorygraphRow : parseGoodreadsRow;
  let books = rows.map(parser).filter(Boolean);

  books.sort((a, b) => (b.dateRead || '').localeCompare(a.dateRead || ''));
  if (limit && limit > 0) books = books.slice(0, limit);

  books = books.map((b) => ({
    ...b,
    cover: coverFromIsbn(b.isbn),
  }));

  if (shouldEnrich) {
    console.log('Enriching via Open Library (this may take a minute)...');
    books = await enrichBooks(books);
  }

  const payload = {
    updated: new Date().toISOString().slice(0, 10),
    source: format,
    books,
  };

  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Wrote ${books.length} books to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
