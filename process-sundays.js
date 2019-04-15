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
    mapBooksWithNumber = {
      "Joann": "Joannis"
    },
    mapBooks = {
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
      "Heb": "Ad Hebræos",
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
      "Levit": "Leviticus",
      "Luc": "Lucas",
      "Mach": "Machabæorum",
      "Malach": 'Malachias',
      "Marc": "Marcus",
      "Matt": "Matthæus",
      "Mich": "Michæa",
      "Neh": "Nehemiæ",
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
      "Sir": "Ecclesiasticus",
      "Thess": "Ad Thessalonicenses",
      "Tim": "Ad Timotheum",
      "Tit": 'Ad Titum',
      "Tob": 'Tobiæ',
      "Tobias": 'Tobiæ',
      "Zach": "Zacharias"
},
    mapTitle = {},
    lex = {
      votiveMPI: [
        "Jacobi 5: 13-16",
        "Matthæus 8: 5-13"
      ],
      votiveECJ: [
        "Ad Ephesios 3: 8-19",
        "Lucas 22: 15-20"
      ],
      ECJ: [
        "Ad Ephesios 3: 8-19",
        "Lucas 22: 15-20"
      ],
      litaniis: [
        "Jacobi 5: 16-20",
        "Lucas 11: 5-13"
      ],
      votiveST: [
        "2 Ad Corinthios 13: 11, 13",
        "Joannes 15: 26-27; 16: 1-4"
      ],
      votiveA: [
        "Apocalypsis 5: 11-14",
        "Joannes 1: 47-51"
      ],
      votiveJ: [
        "Genesis 49: 22-26",
        "Lucas 3: 21-23",
      ],
      votivePP: [
        "Actus Apostolorum 5: 12-16",
        "Matthæus 19: 27-29"
      ],
      votiveOA: [
        "Ad Ephesios 4: 7-13",
        "Matthæus 19: 27-29"
      ],
      votiveSS: [
        "Actus Apostolorum 8: 14-17",
        "Joannes 14: 23-31"
      ],
      votiveSES: [
        "1 Ad Corinthios 11: 23-29",
        "Joannes 6: 56-59"
      ],
      votiveJCSES: [
        "Ad Hebræos 5: 1-11",
        "Lucas 22: 14-20"
      ],
      votiveSC: [
        "Ad Philippenses 2: 8-11",
        "Matthæus 20: 17-19"
      ],
      votivePJC: [
        "Zacharias 12: 10-11; 13: 6-7",
        "Joannes 19: 28-35"
      ],
      nuptialis: [
        "Ad Ephesios 5: 22-33",
        "Matthæus 19: 3-6"
      ],
      votiveESP: [
        "Ad Hebræos 4: 16; 5: 1-7",
        "Joannes 14: 15-21"
      ],
      votiveFP: [
        "Ecclesiasticus 36: 1-10, 17-19",
        "Matthæus 9: 35-38"
      ],
      votiveED: [
        "Esther 13: 8-11, 15-17",
        "Lucas 11: 5-13"
      ],
      votiveUE: [
        "Ad Ephesios 4: 1-7, 13-21",
        "Joannes 17: 1, 11-23"
      ],
      votiveTB: [
        "Jeremias 42: 1-2, 7-12",
        "Matthæus 24: 3-8"
      ],
      votiveP: [
        "2 Machabæorum 1: 1-5",
        "Joannes 20: 19-23"
      ],
      votiveVM: [
        "2 Regum 24: 15-19, 25",
        "Lucas 4: 38-44"
      ],
      votiveRP: [
        "Ad Romanos 7: 22-25",
        "Lucas 11: 9-13"
      ],
      votivePIA: [
        "Genesis 28: 10-12, 13-15, 18, 20-22",
        "Matthæus 10: 7-14"
      ],
      votiveGBM: [
        "Ad Romanos 14: 7-12",
        "Lucas 21: 34-36"
      ],
      votiveQN: [
        "Jeremias 14: 7-8, 9",
        "Marcus 11: 22-26"
      ],
      Quad6s: [
        "Ad Colossenses 3: 1-4",
        "Matthæus 28: 1-7"
      ],
      Quad6t_v: [
        "Jeremias 11: 18-20",
        "Marcus 14: 1-72; 15: 1-46"
      ],
      Quad6w_v: [
        "Isaias 62: 11; 63: 1-7",
        "Isaias 53: 1-12",
        "Lucas 22: 1-71; 23: 1-53"
      ],
      Quad6_v: [
        "Ad Philippenses 2: 5-11",
        "Matthæus 26: 1-75; 27: 1-66"
      ],
      Quad6h_v: [
        "1 Ad Corinthios 11: 20-32",
        "Joannes 13: 1-15"
      ],
      Quad6s_v: [
        "Ad Colossenses 3: 1-4",
        "Matthæus 28: 1-7"
      ]
    },
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
  if(k == 'Quad5' && ending == 5) ending += "Feria"; // Otherwise, Quad5-5 is Septem Dolorum
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
      if(/s$/i.test(key) && (key.slice(0,-1) in proprium)) return;
      if(!(key in lex) && !proprium[key].title) {
        notFound.push(`${dir}${k}-${ending}.txt`);
      }
      return;
    }
  }
  var info = fs.readFileSync(fname,'utf8');

  // TODO: check all propers texts
  // stringSimilarity.findBestMatch(string, arrayOfChoices)
  var regexLectiones = /\[(Lectio(?:L\d+)?)\]\n(?:[^\s@!][^\n]*\n)*(?:@[^~\n]+|[^\r\n]*\n![^~\n]+\n([^~\n]+~\n)*[^~\n]*)(?:\n|$)/g;
  var regexEvangelium = /\[Evangelium\]\n(?:[^\s!][^\n]*\n)*(?:@[^~\n]+\n|[^\r\n]*\n![^~\n]+\n([^~\n]+~\n)*[^~\n]*)(?:\n|$)/;
  var regexLectio = /\[[^\]]+\]\n(?:[^\s@!][^\n]*\n)*(?:@[^~\n]+|[^\r\n]*\n![^~\n]+\n([^~\n]+~\n)*[^~\n]*)\n/;
  var lectiones = info.match(regexLectiones);
  var evangelium = info.match(regexEvangelium);
  while(!lectiones || !evangelium) {
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
    if(!lectiones) lectiones = info.match(regexLectiones);
    if(!evangelium) evangelium = info.match(regexEvangelium);
  }
  if(!lectiones || !evangelium) {
    missing.push(fname + ': ' + key);
    return;
  }
  lectiones.push(evangelium[0]);
  var regex = /(?:^|\n)(?:[^\s@!][^\n]*\n)*(?:!([^\r\n]+)\n((?:[^~\n]+~\n)*[^~\n]*)|@([^:\n]*):([^\n]+)\n)(?:\n|$)/;
  lex[key] = lectiones.map(lectio => {
    var match = lectio.match(regex);
    while(match[4]) {
      let fname = dirMain + match[3] + '.txt';
      var contents = match[3]? fs.readFileSync(fname,'utf8') : info;
      lectio = contents.slice(contents.indexOf(`[${match[4]}]`)).match(regexLectio)[0];
      match = lectio.match(regex);
    }
    var ref = vr.parseRef(match[1]);
    var fullText = match[2].replace(/\s*~\n\s*/g,' ');
    var show = ref[0].book.match(/Eccli/);
    // console.info(fullText)
    var referencedVulgate = getReading(ref).replace(/\s+/g,' ');
    var similarity = stringSimilarity.compareTwoStrings(fullText, referencedVulgate);
    if(show || similarity < 0.4) {
      console.info(fname);
      console.info(`${ref.verseRefString()}: ${similarity}`)
      console.info('--');
      console.info(referencedVulgate);
      console.info('--');
      console.info(fullText);
      console.info('');
    }
    return ref.verseRefString();



    var match = /\n\s*([^\n\r\.]+)[\s\.P]*\n\s*\!((?:(\d)\s+)?((?:[\dIV]+\.?\s+)?([A-Z][a-zæœáéíóúýäëïöüÿ]+))\.?\s+([\dl:,; -]+))\.?\s*\n((?:[^~\n]+~\n)*[^~\n]*)(?:\n|$)/.exec(lectio);
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
    var fullText = match[7].replace(/\s*~\n\s*/g,' ');
    console.info(`${bookAbbreviation} ${numbers}: ${fullText}`);
    return `${bookNumber}${bookAbbreviation} ${numbers}`;
  });
});



