import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { books } = JSON.parse(readFileSync(join(root, "js", "books.json"), "utf8"));

let ok = 0;
let fail = 0;
const failures = [];

for (const book of books) {
  const url = book.cover || (book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg` : null);
  if (!url) {
    fail += 1;
    failures.push({ title: book.title, reason: "no cover url" });
    continue;
  }
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    const ct = res.headers.get("content-type") || "";
    if (res.ok && ct.includes("image")) ok += 1;
    else {
      fail += 1;
      failures.push({ title: book.title, status: res.status, url });
    }
  } catch (err) {
    fail += 1;
    failures.push({ title: book.title, error: String(err) });
  }
}

console.log(`Covers: ${ok}/${books.length} OK, ${fail} failed`);
if (failures.length) {
  console.log("Failures:");
  failures.forEach((f) => console.log(" -", f.title, f.status || f.reason || f.error));
  process.exit(1);
}
