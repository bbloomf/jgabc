# Offertoriale comparison log

The entries below are historical transcription records. The old generated
comparison pages and scan crops were removed after proofreading. For current
scores use the [interactive proofreading tool](http://127.0.0.1:8766/review/)
(start with `npm run review:offertory`). Retained review JSON and renderer audit
records still describe the exact historical sources they checked. The retained
`build-offertory-comparison.js` commands can generate fresh offline comparisons
from current sources when needed.


Review date: 2026-11-16. Page numbers below are the printed pages in the supplied
1935 *Offertoriale cum versiculis* PDF (they also match its PDF page numbers).
PDF SHA-256: `c73d049f5ba90d3ec57a3f97e367a913ff100d64bb2a1f4454fc378ada6d1c1f`.

## Authentic verses checked

These four sets were visually compared with the scanned pages, including their
text, pitch sequences, clefs, accidentals, repeated notes, neume groupings,
barlines, and printed repeat cues. No verse corrections were needed in this
pass. This status applies to the verses, not automatically to every later
chant or to the generated psalm-tone adaptations.

| Chant | GregoBase ID | Existing antiphon | PDF pages | Verses | Result |
| --- | --- | --- | --- | --- | --- |
| Ad te Domine | 11393 | 962 | 5–6 | 1–2 | Matches |
| Deus tu convertens | 11399 | 631 | 6–8 | 1–2 | Matches |
| Benedixisti Domine | 9424 | 113 | 8–9 | 1–2 | Matches |
| Confortamini | 9432 | 290 | 9–11 | 1–2 | Matches |

Specific checks:

- **Ad te Domine:** checked the change from the antiphon's F3 clef to C4 at
  Dírige, the long melisma on the last *te* of verse 2, and the written-out
  Etenim after it. The first verse's printed **ut infra** points to that later
  written-out response. The stored verse file retains it; the application's
  return cue deliberately points back to the existing antiphon, as requested.
  Its return custos must use the octave of that existing antiphon, not the
  octave of the written-out response below.
- **Deus tu convertens:** checked both verses across the page turns, including
  the long melismas on *Dómine*, *terram*, and *cælo*. Both end with the printed
  Et salutáre cue.
- **Benedixisti:** checked the extended melismas on *ómnia*, *omnem*, and the
  final *nobis*, with Remisísti after each verse. Its running heading on page 9
  already names the next chant; the preceding verse still belongs to Benedixisti.
- **Confortamini:** checked Tunc aperiéntur and Audíte ítaque, including the low
  flat in *certámen* and the continuation at the top of page 11. The medieval
  wording Non pusillum vobis certamen præstare hominibus is in the PDF and
  should not be replaced with a different biblical translation.

## Resolved opening-antiphon discrepancies

These compare the opening antiphon in GregoBase's full Offertoriale score with
our existing antiphon. **They do not certify the still-pending verses of these
chants.** Our verse importer never copies the opening antiphon.

| Chant / IDs | PDF page | Finding | Action |
| --- | --- | --- | --- |
| Jubilate Deo omnis — 17704 / 718 | 23 | GregoBase has `te(e)` on the final syllable of the **second** Jubilate. The PDF and 718 have `te(d)`. | Keep existing 718; the opening error is excluded from the imported verses. |
| Erit vobis — 17769 / 151 | 63 | GregoBase has `di(hiHG)`. The PDF and 151 have `di(hiHGh)` in hic dies. | Keep existing 151, including the final h. |
| Populum humilem — 17933 / 1080 | 93 | On the final Dómine, GregoBase omits the first `jkj/kijvHG` figure before `jkj/kijvHFg`. Both figures are printed in the PDF and present in 1080. | Keep existing 1080. |
| Justorum animae — 18173 / 835 | 144 | GregoBase has `tor(e)` at tormentum. The PDF and 835 have `tor(d)`. | Keep existing 835. |
| Angelus Domini — 18334 / 789 | 57 | GregoBase descédit is missing the n. The PDF has descéndit, as does 789. | Keep existing text; no verse-file correction is needed. |
| Dextera Domini — 14203 / 448 | 25 | The PDF has no terminal Alleluia and agrees with 47. Local 448 appends the seasonal Alleluia; the preceding music agrees. | Keep both mappings; this is an expected seasonal variant. |
| Confirma hoc — 19909 / 83 | 79 | The PDF uses the cum Alleluia setting, matching 361. Local 83 is sine Alleluia and has its corresponding shorter ending cadence. | Keep both mappings. The renderer now removes the unavailable Alleluia alternative when a printed cue offers Tibi offerent vel Alleluia. |
| Meditabor — 17671 / 1218 | 109 | The PDF matches 810 without its terminal Alleluia. Local 1218 adds the seasonal Alleluia; preceding music agrees. | Keep both mappings. |

### Accidentals and verse boundaries

- **Mihi autem, 13363 / 499, page 128:** the PDF/GregoBase places the flat
  before the notes of *tu-* in `tu(ixfgFE//fg/hihhg)i`. Local 499 places it
  between F and E in that same syllable. There is no i before either position;
  the first affected i is later in `hihhg`. The effective pitches agree. Keep
  the existing antiphon; the difference concerns the sign's engraving position.
- **Recordare, 18135 / 67, page 125:** the PDF has one flat at the beginning of
  *rectum*. Local 67 repeats that same ix later in the same syllable, after GF
  and before fg. It is a redundant flat, **not a natural sign**. Both versions
  give the same pitches. Keep 67. This corrects the earlier provisional note.
- **Domine exaudi, 18165 / 461, pages 53–54:** the PDF ends the antiphon at
  pervéniat and labels Ne avértas fáciem tuam as verse 1. Therefore 461 is the
  correct existing antiphon to pair with this set. In 867, Ne avertas is already
  included in the antiphon. Do not link the whole set to 867 and repeat it.

## Continuing the review

There are **4 verified verse sets and 77 pending**. The next chant in book
order is **Exsulta satis (11725), beginning on page 11**, followed by Ave Maria
(14211, page 13) and Tollite portas (14223, page 14).

The eight settings flagged by the automatic text/pitch comparison now have
recorded resolutions. Raw comparison flags remain visible in
`antiphon-audit.json`; resolving a flag does not rewrite the evidence or mark
that chant's verses verified.

The detailed records are in `sources.json`. A verified verse set is tied to
its clef and GABC body by SHA-256. An antiphon resolution is tied to both the
source opening and the existing local opening. If those contents change on a
later import, the generated status returns to pending / needs-review rather
than inheriting the old verdict. The importer prints both outstanding
antiphon discrepancies and the separate verse-review totals.

Repleti sumus, Erue, and O pie Deus still have no matching existing antiphon in
the repository; their verse files remain unlinked. Their verses are part of the
pending review total. No new opening antiphons were added in this pass.

## Missing-setting batch 1 — completed 2026-11-17

All four manual sets are transcribed and included: eight full verses. The
initial review below missed note-shape and grouping errors; the correction
pass at the end of this log supersedes that review. They are integrated with the existing openings, with no duplicated
opening scores. `manual.json` records the book numbers, exact pages, source PDF
hash, verse-body review hashes, and opening comparisons tied to local hashes.
The prior working drafts have been corrected and moved into the included
`chants` list; `drafts` is empty.

| Book no. | Chant | Existing opening | Exact PDF / printed pages | Verses | Source clefs | Returns |
| --- | --- | --- | --- | --- | --- | --- |
| 39 | Benedictus qui venit | 941 | 64–65 | 2 | C3 throughout the verses | Benediximus or Et illuxit after verse 2 |
| 41 | Lauda anima | 668 | 67–69 | 2 | C4 | Alleluia after verse 1; Alleluia or Psallam after verse 2 |
| 44 | Confitebor Domino | 584 | 74–75 | 2 | C4; C3 in verse 2; restored C4 before Laetabitur | Ut salvam after each verse |
| 48 | Benedictus sit | 1303 | 81–82 | 2 | C4 | Quia fecit after each verse |

Boundary pages were checked: p. 66 begins #40; p. 83 begins the next chant.
The material above each numbered opening belongs to the preceding setting.

### Notation checks and corrections

The review covered text underlay, pitch sequences, clefs, flats/naturals,
repeated notes, neume grouping, barlines, and all printed repeat cues. Source
staff strips were enlarged with pitch rulers where the scan was ambiguous.
Porrectus pitches were checked from the centers of the filled note ends,
calibrated against the known local openings; the slanted tips extend beyond
the actual pitch and must not be read as additional notes.

- **#39:** corrected the three repeated i notes in Lapidem, the upper figures
  in Reprobaverunt and Aedificantes, the gh at pro-, the hj and jk liquescent
  at Anguli, and the complete Oculis nostris cadence. Both extended
  Exsultemus/Laetemur melismas were checked, including the repeated flats.
  Quem uses the descending two-note liquescent ih~, not a single j~.
- **#44:** corrected the high LKL porrectus in Domine / Manus / Detrahebant,
  the KJK in Propter, the center pitches in the Servus/Vus figures, the final
  syllable of Tuus, and the separate torculi in the repeated final cadences.
  Checked the flat at Salvum and both changes of clef in verse 2. Bant uses
  the descending ji~ liquescent. Text is Induantur … reverentia as printed.
- **#41:** checked the low dc figures at Ju-/Pa-, plain g at Solvit, all
  porrectus centers, and the entire Saeculi melisma across pp. 68–69. There
  are no verse accidentals or clef changes.
- **#48:** checked the quilisma on h in Cum, the natural iy at Spiritu,
  five repeated f notes at Cherubim, both Quia fecit returns, and the long
  final Saecula melisma. Both verses remain in C4.

### Reused openings and editorial choices

All four printed openings agree with the reused local openings in normalized
text and pitches; their existing rhythmic signs remain. For #48 the expanded
pitch comparison contains 169 matching notes. The local intonation stars
and the source's later repeat stars serve different purposes. Integration
adds bold return words at Benediximus / Et illuxit, Psallam / Alleluia,
Ut salvam, and Quia fecit without replacing the openings.

Local 1303 also includes an optional T.P. Alleluia after its first double bar.
That seasonal addition is absent from the 1935 opening and remains unchanged
in the local score. No other text or pitch discrepancy was found in these
four opening comparisons.

The book prints **no intervening repeat cue after #39 verse 1**: it proceeds
directly to verse 2. The authoritative GABC preserves that sequence. When the
user selects only the first verse, `selectionCues[1]` adds a documented
editorial return to Benediximus. Selecting both verses uses the printed
Benediximus / Et illuxit alternatives. This adaptation affects selection,
not the transcribed source file.

Rice was checked visually: **Lauda anima printed p. 13 = PDF p. 17**, and
**Benedictus sit printed p. 15 = PDF p. 19**. Lauda's full first verse has
**faciet**, whereas Rice intentionally uses **faciens** and the **Psallam**
return instead of the full first verse's Alleluia. Both are retained in their
respective settings. Benedictus sit's first-verse text and Quia fecit cue
agree with the existing Rice record. Rice has no corresponding setting for
#39 or #44 in its inventory.

### Integrated rendering and regeneration

All four were rendered with the repository's Exsurge library and embedded
fonts in an isolated browser, in source-only, existing-opening, one-verse,
and two-verse views. The real versicle symbol is retained; a single selected
verse has no numeral; two have 1 and 2. Bold returns and actual return pitches
were checked. Return custodes are **d in C3** for #39, **c in C4** for #41,
**f in C4** for #44, and **d in C4** for #48. Alternatives share the same
ending rather than forcing an extra empty staff between them.

The historical batch-1 comparison was self-contained. Rebuild with
`node build-offertory-comparison.js`. It embeds all nine scanned source pages,
fonts, scores, exact manual GABC, fingerprints, and explanatory notes; it
requires no network connection when opened. The generated SVG viewport includes
lyrics and cue text beyond the staff bounds.

Focused tests cover all 0/1/2 verse counts, full and psalm-toned choices,
manual-source regeneration, review-hash invalidation, exact return custodes,
printed alternatives, and the editorial one-verse #39 return. Regeneration
now contains **85 sets: 8 verified, 77 pending**. The original imported 81 sets
and their 4 verified / 77 pending reviews remain unchanged. Twenty manual
settings remain in batches 2–6.

Inventory correction to investigate before batch 2: p. 83 of the supplied
1935 scan visibly starts **49. Intende voci**, whereas the proposed inventory
calls #49 Sacerdotes Domini. Confirm printed numbering and source pages before
transcribing that batch; the original requested inventory remains recorded in
the checklist so the discrepancy stays explicit.

## Note-shape correction pass — 2026-11-17

The user identified two missing virgas and a missing quilisma in the opening
Hæc dies. The earlier review was too broad: correct pitch sequences and a
successful render had been mistaken for complete verification of note forms.
This pass rechecked the printed stems, wave positions, separately printed
note heads, and neume boundaries in all eight verses. Previous review hashes
are retained as superseded in `manual.json`; exact before/after body hashes
and corrections are recorded in `shape-review.json`.

| Chant | Explicit virgas restored | Quilismas checked and visible | Note count before → after | Other corrections |
| --- | --- | --- | --- | --- |
| #39 Benedictus qui venit | 23 | 13 | 389 → 389 | Corrected quilisma positions and printed group separation; all pitches preserved. |
| #41 Lauda anima | 10 | 4 | 413 → 414 | Restored G in the initial custó figure, f + gh; corrected three quilisma positions. |
| #44 Confitebor Domino | 13 | 1 | 275 → 277 | Restored G in Confundantur and Tuus; corrected an F to G in Ser; corrected the ut quilisma and several group boundaries. |
| #48 Benedictus sit | 19 | 8 | 426 → 426 | Lau is d–f(quilisma)–g–h(virga); removed an extra J from the final i–k–i figure. Unchanged total count conceals these two corrections. |

The opening now reads `Hæc(dewfe/fvEDe) di(ef/gwhf/gvFEf)`. This preserves
its original pitches while restoring both printed climacus virgas, the wave
on G, and the group boundary that makes that wave visible. The two long
Exsultemus / Laetemur figures now contain `hhivHF`; their apex is a separate
virga, not the upper note of a pes. Other pes-subpunctis groups retain their
printed pes: virgas were not inserted mechanically before every inclinatum.

GABC's `w` modifies the preceding pitch. Several earlier placements modified
the preceding note instead of the printed wave note. In addition, automatic
grouping had swallowed a wave in #39 and two in #48. Explicit group boundaries
now preserve those figures. The rendered checks account for **65 explicit
virgas and all 26 quilismas**: #39 has 23 climacus heads; #41 has 9 climacus
heads plus 1 standalone virga; #44 has 13 climacus heads; #48 has 15 climacus
heads plus 4 standalone virgas.

The comparison no longer hides continuation pages behind a selector. It
displays **11 cropped excerpts from all nine relevant pages**. Each first
excerpt starts at verse 1, and each continuation runs through the final
verse/cues, stopping before the next chant. On p. 64 the printed verse label
extends left of the new clef; that label is preserved while the preceding
antiphon music above it is omitted. Exact crop and omission rectangles are
recorded in `comparison/crop-rectangles.json`. Each excerpt can be enlarged.

The four source openings remain unchanged. Rice text choices, verse counts,
return alternatives, and the editorial one-verse #39 return remain as before.
The revised comparison uses effective review hashes rather than displaying
an old verified label after a source file changes. Regression checks cover
the reported Hæc dies forms and the newly restored compact rising figures.

Final validation: all 119 tests pass. The final rendered audit binds each
corrected source file hash to its visible glyph inventory. All return labels
fit inside their SVG bounds; final full-page captures show them completely.
The audit is saved in `../../../tests/fixtures/offertory/historical-reviews/render-audit.json`.

## Neumatic cuts and horizontal spacing — 2026-11-17

The user identified false spaces between the pes and following quilisma in
Dies and Reprobaverunt. The earlier grouping fixes had used `/` to force
separate glyphs; that also inserted a neumatic cut. These joins now use `!`,
which preserves the glyph groups without adding horizontal space:

- `di(ef!gwhf/gvFEf)`
- `runt(hi!jwkvJI)`

The close ef/hg figure in Fecit and both plain-i-to-quilisma joins in
Aedificantes likewise now use `!`. The printed cut after the first jwk group
in Aedificantes remains `/`, as does the ef/hf cut in Exsultemus. The source
shows a normal gap there; these were not tightened mechanically. The
Domino and Exsultemus quilismas already identified as correctly spaced were
preserved.

For Benedictus sit the fresh comparison found the opposite issue: several
normal printed cuts had been overjoined. Cuts were restored in Filium, Cum,
Et, Exaltemus, Benedictus and Superlaudabilis, while the close pes/quilisma
join in Benedictus remains zero-space. The reviewed cuts in Lauda anima and
Confitebor Domino remain unchanged. On the 2100-pixel reference images,
normal printed cuts were about 6–8 pixels, compared with continuous or
nearly touching ink at the corrected close joins.

This pass changes spacing and grouping boundaries only. Pitch order, note
heads, virgas, quilisma positions, accidentals, text, bars and verse counts
are unchanged in all four files. `spacing-review.json` records the exact
before/after notation and binds the new review hashes to each source. The
previous shape-review record remains historical, with a link to this pass.
The browser model confirms `trailingSpace: 0` and `keepWithNext: true` at both
reported pes/quilisma joins; all 65 explicit virgas and 26 quilismas still
render. All 120 tests pass. The comparison has been regenerated from the
revised sources.

## Qui custodit porrectus — 2026-11-17

The user identified a remaining starting-pitch error in Lauda anima's first
Custodit. Its ending is now `j/jh/igh`, replacing `jjh/hgh`. The porrectus
swash starts on **i (ti)**, not **h (la)**. The middle and final notes remain
g and h; the total note count remains 414. This corrects the earlier pass's
claim that all of this figure's pitches had been verified.

The source, generated verse file, browser data, comparison and review hash
were regenerated. A regression check preserves the exact ending. The
rendered model reports the three groups `j/`, `jh/`, `igh` and confirms the
porrectus starts on i. The updated #41 render was inspected; its four
quilismas and ten explicit virgas remain visible. All 57 focused tests pass.

## Fecit grouping — 2026-11-17

The user corrected the first chant's Fe- to `e!fhg`. The earlier `ef!hg`
incorrectly combined e and f into a podatus, followed by an hg clivis. The
correct structure is an independent **e punctum**, then the **fhg torculus**,
without an added space. This supersedes the Fecit grouping retained in the
previous spacing pass. Pitch order remains e–f–h–g.

The authoritative and generated GABC, review hash, browser data and comparison
were updated. The rendered check reports two groups, `e!` and `fhg`, with one
torculus and no podatus in this figure. The updated render was inspected;
all 13 quilismas and 23 explicit virgas in #39 remain visible. A regression
check protects this grouping; all 58 focused tests pass.


## Batch 1: dedicated bar-length and horizontal-cut review (2026-11-17)

Reviewed every bar in the four new manual verse sets against its physical
stroke in the scanned book, including melisma-internal bars, continuation
pages, and clef changes. The ordered inventory and measured source locations
are recorded in `bar-review.json`, tied to the exact manual files.

| Chant | Bar corrections | Findings |
| --- | ---: | --- |
| #39 | 11 | Nine quarters corrected to halves; two halves corrected to full bars. |
| #41 | 10 | Nine quarters corrected to halves; missing half after the last sæculum added. |
| #44 | 11 | Nine quarters corrected to halves; tuam half corrected to full; missing half after verse 1 Dómine added. |
| #48 | 2 | Missing quarter after verse 1 et added; quarter after superexaltátus corrected to half. |

Preserved genuine quarters, including the bar within ea after Lætémur,
after servus in #44, and the final quarter within sæculi in #41. Both
Exsultémus and Lætémur now have `hh/ivHF`: a real small gap after the repeated
h puncta. Reviewed analogous repeated-note groups and existing horizontal
cuts in all four sources; no additional changes were supported clearly by
the scan. Pitches, note forms, and lyrics were preserved in this pass.

The rebuilt offline comparison includes all continuation excerpts. The
renderer matched the complete ordered bar sequence in each source, retained
all 65 explicit virgas and 26 quilismas, and resolved the `hh/ivHF` cut to
3.125 units of extra space. Touching pes–quilisma joins still resolve to zero
extra space. These rendering checks preserve the transcription decisions;
the source stroke inventory supplies the evidence for bar length.

Bar-length and horizontal-cut checks are now explicit requirements in the
batch plan and README for future transcriptions.


## Batch 1: renewed pitch review (2026-11-17)

Read both verses of all four manual settings against the source staff positions,
including every continuation system, repeated notes, inclinata, porrectus
endpoints, clef changes, and accidentals. The per-chant source-system coverage
and exact-file fingerprints are recorded in `pitch-review.json`.

Corrected #39, verse 2 Lápidem, pi: `i/k/kvJI/iji` → `i/k/kvIH/iji`.
The k virga is followed by i–h inclinata; the first descent skips j.
Both diamonds had been a step too high. No additional pitch discrepancies
were identified in the four verse sets during this pass. Note counts,
note forms, lyrics, bar sequence, and horizontal cuts are unchanged.

## Batch 2 — complete after inventory correction (2026-11-17)

The proposed “#49 Sacerdotes Domini, pp. 83–84, local 645” conflated two
collections. The 1935 scan visibly prints **49. Intende voci** on p. 83;
that setting ends on p. 84 before #50. The complete alphabetical index on
pp. 181–182 contains no Sacerdotes Domini. Rice does print it on printed
p. 15 (PDF p. 19), using In ecclesiis from Pentecost and the Et non cue.
Local 645 therefore remains simple-only; no full setting has been invented.
The corrected batch contains these three source-supported sets:

| Printed chant | Pages | Local opening | Printed verses | Result |
| --- | --- | --- | ---: | --- |
| #50 Domine convertere | 84–85 | 848 | 2 | Complete |
| #67 Domine Deus salutis | 112–114 | 542; seasonal 987 | 3 | Complete |
| #77 Gloria et honore | 133–135; verses start 134 | 407 | 2 | Complete |

All seven verses were transcribed from the 1935 notation. Dedicated source
passes covered every pitch, clef and accidental, individual inclinata and
porrectus endpoints, virgas, quilismas, liquescents, bars and horizontal cuts.
`../../../tests/fixtures/offertory/historical-reviews/batch-2-review.json` records all 31 source systems, source-strip fingerprints,
exact manual-file hashes and an ordered coordinate/type inventory of all
75 physical bars (including five closing strokes after unnotated cue panels).
Measured quarter, half and full strokes agree with the approximately
29/58/90-pixel extents on the 2100-pixel renders. Custodes were excluded.

Particular checks include the C4-to-C3 change in #50, its high repeated notes
and os ending; the three k heads of precem, H–F–E descent in praeveniet,
page-114 porrectus endpoints and long final melisma of #67; and the renewed
flats/naturals, paired quilismas, k–l ascent of elevata and low b in the final
eum of #77. A rendered grouping initially swallowed the j virga after ik in
#50; `ik!jvIH` preserves both the shape and the touching source spacing.
Words crossing source-system boundaries were checked in the extracted psalm
text; praeveniet, adjutorio, liber, magnificentia and hominis remain whole.

The reused openings 848, 542 and 407 agree with the printed openings in
normalized text and pitches. Their rhythmic signs and opening stars remain.
Seasonal 987 has the expected different final Domine figure, followed by its
added Alleluia: source/local 542 uses `mi(gh/jhi)`, while 987 uses
`mi(g!hwihi)`. Both local files remain unchanged. The same source verses and
both return points were checked with each opening.

The book moves directly from verse 1 to verse 2 in #50, and from verse 2 to
verse 3 in #67. The authoritative manual GABC adds no intervening cue. A
shortened selection adds only its documented editorial Salvum me fac or
Intret return. #67 verse 1 retains its printed In conspectu return; its final
verse uses Intret. These distinct cues also carry into the psalm-toned data.
Rice printed p. 16 (PDF p. 20) agrees with #50's first-verse text and uses
Salvum. Rice has no corresponding setting for #67 or #77.

The historical batch-2 comparison was self-contained and offline. It showed all nine
source excerpts through the verse endings, omits preceding music, and offers
verse-only and combined views, including one/two/three verses for #67 and its
seasonal opening. Source zoom, readable GABC and current fingerprints are
included. The batch-1 HTML and its source crops were preserved.

The final rendered views were inspected against the scan strips and checked
for text/SVG bounds. The encoder retained all 68 explicit virgas, 22 quilismas
and the complete ordered bar sequences; `../../../tests/fixtures/offertory/historical-reviews/batch-2-render-audit.json`
records the exact sources checked. These checks validate the encoded reading;
they are separate from the source-based musical review.

Offline regeneration produces 88 full verse sets: eleven verified, the same
77 imported sets pending. All 130 tests pass, including all available verse
counts, both verse styles, exact-body review invalidation, source isolation,
return pitches across the clef change and the three-verse integration.
No commit or worktree was created, and unrelated local work was preserved.

## Batch 2: renewed pitch and connected-neume review after user corrections

This section supersedes the pitch/shape certification and counts in the
original batch-2 completion entry above. The earlier pass missed substantial
source-reading errors; matching rendered shape counts only preserved those
errors. Its hashes and findings remain historical in `../../../tests/fixtures/offertory/historical-reviews/batch-2-review.json`.
The current bodies and all before/after changed groups are recorded in
`batch-2-user-corrections.json`.

The user identified #50's initial mi as a pes with inclinata (`fhGF`, not
`fhvGF`), its tua as `fgf` then `fg`, and #67's omitted cli clivis, pes figures,
and incorrect low ending of mi. The renewed source reading checked all
31 batch-2 verse systems using enlarged staff-aligned crops. Square-head
centres and actual connections were read independently; porrectus left head,
lower endpoint and final head were checked separately. A pes before inclinata
must not acquire an extra virga: adding v changes the source neume.

