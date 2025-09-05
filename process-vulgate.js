"use strict";
var fs = require("fs"),
    vr = require("./verseRef.js"),
    psalmMap = [],
    regexNonWord = /[^a-záéíóúæœǽýë\d\n]+/ig,
    vulgatePsalms = fs.readFileSync('vulgate/Psalmi','utf8').replace(regexNonWord,' ').toLowerCase().split('\n'),
    vulgateLine = 0;

var normalize = word => 
  (word||'').replace(/^[áéóíú]/, match => (({"á":"a","é":"e","í":"i","ó":"o","ú":"u"})[match])).replace(/ë/,'e').
    replace(/^([eé])xs/,'$1x').replace(/^([aá])ss/,'$1s').replace(/p([uú])lcr/,'p$1lchr').replace(/^her([ée])dit/,'hær$1dit').
    replace(/^n([eé])pht([áa])li/,'n$1phth$2li').replace(/^d([íi])sr([iíuú])p/,'d$1r$2p');

// cantica
/*
Dan 3: 57, 60-65, 83-87 // Canticum Trium Puerorum
Dan 3: 58-61
Deut 32: 1-4
Is 12: 1-6
Is 35: 1, 2-3, 5-7
Luc 1: 46-55 // Magnificat
Luc 1: 68-79 // Benedictus
Luc 2: 29-32 // Nunc dimíttis
Sap 3: 1-3, 5, 8-9
Tob 13: 1, 3, 5-6, 8-10
*/
var cantica = {
  "Benedictus": "Luc 1: 68-79",
  "Magnificat": "Luc 1: 46-55",
  "Nunc dimittis": "Luc 2: 29-32",
  "Canticum Annae": "1 Reg 2: 1-10",
  "Canticum David": "1 Par 29: 10-13",
  "Canticum Ecclesiastici": "Eccli 36: 1-16",
  "Canticum Ezechiae": "Is 38: 10-20",
  "Canticum Habacuc": "Ha 3: 2-19",
  "Canticum Isaiae": "Is 45: 15-25",
  "Canticum Isaiae (alterum)": "Is 53: 1-5",
  "Canticum Jeremiae": "Jer 31: 10-14",
  "Canticum Judith": "Judith 16: 15-21",
  "Canticum Moysis": "Exod 15: 1-19",
  "Canticum Moysis (Deut)": "Deut 32: 1-18",
  "Canticum Tobiae": "Tob 13: 1-10",
  //"Canticum Trium puerorum": "Dan 3: 57-88"
}
var mapBooks = {
  "Act": "Actus Apostolorum",
  "Acts": "Actus Apostolorum",
  "Apoc": "Apocalypsis",
  "Cant": "Canticum Canticorum",
  "Col": "Ad Colossenses",
  "Cor": "Ad Corinthios",
  "Dan": "Daniel",
  "Deut": "Deuteronomium",
  "Eccli": "Ecclesiasticus",
  "Eph": "Ad Ephesios",
  "Ephes": "Ad Ephesios",
  "Esth": "Esther",
  "Exod": "Exodus",
  "Ezech": "Ezechiel",
  "Gal": "Ad Galatas",
  "Gen": "Genesis",
  "Ha": "Habacuc",
  "Hebr": "Ad Hebræos",
  "Is": "Isaias",
  "Isa": "Isaias",
  "Isaiae": "Isaias",
  "Jac": "Jacobi",
  "Jas": "Jacobi",
  "Jer": "Jeremias",
  "Joann": "Joannes",
  "Joannes": "Joannes",
  "Joel": "Joel",
  "John": "Joannis",
  "Jonæ": "Jonas",
  "Jud": "Judæ",
  "Judith": "Judith",
  "Lev": "Leviticus",
  "Luc": "Lucas",
  "Mach": "Machabæorum",
  "Malach": 'Malachias',
  "Marc": "Marcus",
  "Matt": "Matthæus",
  "Num": "Numeri",
  "Par": "Paralipomenon",
  "Pet": "Petri",
  "Petri": "Petri",
  "Phil": "Ad Philippenses",
  "Philipp": "Ad Philippenses",
  "Prov": "Proverbia",
  "Ps": "Psalmi",
  "Reg": "Regum",
  "Rom": "Ad Romanos",
  "Sap": "Sapientia",
  "Thess": "Ad Thessalonicenses",
  "Tim": "Ad Timotheum",
  "Tit": 'Ad Titum',
  "Tob": 'Tobiæ',
  "Tobias": 'Tobiæ'
};

