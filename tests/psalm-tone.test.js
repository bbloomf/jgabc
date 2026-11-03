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
for (const file of ['util.js', 'psalmtone.js', 'moment.min.js', 'moment.easter.js', 'propersdata.js', 'ordinarydata.js', 'miscChants.js', 'propersdatanovus.js', 'propers.js', 'jquery.hypher.js', 'patterns/la-hypher.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const exported = ['runGabcReplaces', 'loadProperText', 'getPsalmToneForPart', 'updateExsurge'];
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
});
