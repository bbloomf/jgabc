var module;
var problematicRefs = {};

(function() {

function Ref(ref, lastRef) {
  if(/[IV]/i.test(ref.bookNum||"")) {
    ref.bookNum = ref.bookNum.replace(/iv/i,'iiii').trim().length;
  }
  if(ref.book == 'Esdr' && ref.bookNum == 2) {
    delete ref.bookNum;
    ref.book = 'Neh';
  }
  if(/^ibid$/i.test(this.book)) {
    this.ibid = lastRef || true;
  }
  this.book = ref.book;
  this.bookNum = ref.bookNum;
  this.chapter = ref.chapter;
  this.verse = ref.verse;
  this.endVerse = ref.endVerse;
}
var psalmMap, psalmMapPromise, canticumMap, canticumMapPromise, canticumMapByFile;
Ref.prototype.bookString = function() { return (this.bookNum? this.bookNum+' ' : '') + this.book; }
Ref.prototype.verseString = function() { return (this.verse? this.verse : '') + (this.endVerse? '-'+this.endVerse : ''); };
Ref.prototype.toString = function() { return this.bookString() + ' ' +(this.chapter||'') + (this.verse? ': '+this.verseString() : ''); };
Ref.prototype.getEndVerse = function() { return this.endVerse || this.verse; }
Ref.prototype.getLinesFromLiber = function() {
  var urlRoot = /psalms\/[^/]*$/.test(location.pathname)? "../" : "";
  var self = this;
  var psalm, map, startVerse = 1;
  if(/^Ps/.test(self.book)) {
    psalm = ('00'+self.chapter).slice(-3);
    if(!psalmMap) {
      if(!psalmMapPromise) {
        psalmMapPromise = $.getJSON(urlRoot+'psalmMap.json').then(function(map) {
          psalmMap = map;
        });
      }
      return psalmMapPromise.pipe(function() {
        return self.getLinesFromLiber();
      });
    }
    map = psalmMap[this.chapter - 1];
  } else {
    // canticle?
    if(!canticumMap) {
      if(!canticumMapPromise) {
        canticumMapPromise = $.getJSON(urlRoot+'canticumMap.json').then(function(map) {
          canticumMap = {};
          canticumMapByFile = map;
          Object.keys(map).forEach(function(k) {
            var ref = parseRef(map[k].ref)[0];
            var book = mapBooks[ref.book] || ref.book;
            if(!(book in canticumMap)) {
              canticumMap[book] = {};
            }
            var bookMap = canticumMap[book];
            if(!(ref.chapter in bookMap)) {
              bookMap[ref.chapter] = {};
            }
            var chapterMap = bookMap[ref.chapter];
            chapterMap[ref.verse] = map[k];
            map[k].file = k;
          });
        });
      }
      return canticumMapPromise.pipe(function() {
        return self.getLinesFromLiber();
      });
    }
    var book = mapBooks[self.book] || self.book;
    if(book in canticumMapByFile) {
      psalm = book;
      map = canticumMapByFile[book].map;
    } else {
      var bookMap = canticumMap[book];
      if(!bookMap) return [];
      var chapterMap = bookMap[self.chapter];
      if(!chapterMap) return [];
      var startVerse = Object.keys(chapterMap).map(function(i) { return parseInt(i); }).filter(function(i) { return i<=self.verse; }).sort().slice(-1)[0];
      map = chapterMap[startVerse];
      psalm = map.file;
      map = map.map;
    }
  }
  
  return $.get(urlRoot+"psalms/"+psalm).pipe(function(liber) {
    liber = liber.trim().replace(/\r\n?/g,'\n').split('\n');
    return [].concat.apply([], map.map(function(a, index) {
      var b = map[index + 1],
          c = map[index - 1],
          verseNum = index + startVerse,
          verseI = 1;
      if(typeof a != 'number') a = Infinity;
      if(b === a) ++b;
      if(c === a || (self.startInMiddle && parseInt(self.verse) === verseNum) && b > a+1) {
        ++a;
        ++verseI;
      }
      if(!self.verse || (verseNum >= self.verse && verseNum <= self.getEndVerse())) {
        var liberVerses = liber.slice(a, b||undefined);
        if(liberVerses.length == 1 && verseI == 1) verseI = 0;
        return liberVerses.map(function(verse,i) { return verseNum + ((verseI? (verseI + i + 9) : "").toString(36)) + '. ' + verse;});
      }
      return [];
    }));
  });
}
function refArrayString(array) {
  if(!array.length) return "";
  var result = array[0].toString(),
      lastChapter = array[0].chapter,
      lastBook = array[0].bookString();
  for(var i=1; i<array.length; ++i) {
    var ref = array[i];
    if(lastBook != ref.bookString() || !ref.verse) {
      result += '; ' + ref.toString();
    } else if(lastChapter != ref.chapter) {
      if(ref.book == 'Ps') {
        result += '; ' + ref.toString();
      } else {
        result += '; ' + ref.chapter + ': ' + ref.verseString();
      }
    } else {
      result += ', ' + ref.verseString();
    }
    lastChapter = ref.chapter;
    lastBook = ref.bookString();
  }
  return result;
}
function parseRef(refText) {
  var ibid,
      bookNum,
      book,
      chapter,
      verse,
      endVerse,
      remaining,
      result = [];
  var match = /^Psalm ([A-ZÆŒa-zæœ\(\)\s]+)(?:^|\s+)(?:(\d+)(?:-(\d+))?)?[,;.]?(.*)$/.exec(refText);
  if(match) {
    // canticle
    book = match[1];
    verse = match[2];
    endVerse = match[3];
    remaining = match[4];
  } else {
    match = /[\sV℣.]*(?:([Ii]bid)[.,\s]*|(?:([\dIV]+)\.?\s*)?([A-ZÆŒ][a-zæœáéíóú]+)\W*(\d+))\s*(?:[,:]?\s*(\d+)\s*(?:[-–—\s]+(\d+))?\s*)?(.*)/.exec(refText);
    if(!match) {
      problematicRefs[refText] = 'Bad refText: "' + refText + '"';
      return [];
    }
    ibid = match[1];
    bookNum = match[2];
    book = ibid || match[3];
    chapter = ibid? "" : match[4];
    verse = match[5];
    endVerse = match[6];
    remaining = match[7];
    if(chapter && !verse && (match = remaining.match(/^\s*-\s*(\d+)/))) {
      verse = chapter;
      chapter = 1;
      endVerse = match[1];
      remaining = remaining.slice(match[0].length);
    }
  }
  if(endVerse && parseInt(endVerse) < parseInt(verse)) console.error( "incorrect reference: " + refText + ', ' + endVerse + ' < ' + verse);
  result.push(new Ref({bookNum:bookNum, book:book, chapter:chapter, verse:verse, endVerse:endVerse}));
  while(remaining && (match = /\s*[.,]?\s*(?:et\s*)?(?:(?:([\dIV]+)\.?\s*)?([A-Z][a-zæœáéíóú]+)\W*(\d+)[,:\s]*|;\s*(\d+)[:,]\s*|(\d+):\s*|(\d+))(\d+)?\s*(?:[-–—\s]+(\d+))?\s*(.*)/.exec(remaining))) {
    if(match[1]) bookNum = match[1];
    if(match[2]) {
      book = match[2];
      if(!match[1]) bookNum = null;
    }
    chapter = match[3] || match[4] || match[5] || chapter;
    verse = match[6] || match[7];
    endVerse = match[8];
    remaining = match[9];
    if(endVerse && parseInt(endVerse) < parseInt(verse)) console.error( "incorrect reference: " + refText + ', ' + endVerse + ' < ' + verse);
    result.push(new Ref({bookNum:bookNum, book:book, chapter:chapter, verse:verse, endVerse:endVerse}));
  }
  // test ref:
  var regexUnimportant = /\bV\b|[℣.\s]/g;
  var regexComma = /\bet\b|[,:;]/g;
  if(refText.replace(regexComma,',').replace(regexUnimportant,'').replace(/[–—]/g,'-') != refArrayString(result).replace(regexComma,',').replace(regexUnimportant,'')) {
    problematicRefs[refText] = result;
    problematicRefs[refText.replace(regexComma,',').replace(regexUnimportant,'').replace(/[–—]/g,'-')] = refArrayString(result).replace(regexComma,',').replace(regexUnimportant,'')
  }
  return result;
}
Array.prototype.verseRefString = function() {
  return refArrayString(this);
}


var partMap = {
  "in": "Introitus",
  "gr": "Graduale",
  "hy": "Hymnus",
  "tr": "Tractus",
  "al": "Alleluia",
  "se": "Sequentia",
  "of": "Offertorium",
  "co": "Communio",
  "an": "Antiphona",
  "re": "Responsorium"
};
function flattenMap(map, prefix, result) {
  prefix = prefix || "";
  result = result || {};
  Object.keys(map).forEach(function(key) {
    var subMap = map[key];
    var fullKey = (prefix + " " + key).trim();
    if(typeof subMap == 'object') {
      flattenMap(subMap, fullKey, result);
    } else {
      result[fullKey] = subMap;
    }
  });
  return result;
}

String.prototype.reverse = function() {
  return this.split("").reverse().join('');
}

var exports = module && module.exports || window || {};
if(exports) {
  exports.parseRef = parseRef;
  exports.refArrayString = refArrayString;
  exports.problematicRefs = problematicRefs;
  exports.flattenMap = flattenMap;
}

})();
