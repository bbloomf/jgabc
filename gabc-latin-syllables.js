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
module.exports={hyphenateLatin,consonantalJ,removeAcuteAccents};
