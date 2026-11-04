// Checks that download-gabc.js puts the cue at the end of a chant that repeats an earlier part of it in a no line break area
// Run with: bun test
const { test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const { wrapRepeatCueInNlba } = require('../repeat-cue.js');

const root = path.join(__dirname, '..');

test('puts an asterisk joined to the cue by ~ in the area with it', () => {
  const gabc = '(c4) sanc(eg/hf~)tam:(f.) (:) *~Quam(f) o(f)lim(ec~) A(e)bra(fg)hæ(gf) (::)\nHós(e)ti(f)as.(f) (::)\n*~Quam(f) o(f)lim.(ec~) (::)';
  expect(wrapRepeatCueInNlba(gabc)).toBe(gabc.replace('\n*~Quam(f) o(f)lim.(ec~) ', '\n<nlba>*~Quam(f) o(f)lim.(ec~)</nlba> '));
});

test('leaves an asterisk on the bar before the cue out of the area', () => {
  const gabc = '(c4) *() At(e)tén(f)de(hg) Dó(g)mi(f)ne,(f) (::)\nPec(f)cá(g)vi(f)mus.(f) (::)\nSanc(f)to.(fe..) *(::)\nAt(e)tén(f)de.(hg) (::)';
  expect(wrapRepeatCueInNlba(gabc)).toBe(gabc.replace('\nAt(e)tén(f)de.(hg) ', '\n<nlba>At(e)tén(f)de.(hg)</nlba> '));
});

test('leaves a rubric after the cue out of the area', () => {
  const gabc = '(c4) *(;) Ne(fe) for(h)te(ij) vé(j)ni(ef)ant(f) (::)\ndi(hg)cén(f)tes.(f.) *(::)\nNe(fe) for(h)te,(ij) <i>ut supra.</i>(::)';
  expect(wrapRepeatCueInNlba(gabc)).toBe(gabc.replace('Ne(fe) for(h)te,(ij) <i>', '<nlba>Ne(fe) for(h)te,(ij)</nlba> <i>'));
});

test('leaves alone a last invocation that is sung in full, as in a Kyrie', () => {
  const kyrie = '(c4) KY(f)ri(h)e(hg..) *(,) e(g)lé(g)i(f)son.(f.) <i>iij.</i>() (::)\nKý(j)ri(f)e(g.) *(,) e(g)lé(g)i(f)son.(f.) (::)';
  expect(wrapRepeatCueInNlba(kyrie)).toBe(kyrie);
});

test('leaves alone a chant that does not end with a repeat', () => {
  const gabc = '(c4) Pa(f)ter(g) *(,) no(h)ster(g) qui(f) es(e) (::)';
  expect(wrapRepeatCueInNlba(gabc)).toBe(gabc);
});

test('has put the cue of every gabc file in its area already, so running it again changes nothing', () => {
  const unwrapped = [];
  let wrapped = 0;
  for (const file of fs.readdirSync(path.join(root, 'gabc')).filter(file => file.endsWith('.gabc'))) {
    const gabc = fs.readFileSync(path.join(root, 'gabc', file), 'utf8');
    const content = gabc.slice(gabc.indexOf('\n%%\n') + 4);
    if (wrapRepeatCueInNlba(content) !== content) unwrapped.push(file);
    if (content.includes('<nlba>')) ++wrapped;
  }
  expect(unwrapped).toEqual([]);
  expect(wrapped).toBeGreaterThanOrEqual(8);
});
