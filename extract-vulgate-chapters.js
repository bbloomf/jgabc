//"use strict";
var fs = require("fs"),
    Hypher = require('hypher');
    window = {Hypher: Hypher};
    Hypher.languages = {};
require('./patterns/la-hypher.js');
    var latin = window.Hypher.languages.la_VA,
    vulgate = fs.readFileSync('../latin-ecclesiastic-accents/corpus/vulgate/vulgate_with_accents.txt','utf8').replace(/ ([:;.!?])/g,'$1').split('\n'),
    regexBookChapter = /^(?:\[[^\]]+\]\s*)?((?:(\d+)\s+)?([a-zæ]+))\s+(\d+)\s+(\d+)\s+/i,
    regexWord = /[a-záéíóúýäëïöüÿæœǽ]+/ig,
    regexIVowel = /i[aeiouyáéíóúýäëïöüÿ]|[ií]c[aeiouyáéíóúýäëïöüÿ]/i,
    regexStartIVowel = /^i(?=[aeiouyáéíóúýäëïöüÿ])/ig,
    replaceIJ = {
      i: 'j',
      I: 'J'
    },
    books = ["Genesis","Exodus","Leviticus","Numeri","Deuteronomium","Josue","Judicum","Ruth","Regum 1","Regum 2","Regum 3","Regum 4","Paralipomenon 1","Paralipomenon 2","Esdræ","Nehemiæ","Tobiæ","Judith","Esther","Job","Psalmi","Proverbia","Ecclesiastes","Canticum Canticorum","Sapientia","Ecclesiasticus","Isaias","Jeremias","Lamentationes","Baruch","Ezechiel","Daniel","Osee","Joel","Amos","Abdias","Jonas","Michæa","Nahum","Habacuc","Sophonias","Aggæus","Zacharias","Malachias","Machabæorum 1","Machabæorum 2",
"Matthæus","Marcus","Lucas","Joannes","Actus Apostolorum","Ad Romanos","Ad Corinthios 1","Ad Corinthios 2","Ad Galatas","Ad Ephesios","Ad Philippenses","Ad Colossenses","Ad Thessalonicenses 1","Ad Thessalonicenses 2","Ad Timotheum 1","Ad Timotheum 2","Ad Titum","Ad Philemonem","Ad Hebræos","Jacobi","Petri 1","Petri 2","Joannis 1","Joannis 2","Joannis 3","Judæ","Apocalypsis"],
    lastAbbrev = null,
    chapter = '',
    abbrevs = [],
    jWords = {};

vulgate.forEach(line => {
  if(!line) return;
  var match = regexBookChapter.exec(line);
  var flag = 'a';
  if (!match) console.info(line);
  if(match[1] != lastAbbrev) {
    lastAbbrev = match[1];
    chapter = books[abbrevs.length];
    //console.info(lastAbbrev, chapter);
    abbrevs.push(lastAbbrev);
    var key = match[3];
    flag = 'w';
  }
  line = line.replace(regexBookChapter,'$4\t$5\t').replace(regexWord, (word) => {
    word = word.replace(/([ao])e/g, '$1ë');
    if(regexIVowel.test(word)) {
      syls = latin.hyphenate(word);
      word = syls.map(syl => syl.replace(regexStartIVowel, match => (replaceIJ[match]) )).join('');
      word = word.replace(/^(s[uú]b|pr[oó]|[rd][eé]|[eé]|[aáoó][bd])([ií]c[eiéíœæǽ])/i,'$1j$2');
      word = word.replace(/([Cc][uú])i(us)/g,'$1j$2');
      word = word.replace(/([Bb][eé]n)i(amin)/i, '$1j$2');
      if(/j/i.test(word)) {
        if(/^(allelúja|Abju|Abjud|abjí[st].*|Adiel|adjerúntque|adjérunt|ajunt|ajo|ajon|gaj(o|us)|injerúntque|injére|injérunt|injísset|interjérunt|jérunt)$/i.test(word)) {
          word = word.replace(/j/g,'i').replace(/J/g,'I');
        } else {
          jWords[word.toLowerCase()] = 1;
        }
      }
    }
    return word;
  });
  fs.writeFileSync('vulgate/'+chapter,line + '\n',{encoding: 'utf8', flag});
});
fs.writeFileSync('jWords.txt',Object.keys(jWords).sort().join('\n'));