# Benny Books

Personal reading log — cover grid with genre, page count, and star ratings.

Live at [bennyreads.pages.dev](https://bennyreads.pages.dev).

## Stack

Static HTML/CSS/JS deployed to Cloudflare Pages (same pattern as [benny-black](https://github.com/brivera2005/benny-black)).

## Local preview

```bash
npx serve .
```

## Build & deploy

```bash
npm install
npm run build
npm run deploy
```

Cloudflare Pages settings:

- **Project name:** `bennyreads`
- **Build command:** `npm run build`
- **Build output directory:** `.` (root)

## Updating books

Edit `js/books.json` with your latest reads. Cover URLs can use Open Library (`https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`).

Ratings edited on the site are stored in browser `localStorage` until server sync is added.

## Sync options

- **Storygraph:** Export CSV and map fields into `books.json` (best automated path today).
- **Goodreads:** No public API; manual export or fragile scraping only.
- **Pagebound:** No stable public API yet.