Specific corrected examples:

- #50: `mi(fhGF)`; `tu(fgf)a(fg)`; `ne(fhg)que`; `tu(dec)o(c)`;
  the repeated figures within os; its h–e–f porrectus; and `me(ehf/fd)`.
- #67: `clí(hi/ih)`, `tu(fiHG)`, `Dó(hiHF)mi(f!gwhe)`;
  later `Dó(ehFE)mi(fe/ede)`; connected groups and missing/repeated heads
  through verses 2–3; diminished liquescent pitches; the g quilisma at
  juventute; and restored continuation notes near the final page turn.
  The flat in verse 2 is **gx in C3**, with its corrected following pitches.
- #77: pes/inclinata figures, repeated heads, porrectus endpoints and
  individual diamonds throughout both verses. The repeated quilisma figure
  contains hgh; noster ends hg/gfg. Quid est homo, hominis and visitas were
  corrected. The last low note of eum is **c** in `ec`; the previous b claim
  was wrong.

The updated rendered structural checks explicitly confirm a PesSubpunctis
for fhGF, fiHG, hiHF and ehFE, and a Podatus followed by Clivis for hi/ih.
These cases contain no added climacus. All verse-only and combined selections,
including seasonal 987, were re-rendered and inspected. All 75 ordered bars
are unchanged. The revised encodings render 41 explicit virgas (7/21/13)
and the same 22 quilismas (1/12/9). These counts describe the corrected
encoding; the source reading supplies the musical evidence.

