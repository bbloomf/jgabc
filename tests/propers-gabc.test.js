// Checks the regular expressions that propers.js runs against the gabc files against every file in gabc/
// Run with: bun test
const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

// propers.js is a browser script, so run it the way the browser does, with just enough of a window for its top level;
// $(function(){...}) never calls its function here, so none of the page is set up.
const context = vm.createContext({ console, localStorage: {}, $: () => {} });
context.window = context;
for (const file of ['exsurge.min.js', 'util.js', 'propers.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const chants = fs.readdirSync(path.join(root, 'gabc'))
  .filter(file => file.endsWith('.gabc'))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  .map(file => {
    const text = fs.readFileSync(path.join(root, 'gabc', file), 'utf8');
    const header = context.getHeader(text);
    return { file, officePart: header.officePart || '', gabc: text.slice(header.original.length) };
  });
const chantsOf = (...officeParts) => chants.filter(chant => officeParts.includes(chant.officePart));

// the Alleluia of the Easter Vigil (507-2 is its verse) is sung three times rather than repeated with ij., so it has no asterisk
const easterVigilAlleluia = ['507.gabc', '507a.gabc', '507-2.gabc'];
const alleluias = chantsOf('Alleluia').filter(chant => !easterVigilAlleluia.includes(chant.file));
const introits = chantsOf('Introitus');
const regexGloriaPatri = /Gl[oó]\([^)]*\)ri\([^)]*\)a\([^)]*\)\s*P[aá]\([^)]*\)tri/i;
// a Gloria Patri that stops after "Patri" and is followed by E u o u a e, rather than written out in full
const regexAbbreviatedGloriaPatri = /P[aá]\([^)]*\)tri\.?(?:<\/nlba>)?\([^)]*\)\s*\(::\)/i;
const regexTP = /T\.\s*P\./;

// the gabc around index, on one line, to show where a check failed
const excerpt = (gabc, index = 0) => gabc.slice(Math.max(0, index - 40), index + 100).replace(/\s+/g, ' ').trim();

test('finds the gabc files of each office part', () => {
  expect(alleluias.length).toBeGreaterThan(0);
  expect(introits.length).toBeGreaterThan(0);
  expect(chantsOf('Communio').length).toBeGreaterThan(0);
  expect(chants.filter(chant => regexTP.test(chant.gabc)).length).toBeGreaterThan(0);
});

describe('Alleluia', () => {
  test('the asterisk after the opening Allelúia is found, so that ij. can be added or removed', () => {
    const failures = [];
    for (const { file, gabc } of alleluias) {
      const match = context.regexAlleluiaAsteriskWithoutIj.exec(gabc) || context.regexAlleluiaIj.exec(gabc);
      // there must be no lyrics before the match, or it found a later Allelúia
      if (!match || /[a-zæœǽáéíóúý]/i.test(gabc.slice(0, match.index).replace(/\([^)]*\)/g, ''))) {
        failures.push(`${file}: ${excerpt(gabc)}`);
      }
    }
    expect(failures).toEqual([]);
  });

  test('the ij. after the opening Allelúia can be removed for the Novus Ordo', () => {
    const failures = [];
    for (const { file, gabc } of alleluias) {
      const match = context.regexAlleluiaIj.exec(gabc);
      if (!match) continue;
      const novusMatch = context.regexAlleluiaIjOrNonRepetitur.exec(gabc);
      if (!novusMatch || novusMatch.index != match.index) failures.push(`${file}: ${excerpt(gabc, match.index)}`);
    }
    expect(failures).toEqual([]);
  });

  test('the opening Allelúia ends at the first double bar, before the ℣ (for the Psalm Tone style)', () => {
    const failures = [];
    for (const { file, gabc } of alleluias) {
      const match = context.regexGabcFirstDoubleBar.exec(gabc),
            verseIndex = gabc.indexOf('<sp>V/</sp>');
      if (!match || (verseIndex >= 0 && match.index > verseIndex)) failures.push(`${file}: ${excerpt(gabc)}`);
    }
    expect(failures).toEqual([]);
  });
});

