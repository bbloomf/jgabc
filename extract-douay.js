//"use strict";
var fs = require("fs"),
    douay = fs.readFileSync('douay-rheims/src/pg8300.txt','utf8').split('\n'),
    regexBookChapter = /^(.+) Chapter (\d+)$/i,
    regexVerse = /^(\d+)[:;](\d+)[:.]?\s+(.+)\s*$/,
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
var psalm9 = 0;
var psalm113 = 0;
  
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
    }
  }
  if(!inBook) return;
  var lines = line.split(/\s+(?=\d+[:;]\d+)/);
  lines.forEach((line,i) => {
    match = regexVerse.exec(line);
    if(match) {
      var chapter = parseInt(match[1]),
          verse = parseInt(match[2]);
      if(book == "Psalmi" && chapter == 9 && psalm9) verse += psalm9;
      if(book == "Psalmi" && chapter == 113 && psalm113) verse += psalm113;
      if((chapter == lastChapter)? (verse != (lastVerse + 1)) : (verse != 1)) {
        if(book == "Psalmi") {
          if(chapter == 9) {
            psalm9 = lastVerse;
            verse += psalm9;
          } else if(chapter == 113) {
            psalm113 = lastVerse;
            verse += psalm113;
          }
        } else if(chapter == lastChapter && verse <= lastVerse) return;
        console.info(`unexpected verse in chapter ${chapter}; expected ${lastVerse + 1}; saw ${verse}: ${match[3].trim()}`);
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
        line = ' ' + line.trim();
      }
    } else {
      return;
    }
    fs.writeFileSync('douay-rheims/'+book,line,{encoding: 'utf8', flag});
    flag = 'a';
  });
});
