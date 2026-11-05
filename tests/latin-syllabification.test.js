const { test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Use www/ on Cordova and the repository root on the web branch.
const root = fs.existsSync(path.join(__dirname, '..', 'www', 'psalmtone.js'))
  ? path.join(__dirname, '..', 'www') : path.join(__dirname, '..');
function loadTool() {
  const values = {};
  const elements = {};
  const $ = selector => ({
    0: elements[selector] || (elements[selector] = { checked: false }),
    val(value) {
      if (arguments.length) { values[selector] = value; return this; }
      return values[selector];
    },
    prop: () => false
  });
  $.fn = {};
  $.extend = (...objects) => Object.assign(...(objects[0] === true ? objects.slice(1) : objects));
  const context = vm.createContext({
    console, localStorage: {}, $, jQuery: $, location: { search: '' },
    URLSearchParams, setTimeout: () => {}
  });
  context.window = context;
  for (const file of ['util.js', 'psalmtone.js', 'jquery.hypher.js', 'patterns/la-hypher.js', 'psalmtone.html.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return { context, values, elements };
}

for (const [word, syllables] of [
  ['omnis', ['o', 'mnis']], ['ómnis', ['ó', 'mnis']], ['OMNES', ['O', 'MNES']],
  ['ómnibus', ['ó', 'mni', 'bus']], ['amnis', ['a', 'mnis']], ['somnus', ['so', 'mnus']],
  ['sanctus', ['san', 'ctus']], ['justus', ['ju', 'stus']],
  ['Redémptor', ['Re', 'dém', 'ptor']], ['dignus', ['di', 'gnus']],
  ['om-nis', ['om', 'nis']]
]) {
  test(`Latin syllabification of ${word}`, () => {
    const { context } = loadTool();
    expect(Array.from(context._getSyllables(word), s => s.sylnospace)).toEqual(syllables);
  });
}

test('Latin preserves accents, punctuation, and word grouping around mn', () => {
  const { context } = loadTool();
  const syllables = context._getSyllables('Ómnis, omnis.');
  expect(syllables[0].accent).toBe(true);
  expect(syllables[1].punctuation).toContain(',');
  expect(syllables[3].punctuation).toContain('.');
  expect(syllables[0].word).toBe(syllables[1].word);
  expect(syllables[0].word).not.toBe(syllables[2].word);
});

test('the selector saves the algorithm, invalidates the preview, and keeps Latin centering', () => {
  const { context, values } = loadTool();
  for (const [language, syllabifier, centering] of [
    ['la', '_getSyllables', 'latin'],
    ['la-liturgical', '_getLaSyllables', 'latin'],
    ['en', '_getEnSyllables', 'english']
  ]) {
    vm.runInContext(`last_syl = 'previous preview'; selectPsalmLanguage('${language}');`, context);
    expect(vm.runInContext(`getSyllables === ${syllabifier}`, context)).toBe(true);
    expect(vm.runInContext('selLang', context)).toBe(centering);
    expect(context.localStorage.psalmLanguage).toBe(language);
    expect(values['#selPsalmLanguage']).toBe(language);
    expect(vm.runInContext('last_syl', context)).toBeNull();
  }
});

test('editor and bulk export generation use the selected Latin algorithm for GABC and TeX', () => {
  const { context } = loadTool();
  vm.runInContext('gabcFormat = bi_formats.gabc; repeatIntonation = true;', context);
  const generate = language => {
    vm.runInContext(`selectPsalmLanguage('${language}');`, context);
    // downloadAll() uses this same updateEditor() call with explicit text and tone.
    return vm.runInContext(`updateEditor(true, 'omnis * omnis', "f fr 'g h.\\nf fr 'g h.", null, 'c4')`, context);
  };
  vm.runInContext("useFormat = 'gabc';", context);
  expect(generate('la')[0]).toContain('<b>o</b>(g)mnis(h.)');
  expect(generate('la-liturgical')[0]).toContain('<b>om</b>(g)nis(h.)');
  vm.runInContext("useFormat = 'tex';", context);
  expect(generate('la')[1]).toContain('\\textbf{o}mnis');
  expect(generate('la-liturgical')[1]).toContain('\\textbf{om}nis');
});

test('punctuation follows custom accented and preparatory closing strings only when enabled', () => {
  const { context } = loadTool();
  vm.runInContext(`
    getSyllables = _getSyllables;
    bi_formats.custom = { bold: ['<accent>', '</accent>'], italic: ['<prep>', '</prep>'], verse: ['', ''], nbsp: ' ',
      flex: ['<flex-accent>', '</flex-accent>', '<flex>', '</flex>'] };
  `, context);
  const format = (flag, onlyVowels = false) => context.addBoldItalic('tú, mé!»', 1, 1, 0, 'custom', onlyVowels, 0, false, false, 0, flag);
  expect(format(false)).toBe('<prep>tú</prep>, <accent>mé</accent>!»');
  expect(format(true)).toBe('<prep>tú,</prep> <accent>mé!»</accent>');
  expect(format(true, true)).toBe('t<prep>ú</prep>, m<accent>é</accent>!»');
  const flex = context.addBoldItalic('Dóminus, † Deus meus.', 1, 1, 0, 'custom', false, 0, false, false, 0, true);
  expect(flex).toContain('<flex>nus,</flex> †');
});

test('GABC includes punctuation inside format markers before the note', () => {
  const { context } = loadTool();
  vm.runInContext('getSyllables = _getSyllables;', context);
  const options = { text: 'tú, mé!', gabc: "f fr 'g h.", clef: 'c4', useBoldItalic: true };
  const ordinary = context.applyPsalmTone(options);
  const formatted = context.applyPsalmTone({ ...options, formatPunctuation: true });
  expect(ordinary).toContain('<i>tú</i>,');
  expect(ordinary).toContain('<b>mé</b>!');
  expect(formatted).toContain('<i>tú,</i>');
  expect(formatted).toContain('<b>mé!</b>');
  expect(formatted).not.toContain('</b>,');
});

test('checking either formatting option clears and saves the other option and refreshes the preview', () => {
  const { context, elements } = loadTool();
  vm.runInContext(`
    var refreshes = 0;
    updateEditor = function(force) { if(force) ++refreshes; };
    $('#cbOnlyVowels')[0].checked = true;
    updateOnlyVowels();
    $('#cbFormatPunctuation')[0].checked = true;
    updateFormatPunctuation();
  `, context);
  expect(elements['#cbOnlyVowels'].checked).toBe(false);
  expect(context.localStorage.cbOnlyVowels).toBe(false);
  expect(context.localStorage.cbFormatPunctuation).toBe(true);
  vm.runInContext("$('#cbOnlyVowels')[0].checked = true; updateOnlyVowels();", context);
  expect(elements['#cbFormatPunctuation'].checked).toBe(false);
  expect(context.localStorage.cbFormatPunctuation).toBe(false);
  expect(context.localStorage.cbOnlyVowels).toBe(true);
  expect(vm.runInContext('refreshes', context)).toBe(3);
});

test('preview and bulk generation pass punctuation formatting into GABC and TeX', () => {
  const { context } = loadTool();
  vm.runInContext(`
    selectPsalmLanguage('la');
    repeatIntonation = true;
    formatPunctuation = true;
    useFormat = 'tex';
  `, context);
  const generate = () => vm.runInContext(`updateEditor(true, 'tú, mé! * tú, mé!', "f fr 'g h.\\nf fr 'g h.", null, 'c4')`, context);
  expect(generate()[1]).toContain('\\textbf{tú,}');
  vm.runInContext("useFormat = 'gabc';", context);
  expect(generate()[0]).toContain('<b>mé!</b>');
});
