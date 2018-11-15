"use strict";
var fs = require("fs"),
    dirMain = '../divinum-officium-website/web/www/missa/Latin/',
    dirTempora = dirMain + 'Tempora/',
    dirSancti = dirMain + 'Sancti/',
    dirCommune = dirMain + 'Commune/',
    //vulgatePsalms = fs.readFileSync('psalms/vulgate','utf8').replace(regexNonWord,' ').toLowerCase().split('\n');
    proprium = require("./propersdata.js").proprium,
    keys = Object.keys(proprium),
    daysOfWeek = ' mtwhfs',
    notFound = [],
    missing = [],
    mapBooks = {
      "Act": "Actus Apostolorum",
      "Acts": "Actus Apostolorum",
      "Col": "Ad Colossenses",
      "Cor": "Ad Corinthios",
      "Dan": "Daniel",
      "Deut": "Deuteronomium",
      "Eccli": "Sapientia",
      "Ephes": "Ad Ephesios",
      "Esth": "Esther",
      "Exod": "Exodus",
      "Ezech": "Ezechiel",
      "Gal": "Ad Galatas",
      "Gen": "Genesis",
      "Hebr": "Ad Hebræos",
      "Is": "Isaias",
      "Isa": "Isaias",
      "Jas": "Jacobi",
      "Jer": "Jeremias",
      "Joann": "Joannes",
      "Joannes": "Joannes",
      "Joel": "Joel",
      "John": "Joannis",
      "Jonæ": "Jonas",
      "Judith": "Judith",
      "Lev": "Leviticus",
      "Luc": "Lucas",
      "Mach": "Machabæorum",
      "Marc": "Marcus",
      "Matt": "Matthæus",
      "Num": "Numeri",
      "Pet": "Petri",
      "Petri": "Petri",
      "Phil": "Ad Philippenses",
      "Philipp": "Ad Philippenses",
      "Reg": "Regum",
      "Rom": "Ad Romanos",
      "Thess": "Ad Thessalonicenses"
    },
    mapTitle = {},
    lex = {};

keys.forEach(key => {
  if(/(Pasch|Quad)$/.test(key)) return;
  var dir = dirTempora;
  var k = key;
  var match = /^Pent(\d)(\D*)$/.exec(k);
  if(match && match[1]==='0') {
    k = `Pasc7${match[2]}`;
  } else if(match) {
    k = `Pent0${match[1]}${match[2]}`;
  }
  match = /^([567])a([mtwhfs]?)$/.exec(k);
  if(match) {
    k = `Quadp${8-match[1]}${match[2]}`;
  }
  match = /\d([mtwhfs])?$/.exec(k);
  var ending = '0';
  if(match && match[1]) {
    k = k.slice(0,-1);
    ending = daysOfWeek.indexOf(match[1]);
  }
  // check if from Sancti:
  match = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\d+)$/.exec(key);
  if(match) {
    dir = dirSancti;
    k = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec'.indexOf(match[1]) / 4;
    k = ('0' + (1+k)).slice(-2);
    ending = ('0' + match[2]).slice(-2);
  }

  var fname = `${dir}${k}-${ending}.txt`;
  var exists = fs.existsSync(fname);
  if(!exists) {
    notFound.push(fname);
    return;
  }
  var info = fs.readFileSync(fname,'utf8');
  var lectiones = info.match(/\[(Lectio(?:L\d+)?|Evangelium)\]\n[^\r\n]*\n\![^\r\n]+/g);
  while(!lectiones) {
    var reference = info.match(/\[Rule\]\n(.*[\n;](?!\n))*(vide|ex)\s+([^;\n]+)/);
    if(!reference) reference = info.match(/\[Rank1960\]\n(.*[\n;](?!\n))*(vide|ex)\s+([^;\n]+)/);
    if(!reference) reference = info.match(/\[Rank\]\n(.*[\n;](?!\n))*(vide|ex)\s+([^;\n]+)/);
    if(!reference) break;
    fname = reference[3];
    if(fname.indexOf('/') < 0) {
      fname = dirCommune + fname;
    } else {
      fname = dirMain + fname;
    }
    fname += '.txt';
    exists = fs.existsSync(fname);
    if(!exists) {
      throw 'Not found: ' + fname + ` (${k}-${ending}})`;
      return;
    }
    info = fs.readFileSync(fname,'utf8');
    lectiones = info.match(/\[(Lectio(?:L\d+)?|Evangelium)\]\n[^\r\n]*\n\![^\r\n]+/g);
  }
  if(!lectiones) {
    missing.push(fname + ': ' + key);
    return;
  }
  lex[key] = lectiones.map(lectio => {
    var match = /\n\s*([^\n\r\.]+)[\s\.P]*\n\s*\!((?:(\d)\s+)?((?:[\dIV]+\.?\s+)?([A-Z][a-zæœáéíóúýäëïöüÿ]+))\.?\s+([\dl:,; -]+))\.?\s*/.exec(lectio);
    if(!match) throw lectio;
    var bookNumber = match[3];
    bookNumber = bookNumber? (bookNumber + ' ') : '';
    var bookAbbreviation = match[4];
    var numbers = match[6].replace(/l/g,'1');
    var title = mapTitle[bookAbbreviation];
    if(title && title != match[1]) {
      // console.info(bookAbbreviation, '\n', title, '\n' , match[1]);
    } else {
      mapTitle[match[5]] = match[1];
    }
    console.info(`${bookAbbreviation} ${numbers}`);
    return `${bookNumber}${bookAbbreviation} ${numbers}`;
  });
});
fs.writeFileSync('lectiones.js', `var lectiones = ${JSON.stringify(lex,0,' ')};
var mapTitleLectionis = ${JSON.stringify(mapTitle)}`, 'utf8');
//console.info(mapTitle);
//console.info(missing);
//console.info(missing.length);
console.info(notFound);