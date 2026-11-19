const { test, expect } = require('bun:test');
const { cases, plain, tools, data } = require('./helpers/offertory-feature-cases');
const all = [...cases()];
const absolutePitch = (pitch, clef) => pitch.charCodeAt(0) - 2 * Number(clef.slice(-1)) + (clef[0] === 'f' ? -4 : 0);

test('covers every full and simple link at every count in all three settings', () => {
  expect(Object.keys(data.full)).toHaveLength(104);
  expect(Object.keys(data.fullById)).toHaveLength(106);
  expect(Object.keys(data.simple)).toHaveLength(63);
  expect(Object.keys(data.simpleById)).toHaveLength(66);
  expect(all).toHaveLength(1062);
  expect(new Set(all.map(c => c.id)).size).toBe(114);
});
for (const style of ['full', 'toned-verses', 'psalm-tone']) {
  test('preserves the complete selected words, symbols and state: ' + style, () => {
    for (const c of all.filter(c => c.style === style)) {
      const label = `${c.id} ${style} count ${c.count}`;
      const parts = tools.splitVerses(c.gabc);
      expect(parts.length, label).toBe(c.expected.length);
      parts.forEach((part, index) => {
        // Psalm tones use literal mediant stars: psalmVerseText intentionally
        // stops at those, so remove only the text-only return for this check.
        const actual = style === 'full' && c.full ? tools.psalmVerseText(part.gabc) :
          part.gabc.replace(/<nlba>[\s\S]*?<\/nlba>/g, '').replace(/<sp>V\/<\/sp>/g, '');
        expect(plain(actual), `${label} verse ${index + 1}`).toBe(plain(c.expected[index]));
      });
      expect(c.state.gabc, label).toBe(c.original);
      expect(c.gabc.split('%%').length, label).toBe(2);
      expect(c.formatted, label).toBeTruthy();
      expect(c.formatted, label).not.toMatch(/<sp>V\/<\/sp>/);
      expect((c.formatted.match(/V\/\./g) || []).length, label).toBe(c.expected.length);
      if (parts.length === 1) {
        expect(c.gabc, label).not.toMatch(/<sp>V\/<\/sp>\.?\s*\d+\./);
        expect(c.formatted, label).not.toMatch(/V\/\.\s*\d+\./);
      }
      if (!c.count && style !== 'psalm-tone') expect(c.gabc, label).toBe(c.original);
    }
  });
}

test('every generated text return has a real earlier target and the exact diatonic pitch including octave', () => {
  let checked = 0;
  for (const c of all) for (const m of c.gabc.matchAll(/\(::([a-m])\+\)\s*<nlba>\*~([\s\S]*?)<\/nlba>\(\)/g)) {
    const earlier = c.gabc.slice(0, m.index).replace(/<nlba>\*~[\s\S]*?<\/nlba>\(\)/g, '');
    const occurrence = (c.simple && tools.normalize(c.simple.cue) === tools.normalize(m[2]) && c.simple.occurrence) ||
      (c.full && c.full.cueOccurrences && c.full.cueOccurrences[tools.normalize(m[2])]);
    const info = tools.cueInfo(earlier, m[2], occurrence);
    const label = `${c.id} ${c.style} count ${c.count}: ${m[2]}`;
    expect(info, label).toBeTruthy();
    expect(earlier.slice(Math.max(0, info.start - 3), info.start), label).toBe('<b>');
    expect(absolutePitch(m[1], tools.lastClef(earlier)), label).toBe(absolutePitch(info.pitch, info.clef));
    expect(c.formatted, label).toContain('*~' + m[2]);
    checked++;
  }
  expect(checked).toBeGreaterThan(1000);
});

test('all applicable source text-only returns survive, including the final cue and printed alternatives', () => {
  let checked = 0;
  for (const c of all.filter(c => c.style === 'full' && c.full && c.count)) {
    const selected = tools.takeVerses(c.source.slice(c.source.lastIndexOf('%%') + 2), c.count, c.full.selectionCues, c.full.verseSelections);
    for (const m of selected.matchAll(/\*([^*]*?)(?=\([^)]*::[^)]*\)|$)/g)) {
      const notes = (m[1].match(/\([^)]*\)/g) || []).join('').replace(/\([cf]b?[1-4]\)/g, '');
      if (/[a-m]/i.test(notes)) continue; // sung respond, not a reference
      for (const alternative of m[1].split(/<i>\s*vel\s*<\/i>/i)) {
        let cue = tools.lyrics(alternative.replace(/<i>[\s\S]*?<\/i>|<v>[\s\S]*?<\/v>/g, '')).trim();
        if (!cue) continue;
        if (c.simple && c.simple.fallbackCue && /alleluia/.test(tools.normalize(cue)) && tools.cueIndex(c.original, cue) < 0) cue = c.simple.fallbackCue;
        const earlier = c.original + selected.slice(0, m.index);
        if (tools.cueIndex(earlier, cue) < 0) continue; // unavailable seasonal alternative
        expect(c.gabc, `${c.id} count ${c.count}: ${cue}`).toContain('<nlba>*~' + cue + '</nlba>()');
        checked++;
      }
    }
  }
  expect(checked).toBeGreaterThan(150);
});

test('the three sets without antiphon links retain every source verse and can be psalm toned independently', () => {
  const { unlinkedCases } = require('./helpers/offertory-unlinked-cases');
  const rows = [...unlinkedCases()];
  expect(new Set(rows.map(c => c.sourceId)).size).toBe(3);
  expect(rows).toHaveLength(8);
  for (const c of rows) {
    const parts = tools.splitVerses(c.text);
    expect(parts).toHaveLength(c.count);
    parts.forEach((v,index) => {
      const text = c.style === 'standalone-full' ? tools.psalmVerseText(v.gabc) : v.gabc.replace(/<sp>V\/<\/sp>/g,'');
      expect(plain(text)).toBe(plain(data.full[c.sourceId].psalmVerses[index].text));
    });
    expect(c.gabc).toContain('V/.');
  }
});

