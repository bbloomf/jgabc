//"use strict";
var fs = require("fs"),
    douay = fs.readFileSync('douay-rheims/src/pg8300.txt','utf8').split('\n'),
    regexBookChapter = /^(.+) Chapter (\d+)$/i,
    regexVerse = /^(\d+)a?[:;](\d+)[:.]?\s+(.+)\s*$/,
    regexWhitespace = /^\s*$/,
    books = ["Genesis","Exodus","Leviticus","Numeri","Deuteronomium","Josue","Judicum","Ruth","Regum 1","Regum 2","Regum 3","Regum 4","Paralipomenon 1","Paralipomenon 2","Esdræ","Nehemiæ","Tobiæ","Judith","Esther","Job","Psalmi","Proverbia","Ecclesiastes","Canticum Canticorum","Sapientia","Ecclesiasticus","Isaias","Jeremias","Lamentationes","Baruch","Ezechiel","Daniel","Osee","Joel","Amos","Abdias","Jonas","Michæa","Nahum","Habacuc","Sophonias","Aggæus","Zacharias","Malachias","Machabæorum 1","Machabæorum 2",
"Matthæus","Marcus","Lucas","Joannes","Actus Apostolorum","Ad Romanos","Ad Corinthios 1","Ad Corinthios 2","Ad Galatas","Ad Ephesios","Ad Philippenses","Ad Colossenses","Ad Thessalonicenses 1","Ad Thessalonicenses 2","Ad Timotheum 1","Ad Timotheum 2","Ad Titum","Ad Philemonem","Ad Hebræos","Jacobi","Petri 1","Petri 2","Joannis 1","Joannis 2","Joannis 3","Judæ","Apocalypsis"],
    book = '',
    bookCount = 0,
    flag = 'w',
    lastLineWasVerse = false,
    inBook = false;
var lastChapter = 0;
var lastVerse = 0;
var psalmSpecial = 0;
var lastLine;
// Psalms 9, 113, 115, 147 are somewhat special cases.
  
douay.forEach(line => {
  if(!line) return;
  line = line.trim().replace(/ {2,}/g,' ');
  var match = regexBookChapter.exec(line);
  if(match) {
    inBook = true;
    if(match[2] == 1) {
      book = books[bookCount++];
      console.info(`processing '${match[1]}' (${book})`);
      flag = 'w';
      lastChapter = 0;
      lastVerse = 0;
      psalmSpecial = 0;
    }
  }
  if(!inBook) return;
  var lines = line.split(/\s+(?=\d+[:;]\d+)/);
  lines.forEach((line,i) => {
    if(book == "Apocalypsis" && line == "APPENDICES") throw "Found Appendices; exiting";
    match = regexVerse.exec(line = line.replace(/'/g,'’').replace(/\s+([,;:.!?])\s*/g,'$1 '));
    if(match) {
      var chapter = parseInt(match[1]),
          verse = parseInt(match[2]);
      if(chapter != lastChapter) psalmSpecial = 0;
      if(book == "Psalmi" && psalmSpecial && /^(9|113|115|147)$/.test(match[1])) verse += psalmSpecial;
      var expectedVerse = (chapter == lastChapter)? (lastVerse + 1) : 1;
      if(verse != expectedVerse) {
        if(book == "Psalmi") {
          if(chapter == 9 || chapter == 113) {
            console.info(`${chapter}:${verse}  setting psalmSpecial from ${psalmSpecial} to ${lastVerse}`);
            psalmSpecial = lastVerse;
            verse += psalmSpecial;
          } else if(chapter == 115 || chapter == 147) {
            console.info(`${chapter}:${verse}  setting psalmSpecial from ${psalmSpecial} to ${1 - verse}`);
            psalmSpecial = 1 - verse;
            verse += psalmSpecial;
          }
        } else if(chapter == lastChapter && verse <= lastVerse) return;
        console.info(`unexpected verse in chapter ${chapter}; expected ${expectedVerse}; saw ${verse}.`);
      }
      match[2] = ""+verse;
      lastChapter = chapter;
      lastVerse = verse;
      line = (i? '\n' : '') + `${match[1]}\t${match[2]}\t${match[3].trim()}`;
      lastLineWasVerse = true;
    } else if(lastLineWasVerse) {
      match = regexWhitespace.test(line);
      if(match) {
        lastLineWasVerse = false;
        line = '\n';
      } else {
        line = (/-$/.test(lastLine)? '' : ' ') + line.trim();
      }
    } else {
      return;
    }
    fs.writeFileSync('douay-rheims/'+book,line,{encoding: 'utf8', flag});
    lastLine = line;
    flag = 'a';
  });
});
