/**
 * Master catalog — fantasy top 100, full author series, booktok & sci-fi classics.
 * Used by seed-catalog.mjs
 */

export const catalogRows = [
  // ═══ Red Rising (Pierce Brown) ═══
  { title: "Red Rising", author: "Pierce Brown", series: "Red Rising", seriesOrder: 1, pages: 388, genre: "Science Fiction", isbn: "9780345539786", rating: 5 },
  { title: "Golden Son", author: "Pierce Brown", series: "Red Rising", seriesOrder: 2, pages: 466, genre: "Science Fiction", isbn: "9780345539823", rating: 5 },
  { title: "Morning Star", author: "Pierce Brown", series: "Red Rising", seriesOrder: 3, pages: 525, genre: "Science Fiction", isbn: "9780345539847", rating: 5 },
  { title: "Iron Gold", author: "Pierce Brown", series: "Red Rising", seriesOrder: 4, pages: 602, genre: "Science Fiction", isbn: "9780425285962", rating: 4.5 },
  { title: "Dark Age", author: "Pierce Brown", series: "Red Rising", seriesOrder: 5, pages: 704, genre: "Science Fiction", isbn: "9781984819885", rating: 4.5 },
  { title: "Light Bringer", author: "Pierce Brown", series: "Red Rising", seriesOrder: 6, pages: 688, genre: "Science Fiction", isbn: "9781984819205", rating: 4.5 },
  { title: "Red God", author: "Pierce Brown", series: "Red Rising", seriesOrder: 7, pages: 800, genre: "Science Fiction", rating: null },

  // ═══ Stormlight Archive (Brandon Sanderson) ═══
  { title: "The Way of Kings", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 1, pages: 1007, genre: "Fantasy", isbn: "9780765326355", rating: 5 },
  { title: "Words of Radiance", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 2, pages: 1087, genre: "Fantasy", isbn: "9780765326379", rating: 5 },
  { title: "Oathbringer", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 3, pages: 1248, genre: "Fantasy", isbn: "9780765326386", rating: 5 },
  { title: "Rhythm of War", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 4, pages: 1232, genre: "Fantasy", isbn: "9780765326423", rating: 4.5 },
  { title: "Wind and Truth", author: "Brandon Sanderson", series: "The Stormlight Archive", seriesOrder: 5, pages: 1344, genre: "Fantasy", isbn: "9781250319182", rating: 4.5 },

  // ═══ Mistborn (Brandon Sanderson) ═══
  { title: "The Final Empire", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 1, pages: 541, genre: "Fantasy", isbn: "9780765350388", rating: 5 },
  { title: "The Well of Ascension", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 2, pages: 592, genre: "Fantasy", isbn: "9780765350395", rating: 4.5 },
  { title: "The Hero of Ages", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 3, pages: 572, genre: "Fantasy", isbn: "9780765350401", rating: 5 },
  { title: "The Alloy of Law", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 4, pages: 325, genre: "Fantasy", isbn: "9780765330427", rating: 4.5 },
  { title: "Shadows of Self", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 5, pages: 376, genre: "Fantasy", isbn: "9780765379853", rating: 4.5 },
  { title: "The Bands of Mourning", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 6, pages: 455, genre: "Fantasy", isbn: "9780765379938", rating: 4 },
  { title: "The Lost Metal", author: "Brandon Sanderson", series: "Mistborn", seriesOrder: 7, pages: 507, genre: "Fantasy", isbn: "9781250319656", rating: 4.5 },

  // ═══ Cosmere standalones & Secret Projects (Sanderson) ═══
  { title: "Elantris", author: "Brandon Sanderson", series: "Cosmere", seriesOrder: 1, pages: 638, genre: "Fantasy", isbn: "9780765371024", rating: 4 },
  { title: "Warbreaker", author: "Brandon Sanderson", series: "Cosmere", seriesOrder: 2, pages: 688, genre: "Fantasy", isbn: "9780765360035", rating: 4.5 },
  { title: "Tress of the Emerald Sea", author: "Brandon Sanderson", series: "Secret Projects", seriesOrder: 1, pages: 381, genre: "Fantasy", isbn: "9781938570075", rating: 4.5 },
  { title: "Yumi and the Nightmare Painter", author: "Brandon Sanderson", series: "Secret Projects", seriesOrder: 2, pages: 480, genre: "Fantasy", isbn: "9781938570334", rating: 4.5 },
  { title: "The Sunlit Man", author: "Brandon Sanderson", series: "Secret Projects", seriesOrder: 3, pages: 528, genre: "Science Fiction", isbn: "9781938570389", rating: 4 },

  // ═══ Skyward (Brandon Sanderson) ═══
  { title: "Skyward", author: "Brandon Sanderson", series: "Skyward", seriesOrder: 1, pages: 513, genre: "Science Fiction", isbn: "9780399555764", rating: 4.5 },
  { title: "Starsight", author: "Brandon Sanderson", series: "Skyward", seriesOrder: 2, pages: 461, genre: "Science Fiction", isbn: "9780399555771", rating: 4.5 },
  { title: "Cytonic", author: "Brandon Sanderson", series: "Skyward", seriesOrder: 3, pages: 416, genre: "Science Fiction", isbn: "9780399555795", rating: 4 },
  { title: "Defiant", author: "Brandon Sanderson", series: "Skyward", seriesOrder: 4, pages: 432, genre: "Science Fiction", isbn: "9780593700940", rating: 4 },

  // ═══ The Reckoners (Sanderson) ═══
  { title: "Steelheart", author: "Brandon Sanderson", series: "The Reckoners", seriesOrder: 1, pages: 386, genre: "Science Fiction", isbn: "9780385743563", rating: 4 },
  { title: "Firefight", author: "Brandon Sanderson", series: "The Reckoners", seriesOrder: 2, pages: 416, genre: "Science Fiction", isbn: "9780385743594", rating: 4 },
  { title: "Calamity", author: "Brandon Sanderson", series: "The Reckoners", seriesOrder: 3, pages: 424, genre: "Science Fiction", isbn: "9780385743600", rating: 4 },

  // ═══ First Law (Joe Abercrombie) ═══
  { title: "The Blade Itself", author: "Joe Abercrombie", series: "The First Law", seriesOrder: 1, pages: 515, genre: "Fantasy", isbn: "9780316387313", rating: 4.5 },
  { title: "Before They Are Hanged", author: "Joe Abercrombie", series: "The First Law", seriesOrder: 2, pages: 441, genre: "Fantasy", isbn: "9780316387320", rating: 4.5 },
  { title: "Last Argument of Kings", author: "Joe Abercrombie", series: "The First Law", seriesOrder: 3, pages: 534, genre: "Fantasy", isbn: "9780316387337", rating: 4.5 },

  // ═══ First Law standalones (Joe Abercrombie) ═══
  { title: "Best Served Cold", author: "Joe Abercrombie", series: "First Law World", seriesOrder: 1, pages: 534, genre: "Fantasy", isbn: "9780316048428", rating: 4.5 },
  { title: "The Heroes", author: "Joe Abercrombie", series: "First Law World", seriesOrder: 2, pages: 581, genre: "Fantasy", isbn: "9780316123354", rating: 4.5 },
  { title: "Red Country", author: "Joe Abercrombie", series: "First Law World", seriesOrder: 3, pages: 479, genre: "Fantasy", isbn: "9780316214441", rating: 4.5 },

  // ═══ Age of Madness (Joe Abercrombie) ═══
  { title: "A Little Hatred", author: "Joe Abercrombie", series: "The Age of Madness", seriesOrder: 1, pages: 480, genre: "Fantasy", isbn: "9780316187165", rating: 4.5 },
  { title: "The Trouble with Peace", author: "Joe Abercrombie", series: "The Age of Madness", seriesOrder: 2, pages: 528, genre: "Fantasy", isbn: "9780316187196", rating: 4.5 },
  { title: "The Wisdom of Crowds", author: "Joe Abercrombie", series: "The Age of Madness", seriesOrder: 3, pages: 560, genre: "Fantasy", isbn: "9780316187226", rating: 4 },

  // ═══ The Devils (Joe Abercrombie — new series) ═══
  { title: "The Devils", author: "Joe Abercrombie", series: "The Devils", seriesOrder: 1, pages: 576, genre: "Fantasy", isbn: "9781250880062", rating: null },

  // ═══ R.F. Kuang ═══
  { title: "The Poppy War", author: "R.F. Kuang", series: "The Poppy War", seriesOrder: 1, pages: 544, genre: "Fantasy", isbn: "9780062662598", rating: 5 },
  { title: "The Dragon Republic", author: "R.F. Kuang", series: "The Poppy War", seriesOrder: 2, pages: 658, genre: "Fantasy", isbn: "9780062662628", rating: 4.5 },
  { title: "The Burning God", author: "R.F. Kuang", series: "The Poppy War", seriesOrder: 3, pages: 640, genre: "Fantasy", isbn: "9780062662642", rating: 4.5 },
  { title: "Babel", author: "R.F. Kuang", pages: 545, genre: "Fantasy", isbn: "9780063021426", rating: 5 },
  { title: "Yellowface", author: "R.F. Kuang", pages: 319, genre: "Literary Fiction", isbn: "9780063250831", rating: 4 },
  { title: "Katabasis", author: "R.F. Kuang", pages: 560, genre: "Fantasy", isbn: "9780063446243", rating: null },

  // ═══ John Gwynne — Faithful and Fallen ═══
  { title: "Malice", author: "John Gwynne", series: "The Faithful and the Fallen", seriesOrder: 1, pages: 672, genre: "Fantasy", isbn: "9780330544467", rating: 4.5 },
  { title: "Valour", author: "John Gwynne", series: "The Faithful and the Fallen", seriesOrder: 2, pages: 736, genre: "Fantasy", isbn: "9780330544481", rating: 4.5 },
  { title: "Ruin", author: "John Gwynne", series: "The Faithful and the Fallen", seriesOrder: 3, pages: 768, genre: "Fantasy", isbn: "9780330544504", rating: 4.5 },
  { title: "Wrath", author: "John Gwynne", series: "The Faithful and the Fallen", seriesOrder: 4, pages: 768, genre: "Fantasy", isbn: "9780330544528", rating: 5 },

  // ═══ John Gwynne — Of Blood and Bone ═══
  { title: "A Time of Dread", author: "John Gwynne", series: "Of Blood and Bone", seriesOrder: 1, pages: 480, genre: "Fantasy", isbn: "9781509812932", rating: 4.5 },
  { title: "A Time of Blood", author: "John Gwynne", series: "Of Blood and Bone", seriesOrder: 2, pages: 512, genre: "Fantasy", isbn: "9781509812956", rating: 4.5 },
  { title: "A Time of Courage", author: "John Gwynne", series: "Of Blood and Bone", seriesOrder: 3, pages: 544, genre: "Fantasy", isbn: "9781509812970", rating: 4.5 },

  // ═══ John Gwynne — Bloodsworn Saga ═══
  { title: "The Shadow of the Gods", author: "John Gwynne", series: "Bloodsworn Saga", seriesOrder: 1, pages: 480, genre: "Fantasy", isbn: "9780356510665", rating: 4.5 },
  { title: "The Hunger of the Gods", author: "John Gwynne", series: "Bloodsworn Saga", seriesOrder: 2, pages: 512, genre: "Fantasy", isbn: "9780356510689", rating: 4.5 },
  { title: "The Fury of the Gods", author: "John Gwynne", series: "Bloodsworn Saga", seriesOrder: 3, pages: 544, genre: "Fantasy", isbn: "9780356510719", rating: 4.5 },

  // ═══ Andy Weir ═══
  { title: "The Martian", author: "Andy Weir", pages: 369, genre: "Science Fiction", isbn: "9780553418026", rating: 5 },
  { title: "Project Hail Mary", author: "Andy Weir", pages: 496, genre: "Science Fiction", isbn: "9780593135204", rating: 5 },
  { title: "Artemis", author: "Andy Weir", pages: 305, genre: "Science Fiction", isbn: "9780553448122", rating: 3.5 },

  // ═══ M. L. Wang ═══
  { title: "Blood Over Bright Haven", author: "M. L. Wang", pages: 448, genre: "Fantasy", isbn: "9780593873373", rating: 4.5 },

  // ═══ Empyrean (Rebecca Yarros) ═══
  { title: "Fourth Wing", author: "Rebecca Yarros", series: "The Empyrean", seriesOrder: 1, pages: 517, genre: "Fantasy", isbn: "9781649374042", rating: 4.5 },
  { title: "Iron Flame", author: "Rebecca Yarros", series: "The Empyrean", seriesOrder: 2, pages: 623, genre: "Fantasy", isbn: "9781649374172", rating: 4.5 },
  { title: "Onyx Storm", author: "Rebecca Yarros", series: "The Empyrean", seriesOrder: 3, pages: 544, genre: "Fantasy", isbn: "9781649376961", rating: 4 },

  // ═══ ACOTAR ═══
  { title: "A Court of Thorns and Roses", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 1, pages: 419, genre: "Fantasy", isbn: "9781619634442", rating: 4 },
  { title: "A Court of Mist and Fury", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 2, pages: 624, genre: "Fantasy", isbn: "9781619634466", rating: 4.5 },
  { title: "A Court of Wings and Ruin", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 3, pages: 699, genre: "Fantasy", isbn: "9781681196283", rating: 4.5 },
  { title: "A Court of Frost and Starlight", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 4, pages: 272, genre: "Fantasy", isbn: "9781681196825", rating: 3.5 },
  { title: "A Court of Silver Flames", author: "Sarah J. Maas", series: "ACOTAR", seriesOrder: 5, pages: 757, genre: "Fantasy", isbn: "9781681196351", rating: 4 },

  // ═══ Throne of Glass ═══
  { title: "Throne of Glass", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 1, pages: 404, genre: "Fantasy", isbn: "9781619630321", rating: 4 },
  { title: "Crown of Midnight", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 2, pages: 420, genre: "Fantasy", isbn: "9781619630314", rating: 4 },
  { title: "Heir of Fire", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 3, pages: 576, genre: "Fantasy", isbn: "9781619630642", rating: 4.5 },
  { title: "Queen of Shadows", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 4, pages: 648, genre: "Fantasy", isbn: "9781619636095", rating: 4.5 },
  { title: "Empire of Storms", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 5, pages: 733, genre: "Fantasy", isbn: "9781619633766", rating: 4.5 },
  { title: "Tower of Dawn", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 6, pages: 672, genre: "Fantasy", isbn: "9781619638570", rating: 4 },
  { title: "Kingdom of Ash", author: "Sarah J. Maas", series: "Throne of Glass", seriesOrder: 7, pages: 984, genre: "Fantasy", isbn: "9781619638587", rating: 5 },

  // ═══ Crescent City ═══
  { title: "House of Earth and Blood", author: "Sarah J. Maas", series: "Crescent City", seriesOrder: 1, pages: 803, genre: "Fantasy", isbn: "9781635574041", rating: 4 },
  { title: "House of Flame and Shadow", author: "Sarah J. Maas", series: "Crescent City", seriesOrder: 2, pages: 816, genre: "Fantasy", isbn: "9781635574096", rating: 4 },

  // ═══ Kingkiller ═══
  { title: "The Name of the Wind", author: "Patrick Rothfuss", series: "Kingkiller Chronicle", seriesOrder: 1, pages: 662, genre: "Fantasy", isbn: "9780756404741", rating: 5 },
  { title: "The Wise Man's Fear", author: "Patrick Rothfuss", series: "Kingkiller Chronicle", seriesOrder: 2, pages: 994, genre: "Fantasy", isbn: "9780756404758", rating: 5 },

  // ═══ Sun Eater ═══
  { title: "Empire of Silence", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 1, pages: 753, genre: "Science Fiction", isbn: "9780756413026", rating: 4.5 },
  { title: "Howling Dark", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 2, pages: 704, genre: "Science Fiction", isbn: "9780756415891", rating: 4.5 },
  { title: "Demon in White", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 3, pages: 768, genre: "Science Fiction", isbn: "9780756415907", rating: 4.5 },
  { title: "Kingdoms of Death", author: "Christopher Ruocchio", series: "Sun Eater", seriesOrder: 4, pages: 768, genre: "Science Fiction", isbn: "9780593496319", rating: 4 },

  // ═══ Broken Earth ═══
  { title: "The Fifth Season", author: "N.K. Jemisin", series: "The Broken Earth", seriesOrder: 1, pages: 512, genre: "Fantasy", isbn: "9780316229296", rating: 5 },
  { title: "The Obelisk Gate", author: "N.K. Jemisin", series: "The Broken Earth", seriesOrder: 2, pages: 448, genre: "Fantasy", isbn: "9780316229265", rating: 5 },
  { title: "The Stone Sky", author: "N.K. Jemisin", series: "The Broken Earth", seriesOrder: 3, pages: 464, genre: "Fantasy", isbn: "9780316229241", rating: 5 },

  // ═══ Murderbot ═══
  { title: "All Systems Red", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 1, pages: 158, genre: "Science Fiction", isbn: "9781250215620", rating: 5 },
  { title: "Artificial Condition", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 2, pages: 158, genre: "Science Fiction", isbn: "9781250186920", rating: 4.5 },
  { title: "Rogue Protocol", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 3, pages: 158, genre: "Science Fiction", isbn: "9781250191788", rating: 4.5 },
  { title: "Exit Strategy", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 4, pages: 176, genre: "Science Fiction", isbn: "9781250191789", rating: 4.5 },
  { title: "Network Effect", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 5, pages: 350, genre: "Science Fiction", isbn: "9781250229864", rating: 5 },
  { title: "Fugitive Telemetry", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 6, pages: 168, genre: "Science Fiction", isbn: "9781250765376", rating: 4 },
  { title: "System Collapse", author: "Martha Wells", series: "Murderbot Diaries", seriesOrder: 7, pages: 256, genre: "Science Fiction", isbn: "9781250826978", rating: 4.5 },

  // ═══ Hyperion Cantos ═══
  { title: "Hyperion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 1, pages: 482, genre: "Science Fiction", isbn: "9780553283686", rating: 5 },
  { title: "The Fall of Hyperion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 2, pages: 517, genre: "Science Fiction", isbn: "9780553287486", rating: 5 },
  { title: "Endymion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 3, pages: 563, genre: "Science Fiction", isbn: "9780553572967", rating: 4 },
  { title: "The Rise of Endymion", author: "Dan Simmons", series: "Hyperion Cantos", seriesOrder: 4, pages: 709, genre: "Science Fiction", isbn: "9780553572981", rating: 4 },

  // ═══ The Expanse ═══
  { title: "Leviathan Wakes", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 1, pages: 577, genre: "Science Fiction", isbn: "9780316129084", rating: 5 },
  { title: "Caliban's War", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 2, pages: 595, genre: "Science Fiction", isbn: "9781841499900", rating: 4.5 },
  { title: "Abaddon's Gate", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 3, pages: 539, genre: "Science Fiction", isbn: "9780316129077", rating: 4.5 },
  { title: "Cibola Burn", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 4, pages: 581, genre: "Science Fiction", isbn: "9780316217620", rating: 4 },
  { title: "Nemesis Games", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 5, pages: 536, genre: "Science Fiction", isbn: "9780316217590", rating: 4.5 },
  { title: "Babylon's Ashes", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 6, pages: 532, genre: "Science Fiction", isbn: "9780316217569", rating: 4.5 },
  { title: "Persepolis Rising", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 7, pages: 560, genre: "Science Fiction", isbn: "9780316332874", rating: 4.5 },
  { title: "Tiamat's Wrath", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 8, pages: 534, genre: "Science Fiction", isbn: "9780316332913", rating: 4.5 },
  { title: "Leviathan Falls", author: "James S.A. Corey", series: "The Expanse", seriesOrder: 9, pages: 528, genre: "Science Fiction", isbn: "9780316462203", rating: 5 },

  // ═══ Dune ═══
  { title: "Dune", author: "Frank Herbert", series: "Dune", seriesOrder: 1, pages: 688, genre: "Science Fiction", isbn: "9780441172719", rating: 5 },
  { title: "Dune Messiah", author: "Frank Herbert", series: "Dune", seriesOrder: 2, pages: 331, genre: "Science Fiction", isbn: "9780441172696", rating: 4 },
  { title: "Children of Dune", author: "Frank Herbert", series: "Dune", seriesOrder: 3, pages: 444, genre: "Science Fiction", isbn: "9780441104027", rating: 4 },

  // ═══ Three-Body Problem ═══
  { title: "The Three-Body Problem", author: "Liu Cixin", series: "Remembrance of Earth's Past", seriesOrder: 1, pages: 400, genre: "Science Fiction", isbn: "9780765377068", rating: 5 },
  { title: "The Dark Forest", author: "Liu Cixin", series: "Remembrance of Earth's Past", seriesOrder: 2, pages: 512, genre: "Science Fiction", isbn: "9780765377082", rating: 5 },
  { title: "Death's End", author: "Liu Cixin", series: "Remembrance of Earth's Past", seriesOrder: 3, pages: 604, genre: "Science Fiction", isbn: "9780765377105", rating: 4.5 },

  // ═══ Grishaverse ═══
  { title: "Shadow and Bone", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 1, pages: 358, genre: "Fantasy", isbn: "9780805094599", rating: 4 },
  { title: "Siege and Storm", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 2, pages: 429, genre: "Fantasy", isbn: "9780805094605", rating: 4 },
  { title: "Ruin and Rising", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 3, pages: 416, genre: "Fantasy", isbn: "9780805094612", rating: 4 },
  { title: "Six of Crows", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 4, pages: 465, genre: "Fantasy", isbn: "9781627792127", rating: 5 },
  { title: "Crooked Kingdom", author: "Leigh Bardugo", series: "Grishaverse", seriesOrder: 5, pages: 536, genre: "Fantasy", isbn: "9781627792134", rating: 5 },

  // ═══ Green Bone Saga ═══
  { title: "Jade City", author: "Fonda Lee", series: "Green Bone Saga", seriesOrder: 1, pages: 560, genre: "Fantasy", isbn: "9780316449400", rating: 4.5 },
  { title: "Jade War", author: "Fonda Lee", series: "Green Bone Saga", seriesOrder: 2, pages: 592, genre: "Fantasy", isbn: "9780316449424", rating: 4.5 },
  { title: "Jade Legacy", author: "Fonda Lee", series: "Green Bone Saga", seriesOrder: 3, pages: 720, genre: "Fantasy", isbn: "9780316449448", rating: 4.5 },

  // ═══ Shades of Magic ═══
  { title: "A Darker Shade of Magic", author: "V.E. Schwab", series: "Shades of Magic", seriesOrder: 1, pages: 400, genre: "Fantasy", isbn: "9780765376468", rating: 4 },
  { title: "A Gathering of Shadows", author: "V.E. Schwab", series: "Shades of Magic", seriesOrder: 2, pages: 512, genre: "Fantasy", isbn: "9780765376475", rating: 4 },
  { title: "A Conjuring of Light", author: "V.E. Schwab", series: "Shades of Magic", seriesOrder: 3, pages: 528, genre: "Fantasy", isbn: "9780765376482", rating: 4.5 },

  // ═══ Fantasy Book Review Top 100 (additions not covered above) ═══
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", series: "The Lord of the Rings", seriesOrder: 1, pages: 423, genre: "Fantasy", isbn: "9780547928210", rating: 5 },
  { title: "The Two Towers", author: "J.R.R. Tolkien", series: "The Lord of the Rings", seriesOrder: 2, pages: 352, genre: "Fantasy", isbn: "9780547928203", rating: 5 },
  { title: "The Return of the King", author: "J.R.R. Tolkien", series: "The Lord of the Rings", seriesOrder: 3, pages: 416, genre: "Fantasy", isbn: "9780547928227", rating: 5 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, genre: "Fantasy", isbn: "9780547928241", rating: 5 },
  { title: "A Game of Thrones", author: "George R.R. Martin", series: "A Song of Ice and Fire", seriesOrder: 1, pages: 694, genre: "Fantasy", isbn: "9780553103540", rating: 5 },
  { title: "A Clash of Kings", author: "George R.R. Martin", series: "A Song of Ice and Fire", seriesOrder: 2, pages: 761, genre: "Fantasy", isbn: "9780553108033", rating: 5 },
  { title: "A Storm of Swords", author: "George R.R. Martin", series: "A Song of Ice and Fire", seriesOrder: 3, pages: 973, genre: "Fantasy", isbn: "9780553105148", rating: 5 },
  { title: "American Gods", author: "Neil Gaiman", pages: 635, genre: "Fantasy", isbn: "9780380789030", rating: 4.5 },
  { title: "Neverwhere", author: "Neil Gaiman", pages: 370, genre: "Fantasy", isbn: "9780060557818", rating: 4.5 },
  { title: "Good Omens", author: "Terry Pratchett", pages: 383, genre: "Fantasy", isbn: "9780060853988", rating: 4.5 },
  { title: "The Colour of Magic", author: "Terry Pratchett", series: "Discworld", seriesOrder: 1, pages: 288, genre: "Fantasy", isbn: "9780060855920", rating: 4 },
  { title: "Gardens of the Moon", author: "Steven Erikson", series: "Malazan Book of the Fallen", seriesOrder: 1, pages: 666, genre: "Fantasy", isbn: "9780765348780", rating: 4.5 },
  { title: "Assassin's Apprentice", author: "Robin Hobb", series: "Farseer Trilogy", seriesOrder: 1, pages: 435, genre: "Fantasy", isbn: "9780553565693", rating: 5 },
  { title: "Royal Assassin", author: "Robin Hobb", series: "Farseer Trilogy", seriesOrder: 2, pages: 675, genre: "Fantasy", isbn: "9780553565716", rating: 5 },
  { title: "Assassin's Quest", author: "Robin Hobb", series: "Farseer Trilogy", seriesOrder: 3, pages: 757, genre: "Fantasy", isbn: "9780553565709", rating: 5 },
  { title: "Jonathan Strange & Mr Norrell", author: "Susanna Clarke", pages: 1006, genre: "Fantasy", isbn: "9780765356150", rating: 4.5 },
  { title: "Piranesi", author: "Susanna Clarke", pages: 272, genre: "Fantasy", isbn: "9781635575632", rating: 4.5 },
  { title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", series: "Earthsea", seriesOrder: 1, pages: 183, genre: "Fantasy", isbn: "9780547722023", rating: 5 },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", pages: 304, genre: "Science Fiction", isbn: "9780441478122", rating: 5 },
  { title: "The Lies of Locke Lamora", author: "Scott Lynch", series: "Gentleman Bastard", seriesOrder: 1, pages: 499, genre: "Fantasy", isbn: "9780553804677", rating: 5 },
  { title: "Red Seas Under Red Skies", author: "Scott Lynch", series: "Gentleman Bastard", seriesOrder: 2, pages: 558, genre: "Fantasy", isbn: "9780553804691", rating: 4.5 },
  { title: "The Republic of Thieves", author: "Scott Lynch", series: "Gentleman Bastard", seriesOrder: 3, pages: 650, genre: "Fantasy", isbn: "9780553804707", rating: 4 },
  { title: "The Eye of the World", author: "Robert Jordan", series: "The Wheel of Time", seriesOrder: 1, pages: 782, genre: "Fantasy", isbn: "9780812511813", rating: 4.5 },
  { title: "The Great Hunt", author: "Robert Jordan", series: "The Wheel of Time", seriesOrder: 2, pages: 681, genre: "Fantasy", isbn: "9780812517723", rating: 4.5 },
  { title: "The Dragon Reborn", author: "Robert Jordan", series: "The Wheel of Time", seriesOrder: 3, pages: 624, genre: "Fantasy", isbn: "9780812513718", rating: 4.5 },
  { title: "The Gunslinger", author: "Stephen King", series: "The Dark Tower", seriesOrder: 1, pages: 231, genre: "Fantasy", isbn: "9780451210845", rating: 4 },
  { title: "The Drawing of the Three", author: "Stephen King", series: "The Dark Tower", seriesOrder: 2, pages: 463, genre: "Fantasy", isbn: "9780451210852", rating: 4.5 },
  { title: "The Stand", author: "Stephen King", pages: 823, genre: "Fantasy", isbn: "9780307947307", rating: 4.5 },
  { title: "Perdido Street Station", author: "China Miéville", pages: 710, genre: "Fantasy", isbn: "9780345459402", rating: 4 },
  { title: "Kraken", author: "China Miéville", pages: 528, genre: "Fantasy", isbn: "9780345497527", rating: 4 },
  { title: "The City and the City", author: "China Miéville", pages: 312, genre: "Fantasy", isbn: "9780345497510", rating: 4 },
  { title: "Tigana", author: "Guy Gavriel Kay", pages: 676, genre: "Fantasy", isbn: "9780451457760", rating: 5 },
  { title: "Under Heaven", author: "Guy Gavriel Kay", pages: 592, genre: "Fantasy", isbn: "9780451463303", rating: 4.5 },
  { title: "The Summer Tree", author: "Guy Gavriel Kay", series: "The Fionavar Tapestry", seriesOrder: 1, pages: 383, genre: "Fantasy", isbn: "9780451458224", rating: 4.5 },
  { title: "Lord Foul's Bane", author: "Stephen R. Donaldson", series: "The Chronicles of Thomas Covenant", seriesOrder: 1, pages: 480, genre: "Fantasy", isbn: "9780345348659", rating: 4 },
  { title: "The Shadow of the Torturer", author: "Gene Wolfe", series: "The Book of the New Sun", seriesOrder: 1, pages: 262, genre: "Fantasy", isbn: "9780671540661", rating: 4.5 },
  { title: "The Hundred Thousand Kingdoms", author: "N.K. Jemisin", series: "Inheritance Trilogy", seriesOrder: 1, pages: 427, genre: "Fantasy", isbn: "9780316043965", rating: 4 },
  { title: "Sabriel", author: "Garth Nix", series: "Old Kingdom", seriesOrder: 1, pages: 491, genre: "Fantasy", isbn: "9780061562194", rating: 4.5 },
  { title: "The Goblin Emperor", author: "Katherine Addison", pages: 446, genre: "Fantasy", isbn: "9780765326997", rating: 4.5 },
  { title: "The Black Company", author: "Glen Cook", series: "The Chronicles of the Black Company", seriesOrder: 1, pages: 319, genre: "Fantasy", isbn: "9780812521395", rating: 4.5 },
  { title: "Legend", author: "David Gemmell", series: "The Drenai Saga", seriesOrder: 1, pages: 345, genre: "Fantasy", isbn: "9780345432304", rating: 4.5 },
  { title: "The Way of Shadows", author: "Brent Weeks", series: "Night Angel", seriesOrder: 1, pages: 645, genre: "Fantasy", isbn: "9780316033677", rating: 4 },
  { title: "The Dragonbone Chair", author: "Tad Williams", series: "Memory, Sorrow, and Thorn", seriesOrder: 1, pages: 672, genre: "Fantasy", isbn: "9780756402693", rating: 4.5 },
  { title: "Magician", author: "Raymond E. Feist", series: "Riftwar Saga", seriesOrder: 1, pages: 485, genre: "Fantasy", isbn: "9780553564948", rating: 4.5 },
  { title: "Northern Lights", author: "Philip Pullman", series: "His Dark Materials", seriesOrder: 1, pages: 399, genre: "Fantasy", isbn: "9781407130224", rating: 4.5 },
  { title: "The Subtle Knife", author: "Philip Pullman", series: "His Dark Materials", seriesOrder: 2, pages: 326, genre: "Fantasy", isbn: "9781407130231", rating: 4.5 },
  { title: "The Amber Spyglass", author: "Philip Pullman", series: "His Dark Materials", seriesOrder: 3, pages: 518, genre: "Fantasy", isbn: "9781407130248", rating: 4.5 },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", series: "Harry Potter", seriesOrder: 1, pages: 309, genre: "Fantasy", isbn: "9780590353427", rating: 5 },
  { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", series: "Harry Potter", seriesOrder: 2, pages: 341, genre: "Fantasy", isbn: "9780439064873", rating: 4.5 },
  { title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", series: "Harry Potter", seriesOrder: 3, pages: 435, genre: "Fantasy", isbn: "9780439136365", rating: 5 },
  { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", series: "The Chronicles of Narnia", seriesOrder: 1, pages: 206, genre: "Fantasy", isbn: "9780064471046", rating: 4.5 },
  { title: "The Princess Bride", author: "William Goldman", pages: 512, genre: "Fantasy", isbn: "9780156035156", rating: 4.5 },
  { title: "Watership Down", author: "Richard Adams", pages: 478, genre: "Fantasy", isbn: "9780743277709", rating: 4.5 },
  { title: "The Last Unicorn", author: "Peter S. Beagle", pages: 248, genre: "Fantasy", isbn: "9780451450525", rating: 4.5 },
  { title: "Storm Front", author: "Jim Butcher", series: "The Dresden Files", seriesOrder: 1, pages: 372, genre: "Fantasy", isbn: "9780451457815", rating: 4 },
  { title: "Fool Moon", author: "Jim Butcher", series: "The Dresden Files", seriesOrder: 2, pages: 432, genre: "Fantasy", isbn: "9780451458126", rating: 4 },
  { title: "Grave Peril", author: "Jim Butcher", series: "The Dresden Files", seriesOrder: 3, pages: 378, genre: "Fantasy", isbn: "9780451458805", rating: 4 },
  { title: "Rivers of London", author: "Ben Aaronovitch", series: "Rivers of London", seriesOrder: 1, pages: 392, genre: "Fantasy", isbn: "9780345522467", rating: 4.5 },
  { title: "Moon Over Soho", author: "Ben Aaronovitch", series: "Rivers of London", seriesOrder: 2, pages: 387, genre: "Fantasy", isbn: "9780345522474", rating: 4 },
  { title: "Foundryside", author: "Robert Jackson Bennett", series: "Founders", seriesOrder: 1, pages: 511, genre: "Fantasy", isbn: "9781524760361", rating: 4.5 },
  { title: "Shorefall", author: "Robert Jackson Bennett", series: "Founders", seriesOrder: 2, pages: 544, genre: "Fantasy", isbn: "9781524760385", rating: 4.5 },
  { title: "The Tainted Cup", author: "Robert Jackson Bennett", series: "Shadow of the Leviathan", seriesOrder: 1, pages: 402, genre: "Fantasy", isbn: "9781984820706", rating: 4.5 },
  { title: "Gideon the Ninth", author: "Tamsyn Muir", series: "The Locked Tomb", seriesOrder: 1, pages: 448, genre: "Science Fiction", isbn: "9781250313197", rating: 4.5 },
  { title: "Harrow the Ninth", author: "Tamsyn Muir", series: "The Locked Tomb", seriesOrder: 2, pages: 512, genre: "Science Fiction", isbn: "9781250313203", rating: 4.5 },
  { title: "Prince of Thorns", author: "Mark Lawrence", series: "Broken Empire", seriesOrder: 1, pages: 373, genre: "Fantasy", isbn: "9781937007683", rating: 4 },
  { title: "King of Thorns", author: "Mark Lawrence", series: "Broken Empire", seriesOrder: 2, pages: 448, genre: "Fantasy", isbn: "9781937007690", rating: 4 },
  { title: "Emperor of Thorns", author: "Mark Lawrence", series: "Broken Empire", seriesOrder: 3, pages: 448, genre: "Fantasy", isbn: "9781937007706", rating: 4.5 },
  { title: "The Bear and the Nightingale", author: "Katherine Arden", series: "Winternight Trilogy", seriesOrder: 1, pages: 323, genre: "Fantasy", isbn: "9781101885932", rating: 4.5 },
  { title: "The Girl in the Tower", author: "Katherine Arden", series: "Winternight Trilogy", seriesOrder: 2, pages: 366, genre: "Fantasy", isbn: "9781101885949", rating: 4.5 },
  { title: "The Winter of the Witch", author: "Katherine Arden", series: "Winternight Trilogy", seriesOrder: 3, pages: 325, genre: "Fantasy", isbn: "9781101885956", rating: 4.5 },
  { title: "The Night Circus", author: "Erin Morgenstern", pages: 387, genre: "Fantasy", isbn: "9780307744432", rating: 4 },
  { title: "The Magicians", author: "Lev Grossman", series: "The Magicians", seriesOrder: 1, pages: 402, genre: "Fantasy", isbn: "9780452296299", rating: 4 },
  { title: "The Magician King", author: "Lev Grossman", series: "The Magicians", seriesOrder: 2, pages: 416, genre: "Fantasy", isbn: "9780452298019", rating: 4 },
  { title: "Ninth House", author: "Leigh Bardugo", series: "Alex Stern", seriesOrder: 1, pages: 461, genre: "Fantasy", isbn: "9781250313609", rating: 4 },
  { title: "Hell Bent", author: "Leigh Bardugo", series: "Alex Stern", seriesOrder: 2, pages: 400, genre: "Fantasy", isbn: "9781250313623", rating: 4 },
  { title: "The Raven Tower", author: "Ann Leckie", pages: 416, genre: "Fantasy", isbn: "9780316422380", rating: 4 },
  { title: "Ancillary Justice", author: "Ann Leckie", series: "Imperial Radch", seriesOrder: 1, pages: 386, genre: "Science Fiction", isbn: "9780316246641", rating: 4.5 },
  { title: "Ancillary Sword", author: "Ann Leckie", series: "Imperial Radch", seriesOrder: 2, pages: 359, genre: "Science Fiction", isbn: "9780316246658", rating: 4.5 },
  { title: "The Long Way to a Small, Angry Planet", author: "Becky Chambers", series: "Wayfarers", seriesOrder: 1, pages: 444, genre: "Science Fiction", isbn: "9781473619814", rating: 4.5 },
  { title: "A Closed and Common Orbit", author: "Becky Chambers", series: "Wayfarers", seriesOrder: 2, pages: 365, genre: "Science Fiction", isbn: "9781473621442", rating: 4.5 },
  { title: "Record of a Spaceborn Few", author: "Becky Chambers", series: "Wayfarers", seriesOrder: 3, pages: 359, genre: "Science Fiction", isbn: "9781473647602", rating: 4 },
  { title: "Between Two Fires", author: "Christopher Buehlman", pages: 448, genre: "Fantasy", isbn: "9780451464461", rating: 4.5 },
  { title: "Roadside Picnic", author: "Arkady Strugatsky", pages: 145, genre: "Science Fiction", isbn: "9781613743416", rating: 4.5 },
  { title: "The Book Thief", author: "Markus Zusak", pages: 552, genre: "Fantasy", isbn: "9780375831003", rating: 4.5 },
  { title: "Swan Song", author: "Robert R. McCammon", pages: 956, genre: "Fantasy", isbn: "9780671741037", rating: 4.5 },
  { title: "The Atrocity Archives", author: "Charles Stross", series: "Laundry Files", seriesOrder: 1, pages: 345, genre: "Science Fiction", isbn: "9780441011468", rating: 4 },
  { title: "The Bone Clocks", author: "David Mitchell", pages: 624, genre: "Fantasy", isbn: "9780812994863", rating: 4 },
  { title: "The Steerswoman", author: "Rosemary Kirstein", series: "Steerswoman", seriesOrder: 1, pages: 279, genre: "Fantasy", isbn: "9780345458498", rating: 4 },
  { title: "The Golem and the Jinni", author: "Helene Wecker", pages: 486, genre: "Fantasy", isbn: "9780062110846", rating: 4.5 },
  { title: "The 10,000 Doors of January", author: "Alix E. Harrow", pages: 380, genre: "Fantasy", isbn: "9780316421994", rating: 4 },
  { title: "Vicious", author: "V.E. Schwab", series: "Villains", seriesOrder: 1, pages: 366, genre: "Fantasy", isbn: "9780765338219", rating: 4 },
  { title: "Vengeful", author: "V.E. Schwab", series: "Villains", seriesOrder: 2, pages: 462, genre: "Fantasy", isbn: "9780765338226", rating: 4 },

  // ═══ Booktok & contemporary hits ═══
  { title: "The Priory of the Orange Tree", author: "Samantha Shannon", pages: 848, genre: "Fantasy", isbn: "9781635570296", rating: 4.5 },
  { title: "The House in the Cerulean Sea", author: "TJ Klune", pages: 394, genre: "Fantasy", isbn: "9781250217360", rating: 5 },
  { title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab", pages: 448, genre: "Fantasy", isbn: "9781250759468", rating: 4.5 },
  { title: "The Midnight Library", author: "Matt Haig", pages: 304, genre: "Fantasy", isbn: "9780525559474", rating: 4 },
  { title: "The Song of Achilles", author: "Madeline Miller", pages: 416, genre: "Fantasy", isbn: "9780062060624", rating: 5 },
  { title: "Circe", author: "Madeline Miller", pages: 393, genre: "Fantasy", isbn: "9780316556323", rating: 5 },
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", pages: 400, genre: "Historical Fiction", isbn: "9781501161933", rating: 4.5 },
  { title: "From Blood and Ash", author: "Jennifer L. Armentrout", series: "Blood and Ash", seriesOrder: 1, pages: 622, genre: "Fantasy", isbn: "9781952457216", rating: 4 },
  { title: "A Kingdom of Flesh and Fire", author: "Jennifer L. Armentrout", series: "Blood and Ash", seriesOrder: 2, pages: 637, genre: "Fantasy", isbn: "9781952457230", rating: 4 },
  { title: "The Crown of Gilded Bones", author: "Jennifer L. Armentrout", series: "Blood and Ash", seriesOrder: 3, pages: 684, genre: "Fantasy", isbn: "9781952457254", rating: 4 },
  { title: "Kingdom of the Wicked", author: "Kerri Maniscalco", series: "Kingdom of the Wicked", seriesOrder: 1, pages: 384, genre: "Fantasy", isbn: "9780316424629", rating: 4 },
  { title: "Kingdom of the Cursed", author: "Kerri Maniscalco", series: "Kingdom of the Wicked", seriesOrder: 2, pages: 416, genre: "Fantasy", isbn: "9780316424643", rating: 4 },
  { title: "The Atlas Six", author: "Olivie Blake", series: "The Atlas", seriesOrder: 1, pages: 384, genre: "Fantasy", isbn: "9781250855245", rating: 4 },
  { title: "Powerless", author: "Lauren Roberts", series: "Powerless", seriesOrder: 1, pages: 526, genre: "Fantasy", isbn: "9781665938123", rating: 4 },
  { title: "Powerful", author: "Lauren Roberts", series: "Powerless", seriesOrder: 2, pages: 512, genre: "Fantasy", isbn: "9781665938147", rating: 4 },
  { title: "Icebreaker", author: "Hannah Grace", pages: 356, genre: "Romance", isbn: "9781668025599", rating: 4 },
  { title: "House of Salt and Sorrows", author: "Erin A. Craig", pages: 416, genre: "Fantasy", isbn: "9780525575627", rating: 4 },
  { title: "Verity", author: "Colleen Hoover", pages: 336, genre: "Thriller", isbn: "9781791392712", rating: 4 },
  { title: "It Ends with Us", author: "Colleen Hoover", pages: 384, genre: "Romance", isbn: "9781501110368", rating: 4 },

  // ═══ Sci-fi classics ═══
  { title: "Neuromancer", author: "William Gibson", pages: 271, genre: "Science Fiction", isbn: "9780441569595", rating: 4.5 },
  { title: "Foundation", author: "Isaac Asimov", series: "Foundation", seriesOrder: 1, pages: 255, genre: "Science Fiction", isbn: "9780553293357", rating: 4.5 },
  { title: "Foundation and Empire", author: "Isaac Asimov", series: "Foundation", seriesOrder: 2, pages: 256, genre: "Science Fiction", isbn: "9780553293371", rating: 4.5 },
  { title: "Second Foundation", author: "Isaac Asimov", series: "Foundation", seriesOrder: 3, pages: 256, genre: "Science Fiction", isbn: "9780553293364", rating: 4.5 },
  { title: "Ender's Game", author: "Orson Scott Card", series: "Ender's Saga", seriesOrder: 1, pages: 324, genre: "Science Fiction", isbn: "9780812550702", rating: 4.5 },
  { title: "Speaker for the Dead", author: "Orson Scott Card", series: "Ender's Saga", seriesOrder: 2, pages: 382, genre: "Science Fiction", isbn: "9780812550757", rating: 4 },
  { title: "Ready Player One", author: "Ernest Cline", pages: 374, genre: "Science Fiction", isbn: "9780307887443", rating: 4 },
  { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", pages: 224, genre: "Science Fiction", isbn: "9780345391804", rating: 5 },
  { title: "Snow Crash", author: "Neal Stephenson", pages: 480, genre: "Science Fiction", isbn: "9780553380958", rating: 4 },
  { title: "1984", author: "George Orwell", pages: 328, genre: "Science Fiction", isbn: "9780451524935", rating: 4.5 },
  { title: "Brave New World", author: "Aldous Huxley", pages: 311, genre: "Science Fiction", isbn: "9780060850524", rating: 4.5 },
  { title: "Fahrenheit 451", author: "Ray Bradbury", pages: 256, genre: "Science Fiction", isbn: "9781451673319", rating: 4.5 },
  { title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", pages: 210, genre: "Science Fiction", isbn: "9780345404473", rating: 4.5 },
  { title: "Childhood's End", author: "Arthur C. Clarke", pages: 224, genre: "Science Fiction", isbn: "9780345347956", rating: 4.5 },
  { title: "Rendezvous with Rama", author: "Arthur C. Clarke", pages: 243, genre: "Science Fiction", isbn: "9780553287899", rating: 4.5 },
  { title: "The Forever War", author: "Joe Haldeman", pages: 278, genre: "Science Fiction", isbn: "9780312536642", rating: 4.5 },
  { title: "Starship Troopers", author: "Robert A. Heinlein", pages: 335, genre: "Science Fiction", isbn: "9780441783588", rating: 4 },
  { title: "I, Robot", author: "Isaac Asimov", pages: 224, genre: "Science Fiction", isbn: "9780553382563", rating: 4.5 },
  { title: "Consider Phlebas", author: "Iain M. Banks", series: "Culture", seriesOrder: 1, pages: 471, genre: "Science Fiction", isbn: "9781857231383", rating: 4 },
  { title: "Flowers for Algernon", author: "Daniel Keyes", pages: 311, genre: "Science Fiction", isbn: "9780156030304", rating: 5 },
  { title: "Slaughterhouse-Five", author: "Kurt Vonnegut", pages: 275, genre: "Science Fiction", isbn: "9780385333849", rating: 4.5 },
  { title: "Solaris", author: "Stanisław Lem", pages: 204, genre: "Science Fiction", isbn: "9780571202246", rating: 4.5 },
];
