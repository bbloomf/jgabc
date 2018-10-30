"use strict";
var fs = require("fs"),
    dir = '../divinum-officium-website/web/www/missa/Latin/Tempora/',
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
  var fname = `${dir}${k}-${ending}.txt`;
  var exists = fs.existsSync(fname);
  if(!exists) {
    notFound.push(key);
    return;
  }
  var info = fs.readFileSync(fname,'utf8');
  var lectiones = info.match(/\[(Lectio(?:L\d+)?|Evangelium)\]\n[^\r\n]*\n\![^\r\n]+/g);
  if(!lectiones) {
    missing.push(key);
    return;
  }
  lex[key] = lectiones.map(lectio => {
    var match = /\n\s*([^\n\r\.]+)[\s\.P]*\n\s*\!((?:(\d)\s+)?([A-Z][a-zæœáéíóúäëïöüÿ]+)\.?\s+([\dl:,; -]+))\.?\s*/.exec(lectio);
    if(!match) throw lectio;
    var bookNumber = match[3];
    bookNumber = bookNumber? (bookNumber + ' ') : '';
    var bookAbbreviation = match[4];
    var numbers = match[5].replace(/l/g,'1');
    var title = mapTitle[bookAbbreviation];
    if(title && title != match[1]) {
      // console.info(bookAbbreviation, '\n', title, '\n' , match[1]);
    } else {
      mapTitle[bookAbbreviation] = match[1];
    }
    console.info(`${bookAbbreviation} ${numbers}`);
    return `${bookNumber}${bookAbbreviation} ${numbers}`;
  });
});
fs.writeFileSync('lectiones.js', `var lectiones = ${JSON.stringify(lex)};
var mapTitleLectionis = ${JSON.stringify(mapTitle)}`, 'utf8');
console.info(mapTitle);
// console.info(missing);
// console.info(missing.length);