/**
 * Enrich book records with pages, genre, and cover from Open Library.
 * Used by sync-import.mjs --enrich and enrich-openlibrary.mjs CLI.
 */

const OL_SEARCH = 'https://openlibrary.org/search.json';
const OL_BOOKS = 'https://openlibrary.org/api/books';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'bennybooks/1.0 (personal reading site)' },
  });
  if (!res.ok) return null;
  return res.json();
}

function pickGenre(subjects = []) {
  const skip = new Set(['fiction', 'nonfiction', 'accessible book', 'protected daisy']);
  for (const s of subjects) {
    const lower = String(s).toLowerCase();
    if (!skip.has(lower) && lower.length > 2) return String(s);
  }
  return subjects[0] ? String(subjects[0]) : undefined;
}

async function lookupByIsbn(isbn) {
  const data = await fetchJson(`${OL_BOOKS}?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
  if (!data) return null;
  const entry = data[`ISBN:${isbn}`];
  if (!entry) return null;
  return {
    pages: entry.number_of_pages || undefined,
    genre: pickGenre(entry.subjects?.map((s) => s.name || s)),
    cover: entry.cover?.large || entry.cover?.medium?.replace(/-M\.jpg/, "-L.jpg") || undefined,
  };
}

async function lookupByTitleAuthor(title, author) {
  const q = new URLSearchParams({ title, author, limit: '1' });
  const data = await fetchJson(`${OL_SEARCH}?${q}`);
  const doc = data?.docs?.[0];
  if (!doc) return null;
  return {
    pages: doc.number_of_pages_median || undefined,
    genre: pickGenre(doc.subject),
    cover: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : undefined,
    isbn: doc.isbn?.[0],
  };
}

export async function enrichBook(book) {
  let meta = null;
  if (book.isbn) meta = await lookupByIsbn(book.isbn);
  if (!meta) meta = await lookupByTitleAuthor(book.title, book.author);
  if (!meta) return book;

  return {
    ...book,
    pages: book.pages || meta.pages || undefined,
    genre: book.genre || meta.genre || undefined,
    cover: book.cover || meta.cover || undefined,
    isbn: book.isbn || meta.isbn || undefined,
  };
}

export async function enrichBooks(books, { delayMs = 300 } = {}) {
  const out = [];
  for (const book of books) {
    out.push(await enrichBook(book));
    await sleep(delayMs);
  }
  return out;
}

// CLI: node scripts/enrich-openlibrary.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isMain) {
  const path = join(__dirname, '..', 'js', 'books.json');
  const data = JSON.parse(readFileSync(path, 'utf8'));
  data.books = await enrichBooks(data.books || []);
  data.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log(`Enriched ${data.books.length} books in ${path}`);
}
