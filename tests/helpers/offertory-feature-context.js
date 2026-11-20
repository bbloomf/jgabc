// Isolated propers.js adapter for exhaustive feature checks. Exsurge is intercepted
// here; tests/fixtures/offertory-render-audit.html uses the real browser renderer.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '../..');

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
const { DoubleBar } = require('../../exsurge.min.js');
const exsurge = new Proxy({}, {
  get: (target, key) => key === 'DoubleBar' ? DoubleBar : key == 'Gabc' ? { createMappingsFromSource: (ctxt, gabc) => { exsurgeGabc = gabc; return nothing; } } : nothing
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
const exported = ['runGabcReplaces', 'loadProperText', 'getPsalmToneForPart', 'updateExsurge', 'getOffertoryWithVerses', 'getGabcPathsForPart', 'getOffertoryVerseSettings'];
vm.runInContext('(' + ready.toString().replace(/^function\s*\(\)\s*\{/, start =>
  start + 'window.propers = {' + exported.map(name => `get ${name}() { return ${name}; }`).join(', ') + '};') + ')()',
  context, { filename: 'propers.js' });
const { propers, sel } = context;
vm.runInContext('selPropers = {};', context);

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

// the gabc that is shown on the page, after updateExsurge() has formatted it
const formatForExsurge = (part, gabc) => {
  sel[part].activeGabc = gabc;
  exsurgeGabc = undefined;
  propers.updateExsurge(part);
  return exsurgeGabc;
};


module.exports = { context, propers, sel, loadPart, formatForExsurge };