for(var psalm=1; psalm <= 150 + Object.keys(cantica).length; ++psalm) {
  psalmMap[psalm - 1] = [];
  var psalmFileName = psalm <= 150? ('00'+psalm).slice(-3) : Object.keys(cantica)[psalm-151];
  var liberPsalm = fs.readFileSync(`psalms/${psalmFileName}.txt`,'utf8').replace(regexNonWord,' ').toLowerCase().split('\n');
  var liberI = 0;
  var liber = liberPsalm[liberI].trim().split(/\s+/);
  var vulgate;
  var li=0;
  var verseRef = {};
  var verseOffset = 0;
  if(psalm > 150) {
    vulgateLine = 0;
    verseRef = vr.parseRef(cantica[psalmFileName])[0];
    var bookText = fs.readFileSync(`vulgate/${mapBooks[verseRef.book] || verseRef.book}${verseRef.bookNum? (' '+verseRef.bookNum) : ''}`,'utf8');
    vulgatePsalms = bookText.replace(new RegExp(`^[^@]*\\n(${verseRef.chapter}\t${verseRef.verse}\t)`),'$1');
    vulgatePsalms = vulgatePsalms.replace(new RegExp(`(\\n${verseRef.chapter}\t${verseRef.endVerse}\t[^\\n]*)[^@]*`),'$1');
    vulgatePsalms = vulgatePsalms.replace(regexNonWord,' ').toLowerCase().split('\n');
    console.info(psalmFileName);
  } else {
    verseRef.chapter = psalm;
    verseRef.verse = 1;
    verseOffset = psalm==33? 1 : 0;
  }
  for(var verse=verseRef.verse; ((vulgate = vulgatePsalms[vulgateLine])); ++verse, ++vulgateLine) {
    var matched = null;
    var match = vulgate.match(`^${verseRef.chapter}\\s+${verse}\\s+`);
    var lastOfPsalm = !vulgatePsalms[vulgateLine+1] || !vulgatePsalms[vulgateLine+1].match(`^${verseRef.chapter}\\s+`);
    if(match) {
      vulgate = vulgate.slice(match[0].length).trim().split(/\s+/);
      var vi=0;
      while(vi < vulgate.length) {
        if(li >= liber.length) {
          li = 0;
          liber = (liberPsalm[++liberI] || '').trim().split(/\s+/);
        }
        if(normalize(liber[li]) == normalize(vulgate[vi])) {
          li++;
          if(typeof matched != 'number') matched = liberI;
        } else if((typeof matched=='number' || liberI > 0 || li > 0 || normalize(liber[li+1]) == normalize(vulgate[vi+2])) && vulgate.length > vi + 1 && normalize(liber[li]) == normalize(vulgate[vi+1])) {
          console.warn(`\n${psalmFileName} : ${verse}: missing word: ${vulgate[vi]}, \n${liber.join(' ')}\n${vulgate.join(' ')}`);
        } else if((typeof matched=='number' || liberI > 0 || li > 0 || normalize(liber[li+2]) == normalize(vulgate[vi+1])) && liber.length > li + 1 && normalize(liber[li+1]) == normalize(vulgate[vi])) {
          console.warn(`\n${psalmFileName} : ${verse}: missing word in vulgate: ${liber[li]}, \n${liber.join(' ')}\n${vulgate.join(' ')}`);
          ++li;
          continue;
        } else if((typeof matched=='number' || liberI > 0 || li > 0 || normalize(liber[li+2]) === normalize(vulgate[vi+2]) || normalize(liber[li+3]) === normalize(vulgate[vi+3])) &&
            vulgate.length > vi + 1 && liber.length > li + 1 && normalize(liber[li+1]) == normalize(vulgate[vi+1])) {
          console.warn(`\n${psalmFileName} : ${verse}: different words: ${liber[li]} and ${vulgate[vi]}, \n${liber.join(' ')}\n${vulgate.join(' ')}`);
          li++;
        } else if(!liber[li] && normalize(vulgate[vi]) == 'allelúia') {

        } else if(typeof matched=='number' || liberI > 0 || li > 0) {
          if(liberI > 0 && !lastOfPsalm) {
            console.error(`${psalmFileName} : ${verse}`, '\n'+liber.join(' '), "\nvs.\n", vulgate.join(' '));
            throw `error in psalm ${psalmFileName}: couldn't find verse ${liberI}:\n"${liber}" at word ${liber[li]},\n«${vulgate}»\nlength:${liber.length},${li}`;
          }
          if(lastOfPsalm) {
            console.warn(`Psalm ${psalmFileName} is missing last verse (${vulgate.join(' ')})`);
          } else {
            li = 0;
            matched = null;
          }
          break;
        }
        vi++;
      }
      if(typeof matched == 'number' && !((verse - 1) in psalmMap[psalm - 1])) {
        var vnum = verse - verseRef.verse - verseOffset;
        if(vnum >= 0) {
          psalmMap[psalm - 1][vnum] = matched;
        }
      }
      // console.info(`${psalmFileName} : ${verse}`, li, '\n'+liber.join(' '), "\nvs.\n", vulgate.join(' '));
      if(li == liber.length && liberI == liberPsalm.length) {
        liber = (liberPsalm[++liberI]||'').split(/\s+/);
      }
    } else {
      break;
    }
  }
  //console.info(`${verse-1} verses in psalm ${psalmFileName}`);
}
fs.writeFileSync('psalmMap.json','['+psalmMap.slice(0,150).map(m => JSON.stringify(m)).join(',\n')+']','utf8');
Object.keys(cantica).forEach((k,i) => {
  cantica[k] = {
    ref: cantica[k],
    map: psalmMap[150 + i]
  }
})
fs.writeFileSync('canticumMap.json',JSON.stringify(cantica), 'utf8');