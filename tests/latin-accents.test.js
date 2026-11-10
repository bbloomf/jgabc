const { test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const nothing = new Proxy(function() {}, { get: () => nothing, apply: () => nothing });
let language = 'la', enabled = true;
const context = vm.createContext({
  console, localStorage: {}, setTimeout: () => {}, clearTimeout: () => {},
  navigator: { language: 'en', userAgent: '' }, location: { hash: '', search: '' },
  $: selector => selector === '#selLanguage' ? { val: () => language } :
    selector === '#cbAccenteur' ? { prop: () => enabled } : nothing,
  jQuery: nothing
});
context.window = context;
for (const file of ['util.js', 'psalmtone.js', 'jquery.hypher.js', 'patterns/la-hypher.js',
  'js/accenteur/engine.js', 'js/latin-accents.js', 'transcriber.html.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
}
const accent = text => context.LatinAccents.apply(text).text;

test('accents words with three or more syllables, preserving capitalization', () => {
  expect(accent('Adoro te devote, latens Deitas. DOMINUS!'))
    .toBe('Adóro te devóte, latens Déitas. DÓMINUS!');
  expect(accent('Deus meus pater mater')).toBe('Deus meus pater mater');
});

test('keeps existing accents, ambiguous words and unknown words', () => {
  expect(accent('Dóminus Dóminus\u0301 Maria maria zzzzzzzzzzz'))
    .toBe('Dóminus Dóminus\u0301 Maria maria zzzzzzzzzzz');
});

test('preserves spelling, markup, elisions and explicit syllable breaks', () => {
  expect(accent('<i>Adoro</i> Ad=o=ro Ador(o) caelorum cælorum coelorum cœlorum'))
    .toBe('<i>Adóro</i> Ad=ó=ro Adór(o) caelórum cælórum coelórum cœlórum');
  expect(accent('<v>Adoro</v> !Adoro Adoro*')).toBe('<v>Adoro</v> !Adoro Adoro*');
});

test('maps added combining accents back to the source text', () => {
  // Exercise the same mapping path with an unambiguous œ stress supplied by the engine.
  const original = context.Accenteur.accentify;
  context.Accenteur.accentify = () => ['cœ\u0301libatus'];
  try {
    const result = context.LatinAccents.apply('cœlibatus Adoro');
    expect(result.text).toBe('cœ\u0301libatus Adóro');
    expect(result.indexes[result.text.indexOf('Adóro')]).toBe(10);
    expect(result.indexes[result.text.length]).toBe(15);
  } finally {
    context.Accenteur.accentify = original;
  }
  const unchanged = context.LatinAccents.apply('Dóminus\u0301 Adoro');
  expect(unchanged.indexes[unchanged.text.indexOf('Adóro')]).toBe(9);
});

test('applies only when enabled in either Latin mode', () => {
  for (const mode of ['la', 'la-liturgical']) {
    language = mode;
    enabled = true;
    expect(context.splitText('Adoro').map(s => s.syl).join('')).toBe('Adóro');
    enabled = false;
    expect(context.splitText('Adoro').map(s => s.syl).join('')).toBe('Adoro');
  }
  language = 'vi';
  enabled = true;
  expect(context.splitText('Adoro').map(s => s.syl).join('')).toBe('Adoro');
});

test('updates the separate text box on paste and enabling, preserving selection and scroll', () => {
  const originalDollar = context.$;
  const textarea = {
    value: 'Adoro te devote', selectionStart: 6, selectionEnd: 15,
    selectionDirection: 'backward', scrollTop: 42, scrollLeft: 3,
    setSelectionRange(start, end, direction) {
      this.selectionStart = start; this.selectionEnd = end; this.selectionDirection = direction;
    }
  };
  let separate = true;
  context.$ = selector => selector === '#hymntext' ? [textarea] :
    selector === '#oneBox' ? { is: () => separate } : originalDollar(selector);
  language = 'la'; enabled = true;
  try {
    context.accentTextBox({ type: 'input', originalEvent: { inputType: 'insertFromPaste' } });
    expect(textarea.value).toBe('Adóro te devóte');
    expect([textarea.selectionStart, textarea.selectionEnd, textarea.selectionDirection,
      textarea.scrollTop, textarea.scrollLeft]).toEqual([6, 15, 'backward', 42, 3]);
    textarea.value = 'Dominus';
    enabled = false;
    context.accentTextBox();
    expect(textarea.value).toBe('Dominus');
    enabled = true;
    context.accentTextBox();
    expect(textarea.value).toBe('Dóminus');
    textarea.value = 'Adoro';
    separate = false;
    context.accentTextBox();
    expect(textarea.value).toBe('Adoro');
    separate = true; language = 'en';
    context.accentTextBox();
    expect(textarea.value).toBe('Adoro');
  } finally {
    context.$ = originalDollar;
  }
});

test('typing waits for a completed word, then accents it without moving the caret', () => {
  const originalDollar = context.$;
  const textarea = {
    value: 'Domin', selectionStart: 5, selectionEnd: 5, selectionDirection: 'none',
    setSelectionRange(start, end) { this.selectionStart = start; this.selectionEnd = end; }
  };
  context.$ = selector => selector === '#hymntext' ? [textarea] :
    selector === '#oneBox' ? { is: () => true } : originalDollar(selector);
  language = 'la'; enabled = true;
  try {
    const event = { type: 'input', originalEvent: { inputType: 'insertText' } };
    context.accentTextBox(event);
    expect(textarea.value).toBe('Domin');
    textarea.value = 'Dominus'; textarea.selectionStart = textarea.selectionEnd = 7;
    context.accentTextBox(event);
    expect(textarea.value).toBe('Dominus');
    textarea.value += ' '; textarea.selectionStart = textarea.selectionEnd = 8;
    context.accentTextBox(event);
    expect(textarea.value).toBe('Dóminus ');
    expect(textarea.selectionStart).toBe(8);
  } finally {
    context.$ = originalDollar;
  }
});

test('recalculates automatic stress when backspacing aliísque to áliis', () => {
  const editor = context.LatinAccents.createEditor();
  let text = editor.apply('aliisque ').text;
  expect(text).toBe('aliísque ');
  for (let i = 0; i < 4; ++i) {
    text = text.slice(0, -1);
    text = editor.apply(text, text.length).text;
  }
  expect(text).toBe('áliis');
});

test('tracks automatic accents across edits before the word and preserves explicit stress', () => {
  const editor = context.LatinAccents.createEditor();
  expect(editor.apply('aliisque Dóminus').text).toBe('aliísque Dóminus');
  expect(editor.apply('et aliísque Dóminus').text).toBe('et aliísque Dóminus');
  expect(editor.apply('et aliís Dóminus', 8).text).toBe('et áliis Dóminus');
  // Replacing the automatically accented vowel with another explicit accent
  // relinquishes ownership, so subsequent edits preserve the user's choice.
  expect(editor.apply('et alíis Dóminus').text).toBe('et alíis Dóminus');
  expect(editor.apply('et alíisque Dóminus').text).toBe('et alíisque Dóminus');
});

test('recalculates accents when extending a previously accented word', () => {
  const editor = context.LatinAccents.createEditor();
  expect(editor.apply('aliis').text).toBe('áliis');
  expect(editor.apply('áliisque', 8).text).toBe('aliísque');
  const explicit = context.LatinAccents.createEditor();
  expect(explicit.apply('aliís', 5).text).toBe('aliís');
});
