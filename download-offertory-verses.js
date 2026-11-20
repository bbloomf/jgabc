// Download only the verse portions of the 1935 Offertoriale. No opening
// antiphons are written: each result links to existing gabc/<localId>.gabc files.
const fs = require('fs');
const path = require('path');
const https = require('https');
const { parse, lyrics, normalize, splitVerses, psalmVerseText } = require('./offertory-verses.js');
const manifest = require('./data/offertory-verses/sources.json');
const simple = require('./data/offertory-verses/simple.json');
const manual = require('./data/offertory-verses/manual.json');
const root = __dirname;
const { normalizeGabcLatin, normalizeLatinLyrics } = require('./gabc-latin-normalization');
const { accentLatinWord } = require('./gabc-latin-accents');

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
  // accent. Restore it from the same word where it is sung again, or as any other missing accent is.
  const first = words[0][0] + words[0].slice(1).toLowerCase();
  const accented = !accent.test(first) && (lyrics(parsed.antiphon + ' ' + parsed.gabc).match(word) || [])
    .find(other => accent.test(other) && normalize(other) === normalize(first));
  return normalizeLatinLyrics((accented ? first[0] + accented.slice(1) : accentLatinWord(first)) + ' ' + accentLatinWord(words[1]) + '.');
}
// What the opening offertory of an Offertoriale score has to share with the local offertory its verses are sung
// with: the words, and the first and last note. A note is counted in steps above the do of a C clef, so that the
// same melody under another clef compares equal; the fa of an F clef is the one above that do, as Gregorio and
// Exsurge write the two kinds of clef. Everything after the first double bar is left out.
function antiphonSummary(body) {
  const end = /\([^)]*::[^)]*\)/.exec(body);
  if (end) body = body.slice(0, end.index);
  let clef, firstPitch, lastPitch;
  for (const group of body.matchAll(/\(([^)]*)\)/g)) {
    const notes = group[1].replace(/\[[^\]]*\]|\|.*$/g, '');
    for (const token of notes.matchAll(/([cf])b?([1-4])|[a-mA-M][xy#+]|([a-mA-M])/g)) {
      if (token[1]) clef = token;
      else if (token[3] && clef) {
        lastPitch = token[3].toLowerCase().charCodeAt(0) - 2 * clef[2] + (clef[1] == 'f' ? 3 : 0) - 98;
        if (firstPitch === undefined) firstPitch = lastPitch;
      }
    }
  }
  return { text: lyrics(body), firstPitch, lastPitch };
}
// The seasonal Alleluia at the end is in some local offertories and not in others that use the same verses.
function sameAntiphon(a, b) {
  const words = summary => normalize(summary.text).replace(/(alleluia)+$/, '');
  return words(a) === words(b) && a.firstPitch === b.firstPitch && a.lastPitch === b.lastPitch;
}
function headerField(gabc, field) {
  return ((new RegExp('^' + field + ':\\s*([^;]+);', 'm')).exec(gabc) || [])[1];
}
// The header of a verse-only score.
function verseHeader(entry, mode, url, transcriber) {
  return `name: ${entry.name} — verses;\noffice-part: Offertorium;\nmode: ${mode};\ninitial-style: 0;\nbook: Offertoriale Sive Versus Offertoriorum Cantus Gregoriani, 1935, p. ${entry.page};\nsource: ${url};\n${transcriber ? 'transcriber: ' + transcriber + ';\n' : ''}%%\n`;
}
const downloadUrl = id => `https://gregobase.selapa.net/download.php?format=gabc&elem=1&id=${id}`;

