/**
 * Replace tiny Open Library placeholder covers with search API cover IDs.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(root, "js", "books.json");
const data = JSON.parse(readFileSync(path, "utf8"));

const OL_SEARCH = "https://openlibrary.org/search.json";
const UA = { "User-Agent": "bennybooks/1.0 (personal reading site)" };

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function coverBytes(url) {
  const res = await fetch(url, { headers: UA, redirect: "follow" });
  if (!res.ok) return 0;
  const buf = await res.arrayBuffer();
  return buf.byteLength;
}

async function searchCover(title, author) {
  const q = new URLSearchParams({ title, author, limit: "3", fields: "title,author_name,cover_i,isbn" });
  const res = await fetch(`${OL_SEARCH}?${q}`, { headers: UA });
  if (!res.ok) return null;
  const json = await res.json();
  for (const doc of json.docs || []) {
    if (doc.cover_i) {
      return {
        cover: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
        isbn: doc.isbn?.[0],
      };
    }
  }
  return null;
}

let fixed = 0;
for (const book of data.books) {
  const url = book.cover || (book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg` : null);
  if (!url) continue;

  const size = await coverBytes(url);
  if (size > 4000) continue;

  const found = await searchCover(book.title, book.author);
  if (!found) {
    console.warn(`No cover found: ${book.title}`);
    await sleep(250);
    continue;
  }

  const newSize = await coverBytes(found.cover);
  if (newSize > 4000) {
    book.cover = found.cover;
    if (found.isbn && !book.isbn) book.isbn = found.isbn;
    fixed += 1;
    console.log(`Fixed: ${book.title} (${size} → ${newSize} bytes)`);
  } else {
    console.warn(`Still tiny: ${book.title}`);
  }
  await sleep(300);
}

data.updated = new Date().toISOString().slice(0, 10);
writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log(`Fixed ${fixed} covers.`);