for (const style of ['full', 'toned-verses', 'psalm-tone']) {
  test('never repeats the active clef in generated offertories: ' + style, () => {
    expect(all.some(c => c.id === '462' && c.style === style && c.count === 3)).toBe(true);
    for (const c of all.filter(c => c.style === style && c.count > 0)) {
      for (const [stage, gabc] of [['GABC', c.gabc], ['Exsurge', c.formatted]]) {
        let active;
        const body = gabc.slice(gabc.lastIndexOf('%%') + 2);
        for (const group of body.matchAll(/\(([^)]*)\)/g)) {
          const notes = group[1].replace(/\[[^\]]*\]/g, '');
          for (const clef of notes.matchAll(/[cf]b?[1-4]/g)) {
            expect(clef[0], `${c.id} ${style} count ${c.count} ${stage} at ${group.index}`).not.toBe(active);
            active = clef[0];
          }
        }
      }
    }
  });
}

test('clef cleanup preserves notes, bars, annotations and real clef changes including flats', () => {
  const source = 'name: Example (c4);\n%%\n(c4) A(h[alt:f3]) (::c4) (c4) ' +
    '<sp>V/</sp> B(h) (c3) C(h) (::c3) (cb3) D(h) (cb3) (f3) E(h) (c4) F(h) () (::)';
  const expected = 'name: Example (c4);\n%%\n(c4) A(h[alt:f3]) (::)  ' +
    '<sp>V/</sp> B(h) (c3) C(h) (::) (cb3) D(h)  (f3) E(h) (c4) F(h) () (::)';
  expect(tools.removeRedundantClefs(source)).toBe(expected);
  expect(tools.removeRedundantClefs('(f3) A(f) (::f3) (c4) B(d) (f3) C(f) (::)'))
    .toBe('(f3) A(f) (::) (c4) B(d) (f3) C(f) (::)');
  expect(tools.removeRedundantClefs(expected)).toBe(expected);
});

for (const style of ['full', 'toned-verses', 'psalm-tone']) {
  test('clef changes at double bars have a custos: ' + style, () => {
    for (const c of all.filter(c => c.style === style && c.count > 0)) {
      for (const [stage, gabc] of [['GABC', c.gabc], ['Exsurge', c.formatted]]) {
        const body = gabc.slice(gabc.lastIndexOf('%%') + 2);
        expect(body, `${c.id} ${style} ${c.count} ${stage}`).not.toMatch(/\([^()]*::\)\s*\([cf]b?[1-4]\)/);
        for (const m of body.matchAll(/\(([^()]*::\s*[cf]b?[1-4])\)/g)) {
          const precedingCustos = /\([^)]*[a-m]\+[^)]*\)\s*$/i.test(body.slice(0, m.index));
          expect(/z0::|[a-m]\+/i.test(m[1]) || precedingCustos, `${c.id} ${style} ${c.count} ${stage}: ${m[0]}`).toBe(true);
        }
      }
    }
  });
}

test('Ad te Domine introduces the full verse with an automatic custos and C4 clef', () => {
  const c = all.find(c => c.id === '962' && c.style === 'full' && c.count === 1);
  expect(c.gabc).toMatch(/\(z0::c4\)\s*<sp>V\/<\/sp>/);
  expect(c.formatted).toContain('(z0::c4)');
});

test('clef-change preparation is idempotent and preserves existing custodes', () => {
  for (const [source, expected] of [
    ['(f3) A(f) (::)\n(c4) B(d)', '(f3) A(f) (z0::c4) B(d)'],
    ['(f3) A(f) (::c4) B(d)', '(f3) A(f) (z0::c4) B(d)'],
    ['(f3) A(f) (z0::c4) B(d)', '(f3) A(f) (z0::c4) B(d)'],
    ['(f3) A(f) (h+::c4) B(d)', '(f3) A(f) (h+::c4) B(d)'],
    ['(f3) A(f) (/[-1]a+) (::c4) B(d)', '(f3) A(f) (/[-1]a+) (::c4) B(d)'],
    ['(c4) A(f) (::) (c4) B(d)', '(c4) A(f) (::)  B(d)']
  ]) {
    expect(tools.prepareClefChanges(source)).toBe(expected);
    expect(tools.prepareClefChanges(expected)).toBe(expected);
  }
});

for (const style of ['full', 'toned-verses', 'psalm-tone']) {
  test('return incipit stars stay with the following lyric without empty parentheses: ' + style, () => {
    for (const c of all.filter(c => c.style === style && c.count > 0)) {
      expect(c.gabc, `${c.id} ${style} ${c.count}`).not.toMatch(/\*\(\)\s*<b>/);
      expect(c.formatted, `${c.id} ${style} ${c.count} Exsurge`).not.toMatch(/\*\(\)\^?\s*<b>/);
    }
  });
}

test('Ad te Domine adds a bare star before Etenim and keeps it through Exsurge formatting', () => {
  for (const style of ['full', 'toned-verses']) {
    const c = all.find(c => c.id === '962' && c.style === style && c.count === 1);
    expect(c.gabc).toContain('* <b>ét</b>');
    expect(c.formatted).toContain('^*^ <b>ét</b>');
  }
  expect(tools.markResponse('(c4) A(f) (:) *() Et(g) ó(h)pus.(g) (::)', 'Et opus.'))
    .toContain('(:) * <b>Et</b>');
});
