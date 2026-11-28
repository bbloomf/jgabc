// Applies the psalm tones to every proper in gabc/ the way propers.js does, for each style its part offers
// Run with: bun test
const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

// Most of propers.js runs inside $(function(){...}), so it is run here with a jQuery whose every call does nothing,
// and getters are added to the top of that function so that the test can reach the functions declared in it.
const nothing = new Proxy(function() {}, {
  get: (target, key) => key === Symbol.toPrimitive ? () => '' : key === 'length' ? 0 : nothing,
  apply: () => nothing,
  construct: () => nothing
});
let ready;
const jQueryStatics = {
  // util.js adds enumerable functions to Array.prototype, so arrays are not walked with for...in
  each: (object, callback) => {
    for (const key of Array.isArray(object) ? object.keys() : Object.keys(object)) callback.call(object[key], key, object[key]);
    return object;
  },
  extend: (...objects) => Object.assign(...(objects[0] === true ? objects.slice(1) : objects))
};
const $ = new Proxy(function(arg) {
  if (typeof arg == 'function') ready = arg;
  return nothing;
}, { get: (target, key) => jQueryStatics[key] || nothing });

// the gabc that propers.js would hand to exsurge, so that its formatting can be checked
let exsurgeGabc;
const exsurge = new Proxy({}, {
  get: (target, key) => key == 'Gabc' ? { createMappingsFromSource: (ctxt, gabc) => { exsurgeGabc = gabc; return nothing; } } : nothing
});

