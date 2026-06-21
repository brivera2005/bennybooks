const RATINGS_KEY = 'bennybooks-ratings';

/** @typedef {{ id: string, title: string, author: string, pages?: number, genre?: string, rating?: number, cover?: string, isbn?: string, dateRead?: string, source?: string }} Book */

/** @type {Book[]} */
let books = [];
let sortMode = 'recent';

const els = {
  grid: document.getElementById('bookGrid'),
  empty: document.getElementById('gridEmpty'),
  bookCount: document.getElementById('bookCount'),
  lastUpdated: document.getElementById('lastUpdated'),
  avgRating: document.getElementById('avgRating'),
  totalPages: document.getElementById('totalPages'),
  exportBtn: document.getElementById('exportRatings'),
  sortBtns: document.querySelectorAll('.sort-toggle__btn'),
  navToggle: document.querySelector('.nav__toggle'),
  navLinks: document.querySelector('.nav__links'),
};

function slugify(title, author) {
  return `${title}-${author}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function loadLocalRatings() {
  try {
    return JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveLocalRating(id, rating) {
  const map = loadLocalRatings();
  if (rating <= 0) delete map[id];
  else map[id] = rating;
  localStorage.setItem(RATINGS_KEY, JSON.stringify(map));
}

function getRating(book) {
  const local = loadLocalRatings()[book.id];
  if (local != null) return local;
  return book.rating ?? 0;
}

function coverUrl(book) {
  if (book.cover) return book.cover;
  if (book.isbn) return `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`;
  return '';
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

function sortBooks(list) {
  const copy = [...list];
  if (sortMode === 'recent') {
    copy.sort((a, b) => (b.dateRead || '').localeCompare(a.dateRead || ''));
  } else if (sortMode === 'rating') {
    copy.sort((a, b) => getRating(b) - getRating(a) || (b.dateRead || '').localeCompare(a.dateRead || ''));
  } else {
    copy.sort((a, b) => a.title.localeCompare(b.title));
  }
  return copy;
}

function starSvg(filled, half) {
  const fill = filled ? 'currentColor' : half ? 'url(#half)' : 'none';
  return `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    ${half ? `<defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs>` : ''}
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="${fill}" stroke="currentColor" stroke-width="1.2"/>
  </svg>`;
}

function renderStars(book) {
  const rating = getRating(book);
  const wrap = document.createElement('div');
  wrap.className = 'stars';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', `Rate ${book.title}`);

  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'stars__btn';
    btn.dataset.star = String(i);
    btn.title = `${i} star${i > 1 ? 's' : ''} (click again for half)`;

    const filled = rating >= i;
    const half = rating >= i - 0.5 && rating < i;
    if (filled) btn.classList.add('is-filled');
    if (half) btn.classList.add('is-half');
    btn.innerHTML = starSvg(filled, half);

    btn.addEventListener('click', () => {
      const current = getRating(book);
      let next;
      if (current === i) next = i - 0.5;
      else if (current === i - 0.5) next = 0;
      else next = i;
      saveLocalRating(book.id, next);
      render();
    });

    wrap.appendChild(btn);
  }

  const label = document.createElement('span');
  label.className = 'stars__value';
  label.textContent = rating > 0 ? rating.toFixed(rating % 1 ? 1 : 0) : '—';
  wrap.appendChild(label);
  return wrap;
}

function renderBookCard(book) {
  const card = document.createElement('article');
  card.className = 'book-card';
  card.setAttribute('role', 'listitem');

  const coverWrap = document.createElement('div');
  coverWrap.className = 'book-card__cover-wrap';

  const url = coverUrl(book);
  if (url) {
    const img = document.createElement('img');
    img.className = 'book-card__cover';
    img.src = url;
    img.alt = `Cover of ${book.title}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      img.replaceWith(fallbackCover(book));
    });
    coverWrap.appendChild(img);
  } else {
    coverWrap.appendChild(fallbackCover(book));
  }

  const body = document.createElement('div');
  body.className = 'book-card__body';

  const title = document.createElement('h3');
  title.className = 'book-card__title';
  title.textContent = book.title;

  const author = document.createElement('p');
  author.className = 'book-card__author';
  author.textContent = book.author;

  const meta = document.createElement('div');
  meta.className = 'book-card__meta';
  if (book.pages) {
    const pages = document.createElement('span');
    pages.className = 'badge badge--muted';
    pages.textContent = `${book.pages} pp`;
    meta.appendChild(pages);
  }
  if (book.genre) {
    const genre = document.createElement('span');
    genre.className = 'badge';
    genre.textContent = book.genre;
    meta.appendChild(genre);
  }
  if (book.dateRead) {
    const date = document.createElement('span');
    date.className = 'badge badge--muted';
    date.textContent = formatDate(book.dateRead);
    meta.appendChild(date);
  }

  body.appendChild(title);
  body.appendChild(author);
  body.appendChild(meta);
  body.appendChild(renderStars(book));

  card.appendChild(coverWrap);
  card.appendChild(body);
  return card;
}

function fallbackCover(book) {
  const div = document.createElement('div');
  div.className = 'book-card__cover book-card__cover--fallback';
  div.textContent = book.title;
  return div;
}

function updateStats(meta) {
  const rated = books.filter((b) => getRating(b) > 0);
  const avg = rated.length
    ? rated.reduce((s, b) => s + getRating(b), 0) / rated.length
    : 0;
  const pages = books.reduce((s, b) => s + (b.pages || 0), 0);

  els.bookCount.textContent = `${books.length} book${books.length === 1 ? '' : 's'}`;
  els.lastUpdated.textContent = meta?.updated
    ? `Updated ${formatDate(meta.updated)}`
    : 'Updated —';
  els.avgRating.textContent = avg > 0 ? avg.toFixed(1) : '—';
  els.totalPages.textContent = pages > 0 ? pages.toLocaleString() : '—';
}

function render() {
  const sorted = sortBooks(books);
  els.grid.replaceChildren();
  if (!sorted.length) {
    els.empty.hidden = false;
    return;
  }
  els.empty.hidden = true;
  sorted.forEach((book) => els.grid.appendChild(renderBookCard(book)));
  updateStats(window.__booksMeta);
}

async function loadBooks() {
  const res = await fetch('js/books.json');
  if (!res.ok) throw new Error('Failed to load books.json');
  const data = await res.json();
  window.__booksMeta = { updated: data.updated, source: data.source };
  books = (data.books || []).map((b) => ({
    ...b,
    id: b.id || slugify(b.title, b.author),
  }));
  render();
}

els.sortBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    sortMode = btn.dataset.sort || 'recent';
    els.sortBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    render();
  });
});

els.exportBtn?.addEventListener('click', () => {
  const payload = {
    exported: new Date().toISOString(),
    ratings: loadLocalRatings(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'bennybooks-ratings.json';
  a.click();
  URL.revokeObjectURL(a.href);
});

els.navToggle?.addEventListener('click', () => {
  const open = els.navToggle.getAttribute('aria-expanded') === 'true';
  els.navToggle.setAttribute('aria-expanded', String(!open));
  els.navLinks?.classList.toggle('is-open', !open);
});

loadBooks().catch((err) => {
  console.error(err);
  els.empty.hidden = false;
  els.empty.textContent = 'Could not load books. Check js/books.json.';
});
