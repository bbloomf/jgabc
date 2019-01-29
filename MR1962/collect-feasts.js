"use strict";
var fs = require("fs"),
    vr = require("../verseRef.js"),
    stringSimilarity = require('string-similarity'),
    dir = 'html/page',
    firstPage = 105,
    workingText = "",
    regexDiv = /<div class="txt" style="position:absolute; left:(\d+)px; top:(\d+)px;">(.*?)<\/div>\s*/g,
    fname,
    page,
    feastNames = [],
    propria = {},
    duplicatedFeasts = [],
    pagesWithGaps = [],
    problematicRefs = vr.problematicRefs;
var partKey = {
  'in': "Introitus", 
  'gr': "Graduale", 
  'tr': "Tractus", 
  'al': "Alleluia", 
  'seq': "Sequentia", 
  'of': "Offertorium", 
  'co': "Communio",
};
var removeAcuteAccents = (word) => (word.replace(/[ǽáéíóúýäë]|œ́/gi, (v => ({
  "Ǽ": "Æ",
  "Œ́": "Œ",
  "Á": "A",
  "Ä": "A",
  "É": "E",
  "Ë": "E",
  "Í": "I",
  "Ó": "O",
  "Ú": "U",
  "Ý": "Y",
  "ǽ": "æ",
  "œ́": "œ",
  "á": "a",
  "ä": "a",
  "é": "e",
  "ë": "e",
  "í": "i",
  "ó": "o",
  "ú": "u",
  "ý": "y"
})[v])));
require('../texts.js');

