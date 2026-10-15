// Checks the page layout arithmetic in js/chant-pdf.js (the Quick PDF button)
// Run with: bun test
const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// chant-pdf.js is a browser script, but it only touches the page when a PDF is made
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'chant-pdf.js'), 'utf8'), context, { filename: 'chant-pdf.js' });
const ChantPdf = vm.runInContext('ChantPdf', context);
// the vm has its own Object.prototype, so copy results out before comparing them
const plain = value => JSON.parse(JSON.stringify(value));

describe('getSizes', () => {
  // as measured in the server's PDFs of the 21st Sunday after Pentecost, Letter and Letter booklet, in PDF points
  test('Letter at font size 20 matches the server: staff size 26', () => {
    const sizes = ChantPdf.getSizes(20);
    expect(sizes.lyric).toBeCloseTo(19.9253, 3);
    expect(sizes.dropCap).toBeCloseTo(59.7758, 3);
    expect(sizes.annotation).toBeCloseTo(16.6044, 3);
    expect(sizes.staffSpace).toBeCloseTo(12.45, 2);
    expect(sizes.staffLineWeight).toBeCloseTo(0.593, 2);
    expect(sizes.title.size).toBeCloseTo(20.6625, 2);
    expect(sizes.commentary.size).toBeCloseTo(11.9552, 3);
  });
  test('a booklet at font size 12 matches the server: staff size 17', () => {
    const sizes = ChantPdf.getSizes(12);
    expect(sizes.lyric).toBeCloseTo(11.9552, 3);
    expect(sizes.dropCap).toBeCloseTo(35.8655, 3);
    expect(sizes.annotation).toBeCloseTo(9.96264, 3);
    expect(sizes.staffSpace).toBeCloseTo(8.141, 2);
    expect(sizes.staffLineWeight).toBeCloseTo(0.388, 2);
  });
  test('the title and commentary keep their size', () => {
    expect(plain(ChantPdf.getSizes(12).title)).toEqual(plain(ChantPdf.getSizes(20).title));
    expect(plain(ChantPdf.getSizes(12).commentary)).toEqual(plain(ChantPdf.getSizes(20).commentary));
  });
});

describe('getLayout', () => {
  test('Letter: the printed width plus half-inch margins, in points', () => {
    const layout = ChantPdf.getLayout({ fontSize: 20, width: 7.5 });
    expect([layout.pageWidth, layout.pageHeight, layout.margin, layout.width]).toEqual([612, 792, 36, 540]);
  });
  test('a Letter booklet is half a Letter page', () => {
    const layout = ChantPdf.getLayout({ fontSize: 12, width: 4.5, height: 8.5 });
    expect([layout.pageWidth, layout.pageHeight, layout.width]).toEqual([396, 612, 324]);
    expect(layout.sizes.lyric).toBeCloseTo(11.9552, 3);
  });
});

describe('getPaper', () => {
  const header = (values, cValues = {}) => Object.assign({ cValues }, values);
  test('defaults to Letter at the given font size', () => {
    expect(plain(ChantPdf.getPaper(header({}), { fontSize: 12 }))).toEqual({ width: 7.5, height: 11, fontSize: 12 });
  });
  test('reads header lines and % comments, with units', () => {
    expect(plain(ChantPdf.getPaper(header({ width: '6in', fontsize: '16' }, { height: '25.4cm' }), { fontSize: 20 })))
      .toEqual({ width: 6, height: 10, fontSize: 16 });
    expect(ChantPdf.getPaper(header({}, { width: '127mm' })).width).toBeCloseTo(5);
  });
});

describe('paginate', () => {
  const pages = (items, pageHeight = 100) => plain(ChantPdf.paginate(items, pageHeight));

  test('stacks items down the page, with gaps only between items on the same page', () => {
    expect(pages([{ height: 40 }, { height: 40, gap: 10 }, { height: 40, gap: 10 }])).toEqual([
      { page: 0, y: 0 }, { page: 0, y: 50 }, { page: 1, y: 0 }
    ]);
  });
  test('an item taller than what is left starts a new page', () => {
    expect(pages([{ height: 70 }, { height: 31 }])).toEqual([{ page: 0, y: 0 }, { page: 1, y: 0 }]);
    expect(pages([{ height: 70 }, { height: 30 }])).toEqual([{ page: 0, y: 0 }, { page: 0, y: 70 }]);
  });
  test('keepWithNext moves an item to the next page with the one after it', () => {
    // a commentary that would otherwise be left at the foot of the page, apart from its chant
    expect(pages([{ height: 80 }, { height: 10, keepWithNext: true }, { height: 30 }])).toEqual([
      { page: 0, y: 0 }, { page: 1, y: 0 }, { page: 1, y: 10 }
    ]);
  });
  test('keepWithNext chains, but stops at a page break', () => {
    const items = [{ height: 50 }, { height: 20, keepWithNext: true }, { height: 20, keepWithNext: true }, { height: 20 }];
    expect(pages(items).map(p => p.page)).toEqual([0, 1, 1, 1]);
    const broken = [{ height: 50 }, { height: 20, keepWithNext: true }, { height: 20, pageBreak: true }];
    expect(pages(broken).map(p => p.page)).toEqual([0, 0, 1]);
  });
  test('pageBreak starts a new page unless the item is already at the top of one', () => {
    expect(pages([{ height: 10, pageBreak: true }, { height: 10, pageBreak: true, gap: 5 }])).toEqual([
      { page: 0, y: 0 }, { page: 1, y: 0 }
    ]);
  });
  test('an item taller than a whole page still gets placed', () => {
    expect(pages([{ height: 10 }, { height: 150 }, { height: 10 }])).toEqual([
      { page: 0, y: 0 }, { page: 1, y: 0 }, { page: 2, y: 0 }
    ]);
  });
});
