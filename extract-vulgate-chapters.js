"use strict";
var fs = require("fs"),
    vulgate = fs.readFileSync('../latin-ecclesiastic-accents/corpus/vulgate/vulgate_with_accents.txt','utf8').replace(/ ([:;.!?])/g,'$1').split('\n'),
    regexBookChapter = /^((?:(\d+)\s+)?([a-zæ]+))\s+(\d+)\s+(\d+)\s+/i,
    books = ["Genesis","Exodus","Leviticus","Numeri","Deuteronomium","Josue","Judicum","Ruth","Regum I","Regum II","Regum III","Regum IV","Paralipomenon I","Paralipomenon II","Esdræ","Nehemiæ","Tobiæ","Judith","Esther","Job","Psalmi","Proverbia","Ecclesiastes","Canticum Canticorum","Sapientia","Ecclesiasticus","Isaias","Jeremias","Lamentationes","Baruch","Ezechiel","Daniel","Osee","Joel","Amos","Abdias","Jonas","Michæa","Nahum","Habacuc","Sophonias","Aggæus","Zacharias","Malachias","Machabæorum I","Machabæorum II",
"Matthæus","Marcus","Lucas","Joannes","Actus Apostolorum","Ad Romanos","Ad Corinthios I","Ad Corinthios II","Ad Galatas","Ad Ephesios","Ad Philippenses","Ad Colossenses","Ad Thessalonicenses I","Ad Thessalonicenses II","Ad Timotheum I","Ad Timotheum II","Ad Titum","Ad Philemonem","Ad Hebræos","Jacobi","Petri I","Petri II","Joannis I","Joannis II","Joannis III","Judæ","Apocalypsis"],
    lastAbbrev = null,
    chapter = '',
    abbrevs = [];

vulgate.forEach(line => {
  if(!line) return;
  var match = regexBookChapter.exec(line);
  var flag = 'a';
  if(match[1] != lastAbbrev) {
    lastAbbrev = match[1];
    chapter = books[abbrevs.length];
    //console.info(lastAbbrev, chapter);
    abbrevs.push(lastAbbrev);
    var key = match[3];
    flag = 'w';
  }
  line = line.replace(regexBookChapter,'$4\t$5\t');
  fs.writeFileSync('vulgate/'+chapter,line + '\n',{encoding: 'utf8', flag});
});