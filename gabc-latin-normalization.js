const { normalizeNotatedLatin } = require('./gabc-latin-syllables');
// House spelling for application lyrics. Keep source/publication text untouched,
// and never turn adjacent GABC pitch letters into a text ligature.
function normalizeLatinLyrics(source) {
  return source.replace(/\([^)]*\)|<sp>'(?:ae|æ)<\/sp>|<sp>'(?:oe|œ)<\/sp>|<sp>ae<\/sp>|<sp>oe<\/sp>|<[^>]*>|[^<(]+/g, token => {
    if (token[0] === '(') return token;
    const special = { "<sp>'ae</sp>": 'ǽ', "<sp>'æ</sp>": 'ǽ', "<sp>'oe</sp>": 'œ́', "<sp>'œ</sp>": 'œ́', '<sp>ae</sp>': 'æ', '<sp>oe</sp>': 'œ' };
    if (special[token]) return special[token];
    if (token[0] === '<') return token;
    return token.replace(/A[éÉ]/g,'Ǽ').replace(/oé/g,'œ́')
      .replace(/ae/g,'æ').replace(/oe/g,'œ').replace(/aé/g,'ǽ')
      .replace(/A[Ee]/g,'Æ').replace(/O[Ee]/g,'Œ');
  });
}
function normalizeGabcLatin(source, issues = []) {
  const start = source.lastIndexOf('%%') + 2;
  return start > 1 ? source.slice(0,start) + normalizeNotatedLatin(normalizeLatinLyrics(source.slice(start)), issues) : normalizeNotatedLatin(normalizeLatinLyrics(source), issues);
}
module.exports = { normalizeLatinLyrics, normalizeGabcLatin };