Generated verse files, browser data, offline comparison and review hashes
were updated. Existing opening antiphons, batch 1 and the 77 pending imported
sets were preserved. The former review hashes are retained as superseded.


## Batch 3: Gloriabuntur, Posuisti, Laetamini, Mirabilis Deus

Completed eight printed verses in four authoritative manual files, with the
existing five local openings reused: 1375, 487, 786, 870 and 919. Printed
numbers and actual boundaries were established from the scans. All endings
on next-chant heading pages are included. Rice's alphabetical contents on
printed p. 32 (PDF p. 36) contain none of these four titles, so there is no
corresponding simple text/cue setting to compare.

The source coverage is 34 verse-bearing systems, with an ordered inventory
of 79 measured physical bars. Five doubles close blank return-cue panels;
they are tagged separately. Each bar is tied to page/system coordinates,
vertical ink bounds, source PDF hash and exact manual-file hash in
`../../../tests/fixtures/offertory/historical-reviews/batch-3-review.json`. Quarter/half/full strokes are about 29/58/90 pixels
on the 2100-pixel page render. Custodes and neume stems were excluded.

During this session the shared batch-2 user-correction guidance became
available. The batch-3 encodings were re-read across all 34 systems using
enlarged crops and square-head centres, rather than ribbon edges. Connected
pes/inclinata groups lost the incorrectly added v; actual separate virgas
remain explicit. The in-session before/after groups and superseded initial
fingerprints are retained in `batch-3-encoding-review.json`. Final reviewed
bodies supersede those first encodings.

Specific source decisions include:

- #78: C3 verse clef; mea h–e and its connected ijIH; mórem def/ef!gwh and
  h–g diminished liquescent; low Dó(d)mi(defED/e)ne(ed); repeated d!ew!fef;
  two six-note k groups with a half bar after each; full final am(de).
- #79: complete Desiderium continuation d/ff/gh/fhj/jh/ig; tribuisti fg/gh;
  voluntate gk; individual l–K–I diamonds; connected klKI/jkJI; porrectus
  endpoints jhj, igh, jhi, hgh and final gfh.
- #81: repeated flat and f!gw!hgh/giHG; source gfg at omnis; fe~ liquescent;
  connected dfEC/d cadences and fjHF; final eum porrectus ifg. Seasonal 870
  agrees with the source opening. Primary 786 omits Alleluia and lengthens
  corde. My initial in-session Et variant claim was incorrect: the source
  and both local openings have gfg. All opening music is preserved.
- #82: Exsurgat e/fe/fih, fug(i)ant descending through E, f!gwhGFE/f,
  connected hiHG/fgFE/egFD, res jij, Dei ijIH/hhh then fgf, epulentur ihi,
  and the complete final laetitia ending.

The book goes directly between verses 1–2 of #78 and #81. Only shortened
one-verse selections add their documented return. #78's printed Dómine
means the second occurrence, after justo, in the preserved opening. The
new optional cueOccurrences metadata carries that choice through full and
psalm-tone integration. #79 retains Alleluia or Vitam after verse 1 and
Alleluia after verse 2. #82 prints Benedictus after verse 1; its second
verse ends without repeating the cue, so only its integrated two-verse
selection adds an editorial Benedictus. The authoritative file ends with
the printed double bar. Sung final notes are separate from that bar so
return replacement cannot swallow their notation.

Final verse-only and integrated renderings were inspected against the scan
strips. Ordered rendered bars, 39 actual separate virgas, 15 quilismas,
16 connected pes/inclinata structural cases, exact fingerprints, and bounds
checks are recorded in `../../../tests/fixtures/offertory/historical-reviews/batch-3-render-audit.json`. These checks
preserve the source reading; they do not independently prove it correct.
The historical batch-3 comparison contained all source verse
excerpts, source zoom, exact GABC, both verse counts, individual verses and
the seasonal Laetamini opening. The builder defaults to batch 1 and accepts
--batch=2 or --batch=3.

Regeneration now includes 92 full verse sets: 15 verified and the same 77
unrelated imported sets pending. Eleven manual sets contain 23 verses.
No commit or worktree was created; unrelated UI/test work was preserved.

Final batch-3 regression: 137 tests pass, 0 fail, including all available
verse counts and both verse styles. Final source-file fingerprints agree
across authoritative files, generated copies, review inventory and render audit.


## Batch 4: Exsultabunt sancti, Inveni David, In virtute tua, Desiderium animae

Completed eight printed verses in four authoritative verse-only files, reusing
local openings 33, 779, 667 and 722. Actual printed numbers, titles and boundaries
were checked visually. #83 is one long verse, #86 and #89 two each, #90 three.
The provisional #90 span was corrected: its opening begins on p.153, all three
verses occupy p.154, and p.155 starts Afferentur without a continuation. Endings
under Justorum animae, Veritas mea and Desiderium animae headings are included.
Rice’s printed p.32 (PDF p.36) alphabetical contents contain none of these titles.

Separate source passes checked square-head centres and actual connections, each
inclinatum, porrectus endpoints, ledger notes, active clefs and accidentals,
liquescents, postfix quilismas and horizontal cuts. Specific readings and full
33-system coverage are recorded in `../../../tests/fixtures/offertory/historical-reviews/batch-4-review.json`, tied to the source PDF
and exact manual files. The independent bar pass records all 75 physical bars,
including six closing doubles after cue panels; #86 has three quarter bars.
The C2 flats in #89 are ex; its C4 flats ix. The C3 flats in #90 are gx.
Connected pes/inclinata retain their direct spelling; an explicit v is used
for actual separate virgas, including the touching ef!hv figure in #83.

#83 ends without a printed cue. Its integrated selection editorially returns
to the beginning, Exsultabunt. #86 preserves both Manus returns. #89 preserves
the notated Desiderium cue after verse1 and the C2-to-C4 change before verse2.
#90 preserves Et voluntate after verse1 and Posuisti after verse2, then changes
to C3 for verse3. No final cue is printed after verse3; only the integrated
three-verse selection adds editorial Et voluntate. All final sung syllables
retain notation. Words crossing systems, including impones, remain joined.

The existing openings agree in normalized text and pitches; their rhythmic
signs and intonation stars remain. Local 779, 667 and 722 additionally contain
optional T.P. Alleluias after the first double bar, absent from these printed
openings; all local music is preserved.

Final verse-only scores and every applicable combined verse count were rendered
and visually inspected against the source strips. Isolated headless Chrome
checked the exact-file hashes, complete ordered bars, connected-pes structural
cases, 24 encoded separate virgas and eight quilismas, and SVG/text bounds.
These are encoding checks, separate from source musical review. Details are in
`../../../tests/fixtures/offertory/historical-reviews/batch-4-render-audit.json`. The historical batch-4 comparison
embedded all images, renderer and fonts, with zoom and exact-source controls.

A selection-helper fix removes a terminal clef belonging to the next verse
when shortening a selection. This prevents empty last staves after #89 verse1
and #90 verse2 while keeping source clefs and custodes intact. Regression tests
cover those cases, complete endings, distinct cues, source coverage and hashes.
All five batch-4 tests pass. The full suite reports 147 passes and one unrelated
failure: manual-039 changed concurrently, leaving its Exsultemus expectation and
earlier review hash stale. That source, its tests and review record were not
changed or recertified by batch4. Regeneration reports 96 sets, 18 verified and
78 pending (the same 77 imported sets plus that changed manual source).

Batch1–3 comparison HTML, their other authoritative sources and review records,
and all opening files were preserved. No worktree or commit was created.


## Batch 5: the two Afferentur settings, Domine Deus and Elegerunt (2026-11-18)

Completed #91 (mode4, proximae, local1107), #94 (mode6, local200),
#95 (mode8, local462), and #96 (mode1, post eam, local768). All four original
openings remain unchanged, including optional T.P. Alleluias in 1107 and 200.
Their printed openings were compared in text and pitches; no pitch difference
was identified in this pass. Exact-file comparisons are recorded in manual.json.

Nine numbered verses cover 47 verse-bearing systems. The ordered inventory
contains 114 physical bars, including four cue-panel closing doubles. Systems
on next-chant heading pages are included through their complete sung endings.
Page155's opening staff at y268 is counted as system1; its verse starts in
system4. Source readings and coordinates, source PDF hash, strip hashes and
exact manual-file fingerprints are in batch-5-review.json.