function getReading(source) {
  var edition = 'vulgate';
  var language = 'la';
  return source.map(src => {
    if(src.bookNum && src.book in mapBooksWithNumber) {
      src.book = mapBooksWithNumber[src.book];
    } else if(src.book in mapBooks) {
      src.book = mapBooks[src.book];
    }
    var bookName = src.book;
    if(src.bookNum) bookName += ' ' + src.bookNum;
    var book = fs.readFileSync(edition+'/'+bookName,'utf8');

    var text = '';
    var wholeChapter = !src.verse;
    if(wholeChapter) src.verse = 1;
    var beginning = (src.chapter == 1 && src.verse == 1)? '' : '\n';
    var beginIndex = book.indexOf(`${beginning}${src.chapter}\t${src.verse}\t`);
    if(beginIndex < 0) {
      text += `${src.book} Verse ${src.chapter}: ${src.verse} was not found.\n`;
      return text;
    }
    if(beginning) beginIndex++;
    var temp = book.slice(beginIndex);
    var endIndex = 0;
    if(wholeChapter) {
      endIndex = temp.indexOf(`\n${src.chapter- -1}\t1\t`);
      if(endIndex < 0) endIndex = temp.length-1;
    } else if(src.endVerse) {
      endIndex = temp.indexOf(`\n${src.chapter}\t${src.endVerse}\t`) + 1;
    }
    endIndex = temp.indexOf('\n',endIndex);
    if(endIndex < 0) endIndex = temp.length;
    text += temp.slice(0,endIndex) + ' ';
    text = text.trim();
    return text.replace(/(^|\n)\d+\t\d+\t([^\n]+)/g,'$1$2');
  }).join(' ');
}

fs.writeFileSync('lectiones.js', `var lectiones = ${JSON.stringify(lex,0,' ')};
var mapTitleLectionis = ${JSON.stringify(mapTitle)}`, 'utf8');
//console.info(mapTitle);
//console.info(missing);
console.info(missing);
console.info(notFound);
console.info(notFound.length);