# Offertory verses

## Repository layout and local archives

Keep this directory's maintained inputs in Git: `sources.json`, `simple.json`,
`manual.json`, `manual/`, `corrections.json`, `system-alignment.json`, and
`publication/review-state.json` (saved GregoBase IDs and exact proofreading
checks). The review notes and alignment instructions remain available here.

Permanent regression fixtures now live in
[`tests/fixtures/offertory/`](../../../tests/fixtures/offertory/README.md): accepted
proofread baselines, extracted published downloads, correction source examples,
and historical batch review/render records. Historical prose elsewhere may use
their old paths; consult that fixture directory for the relocated records.

The large `imported-review/`, dated feature/playback reports, and
`publication/history/` are local working archives excluded by `.gitignore`.
They have been preserved on disk. Back them up separately if you need their
source images, original review evidence or saved editing history. The optional
`node tools/check-imported-offertory-review.js` checks that local evidence and
requires the archive and source PDF; ordinary regression tests do not require
the working archive. The correction ledger is maintained outside the archive.

Comparison HTML, scan crops/crop reports, upload GABC/manifest/ZIP files, and
`antiphon-audit.json`/`normalization-audit.json` are reproducible outputs and are
ignored. Export commands and the downloader regenerate their respective files.
Generated browser-test inputs remain retained for now, as requested.

### Cordova branch

The Cordova app needs the runtime files under `www/`:

- `offertory-verses.js`, `offertory-verses-data.js`, and `gabc/offertory-verses/`;
- the related `propers.html`, `propers.js`, `propers.css` and `util.js` changes;
- the matching `exsurge.min.js` renderer and the existing chant/font assets.

No file in `data/` is read by the running app. Keep download inputs and tools
outside `www/` if you want to regenerate chants on that branch. Tests and their
fixtures are development files and also belong outside `www/`. The proofreading
UI/server, source PDFs and working archives are not required in the app bundle.
`config.xml` on the Cordova branch starts `www/propers.html`; the existing merge
workflow relies on rename detection to put web assets under `www/`. Verify the
new runtime files land there when merging; newly added files may need moving.
These branch notes do not modify or build the Cordova branch.

