const fs = require('fs');
const path = require('path');
const vm = require('vm');
let latin;
function hyphenateLatin(word) {
  if (!latin) {
    const Hypher = require('hypher');
    // Load the same local pattern wrapper as download-gabc, without creating a
    // global window or changing Hypher's shared language registry.
    function LocalHypher(patterns) { return new Hypher(patterns); }
    LocalHypher.languages = {};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname,'patterns/la-hypher.js'),'utf8'), {window:{Hypher:LocalHypher}});
    latin = LocalHypher.languages.la_VA;
  }
  return latin.hyphenate(word);
}
function consonantalJ(syllables) {
  if (/^(allel[uú]ia|[eé]ia)$/i.test(syllables.join(''))) return syllables;
  return syllables.map(s => s.replace(/(?:(I)|i)(?=[AEIOUYÆŒǼÁÉÍÓÚÝÄËÏÖÜŸaeiouyæœǽœ́áéíóúýäëïöüÿ])/, (all,capital) => capital ? 'J' : 'j'));
}
function removeAcuteAccents(word) {
  return word.replace(/[ǽáéíóúý]|œ́/gi, v => ({'Ǽ':'Æ','Œ́':'Œ','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','Ý':'Y','ǽ':'æ','œ́':'œ','á':'a','é':'e','í':'i','ó':'o','ú':'u','ý':'y'})[v]);
}
// Redistribution of lyric letters only: preserve the number and order of all
// notation groups. A missing sung syllable needs source review, not guessed music.
function normalizeNotatedLatin(source, issues = []) {
  const letter='a-zæœǽáéíóúýäëïöüÿ\\u0301';
  const part=new RegExp('(['+letter+']+)([,.;:!?]*)(\\([^)]*\\)(?:\\([^)]*\\))*)','gi');
  const word=new RegExp('<[^>]*>|\\([^)]*\\)|(?:['+letter+']+[,.;:!?]*\\([^)]*\\)(?:\\([^)]*\\))*)+','gi');
  return source.replace(word, whole => {
    if (whole[0]==='<' || whole[0]==='(') return whole;
    const parts=Array.from(whole.matchAll(part));
    if (!parts.length || parts.some(p=>!/[a-m]/i.test(p[3].replace(/\[[^\]]*\]/g,'')))) return whole;
    const original=parts.map(p=>p[1]),syllables=consonantalJ(original);
    let text=syllables.join('');
    const vowelCount=(text.match(/(?:[aá]u|(?:qu|ngu)?[aeiouyæœǽáéíóúýäëïöüÿ])/gi)||[]).length;
    if (/[ǽ́áéíóúý]/i.test(text) && vowelCount===2) text=removeAcuteAccents(text);
    const expected=hyphenateLatin(text);
    if (expected.length!==parts.length || expected.some(s=>!/[æœǽaeiouyáéíóúýäëïöüÿ]/i.test(s))) {
      if (text.toLowerCase()!=='cui') issues.push({word:original.join(''),syllables:original,expected});
      return whole;
    }
    return parts.map((p,i)=>expected[i]+p[2]+p[3]).join('');
  });
}
module.exports={hyphenateLatin,consonantalJ,normalizeNotatedLatin};
