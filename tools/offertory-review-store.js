const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');
const chant = require('../offertory-verses');
const { normalizeGabcLatin } = require('../gabc-latin-normalization');
const importer = require('../download-offertory-verses');
const ROOT = path.resolve(__dirname, '..');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const readJson = (file, fallback = {}) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback;
function body(source) { return source.slice(source.lastIndexOf('%%') + 2).trim(); }
function field(source, name) { return (new RegExp('^' + name + ':\\s*([^;]+);', 'm').exec(source) || [])[1] || ''; }
function removeRhythm(source) {
  return source.replace(/\([^)]*\)/g, group => group.replace(/[_'.]\d*/g, '').replace(/\[(?:oh|uh|ve):[^\]]*\]/g, ''));
}
function atomic(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = file + '.review-tmp';
  fs.writeFileSync(temp, text);
  fs.renameSync(temp, file);
}
function noteSpan(source, index) {
  index = Math.max(0, Math.min(source.length - 1, index));
  const open = source.lastIndexOf('(', index), close = source.indexOf(')', index);
  if (open >= 0 && close >= index && source.lastIndexOf(')', index) < open) {
    if (!/[a-m]/i.test(source[index])) index = open + 1;
    const notes = source.slice(index, close), token = /^[a-m][^a-m\s/!,;:`()]*[~<>]?/i.exec(notes);
    if (token && !/^[cf]b?[1-4]$/.test(source.slice(open + 1, close))) return [index, index + token[0].length];
    return [open + 1, close];
  }
  let end = source.indexOf('(', index);
  if (end < 0) end = index + 1;
  return [index, end];
}
class ReviewStore {
  constructor(root = ROOT) { this.root = root; this.base = path.join(root, 'data/offertory-verses'); }
  manifest() { return readJson(path.join(this.base, 'manual.json')); }
  entries() { const m = this.manifest(); return [...m.chants, ...(m.drafts || [])]; }
  entry(id) { const e = this.entries().find(e => e.id === id); if (!e) throw Object.assign(new Error('Unknown transcription'), { status: 404 }); return e; }
  sourceFile(id) { this.entry(id); return path.join(this.base, 'manual', id + '.gabc'); }
  openingFile(id) { this.entry(id); return path.join(this.base, 'publication/openings', id + '.gabc'); }
  state() { return readJson(path.join(this.base, 'publication/review-state.json')); }
  opening(entry, verses) {
    const override = this.openingFile(entry.id);
    if (fs.existsSync(override)) return { source: fs.readFileSync(override, 'utf8'), provenance: 'Edited publication opening', localId: null };
    // The 1935 Laetamini has Alleluia; 786 is the seasonal omission.
    const localId = entry.id === 'manual-081' ? 870 : entry.localIds[0];
    const context = {};
    const index = path.join(this.root, 'propersdata.js');
    if (fs.existsSync(index)) vm.runInNewContext(fs.readFileSync(index, 'utf8'), context);
    const includes = node => node && typeof node === 'object' && (node.id === localId || Object.values(node).some(includes));
    const pair = Object.values(context.chantID?.offertorium || {}).find(includes);
    const vaticanId = pair?.Vatican?.id;
    const actualId = vaticanId && fs.existsSync(path.join(this.root, 'gabc', vaticanId + '.gabc')) ? vaticanId : localId;
    const original = fs.readFileSync(path.join(this.root, 'gabc', actualId + '.gabc'), 'utf8');
    let antiphon = removeRhythm(importer.firstAntiphon(original)).replace(/\*(?:\(\))?/g, '');
    // Printed respond points, without the application's bold editorial styling.
    antiphon = chant.prepareFull(antiphon, body(verses), entry.cue, entry.cueOccurrences).antiphon.replace(/<\/?b>/g, '');
    return { source: `name: ${entry.name} — publication opening;\noffice-part: Offertorium;\nmode: ${field(verses, 'mode')};\n%%\n${antiphon.trim()}\n`,
      localId: actualId, vaticanId: vaticanId || null,
      provenance: actualId === vaticanId ? `Local Vatican antiphon ${actualId}` : `Local antiphon ${actualId}; rhythmic signs removed; check against the scan` };
  }
  get(id) {
    const entry = this.entry(id), source = fs.readFileSync(this.sourceFile(id), 'utf8');
    const opening = this.opening(entry, source), sourceHash = hash(source), openingHash = hash(opening.source);
    const saved = this.state()[id] || {};
    const checked = { verses: saved.verseHash === sourceHash, opening: saved.openingHash === openingHash };
    return { ...entry, source, sourceHash, opening: opening.source, openingHash, openingProvenance: opening.provenance,
      openingLocalId: opening.localId, vaticanId: opening.vaticanId,
      appAvailable: this.manifest().chants.some(e => e.id === id),
      pages: [...new Set([entry.page, ...(entry.verseReview?.pdfPages || entry.pdfPages || [])])],
      effectiveReview: importer.verseReviewStatus(entry, { clef: chant.lastClef(body(source).split('<sp>V/</sp>')[0]), gabc: body(source).slice(body(source).indexOf('<sp>V/</sp>')) }),
      checked, ready: checked.verses && checked.opening, notes: saved.notes || '', publishedUrl: saved.publishedUrl || '',
      gregobaseId: saved.gregobaseId || Number((/id=(\d+)/.exec(saved.publishedUrl || '') || [])[1]) || null,
      submission: this.submission(entry, source, opening.source) };
  }
  submission(entry, source, opening) {
    const clean = removeRhythm(body(opening));
    const verseBody = removeRhythm(body(source));
    return `name: ${entry.name};\noffice-part: Offertorium;\nmode: ${field(source, 'mode')};\nbook: Offertoriale Sive Versus Offertoriorum Cantus Gregoriani, 1935, pp. ${(entry.verseReview?.pdfPages || entry.pdfPages || [entry.page]).join(', ')};\ntranscriber: Benjamin Bloomfield (w/ ChatGPT);\n%%\n${clean}\n${verseBody}\n`;
  }
  validate(entry, kind, source) {
    if (typeof source !== 'string' || source.length > 250000 || (source.match(/%%/g) || []).length !== 1) throw new Error('Use one GABC header followed by %% and notation.');
    const notation = body(source);
    if (field(source, 'office-part') !== 'Offertorium' || !/^[1-8]$/.test(field(source, 'mode'))) throw new Error('Keep the Offertorium part and a mode from 1 to 8.');
    const original = fs.readFileSync(this.sourceFile(entry.id), 'utf8');
    if (field(source, 'mode') !== field(original, 'mode')) throw new Error('Mode changes need a separate source review.');
    const finalBar = [...notation.matchAll(/\([^)]*::[^)]*\)/g)].pop();
    const tail = finalBar ? notation.slice(finalBar.index + finalBar[0].length) : '';
    const notatedTail = [...tail.matchAll(/\(([^)]*)\)/g)].some(match => match[1].trim());
    if (!/^\([cf]b?[1-4]\)/.test(notation) || !finalBar || notatedTail) throw new Error('Start with a clef and end the music with a double bar; text-only references may follow.');
    let depth = 0;
    for (const char of notation.replace(/<[^>]*>/g, '')) { if (char === '(') ++depth; if (char === ')') --depth; if (depth < 0 || depth > 1) throw new Error('Check the notation parentheses.'); }
    if (depth) throw new Error('Close every notation parenthesis.');
    if (kind === 'verses') {
      if (!/^\([cf]b?[1-4]\)\s+<sp>V\/<\/sp>/.test(notation)) throw new Error('Keep the first verse marker after the opening clef.');
      if (chant.splitVerses(notation).length !== entry.verseCount) throw new Error(`Keep all ${entry.verseCount} printed verses in this file.`);
    } else if (/<sp>V\/<\/sp>/.test(notation)) throw new Error('The publication opening must contain only the antiphon.');
    if (removeRhythm(notation) !== notation) throw new Error('These Vatican scores should have no rhythmic dots, episemata or ictus marks.');
  }
  save(id, kind, source, expectedHash) {
    const entry = this.entry(id);
    if (!['verses', 'opening'].includes(kind)) throw new Error('Unknown editing document.');
    const current = this.get(id), currentHash = kind === 'verses' ? current.sourceHash : current.openingHash;
    if (expectedHash !== currentHash) throw Object.assign(new Error('This file changed outside the editor. Reload it before saving; your local draft is preserved.'), { status: 409 });
    source = source.replace(/\r\n?/g, '\n');
    this.validate(entry, kind, source);
    if(source === (kind === 'verses' ? current.source : current.opening)) return current;
    const history = path.join(this.base, 'publication/history', id + '.jsonl');
    fs.mkdirSync(path.dirname(history), { recursive: true });
    fs.appendFileSync(history, JSON.stringify({ date: new Date().toISOString(), kind, source: kind === 'verses' ? current.source : current.opening, hash: currentHash }) + '\n');
    const writes = [[kind === 'verses' ? this.sourceFile(id) : this.openingFile(id), source]];
    if (kind === 'verses' && this.manifest().chants.some(e => e.id === id)) {
      const dataFile = path.join(this.root, 'offertory-verses-data.js'), context = {};
      vm.runInNewContext(fs.readFileSync(dataFile, 'utf8'), context);
      const data = JSON.parse(JSON.stringify(context.offertoryVerses)), info = data.full[id];
      const parts = chant.splitVerses(normalizeGabcLatin(body(source)));
      const review = importer.verseReviewStatus(entry, { clef: chant.lastClef(body(source).split('<sp>V/</sp>')[0]), gabc: body(source).slice(body(source).indexOf('<sp>V/</sp>')) });
      Object.assign(info, { review, verseCount: parts.length,
        psalmVerses: parts.map((verse, i) => { const cue = (entry.psalmVerseCues || [])[i] || entry.cue;
          return { text: chant.psalmVerseText(verse.gabc), cue,
            ...(entry.cueOccurrences?.[chant.normalize(cue || '')] ? { occurrence: entry.cueOccurrences[chant.normalize(cue)] } : {}) }; }) });
      writes.push([path.join(this.root, 'gabc/offertory-verses', id + '.gabc'), normalizeGabcLatin(source)],
        [dataFile, '// Generated by download-offertory-verses.js; edit data/offertory-verses/ instead.\nvar offertoryVerses = ' + JSON.stringify(data, null, 2) + ';\nif(typeof module === "object" && module.exports) module.exports = offertoryVerses;\n']);
      const auditFile = path.join(this.base, 'antiphon-audit.json'), audit = readJson(auditFile, []);
      for (const row of audit) if (row.sourceId === id) row.review = review;
      writes.push([auditFile, JSON.stringify(audit, null, 2) + '\n']);
    }
    const previous = writes.map(([file]) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null);
    try { writes.forEach(([file, text]) => atomic(file, text)); }
    catch (error) { writes.forEach(([file], i) => { if (previous[i] !== null) atomic(file, previous[i]); }); throw error; }
    return this.get(id);
  }
  review(id, payload) {
    const current = this.get(id);
    if (payload.sourceHash !== current.sourceHash || payload.openingHash !== current.openingHash) throw Object.assign(new Error('The score changed. Reload before marking it checked.'), { status: 409 });
    const state = this.state();
    const url = (payload.publishedUrl || '').trim();
    if (url && !/^https:\/\/gregobase\.selapa\.net\/chant\.php\?id=\d+$/.test(url)) throw new Error('Use a GregoBase chant link for the published score.');
    state[id] = { notes: String(payload.notes || '').slice(0,20000), publishedUrl: url, gregobaseId: url ? Number(new URL(url).searchParams.get('id')) : null,
      verseHash: payload.checked?.verses ? current.sourceHash : null, openingHash: payload.checked?.opening ? current.openingHash : null, date: new Date().toISOString() };
    atomic(path.join(this.base, 'publication/review-state.json'), JSON.stringify(state, null, 2) + '\n');
    return this.get(id);
  }
  exportFiles() {
    const out = path.join(this.base, 'publication/gabc');
    fs.mkdirSync(out, { recursive: true });
    const list = this.entries().map(entry => {
      const data = this.get(entry.id);
      atomic(path.join(out, entry.id + '.gabc'), data.submission);
      return { id: entry.id, name: entry.name, mode: field(data.source, 'mode'), pages: data.pages, sourceId: 32, version: 'Offertoriale 1935', usage: 'Offertorium',
        sourceHash: data.sourceHash, openingHash: data.openingHash, transcriber: "Benjamin Bloomfield (w/ ChatGPT)", ready: data.ready, openingProvenance: data.openingProvenance, publishedUrl: data.publishedUrl, gregobaseId: data.gregobaseId };
    });
    atomic(path.join(this.base, 'publication/manifest.json'), JSON.stringify(list, null, 2) + '\n');
    return { directory: out, chants: list };
  }
}
module.exports = { ReviewStore, body, removeRhythm, noteSpan, hash, atomic };
