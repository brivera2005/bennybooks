import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { coverUrl, MIN_COVER_BYTES, validateCover } from "./cover-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { books } = JSON.parse(readFileSync(join(root, "js", "books.json"), "utf8"));

let ok = 0;
let fail = 0;
const failures = [];

for (const book of books) {
  const url = coverUrl(book);
  if (!url) {
    fail += 1;
    failures.push({ title: book.title, reason: "no cover url" });
    continue;
  }
  try {
    const size = url.startsWith("assets/") ? MIN_COVER_BYTES : await validateCover(url);
    if (size >= MIN_COVER_BYTES) ok += 1;
    else {
      fail += 1;
      failures.push({ title: book.title, bytes: size, url });
    }
  } catch (err) {
    fail += 1;
    failures.push({ title: book.title, error: String(err) });
  }
}

console.log(`Covers: ${ok}/${books.length} OK, ${fail} failed (min ${MIN_COVER_BYTES} bytes)`);
if (failures.length) {
  console.log("Failures:");
  failures.forEach((f) => console.log(" -", f.title, f.bytes ?? f.reason ?? f.error, f.url || ""));
  process.exit(1);
}
