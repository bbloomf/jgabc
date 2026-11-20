// Supplies the accent a transcription left off a word of three or more syllables, for both importers,
// from the Accenteur dictionary the transcriber and psalm tone tools use for typed text (js/latin-accents.js).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { hyphenateLatin, removeAcuteAccents } = require('./gabc-latin-syllables');
// Words the dictionary cannot settle by itself, as the Graduale spells them, and misprints with two accents.
const known = {
  caderem: 'cáderem',
  domine: 'dómine',
  elegi: 'elégi',
  fœderis: 'fœ́deris',
  moysen: 'móysen',
  murmurationem: 'murmuratiónem',
  oblitus: 'oblítus',
};
const isAccent = /[ǽáéíóúý́]/gi;
let latinAccents;
function dictionary(word) {
  if (!latinAccents) {
    const context = { Hypher: { languages: { la: { hyphenate: hyphenateLatin } } } };
    context.window = context;
    vm.createContext(context);
    for (const file of ['js/accenteur/engine.js', 'js/latin-accents.js']) {
      vm.runInContext(fs.readFileSync(path.join(__dirname, file), 'utf8'), context, { filename: file });
    }
    latinAccents = context.LatinAccents;
  }
  return latinAccents.apply(word).text;
}
// Returns the word with one accent, or as it was given when the right place for it is not known.
// A capital is left without one, as in the Graduale (Angelis, Israel, Omnibus).
function accentLatinWord(word) {
  if ((word.match(isAccent) || []).length === 1 || !/^[a-zæœǽáéíóúýäëïöüÿ́]+$/i.test(word)) return word;
  const plain = removeAcuteAccents(word), lower = plain.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(known, lower)) {
    // keep the capitals of the word as it was written
    let at = 0;
    const accented = known[lower].replace(/[^́]/g, letter => {
      const original = plain[at++];
      return original === original.toLowerCase() ? letter : original;
    });
    return removeAcuteAccents(accented) === plain ? accented : word;
  }
  if (plain !== word) return word;
  const accented = dictionary(word);
  for (let i = 0; i < accented.length; ++i) {
    if (accented[i] !== word[i]) return /[A-ZÆŒ]/.test(word[i]) ? word : accented;
  }
  return word;
}
module.exports = { accentLatinWord };
