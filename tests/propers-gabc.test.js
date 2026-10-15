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
for (const file of ['util.js', 'propers.js']) {
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
const regexAbbreviatedGloriaPatri = /P[aá]\([^)]*\)tri\.?\([^)]*\)\s*\(::\)/i;
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
      const index = gabc.search(regexGloriaPatri);
      if (index >= 0 && regexGloriaPatri.test(gabc.replace(context.regexGabcGloriaPatriEtFilio, ''))) {
        failures.push(`${file}: ${excerpt(gabc, index)}`);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('Introitus and Communio', () => {
  test('the last note of the antiphon is found (for the custos of the verses ad libitum)', () => {
    const failures = chantsOf('Introitus', 'Communio')
      .filter(({ gabc }) => !context.regexGabcAntiphonLastNote.test(gabc))
      .map(({ file, gabc }) => `${file}: ${excerpt(gabc, gabc.length - 100)}`);
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
