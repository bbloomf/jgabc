// A chant may end by cueing the repeat of an earlier part with only its first words, as the Offertory of the Requiem Mass
// ends with *~Quam(f) o(f)lim.(ec~) (::), which repeats * Quam olim Abrahæ promisísti, et sémini ejus.
// The cue is put in a no line break area, so that it is not split between two lines:
// <nlba>*~Quam(f) o(f)lim.(ec~)</nlba> (::)

// each part of the chant that follows an asterisk or dagger (on its own, or joined to the next syllable by ~)
// up to the double bar after it, as decompile() in propers.js finds them
const getSections = (gabc) => {
  const symbols = [...gabc.matchAll(/(?<=^|\s)[*†](~|\(([,;:]*)\))?\s*/g)];
  return symbols.map((symbol, i) => {
    const start = symbol.index + symbol[0].length;
    const end = gabc.indexOf('(::)', start);
    const next = symbols[i + 1];
    if (end < 0 || (next && next.index < end)) return null;
    // leave out a rubric at the end, as the iij. of <i>iij.</i>() (::) or the <i>ut supra.</i>(::) of 8107.gabc
    const words = gabc.slice(start, end).replace(/(?:\s*<i>[^<]*<\/i>(?:\(\))?)*\s*$/, '');
    return {
      // an asterisk that is its own syllable, or joined to the first word, belongs with the words after it,
      // but not one that sits on the bar before them, as in *(::) At(e)tén(f)de.(hg) (::)
      index: symbol[2] ? start : symbol.index,
      end: start + words.length,
      // punctuation may differ between the two, as in lim(ec~) and lim.(ec~)
      words: words.replace(/[,;:.!?]+(?=\()/g, ''),
    };
  }).filter(Boolean);
};

const wrapRepeatCueInNlba = (gabc) => {
  const sections = getSections(gabc);
  const cue = sections.pop();
  if (!cue || !/^(?:<i>[^<]*<\/i>)?\s*\(::\)$/.test(gabc.slice(cue.end).trim())) return gabc;
  if (!sections.some(section => section.words.startsWith(cue.words + ' '))) return gabc;
  return gabc.slice(0, cue.index) + '<nlba>' + gabc.slice(cue.index, cue.end) + '</nlba>' + gabc.slice(cue.end);
};

if(typeof exports=='object') {
  exports.wrapRepeatCueInNlba = wrapRepeatCueInNlba;
}
