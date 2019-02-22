"use strict";
var fs = require("fs"),
    empty = require('./texts.js'),
    stringSimilarity = require('string-similarity'),
    vr = require("./verseRef.js"),
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
    mapSpecial = {
      SMadvent: dirCommune+'C10a',
      SMchristmas: dirCommune+'C10b',
      SMlent: dirCommune+'C10c',
      SMeaster: dirCommune+'C10Pasc',
      SMpentecost: dirCommune+'C10',
      ChristusRex: dirSancti+'10-DU',
      votiveSCJ: dirTempora+'Pent02-5',
      SCJ: dirTempora+'Pent02-5',
      // votiveST: '',
      // votiveA: '',
      // votiveSS: '',
      // votiveSES: '',
      // votiveJCSES: '',
      // votiveSC: '',
      // votivePJC: '',
      // votiveJ: '',
      // votivePP: '',
      // votiveOA: '',
      // nuptialis: '',
      defunctorum: dirCommune+'C9',
      dedicatio: dirCommune+'C8',
      Epi: dirSancti+'01-06',
      Asc: dirTempora+'Pasc5-4',
      CorpusChristi: dirTempora+'Pent01-4',
      EmbWedSept: dirTempora+'093-3',
      EmbFriSept: dirTempora+'093-5',
      EmbSatSept: dirTempora+'093-6'
      // EmbSatSeptS: '',
      // Adv3ss: '',
      // Pasc7ss: '',
    },
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
    lex = {},
    partKey = {
      Introitus: 'in',
      Graduale: 'gr',
      Tractus: 'tr',
      Alleluia: 'al',
      Sequentia: 'seq',
      Offertorium: 'of',
      Communio: 'co'
    },
    regexForPart = {
      Introitus: /\[Introitus[A-Zd]*\]\n(?:\!([^\r\n]+))?\nv\.\s+((?:.*~\n)*(?:.*))\n\!([^\r\n]+)\n((?:.*~\n)*(?:.*))/g
    }

function getPropers(info) {
  Object.keys(partKey).forEach(part => {
    var partRegex = regexForPart[part] || new RegExp(`\\[${part}[A-Z\d]*\\]\\n[^\\r\\n]*\\n\\![^\\r\\n]+`,'g');
    var match;
    while(match = partRegex.exec(info)) {
      console.info(part, match[0])
    }
    // TODO: check all propers texts
    // TODO: check lectio refs as well
    var key = partKey[part];
    var txts = texts[part];
    var txtKeys = Object.keys(txts);
    var arrayOfChoices = txtKeys.map(k => txts[k]);
    var text = removeAcuteAccents(val.toLowerCase()).replace(/[^℣\sa-zæœ]+/g,'').replace(/\s+/g,' ').replace(/( ℣)? ps( ib(id)?)?\b/g,' ℣').replace(/( ℣)? gloria patri( .*)?$/,' gloria patri').replace(/\balleluja\b/g,'alleluia');
    var sim = stringSimilarity.findBestMatch(text, arrayOfChoices);
    var bestMatch = txtKeys[sim.bestMatchIndex];
    if(sim.bestMatch.rating > 0.6) {
      addProperty(obj,key+"ID", parseInt(bestMatch));
      if(sim.bestMatch.rating < 1) {
        addProperty(obj,key+"ID-rating", sim.bestMatch.rating);
        addProperty(obj,key+"ID-seekt", text);
        addProperty(obj,key+"ID-found", sim.bestMatch.target);
      }
    } else if(sim.bestMatch.rating > 0) {
      addProperty(obj,key+"ID-best", parseInt(bestMatch));
      addProperty(obj,key+"ID-rating", sim.bestMatch.rating);
      addProperty(obj,key+"ID-seekt", text);
      addProperty(obj,key+"ID-beest", sim.bestMatch.target);
    }
  });
}

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
  match = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\d+)(?:_(\d)|or\d+)?$/.exec(key);
  if(match) {
    dir = dirSancti;
    k = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec'.indexOf(match[1]) / 4;
    k = ('0' + (1+k)).slice(-2);
    ending = ('0' + match[2]).slice(-2);
    if(match[3]) ending += 'm' + match[3];
  }

  var fname = `${dir}${k}-${ending}.txt`;
  if(key in mapSpecial) {
    dir = '';
    k = mapSpecial[key];
    fname = k + '.txt';
  }

  var exists = fs.existsSync(fname);
  if(!exists) {
    if(key in mapSpecial) {
      throw fname;
    }
    fname = `${dir}${k}-${ending}r.txt`;
    exists = fs.existsSync(fname);
    if(!exists) {
      notFound.push(`${dir}${k}-${ending}.txt`);
      return;
    }
  }
  var info = fs.readFileSync(fname,'utf8');

  // TODO: check all propers texts
  // stringSimilarity.findBestMatch(string, arrayOfChoices)

  var lectiones = info.match(/\[(Lectio(?:L\d+)?|Evangelium)\]\n[^\r\n]*\n\![^\r\n]+/g);
  while(!lectiones) {
    var reference = info.match(/\[Rule\]\n(.*[\n;](?!\n))*(vide|ex)\s+([^;\n]+)/);
    if(!reference) reference = info.match(/\[Rank1960\]\n(.*[\n;](?!\n))*(vide|ex)\s+([^;\n]+)/);
    if(!reference) reference = info.match(/\[Rank\]\n(.*[\n;](?!\n))*(vide|ex)\s+([^;\n]+)/);
    if(!reference) break;
    fname = reference[3];
    if(fname.indexOf('/') < 0) {
      if(/^C/.test(fname)) {
        fname = dirCommune + fname
      } else {
        fname = dir + fname;
      }
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
    var match = lectio.match(/(?:^|\n)!([^\r\n]+)/);
    var ref = vr.parseRef(match[1]);
    console.info(ref.verseRefString())
    return ref.verseRefString();
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
console.info(missing.length);
console.info(notFound);
console.info(notFound.length);