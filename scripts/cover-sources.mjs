/**
 * Cover resolution: Open Library → iTunes Search API → none.
 * iTunes uses the same backend as bendodson.com/projects/itunes-artwork-finder/.
 */

const OL_SEARCH = "https://openlibrary.org/search.json";
const OL_BOOKS = "https://openlibrary.org/api/books";
const ITUNES_SEARCH = "https://itunes.apple.com/search";
const UA = { "User-Agent": "bennybooks/1.0 (personal reading site)" };
const MIN_COVER_BYTES = 4000;

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url) {
  try {
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function coverBytes(url) {
  try {
    const res = await fetch(url, { headers: UA, redirect: "follow", signal: AbortSignal.timeout(15000) });
    if (!res.ok) return 0;
    const buf = await res.arrayBuffer();
    return buf.byteLength;
  } catch {
    return 0;
  }
}

export async function isValidCover(url) {
  if (!url) return false;
  return (await coverBytes(url)) > MIN_COVER_BYTES;
}

/** Upscale mzstatic artwork (100x100bb → 1000x1000bb). */
export function upscaleItunesArtwork(url) {
  if (!url) return undefined;
  return url.replace(/\d+x\d+bb/, "1000x1000bb");
}

export async function lookupItunesCover(title, author) {
  const term = [title, author].filter(Boolean).join(" ");
  const params = new URLSearchParams({
    term,
    entity: "ebook",
    limit: "5",
  });
  const data = await fetchJson(`${ITUNES_SEARCH}?${params}`);
  if (!data?.results?.length) return null;

  const titleNorm = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const authorNorm = (author || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  for (const hit of data.results) {
    const hitTitle = (hit.trackName || hit.collectionName || "").toLowerCase();
    const hitAuthor = (hit.artistName || "").toLowerCase();
    const titleMatch =
      hitTitle.includes(titleNorm) ||
      titleNorm.includes(hitTitle.replace(/[^a-z0-9]+/g, " ").trim());
    const authorMatch =
      !authorNorm || hitAuthor.includes(authorNorm.split(" ")[0]) || authorNorm.includes(hitAuthor);
    if (!titleMatch || !authorMatch) continue;

    const raw = hit.artworkUrl100 || hit.artworkUrl60;
    if (!raw) continue;
    const cover = upscaleItunesArtwork(raw);
    if (await isValidCover(cover)) return { cover, source: "itunes" };
  }

  const fallback = data.results[0];
  const raw = fallback?.artworkUrl100 || fallback?.artworkUrl60;
  if (!raw) return null;
  const cover = upscaleItunesArtwork(raw);
  if (await isValidCover(cover)) return { cover, source: "itunes" };
  return null;
}

async function lookupOlByIsbn(isbn) {
  const data = await fetchJson(`${OL_BOOKS}?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
  const entry = data?.[`ISBN:${isbn}`];
  if (!entry) return null;
  const cover =
    entry.cover?.large ||
    entry.cover?.medium?.replace(/-M\.jpg/, "-L.jpg") ||
    undefined;
  return cover ? { cover, source: "openlibrary" } : null;
}

async function lookupOlByTitleAuthor(title, author) {
  const q = new URLSearchParams({ title, author, limit: "3", fields: "title,author_name,cover_i" });
  const data = await fetchJson(`${OL_SEARCH}?${q}`);
  for (const doc of data?.docs || []) {
    if (!doc.cover_i) continue;
    const cover = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
    if (await isValidCover(cover)) return { cover, source: "openlibrary" };
  }
  return null;
}

/**
 * Resolve a cover URL: validate existing → Open Library → iTunes.
 * @returns {{ cover?: string, source?: string }}
 */
export async function resolveCover(book) {
  const candidates = [
    book.cover,
    book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg` : null,
  ].filter(Boolean);

  for (const url of candidates) {
    if (await isValidCover(url)) return { cover: url, source: "openlibrary" };
  }

  if (book.isbn) {
    const fromIsbn = await lookupOlByIsbn(book.isbn);
    if (fromIsbn) return fromIsbn;
  }

  const fromSearch = await lookupOlByTitleAuthor(book.title, book.author);
  if (fromSearch) return fromSearch;

  const fromItunes = await lookupItunesCover(book.title, book.author);
  if (fromItunes) return fromItunes;

  return {};
}
