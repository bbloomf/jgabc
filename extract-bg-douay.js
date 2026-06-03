//"use strict";
// Downloads the Douay-Rheims bible JSON from yoarikso/douayrheimsbible and
// writes one file per book to douay-rheims/<Latin name>.txt, matching the
// format produced by extract-douay.js (one verse per line: chapter\tverse\ttext).
var fs = require("fs"),
  url =
    "https://raw.githubusercontent.com/yoarikso/douayrheimsbible/refs/heads/master/douayrheims-json/EntireBible-DOUAYRHEIMS.json";

// The Latin book names used for the output filenames, taken from extract-douay.js.
var books = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numeri",
  "Deuteronomium",
  "Josue",
  "Judicum",
  "Ruth",
  "Regum 1",
  "Regum 2",
  "Regum 3",
  "Regum 4",
  "Paralipomenon 1",
  "Paralipomenon 2",
  "Esdræ",
  "Nehemiæ",
  "Tobiæ",
  "Judith",
  "Esther",
  "Job",
  "Psalmi",
  "Proverbia",
  "Ecclesiastes",
  "Canticum Canticorum",
  "Sapientia",
  "Ecclesiasticus",
  "Isaias",
  "Jeremias",
  "Lamentationes",
  "Baruch",
  "Ezechiel",
  "Daniel",
  "Osee",
  "Joel",
  "Amos",
  "Abdias",
  "Jonas",
  "Michæa",
  "Nahum",
  "Habacuc",
  "Sophonias",
  "Aggæus",
  "Zacharias",
  "Malachias",
  "Machabæorum 1",
  "Machabæorum 2",
  "Matthæus",
  "Marcus",
  "Lucas",
  "Joannes",
  "Actus Apostolorum",
  "Ad Romanos",
  "Ad Corinthios 1",
  "Ad Corinthios 2",
  "Ad Galatas",
  "Ad Ephesios",
  "Ad Philippenses",
  "Ad Colossenses",
  "Ad Thessalonicenses 1",
  "Ad Thessalonicenses 2",
  "Ad Timotheum 1",
  "Ad Timotheum 2",
  "Ad Titum",
  "Ad Philemonem",
  "Ad Hebræos",
  "Jacobi",
  "Petri 1",
  "Petri 2",
  "Joannis 1",
  "Joannis 2",
  "Joannis 3",
  "Judæ",
  "Apocalypsis",
];

// The English keys used in the source JSON, in the same canonical order as the
// Latin names above. (The JSON also contains "Song2", a duplicate of
// "SongOfSongs", which is absent here and therefore skipped.)
var jsonBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1-Samuel",
  "2-Samuel",
  "1-Kings",
  "2-Kings",
  "1-Chronicles",
  "2-Chronicles",
  "Ezra",
  "Nehemiah",
  "Tobit",
  "Judith",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "SongOfSongs",
  "Wisdom",
  "Sirach",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Baruch",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "1-Maccabees",
  "2-Maccabees",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1-Corinthians",
  "2-Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1-Thessalonians",
  "2-Thessalonians",
  "1-Timothy",
  "2-Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1-Peter",
  "2-Peter",
  "1-John",
  "2-John",
  "3-John",
  "Jude",
  "Revelation",
];

if (jsonBooks.length != books.length)
  throw `book list mismatch: ${jsonBooks.length} English vs ${books.length} Latin`;

// Sort object keys that look like positive integers, numerically. Anything else
// (e.g. the stray "charset" keys sprinkled through the JSON) is dropped.
function numericKeys(obj) {
  return Object.keys(obj)
    .filter((k) => /^\d+$/.test(k))
    .sort((a, b) => a - b);
}

(async function () {
  console.info(`downloading ${url}`);
  var res = await fetch(url);
  if (!res.ok) throw `download failed: ${res.status} ${res.statusText}`;
  var bible = await res.json();

  jsonBooks.forEach((englishName, i) => {
    var latinName = books[i];
    var bookData = bible[englishName];
    if (!bookData) {
      console.warn(`missing book in JSON: '${englishName}' (${latinName})`);
      return;
    }
    console.info(`processing '${englishName}' (${latinName})`);
    var lines = [];
    numericKeys(bookData).forEach((chapter) => {
      var chapterData = bookData[chapter];
      numericKeys(chapterData).forEach((verse) => {
        var text = chapterData[verse].trim().replace(/'/g, "’");
        lines.push(`${chapter}\t${verse}\t${text}`);
      });
    });
    fs.writeFileSync(
      "douay-rheims/" + latinName + ".txt",
      lines.join("\n"),
      "utf8",
    );
  });

  console.info("done.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