const context = vm.createContext({
  console: { ...console, info: () => {} }, // decompile() logs every responsory text it replaces
  localStorage: {}, URLSearchParams, $, jQuery: $, exsurge, document: nothing, navigator: { language: 'en', userAgent: '' }, location: { hash: '', search: '' },
  addEventListener: () => {}, matchMedia: () => nothing, setTimeout: () => {}, clearTimeout: () => {}
});
context.window = context;
for (const file of ['util.js', 'psalmtone.js', 'moment.min.js', 'moment.easter.js', 'propersdata.js', 'ordinarydata.js', 'miscChants.js', 'propersdatanovus.js', 'offertory-verses.js', 'offertory-verses-data.js', 'propers.js', 'jquery.hypher.js', 'patterns/la-hypher.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
// exsurge is a stand-in here, and the verse tools ask the real one how clefs relate, so they are loaded as a module
context.offertoryVerseTools = require(path.join(root, 'offertory-verses.js'));
const exported = ['runGabcReplaces', 'loadProperText', 'getPsalmToneForPart', 'updateExsurge', 'getOffertoryWithVerses', 'getGabcPathsForPart', 'getOffertoryVerseSettings', 'getOffertoryGregoBaseId'];
vm.runInContext('(' + ready.toString().replace(/^function\s*\(\)\s*\{/, start =>
  start + 'window.propers = {' + exported.map(name => `get ${name}() { return ${name}; }`).join(', ') + '};') + ')()',
  context, { filename: 'propers.js' });
const { propers, sel } = context;
vm.runInContext('selPropers = {};', context);

// the styles that propers.html offers for each part (graduale and tractus get psalm-tone1 from updatePart(),
// and a graduale that is an Alleluia gets the Alleluia's styles)
const alleluiaStyles = ['psalm-tone', 'psalm-tone-sal', 'psalm-tone2', 'psalm-tone1'];
const partsByOfficePart = {
  Introitus: { introitus: ['psalm-tone'] },
  Graduale: { graduale: ['psalm-tone', 'psalm-tone1'] },
  Tractus: { tractus: ['psalm-tone', 'psalm-tone1'] },
  // in Paschaltide, the first Alleluia takes the place of the Gradual
  Alleluia: { alleluia: alleluiaStyles, graduale: alleluiaStyles },
  Offertorium: { offertorium: ['psalm-tone'] },
  Communio: { communio: ['psalm-tone'] }
};

const chants = fs.readdirSync(path.join(root, 'gabc'))
  .filter(file => file.endsWith('.gabc'))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  .map(file => ({ file, text: fs.readFileSync(path.join(root, 'gabc', file), 'utf8') }))
  .map(chant => ({ ...chant, header: context.getHeader(chant.text) }))
  .filter(chant => chant.header.officePart in partsByOfficePart);

// what updatePart() does with the gabc of a proper once it has loaded, outside of the Novus Ordo; the Gradual is never
// itself the first Alleluia here, so an Alleluia always gets its ij.
const loadPart = (part, text) => {
  sel.graduale = sel.alleluia = {};
  const prop = sel[part] = { ctxt: {} };
  const header = context.getHeader(text);
  const { gabc } = propers.loadProperText(part, part, propers.runGabcReplaces(text.slice(header.original.length), header));
  prop.gabc = header + gabc;
  prop.mode = prop.originalMode = header.mode;
  return prop;
};

const applyPsalmTone = (part, text, style) => {
  const prop = loadPart(part, text);
  prop.style = style;
  return prop.activeGabc = propers.getPsalmToneForPart(part);
};

// the gabc that is shown on the page, after updateExsurge() has formatted it
const formatForExsurge = (part, gabc) => {
  sel[part].activeGabc = gabc;
  exsurgeGabc = undefined;
  propers.updateExsurge(part);
  return exsurgeGabc;
};

const lyrics = gabc => gabc.replace(/\([^)]*\)/g, '').replace(/<[^>]+>|[~*†{}]/g, ' ').replace(/[^\s\p{L}\p{M}]/gu, '')
  .toLowerCase().split(/\s+/).filter(word => word).join(' ');

// The repeat of an earlier part of the chant, cued only by its first words, as the "Quam olim" at the end of the
// Offertory of the Requiem Mass: an asterisk followed by a few words and a double bar, where those words also follow
// an earlier asterisk.
const findRepeats = gabc => {
  const sections = [...gabc.matchAll(/(?<=^|\s|<nlba>)(?=\*~?(?:\([^)]*\))?\s*([\s\S]*?\(::\)))/g)]
    .map(match => ({ lyrics: lyrics(match[1]) }));
  return sections.flatMap((cue, i) => {
    if (!cue.lyrics || cue.lyrics.split(' ').length > 4) return [];
    const repeated = sections.slice(0, i).find(section => section.lyrics.startsWith(cue.lyrics + ' '));
    return repeated ? [{ cue: cue.lyrics, repeated: repeated.lyrics }] : [];
  });
};
const chantsWithRepeats = chants.map(chant => ({ ...chant, repeats: findRepeats(chant.text.slice(chant.header.original.length)) }))
  .filter(chant => chant.repeats.length);

// 1199 again, with notes in its cue that contain characters special to a regex, and with a cue whose accent the bold font
// can only show outside of the bold
const variantsOf1199 = chantsWithRepeats.filter(chant => chant.file == '1199.gabc').flatMap(chant => [
  ['with [ll:1{]+ in the notes of its cue', '*~Quam(f[ll:1{]+)'],
  ['with Cœ́lum in place of Quam in its cue', '*~Cœ́lum(f)']
].map(([description, replacement]) => {
  const text = chant.text.replace(/\*~Quam\(f\)/g, replacement);
  return { ...chant, file: `${chant.file} ${description}`, text, repeats: findRepeats(text.slice(chant.header.original.length)) };
}));

const excerpt = (text, index = 0) => text.slice(Math.max(0, index - 40), index + 100).replace(/\s+/g, ' ').trim();

test('finds the gabc files of each part and the repeats of an earlier part of a chant', () => {
  for (const officePart in partsByOfficePart) {
    expect(chants.filter(chant => chant.header.officePart == officePart).length).toBeGreaterThan(0);
  }
  expect(chantsWithRepeats.map(chant => chant.file)).toContain('1199.gabc');
  expect(variantsOf1199.map(chant => chant.repeats.length)).toEqual([1, 1]);
});

for (const [officePart, parts] of Object.entries(partsByOfficePart)) {
  describe(officePart, () => {
    for (const [part, styles] of Object.entries(parts)) {
      for (const style of styles) {
        test(`can be psalm toned as the ${part} in the ${style} style`, () => {
          const failures = [];
          for (const { file, text, header } of chants.filter(chant => chant.header.officePart == officePart)) {
            try {
              const gabc = applyPsalmTone(part, text, style);
              // a verse with no words, as "4.  (::)"
              const emptyVerse = gabc && /^(?:\d+\.)?\s*\(::\)/m.exec(gabc);
              if (!gabc) failures.push(`${file}: no gabc for mode ${header.mode}`);
              else if (emptyVerse) failures.push(`${file}: empty verse in ${excerpt(gabc, emptyVerse.index)}`);
            } catch (e) {
              failures.push(`${file}: ${e.message}`);
            }
          }
          expect(failures).toEqual([]);
        });
      }
    }
  });
}

describe('the repeat of an earlier part of a chant', () => {
  test('uses the full text of what is repeated when psalm toned', () => {
    const failures = [];
    for (const { file, text, header, repeats } of [...chantsWithRepeats, ...variantsOf1199]) {
      for (const [part, styles] of Object.entries(partsByOfficePart[header.officePart])) {
        for (const style of styles) {
          try {
            const toned = lyrics(applyPsalmTone(part, text, style) || '');
            for (const { repeated } of repeats) {
              if (!toned.endsWith(repeated)) failures.push(`${file} (${part}, ${style}): ends with "${toned.slice(-60)}" instead of "${repeated}"`);
            }
          } catch (e) {
            failures.push(`${file} (${part}, ${style}): ${e.message}`);
          }
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test('marks the words of the cue in bold where the repeat begins', () => {
    const failures = [];
    for (const { file, text, header, repeats } of [...chantsWithRepeats, ...variantsOf1199]) {
      for (const part of Object.keys(partsByOfficePart[header.officePart])) {
        try {
          const prop = loadPart(part, text);
          const gabc = formatForExsurge(part, prop.gabc) || '';
          for (const { cue } of repeats) {
            // the first time the cue's words are sung, each of their syllables should be bold, as <b>Quam</b>(f) <b>o</b>(f)<b>lim</b>(ec~),
            // except for the accent of œ́, which the bold font can't show, as <b>Cœ</b>́<b>lum</b>(f) <b>o</b>(f)<b>lim</b>(ec~)
            const words = new RegExp('(?<=^|[\\s)~])' + cue.split(' ')
              .map(word => '(?:<b>)?' + word.split('').join('(?:</?b>|\\([^)]*\\))*') + '[,;:.!?]?(?:</b>)?')
              .join('(?:</?b>|\\([^)]*\\)|\\s)+'), 'i');
            const match = words.exec(gabc);
            if (!match || match[0].replace(/\([^)]*\)/g, '').split(/\s+/).some(word => word.replace(/<b>[^<]*<\/b>|\u0301/g, ''))) {
              failures.push(`${file} (${part}): "${cue}" is not bold in ${excerpt(gabc, match ? match.index : 0)}`);
            }
          }
        } catch (e) {
          failures.push(`${file} (${part}): ${e.message}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test('keeps the asterisk before the cue at the end red', () => {
    const failures = [];
    for (const { file, text, header } of [...chantsWithRepeats, ...variantsOf1199]) {
      for (const part of Object.keys(partsByOfficePart[header.officePart])) {
        try {
          const prop = loadPart(part, text);
          const gabc = formatForExsurge(part, prop.gabc) || '';
          // Exsurge draws an asterisk red as a syllable of its own, as *() or *(::), but not one joined to the words after it,
          // as <nlba>*~Quam(f), which stays in the black of the cue
          const asterisks = [...gabc.matchAll(/(?<=^|\s|>)\^?\*\^?(.)/g)];
          const last = asterisks[asterisks.length - 1];
          if (!last || last[1] != '(') failures.push(`${file} (${part}): ${excerpt(gabc, last ? last.index : 0)}`);
        } catch (e) {
          failures.push(`${file} (${part}): ${e.message}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });
});


describe('Offertoriale verses', () => {
  const data = context.offertoryVerses;
  const loadOffertory = id => {
    const state = loadPart('offertorium', fs.readFileSync(path.join(root, 'gabc', id + '.gabc'), 'utf8'));
    state.id = id;
    return state;
  };
  test('links to the full Offertoriale source only while full-tone verses are used', () => {
    for (const [id, sourceId] of Object.entries(data.fullById)) {
      const state = loadOffertory(id), full = data.full[sourceId];
      state.style = 'full'; state.psalmToneVerses = false;
      state.verseCount = 0;
      expect(propers.getOffertoryGregoBaseId()).toBe(id);
      state.verseCount = full.verseCount;
      expect(String(propers.getOffertoryGregoBaseId())).toBe(String(full.gregobaseId || sourceId));
      state.psalmToneVerses = true;
      expect(propers.getOffertoryGregoBaseId()).toBe(id);
      state.psalmToneVerses = false; state.style = 'psalm-tone';
      expect(propers.getOffertoryGregoBaseId()).toBe(id);
    }
    const state = loadOffertory(645);
    state.style = 'full'; state.verseCount = 1; state.psalmToneVerses = false;
    expect(propers.getOffertoryGregoBaseId()).toBe(645);
  });
  test('adds the full verses without changing the stored antiphon', () => {
    for (const [id, sourceId] of Object.entries(data.fullById)) {
      const state = loadOffertory(id);
      state.style = 'full';
      state.verseCount = data.full[sourceId].verseCount;
      state.psalmToneVerses = false;
      state.offertoryVerseGabc = fs.readFileSync(path.join(root, 'gabc/offertory-verses', sourceId + '.gabc'), 'utf8');
      const original = state.gabc;
      const gabc = propers.getOffertoryWithVerses();
      expect(gabc).toContain('<sp>V/</sp>');
      expect(state.gabc).toBe(original);
      expect(gabc.indexOf('%%')).toBe(gabc.lastIndexOf('%%'));
      expect(propers.getGabcPathsForPart('offertorium').length).toBe(2);
      state.style = 'psalm-tone';
      expect(propers.getGabcPathsForPart('offertorium').length).toBe(1);
    }
  });
  test('Midnight Mass keeps each return star tied to Ante through browser conversion', () => {
    const state = loadOffertory(811);
    state.style = 'full';
    state.verseCount = 2;
    state.psalmToneVerses = false;
    state.offertoryVerseGabc = fs.readFileSync(path.join(root, 'gabc/offertory-verses/17652.gabc'), 'utf8');
    state.activeGabc = propers.getOffertoryWithVerses();
    propers.updateExsurge('offertorium', '811');
    expect(exsurgeGabc.match(/\*~Ante\./g)).toHaveLength(2);
    expect(exsurgeGabc).not.toMatch(/\*\(\)\s*Ante\./);
  });
  for (const style of ['full', 'psalm-tone']) {
    test('renders every simple setting in ' + style, () => {
      for (const id of Object.keys(data.simpleById)) {
        const state = loadOffertory(id);
        state.style = style;
        state.verseCount = 1;
        state.psalmToneVerses = true;
        const text = state.text, original = state.gabc;
        const gabc = propers.getOffertoryWithVerses();
        const simple = data.simple[data.simpleById[id]];
        expect(gabc).toBeTruthy();
        expect(gabc).toContain('<sp>V/</sp>');
        expect(gabc).not.toContain('<i>V.</i>');
        expect(gabc.indexOf('%%')).toBe(gabc.lastIndexOf('%%'));
        expect(state.text).toBe(text);
        expect(state.gabc).toBe(original);
        expect(sel.offertoriumSimpleVerses).toBeUndefined();
        const tonedText = context.offertoryVerseTools.normalize(lyrics(gabc.slice(gabc.indexOf('%%') + 2)));
        expect(tonedText).toContain(context.offertoryVerseTools.normalize(simple.text));
      }
    });
  }
  test('supports a changed mode and peregrinus with simple verses', () => {
    for (const mode of ['1', '4', '6', '8', 'per']) {
      const state = loadOffertory(962);
      state.style = 'psalm-tone';
      state.verseCount = 1;
      state.mode = mode;
      expect(propers.getOffertoryWithVerses()).toContain('Dí');
    }
  });
  test('renders every available verse count, with either verse setting', () => {
    for (const [id, sourceId] of Object.entries(data.fullById)) {
      for (const psalmToned of [false, true]) {
        const state = loadOffertory(id);
        state.style = 'full';
        state.psalmToneVerses = psalmToned;
        state.offertoryVerseGabc = fs.readFileSync(path.join(root, 'gabc/offertory-verses', sourceId + '.gabc'), 'utf8');
        for (let count = 0; count <= data.full[sourceId].verseCount; ++count) {
          state.verseCount = count;
          const gabc = propers.getOffertoryWithVerses();
          const selectedCount = context.offertoryVerseTools.selectVerseItems(data.full[sourceId].psalmVerses, count, data.full[sourceId].verseSelections).length;
          expect((gabc.match(/<sp>V\/<\/sp>/g) || []).length).toBe(selectedCount);
          if (selectedCount === 1) expect(gabc).not.toMatch(/<sp>V\/<\/sp>\.?\s*\d+\./);
          if (!count) expect(gabc).toBe(state.gabc);
        }
      }
    }
  });
  test('clamps counts and forces psalm-toned verses for a psalm-toned offertory', () => {
    const state = loadOffertory(962);
    state.style = 'full';
    state.verseCount = 4;
    state.psalmToneVerses = false;
    expect(propers.getOffertoryVerseSettings().count).toBe(2);
    expect(propers.getOffertoryVerseSettings().psalmToned).toBe(false);
    state.style = 'psalm-tone';
    expect(propers.getOffertoryVerseSettings().psalmToned).toBe(true);
  });
  test('one authentic verse ends before Respice, and two include it', () => {
    const state = loadOffertory(962);
    state.style = 'full';
    state.offertoryVerseGabc = fs.readFileSync(path.join(root, 'gabc/offertory-verses/11393.gabc'), 'utf8');
    state.verseCount = 1;
    expect(lyrics(propers.getOffertoryWithVerses())).not.toContain('réspice');
    state.verseCount = 2;
    expect(lyrics(propers.getOffertoryWithVerses())).toContain('réspice');
  });

  test('does not repeat a later authentic verse chosen as the simple first verse', () => {
    const state = loadOffertory(993);
    state.style = 'full';
    state.verseCount = 2;
    state.psalmToneVerses = true;
    const text = context.offertoryVerseTools.normalize(lyrics(propers.getOffertoryWithVerses()));
    expect(text.split('exspectansexspectavidominum').length - 1).toBe(1);
    expect(text).toContain('avertanturretrorsum');
  });

  test('the real sine Alleluia Confirma hoc only offers the applicable return', () => {
    const state = loadOffertory(83);
    state.style = 'full';
    state.verseCount = 3;
    state.offertoryVerseGabc = fs.readFileSync(path.join(root, 'gabc/offertory-verses/19909.gabc'), 'utf8');
    const gabc = propers.getOffertoryWithVerses();
    expect(gabc).toContain('Tibi ófferent.');
    expect(gabc).not.toContain('Allelúia.');
    expect(gabc).toMatch(/\(::[a-m]\+\) <nlba>\*~Tibi ófferent\./);
  });

  test('Elegerunt offers the printed single alternative in both verse styles', () => {
    for (const psalmToned of [false, true]) {
      const state = loadOffertory(462);
      state.style = 'full';
      state.psalmToneVerses = psalmToned;
      state.offertoryVerseGabc = fs.readFileSync(path.join(root, 'gabc/offertory-verses/manual-095.gabc'), 'utf8');
      state.verseCount = 3;
      const gabc = propers.getOffertoryWithVerses(), text = context.offertoryVerseTools.normalize(lyrics(gabc).split('V/').pop());
      expect(gabc.match(/<sp>V\/<\/sp>/g).length).toBe(1);
      expect(gabc).not.toMatch(/<sp>V\/<\/sp>\.?\s*3\./);
      expect(text).toContain('surrexeruntautem');
      expect(text).not.toContain('positisautem');
      state.verseCount = 2;
      expect(propers.getOffertoryWithVerses().match(/<sp>V\/<\/sp>/g).length).toBe(2);
    }
  });

});

describe('the Introit tones in the psalm tone tool', () => {
  const text = 'Amen. Dóminus regnávit decórem índuit';
  const italicInGabc = gabc => (gabc.match(/<i>[^<]*<\/i>/g) || []).join('');
  const boldItalic = (tone, format, onlyVowel) => {
    const tones = context.getGabcTones(tone.termination, undefined, false, tone.clef);
    return context.addBoldItalic(text, tones.accents, tones.preparatory, tones.afterLastAccent, format, onlyVowel, 1, false, false, 0, false);
  };

  // Introit 1, 2, 3, 4 and 7 end with preparatory syllables and no accent after an intonation (issue #129)
  for (const mode of [1, 2, 3, 4, 7]) {
    test(`marks the preparatory syllables of the Introit ${mode} termination in html and tex as in gabc`, () => {
      const tone = context.g_tones['Introit ' + mode];
      const tones = context.getGabcTones(tone.termination, undefined, false, tone.clef);
      expect(tones.accents).toBe(0);
      expect(tones.preparatory).toBeGreaterThan(0);
      for (const onlyVowel of [false, true]) {
        const gabc = context.applyPsalmTone({ text, gabc: tone.termination, clef: tone.clef, useOpenNotes: false, useBoldItalic: true, onlyVowel, format: context.bi_formats.gabc });
        const expected = italicInGabc(gabc);
        expect(expected).not.toBe('');
        expect(italicInGabc(boldItalic(tone, 'html', onlyVowel))).toBe(expected);
        expect(boldItalic(tone, 'tex', onlyVowel)).toBe(boldItalic(tone, 'html', onlyVowel).replace(/<i>([^<]*)<\/i>/g, '\\textit{$1}'));
      }
    });
  }
});