async function main() {
  const args = process.argv.slice(2);
  const cacheAt = args.indexOf('--cache-dir');
  if (args.length && (args.length !== 2 || cacheAt !== 0)) throw new Error('Usage: node download-offertory-verses.js [--cache-dir DIRECTORY]');
  const cacheDir = cacheAt >= 0 ? args[cacheAt + 1] : null;
  if (cacheAt >= 0 && !cacheDir) throw new Error('--cache-dir needs a directory');
  const output = path.join(root, 'gabc/offertory-verses');
  const full = {}, fullById = {}, simpleById = {}, antiphons = {}, differing = [];
  const pending = [], normalizationIssues = [];
  const appScore = (source, id) => { const issues=[]; const result=normalizeGabcLatin(source, issues); normalizationIssues.push(...issues.map(issue=>({id,...issue}))); return result; };
  // One score of the Offertoriale: what the browser's index needs to know of it, its verse-only file, and the local
  // offertories its verses are sung with. key is the score's name in the index and in gabc/offertory-verses/.
  const add = async (key, gregobaseId, entry, index) => {
    const cacheFile = cacheDir && path.join(cacheDir, gregobaseId + '.gabc'), url = downloadUrl(gregobaseId);
    const source = cacheFile && fs.existsSync(cacheFile) ? fs.readFileSync(cacheFile, 'utf8') : await fetchText(url);
    if (!source.trim()) throw new Error(`Empty download for ${key}`);
    const parsed = parse(source), mode = headerField(source, 'mode');
    if (!/^[1-8]$/.test(mode)) throw new Error(`Invalid mode: ${key}`);
    const verseParts = splitVerses(normalizeGabcLatin('(' + parsed.clef + ') ' + parsed.gabc));
    if (entry.verseCount && verseParts.length !== entry.verseCount) throw new Error(`Wrong verse count: ${key}`);
    full[key] = index(parsed, verseParts);
    const antiphon = antiphons[key] = antiphonSummary(parsed.antiphon);
    for (const id of entry.localIds) {
      const local = fs.readFileSync(path.join(root, 'gabc', id + '.gabc'), 'utf8');
      if (headerField(local, 'office-part') !== 'Offertorium' || headerField(local, 'mode') !== mode) throw new Error(`Wrong part/mode: ${key} -> ${id}`);
      if (fullById[id]) throw new Error(`Duplicate local ID: ${id}`);
      fullById[id] = key;
      if (!sameAntiphon(antiphon, antiphonSummary(firstAntiphon(local)))) differing.push(`The offertory of ${key} differs from gabc/${id}.gabc in its words or in its first or last note.`);
    }
    const header = verseHeader(entry, mode, url, headerField(source, 'transcriber'));
    pending.push([path.join(output, key + '.gabc'), appScore(header + '(' + parsed.clef + ') ' + parsed.gabc.replace(/\r/g, '') + '\n', key)]);
  };
  // Complete parsing and validation before replacing any repository files.
  for (const entry of manifest.chants) await add(entry.id, entry.id, entry, (parsed, verseParts) => {
    const cue = primaryCue(parsed.antiphon);
    return { name: entry.name, page: entry.page, cue: cue, verseCount: verseParts.length,
      psalmVerses: verseParts.map(verse => ({ text: psalmVerseText(verse.gabc), cue: cue || incipitCue(parsed, entry.name) })) };
  });
  // The settings that were transcribed for this project and then published on GregoBase keep their manual-NNN keys
  // (NNN is their number in the book). manual.json has their GregoBase IDs and the returns and selections that are
  // not in the score.
  for (const entry of manual.chants) {
    if (!/^manual-\d{3}$/.test(entry.id)) throw new Error(`Invalid manual key: ${entry.id}`);
    if (!Number.isSafeInteger(entry.gregobaseId) || entry.gregobaseId < 1) throw new Error(`Invalid GregoBase ID: ${entry.id}`);
    await add(entry.id, entry.gregobaseId, entry, (parsed, verseParts) => ({ name: entry.name, page: entry.page, cue: entry.cue,
      gregobaseId: entry.gregobaseId, verseCount: verseParts.length,
      ...(entry.selectionCues ? { selectionCues: entry.selectionCues } : {}),
      ...(entry.verseSelections ? { verseSelections: entry.verseSelections, verseSelectionLabels: entry.verseSelectionLabels } : {}),
      ...(entry.cueOccurrences ? { cueOccurrences: entry.cueOccurrences } : {}),
      psalmVerses: verseParts.map((verse, index) => ({ text: psalmVerseText(verse.gabc), cue: (entry.psalmVerseCues || [])[index] || entry.cue,
        ...(entry.cueOccurrences && entry.cueOccurrences[normalize((entry.psalmVerseCues || [])[index] || entry.cue)] ?
          { occurrence: entry.cueOccurrences[normalize((entry.psalmVerseCues || [])[index] || entry.cue)] } : {}) })) }));
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
  fs.writeFileSync(path.join(root, 'data/offertory-verses/antiphons.json'), JSON.stringify(antiphons, null, 2) + '\n');
  fs.writeFileSync(path.join(root, 'data/offertory-verses/normalization-audit.json'), JSON.stringify(normalizationIssues, null, 2) + '\n');
  differing.forEach(message => console.warn(message));
  if (normalizationIssues.length) console.warn(`${normalizationIssues.length} words need review of their syllables or accent; they are kept as the source has them. See data/offertory-verses/normalization-audit.json.`);
  console.log(`Saved ${pending.length} verse-only scores (${Object.keys(fullById).length} existing antiphons) and ${simple.length} simple settings.`);
}
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { firstAntiphon, antiphonSummary, sameAntiphon };
