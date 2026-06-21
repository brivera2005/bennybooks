const STORAGE_KEY = "bennybooks-ratings";

/** @type {{ updated?: string, source?: string, books: Array<Record<string, unknown>> }} */
let catalog = { books: [] };
let sortMode = "recent";

const els = {
  grid: () => document.getElementById("bookGrid"),
  empty: () => document.getElementById("gridEmpty"),
  bookCount: () => document.getElementById("bookCount"),
  lastUpdated: () => document.getElementById("lastUpdated"),
  avgRating: () => document.getElementById("avgRating"),
  totalPages: () => document.getElementById("totalPages"),
  exportBtn: () => document.getElementById("exportRatings"),
};

function loadRatings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveRating(id, rating) {
  const ratings = loadRatings();
  if (rating <= 0) delete ratings[id];
  else ratings[id] = rating;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}

function getRating(book) {
  const saved = loadRatings()[book.id];
  return saved ?? book.rating ?? book.defaultRating ?? 0;
}

function coverUrl(book) {
  if (book.cover) return book.cover.replace(/-M\.jpg/, "-L.jpg");
  if (book.isbn) return `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;
  return "";
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

function seriesSortKey(book) {
  if (!book.series) return `\uffff${book.title}`;
  const order = Number(book.seriesOrder) || 0;
  return `${book.series}\0${String(order).padStart(4, "0")}\0${book.title}`;
}

function sortedBooks() {
  const books = [...catalog.books];
  if (sortMode === "rating") {
    return books.sort(
      (a, b) => getRating(b) - getRating(a) || (b.dateRead || "").localeCompare(a.dateRead || "")
    );
  }
  if (sortMode === "title") {
    return books.sort((a, b) => String(a.title).localeCompare(String(b.title)));
  }
  if (sortMode === "series") {
    return books.sort(
      (a, b) =>
        seriesSortKey(a).localeCompare(seriesSortKey(b)) ||
        (b.dateRead || "").localeCompare(a.dateRead || "")
    );
  }
  return books.sort((a, b) => (b.dateRead || "").localeCompare(a.dateRead || ""));
}

function starSvg(filled, half) {
  const fill = filled ? "currentColor" : half ? "url(#half)" : "none";
  return `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    ${half ? `<defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs>` : ""}
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="${fill}" stroke="currentColor" stroke-width="1.2"/>
  </svg>`;
}

function renderStars(book) {
  const rating = getRating(book);
  const wrap = document.createElement("div");
  wrap.className = "stars";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", `Rate ${book.title}`);

  for (let i = 1; i <= 5; i += 1) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stars__btn";
    btn.title = `${i} star${i > 1 ? "s" : ""}`;

    const filled = rating >= i;
    const half = rating >= i - 0.5 && rating < i;
    if (filled) btn.classList.add("is-filled");
    if (half) btn.classList.add("is-half");
    btn.innerHTML = starSvg(filled, half);

    btn.addEventListener("click", () => {
      const current = getRating(book);
      let next;
      if (current === i) next = i - 0.5;
      else if (current === i - 0.5) next = 0;
      else next = i;
      saveRating(book.id, next);
      renderGrid();
      updateStats();
    });

    wrap.appendChild(btn);
  }

  const label = document.createElement("span");
  label.className = "stars__value";
  label.textContent = rating > 0 ? rating.toFixed(rating % 1 ? 1 : 0) : "—";
  wrap.appendChild(label);
  return wrap;
}

function fallbackCover(book) {
  const div = document.createElement("div");
  div.className = "book-card__cover book-card__cover--fallback";
  div.textContent = book.title;
  return div;
}

function renderBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";
  card.setAttribute("role", "listitem");

  const coverWrap = document.createElement("div");
  coverWrap.className = "book-card__cover-wrap";

  const url = coverUrl(book);
  if (url) {
    const img = document.createElement("img");
    img.className = "book-card__cover";
    img.src = url;
    img.alt = `Cover of ${book.title}`;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => img.replaceWith(fallbackCover(book)));
    coverWrap.appendChild(img);
  } else {
    coverWrap.appendChild(fallbackCover(book));
  }

  const body = document.createElement("div");
  body.className = "book-card__body";

  const title = document.createElement("h3");
  title.className = "book-card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-card__author";
  author.textContent = book.author;

  const meta = document.createElement("div");
  meta.className = "book-card__meta";
  if (book.pages) {
    const pages = document.createElement("span");
    pages.className = "badge badge--muted";
    pages.textContent = `${book.pages} pp`;
    meta.appendChild(pages);
  }
  if (book.genre) {
    const genre = document.createElement("span");
    genre.className = "badge";
    genre.textContent = book.genre;
    meta.appendChild(genre);
  }
  if (book.series && book.seriesOrder) {
    const series = document.createElement("span");
    series.className = "badge badge--series";
    series.textContent = `${book.series} #${book.seriesOrder}`;
    series.title = book.series;
    meta.appendChild(series);
  }
  if (book.dateRead) {
    const date = document.createElement("span");
    date.className = "badge badge--muted";
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

function updateStats() {
  const books = catalog.books;
  const rated = books.filter((b) => getRating(b) > 0);
  const avg = rated.length
    ? rated.reduce((s, b) => s + getRating(b), 0) / rated.length
    : 0;
  const pages = books.reduce((s, b) => s + (Number(b.pages) || 0), 0);

  els.bookCount().textContent = `${books.length} book${books.length === 1 ? "" : "s"}`;
  els.lastUpdated().textContent = catalog.updated
    ? `Updated ${formatDate(catalog.updated)}`
    : "Updated —";
  els.avgRating().textContent = avg > 0 ? avg.toFixed(1) : "—";
  els.totalPages().textContent = pages > 0 ? pages.toLocaleString() : "—";
}

function renderGrid() {
  const grid = els.grid();
  const empty = els.empty();
  const books = sortedBooks();

  grid.replaceChildren();
  if (!books.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  books.forEach((book) => grid.appendChild(renderBookCard(book)));
  updateStats();
}

function bindSort() {
  document.querySelectorAll(".sort-toggle__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      sortMode = btn.dataset.sort || "recent";
      document.querySelectorAll(".sort-toggle__btn").forEach((el) => {
        const active = el === btn;
        el.classList.toggle("is-active", active);
        el.setAttribute("aria-pressed", String(active));
      });
      renderGrid();
    });
  });
}

function bindNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function bindExport() {
  els.exportBtn()?.addEventListener("click", () => {
    const payload = {
      exported: new Date().toISOString(),
      ratings: loadRatings(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bennybooks-ratings.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

async function init() {
  const res = await fetch("js/books.json");
  if (!res.ok) throw new Error("Failed to load books.json");
  catalog = await res.json();
  bindSort();
  bindNav();
  bindExport();
  renderGrid();
}

init().catch((err) => {
  console.error(err);
  const empty = els.empty();
  empty.hidden = false;
  empty.textContent = "Could not load books. Check js/books.json.";
});
