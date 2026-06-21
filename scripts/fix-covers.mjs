/**
 * Fix missing or tiny covers using Open Library → iTunes Search API.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { coverBytes, resolveCover, sleep } from "./cover-sources.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(root, "js", "books.json");
const data = JSON.parse(readFileSync(path, "utf8"));

let fixed = 0;
let itunesFixed = 0;

for (const book of data.books) {
  const url = book.cover || (book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg` : null);
  let size = 0;
  try {
    size = url ? await coverBytes(url) : 0;
  } catch {
    size = 0;
  }
  if (size > 4000) continue;

  let cover;
  let source;
  try {
    ({ cover, source } = await resolveCover(book));
  } catch (err) {
    console.warn(`Error resolving ${book.title}: ${err.message || err}`);
    await sleep(500);
    continue;
  }
  const before = book.cover;
  if (!cover || cover === before) {
    console.warn(`No cover found: ${book.title}`);
    await sleep(250);
    continue;
  }

  book.cover = cover;
  if (source === "itunes") {
    book.coverSource = "itunes";
    itunesFixed += 1;
  }
  fixed += 1;
  const newSize = await coverBytes(cover);
  console.log(`Fixed (${source}): ${book.title} (${size} → ${newSize} bytes)`);
  await sleep(300);
}

data.updated = new Date().toISOString().slice(0, 10);
writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log(`Fixed ${fixed} covers (${itunesFixed} via iTunes).`);