describe('Introitus', () => {
  test('an abbreviated Gloria Patri and its E u o u a e are found (for the tones of the full Gloria Patri)', () => {
    const failures = [];
    for (const { file, gabc } of introits) {
      const index = gabc.search(regexAbbreviatedGloriaPatri);
      if (index >= 0 && !context.regexGabcGloriaPatri.test(gabc)) failures.push(`${file}: ${excerpt(gabc, index)}`);
    }
    expect(failures).toEqual([]);
  });

  test('the Gloria Patri can be removed (as in Passiontide)', () => {
    const failures = [];
    for (const { file, gabc } of introits) {
      const index = gabc.search(regexGloriaPatri),
            removed = gabc.replace(context.regexGabcGloriaPatriEtFilio, '');
      // (nor may it leave the <nlba> before it, which would keep everything after it from being broken onto another line)
      if (index >= 0 && (regexGloriaPatri.test(removed) || /<nlba>(?![\s\S]*<\/nlba>)/.test(removed))) {
        failures.push(`${file}: ${excerpt(gabc, index)}`);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('Introitus and Communio', () => {
  // the notes written in the gabc, leaving out clefs, custodes, accidentals and anything in brackets, braces or nabc
  const notesOf = gabc => (gabc.match(/\(([^)]*)\)/g) || []).flatMap(group => (
    group.slice(1, -1).split('|')[0]
      .replace(/\[[^\]]*\]|\{[^}]*\}|<[^>]*>/g, '')
      .replace(/[cf]b?[1-4]|[a-m]\+|z0|[a-m][xy#]/gi, '')
      .match(/[a-m]/gi) || []
  ).map(note => note.toLowerCase()));

  test('the custodes of the verses ad libitum are the first and last notes of the antiphon', () => {
    const failures = [];
    for (const { file, officePart, gabc } of chantsOf('Introitus', 'Communio')) {
      const isIntroit = officePart == 'Introitus';
      // (the antiphon of an Introit ends at its first double bar, where its verse starts)
      const doubleBar = isIntroit ? gabc.search(/\([^)]*::/) : -1;
      const notes = notesOf(doubleBar >= 0 ? gabc.slice(0, doubleBar) : gabc);
      const ctxt = new context.exsurge.ChantContext();
      const score = new context.exsurge.ChantScore(ctxt, context.exsurge.Gabc.createMappingsFromSource(ctxt, gabc), false);
      const custodes = context.getVersesAdLibitumCustodes(score, isIntroit);
      // (none of these antiphons changes clef, so the notes written in the gabc are in the starting clef)
      if (custodes.firstNote != notes[0] || custodes.lastNote != notes[notes.length - 1]) {
        failures.push(`${file}: ${custodes.firstNote}…${custodes.lastNote}, but the gabc has ${notes[0]}…${notes[notes.length - 1]}`);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('T. P.', () => {
  // selTempus is set from within the context, since bun does not pass a property set on context through to the global variable
  const setTempus = tempus => vm.runInContext(`selTempus = ${JSON.stringify(tempus)};`, context);
  const removeNotApplicableFromGabc = (gabc, tempus) => {
    setTempus(tempus);
    try {
      return context.removeNotApplicableFromGabc(gabc);
    } finally {
      setTempus('');
    }
  };
  const chantsWithTP = chants.filter(chant => regexTP.test(chant.gabc));

  for (const [tempus, name] of [['Pasch', 'the T. P. rubric is removed in Paschaltide'], ['', 'what is only sung in Paschaltide is removed outside of it']]) {
    test(name, () => {
      const failures = [];
      for (const { file, gabc } of chantsWithTP) {
        const result = removeNotApplicableFromGabc(gabc, tempus),
              index = result.search(regexTP);
        if (index >= 0) failures.push(`${file}: ${excerpt(result, index)}`);
        // (nor may it leave an <nlba> without its </nlba>, which would keep everything after it from being broken onto another line)
        const unclosed = result.search(/<nlba>(?![\s\S]*<\/nlba>)/);
        if (unclosed >= 0) failures.push(`${file}: ${excerpt(result, unclosed)}`);
      }
      expect(failures).toEqual([]);
    });
  }
});

test('every proper has a clef', () => {
  const failures = chantsOf('Introitus', 'Graduale', 'Tractus', 'Alleluia', 'Sequentia', 'Offertorium', 'Communio')
    .filter(({ gabc }) => !context.regexGabcClef.test(gabc))
    .map(({ file, gabc }) => `${file}: ${excerpt(gabc)}`);
  expect(failures).toEqual([]);
});
