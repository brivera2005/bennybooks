import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const books = JSON.parse(readFileSync(join(root, "js", "books.json"), "utf8"));

if (!Array.isArray(books.books) || books.books.length === 0) {
  console.error("books.json must include a non-empty books array.");
  process.exit(1);
}

console.log(`Benny Books: validated ${books.books.length} titles.`);
