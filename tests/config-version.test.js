// Checks that config.xml carries the same version as package.json; the
// before_prepare hook in hooks/sync-config-version.js fixes it on the next build.
// Run with: bun test
const { test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

test('config.xml version matches package.json', () => {
  const { version } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const xml = fs.readFileSync(path.join(root, 'config.xml'), 'utf8');
  expect(xml.match(/<widget\b[^>]*?\sversion=(["'])([^"']*)\1/)?.[2]).toBe(version);
});
