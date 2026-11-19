const fs = require('fs');
const path = require('path');
const { context, propers, loadPart, formatForExsurge } = require('./offertory-feature-context');
const tools = require('../../offertory-verses');
const data = require('../../offertory-verses-data');
const root = path.join(__dirname, '../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const plain = gabc => tools.normalize(tools.lyrics(gabc));
function* cases() {
  for (const id of new Set([...Object.keys(data.fullById), ...Object.keys(data.simpleById)])) {
    const full = data.full[data.fullById[id]], simple = data.simple[data.simpleById[id]];
    const source = full && read('gabc/offertory-verses/' + data.fullById[id] + '.gabc');
    for (const style of ['full', 'toned-verses', 'psalm-tone']) {
      for (let count = 0; count <= (full ? full.verseCount : 1); count++) {
        const state = loadPart('offertorium', read('gabc/' + id + '.gabc'));
        Object.assign(state, { id, style: style === 'psalm-tone' ? style : 'full', verseCount: count,
          psalmToneVerses: style === 'toned-verses', offertoryVerseGabc: source });
        const original = state.gabc, gabc = propers.getOffertoryWithVerses();
        let expected;
        if (style === 'full' && full) {
          const verses = tools.splitVerses(source.slice(source.lastIndexOf('%%') + 2));
          const indices = full.verseSelections && full.verseSelections[count];
          const selected = indices ? indices.map(n => verses[n - 1]) : verses.slice(0, count);
          expected = selected.map(v => tools.psalmVerseText(v.gabc));
        } else {
          let verses = full ? full.psalmVerses.slice() : [simple];
          if (full && simple) {
            const n = verses.findIndex(v => tools.normalize(v.text) === tools.normalize(simple.text));
            if (n > 0) { verses.splice(n, 1); verses.unshift(simple); } else verses[0] = simple;
          }
          const indices = full && full.verseSelections && full.verseSelections[count];
          expected = (indices ? indices.map(n => verses[n - 1]) : verses.slice(0, count)).map(v => v.text);
        }
        yield { id, sourceId: data.fullById[id] || null, name: (full || simple).name, style, count,
          full, simple, source, state, original, gabc, expected, formatted: formatForExsurge('offertorium', gabc) };
      }
    }
  }
}
module.exports = { cases, plain, tools, data, context, propers };
