/**
 * Seed js/books.json with ~100 curated fantasy / sci-fi / booktok titles.
 * Run: node scripts/seed-catalog.mjs && node scripts/enrich-openlibrary.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "js", "books.json");

function slug(title, author) {
  return `${title}-${author}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** @param {Array<Record<string, unknown>>} rows */
function books(rows) {
  return rows.map((row, i) => {
    const id = row.id || slug(row.title, row.author);
    const daysAgo = i * 3;
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const dateRead = row.dateRead ?? d.toISOString().slice(0, 10);
    const cover = row.isbn
      ? `https://covers.openlibrary.org/b/isbn/${row.isbn}-L.jpg`
      : undefined;
    return {
      id,
      title: row.title,
      author: row.author,
      ...(row.series ? { series: row.series, seriesOrder: row.seriesOrder } : {}),
      pages: row.pages,
      genre: row.genre,
      rating: row.rating ?? null,
      ...(row.isbn ? { isbn: row.isbn, cover } : {}),
      dateRead,
      source: "seed",
    };
  });
}

const catalog = books([
  // —— Red Rising ——
  { title: "Red Rising", author: "Pierce Brown", series: "Red Rising", seriesOrder: 1, pages: 388, genre: "Science Fiction", isbn: "9780345539786", rating: 5 },
  { title: "Golden Son", author: "Pierce Brown", series: "Red Rising", seriesOrder: 2, pages: 466, genre: "Science Fiction", isbn: "9780345539823", rating: 5 },
  { title: "Morning Star", author: "Pierce Brown", series: "Red Rising", seriesOrder: 3, pages: 525, genre: "Science Fiction", isbn: "9780345539847", rating: 5 },
  { title: "Iron Gold", author: "Pierce Brown", series: "Red Rising", seriesOrder: 4, pages: 602, genre: "Science Fiction", isbn: "9780425285962", rating: 4.5 },
  { title: "Dark Age", author: "Pierce Brown", series: "Red Rising", seriesOrder: 5, pages: 704, genre: "Science Fiction", isbn: "9781984819885", rating: 4.5 },
  { title: "Light Bringer", author: "Pierce Brown", series: "Red Rising", seriesOrder: 6, pages: 688, genre: "Science Fiction", isbn: "9781984819205", rating: 4.5 },

  // —— Empyrean (Fourth Wing) ——
  { title: "Fourth Wing", author: "Rebecca Yarros", series: "The Empyrean", seriesOrder: 1, pages: 517, genre: "Fantasy", isbn: "9781649374042", rating: 4.5 },
  { title: "Iron Flame", author: "Rebecca Yarros", series: "The Empyrean", seriesOrder: 2, pages: 623, genre: "Fantasy", isbn: "9781649374172", rating: 4.5 },
  { title: "Onyx Storm", author: "Rebecca Yarros", series: "The Empyrean", seriesOrder: 3, pages: 544, genre: "Fantasy", isbn: "9781649376961", rating: 4 },

  // —— ACOTAR ——
  { title: "A Court of Thorns and Roses", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 1, pages: 419, genre: "Fantasy", isbn: "9781619634442", rating: 4 },
  { title: "A Court of Mist and Fury", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 2, pages: 624, genre: "Fantasy", isbn: "9781619634466", rating: 4.5 },
  { title: "A Court of Wings and Ruin", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 3, pages: 699, genre: "Fantasy", isbn: "9781681196283", rating: 4.5 },
  { title: "A Court of Frost and Starlight", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 4, pages: 272, genre: "Fantasy", isbn: "9781681196825", rating: 3.5 },
  { title: "A Court of Silver Flames", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 5, pages: 757, genre: "Fantasy", isbn: "9781681196351", rating: 4 },

  // —— Throne of Glass ——
  { title: "Throne of Glass", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 1, pages: 404, genre: "Fantasy", isbn: "9781619630321", rating: 4 },
  { title: "Crown of Midnight", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 2, pages: 420, genre: "Fantasy", isbn: "9781619630314", rating: 4 },
  { title: "Heir of Fire", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 3, pages: 576, genre: "Fantasy", isbn: "9781619630642", rating: 4.5 },
  { title: "Queen of Shadows", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 4, pages: 648, genre: "Fantasy", isbn: "9781619636095", rating: 4.5 },
  { title: "Empire of Storms", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 5, pages: 733, genre: "Fantasy", isbn: "9781619633766", rating: 4.5 },
  { title: "Tower of Dawn", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 6, pages: 672, genre: "Fantasy", isbn: "9781619638570", rating: 4 },
  { title: "Kingdom of Ash", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 7, pages: 984, genre: "Fantasy", isbn: "9781619638587", rating: 5 },

  // —— Stormlight Archive ——
  { title: "The Way of Kings", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 1, pages: 1007, genre: "Fantasy", isbn: "9780765326355", rating: 5 },
  { title: "Words of Radiance", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 2, pages: 1087, genre: "Fantasy", isbn: "9780765326379", rating: 5 },
  { title: "Oathbringer", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 3, pages: 1248, genre: "Fantasy", isbn: "9780765326386", rating: 5 },
  { title: "Rhythm of War", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 4, pages: 1232, genre: "Fantasy", isbn: "9780765326423", rating: 4.5 },
  { title: "Wind and Truth", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 5, pages: 1344, genre: "Fantasy", isbn: "9781250319182", rating: 4.5 },

  // —— Mistborn Era 1 ——
  { title: "The Final Empire", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 1, pages: 541, genre: "Fantasy", isbn: "9780765350388", rating: 5 },
  { title: "The Well of Ascension", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 2, pages: 592, genre: "Fantasy", isbn: "9780765350395", rating: 4.5 },
  { title: "The Hero of Ages", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 3, pages: 572, genre: "Fantasy", isbn: "9780765350401", rating: 5 },

  // —— Kingkiller ——
  { title: "The Name of the Wind", author: "Patrick Rothfuss", series: "Kingkiller Chronicle", seriesOrder: 1, pages: 662, genre: "Fantasy", isbn: "9780756404741", rating: 5 },
  { title: "The Wise Man's Fear", author: "Patrick Rothfuss", series: "Kingkiller Chronicle", seriesOrder: 2, pages: 994, genre: "Fantasy", isbn: "9780756404758", rating: 5 },

  // —— Poppy War ——
  { title: "The Poppy War", author: "R.F. Kuang", series: "The Poppy War", seriesOrder: 1, pages: 544, genre: "Fantasy", isbn: "9780062662598", rating: 5 },
  { title: "The Dragon Republic", author: "R.F. Kuang", series: "The Poppy War", seriesOrder: 2, pages: 658, genre: "Fantasy", isbn: "9780062662628", rating: 4.5 },
  { title: "The Burning God", author: "R.F. Kuang", series: "The Poppy War", seriesOrder: 3, pages: 640, genre: "Fantasy", isbn: "9780062662642", rating: 4.5 },

  // —— Sun Eater ——
  { title: "Empire of Silence", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 1, pages: 753, genre: "Science Fiction", isbn: "9780756413026", rating: 4.5 },
  { title: "Howling Dark", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 2, pages: 704, genre: "Science Fiction", isbn: "9780756415891", rating: 4.5 },
  { title: "Demon in White", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 3, pages: 768, genre: "Science Fiction", isbn: "9780756415907", rating: 4.5 },
  { title: "Kingdoms of Death", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 4, pages: 768, genre: "Science Fiction", isbn: "9780593496319", rating: 4 },

  // —— Broken Earth ——
  { title: "The Fifth Season", author: "N.K. Jemisin", series: "The Broken Earth", seriesOrder: 1, pages: 512, genre: "Fantasy", isbn: "9780316229296", rating: 5 },
  { title: "The Obelisk Gate", author: "N.K. Jemisin", series: "The Broken Earth", seriesOrder: 2, pages: 448, genre: "Fantasy", isbn: "9780316229265", rating: 5 },
  { title: "The Stone Sky", author: "N.K. Jemisin", series: "The Broken Earth", seriesOrder: 3, pages: 464, genre: "Fantasy", isbn: "9780316229241", rating: 5 },

  // —— Murderbot ——
  { title: "All Systems Red", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 1, pages: 158, genre: "Science Fiction", isbn: "9781250215620", rating: 5 },
  { title: "Artificial Condition", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 2, pages: 158, genre: "Science Fiction", isbn: "9781250186920", rating: 4.5 },
  { title: "Rogue Protocol", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 3, pages: 158, genre: "Science Fiction", isbn: "9781250191788", rating: 4.5 },
  { title: "Exit Strategy", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 4, pages: 176, genre: "Science Fiction", isbn: "9781250191789", rating: 4.5 },
  { title: "Network Effect", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 5, pages: 350, genre: "Science Fiction", isbn: "9781250229864", rating: 5 },
  { title: "Fugitive Telemetry", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 6, pages: 168, genre: "Science Fiction", isbn: "9781250765376", rating: 4 },
  { title: "System Collapse", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 7, pages: 256, genre: "Science Fiction", isbn: "9781250826978", rating: 4.5 },

  // —— Hyperion Cantos ——
  { title: "Hyperion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 1, pages: 482, genre: "Science Fiction", isbn: "9780553283686", rating: 5 },
  { title: "The Fall of Hyperion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 2, pages: 517, genre: "Science Fiction", isbn: "9780553287486", rating: 5 },
  { title: "Endymion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 3, pages: 563, genre: "Science Fiction", isbn: "9780553572967", rating: 4 },
  { title: "The Rise of Endymion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 4, pages: 709, genre: "Science Fiction", isbn: "9780553572981", rating: 4 },

  // —— The Expanse ——
  { title: "Leviathan Wakes", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 1, pages: 577, genre: "Science Fiction", isbn: "9780316129084", rating: 5 },
  { title: "Caliban's War", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 2, pages: 595, genre: "Science Fiction", isbn: "9781841499900", rating: 4.5 },
  { title: "Abaddon's Gate", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 3, pages: 539, genre: "Science Fiction", isbn: "9780316129077", rating: 4.5 },
  { title: "Cibola Burn", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 4, pages: 581, genre: "Science Fiction", isbn: "9780316217620", rating: 4 },
  { title: "Nemesis Games", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 5, pages: 536, genre: "Science Fiction", isbn: "9780316217590", rating: 4.5 },
  { title: "Babylon's Ashes", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 6, pages: 532, genre: "Science Fiction", isbn: "9780316217569", rating: 4.5 },
  { title: "Persepolis Rising", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 7, pages: 560, genre: "Science Fiction", isbn: "9780316332874", rating: 4.5 },
  { title: "Tiamat's Wrath", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 8, pages: 534, genre: "Science Fiction", isbn: "9780316332913", rating: 4.5 },
  { title: "Leviathan Falls", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 9, pages: 528, genre: "Science Fiction", isbn: "9780316462203", rating: 5 },

  // —— Dune (original trilogy) ——
  { title: "Dune", author: "Frank Herbert", series: "Dune", seriesOrder: 1, pages: 688, genre: "Science Fiction", isbn: "9780441172719", rating: 5 },
  { title: "Dune Messiah", author: "Frank Herbert", series: "Dune", seriesOrder: 2, pages: 331, genre: "Science Fiction", isbn: "9780441172696", rating: 4 },
  { title: "Children of Dune", author: "Frank Herbert", series: "Dune", seriesOrder: 3, pages: 444, genre: "Science Fiction", isbn: "9780441104027", rating: 4 },

  // —— Three-Body Problem ——
  { title: "The Three-Body Problem", author: "Liu Cixin", series: "Remembrance of Earth's Past", seriesOrder: 1, pages: 400, genre: "Science Fiction", isbn: "9780765377068", rating: 5 },
  { title: "The Dark Forest", author: "Liu Cixin", series: "Remembrance of Earth's Past", seriesOrder: 2, pages: 512, genre: "Science Fiction", isbn: "9780765377082", rating: 5 },
  { title: "Death's End", author: "Liu Cixin", series: "Remembrance of Earth's Past", seriesOrder: 3, pages: 604, genre: "Science Fiction", isbn: "9780765377105", rating: 4.5 },

  // —— Crescent City ——
  { title: "House of Earth and Blood", author: "Sarah J. Maas", series: "Crescent City", seriesOrder: 1, pages: 803, genre: "Fantasy", isbn: "9781635574041", rating: 4 },
  { title: "House of Flame and Shadow", author: "Sarah J. Maas", series: "Crescent City", seriesOrder: 2, pages: 816, genre: "Fantasy", isbn: "9781635574096", rating: 4 },

  // —— Shadow and Bone ——
  { title: "Shadow and Bone", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 1, pages: 358, genre: "Fantasy", isbn: "9780805094599", rating: 4 },
  { title: "Siege and Storm", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 2, pages: 429, genre: "Fantasy", isbn: "9780805094605", rating: 4 },
  { title: "Ruin and Rising", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 3, pages: 416, genre: "Fantasy", isbn: "9780805094612", rating: 4 },
  { title: "Six of Crows", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 4, pages: 465, genre: "Fantasy", isbn: "9781627792127", rating: 5 },
  { title: "Crooked Kingdom", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 5, pages: 536, genre: "Fantasy", isbn: "9781627792134", rating: 5 },

  // —— Standalone sci-fi classics & hits ——
  { title: "Project Hail Mary", author: "Andy Weir", pages: 496, genre: "Science Fiction", isbn: "9780593135204", rating: 5 },
  { title: "The Martian", author: "Andy Weir", pages: 369, genre: "Science Fiction", isbn: "9780553418026", rating: 5 },
  { title: "Neuromancer", author: "William Gibson", pages: 271, genre: "Science Fiction", isbn: "9780441569595", rating: 4.5 },
  { title: "Foundation", author: "Isaac Asimov", pages: 255, genre: "Science Fiction", isbn: "9780553293357", rating: 4.5 },
  { title: "Ender's Game", author: "Orson Scott Card", pages: 324, genre: "Science Fiction", isbn: "9780812550702", rating: 4.5 },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", pages: 304, genre: "Science Fiction", isbn: "9780441478122", rating: 5 },
  { title: "Ready Player One", author: "Ernest Cline", pages: 374, genre: "Science Fiction", isbn: "9780307887443", rating: 4 },

  // —— Booktok & contemporary fantasy hits ——
  { title: "Icebreaker", author: "Hannah Grace", pages: 356, genre: "Romance", isbn: "9781668025599", rating: 4 },
  { title: "House of Salt and Sorrows", author: "Erin A. Craig", pages: 416, genre: "Fantasy", isbn: "9780525575627", rating: 4 },
  { title: "Verity", author: "Colleen Hoover", pages: 336, genre: "Thriller", isbn: "9781791392712", rating: 4 },
  { title: "It Ends with Us", author: "Colleen Hoover", pages: 384, genre: "Romance", isbn: "9781501110368", rating: 4 },
  { title: "The Song of Achilles", author: "Madeline Miller", pages: 416, genre: "Fantasy", isbn: "9780062060624", rating: 5 },
  { title: "Circe", author: "Madeline Miller", pages: 393, genre: "Fantasy", isbn: "9780316556323", rating: 5 },
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", pages: 400, genre: "Historical Fiction", isbn: "9781501161933", rating: 4.5 },
  { title: "Babel", author: "R.F. Kuang", pages: 545, genre: "Fantasy", isbn: "9780063021426", rating: 5 },
  { title: "The Priory of the Orange Tree", author: "Samantha Shannon", pages: 848, genre: "Fantasy", isbn: "9781635570296", rating: 4.5 },
  { title: "The House in the Cerulean Sea", author: "TJ Klune", pages: 394, genre: "Fantasy", isbn: "9781250217360", rating: 5 },
  { title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab", pages: 448, genre: "Fantasy", isbn: "9781250759468", rating: 4.5 },
  { title: "The Midnight Library", author: "Matt Haig", pages: 304, genre: "Fantasy", isbn: "9780525559474", rating: 4 },
  { title: "Jade City", author: "Fonda Lee", series: "Green Bone Saga", seriesOrder: 1, pages: 560, genre: "Fantasy", isbn: "9780316449400", rating: 4.5 },
  { title: "The Blade Itself", author: "Joe Abercrombie", series: "The First Law", seriesOrder: 1, pages: 515, genre: "Fantasy", isbn: "9780316387313", rating: 4.5 },
  { title: "Before They Are Hanged", author: "Joe Abercrombie", series: "The First Law", seriesOrder: 2, pages: 441, genre: "Fantasy", isbn: "9780316387320", rating: 4.5 },
  { title: "Last Argument of Kings", author: "Joe Abercrombie", series: "The First Law", seriesOrder: 3, pages: 534, genre: "Fantasy", isbn: "9780316387337", rating: 4.5 },
  { title: "A Darker Shade of Magic", author: "V.E. Schwab", series: "Shades of Magic", seriesOrder: 1, pages: 400, genre: "Fantasy", isbn: "9780765376468", rating: 4 },
  { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", pages: 224, genre: "Science Fiction", isbn: "9780345391804", rating: 5 },
  { title: "Yellowface", author: "R.F. Kuang", pages: 319, genre: "Literary Fiction", isbn: "9780063250831", rating: 4 },
]);

const payload = {
  updated: new Date().toISOString().slice(0, 10),
  source: "seed",
  books: catalog,
};

writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Seeded ${catalog.length} books → ${outPath}`);
