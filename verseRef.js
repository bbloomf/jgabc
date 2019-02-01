var module;
var problematicRefs = {};
function Ref(ref, lastRef) {
  if(/^ibid$/i.test(this.book)) {
    this.ibid = lastRef || true;
  }
  this.book = ref.book;
  this.bookNum = ref.bookNum;
  this.chapter = ref.chapter;
  this.verse = ref.verse;
  this.endVerse = ref.endVerse;
}
Ref.prototype.verseString = function() { return `${this.verse? this.verse : ''}${this.endVerse? '-'+this.endVerse : ''}`; };
Ref.prototype.toString = function() { return `${this.bookNum? this.bookNum+' ' : ''}${this.book} ${this.chapter}${this.verse? ': '+this.verseString() : ''}`; };
function refArrayString(array) {
  if(!array.length) return "";
  var result = array[0].toString(),
      lastChapter = array[0].chapter;
  for(var i=1; i<array.length; ++i) {
    var ref = array[i];
    if(lastChapter != ref.chapter) {
      result += '; ' + ref.toString();
      lastChapter = ref.chapter;
    } else {
      result += ', ' + ref.verseString();
    }
  }
  return result;
}
function parseRef(refText) {
  var match = /[\sV℣.]*(?:([Ii]bid)[.,\s]*|(?:(\d)\.?\s*)?([A-Z][a-zæœáéíóú]+)\D*(\d+))\s*(?:[,:]?\s*(\d+)\s*(?:[-–—\s]+(\d+))?\s*)?(.*)/.exec(refText);
  if(!match) {
    problematicRefs[refText] = `Bad refText: "${refText}"`;
    return [];
  }
  var ibid = match[1],
      bookNum = match[2],
      book = ibid || match[3],
      chapter = ibid? "" : match[4],
      verse = match[5],
      endVerse = match[6],
      remaining = match[7],
      result = [];
  result.push(new Ref({bookNum, book, chapter, verse, endVerse}));
  while(remaining && (match = /\s*[.,]?\s*(?:et\s*)?(?:(?:(\d)\.?\s*)?([A-Z][a-zæœáéíóú]+)\D*(\d+)[,:\s]*)?(\d+)\s*(?:[-–—\s]+(\d+))?\s*(.*)/.exec(remaining))) {
    if(match[1]) bookNum = match[1];
    if(match[2]) {
      book = match[2];
      if(!match[1]) bookNum = null;
    }
    if(match[3]) chapter = match[3];
    verse = match[4];
    endVerse = match[5];
    remaining = match[6];
    result.push(new Ref({bookNum, book, chapter, verse, endVerse}));
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
  "co": "Communio"
};
function flattenMap(map, prefix = "", result = {}) {
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
function testId(pageIds, id, mode) {
  if(pageIds && !pageIds.includes(id)) console.warn(id);
  if(modes && mode && !modes[mode].includes(id)) console.warn(id, 'is not correct mode: ',mode);
  if(!mode) console.warn(id, 'has no mode');
  if(!pageIds) console.warn(id, 'has no page');
  return id;
}
function findIncipitId(incipitText, part, page, mode) {
  if(!incipits || !(typeof incipits == 'object')) return null;
  if(!part) {
    return [].concat.apply([],Object.keys(incipits).map(function(part) {
      return findIncipitId(incipitText, part);
    }));
  } else {
    var pageIds = null;
    if(pages && page) {
      pageIds = pages[page];
    }
    var map = incipits[part] || incipits[partMap[part.slice(0,2)]];
    var longestKey = Math.max(...Object.keys(map).map(k => k.length));
    var incipit = incipitText.toLowerCase().
      replace(/[^\sa-z.(]/g,'').
      replace(/(\s*(\.+\s+|\())?\b(ps|v)(\.|\b)/g,' .* ℣').
      replace(/\s*(\.+\s+|\()/g,' .* ').
      replace(/(\s+\.\*)+/g,' .*').
      trim().replace(/ae(?!l\b)/g,'æ').replace(/oe/g,'œ').split(/\s+/);
    var key;
    var flattened = false;
    for(var i=0,j=1; j <= incipit.length; ++j) {
      key = incipit.slice(i,j).join(' ');
      if(incipit[j - 2] == '.*') {
        map = Object.keys(map).reduce((r,k) => {
          r[k.replace(RegExp("^("+key.reverse().replace(/(\*\.)/,'($1)').reverse()+")"),"$1.*$2")] = map[k];
          return r;
        }, {})
      }
      if(key in map) {
        map = map[key];
        if(typeof map != 'object') return testId(pageIds,map,mode);
        longestKey = Math.max(...Object.keys(map).map(k => k.length));
        i = j;
        continue;
      } else {
        var regex = "^"+key.replace(/\s*\.\*\s*/g,'\\s*.*\\s*');
        // allow the .* to go to the very end if there is no versicle, since we might just not have the versicle
        regex = regex.replace(/\.\*\\s\*℣(.*)/,'([^℣]*$|.*\\s*$1)');
        var possibleKeys = Object.keys(map).filter(k => k.match(regex));
        map = possibleKeys.reduce((r,k) => {
          r[k] = map[k];
          return r;
        }, {});
        if(possibleKeys.length == 1) {
          var test = map[possibleKeys[0]];
          if(typeof test != 'object') return testId(pageIds,test,mode);
        }
        if(!flattened && incipit[j - 1] == '.*') {
          map = flattenMap(map);
        }
      }
      if(key.length > longestKey) return [];
    }
    map = flattenMap(map, incipit.slice(0,i).join(' '));
    if(pages && page) {
      var incipitIds = Object.keys(map).map(k => map[k]);
      if(pageIds && pageIds.length) {
        if(incipitIds && incipitIds.length) {
          var id = pageIds.filter(id => incipitIds.includes(id))[0];
          if(id) return id;
        }
      }
      var match = incipitText.match(/^([^(]+)\([^)]+\)\s*$/);
      if(match) return findIncipitId(match[1], part, page);
      match = incipitText.match(/(^[^.]+)\.+.*$/);
      if(match) return findIncipitId(match[1], part, page);
    }
    return map;
  }
}

if(module && module.exports) {
  module.exports.parseRef = parseRef;
  module.exports.refArrayString = refArrayString;
  module.exports.problematicRefs = problematicRefs;
  module.exports.flattenMap = flattenMap;
  module.exports.findIncipitId = findIncipitId;
}