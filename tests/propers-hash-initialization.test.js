const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const offertoryVerses = require('../offertory-verses-data');

const source = fs.readFileSync(path.join(__dirname, '../propers.js'), 'utf8');
function section(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  if (from < 0 || to < 0) throw new Error('Missing propers.js section: ' + start);
  return source.slice(from, to);
}

// Run the production hash handler, parser, count clamping, controls and path
// selection together. Only the surrounding DOM and chant loading are simulated.
function page(hash, { previousId, dayId } = {}) {
  const elements = new Map(), requests = [], renders = [], events = [];
  let context;
  function element(id) {
    if (elements.has(id)) return elements.get(id);
    const result = {
      id, value: id === 'selStyleOffertorium' ? 'full' : '', length: 1,
      checked: false, disabled: false, visible: true, options: [],
      val(value) { if (!arguments.length) return this.value; this.value = String(value); return this; },
      empty() { this.options = []; return this; },
      append(option) { this.options.push(option.value); return this; },
      text() { return this; },
      toggle(value) { this.visible = value; return this; },
      prop(key, value) { this[key] = value; return this; },
      find() { return this; }, attr() { return this; },
      children() { return { length: 1 }; },
      scrollIntoView() {},
      change() {
        if (this.id === 'selMass' || this.id === 'selSunday' || this.id === 'selTempus') {
          events.push(this.id);
          // Day/season selection refreshes the current chant before custom IDs
          // are installed, including when the initial offertory has no ID.
          if (dayId) context.sel.offertorium.id = dayId;
          context.updateOffertoryVerseOptions('offertorium');
        } else if (this.id === 'selStyleOffertorium') {
          context.sel.offertorium.style = this.value;
          context.updateOffertoryVerseOptions('offertorium');
        }
        return this;
      }
    };
    result[0] = result;
    elements.set(id, result);
    return result;
  }
  function $(selector) {
    if (typeof selector === 'object') return selector;
    if (selector === '<option>') return { val(value) { this.value = String(value); return this; }, text() { return this; } };
    if (selector === 'input.sel-custom' || selector === 'select[id^=selStyle]') {
      return { each(callback) { callback.call(element(selector === 'input.sel-custom' ? 'selOffertorium' : 'selStyleOffertorium')); } };
    }
    return element(selector.replace(/^#/, ''));
  }
  context = vm.createContext({
    $, offertoryVerses, location: { hash }, sel: { offertorium: { id: previousId, style: 'full' } },
    selPropers: {}, ordinaryParts: [], lastHandledHash: undefined,
    allowAddToHash: true, gregobaseUrlPrefix: 'https://gregobase.selapa.net/chant.php?id=',
    setTimeout() {},
    updatePart(part) {
      const state = context.sel[part];
      state.id = context.selPropers[part + 'ID'];
      context.updateOffertoryVerseOptions(part);
      state.gabcPaths = context.getGabcPathsForPart(part).join(' ');
      requests.push(state.gabcPaths);
      state.gabc = 'loaded antiphon';
    },
    updateTextAndChantForPart() { renders.push(context.getOffertoryVerseSettings()); }
  });
  context.window = context;
  vm.runInContext([
    section('  var LocationHash =', '  function makeAnnotationArrayFromHeader'),
    section('  var getGabcPathsForPart =', '  // adds the Chants Abrégés'),
    section('  var getOffertoryVerseSettings =', '  // Measure the actual controls'),
    section('  var updateOffertoryVerseOptions =', '  var getOffertoryWithVerses ='),
    section('  function hashChanged(', '  function isCustomPart(')
  ].join('\n'), context);
  context.hashChanged(true);
  return { context, elements, requests, renders, events, settings: () => context.getOffertoryVerseSettings() };
}

describe('offertory URL initialization', () => {
  const full = offertoryVerses.full[offertoryVerses.fullById[962]];
  const custom = suffix => '#offertorium=962' + suffix + '#mass=custom';

  test('restores the reported initial URL before loading the custom chant', () => {
    const p = page(custom('#offertoriumVerseCount=1'));
    expect(p.events).toContain('selMass');
    expect(p.settings().count).toBe(1);
    expect(p.elements.get('selOffertoryVerseCount').value).toBe('1');
    expect(p.requests).toEqual(['gabc/962.gabc gabc/offertory-verses/' + offertoryVerses.fullById[962] + '.gabc']);
    expect(p.renders.at(-1).count).toBe(1);
    expect(p.context.location.hash).toBe(custom('#offertoriumVerseCount=1'));
  });

  test('a previous chant with no verses cannot clamp the URL count', () => {
    const p = page(custom('#offertoriumVerseCount=1#tempus=Quad'), { previousId: 'no-verses' });
    expect(p.events).toEqual(['selMass', 'selTempus']);
    expect(p.settings().count).toBe(1);
  });

  test('restores counts for a selected day as well as a custom Mass', () => {
    const p = page('#sunday=example#offertoriumVerseCount=1', { dayId: 962 });
    expect(p.settings().count).toBe(1);
    expect(p.elements.get('selOffertoryVerseCount').value).toBe('1');
  });

  for (const [value, expected] of [['0', 0], ['', 0], ['-1', 0], ['bad', 0], ['999', full.verseCount]]) {
    test('restores and bounds count ' + JSON.stringify(value), () => {
      const p = page(custom(value ? '#offertoriumVerseCount=' + value : ''));
      expect(p.settings().count).toBe(expected);
      expect(p.elements.get('selOffertoryVerseCount').value).toBe(String(expected));
    });
  }

  test('restores psalm-toned verses independently of the antiphon style', () => {
    const p = page(custom('#offertoriumVerseCount=1#offertoriumPsalmVerses=1'));
    expect(p.settings().count).toBe(1);
    expect(p.settings().psalmToned).toBe(true);
    expect(p.elements.get('cbOffertoryPsalmVerses').checked).toBe(true);
    expect(p.requests).toEqual(['gabc/962.gabc']);
  });

  test('restores a psalm-tone antiphon and its selected verse', () => {
    const p = page(custom('#offertoriumVerseCount=1#styleOffertorium=psalm-tone'));
    expect(p.settings().count).toBe(1);
    expect(p.settings().psalmToned).toBe(true);
    expect(p.elements.get('selStyleOffertorium').value).toBe('psalm-tone');
    expect(p.requests.at(-1)).toBe('gabc/962.gabc');
  });

  for (const [style, count, antiphonStyle, psalmToned] of [
    ['full-verses', full.verseCount, 'full', false],
    ['full-psalm-verses', 1, 'full', true],
    ['psalm-tone-verses', 1, 'psalm-tone', true]
  ]) {
    test('restores legacy style ' + style, () => {
      const p = page(custom('#styleOffertorium=' + style));
      expect(p.settings().count).toBe(count);
      expect(p.settings().psalmToned).toBe(psalmToned);
      expect(p.context.sel.offertorium.style).toBe(antiphonStyle);
    });
  }

  test('explicit zero overrides the legacy verse default', () => {
    expect(page(custom('#styleOffertorium=full-verses#offertoriumVerseCount=0')).settings().count).toBe(0);
  });

  test('a later URL clears the earlier count and psalm-verse setting', () => {
    const p = page(custom('#offertoriumVerseCount=1#offertoriumPsalmVerses=1'));
    p.context.location.hash = custom('');
    p.context.hashChanged();
    expect(p.settings().count).toBe(0);
    expect(p.settings().psalmToned).toBe(false);
    expect(p.elements.get('cbOffertoryPsalmVerses').checked).toBe(false);
  });
});
