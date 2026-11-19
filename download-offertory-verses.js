// Download only the verse portions of the 1935 Offertoriale. No opening
// antiphons are written: each result links to existing gabc/<localId>.gabc files.
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const { parse, lyrics, normalize, splitVerses, psalmVerseText } = require('./offertory-verses.js');
const manifest = require('./data/offertory-verses/sources.json');
const simple = require('./data/offertory-verses/simple.json');
const manual = require('./data/offertory-verses/manual.json');
const root = __dirname;
const { normalizeGabcLatin, normalizeLatinLyrics } = require('./gabc-latin-normalization');

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        if (redirects >= 5) return reject(new Error('Too many redirects'));
        return resolve(fetchText(new URL(response.headers.location, url).href, redirects + 1));
      }
      if (response.statusCode !== 200) { response.resume(); return reject(new Error(`HTTP ${response.statusCode}: ${url}`)); }
      response.setEncoding('utf8');
      let content = '';
      response.on('data', chunk => content += chunk);
      response.on('end', () => resolve(content));
      response.on('error', reject);
    });
    request.setTimeout(30000, () => request.destroy(new Error(`Timed out: ${url}`)));
    request.on('error', reject);
  });
}

function firstAntiphon(gabc) {
  const body = gabc.slice(gabc.lastIndexOf('%%') + 2);
  const end = /\([^)]*::[^)]*\)/.exec(body);
  if (!end) throw new Error('Antiphon has no final double bar');
  return body.slice(0, end.index + end[0].length);
}

// A pitch comparison deliberately ignores rhythmic signs, bar placement and
// neume grouping. It flags differences for review; it never silently changes music.
function pitches(body) {
  return [...body.matchAll(/\(([^)]*)\)/g)].flatMap(match => {
    const notes = match[1].replace(/\[[^\]]*\]/g, '')
      .replace(/[a-m]x|\{[^}]*\}/gi, '')
      .replace(/([a-m])([vs])\2+/gi, (whole, pitch, shape) => pitch.repeat(whole.length - 1));
    if (/^[cf]b?[1-4]$/.test(notes) || /::/.test(notes)) return [];
    return (notes.match(/[a-m]/gi) || []).map(p => p.toLowerCase());
  }).join('');
}
function primaryCue(antiphon) {
  const body = antiphon.replace(/<sp>\*<\/sp>/g, '*');
  const marker = body.indexOf('*');
  if (marker < 0) return null;
  return lyrics(body.slice(marker + 1)).replace(/^[^\p{L}]+/u, '')
    .split(/\s+/).slice(0, 3).join(' ').replace(/[,;:.!?]+$/, '');
}
// With no star in the source the return is to the beginning. Cue it by the
// opening words as the source spells them, rather than by the unaccented title.
function incipitCue(parsed, name) {
  const word = /[\p{L}́]+/gu, accent = /[áéíóúýǽ́]/;
  const words = lyrics(parsed.antiphon).match(word) || [];
  if (words.length < 2) return name.split(' ').slice(0, 2).join(' ') + '.';
  // The enlarged initial capitalizes the second letter too, which costs it its
  // accent. Restore it from the same word where it is sung again.
  const first = words[0][0] + words[0].slice(1).toLowerCase();
  const accented = !accent.test(first) && (lyrics(parsed.antiphon + ' ' + parsed.gabc).match(word) || [])
    .find(other => accent.test(other) && normalize(other) === normalize(first));
  return normalizeLatinLyrics((accented ? first[0] + accented.slice(1) : first) + ' ' + words[1] + '.');
}
function headerField(gabc, field) {
  return ((new RegExp('^' + field + ':\\s*([^;]+);', 'm')).exec(gabc) || [])[1];
}
// Imported and published manual verses share one header for their verse-only scores.
function verseHeader(entry, mode, url, transcriber) {
  return `name: ${entry.name} — verses;\noffice-part: Offertorium;\nmode: ${mode};\ninitial-style: 0;\nbook: Offertoriale Sive Versus Offertoriorum Cantus Gregoriani, 1935, p. ${entry.page};\nsource: ${url};\n${transcriber ? 'transcriber: ' + transcriber + ';\n' : ''}%%\n`;
}

