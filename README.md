# Benny Books

Personal reading wall — cover grid with pages, genre, and editable star ratings. Linked from [brivera2005/brivera2005](https://github.com/brivera2005/brivera2005) GitHub profile.

Static site (same stack as [benny-black](https://github.com/brivera2005/benny-black)): HTML + CSS + vanilla JS, deployed to Cloudflare Pages.

## Local preview

```bash
npx serve .
# or
python -m http.server 8080
```

Open `http://localhost:8080`.

## Sync your library

### What actually works (honest assessment)

| Source | Auto API? | Practical sync path |
|--------|-----------|---------------------|
| **Storygraph** | No official public API (roadmap item, not shipped) | **CSV export** — best option. Account → Manage Account → Export StoryGraph Library |
| **Goodreads** | API deprecated since Dec 2020; no new keys | **CSV export** — My Books → Import and export → Export Library |
| **Pagebound** | No export API; import-only from GR/SG CSV | Not a sync source — use Storygraph or Goodreads instead |
| **Open Library** | Free REST API | Metadata enrichment (covers, pages, subjects/genre) |
| **Google Books** | Free API (API key optional for higher limits) | Fallback enrichment; not wired in MVP but easy to add |

**Recommended workflow:** Export Storygraph CSV monthly (or on each finished book), run the import script, commit `js/books.json`. Optional GitHub Action auto-imports when you drop a CSV in `imports/`.

### Manual import (one command)

1. Export from Storygraph or Goodreads (see table above).
2. Save the file anywhere, e.g. `imports/storygraph.csv`.
3. Run:

```bash
node scripts/sync-import.mjs imports/storygraph.csv --enrich
```

`--enrich` calls Open Library for page counts, genres, and cover URLs (Storygraph CSV often lacks pages/genre).

Options:

- `--limit=48` — keep only the N most recently read books (good for a “latest reads” grid).
- Omit `--enrich` for a fast import using ISBN cover URLs only.

### Automatic updates (GitHub Action)

1. Push this repo to GitHub.
2. Drop your latest export at `imports/storygraph.csv` (any `*.csv` in `imports/` works).
3. Push — the [sync-books workflow](.github/workflows/sync-books.yml) runs on `imports/*.csv` changes.
4. Or trigger manually: Actions → Sync books from CSV → Run workflow.

The workflow commits updated `js/books.json`. Cloudflare Pages redeploys on push.

### Site ratings vs tracker ratings

- **Tracker rating** comes from CSV (`Star Rating` / `My Rating`).
- **On-site edits** are stored in **localStorage** per browser (click stars for half-star steps).
- Use **Export local ratings** on the site to download JSON; merge into `books.json` manually if you want published ratings.

## Project structure

```
bennybooks/
├── index.html          # Landing + book grid
├── css/style.css       # Teal dark theme (matches GitHub profile)
├── js/
│   ├── books.js        # Grid, sort, editable stars
│   └── books.json      # Data file (committed after sync)
├── scripts/
│   ├── sync-import.mjs       # Storygraph / Goodreads CSV → books.json
│   └── enrich-openlibrary.mjs
├── imports/            # Drop CSV exports here (gitignored contents optional)
└── .github/workflows/sync-books.yml
```

## Deploy to Cloudflare Pages

Same as Benny Black:

```bash
npx wrangler pages deploy . --project-name=bennybooks
```

Or connect the GitHub repo in Cloudflare Dashboard → Workers & Pages → Create → Connect to Git. Build command: *(empty)*. Output directory: `/`.

Live at: `https://bennybooks.pages.dev` (configured in `package.json` deploy script). Custom domain optional.

## Deploy to GitHub Pages

Enable Pages on the repo: Settings → Pages → Source: Deploy from branch → `main` / root.

## Adding books manually

Edit `js/books.json`:

```json
{
  "id": "unique-slug",
  "title": "Book Title",
  "author": "Author Name",
  "pages": 300,
  "genre": "Literary Fiction",
  "rating": 4.5,
  "cover": "https://covers.openlibrary.org/b/isbn/978XXXXXXXXXX-M.jpg",
  "isbn": "978XXXXXXXXXX",
  "dateRead": "2026-06-01",
  "source": "manual"
}
```

Run `node scripts/enrich-openlibrary.mjs` to fill missing metadata.

## License

Site code MIT. Book covers/metadata belong to respective publishers and Open Library.
