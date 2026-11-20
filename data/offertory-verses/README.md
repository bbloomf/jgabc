# Offertory verses

## What is in this directory

- `sources.json`, `simple.json`, `manual.json`, `manual/` and
  `publication/review-state.json` are what the importer reads. They are
  described below.
- `antiphons.json` is written by the importer and read by a test (see Tests).
- `antiphon-audit.json` and `normalization-audit.json` are importer reports and
  are ignored by Git.
- `gregobase-plan.md` goes with `npm run export:offertory-gregobase`.

The scanned Offertoriale, the proofreading page and server, and the review
records and notes that were kept here were removed on 20 November 2026.
Corrections to verses now go to GregoBase, and the importer brings them in.
What was in Git is in commit `1581cc61`.

`tests/fixtures/offertory-feature-inputs.json` is a generated input for the
browser audit page beside it; rebuild it with
`node tools/build-offertory-feature-fixture.js` before using that page.

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

Application copies get what the regular chant downloader (`download-gabc.js`)
gives a chant of the Graduale. The shared code is in
`gabc-latin-normalization.js`, and both importers call it:

- `cleanGregobaseGabc`: Latin ligature spelling (`ae` → `æ`, `oe` → `œ`, and
  their accented/capital variants, including Gregorio special-character
  spellings), punctuation joined to its word (`nostra :` → `nostra:`), a line
  break after each bar, `(…)(;)(…)` merged into one group, and the notation the
  older Exsurge could not draw rewritten or removed (`/[-2]` and `@` → `!`, no
  `/` before a quilisma, `[oll:…]` ledger signs, the digit of `H0`).
- `resyllabifyLatin`: syllable boundaries from the local Hypher Latin patterns,
  consonantal i-to-j (preserving Alleluia and eia), and removal of acute
  accents on disyllabic words. Where a word of three or more sung syllables has
  no accent, `gabc-latin-accents.js` supplies it from the Accenteur dictionary
  the transcriber uses, or from its short list of words the dictionary cannot
  settle; a capital is left without one, as in the Graduale (Angelis, Israel).

Only `moveStarsBeforeBars` is left to the Graduale. It moves an asterisk in
front of the bar it follows, which would take the star of a return printed as
words alone (`()* Quóniam quis.() (::)`) away from those words.

Resyllabification retains all note groups in order and only proceeds when their
syllable count matches the expected count. Where the Graduale downloader stops,
the verse importer leaves the word unchanged (a syllable mismatch, two accents,
or an accent it cannot place) and lists it in `normalization-audit.json` for
source review. Headers are never changed.
The review flag (see below) is worked out from the downloaded source before any
of this is applied, and the files in `manual/` keep their source spelling.

## Tests

The tests say whether the app can put the verses on an offertory. None of them
compares a verse's words or melody with a recorded copy, so a correction on
GregoBase or a change to the import rules needs no test or fixture update.

- `tests/offertory-antiphons.test.js`: the Offertoriale prints each offertory
  before its verses, and the app sings the verses after the offertory it already
  has. The importer records the words and the first and last note of each
  printed offertory in `antiphons.json`; the test compares them with every
  linked `gabc/<ID>.gabc`. A seasonal Alleluia at the end may be in one and not
  the other. The importer prints a warning for the same difference.
- `tests/offertory-feature-corpus.test.js`: every linked offertory at every
  verse count in all three settings: no verse is lost, each return points at
  words that are in the offertory and at their pitch, and clef changes are
  prepared.
- `tests/offertory-playback-pitches.test.js` and
  `tests/offertory-custos-playback.test.js`: playback and custodes where the
  offertory and its verses have different clefs.
- `tests/offertory-verses.test.js`: the functions that split, select and join
  verses, on short examples.

The importer also regenerates `offertory-verses-data.js` (the browser's index),
`antiphons.json` and the ignored `antiphon-audit.json`. Run from any directory; paths resolve relative to the
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
converted to the verse's current clef. Between a C and an F clef it is written
in the octave Exsurge sings that clef in, which the custos at the first change
between them settles (`clefOctaves` in `offertory-verses.js` follows the same
rule, and `tests/offertory-playback-pitches.test.js` compares the two). Styling
is also included in exported GABC and PDFs.

Verse count and the checkbox preference are saved in share links as
`offertoriumVerseCount` and `offertoriumPsalmVerses`. Links using the previous
combined style names still restore their corresponding style and verses.

## Manual settings

Twenty-three settings of the Offertoriale were not on GregoBase. They were
transcribed from the 1935 print, proofread against it, and published as
GregoBase IDs 21011–21033. Those IDs are saved in
`publication/review-state.json`, and the importer downloads the verses from
them like any other.

`manual.json` lists the 23 under the keys `manual-NNN`, where NNN is the number
printed in the book, and holds what GregoBase does not:

- `localIds`: the existing offertories the verses are sung with.
- `cue`, and `psalmVerseCues` where the verses return to different places: the
  words of the return.
- `selectionCues`: a return that the book does not print, added only when a
  shorter selection of verses ends where the book goes straight on to the next.
- `cueOccurrences`, keyed by the normalized cue: which occurrence of a repeated
  word the return goes to. Gloriabuntur uses `{ "domine": 2 }`.
- `verseSelections` and `verseSelectionLabels`: Elegerunt prints one
  alternative verse 3 in place of verses 1–2, so its third choice selects that
  verse alone. The numbers are one-based verse indices.

`manual/manual-NNN.gabc` are the transcriptions as they were proofread, verses
only. The importer never writes them. It still reads each one, to check the
mode of the download and to set the review flag.

`npm run export:offertory-gregobase` regenerates complete drafts for upload
under `publication/` from those files. See [the GregoBase plan](gregobase-plan.md).

## Review flags

`sources.json` and `manual.json` carry a record of each proofreading against
the print: the pages, and a hash of the verse body that was checked. A setting
is `verified` in `offertory-verses-data.js` while its download still has that
hash, and `pending` once GregoBase changes it. The app does not read the flag.

`antiphon-audit.json` lists every linked offertory with whether its words and
pitches match the opening of the GregoBase score. The differences found were
errors in GregoBase's openings or seasonal variants; the local offertories were
correct and are unchanged.

The text of `simple.json` was extracted from the lyric font of Rice's PDF, not
by OCR. Where it departs from the longer authentic verses, that is his
adaptation and should not be "corrected" to the longer text.
