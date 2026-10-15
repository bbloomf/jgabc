// Checks how getHeader in util.js reads the header of a gabc file
// Run with: bun test
const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// util.js is a browser script, so run it the way the browser does
const context = vm.createContext({ console, localStorage: {}, $: () => {} });
context.window = context;
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'util.js'), 'utf8'), context, { filename: 'util.js' });

const header = lines => context.getHeader(lines.join('\n') + '\n%%\n(c4) A(f)');

describe('header values', () => {
  test('a semicolon at the end of the line ends the value', () => {
    expect(header(['name: Puer natus est;']).name).toBe('Puer natus est');
  });
  test('a semicolon in the middle of the line is part of the value', () => {
    expect(header(['commentary: Is. 9:6; Ps. 97:1;']).commentary).toBe('Is. 9:6; Ps. 97:1');
    expect(header(['commentary: Is. 9:6;Ps. 97:1;']).commentary).toBe('Is. 9:6;Ps. 97:1');
  });
  test('whitespace after the final semicolon is ignored', () => {
    expect(header(['name: Puer natus est; \t']).name).toBe('Puer natus est');
  });
  test('the final semicolon may be left out', () => {
    expect(header(['commentary: Is. 9:6; Ps. 97:1']).commentary).toBe('Is. 9:6; Ps. 97:1');
  });
  test('a value may be empty', () => {
    expect(header(['annotation:;']).annotation).toBe('');
  });
  test('values in comments are read the same way', () => {
    expect(header(['%timing: 1;2 3;']).cValues.timing).toBe('1;2 3');
  });
  test('toString writes back a value with a semicolon in it', () => {
    const h = header(['name: Puer;', 'commentary: Is. 9:6;Ps. 97:1;']);
    expect(String(h)).toBe('name: Puer;\ncommentary: Is. 9:6;Ps. 97:1;\n%%\n');
    expect(context.getHeader(String(h)).commentary).toBe('Is. 9:6;Ps. 97:1');
  });
});
