const STORAGE_KEY = "bennybooks-ratings";

let catalog = { books: [] };
let sortMode = "recent";

function loadRatings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveRating(id, rating) {
  const ratings = loadRatings();
  ratings[id] = rating;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}

function getRating(book) {
  const saved = loadRatings()[book.id];
  return saved ?? book.rating ?? book.defaultRating ?? 0;
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

function starMarkup(rating, interactive, bookId) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    const filled = rating >= i;
    const half = !filled && rating >= i - 0.5;
    const cls = ["star", filled ? "is-filled" : "", half ? "is-half" : ""]
      .filter(Boolean)
      .join(" ");
    stars.push(
      `<button type="button" class="${cls}" data-star="${i}" ${
        interactive ? `data-book="${bookId}" aria-label="Rate ${i} of 5"` : "tabindex=-1 aria-hidden=true"
      }>${half ? "★" : filled ? "★" : "☆"}</button>`
    );
  }
  return `<span class="rating" role="${interactive ? "group" : "img"}" ${
    interactive ? `aria-label="Your rating"` : `aria-label="${rating} out of 5 stars"`
  }>${stars.join("")}<span class="rating__value">${rating ? rating.toFixed(1) : "—"}</span></span>`;
}

function sortedBooks() {
  const books = [...catalog.books];
  if (sortMode === "rating") {
    return books.sort((a, b) => getRating(b) - getRating(a));
  }
  return books.sort((a, b) => (b.dateRead || "").localeCompare(a.dateRead || ""));
}

function renderGrid() {
  const grid = document.getElementById("bookGrid");
  const count = document.getElementById("bookCount");
  const books = sortedBooks();
  count.textContent = `${books.length} books read`;

  grid.innerHTML = books
    .map((book) => {
      const rating = getRating(book);
      return `
        <article class="book-card" role="listitem" data-id="${book.id}">
          <div class="book-card__cover-wrap">
            <img class="book-card__cover" src="${book.cover}" alt="" loading="lazy" width="240" height="360">
          </div>
          <div class="book-card__body">
            <p class="book-card__genre">${book.genre}</p>
            <h3 class="book-card__title">${book.title}</h3>
            <p class="book-card__author">${book.author}</p>
            <ul class="book-card__meta">
              <li>${book.pages} pages</li>
              <li>Read ${formatDate(book.dateRead)}</li>
            </ul>
            <div class="book-card__rating">
              <span class="book-card__rating-label">My rating</span>
              ${starMarkup(rating, true, book.id)}
            </div>
          </div>
        </article>`;
    })
    .join("");

  grid.querySelectorAll(".star[data-book]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const bookId = event.currentTarget.dataset.book;
      const star = Number(event.currentTarget.dataset.star);
      const rect = event.currentTarget.getBoundingClientRect();
      const half = event.clientX - rect.left < rect.width / 2;
      const value = half ? star - 0.5 : star;
      saveRating(bookId, value);
      renderGrid();
    });
  });
}

function bindSort() {
  document.querySelectorAll(".sort-toggle__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      sortMode = btn.dataset.sort;
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

async function init() {
  const res = await fetch("js/books.json");
  catalog = await res.json();
  bindSort();
  bindNav();
  renderGrid();
}

init();
