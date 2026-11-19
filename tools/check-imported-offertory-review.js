// Read-only integrity check for the imported-source review ledger.
// Does not download, regenerate application files, or touch publication records.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { parse } = require('../offertory-verses');
const { bodyHash, firstAntiphon, verseReviewStatus, antiphonReviewStatus, pitches } = require('../download-offertory-verses');
const { normalizeGabcLatin } = require('../gabc-latin-normalization');
const { applyReviewedSourceCorrections } = require('./offertory-source-corrections');
const root = path.resolve(__dirname, '..');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
// Historical ledgers retain their original filenames and hashes. Resolve moved
// publication fixtures without rewriting those immutable evidence records.
const read = file => fs.readFileSync(path.join(root, file
  .replace(/^data\/offertory-verses\/publication\/downloads\//, 'tests/fixtures/offertory/published/')
  .replace(/^data\/offertory-verses\/publication\/proofread-baseline\.json$/, 'tests/fixtures/offertory/proofread-baseline.json')));
const manifest = JSON.parse(read('data/offertory-verses/sources.json'));
const reviewRoot = 'data/offertory-verses/imported-review';
if (!fs.existsSync(path.join(root, reviewRoot))) {
  console.error('The optional local review archive is missing: ' + reviewRoot + '. Restore it from your archive to run this evidence check; ordinary tests use tests/fixtures/offertory/.');
  process.exit(1);
}
const batches = fs.readdirSync(path.join(root, reviewRoot)).filter(name => /^batch-\d+$/.test(name)).sort();
const sessionCompletion = reviewRoot + '/session-batches/completed.json';
if (fs.existsSync(path.join(root, sessionCompletion))) {
  batches.push(...JSON.parse(read(sessionCompletion)).batches.map(number => 'session-batches/batch-' + number));
}
const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); };
let batchSettings = 0;
for (const batch of batches) {
  const base = reviewRoot + '/' + batch;
  const ledger = JSON.parse(read(base + '/review.json'));
  check(hash(read('Offertoriale cum versiculis.pdf')) === ledger.sourcePdfSha256, 'Source PDF changed');
  for (const record of ledger.chants) {
    ++batchSettings;
    const entry = manifest.chants.find(entry => entry.id === record.id);
    const raw = read(base + '/raw/' + record.id + '.gabc');
    const parsed = parse(raw.toString());
    check(hash(raw) === record.rawFileSha256, record.id + ': raw snapshot changed');
    check(bodyHash(parsed.clef + '\n' + parsed.gabc) === record.verseBodySha256, record.id + ': verse body changed');
    const waitingForCorrection = record.status === 'correction-ready';
    const correctedSource = record.correctedVerseBodySha256 ? applyReviewedSourceCorrections(raw.toString(), record.id) : raw.toString();
    const correctedParsed = parse(correctedSource);
    if (record.upstreamVerification) {
      const upstream = read(base + '/' + record.upstreamVerification.file);
      const upstreamParsed = parse(upstream.toString());
      const upstreamHash = bodyHash(upstreamParsed.clef + '\n' + upstreamParsed.gabc);
      const spacing = record.upstreamVerification.spacingReplacement;
      if (spacing) check(correctedSource.split(spacing.from).length === 2,
        record.id + ': upstream spacing comparison is ambiguous');
      const expectedUpstream = parse(spacing ? correctedSource.replace(spacing.from, spacing.to) : correctedSource);
      check(hash(upstream) === record.upstreamVerification.sha256, record.id + ': upstream evidence changed');
      check(upstreamHash === record.upstreamVerification.verseBodySha256 && upstreamHash === bodyHash(expectedUpstream.clef + '\n' + expectedUpstream.gabc),
        record.id + ': upstream correction differs from reviewed body');
    }
    if (record.correctedVerseBodySha256) check(bodyHash(correctedParsed.clef + '\n' + correctedParsed.gabc) === record.correctedVerseBodySha256,
      record.id + ': corrected body differs from reviewed correction');
    if (record.correctedVerseFile) {
      const preview = read(base + '/' + record.correctedVerseFile.file);
      check(hash(preview) === record.correctedVerseFile.sha256, record.id + ': corrected preview changed');
      const previewParsed = parse(preview.toString());
      check(bodyHash(previewParsed.clef + '\n' + previewParsed.gabc) === record.correctedVerseBodySha256,
        record.id + ': corrected preview body differs from reviewed correction');
    }
    const effectiveParsed = waitingForCorrection ? parsed : correctedParsed;
    check(verseReviewStatus(entry, effectiveParsed) === (waitingForCorrection ? 'pending' : 'verified'), record.id + ': manifest review is stale');
    const app = read('gabc/offertory-verses/' + record.id + '.gabc');
    check(hash(app) === record.applicationFileSha256, record.id + ': application copy changed since review');
    const expected = normalizeGabcLatin('(' + effectiveParsed.clef + ') ' + effectiveParsed.gabc.replace(/\r/g, '')).trim();
    const actual = app.toString().slice(app.toString().lastIndexOf('%%') + 2).trim();
    check(expected === actual, record.id + ': application copy differs from normalized source');
    for (const opening of record.openings) {
      const local = firstAntiphon(read('gabc/' + opening.localId + '.gabc').toString());
      check(bodyHash(local) === opening.localBodySha256, record.id + ': local opening changed');
      check(bodyHash(parsed.antiphon) === opening.sourceBodySha256, record.id + ': source opening changed');
      const pitchMatch = pitches(local) === pitches(parsed.antiphon);
      check(pitchMatch === (opening.pitchesMatch ?? true), record.id + ': opening pitch comparison changed');
      // Some retained local openings correct a source error or add a seasonal
      // Alleluia. A recorded mismatch requires its own current hashed resolution.
      if (!pitchMatch) check(antiphonReviewStatus(entry, opening.localId, parsed.antiphon, local)?.status === 'resolved',
        record.id + ': opening pitch mismatch lacks a current resolution');
    }
    for (const strip of record.evidence) check(hash(read(base + '/' + (strip.directory || record.evidenceDirectory || 'evidence') + '/' + strip.file)) === strip.sha256, strip.file + ': evidence changed');
    const excludedBars = [...(record.structuralBars || []), ...(record.unprintedBars || [])];
    const rawGroups = [...parsed.gabc.matchAll(/\(([^)]*)\)/g)];
    for (const bar of excludedBars) check(rawGroups[bar.rawNotationGroup - 1]?.[1] === bar.token,
      record.id + ': excluded source bar differs from ledger');
    const structuralGroups = new Set(excludedBars.map(bar => bar.rawNotationGroup));
    const inlineBars = new Map((record.inlineBars || []).map(bar => [bar.rawNotationGroup, bar.bars]));
    for (const bar of record.inlineBars || []) {
      check(rawGroups[bar.rawNotationGroup - 1]?.[1] === bar.token,
        record.id + ': inline bar notation differs from ledger');
      check(JSON.stringify(bar.token.match(/::|[,;:]/g) || []) === JSON.stringify(bar.bars),
        record.id + ': inline bar tokens differ from ledger');
    }
    let sourceBars = [...parsed.gabc.matchAll(/\(([^)]*)\)/g)]
      .flatMap((match, index) => {
        if (structuralGroups.has(index + 1)) return [];
        if (inlineBars.has(index + 1)) return inlineBars.get(index + 1);
        const notes = match[1];
        return /^[,;:]+$/.test(notes) || /^(?:z0)?::[cf]b?[1-4]$/.test(notes)
          ? [notes.match(/::|[,;:]/)[0]] : [];
      });
    if (record.physicalBarsFromCorrectedSource) {
      check(Boolean(record.correctedVerseBodySha256), record.id + ': corrected bar comparison requires a guarded correction');
      check(excludedBars.length === 0, record.id + ': corrected bar comparison needs explicit handling of excluded bars');
      sourceBars = [...correctedParsed.gabc.matchAll(/\(([^)]*)\)/g)]
        .flatMap(match => match[1].replace(/\[[^\]]*\]/g, '').match(/::|[,;:]/g) || []);
    }
    const recordedBars = record.evidence.filter(strip => strip.type !== 'detail').flatMap(strip => strip.bars);
    check(JSON.stringify(sourceBars) === JSON.stringify(recordedBars), record.id + ': ordered source bars differ from physical-bar ledger');
  }
}
const protectedFiles = JSON.parse(read(reviewRoot + '/batch-1/protected-files.json'));
for (const [file, sha256] of Object.entries(protectedFiles)) check(hash(read(file)) === sha256, file + ': protected file changed since batch snapshot');
const reviewed = manifest.chants.filter(entry => entry.review === 'verified').length;
console.log(`Imported manifest: ${manifest.chants.length} settings; ${reviewed} reviewed, ${manifest.chants.length - reviewed} pending.`);
console.log(`Batches: ${batches.length}; ${batchSettings} settings; ${Object.keys(protectedFiles).length} protected manual/publication files checked.`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Source, review, evidence, application copies and protected files match recorded hashes.');