// A changed download must never silently inherit an earlier manual review.
function bodyHash(body) {
  return crypto.createHash('sha256').update(body.replace(/\r\n?/g, '\n').trim()).digest('hex');
}
function verseReviewStatus(entry, parsed) {
  return entry.review === 'verified' && entry.verseReview &&
    entry.verseReview.sha256 === bodyHash(parsed.clef + '\n' + parsed.gabc) ? 'verified' : 'pending';
}
function antiphonReviewStatus(entry, id, source, local) {
  const review = entry.antiphonReviews && entry.antiphonReviews[id];
  if (!review) return null;
  const unchanged = review.sourceSha256 === bodyHash(source) && review.localSha256 === bodyHash(local);
  return { ...review, status: unchanged ? review.status : 'needs-review' };
}

function readManual(entry, sourceRoot = root) {
  if (!/^manual-\d{3}$/.test(entry.id)) throw new Error(`Invalid manual key: ${entry.id}`);
  const source = fs.readFileSync(path.join(sourceRoot, 'data/offertory-verses/manual', entry.id + '.gabc'), 'utf8');
  const body = source.slice(source.lastIndexOf('%%') + 2).trim();
  const match = /^\(([cf]b?[1-4])\)\s+(<sp>V\/<\/sp>[\s\S]*)$/.exec(body);
  if (!match || !/\([^)]*::[^)]*\)/.test(body)) throw new Error(`Invalid manual verse score: ${entry.id}`);
  return { source, parsed: { clef: match[1], gabc: match[2] } };
}

// The review record is also the download registration: saving or clearing an ID
// takes effect on the next import, without duplicating the manual/local mappings.
async function loadManualSource(entry, { sourceRoot = root, cacheDir = null, fetch = fetchText } = {}) {
  const file = path.join(sourceRoot, 'data/offertory-verses/publication/review-state.json');
  const saved = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8'))[entry.id] || {} : {};
  const id = saved.gregobaseId || (/^https:\/\/gregobase\.selapa\.net\/chant\.php\?id=([1-9]\d*)$/.exec(saved.publishedUrl || '') || [])[1];
  if (!id) return { ...readManual(entry, sourceRoot), provenance: 'manual' };
  if (!/^[1-9]\d*$/.test(String(id)) || !Number.isSafeInteger(Number(id))) throw new Error(`Invalid registered GregoBase ID: ${entry.id}`);
  const url = `https://gregobase.selapa.net/download.php?format=gabc&elem=1&id=${id}`;
  const cached = cacheDir && path.join(cacheDir, id + '.gabc');
  const downloaded = cached && fs.existsSync(cached) ? fs.readFileSync(cached, 'utf8') : await fetch(url);
  const parsed = parse(downloaded), mode = headerField(downloaded, 'mode');
  const local = readManual(entry, sourceRoot);
  if (mode !== headerField(local.source, 'mode')) throw new Error(`Wrong downloaded mode: ${entry.id} -> ${id}`);
  if (splitVerses('(' + parsed.clef + ') ' + parsed.gabc).length !== entry.verseCount) throw new Error(`Wrong downloaded verse count: ${entry.id} -> ${id}`);
  const source = verseHeader(entry, mode, url, headerField(downloaded, 'transcriber')) + `(${parsed.clef}) ${parsed.gabc.replace(/\r/g, '')}\n`;
  const proofread = saved.verseHash === crypto.createHash('sha256').update(local.source).digest('hex') &&
    bodyHash(parsed.clef + '\n' + parsed.gabc) === bodyHash(local.parsed.clef + '\n' + local.parsed.gabc);
  return { source, parsed, provenance: 'gregobase', gregobaseId: Number(id), proofread };
}

