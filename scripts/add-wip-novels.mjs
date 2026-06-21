/**
 * Append Benjamin's WIP novels to books.json with generated cover SVGs.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { slugify, wipCoverSvg } from "./cover-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const booksPath = join(root, "js", "books.json");
const wipDir = join(root, "assets", "covers", "wip");

const WIP_NOVELS = [
  { title: "Where the Lines Blur", notes: "Prequel to Full Bleed" },
  { title: "Full Bleed", notes: "Literary fiction" },
  { title: "Prose of Cons", notes: "Satirical literary" },
  { title: "Just Another God and Rush", notes: "Mythic contemporary" },
  { title: "The Paper Fugue", notes: "Puzzle-box literary" },
  { title: "The Ceiling", notes: "Psychological thriller" },
  { title: "Zero Copy", notes: "Tech-noir" },
  { title: "Idolware", notes: "Celebrity and media satire" },
  { title: "I For An Eye", notes: "Revenge parable" },
  { title: "Strewn", notes: "Novel (not the game)" },
  { title: "The Last Harvest", notes: "Speculative drama" },
  { title: "mūd", notes: "Experimental prose" },
];

const data = JSON.parse(readFileSync(booksPath, "utf8"));
mkdirSync(wipDir, { recursive: true });

const existing = new Set(data.books.map((b) => b.id));
let added = 0;

for (const novel of WIP_NOVELS) {
  const id = `${slugify(novel.title)}-benjamin`;
  if (existing.has(id)) continue;

  const coverRel = `assets/covers/wip/${slugify(novel.title)}.svg`;
  writeFileSync(join(root, coverRel), wipCoverSvg(novel.title), "utf8");

  data.books.unshift({
    id,
    title: novel.title,
    author: "Benjamin",
    genre: "WIP Novel",
    status: "wip",
    notes: novel.notes,
    cover: coverRel,
    source: "wip",
  });
  added += 1;
}

data.updated = new Date().toISOString().slice(0, 10);
writeFileSync(booksPath, JSON.stringify(data, null, 2) + "\n");
console.log(`Added ${added} WIP novels (${WIP_NOVELS.length} total defined).`);
