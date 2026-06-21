/**
 * Seed js/books.json from scripts/catalog-data.mjs
 * Run: npm run seed && npm run enrich && node scripts/fix-covers.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { catalogRows } from "./catalog-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "js", "books.json");

function slug(title, author) {
  return `${title}-${author}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** @param {Array<Record<string, unknown>>} rows */
function books(rows) {
  const seen = new Set();
  const out = [];
  for (const [i, row] of rows.entries()) {
    const id = row.id || slug(row.title, row.author);
    if (seen.has(id)) continue;
    seen.add(id);
    const daysAgo = i * 3;
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const dateRead = row.dateRead ?? d.toISOString().slice(0, 10);
    const cover = row.isbn
      ? `https://covers.openlibrary.org/b/isbn/${row.isbn}-L.jpg`
      : undefined;
    out.push({
      id,
      title: row.title,
      author: row.author,
      ...(row.series ? { series: row.series, seriesOrder: row.seriesOrder } : {}),
      pages: row.pages,
      genre: row.genre,
      rating: row.rating ?? null,
      ...(row.isbn ? { isbn: row.isbn, cover } : {}),
      dateRead,
      source: "seed",
    });
  }
  return out;
}

const catalog = books(catalogRows);

const payload = {
  updated: new Date().toISOString().slice(0, 10),
  source: "seed",
  books: catalog,
};

writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Seeded ${catalog.length} books → ${outPath}`);
