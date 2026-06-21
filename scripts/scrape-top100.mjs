/**
 * Fetch Fantasy Book Review top-100 list titles/authors.
 * Run: node scripts/scrape-top100.mjs
 * Output: scripts/top100-fantasy.json (reference for catalog-data.mjs)
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = "https://www.fantasybookreview.co.uk/top-100-fantasy-books/";

const res = await fetch(URL, {
  headers: { "User-Agent": "bennybooks/1.0 (personal reading site)" },
});
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
const html = await res.text();

/** @type {Array<{ rank: number, title: string, author: string }>} */
const entries = [];
const patterns = [
  /###\s+(\d+)\.\s+(.+?)\s+by\s+(.+?)(?:\s*\n|<)/g,
  /<h3[^>]*>\s*(\d+)\.\s+(.+?)\s+by\s+(.+?)<\/h3>/gi,
];
for (const re of patterns) {
  let m;
  while ((m = re.exec(html)) !== null) {
    entries.push({
      rank: Number(m[1]),
      title: m[2].trim().replace(/&#039;/g, "'"),
      author: m[3].trim(),
    });
  }
}
entries.sort((a, b) => b.rank - a.rank);
const deduped = [];
const seen = new Set();
for (const e of entries) {
  const key = `${e.rank}:${e.title}`;
  if (seen.has(key)) continue;
  seen.add(key);
  deduped.push(e);
}

const outPath = join(__dirname, "top100-fantasy.json");
writeFileSync(outPath, JSON.stringify({ fetched: new Date().toISOString(), count: deduped.length, entries: deduped }, null, 2) + "\n");
console.log(`Scraped ${deduped.length} titles → ${outPath}`);
