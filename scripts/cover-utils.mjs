/**
 * Shared cover lookup and validation helpers.
 */
export const UA = { "User-Agent": "bennybooks/1.0 (personal reading site)" };
export const MIN_COVER_BYTES = 4000;

const OL_SEARCH = "https://openlibrary.org/search.json";

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function coverBytes(url) {
  if (!url) return 0;
  try {
    const res = await fetch(url, { headers: UA, redirect: "follow" });
    if (!res.ok) return 0;
    const buf = await res.arrayBuffer();
    return buf.byteLength;
  } catch {
    return 0;
  }
}

export function coverUrl(book) {
  return book.cover || (book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg` : null);
}

export async function validateCover(url) {
  const size = await coverBytes(url);
  return size >= MIN_COVER_BYTES ? size : 0;
}

async function olSearch(params) {
  const q = new URLSearchParams({ limit: "5", fields: "title,author_name,cover_i,isbn,olid", ...params });
  const res = await fetch(`${OL_SEARCH}?${q}`, { headers: UA });
  if (!res.ok) return [];
  const json = await res.json();
  return json.docs || [];
}

function docCover(doc) {
  if (!doc?.cover_i) return null;
  return {
    cover: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
    isbn: doc.isbn?.[0],
  };
}

export async function findOpenLibraryCover(book) {
  const tries = [
    { title: book.title, author: book.author },
    { title: book.title },
    book.isbn ? { isbn: book.isbn } : null,
    book.isbn ? { q: book.isbn } : null,
  ].filter(Boolean);

  for (const params of tries) {
    const docs = await olSearch(params);
    for (const doc of docs) {
      const hit = docCover(doc);
      if (!hit) continue;
      const size = await validateCover(hit.cover);
      if (size) return { ...hit, bytes: size };
    }
    await sleep(150);
  }
  return null;
}

export async function findGoogleBooksCover(book) {
  const queries = [
    book.isbn ? `isbn:${book.isbn}` : null,
    `intitle:${book.title} inauthor:${book.author}`,
    book.title,
  ].filter(Boolean);

  for (const q of queries) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=3`;
    const res = await fetch(url, { headers: UA });
    if (!res.ok) continue;
    const json = await res.json();
    for (const item of json.items || []) {
      const links = item.volumeInfo?.imageLinks;
      if (!links) continue;
      const raw = links.extraLarge || links.large || links.medium || links.thumbnail || links.smallThumbnail;
      if (!raw) continue;
      const cover = raw.replace(/^http:/, "https:").replace(/&zoom=\d+/, "&zoom=0").replace(/=zoom:\d+/, "=zoom:0");
      const size = await validateCover(cover);
      if (size) return { cover, bytes: size, isbn: item.volumeInfo?.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier };
    }
    await sleep(150);
  }
  return null;
}

export function slugify(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function wipCoverSvg(title, subtitle = "WIP · Benjamin") {
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > 16 && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  const display = lines.slice(0, 4);

  const titleLines = display
    .map((l, i) => `<tspan x="100" dy="${i === 0 ? "0" : "1.15em"}">${esc(l)}</tspan>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="50%" stop-color="#14b8a6"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feBlend in="SourceGraphic" mode="multiply" opacity="0.08"/>
    </filter>
  </defs>
  <rect width="400" height="600" fill="url(#bg)"/>
  <rect width="400" height="600" filter="url(#noise)" opacity="0.35"/>
  <rect x="24" y="24" width="352" height="552" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2" rx="8"/>
  <text x="100" y="260" fill="#ecfdf5" font-family="Georgia, serif" font-size="28" font-weight="700" text-anchor="middle">
    ${titleLines}
  </text>
  <text x="200" y="480" fill="rgba(236,253,245,0.85)" font-family="system-ui,sans-serif" font-size="14" letter-spacing="0.12em" text-anchor="middle">${esc(subtitle)}</text>
  <text x="200" y="540" fill="rgba(236,253,245,0.5)" font-family="system-ui,sans-serif" font-size="11" text-anchor="middle">COMING SOON</text>
</svg>`;
}