var spanIsRed = s => /color:rgba\(188/.test(s);
function allSpansAreRed(line) {
  var spans = line.match(/<span[^>]+\>/g);
  var contents = line.split(/<\/span>|<span[^>]+\>/g);
  return spanIsRed(spans[0]) && (spanIsRed(spans.slice(-1)[0]) || /^[\s\d\W]*$/.test(contents.slice(-2)[0]));
  // TODO: if it's red, it is a rubric of some kind and should maybe get stored somewhere.
}


function textFromLine(lines, i, nextPage, array = []) {
  var startI = i;
  var result = '';
  var ref = "";
  var gettingRef;
  var startI = i;
  if(array.withRef) {
    gettingRef = true;
  }
  while(lines[i] && !/¶/.test(lines[i].cnt) && !/___/.test(lines[i].cnt) && !allSpansAreRed(lines[i].cnt) && (startI == i || !/^<span[^>]+>(Allel[úu][ij]a|Tractus\b|L[ée]ctio\s|Sequ[eé]ntia\s+sancti\s+Evang[ée]lii\b|Or[ée]mus\b|✠)/.test(lines[i].cnt))) {
    if(gettingRef) {
      var spans = lines[i].cnt.match(/(<span[^>]+\>)[^<]+?(?=\s*<\/span>)/g);
      for(var j=0; j < spans.length; ++j) {
        if(i == startI && j == 0) continue; // on the first line, the first span is always the type of antiphon (communio, etc.)
        var span = spans[j];
        var spanText = span.replace(/<[^>]+>/g,'').trim()
        if(gettingRef && spanIsRed(span)) {
          ref += " " + spanText;
        } else {
          gettingRef = false;
          if(ref) {
            ref = vr.parseRef(ref).verseRefString();
          } else {
            // todo: make sure there isn't supposed to be a ref here?
          }
          result = (result + ' ' + spanText).trim();
        }
      }
      ++i;
      continue;
    }
    result += ' ' + lines[i].cnt.replace(/<[^>]+>/g,'');
    ++i;
    if(!lines[i] && nextPage) {
      i = 0;
      lines = nextPage;
      nextPage = null;
    }
  }
  array[0] = i;
  var text = result.replace(/([a-zäëïöüœæáéíóú])-\s+([a-zäëïöüœæáéíóú])/g,'$1$2').trim();
  text = text.replace(/\b(c)œ(l)/gi,"$1æ$2");
  text = text.replace(/\bv\.\s+/gi,"℣ ");
  return array.withRef? { ref, text } : text;
}
function addProperty(obj, key, val) {
  if(!(key in obj)) {
    obj[key] = val;
  } else {
    if(obj[key] && typeof obj[key] == 'object') {
      obj[key].push(val);
    } else {
      obj[key] = [obj[key], val];
    }
  }
  if(key in partKey) {
    // TODO: check all propers texts
    var txts = texts[partKey[key]];
    var txtKeys = Object.keys(txts);
    var arrayOfChoices = txtKeys.map(k => txts[k]);
    var text = removeAcuteAccents(val.toLowerCase()).replace(/[^℣\sa-zæœ]+/g,'').replace(/\s+/g,' ').replace(/( ℣)? ps( ib(id)?)?\b/g,' ℣').replace(/( ℣)? gloria patri( .*)?$/,' gloria patri').replace(/\balleluja\b/g,'alleluia');
    var sim = stringSimilarity.findBestMatch(text, arrayOfChoices);
    var bestMatch = txtKeys[sim.bestMatchIndex];
    if(sim.bestMatch.rating > 0.6) {
      obj[key+"ID"] = parseInt(bestMatch);
      if(sim.bestMatch.rating < 1) {
        obj[key+"ID-rating"] = sim.bestMatch.rating;
        obj[key+"ID-seekt"] = text;
        obj[key+"ID-found"] = sim.bestMatch.target;
      }
    } else if(sim.bestMatch.rating > 0) {
      obj[key+"ID-best"] = parseInt(bestMatch);
      obj[key+"ID-rating"] = sim.bestMatch.rating;
      obj[key+"ID-seekt"] = text;
      obj[key+"ID-beest"] = sim.bestMatch.target;
    }
  }
}
var currentProprium = null;
for(page = firstPage; fs.existsSync(fname = dir+page+'.html') && page < 583; ++page) {
  if(page >= 374 && page < 455) continue; // skip ordinaries
  console.info(`----- ${page} -----`)
  var content = fs.readFileSync(fname,'utf8'),
      ordered = [],
      header = null,
      nextFname = dir+(page+1)+'.html',
      nextPageContent = fs.existsSync(nextFname) && fs.readFileSync(nextFname,'utf8'),
      nextPage = [],
      match,
      addLines = (content,ordered) => {
        while(match = regexDiv.exec(content)) {
          var x = parseInt(match[1]);
          var y = parseInt(match[2]);
          var cnt = match[3];
          var col = 0;
          if(x > 198) {
            col = 1;
          }
          if(y < 30) {
            var text = cnt.replace(/<[^>]+>/g,'')
            if(!header && !/^\s*\d*\s*$/.test(text)) {
              header = text;
            }
          } else {
            ordered.push({x, y, cnt, col, section: 0});
          }
        }     
        ordered.sort(sort);
        handleGaps(ordered);
      },
      sort = (a,b) => ( (a.section - b.section) || (a.col - b.col) || (a.y - b.y) || (a.x - b.x)),
      // try to find gaps in the columns, for sorting purposes
      findColumnGaps = (state, line) => {
        // when we get to col 1, we're finished.
        if(line.col) {
          // we need to check if anything is starting in a supposed gap in the second column, and remove that gap if so.
          var gapIndex = state.gaps.findIndex(gap => (gap[0] - 1) <= line.y && (gap[1]) >= line.y);
          if(gapIndex >= 0) state.gaps.splice(gapIndex, 1);
          return state;
        }
        if(state.gap) {
          // if we're still in the midst of a gap
          if(line.x < 60 || />Introitus/.test(line.cnt)) {
            state.gaps.push([state.gap, line.y - 1]);
            delete state.gap;
          }
        } else {
          // check if a new gap has started
          if(line.x > 51) {
            if(state.lastX && state.lastX != line.x) {
              state.gap = state.possibleGap || line.y;
              state.possibleGap = state.lastX = null;
            } else {
              state.possibleGap = state.possibleGap || line.y;
              state.lastX = line.x;
            }
          } else {
            delete state.possibleGap;
            delete state.lastX;
            state.lineCount = 0;
          }
        }
        return state;
      },
      handleGaps = ordered => {
        var gaps = ordered.reduce(findColumnGaps, {gaps:[]}).gaps;
        if(gaps.length > 0) {
          ordered.forEach(line => {
            line.section = gaps.filter(gap => gap[0] <= line.y).length;
          });
          ordered.sort(sort);
          //debugger;
          if(ordered != nextPage) pagesWithGaps.push(page);
        }
      }
  addLines(content,ordered);

  addLines(nextPageContent, nextPage);
  var textlines = ordered.map(c => c.cnt.replace(/<[^>]+>/g,''));
  for(var i=0; i < ordered.length; ++i) {
    if(/^Introitus\./.test(textlines[i])) {
      currentProprium = {};
      var offset = 1;
      var previous = textlines[i-offset];
      while(previous && ordered[i-offset].cnt.match(/font-size:[89]px/)) {
        previous = textlines[i-(++offset)];
        if(/^¶/.test(previous)) {
          previous = null;
          break;
        }
      }
      if(!previous) {
        offset = i - 1 + (page % 2); // 0 on odd pages, 1 on even, since page number is at 0 on even and 1 on odd.
        previous = textlines[i-offset];

//         console.info(`${textlines[i-2]}
// ${textlines[i-1]}
// ${textlines[i]}
// (${page}) : ${i} ${offset}
// `);
      } else while(offset < i && /color:rgba\(188,25,41,1\)/.test(ordered[i-offset].cnt)) {
        previous = textlines[i-offset-1] + ', ' + textlines[i-offset];
        if(offset >= i) break;
        offset++;
        if(offset > 2 && i > 4 && offset < (i + 2)) {
          // offset = i - 1 + (page % 2); // 0 on odd pages, 1 on even, since page number is at 0 on even and 1 on odd.
          if(header == "In Nativitate Domini") {
            previous = header + ", " + previous;
          } else {
            previous = header;
          }
          break;
        }
      }
      if(/^[a-z]/.test(previous)) {
        previous = textlines[i-offset-1] + ' ' + previous;
      }
      if(/^(Feria|Sabbato)\b/.test(previous) && /^(Feria|Sabbato)\b/.test(header)) {
        previous = header;
      }
      feastNames.push(previous);
      var isDuplicateFeast = false;
      while(previous in propria) {
        isDuplicateFeast = isDuplicateFeast || {name: previous, count: 1};
        isDuplicateFeast.count++;
        previous = isDuplicateFeast.name + ` (${isDuplicateFeast.count})`;
      }
      if(isDuplicateFeast) {
        duplicatedFeasts.push({t:previous, page, header, previous: textlines.slice(i-3,i)});
        console.warn(`Duplicate feast: '${previous}'`);
      }
      propria[previous] = currentProprium;
      var inRef = textlines[i].slice(10).trim();
      if(!inRef) {
        if(/^(\d\.?\s*)?[A-Z][a-z]+[.,]?\s+\d+,/.test(textlines[i+1])) {
          inRef = textlines[++i];
        } else {
          //throw `${page}:\n${textlines[i-1]}\n${textlines[i+1]}`
          inRef = "";
        }
      }
      if(inRef) {
        inRef = currentProprium.inRef = vr.parseRef(inRef).verseRefString();
      }
      var introit = textFromLine(ordered,i+1, nextPage);
      addProperty(currentProprium, 'in', introit);
      currentProprium.startPage = page;
    //  console.info(feastNames.length + '. ' + previous + ` (${page}):\n  ${inRef}\n${introit}\n`);
    } else if(currentProprium) {
      if(/^Oratio\b/.test(textlines[i])) {
        var collect = textFromLine(ordered, i+1, nextPage);
        addProperty(currentProprium, 'collect', collect);
      } else if(/^L[ée]ctio\b/i.test(textlines[i])) {
        var array = [];
        var lectioIncipit = textFromLine(ordered, i, nextPage, array);
        var lectioRef = textlines[array[0]];
        var lectio = textFromLine(ordered, array[0]+1, nextPage);
        addProperty(currentProprium, 'lectioIncipit', lectioIncipit);
        addProperty(currentProprium, 'lectioRef', lectioRef);
        addProperty(currentProprium, 'lectio', lectio);
      } else if(/^Gr[áa]duale\b/.test(textlines[i])) {
        var graduale = textFromLine(ordered, i, nextPage, {withRef: true});
        addProperty(currentProprium, 'grRef', graduale.ref);
        addProperty(currentProprium, 'gr', graduale.text);
      } else if(/^Tr[áa]ctus\b/.test(textlines[i])) {
        var tractus = textFromLine(ordered, i, nextPage, {withRef: true});
        addProperty(currentProprium, 'trRef', tractus.ref);
        addProperty(currentProprium, 'tr', tractus.text);
      } else if(/^Allel[úu][ij]a\b/.test(textlines[i])) {
        var alleluia = textFromLine(ordered, i, nextPage, {withRef: true});
        addProperty(currentProprium, 'alRef', alleluia.ref);
        addProperty(currentProprium, 'al', alleluia.text.replace(/\s+allel[úu][ij]a\.?\s*$/i,''));
      } else if(/^✠/.test(textlines[i])) {
        var array = [];
        var evIncipit = textFromLine(ordered, i, nextPage, array).slice(1).trim();
        var evRef = textlines[array[0]];
        var ev = textFromLine(ordered, array[0]+1, nextPage);
        addProperty(currentProprium, 'evIncipit', evIncipit);
        addProperty(currentProprium, 'evRef', evRef);
        addProperty(currentProprium, 'ev', ev);
      } else if(/^Offert[óo]rium\b/.test(textlines[i])) {
        var offertorium = textFromLine(ordered, i, nextPage, {withRef: true});
        addProperty(currentProprium, 'ofRef', offertorium.ref);
        addProperty(currentProprium, 'of', offertorium.text);
      } else if(/^Secreta\b/.test(textlines[i])) {
        addProperty(currentProprium, 'secreta', textFromLine(ordered, i+1, nextPage));
      } else if(/^Comm[úu]nio\b/.test(textlines[i])) {
        var communio = textFromLine(ordered, i, nextPage, {withRef: true});
        addProperty(currentProprium, 'coRef', communio.ref);
        addProperty(currentProprium, 'co', communio.text);
      } else if(/Postcomm[úu]nio\b/.test(textlines[i])) {
        var postcommunio = textFromLine(ordered, i+1, nextPage);
        addProperty(currentProprium, 'postcommunio', postcommunio);
      } else if(/^Super\s+populum\b/i.test(textlines[i])) {
        i += 2;
        if(/^Oratio\b/.test(textlines[i])) {
          var superPopulum = textFromLine(ordered, i+1, nextPage);
          addProperty(currentProprium, 'superPopulum', superPopulum);
        }
      }
    }
  }
}
fs.writeFileSync('propria.json',JSON.stringify(propria,null,'\t'));
fs.writeFileSync('duplicates.json',JSON.stringify(Object.keys(propria).sort(),null,'\t'));
//fs.writeFileSync('duplicates.json',JSON.stringify(duplicatedFeasts,null,'\t'));
fs.writeFileSync('pagesWithGaps.json',JSON.stringify(pagesWithGaps,null,'\t'));
fs.writeFileSync('problematicRefs.json',JSON.stringify(problematicRefs,null,'\t'));