async function main() {
  const args = process.argv.slice(2);
  const cacheAt = args.indexOf('--cache-dir');
  if (args.length && (args.length !== 2 || cacheAt !== 0)) throw new Error('Usage: node download-offertory-verses.js [--cache-dir DIRECTORY]');
  const cacheDir = cacheAt >= 0 ? args[cacheAt + 1] : null;
  if (cacheAt >= 0 && !cacheDir) throw new Error('--cache-dir needs a directory');
  const output = path.join(root, 'gabc/offertory-verses');
  const full = {}, fullById = {}, simpleById = {}, audit = [];
  const pending = [], normalizationIssues = [];
  const appScore = (source, id) => { const issues=[]; const result=normalizeGabcLatin(source, issues); normalizationIssues.push(...issues.map(issue=>({id,...issue}))); return result; };
  // Complete parsing and validation before replacing any repository files.
  for (const entry of manifest.chants) {
    const cacheFile = cacheDir && path.join(cacheDir, entry.id + '.gabc');
    const url = `https://gregobase.selapa.net/download.php?format=gabc&elem=1&id=${entry.id}`;
    const source = cacheFile && fs.existsSync(cacheFile) ? fs.readFileSync(cacheFile, 'utf8') : await fetchText(url);
    if (!source.trim()) throw new Error(`Empty download for ${entry.id}`);
    const parsed = parse(source);
    const cue = primaryCue(parsed.antiphon);
    const review = verseReviewStatus(entry, parsed);
    const mode = headerField(source, 'mode');
    if (!/^[1-8]$/.test(mode)) throw new Error(`Invalid mode: ${entry.id}`);
    const verseParts = splitVerses(normalizeGabcLatin('(' + parsed.clef + ') ' + parsed.gabc));
    full[entry.id] = { name: entry.name, page: entry.page, cue: cue, review: review,
      verseCount: verseParts.length, psalmVerses: verseParts.map(verse => ({ text: psalmVerseText(verse.gabc), cue: cue || incipitCue(parsed, entry.name) })) };
    for (const id of entry.localIds) {
      const local = fs.readFileSync(path.join(root, 'gabc', id + '.gabc'), 'utf8');
      if (headerField(local, 'office-part') !== 'Offertorium' || headerField(local, 'mode') !== mode) throw new Error(`Wrong part/mode: ${entry.id} -> ${id}`);
      if (fullById[id]) throw new Error(`Duplicate local ID: ${id}`);
      fullById[id] = entry.id;
      const antiphon = firstAntiphon(local);
      audit.push({ sourceId: entry.id, localId: id, name: entry.name, page: entry.page,
        textMatches: normalize(lyrics(antiphon)) === normalize(lyrics(parsed.antiphon)),
        pitchesMatch: pitches(antiphon) === pitches(parsed.antiphon), review: review,
        antiphonReview: antiphonReviewStatus(entry, id, parsed.antiphon, antiphon) });
    }
    const header = verseHeader(entry, mode, url, headerField(source, 'transcriber'));
    pending.push([path.join(output, entry.id + '.gabc'), appScore(header + '(' + parsed.clef + ') ' + parsed.gabc.replace(/\r/g, '') + '\n', entry.id)]);
  }
  // Published manual settings download from their saved GregoBase IDs.
  // Retain stable manual keys, editorial cues and the original local sources.
  for (const entry of manual.chants) {
    const { source, parsed, provenance, gregobaseId, proofread } = await loadManualSource(entry, { cacheDir });
    const review = proofread ? 'verified' : verseReviewStatus(entry, parsed);
    const verseParts = splitVerses(normalizeGabcLatin('(' + parsed.clef + ') ' + parsed.gabc));
    if (verseParts.length !== entry.verseCount) throw new Error(`Wrong manual verse count: ${entry.id}`);
    full[entry.id] = { name: entry.name, page: entry.page, cue: entry.cue, review,
      provenance, ...(gregobaseId ? { gregobaseId } : {}), verseCount: verseParts.length,
      ...(entry.selectionCues ? { selectionCues: entry.selectionCues } : {}),
      ...(entry.verseSelections ? { verseSelections: entry.verseSelections, verseSelectionLabels: entry.verseSelectionLabels } : {}),
      ...(entry.cueOccurrences ? { cueOccurrences: entry.cueOccurrences } : {}),
      psalmVerses: verseParts.map((verse, index) => ({ text: psalmVerseText(verse.gabc), cue: (entry.psalmVerseCues || [])[index] || entry.cue,
        ...(entry.cueOccurrences && entry.cueOccurrences[normalize((entry.psalmVerseCues || [])[index] || entry.cue)] ?
          { occurrence: entry.cueOccurrences[normalize((entry.psalmVerseCues || [])[index] || entry.cue)] } : {}) })) };
    for (const id of entry.localIds) {
      const local = fs.readFileSync(path.join(root, 'gabc', id + '.gabc'), 'utf8');
      if (headerField(local, 'office-part') !== 'Offertorium' || headerField(local, 'mode') !== headerField(source, 'mode')) throw new Error(`Wrong manual part/mode: ${entry.id} -> ${id}`);
      if (fullById[id]) throw new Error(`Duplicate local ID: ${id}`);
      fullById[id] = entry.id;
      const recorded = entry.antiphonReviews && entry.antiphonReviews[id];
      const antiphon = firstAntiphon(local);
      audit.push({ sourceId: entry.id, provenance, ...(gregobaseId ? { gregobaseId,
        textMatches: normalize(lyrics(antiphon)) === normalize(lyrics(parsed.antiphon)),
        pitchesMatch: pitches(antiphon) === pitches(parsed.antiphon) } : {}), localId: id, name: entry.name, page: entry.page,
        review, antiphonReview: gregobaseId ? antiphonReviewStatus(entry, id, parsed.antiphon, antiphon) : recorded ? { ...recorded,
          status: recorded.localSha256 === bodyHash(antiphon) &&
            recorded.sourcePdfSha256 === manual.sourceSha256 ? recorded.status : 'needs-review' } : null });
    }
    pending.push([path.join(output, entry.id + '.gabc'), appScore(source.replace(/\r/g, ''), entry.id)]);
  }
  simple.forEach((entry, i) => entry.localIds.forEach(id => {
    if (simpleById[id] !== undefined) throw new Error(`Duplicate simple verse: ${id}`);
    simpleById[id] = i;
  }));
  const data = { fullById, full, simpleById, simple };
  const js = '// Generated by download-offertory-verses.js; edit data/offertory-verses/ instead.\nvar offertoryVerses = ' + JSON.stringify(data, null, 2) + ';\nif(typeof module === "object" && module.exports) module.exports = offertoryVerses;\n';
  fs.mkdirSync(output, { recursive: true });
  pending.forEach(([file, content]) => fs.writeFileSync(file, content));
  fs.writeFileSync(path.join(root, 'offertory-verses-data.js'), js);
  fs.writeFileSync(path.join(root, 'data/offertory-verses/antiphon-audit.json'), JSON.stringify(audit, null, 2) + '\n');
  fs.writeFileSync(path.join(root, 'data/offertory-verses/normalization-audit.json'), JSON.stringify(normalizationIssues, null, 2) + '\n');
  if (normalizationIssues.length) console.warn(`${normalizationIssues.length} words need syllabification review; notation retained unchanged. See data/offertory-verses/normalization-audit.json.`);
  console.log(`Saved ${pending.length} verse-only scores (${Object.keys(fullById).length} existing antiphons) and ${simple.length} simple settings.`);
  const flagged = audit.filter(row => row.provenance !== 'manual' && (!row.textMatches || !row.pitchesMatch));
  const unresolved = flagged.filter(row => !row.antiphonReview || row.antiphonReview.status !== 'resolved');
  console.log(`${flagged.length} flagged antiphon settings: ${unresolved.length} unresolved; see data/offertory-verses/antiphon-audit.json.`);
  const verified = Object.values(full).filter(entry => entry.review === 'verified').length;
  console.log(`PDF verse review: ${verified} verified, ${pending.length - verified} pending.`);
}
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { fetchText, firstAntiphon, pitches, primaryCue, bodyHash, verseReviewStatus, antiphonReviewStatus, readManual, loadManualSource };