`npm run download-offertory-verses` downloads the selected GregoBase scores from
[source 32](https://gregobase.selapa.net/source.php?id=32). It writes only the
verses, their clefs, and the responses/cues printed with them to
`gabc/offertory-verses/`. The opening offertory is never copied: the browser
continues to load `gabc/<existing ID>.gabc`.

Application copies use the same Latin ligature spelling as the regular chant
downloader: `ae` → `æ`, `oe` → `œ`, and their accented/capital variants,
including Gregorio special-character spellings. Syllable boundaries use the
same local Hypher Latin patterns as the regular downloader, along with its
consonantal i-to-j rules (preserving Alleluia and eia) and removal of acute
accents on disyllabic words. Resyllabification retains all note groups in
order and only proceeds when their syllable count matches the expected count.
Words with a mismatch remain unchanged and are listed in
`normalization-audit.json` for source review. These rules are shared in
`gabc-latin-normalization.js` and `gabc-latin-syllables.js`, and apply only to lyrics, never pitch groups or
headers. Verse extraction and exact-body review/comparison checks use the raw
source first. Authoritative manual files, GregoBase submission text, and saved
raw download comparisons retain source spelling. Saving a correction likewise
normalizes only the app copy and its psalm-tone text.

All 23 manual settings are now registered to GregoBase IDs 21011–21033.
The 2026-11-18 download pass matches every extracted raw verse body to the
user's proofread local source (line endings/surrounding whitespace excluded).
`../../../tests/fixtures/offertory/published/comparison.json` records exact hashes, application
provenance and 69 real browser render checks, covering each set in full,
psalm-toned-verse and completely psalm-toned configurations. The existing local
keys, antiphon links, selection cues and Elegerunt alternative are retained.
User proofreading of a published set transfers to the generated index only
when the recorded local file hash and the downloaded raw verse body still
match; source spelling remains independent of app normalization.

Regression expectations for the completed proofreading are recorded in
`../../../tests/fixtures/offertory/proofread-baseline.json`: exact source/verse hashes and the current
ordered bar tokens. The tests check this accepted baseline against the source
files and app copies. Earlier batch measurements and renderer reports remain
unchanged historical records; their hashes are checked against each other,
not asserted to describe later corrected files. Lauda anima's final reference
panel was refreshed from GregoBase after its closing double bar was added.

The importer also regenerates `offertory-verses-data.js` (the browser's index)
and `antiphon-audit.json`. Run from any directory; paths resolve relative to the
script. To repeat an import without downloading again:

```sh
node download-offertory-verses.js --cache-dir /path/to/downloaded/scores
```

`sources.json` records the selected IDs, printed pages, existing antiphon IDs,
and decisions about duplicates. Use the versions without added rhythmic signs
for Ave Maria, Vir erat, and De profundis, matching the Vatican notation of the
1935 volume. These added signs are rhythmic markings such as the ictus,
episema, and mora; they are distinct from manuscript neumes. Gressus meos 18153
keeps the c4 clef of the existing antiphon. Portas caeli 20496 and 20497 have
identical downloaded bodies. Stetit Angelus 19896, with manuscript neumes, is
excluded. Scapulis suis is listed twice in the source index with the same ID.

`simple.json` contains all 63 settings from Richard Rice's *Simple Offertory
Verses* (2008), including its accented text, verse divisions, repeat cues, and
printed page numbers. These settings use the Introit tone. They generally use
one verse, with editorial selections/shortenings in several cases; they must
not be generated by blindly taking the first GregoBase verse. `*` marks a major
verse division and `†` a flex. The long Sanctificavit retains its four musical
phrases and uses the printed option of returning to the original Fecit instead
of the alternative musical transition. Reges Tharsis and Angelus Domini likewise
use the permitted original respond. The optional textual repetition in Jubilate
Deo universa is retained. The misspelling "possesiónem" in the Postula cue is
corrected to "possessiónem".

The offertory style dropdown retains its original Full Offertorium and Psalm
Toned choices. A separate line, shown only for chants with verses, offers 0
through the available verse count. The count comes from the actual verse
markers in each source (currently one to four verses). With a full offertory,
a checkbox chooses whether to psalm tone the verses. With a psalm-toned
offertory the verses are always psalm toned and the checkbox is hidden. A
simple-only setting has one available verse and its checkbox is checked and
disabled.

The psalm-toned verses retain Rice's first-verse adaptation where available;
additional verses use the authentic texts in the corresponding Introit tone.
When Rice chose a later verse, it is moved to the front so that it is not
printed twice. All settings reuse the existing antiphon. The repeat words in
that antiphon are bold; a custos before the reference gives the return pitch,
converted to the verse's current clef. Styling is also included in exported
GABC and PDFs.

Verse count and the checkbox preference are saved in share links as
`offertoriumVerseCount` and `offertoriumPsalmVerses`. Links using the previous
combined style names still restore their corresponding style and verses.

## Interactive review and GregoBase drafts

Run `npm run review:offertory` and open <http://127.0.0.1:8766/review/>.
Compare each printed verse system directly above its own SVG, click a note
to select its GABC, and save corrections to the authoritative manual sources.
Review-only Z breaks preserve the printed systems, including breaks inside
melismas. The proofreading interface covers verses only; GregoBase openings
are a separate preparation step. See [system alignment](system-alignment.md).

See [the GregoBase plan](gregobase-plan.md) for exact-file review checks,
Vatican opening provenance, revision backups, and the manual upload steps.
`npm run export:offertory-gregobase` regenerates complete non-rhythmic drafts
and metadata under `publication/`; the review page also downloads a ZIP. These
exports are generated on demand and are not retained in the checkout.

The obsolete six-batch comparison HTML pages and their scan crops have been
removed. Use the [interactive proofreading tool](http://127.0.0.1:8766/review/)
after starting the review server above. The retained comparison builder can
produce fresh offline pages when needed: `node build-offertory-comparison.js`
for batch 1, or add `--batch=2` through `--batch=6`. These reflect current
sources, rather than reproducing the removed historical snapshots.


## Review status

**All six transcription batches are complete: 23 manual sets and 45 printed verses.**
Batch 6 adds Oratio mea, Confessio et pulchritudo, Assumpta est and Viri Galilaei:
five verses across 22 source systems, with 42 measured bars. See the
[interactive proofreading tool](http://127.0.0.1:8766/review/),
[source review](../../../tests/fixtures/offertory/historical-reviews/batch-6-review.json) and [comparison log](review-notes.md).
Regeneration reports 104 full sets: 24 verified and 80 pending (the same 77 imported
sources plus manual-039, manual-041 and manual-044, whose current bodies do not
match their earlier review hashes). Published source registrations and concurrent
corrections remain in effect. Earlier review records are preserved; obsolete comparison pages are generated on demand.

Ad te Domine, Deus tu convertens, Benedixisti, and Confortamini
match the scanned 1935 PDF in this pass; no verse corrections were needed.

The eight antiphon settings flagged by the automatic comparison have recorded
resolutions. Four are errors in GregoBase's opening music, one is its missing n
in descéndit, and three are expected seasonal variants. The existing local
antiphons already have the correct music/text and remain unchanged. Mihi
autem's differently placed flat, Recordare's redundant flat (previously
misdescribed as a natural), and Domine exaudi's antiphon/verse boundary are also
explained in the comparison log. Confirma hoc's sine Alleluia setting now drops
the unavailable Alleluia alternative from its ending return cue.

The comparison ignores accents, punctuation, i/j and ae/æ spelling, rhythmic
signs, and neume grouping; repeated virgas/strophas are expanded. It flags
differences rather than replacing antiphons. Resolving an opening-antiphon
flag is separate from verifying that chant's verses.

Manual review records in `sources.json` include page references and hashes of
the exact GABC bodies compared. Changed source verses revert to pending;
changed source or local antiphons make their resolutions need review again.
The importer reports the effective statuses in the generated data and audit.

The simple text was extracted from the actual lyric font in the second PDF,
not OCR of its musical font. The simple collection also contains material
absent from source 32. Its departures from the longer authentic verses should
be checked as editorial adaptations rather than automatically "corrected" to
the longer text.

## Manual transcription batches

The [six-batch checklist](batch-plan.md) tracks 23 missing source settings (after correcting the Sacerdotes inventory error) separately
from review of the 81 imported sets. `manual.json` has two separate lists:
`chants` contains sources included in regeneration; `drafts` inventories working
files that are **not included in browser data**. No draft is certified merely
because it parses or renders.

Authoritative manual verse-only GABC belongs in `manual/manual-NNN.gabc`, where
NNN is the printed book number, not a GregoBase ID. The importer copies included
sources to `gabc/offertory-verses/manual-NNN.gabc`, indexes their existing local
antiphons, and derives their verse counts and psalm text through the same shared
helpers used for downloaded material. It validates mode, office part, duplicate
local mappings, and the recorded verse count before writing any outputs.
The downloader never writes to the authoritative manual directory.

A completed manual record needs the printed pages, source PDF hash, all printed
cues, a verse review hash, and an antiphon comparison tied to the existing local
body hash. The verse hash uses the same clef/newline/body format as imported
reviews. Editing that body invalidates verification; editing the reused opening
invalidates its comparison. Opening antiphons must never be copied into these
files. See the comparison log for current draft limitations.

Batch 1 is complete and `drafts` is empty. To reproduce its source/notation
comparison, run `node build-offertory-comparison.js` (requires Poppler and Python 3 with Pillow). The
result embeds all 11 verse excerpts from nine source pages, fonts and renderer
and opens offline. All continuation excerpts are shown together.
Its controls compare the authentic verses, the reused opening, and one- or
two-verse integrations. The book prints no intervening cue after the first
Benedictus qui venit verse; only a shortened one-verse selection adds its
documented Benediximus return. Alternative return cues share one ending.

The batch-1 note-shape pass corrected missing virgas, misplaced or swallowed
quilismas, several omitted/extra note heads, and neume grouping. See
[the correction record](shape-review.json) and the comparison log. Superseded
review hashes remain recorded; the comparison derives effective status from
the current source body.


## Bar lengths and horizontal cuts: required source checks

For each future transcription, make a separate bar-only pass through every
printed system, including bars inside melismas and beside clef changes.
Determine quarter (`,`), half (`;`), full (`:`), and double (`::`) bars from
the stroke's physical length relative to the staff. Latin punctuation is not
evidence of bar length; neither is the stroke's top position alone. In the
batch-1 reference strips, quarter bars span about one staff interval, half
bars two, and full bars all three. Record each bar's source location and
compare the rendered form with that stroke before marking the source checked.
Keep structural separators after unnotated return cues distinct from printed
musical bars.

Review horizontal cuts separately: `/` represents a real small printed gap;
`!` separates neume shapes without adding a gap. Check repeated puncta before
a virga with inclinata, including `hh/ivHF` in both Exsultémus and Lætémur.
Do not join or split all repeated-note groups by a general rule: compare each
with the scan. Keep the touching pes–quilisma joins in dies and reprobaverunt,
and the separate initial punctum in `fe(e!fhg)cit`. Regression and rendering
checks preserve a source decision; they do not establish its accuracy.


Pitch review must check every note against the staff, including diamonds
within a climacus. Do not assume a descending series is stepwise: the k
virga in verse 2 Lápidem is followed by i–h inclinata (`kvIH`), skipping j.
Check the first diamond independently against the staff before reading the
rest of each descending group. Confirm porrectus endpoints, ledger notes,
clef changes, and accidental scope in the same dedicated pitch pass.


## Batch 2

Three further sets are complete: #50 Domine convertere (two verses), #67
Domine Deus salutis (three), and #77 Gloria et honore (two). The initially
proposed fourth item was an inventory error: #49 is Intende voci, and
Sacerdotes Domini is absent from the 1935 index. Its existing Rice simple
setting remains available for local 645.

Use the [interactive proofreading tool](http://127.0.0.1:8766/review/) for
current source systems and editable GABC, including the seasonal 987 opening.
For an offline comparison, generate a fresh page with
`node build-offertory-comparison.js --batch=2`.
`../../../tests/fixtures/offertory/historical-reviews/batch-2-review.json` records every covered source system and all 75 measured
bars; `../../../tests/fixtures/offertory/historical-reviews/batch-2-render-audit.json` retains the historical encoding checks.

The book moves directly between verses 1–2 of #50 and verses 2–3 of #67.
Only shortened integrated selections add their documented editorial return.
The authoritative source files retain the printed sequence. For psalm-toned
#67, the first verse uses its printed In conspéctu cue; later verses use Intret.

The initial batch-2 pitch/shape review was superseded after user corrections.
[The renewed correction record](batch-2-user-corrections.json) lists every
changed notation group and the current exact-body hashes. In particular,
a pes with inclinata must retain its connected shape (`fhGF`, `fiHG`,
`hiHF`, `ehFE`), without mechanically adding v. The proofreading tool loads the current corrected bodies; the earlier review
records remain historical.

## Batch 3

Gloriabuntur (#78), Posuisti (#79), Laetamini (#81) and Mirabilis Deus (#82)
are complete, with two verses each and all continuation endings. The
[interactive proofreading tool](http://127.0.0.1:8766/review/) pairs each
source system with editable GABC. For an offline comparison, generate a fresh
page with `node build-offertory-comparison.js --batch=3`.

`../../../tests/fixtures/offertory/historical-reviews/batch-3-review.json` records all 34 source systems and 79 physical bars.
`batch-3-encoding-review.json` records the renewed head-centre and connected
neume review; `../../../tests/fixtures/offertory/historical-reviews/batch-3-render-audit.json` records the final encoding
checks, including 16 connected pes/inclinata cases without added virgas.

A manual entry may provide `cueOccurrences`, keyed by normalized cue text.
The importer carries it into full integration and each psalm verse occurrence;
Gloriabuntur uses `{ "domine": 2 }`. Printed direct transitions stay in the
authoritative files. Only selected integrations add the documented returns
after verse 1 of #78/#81 and after verse 2 of #82.


## Batch 4

Exsultabunt sancti (#83, one verse), Inveni David (#86, two), In virtute tua
(#89, two) and Desiderium animae (#90, three) are integrated. The
[interactive proofreading tool](http://127.0.0.1:8766/review/) shows the current
verses beside the source systems. An offline comparison can be generated with
`node build-offertory-comparison.js --batch=4`.

The source-system and ordered physical-bar inventories are in
`../../../tests/fixtures/offertory/historical-reviews/batch-4-review.json`; separate encoding and rendered-bounds evidence is in
`../../../tests/fixtures/offertory/historical-reviews/batch-4-render-audit.json`. Return labels not printed at the endings
of #83 and #90 are added only through documented selectionCues. Distinct #90
psalm-tone returns use psalmVerseCues. All existing openings, including optional
T.P. Alleluias, remain unchanged. Rice’s contents contain none of these four
settings.


Batch 5's Elegerunt prints a single alternative verse 3 in place of verses 1–2.
Its third choice is labelled “Alternative verse (3)” and selects that verse
alone in both full and psalm-toned styles. `verseSelections` records the
one-based source verse indices; `verseSelectionLabels` supplies the control
label. The authoritative file retains all three printed verses in order.
`selectionCues` supplies only documented editorial returns during integration.
See `../../../tests/fixtures/offertory/historical-reviews/batch-5-review.json` for the separate source-reading evidence and
`../../../tests/fixtures/offertory/historical-reviews/batch-5-render-audit.json` for exact-source rendering checks.
