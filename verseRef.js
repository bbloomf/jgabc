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
    if(match[2]) book = match[2];
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

if(module && module.exports) {
  module.exports.parseRef = parseRef;
  module.exports.refArrayString = refArrayString;
  module.exports.problematicRefs = problematicRefs;
}