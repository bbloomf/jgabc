const fs = require('fs');
const path = require('path');
const { context, propers, sel, loadPart, formatForExsurge } = require('./offertory-feature-context');
const tools = require('../../offertory-verses'), data = require('../../offertory-verses-data');
// These downloaded sets have no local antiphon. Exercise the source verses and
// their psalm tones without inventing an antiphon or claiming linked integration.
function* unlinkedCases() {
  const linked = new Set(Object.values(data.fullById).map(String));
  for (const [sourceId, full] of Object.entries(data.full)) {
    if (linked.has(sourceId)) continue;
    const source = fs.readFileSync(path.join(__dirname, '../../gabc/offertory-verses/' + sourceId + '.gabc'), 'utf8');
    const header = context.getHeader(source), original = source.slice(header.original.length);
    for (let count = 1; count <= full.verseCount; count++) {
      const state = loadPart('offertorium', source);
      const body = tools.takeVerses(original, count);
      yield {id:'unlinked-' + sourceId, sourceId, name:full.name, style:'standalone-full', count, verses:count,
        gabc:formatForExsurge('offertorium', header + body), text:body};
      const tone = context.g_tones['Introit ' + state.originalMode] || context.g_tones[state.originalMode + '.'];
      const bodies = full.psalmVerses.slice(0, count).map((verse,index) => {
        sel.offertoriumSimpleVerses = {text:'<sp>V/</sp> ' + (count > 1 ? (index + 1) + '. ' : '') + verse.text,
          gabc:'initial-style: 0;\n%%\n(' + tone.clef + ')', mode:state.originalMode, repeatIntonation:true};
        try {const gabc=propers.getPsalmToneForPart('offertoriumSimpleVerses',tone);return gabc.slice(context.getHeaderLen(gabc));}
        finally {delete sel.offertoriumSimpleVerses;}
      });
      yield {id:'unlinked-' + sourceId, sourceId, name:full.name, style:'standalone-toned-verses', count, verses:count,
        gabc:formatForExsurge('offertorium', header + bodies.join('\n')),text:bodies.join('\n')};
    }
  }
}
module.exports={unlinkedCases};