Dedicated passes checked text/boundaries, head centres, repeated heads,
each diamond, porrectus endpoints, active C4 clefs, flats, connected pes and
separate virgas, quilismas, liquescents, physical stroke lengths and horizontal
cuts. Specific findings include #91's h!iwjkJI and skipped descents; #94's
khj sol figures and complete repeated Dominus/Dominum cadences; #95's hjIH
without an added v, gi/jh division, repeated fa figures, and full alternative;
#96's D–C diamonds, low B-flat bx, separate gh!jvGF and final fdf porrectus.
Syllables crossing systems remain whole in extracted psalm text.

The rubric before Elegerunt verse3 says it can replace both preceding verses.
All three remain in the authoritative file. Integration offers the first two
or the single alternative, including in the psalm-toned style. Verse1 prints
Domine; only integration supplies that editorial return after the unlabelled
endings of verses2–3. The other three settings proceed directly between verses1–2;
shortened one-verse selections add their documented returns through selectionCues.
Rice printed p.31 (PDF35) shortens Domine Deus verse1, omitting its repeated
first sentence and sung Deus Israel; it uses the same Deus Israel cue. The
existing simple adaptation remains unchanged. Rice has no matching setting
for #91, #95 or #96 in its alphabetical contents.

The offline batch-5 comparison embeds all source excerpts, fonts, renderer,
exact GABC and fingerprints. Source zoom and individual verses are available;
integrated views include each applicable selection and Elegerunt's alternative.
Final verse-only and combined views were inspected against the scan strips.
The isolated renderer checked exact hashes, all ordered bars, connected-pes
classes, visible encoded virgas and quilismas, and bounds. These checks validate
the encoding and integration; they do not establish the source reading.

Regeneration reports 100 full sets, 21 verified and 79 pending. The same
77 imported sources remain pending; concurrent edits to manual-039 and manual-041
invalidate their earlier reviews. Full regression: 155 passes and three unrelated
failures (manual-039 close-quilisma and Exsultemus/Laetemur expectations;
manual-041's changed return cue).
Batch5-specific checks and both alternative verse styles pass. Other batches'
authoritative bodies/review hashes, all reused openings, and earlier comparison
HTML/crops were preserved. No worktree or commit was created.


## Batch 6: Oratio mea, Confessio et pulchritudo, Assumpta est, Viri Galilaei (2026-11-18)

Completed the final four planned settings with five printed verses. Source numbers,
titles, modes and boundaries were checked visually. Oratio's single C3 verse is
entirely on p.165, systems5–9; p.164 contains the opening only. Confessio's two C4
verses cover p.166 systems4–8 and p.167 systems1–2. Assumpta's one C4 verse covers
p.167 systems7–8 through p.168 systems1–3, including its full notated Alleluia.
Viri's single C4 verse starts p.172 system7 and ends p.173 system4. All continuation
endings beneath subsequent page headings are included; unrelated music is excluded.

Independent passes checked text and syllable underlay, square-head centres, every
inclinatum, porrectus endpoints, ledger heads, active clefs, accidental scope,
actual connections, standalone virgas, postfix quilismas, liquescents, physical bar
lengths and horizontal cuts. All 22 verse systems and 42 physical bars are recorded
in `../../../tests/fixtures/offertory/historical-reviews/batch-6-review.json`, including 4 cue-panel closing doubles. Full-system source
fingerprints include 75px above the top line to retain Assumpta's very high m.

Oratio retains the independent i preceding jij in Dominus, the high k/l figures,
two quarter bars on p.165 system7, C3 natural gy, and the complete custodivi and
non cadences. Its final vi has its own notes. Confessio retains hjGE and ghGF as
connected pes/inclinata, the standalone gvFE descents, hj/ki/jvHG in nomen, ix
then iy across the page turn, and hghf/hg/gd~ at terra and final eius. Cantate
Domino retains every syllable in both verses. Assumpta retains k!lwmk, each klKI,
porta's d/ff/iyghf/jj/hi, internal half/quarter bars and joined patefacta.
Viri retains cd!ewf/fg~ in Cumque/ecce, the skipped ghFE descent, gdf porrectus,
ef pes, de liquescent, very low da~ before vestibus, and complete dixerunt ending.
Uncertified initial draft fingerprints are retained as superseded in the review.

The four original openings 185/105/3317/3315 were compared visually and preserved.
No pitch discrepancy was identified in this pass; their existing rhythmic signs,
intonation markers and grouping remain. Rice's alphabetical contents, printed 32
(PDF36), contain none of these four titles. There is no matching simple adaptation.
Ascendat, both Sanctitas returns and Sic veniet remain printed cues; Assumpta's
Alleluia is sung in full and remains notated during integration. No new selection
helper behavior or editorial alternative was needed.

The historical batch-6 comparison embedded all source continuations, source
zoom, exact GABC/fingerprints, individual verses, every applicable integrated
selection, renderer and fonts. Final verse-only and integrated views were inspected
against the scan strips. Isolated Chrome checked exact-file hashes, ordered bars,
connected-pes structural cases, 16 explicit separate virgas, 11 quilismas and bounds.
`../../../tests/fixtures/offertory/historical-reviews/batch-6-render-audit.json` records the results. These checks preserve
the source reading; rendered counts alone do not establish it.

Regeneration reports 104 full sets: 24 verified and 80 pending. The same 77 imported
sets remain pending; manual-039/041/044 also remain pending under their old reviews.
Earlier-source GregoBase registrations were respected by the current importer.
The full suite reports 161 passes and 5 failures tied to earlier-source expectations
or published-vs-local identity. All 4 batch6 tests pass. No earlier manual body or
review hash was edited here; concurrent manual-044 changes were preserved. Earlier comparison HTML and the four opening files retain their initial
fingerprints; earlier crops were not written by this batch.
All 23 planned manual sets now contain 45 printed verses. No commit or worktree
was created.

## Continuing imported-source review, batch 1 — 2026-11-19

This is a continuation of the **81 pre-existing imported settings**, separate
from the six manual-transcription batches above. The four previously reviewed
imports were retained, with their raw-body hashes checked against the existing
download cache. The 23 proofread/published manual settings (21011–21033), their
authoritative sources, publication records and accepted baseline were excluded.
The historical totals in earlier sections describe those earlier imports.

| Imported setting | ID | Existing opening | Source pages | Verse-bearing systems | Result |
| --- | --- | --- | --- | --- | --- |
| Exsulta satis | 11725 | 929 | 11–13 | p.11 s.8; p.12 s.1–9; p.13 s.1 | Both verses match in this pass |
| Ave Maria | 14211 | 843 | 13–14 | p.13 s.6–8; p.14 s.1–6 | Both verses match in this pass |
| Tollite portas | 14223 | 171 | 14–15 | p.15 s.1–7 | Both verses match in this pass |
| Laetentur caeli | 17652 | 811 | 15–16 | p.16 s.2–8 | Both verses match in this pass |

System numbers count all physical music systems from the top of each page,
including preceding chants and opening-antiphon systems. Shared opening/verse
systems retain the opening double bar in the evidence strip, but exclude it
from the verse bar inventory. Tollite has no verse on p.14; that page contains
its opening. Next-chant running headings do not terminate the preceding verses.

The comparison covered every verse pitch/head, active clef, accidental scope,
repeated note, diamond, porrectus endpoint, liquescent, quilisma, actual neume
connection/group, horizontal cut, physical bar, Latin text and syllable underlay,
and printed repeat reference. The 34 verse-bearing systems contain 75 physical
verse/return-panel bars, including seven cue-panel closing doubles. Full pages
and enlarged strips were inspected. Laetentur's two Cantate cuts were checked
again in a 4400-pixel page render: verse 1 `g!hih` touches, while verse 2
`g/hih` has a visible gap. Its verse-1 `mi(ghg)` and verse-2 `mi(gfg)` are also
distinct in the print and must remain distinct.

No clear raw-source transcription error was found in these eight verses; no
score body or opening was edited. Exsulta's printed **terminus** is retained.
Ave Maria proceeds directly between verses and prints Benedícta only after
verse 2. Its optional T.P. Alleluia in local 843 is an existing seasonal
addition, absent from this printed opening, and remains unchanged. Tollite's
F3 verse retains the low `dx` flats and final `dy` natural. Exsulta's C3, Ave
Maria's C4-to-C3 change, and Laetentur's C4 were checked explicitly.

The discrepancy ledger distinguishes source readings from application lyric
normalization. For example, the print/raw source has Exsulta `pot-é-stas`,
Ave Maria `gnó-sco` and `San-ctum`, Tollite `I-pse`, and Laetentur `o-mnis`;
application copies use `pot-és-tas`, `gnós-co`, `Sanc-tum`, `Ip-se` and
`om-nis`. Ligature/i-j/accent changes are likewise application spelling choices.
They do not count as GregoBase transcription corrections. The checker compares
each entire app body with the existing normalizer's result from the raw source.

Evidence and checks:

- `imported-review/inventory.json` inventories all 81 settings, with raw-file
  and canonical verse-body hashes, effective review status and existing opening
  comparison flags. All 81 raw files were available in the existing local cache;
  this pass did not fetch a new remote revision.
- `imported-review/batch-1/review.json` records exact source/app/opening hashes,
  per-system raw notation-group ranges, ordered physical bars, specific readings,
  the discrepancy ledger and hashes of all 36 enlarged evidence crops.
- `imported-review/batch-1/raw/` preserves the four exact cached GregoBase
  downloads used here. Canonical verse hashes use the importer's existing
  clef/newline/body convention, separate from raw-file hashes and normalized app
  file hashes.
- `node tools/check-imported-offertory-review.js` passes: source PDF, all four
  reviewed raw/verse/app bodies, preserved openings and evidence agree with the
  ledger; all 89 files in the protected manual/publication snapshot are unchanged.
  This is an integrity check, not independent proof of the musical readings.

`sources.json` now records **8 verified imported settings and 73 pending**.
Shared importer code and generated files were not edited or regenerated during
this batch, so the currently generated browser index/audit retains the previous
review totals until the next coordinated import. No changes were made to
`propers.js`, `tests/psalm-tone.test.js`, any manual/published score, or remote
GregoBase. No commit or worktree was created.

The next pending setting in book order is **Deus enim (17680), p.16**, whose
verses begin on p.17. It has not been certified by this batch; neither have
the remaining 72 pending settings.

## Continuing imported-source review, batch 2 — Deus enim, 2026-11-19

Continued with **Deus enim (17680), existing opening 979**. Its opening begins
on p.16 system 9 and continues through p.17 system 3. Verse 1 begins within
that third system and ends on system 8; its Ex tunc reference panel closes
on system 9 before verse 2. Verse 2 continues across p.18 systems 1–8, under
the next chant's running heading, through its complete dierum ending.

Both C3 verses were compared completely, including all low ledger notes,
repeated heads, skipped diamond descents, porrectus endpoints, liquescents,
quilismas, actual neume connections, accidental scope, Latin underlay,
horizontal cuts, physical bars and return references. The comparison covers
15 verse-bearing systems and 42 physical bars, including two cue-panel closing
doubles. Verse 1 prints Ex tunc; verse 2 prints Ex tunc vel Parata. The source
opening agrees with preserved local 979 in normalized text and pitches.

Specific checks include the initial `b/dd/eeddbev`; Decorem's `gx` flat;
the separate `jv` at praecinxit; the wide `ijIE` and `kkkvIG` descents;
excelsis's `fhhhhivhjIH`; Sancta's `highvFD`; Domine's low `behvFEfvDBe`,
following flat and cross-system continuation; the low `eb~` at in; and every
section of dierum through `hhf/hhhf/hhfhvEDe`. Connected pes/inclinata remain
distinct from actual separate virgas. The half-bar reset after the flat
melisma was checked without inventing a natural sign. Application consonant
boundary changes (in-du-it / ind-u-it, te-sti / tes-ti, fa-cta / fac-ta,
San-cta / Sanc-ta) are recorded separately from raw-source accuracy.

No clear raw-source transcription error was found. The exact raw snapshot,
canonical verse and app hashes, preserved-opening hashes, all 15 source strips,
per-system notation-group ranges, ordered bars and discrepancy ledger are in
`imported-review/batch-2/`. The read-only checker now validates both batches
and also compares their entire ordered bar ledgers with the raw GABC tokens.
It passes for all five newly reviewed settings and all 89 protected
manual/publication files. The musical review remains a visual source judgment;
the checker verifies its recorded evidence and identity.

The imported manifest/inventory now records **9 verified and 72 pending**.
Generated browser data and the existing generated antiphon audit were left
unchanged, pending a coordinated import. No shared importer, protected manual
or published score, opening antiphon, `propers.js`, or `tests/psalm-tone.test.js`
was edited. No remote write, commit or worktree was made.

Next pending in book order: **Tui sunt caeli (17695), p.18**. This batch does
not certify it or any of the remaining pending settings.

## Continuing imported-source review, batch 3 — Tui sunt caeli and Reges Tharsis, 2026-11-19

Completed the next two pending imported settings: **six printed verses** across
**32 verse-bearing systems and 73 physical bars**. This batch excludes the 23
manual/published settings and leaves all earlier review evidence intact.

| Setting | Imported ID / existing opening | Opening location | Verse location | Result |
| --- | --- | --- | --- | --- |
| Tui sunt caeli | 17695 / 1274 | p.18 s.9; p.19 s.1–4 | p.19 s.4–9; p.20 s.1–10 | All three verses match in this pass |
| Reges Tharsis | 17700 / 1147 | p.21 s.1–5 | p.21 s.6–9; p.22 s.1–9; p.23 s.1–3 | All three verses match in this pass; opening bar discrepancy documented |

System numbering includes every physical music system from the top of a page.
Shared systems retain their opening/verse boundaries. Tui's verse 2 begins
within p.19 s.9 and verse 3 within p.20 s.5. Reges's verse 2 begins within
p.22 s.2 and verse 3 within p.22 s.6. Its continuation beneath the next chant's
running heading on p.23 belongs to Reges through its complete sung response.

Dedicated visual passes covered every verse note/head and pitch, active clef,
accidental scope, repeated head, diamond, porrectus endpoint, liquescent,
quilisma, actual neume connection and grouping, horizontal cut, physical bar,
Latin text/syllable underlay and printed return. All Tui verses use C4; all
Reges verses use C3. No raw-source verse correction was needed.

Specific Tui checks included the high `k` virga at omnes; the skipped
`fhGFDegFE`, `hjIGh` and `jhjvIG` descents; both verse-1 flats; all of
misericordia and faciem tuam; the repeated flats and low D–C diamonds in cornu;
the i-quilismas and complete humiliasti figure; the flat at vulneratum; the
wide `hiH//E` at dispersisti; and every section of dextera through the complete
tera/tua/Domine ending. All three Iustitia cue panels, including their closing
doubles, are retained. Those three closing doubles are included in the 36-bar
Tui inventory.

Specific Reges checks included both gx flats in iudicium/tuum, the separate
virgas at iustitiam/gentes/servient, and the complete judicio descent. The
montes melisma retains its low D–B diamonds, `deddddb`, all repeated h heads
and its continuation across systems. Orietur has five then four repeated h
heads before the respective i–h–i figures. Pacis retains its low b and final
hd; extollatur retains `ev/df!hvEDdbd`. Luna continues onto p.23. Both long
iustitiam/mare cadences and every note of the final fully sung Omnes response
were compared. The response's `gxegFE` / `fd` ending is printed and differs
in underlay/grouping from the opening's `gxegFEfd` / `d`. Reges has no blank
cue panel between verses 1–2 or 2–3; its final response remains notated.

### Verified opening-only discrepancy: Reges Tharsis

After **adducént**, on **p.21 system 3**, raw GregoBase 17700 has
`cent :(gf) (;) et(hf)`. The PDF prints a **full bar**, and existing local
1147 already has `cent:(gf..) (:) et(hf)`. Keep 1147. No opening or verse score
was edited, and nothing was submitted to GregoBase.

The full bar was checked from physical ink rather than punctuation: on the
2010 × 2600 page render, column x=1422 has a continuous 111-pixel stroke from
y=794 to y=904, crossing all four staff lines (y=794/830/866/902).
`21-s3-opening.png` preserves the whole system and
`21-s3-adducent-bar.png` enlarges the stroke. The source and existing-opening
hashes, exact location, reading and resolution are in the discrepancy ledger
and in the hashed `antiphonReviews[1147]` source record. The automatic opening
audit compares text/pitches and would not detect this bar-length difference.
Both openings otherwise agree in normalized text and pitch sequence; their
existing rhythmic signs and intonation markers remain.

The separate application-normalization ledger records Tui's po-te-sta /
pot-es-ta, flu-ctu / fluc-tu, no-strum / nos-trum and a-sti / as-ti; Reges's
Sus-ci / Su-sci, a-bun / ab-un and sung O-mnes / Om-nes. Raw source underlay
matches the print in these cases. They are not GregoBase transcription errors.

`imported-review/batch-3/review.json` records raw-file/canonical-verse/app and
opening hashes, all 32 system strips plus two opening-detail images, exact crop
coordinates, raw notation-group ranges, ordered physical bars, specific source
readings and the discrepancy ledger. Raw downloads are snapshotted under that
batch's `raw/` directory; they came from the existing cache without a network
refresh. `preserved-files.json` records the shared/importer/opening/app files
preserved by this batch.

The read-only integrity checker passes for all three imported-review batches,
including exact normalized app bodies, all ordered bar ledgers and all 89
protected manual/publication files. These checks preserve the evidence and
encoding; they do not independently prove the visual musical readings.

The imported manifest/inventory now records **11 verified and 70 pending**.
Shared importer code, generated browser data/audit, all opening files, the
manual/published scores, `propers.js` and `tests/psalm-tone.test.js` were not
edited or regenerated. No remote write, commit or worktree was made.

Next pending in book order: **Iubilate Deo omnis terra (17704), p.23**. Its
previously recorded opening pitch discrepancy remains separate from its
still-pending verses; this batch does not certify them.

## Continuing imported-source review, batch 4 — Iubilate Deo omnis and Dextera Domini, 2026-11-19

Completed **four printed verses** across **18 verse-bearing systems and 37
physical bars**. The three closing doubles after blank return panels are
included. The 23 manual/published settings and all earlier evidence remain
outside this review batch.

| Setting | Imported ID / existing opening | Opening location | Verse location | Result |
| --- | --- | --- | --- | --- |
| Iubilate Deo omnis terra | 17704 / 718 | p.23 s.4–9; p.24 s.1 | p.24 s.2–9; p.25 s.1–2 | Both verses match in this pass |
| Dextera Domini | 14203 / 47 and 448 | p.25 s.3–6 | p.25 s.6–9; p.26 s.1–4 | Both verses match in this pass |

Physical-system numbering includes preceding chants, opening music and shared
systems. Iubilate verse 2 begins within p.24 s.5 after the first Quia panel;
the long veritas melisma and complete ending continue beneath the next chant's
heading on p.25. Dextera verse 1 begins within p.25 s.6, after the opening
double and change from C4 to F3. Its verse 2 starts at the end of p.25 s.9,
continuing beneath the Bonum est heading through p.26 s.4.

Every verse note/head and pitch was compared with the staff under the active
clef. Dedicated passes checked repeated heads, each diamond, skipped descents,
porrectus endpoints, actual connections, separate virgas, quilismas, liquescents,
accidental placement/scope, bars by physical length, horizontal cuts, Latin
text/syllable underlay and printed references. No raw-source verse correction
was needed.

Iubilate uses C3 throughout, without verse accidentals. Specific checks include
fecit nos's skipped G–E descent, the second nos's H–F descent, all high and
repeated k/l notes in populus, its quilisma/virga figures, and pascuae's
`hhhffhGE`. Verse 2 retains the complete est and Dominus figures, the half bar
within aeternum, the j quilisma and separate virgas at in saeculum, the four
upper h heads in saeculi, and every section of veritas across pp.24–25. The
final `de/de` syllables and both Quia panels remain complete.

Dextera stays in **F3 in both verses**, including the unusually high register
of verse 2. Verse 1 retains `dxcdcbdCB`, its low flat and C–B diamonds; the
separate i virga in invocavi; `eh~` at in; and the complete meus/est ending.
There is **no printed Non moriar panel after verse 1**: the source proceeds
directly to verse 2 after its double bar.

Verse 2 retains the k-flat before `fj!kv`, then the printed naturals before
versatus, et and the later factus continuation. High ledger heads and each
porrectus endpoint were checked explicitly: `j-l-K-J`, `lkl`, `jkj`, the
repeated l notes at mihi/salutem, and the high m at the start of the final
tem melisma. Both restored k-flats at that melisma's two sections are printed.
Factus preserves the wide `ijI//Fhh` drop. The final `jvHFhhhhf` has a skipped
H–F descent and four h heads before f. Source `[oll]`, `[0]` and line-layout
directives are engraving controls; they do not add pitches. Only the final
Non moriar panel is printed.

### Existing opening resolutions retained

Iubilate's previously resolved opening error remains unchanged: the raw source
has `te(e)` at the end of the **second** Iubilate, while the PDF and existing
718 have `te(d)` (p.23 s.6). Keep 718. The recorded source/local opening hashes
still match that resolution. This is separate from the newly verified verses.

Dextera's printed opening matches existing **47**, without a final Alleluia.
Existing **448** appends its seasonal Alleluia; preceding music agrees with 47.
The prior hashed seasonal-variant resolution remains current. Both mappings,
complete opening files, rhythmic signs and intonation markers are preserved.
Neither prior resolution was rewritten or treated as a new error.

The integrity checker now permits a recorded opening pitch mismatch only when
it also has a current, hash-matching resolved opening record. This covers these
two known cases while continuing to reject changed or unexplained mismatches.
It does not infer opening correctness from verse verification.

The application-normalization ledger records I-pse / Ip-se, pa-scu-ae /
pas-cu-ae and quo-ni-am / quon-i-am in Iubilate; sus-ce-pit / su-sce-pit and
fa-ctus / fac-tus in Dextera, plus the application accent normalization at
caderem. Raw underlay matches the print in these cases; note groups and their
order are unchanged. They are not GregoBase source corrections.

`imported-review/batch-4/review.json` records exact raw/canonical-verse/app and
opening hashes, 18 verse-system strips and five opening reference strips,
source coordinates, raw notation-group ranges, ordered bars, specific readings
and the discrepancy ledger. The exact cached raw files are preserved in its
`raw/` directory; no new remote revision was fetched. `preserved-files.json`
records the ten shared/importer/opening/app files preserved in this batch.

The checker passes for all four continuing batches and all 89 protected
manual/publication files. The imported manifest/inventory now records **13
verified and 68 pending**. Shared importer code and generated browser data/audit
were not regenerated. Opening files, manual/published scores, `propers.js` and
`tests/psalm-tone.test.js` remain unchanged. No remote write, commit or worktree
was made.

Next pending in book order: **Bonum est confiteri (14204), p.26**. Its verses
and all other pending settings remain uncertified by this batch.

## Continuing imported-source review, batch 5 — Bonum est confiteri and Benedictus es… in labiis, 2026-11-19

Compared **six printed verses** across **31 verse-bearing systems and 70
physical bars**. Bonum's three verses match and are verified. Benedictus's
three verses have been compared completely, but the setting remains pending:
one omitted two-note clivis needs the prepared local correction integrated.
The 23 manual/published settings were excluded.

| Setting | Imported ID / existing opening | Opening location | Verse location | Result |
| --- | --- | --- | --- | --- |
| Bonum est confiteri | 14204 / 1194 | p.26 s.5–7 | p.26 s.7–8; p.27 s.1–9; p.28 s.1–2 | Three verses match; verified |
| Benedictus es… in labiis | 18146 / 1317 | p.28 s.3–8 | p.28 s.8; p.29 s.1–9; p.30 s.1–8 | Complete review; correction ready, still pending |

Physical-system numbering includes preceding chants, opening music and shared
systems. Both openings were compared in normalized text and pitches and agree
with their preserved local files. Their rhythmic signs and intonation markers
remain. Bonum changes from C4 to C3 before its first verse and stays in C3.
Benedictus changes from C4 to C3 before verse 1; its verse 3 changes to C4 at
the double in p.29 s.9. The low `a+` before that change is a custos, not a sung
note. Both continuations under next-chant running headings are included.

The source passes covered every verse pitch/head centre, repeated head,
diamond, skipped descent, porrectus endpoint, actual connection, separate virga,
quilisma, liquescent, clef/accidental scope, physical bar, horizontal cut, Latin
text/syllable underlay and printed reference. There are no verse accidentals
in either setting.

Bonum's checks include the low `eb~` at magni; all h heads and i virgas at
nimis/profundae; both `f!gwhGF` figures; the low E–C diamond cadences; every
iniquitatem figure; the three high k heads at unicornis; `ki!jwkjkvJIji` at
malignantes; and every audivit/auris/tua melisma section through p.28 s.2.
The printed text **auris tua** agrees with the raw source and was retained.
None of its three endings prints a return cue panel; no editorial source cue
was invented. Its 13 systems contain 27 physical bars.

Benedictus verse 1 includes the **fully sung Aufer a plebe** section after
eum; it is not an unnotated cue. Its high i/k/l figures, all repeated heads,
the long testimonia and eum melismas, the two hf~ liquescents, and complete low
cedd/dc Domine ending were checked. Verse 2 retains hhhfg, the internal quarter
bar and f!hhh at tuorum, hhvGF at delectatus, the three e heads at omnibus,
and the complete low-c divitiis ending before the C4 change.

Verse 3's repeated viam/iniquitatis/amove phrases, all of de lege tua and
miserere mei, both judicia tua figures, the six f heads across tuorum, hgi at
cucurri and every cor meum section through its final f/dgFE were compared.
The final printed reference is **In labiis vel Aufer a plebe**, below the
staff. The source adds a structural `::` after that unnotated reference
(raw group 249); it is retained as GABC structure but **excluded from physical
bar counts**, because the print has only the final double at group 246.
Benedictus's 18 systems contain 43 physical bars, plus this structural separator.

### Verified verse error: missing final clivis at mei

On **p.30 system 3, verse 3, miserere mei**, the final **i** has a separate
descending **i–h clivis** in the PDF. Raw GregoBase 18146 has an empty group:

```gabc
me(hv//g!hwihi)i :()
```

The reviewed correction restores only those two missing notes:

```gabc
me(hv//g!hwihi)i :(ih)
```

The immediately preceding **tua**, p.30 s.2, prints the same figure and already
has the correct `a(ih)` in the raw source. Whole-system evidence plus enlarged
`30-mei-detail.png` and `30-tua-detail.png` record the direct comparison. This
is a source omission, separate from application resyllabification or accent
normalization.

Exact canonical verse hashes:

- Downloaded body: `06e2d76da03ce0c4233145d1f220f5d2e18d66ac5f147fd057639381f9c350a0`.
- Corrected body: `941762b4dedc113f253dda76c18e4793adc2e6b59e21422400864861760d146c`.

`imported-review/corrections.json` records the exact replacement, source and
corrected hashes, source location and evidence. The pure transform in
`tools/offertory-source-corrections.js` applies it only to that reviewed source
body, rejects any changed body, and leaves the already-corrected body unchanged
so an upstream fix cannot duplicate the notes. Header-only changes are allowed.
All four targeted correction-guard tests pass. The reviewable verse-only result
is `imported-review/batch-5/corrected/18146-verses.gabc`; it retains raw source
spelling and is checked against the corrected body hash.

**Integration is prepared, not applied.** The helper is not yet wired into the
shared importer; current generated/app files still contain the downloaded
omission. The original handoff required coordination before changing the shared
importer or regenerating those files. A coordination question is pending with
the user. Benedictus remains pending rather than inheriting a verified verdict
for the uncorrected body. No GregoBase edit was made; the user handles that.

Application differences recorded separately include Bonum's fa-ctae / fac-tae,
dis-per / di-sper, o-mnes / om-nes and ne-ctus / nec-tus; Benedictus's te-sti /
tes-ti, tem-ptum / temp-tum and o-bli / ob-li. They retain the ordered music
and are not source transcription corrections.

`imported-review/batch-5/review.json` records exact raw, app, corrected-preview
and opening hashes, source coordinates, all 31 verse strips plus seven opening
strips and two omission details, raw notation-group ranges, physical bars,
the structural separator and all findings. Raw cached downloads are preserved
without a network refresh. The read-only checker validates all five batches,
the prepared correction/preview, ordered physical bars and all 89 protected
manual/publication files. These checks preserve evidence identity and encoding;
they do not independently prove the visual readings.

Current imported totals are **14 verified and 67 pending**, including the
reviewed Benedictus awaiting correction integration. The nine shared/importer/
opening/app files recorded in this batch's preserved-file snapshot are unchanged.
No generated data, opening, manual/published source, `propers.js`, or
`tests/psalm-tone.test.js` was edited. No commit or worktree was made.

Next untouched setting in book order: **Domine vivifica (14323), p.31**.

## Imported-source review, batch 6 — 2026-11-19

User will apply the preceding Benedictus es correction on GregoBase. This
supersedes the earlier pending coordination question: no local importer hook
or regeneration is requested for that correction. The original cached body
and app copy remain unchanged and pending until the corrected upstream body
is retrieved and verified. No remote correction is claimed as completed.

Reviewed **Domine vivifica (14323), pp.31–32, two verses**, and
**Scapulis suis (14200), pp.32–33, three verses**, visually against the PDF.
No new raw-source correction was found. Both settings are now hash-bound
verified in the manifest. Their existing openings, local 109 and 294, agree
in pitches and were preserved.

Domine: eight verse-bearing systems and 16 physical bars. Both verses are in
C3 after the opening's clef change. The final Domine melisma, both printed
flats, repeated h heads, separate virgas, quilismas and F–D descents agree.
The blank Ut sciam return panel has two printed double boundaries, retained.

Scapulis: 13 verse-bearing systems and 28 physical bars. All three verses
remain in C3. The flat before offendas, high ledger notes in conculcabis,
leonem and draconem, and the complete eum melisma across the final three
systems agree. Blank Scuto panels occur after verses 1 and 3; none is printed
after verse 2. All printed doubles around those panels are retained.

Raw notation and application Latin normalization were distinguished. Examples
include Domine's le-ctum / lec-tum and di-scam / dis-cam, and Scapulis's
Sus-cep-tor / Su-scep-tor, no-ctur / noc-tur and a-spi / as-pi. These do not
change the ordered notes and did not prompt source edits.

`imported-review/batch-6/review.json` records findings, immutable raw source
snapshots, opening and app hashes, 21 verse-bearing system crops plus four
opening crops, source coordinates, raw notation-group ranges and ordered
physical bars. The read-only checker passes all six batches and all 89
protected manual/publication files. All eight shared/opening/app files in
the batch's preservation snapshot are unchanged. Evidence checks establish
file identity and encoding consistency; the musical verdict comes from the
visual comparison.

Current imported totals: **16 verified, 65 pending**, including Benedictus
awaiting a verified corrected import. No shared score regeneration, manual
source edits, remote edits, commit or worktree was made.

Next untouched setting in book order: **Levabo oculos (18147), p.34**.

## Imported-source review, batch 7 — 2026-11-19

Freshly downloaded Benedictus es (18146) after the user reported fixing it
on GregoBase. Its full canonical verse body is exactly the reviewed corrected
SHA-256 `941762b4dedc113f253dda76c18e4793adc2e6b59e21422400864861760d146c`.
The missing final `i :(ih)` of mei is restored with no other canonical verse
change. Saved the download in `batch-5/upstream/18146.gabc` and recorded its
whole-file hash and verification in the batch-5 ledger. The read-only checker
now validates this upstream evidence. The earlier instruction to keep local
integration prepared remains in force: local importer, cached original,
app score and generated index were not changed. Benedictus remains in the
local pending count until that corrected body is synchronized.

Reviewed **Levabo oculos (18147), pp.34–35, two verses**, and
**Miserere mihi (18148), pp.35–36, two verses**, against the scan. No new
raw-source corrections were found. Both are hash-bound verified in the
manifest. Their existing openings (1060 and 922) agree in pitches and remain
unchanged.

Levabo: seven verse-bearing systems, 13 physical bars. All verse music remains
in C4. The printed flats, separate virgas, quilismas, high l in me, full
exercebor melisma and low c/d ending agree. There is a blank Da mihi return
panel after verse 1 and none after verse 2; both printed boundaries of that
panel are retained.

Miserere: seven verse-bearing systems, 12 physical bars. Both verses remain
in C3 following the opening's clef change. Repeated notes in agnosco and meum,
the high l in malum, all of the final tuis melisma and both blank return
panels agree. No verse flats or naturals are printed. Source underlay and
application consonant/accent/j/i/ligature normalization were compared
separately, with examples in the discrepancy ledger.

`imported-review/batch-7/review.json` records raw snapshots, findings, opening
and app hashes, 14 verse-system crops plus seven opening crops, source
coordinates, raw notation-group ranges and ordered physical bars. All seven
batch integrity checks pass, including the corrected upstream Benedictus
evidence and all 89 protected manual/publication files. All nine shared,
opening and app files in the batch preservation snapshot remain unchanged.
These checks establish evidence identity and encoding consistency; musical
accuracy was assessed visually against the scan.

Current local imported totals: **18 verified, 63 pending**. The pending count
includes Benedictus, whose upstream fix is verified and awaits local sync.
No shared score regeneration, remote edits, manual/publication edits, commit
or worktree was made.

Next untouched setting in book order: **Exaudi Deus (18150), p.36**.

## Imported-source review, batch 8 — 2026-11-19

Reviewed **Exaudi Deus (18150), pp.36–37, two verses**, and
**Domine fac mecum (18151), pp.37–38, three verses**, against full-page
renders and enlarged systems. Found one source bar error in Exaudi; Domine's
three verses match. Existing openings 842 and 1369 agree in pitches and
were preserved.

### Exaudi Deus — extra full bar after animam

Verse 2, p.37 system 4, raw notation group 67: the source inserts a full bar
between animam and meam. The scan prints no full bar at the end of system 4
or at the beginning of system 5. The preceding half bar before animam is
printed and remains. The source correction is:

- Before: `mam(ivhiHG) (:) me(fh!ivHFhhvFEhiH//E)`
- After: `mam(ivhiHG) me(fh!ivHFhhvFEhiH//E)`

This removes only the added full bar; no notes change. Evidence includes
`37-s4.png`, `37-s5.png` and an enlarged `37-animam-detail.png`. A full-bar
search after the initial pitch pass exposed this discrepancy; the final
verdict supersedes that preliminary pass. All other verse pitches, repeated
heads, shapes/connections, flat signs, bars, underlay and return-panel
placement agree in this review. The final retribuendo retains all three lk
repetitions and the high m; all of its ending is present.

Raw canonical verse SHA-256:
`b50efb8ed45fb853dbfa57ef3f3ae8acc389c8ab4c35158a0f5b045f143d6690`.
Corrected canonical verse SHA-256:
`cb16baaf28828df58f5a6efae523f02203510737b6fb481063a19774f6c66ad7`.

The exact source-hash-guarded replacement is registered in
`imported-review/corrections.json`. Reviewable verse-only preview:
`imported-review/batch-8/corrected/18150-verses.gabc`. Local importer,
application score and generated data remain unchanged. This setting stays
pending until the correction is integrated. No remote edit was made; the
user handles GregoBase corrections.

Eight verse-bearing systems contain 16 physical bars. The raw source has
17 bars; its extra group 67 is explicitly recorded under `unprintedBars`
and excluded from the physical inventory. It is a source discrepancy,
not a structural blank-return-panel separator. The Intende panel after
verse 1 has both printed double boundaries; verse 2 has no blank panel.

### Domine fac mecum — verified

Eight verse-bearing systems, 17 physical bars. Verses 1 and 2 remain in C3;
the printed double with ::c4 establishes C4 before verse 3. The explicit
/[-1]a+ before that change is a custos, not a sung note. The flat signs,
including the repeated flat after the half bar within me, and the high
ledger notes in dederunt agree. All of the final gratis melisma, separate
virgas and skipped descents are retained. A blank Quia suavis panel follows
verse 1, with both physical doubles; none follows verses 2 or 3.

`imported-review/batch-8/review.json` records the complete findings, raw
snapshots, opening/app hashes, 16 verse-system strips, six opening strips,
one enlarged detail, source coordinates, raw group ranges and physical bars.
All eight batch integrity checks pass, including both correction previews,
the confirmed upstream Benedictus fix and all 89 protected manual/publication
files. Five correction-guard tests pass. All nine shared/opening/app files
in this batch's preservation snapshot are unchanged. Hash and encoding checks
establish evidence consistency; the musical verdict comes from the visual
comparison.

Current local imported totals: **19 verified, 62 pending**. Pending includes
Exaudi's prepared bar correction and Benedictus's verified upstream fix
awaiting local synchronization. No shared regeneration, manual/publication
edits, remote edits, commit or worktree was made.

Next untouched setting in book order: **Gressus meos (18153), p.39**.

## Imported-source review, batch 9 — 2026-11-19

Reviewed **Gressus meos (18153), pp.39–40, two verses**, and
**Laudate Dominum (14986), pp.40–41, three verses**, against full pages and
enlarged system crops. All five verses match in this pass; no new raw-source
correction was found. Existing openings 1099 and 899 agree in pitches and
remain unchanged.

Gressus: eight verse-bearing systems, 14 physical bars. Both verses remain in
C4. No blank return panels are printed; verse 2 includes the fully notated
Ut non dominetur passage. High l notes in dat and humiliasti, all flats,
the two dg/hjhhg figures, all five final melisma sections and complete Domine
ending agree. Raw underlay was distinguished from application consonant,
j/i and ligature normalization.

Laudate: 12 verse-bearing systems, 28 physical bars. F3 in the opening changes
to C3 at the printed double before verse 1; all three verses remain in C3.
The blank Omnia panel follows verse 1 only and retains both printed double
boundaries. Repeated h heads in omnibus/diis, the final aeternum liquescent,
all consolabitur sections, and the complete final Jerusalem melisma agree.
The four h heads after e, low c/e climbs, separate virgas and E–C descents
are retained. No verse accidentals are printed.

`imported-review/batch-9/review.json` records raw snapshots, findings,
opening/app hashes, 20 verse-system strips plus seven opening strips, source
coordinates, raw group ranges and ordered physical bars. Integrity checks
pass all nine batches and all 89 protected manual/publication files. All
nine shared/opening/app files in this batch's preservation snapshot remain
unchanged. These checks establish evidence identity and encoding consistency;
the musical verdict comes from visual comparison.

### Exaudi Deus re-download requested during this batch

User reported fixing Exaudi on GregoBase and explicitly requested a fresh
download. Downloaded 18150, saved immutable upstream evidence at
`batch-8/upstream/18150.gabc`, and refreshed `/tmp/offertoriale-cache/18150.gabc`.
Verified the only musical change is removal of the extra full bar after
animam. The upstream edit leaves two spaces where the bar was removed,
whereas the prepared preview has one. Recorded this exact inter-syllable
spacing difference and the actual upstream canonical SHA-256
`0b10d82d3b6c745d6c94a3829b63d0ce1d062eeec0114ec292be6c31e7d42d9d`.
The read-only checker verifies the exact difference, and the guarded correction
helper now accepts that specific already-corrected body without altering it.
Changed note bodies still fail closed. No arbitrary whitespace equivalence is
used. The original raw snapshot and corrected preview are preserved.

Local app scores and shared generated data remain unchanged. Both Exaudi
and Benedictus now have independently verified upstream fixes; local
application integration remains prepared. Current local imported totals:
**21 verified, 60 pending**, including those two pending local integrations.
No remote edits, manual/publication edits, shared regeneration, commit or
worktree was made.

Next untouched setting in book order: **Domine ad adiuvandum (18154), p.42**.

## Imported-source review, batch 10 — 2026-11-19

Reviewed **Domine ad adiuvandum (18154), p.42, one verse**, and
**Factus est (18155), pp.42–44, two verses**, against full pages and enlarged
systems. All three verses match in this pass; no new raw-source correction
was found. Existing openings 731 and 223 agree in pitches and remain unchanged.

Domine: three verse-bearing systems, five physical bars. C4 is retained.
The two ix flats in the verse, repeated g/f heads, all eduxit figures,
Miseriae descent and complete faecis ending agree. No blank return panel is
printed. The opening has ix flats and an iy natural; these are separate
from the verse's two flats.

Factus: nine verse-bearing systems, 17 physical bars. Both verses remain in
C4. Flats before non, after the half bar in donec and in virtute agree. All
convertar/deficiant figures, the four repeated g heads in supplantasti and
seven repeated k heads after l in disperdidisti agree. The two repeated
jkjkvJI figures and entire final cadence are present. The blank Sperabo
panel follows verse 2 only and retains both printed double boundaries.
Application xi-sti / xis-ti, ta-sti / tas-ti and di-sti / dis-ti boundaries
were distinguished from source music accuracy.

`imported-review/batch-10/review.json` records raw snapshots, findings,
opening/app hashes, 12 verse-system strips plus eight opening strips, source
coordinates, raw notation-group ranges and ordered physical bars. All ten
batch integrity checks pass, including both correction previews, upstream
fix evidence and all 89 protected manual/publication files. All nine shared,
opening and app files in this batch's preservation snapshot remain unchanged.
These checks establish evidence identity and encoding consistency; the
musical verdict comes from visual comparison.

### Correction to earlier accidental labels

During this pass I caught incorrect descriptive labels in batches 6, 8 and 9:
review prose had called x accidentals naturals. GABC x encodes a flat and y
a natural, confirmed against the Gregorio notation reference:
https://gregorio-project.github.io/gabc/details.html . The source tokens and
printed shapes had been retained, but the labels were wrong. Corrected those
specific prose labels in the ledgers and corresponding log summaries. The
11 exact before/after changes are recorded in
`imported-review/terminology-corrections.json`. No source notation, score,
evidence image or musical correction was changed. Earlier batches with
correct x-flat/y-natural descriptions were preserved.

Current local imported totals: **23 verified, 58 pending**, including Exaudi
and Benedictus with confirmed upstream fixes awaiting local integration.
No remote edit, source refresh, shared regeneration, manual/publication edit,
commit or worktree was made in this batch.

Next untouched setting in book order:
**Confitebor tibi... in toto (15006), p.44**.

## Imported-source review, batch 11 — 2026-11-19

Reviewed **Confitebor tibi... in toto (15006), pp.44–46, two verses**, and
**Eripe me de inimicis... Deus (18157), pp.46–47, two verses**, visually against
the scan. All four verses match in this pass; no new raw-source correction
was found. Existing openings 318 and 245 agree in pitches and remain unchanged.

Confitebor: 15 verse-bearing systems, 32 physical bars. Both verses retain
C4. The two matching initial Beati melisma sections and their flats, repeated
j/f heads, cor liquescent, full iucunda passage with its H–D skip, and all
legem tuam sections agree. The high k/l notes, paired quilisma figures and
complete tuam ending are present. The blank Vivifica panel follows verse 1
and has both physical doubles. The final Vivifica me reference is below the
staff, with no blank panel: raw group 197 is a structural closing :: and is
excluded from the physical inventory. Group 194 is the final printed double.
The encoding is retained. A separate evidence crop includes the full final
reference and printed closing double.

Eripe: nine verse-bearing systems, 23 physical bars. Both verses retain C3.
Every repeated captaverunt/fortes figure, all three lk repetitions and high m,
the low B/b and repeated d passages in meus/meum, the g-flat in the final
meae melisma, repeated kkh figures and complete final ggh agree. The blank
Libera me panel follows verse 1 and retains both printed double boundaries;
no blank return panel follows verse 2.

Application consonant, j/i and ligature normalization was recorded separately,
including source te-sti / application tes-ti, le-ctum / lec-tum, ca-pta /
cap-ta and fa-ctus / fac-tus. These did not prompt source music edits.

`imported-review/batch-11/review.json` records raw snapshots, detailed findings,
opening/app hashes, 24 verse-system crops, eight opening crops and one final
reference detail, source coordinates, raw group ranges and ordered bars.
The read-only checker passes all 11 batches, both prepared correction previews,
verified upstream fixes and all 89 protected manual/publication files. All
nine shared/opening/app files in this batch's preservation snapshot remain
unchanged. These checks establish evidence identity and encoding consistency;
the musical verdict comes from visual comparison.

Current local imported totals: **25 verified, 56 pending**, including Exaudi
and the earlier Benedictus with confirmed upstream fixes awaiting local
integration. No remote edit, source refresh, shared regeneration,
manual/publication edit, commit or worktree was made in this batch.

Next untouched setting in book order:
**Benedictus es... et non tradas (18158), p.48**.

## Imported-source review, batch 12 — 2026-11-19

Reviewed **Benedictus es... et non tradas (18158), pp.48–49, two verses**, and
**Improperium... et dederunt (15065), pp.49–51, three verses**, against full
pages and enlarged systems. All five verses match in this pass; no new
raw-source correction was found. Existing openings 408 and 486 agree in
pitches and remain unchanged.

Benedictus: seven verse-bearing systems, 15 physical bars. Both verses retain
C3, without verse accidentals. Repeated heads in Domine and iniquitatem,
the two jiih figures in iniqui, separate virgas, quilismas, liquescents and
final E–C descent agree. The blank Et non tradas panel follows verse 2 only
and retains both printed double boundaries.

Improperium: 14 verse-bearing systems, 32 physical bars. Verses 1 and 2 retain
C4. The printed double changes to C3 before verse 3, encoded as z0::c3;
z0 is a layout instruction. Verse 1's flat before que and natural before a
of animam agree. All repeated flats in verse 2, including both within the
second sedebant section and the adjacent in/me figures, agree. Low C/D
passages, high k/l notes, repeated j/h/g heads and complete sung endings
are retained. Verse 3's repeated i/h virgas, both j virgas on orationem and
Domine, I–G skip in Deus, and all repeated i heads of misericordiae tuae
agree. The blank Et dederunt panel follows verse 3 only, with both physical
double boundaries retained.

Application normalization was distinguished from source music accuracy:
pa-ctum / pac-tum, in-i-us-te / in-jus-te, quo-ni / quon-i and source/app
accent differences are recorded separately in the discrepancy ledger.

`imported-review/batch-12/review.json` records raw snapshots, detailed findings,
opening/app hashes, 21 verse-system crops plus ten opening crops, source
coordinates, raw group ranges and ordered physical bars. The read-only
checker passes all 12 batches, prepared correction previews, confirmed
upstream fixes and all 89 protected manual/publication files. All nine
shared/opening/app files in this batch's preservation snapshot remain
unchanged. These checks establish evidence identity and encoding consistency;
the musical verdict comes from visual comparison.

Current local imported totals: **27 verified, 54 pending**, including Exaudi
and the earlier Benedictus with confirmed upstream fixes awaiting local
integration. No remote edit, source refresh, shared regeneration,
manual/publication edit, commit or worktree was made in this batch.

Next untouched setting in book order:
**Eripe me de inimicis... Domine (18159), p.51**.

## Imported-source review, batch 13 — 2026-11-19

Reviewed **Eripe me de inimicis... Domine (18159), pp.51–52, two verses**, and
**Custodi me (18162), pp.52–53, three verses**, visually against full pages
and enlarged systems. All five verses match in this pass; no new raw-source
correction was found. Existing openings 411 and 1322 agree in pitches and
remain unchanged.

Eripe: seven verse-bearing systems, 15 physical bars. Both verses remain in
C4. The matching Exaudi/Velociter melismas retain both high l heads, high m
and separate virgas. Flats in tua, iudicio and the second exaudi agree;
all repeated j/h/g/f heads and the intres liquescent are retained. Both
printed Ad te panels and their double boundaries are present. The first
reference includes the printed ut infra instruction; parentheses within its
markup are text. After the second panel, the separately printed quia Deus
meus es tu is complete and matches its distinct lower ending. It was not
replaced with the opening's higher version.

Custodi: eight verse-bearing systems, 19 physical bars. All three verses
retain C4. The two identical opening Eripe melisma sections, following flat,
Domine's high k and separate virgas, both cogitaverunt/Domino figures and
all repeated mihi/meam cadences agree. The related second-verse figure has
an additional concluding i before runt; the third-verse figure does not
have that i before mi, matching the print. Vocem and its two sections retain
their virgas, repeated g heads and F–D skip. The blank Et ab hominibus panel
follows verse 3 only and retains both physical double boundaries.

Application jus-ti / source iu-sti, ju-di / iu-di and Domine accent changes
were recorded separately from source music accuracy.

`imported-review/batch-13/review.json` records raw snapshots, findings,
opening/app hashes, 15 verse-system crops plus six opening crops, source
coordinates, raw group ranges and ordered physical bars. The read-only
checker passes all 13 batches, prepared correction previews, confirmed
upstream fixes and all 89 protected manual/publication files. All nine
shared/opening/app files in this batch's preservation snapshot remain
unchanged. These checks establish evidence identity and encoding consistency;
the musical verdict comes from visual comparison.

Current local imported totals: **29 verified, 52 pending**, including Exaudi
and the earlier Benedictus with confirmed upstream fixes awaiting local
integration. No remote edit, source refresh, shared regeneration,
manual/publication edit, commit or worktree was made in this batch.

Next untouched setting in book order:
**Domine exaudi... ne avertas (18165), p.53**.

## Imported-source review, batch 14 — 2026-11-19

Reviewed **Domine exaudi... ne avertas (18165), pp.53–54, three verses**, and
**Terra tremuit (15229), pp.55–56, three verses**, against full pages and
enlarged systems. All six verses match in this pass; no new raw-source
correction was found. Existing openings 461 and 725 agree in pitches and
remain unchanged.

Domine: nine verse-bearing systems, 21 physical bars. All verses retain C4.
Both Ne avertas faciem tuam statements, high l/k descents, repeated j/h
heads and complete a me ending agree. Verse 2's matching manducare/panem
figures, two identical meum sections, low C/D passages and all final notes
are present. Verse 3's flat, virgas, repeated f heads, liquescents and G–D
skip in tempus agree. The final Et clamor blank panel retains both doubles.
Z- is a layout instruction. The existing resolved boundary is preserved:
the antiphon ends after perveniat, Ne avertas is verse 1, and only local 461
is mapped. Local 867 was not added, avoiding duplicate verse material.

Terra: 15 verse-bearing systems, 32 physical bars. All verses retain C4.
Repeated flats, high l virga in scutum, G–D and I–G skips, repeated j/h/g/f
heads and all sung Alleluia material agree. Verse 1 has a blank Dum resurgeret
panel after its complete Alleluia. Verse 2 includes the complete repeated
Alleluia, followed by the blank vel Dum alternative; both are retained.
Verse 3's final Alleluia differs from the earlier verses as printed, including
its liquescent and repeated df/hg figures, and its full ending is present.
All printed panel doubles and the final closing double agree.

Application j/i and consonant normalization, including Iu-/Ju-, fa-ctus /
fac-tus and eius/ejus, were recorded separately from source music accuracy.

`imported-review/batch-14/review.json` records raw snapshots, findings,
opening/app hashes, 24 verse-system crops plus five opening crops, source
coordinates, raw notation-group ranges and ordered physical bars. The
read-only checker passes all 14 batches, prepared correction previews,
confirmed upstream fixes and all 89 protected manual/publication files.
All nine shared/opening/app files in this batch's preservation snapshot
remain unchanged. These checks establish evidence identity and encoding
consistency; the musical verdict comes from visual comparison.

Current local imported totals: **31 verified, 50 pending**, including Exaudi
and the earlier Benedictus with confirmed upstream fixes awaiting local
integration. No remote edit, source refresh, shared regeneration,
manual/publication edit, commit or worktree was made in this batch.

Next untouched setting in book order:
**Angelus Domini descendit (18334), p.57**.

## Imported-source review, batch 15 — 2026-11-19

Reviewed **Angelus Domini descendit (18334), pp.57–58, two verses**, and
**Intonuit de caelo (19910), pp.58–59, two verses**, against full pages and
enlarged systems. All four verses match in this pass; no new raw-source
verse correction was found. Existing openings 789 and 869 agree in pitches
and remain unchanged.

Angelus: ten verse-bearing systems, 22 physical bars. Verse 1 begins in C4
and changes to C3 before Ecce, with the printed full bar represented inside
the combined c+:c3 notation. Verse 2 remains in C3. The flat in Euntes,
liquescents, repeated heads, separate virgas, skipped descents and low a/b
passages agree. The fully sung verse-1 Alleluia continues onto p.58 before
verse 2; the blank Sicut dixit panel follows verse 2 and retains both doubles.
The previously resolved opening text error remains separate: raw descédit
omits n, while the print and preserved local opening correctly have descendit.
The verses do not contain that error.

Intonuit: ten verse-bearing systems, 21 physical bars. Both verses retain
C4. The flat, liquescent, repeated heads, high l, separate virgas, quilismas,
skipped descents, repeated eripies figures and complete endings agree.
Six printed half bars occur inside sung notation groups (two in Diligam,
one each in the first meus, second meus, gentibus and iracundis); the
ledger explicitly includes all six. Both doubles around the first blank
Et apparuerunt panel are printed. The final Et apparuerunt cue is below
the staff, after one closing double. Raw group 92 is a structural separator
after that cue, retained in the encoding and excluded from physical bars.

Application j/i and eius/ejus normalization was assessed separately from
raw source music accuracy. No application score was regenerated.

`imported-review/batch-15/review.json` records raw snapshots, findings,
opening/app hashes, 20 verse-system crops, seven opening crops and one
final-cue detail, source coordinates, raw notation-group ranges and ordered
physical bars. The read-only checker now validates explicitly recorded bars
inside mixed notation groups as well as standalone bars. It passes all 15
batches, prepared correction previews, confirmed upstream fixes and all 89
protected manual/publication files. All nine shared/opening/app files in
this batch's preservation snapshot remain unchanged. These checks establish
evidence identity and encoding consistency; the musical verdict comes from
visual comparison.

Current local imported totals: **33 verified, 48 pending**, including Exaudi
and the earlier Benedictus with confirmed upstream fixes awaiting local
integration. No remote edit, source refresh, shared regeneration,
manual/publication edit, commit or worktree was made in this batch.

Next untouched setting in book order:
**Portas caeli (20496), p.60**.

## Remaining imported-source reviews, batches 16–38 — 2026-11-19

At the user’s request, each remaining two-setting batch ran in its own chat. All 23 sessions completed: **46 settings and 99 verses**, with 38 settings verified and eight correction-ready. All 81 imported settings have now received a verse review.

New correction-ready settings:

- **In die solemnitatis (17131)**: verse 2, terra melisma. Replace the malformed nested opening parenthesis with the printed cut between fgh and jjvHFghGF; preserve all pitches and neume shapes.
- **Deus, Deus meus (19813)**: verse 1, missing quam multipliciter et caro mea. The print has the complete intervening phrase, 34 heads, half bar after multipliciter and full bar after mea. Raw source skips this passage entirely. Restore only the omission, preserving the opening and all pre-existing verse notation.
- **Iubilate Deo universa (16870)**: verse 2, offeram notation syntax. Raw group 109 contains a nested opening parenthesis, ix(fh!jvjjjhivHG. Remove that stray parenthesis, keeping the printed flat and complete f–h–j virga–j–j–j–h–i virga–H–G figure. No pitch is added or removed.
- **Benedicite gentes (18710)**: verse 3, ore meo text, pitches and underlay. Print reads ad ipsum ore meo. Raw source omits ore and puts the printed o pes jk on me. Restore o(kxjk)re(j), then me(kxkj), the printed descending k–j clivis with renewed flat. The following o(kkk/iji) remains unchanged.
- **In te speravi (10582)**: verse 1 bar after confundar and verse 2 conspectu shape. Print has a half bar after confundar, not the raw full bar. In conspectu, remove unprinted W shape modifier. Preserve every pitch.
- **Sanctificavit (verses) (18131)**: verse 2, ostendens text. The print reads osténdens mirabília; raw osténdes omits n. Insert only n in the last syllable, keeping all notation and the opening unchanged.
- **Confitebuntur (19815)**: verse 1, full bar after sanctorum. Printed full bar after sanctorum is missing in raw source. Insert only (:), preserving all sung notes and opening.
- **O pie Deus (13358)**: verse 1: una text and quarter bar after moriens. Print reads una, not unas, and prints a quarter bar after moriens. All notes retained.

Protege Domine (18708) has a separate opening-only false quilisma on p.168 system 9. Existing local 195 matches the print and is preserved; a source/local hash-bound resolution was added. Its verses are verified. All prior opening resolutions remain intact.

Detailed findings, exact replacement text, GregoBase links, per-batch ledgers and evidence are in `imported-review/session-batches/report.md`. Each batch has its own raw snapshots, review.json, integration proposals, notes and validation; prepared corrections have full-source and verse-only previews. `threads.json` records all 23 chats and `completed.json` records their completion.

The combined read-only checker passes all 38 batches, 77 batch-reviewed settings and 89 protected manual/publication files. Four originally verified imports complete the 81. Six existing correction tests pass. All eight new corrections match exact previews, are idempotent and reject changed verse notation. Physical bars inserted or changed by corrections are compared to guarded corrected previews. Bars inside mixed groups and combined custos/bar/clef tokens are explicitly accounted for.

All application verse scores and existing openings remain unchanged. Consolidation preserved 199 source/application/protected files. A concurrent propers.js edit between batch16 and later snapshots is recorded in `external-shared-change.json`; all later snapshots agree with its current version, which this review work preserved. No remote edit, source refresh, application regeneration, manual/publication edit, commit or worktree was made.

Current local imported totals: **71 verified, 10 pending correction integration**. The ten are the eight new findings above, plus Benedictus es… in labiis (18146) and Exaudi Deus (18150), whose upstream fixes were already verified. The user’s instruction to keep local correction integration prepared remains in effect. **No untouched imported settings remain.**

## Fresh GregoBase correction verification — 2026-11-19

Checked 17 flagged settings by fresh direct GABC download: nine of ten verse corrections fixed; Benedicite gentes partly fixed. Of seven opening errors, Reges Tharsis and Protege Domine are fixed; five remain. Six settings still require changes. Detailed results: `imported-review/upstream-verification/2026-11-19T20-11-36-167Z/report.md`. Independent reinspection confirms the user’s Deus, Deus meus mul(ef); the earlier prepared mul(df) was wrong and is corrected in the prepared registry/preview records. Application scores remain unchanged; local integration remains pending.

## Final six upstream corrections verified — 2026-11-19

Fresh downloads of Benedicite gentes (18710), Iubilate Deo omnis (17704), Angelus Domini (18334), Erit vobis (17769), Populum humilem (17933) and Justorum animae (18173) each match the preceding live snapshot plus exactly the requested correction. All six corrections are verified; no additional changes were detected. **No known upstream corrections remain outstanding.** Six download-cache copies were refreshed, with backups and immutable new snapshots retained. Application scores/importer/generated files remain unchanged; local correction integration remains prepared. Evidence: `imported-review/upstream-verification/2026-11-19T20-21-05-180Z-six/verification.json`.
