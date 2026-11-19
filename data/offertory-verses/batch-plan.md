# Missing full offertory verses: transcription plan

The entries below are historical transcription records. The old generated
comparison pages and scan crops were removed after proofreading. For current
scores use the [interactive proofreading tool](http://127.0.0.1:8766/review/)
(start with `npm run review:offertory`). Retained review JSON and renderer audit
records still describe the exact historical sources they checked. The retained
`build-offertory-comparison.js` commands can generate fresh offline comparisons
from current sources when needed.


Started 2026-11-17. Transcribe from the supplied 1935 scanned Offertoriale,
checking the actual notation and the corresponding Rice 2008 text when present.
The printed page numbers equal the PDF page numbers. Preserve the existing
opening antiphons; record differences rather than replacing their music.

Each item requires: all printed verses; notes, clefs, accidentals, neume groups,
barlines and repeat cues; existing-antiphon comparison; Rice comparison;
integrated rendering; focused tests; hashes tying review to exact source bodies.
Manual source files must survive regeneration without invented GregoBase IDs.

## Batch 1 — complete (2026-11-17)

- [x] #39 Benedictus qui venit, pp. 64–65 (boundary check p. 66), local 941
- [x] #41 Lauda anima, pp. 67–69, local 668
- [x] #44 Confitebor Domino, pp. 74–75, local 584
- [x] #48 Benedictus sit, pp. 81–83, local 1303

## Batch 2 — complete after source-inventory correction (2026-11-17)

- [x] #50 Domine convertere, pp. 84–85, local 848; two verses
- [x] #67 Domine Deus salutis, pp. 112–114, locals 542 and seasonal 987; three verses
- [x] #77 Gloria et honore, pp. 133–135 (verses start p. 134), local 407; two verses
- [x] Resolve the erroneous “#49 Sacerdotes Domini, pp. 83–84” inventory item:
  the source prints **#49 Intende voci**, whose verses end on p. 84 before
  #50. The alphabetical index on pp. 181–182 has no Sacerdotes Domini entry.
  Rice prints Sacerdotes Domini on p. 15 (PDF p. 19), with a simple verse from
  Pentecost; this does not establish a full-verse setting in the 1935 source.
  Local 645 remains simple-only. No replacement full music is invented.

Batch 2 therefore contains three authentic sets, seven verses. All continuation
systems and printed cues are included. See `../../../tests/fixtures/offertory/historical-reviews/batch-2-review.json` for source-system
coverage, exact-file hashes, and all 75 measured bars. Use the interactive
proofreading tool linked above for the current comparison.

## Batch 3 — complete (2026-11-17)

- [x] #78 Gloriabuntur, pp. 135–136, local 1375
- [x] #79 Posuisti, pp. 136–138, local 487
- [x] #81 Laetamini, pp. 140–141, local 786; check seasonal 870
- [x] #82 Mirabilis Deus, pp. 141–143, local 919

## Batch 4 — complete (2026-11-17)

- [x] #83 Exsultabunt sancti, pp. 143–144, local 33; one verse
- [x] #86 Inveni David, pp. 147–148, local 779; two verses
- [x] #89 In virtute tua, pp. 152–153, local 667; two verses
- [x] #90 Desiderium animae, pp. 153–154, local 722; three verses (all verses on p. 154; p. 155 begins Afferentur)

## Batch 5 — complete (2026-11-18)

- [x] #91 Afferentur (mode 4, proximae), pp. 155–156, local 1107
- [x] #94 Domine Deus in simplicitate, pp. 159–161, local 200
- [x] #95 Elegerunt Apostoli, pp. 161–163, local 462
- [x] #96 Afferentur S. Agathae (mode 1, post eam), pp. 163–164, local 768

## Batch 6 — complete (2026-11-18)

- [x] #97 Oratio mea, pp. 164–166, local 185
- [x] #98 Confessio et pulchritudo, pp. 166–167, local 105
- [x] #99 Assumpta est, pp. 167–168, local 3317
- [x] #102 Viri Galilaei, pp. 172–173, local 3315

The page spans include boundary pages; establish exact starts/ends visually.
The local matches above are inventory matches, pending musical comparison.
Appendix #103 Domine Deus meus in te speravi and #105 Misit rex have no local
opening antiphon and are outside this plan. Reviewing the 77 imported pending
sets is separate work; their status must not change as a side effect.

## Earlier handoff state (2026-11-17)

Batches 1–4 have been completed: fifteen manual sets, thirty-one printed verses.
Eight settings remain in batches 5–6. The erroneous Sacerdotes Domini
full-source item has been removed from the count, with the reason above.

Regeneration includes 81 imported sets plus fifteen manual sets. Batch 4 adds
four exact-body verified sets; the same 77 imported sets remain pending.
During this session manual-039 was edited concurrently, invalidating its earlier
review hash. The batch-4 regeneration therefore reports 18 verified and 78 pending
(77 imported plus manual-039), without altering that other batch’s review record. Authoritative manual sources
remain separate from generated files. Existing opening antiphons and original
style controls are preserved. The batch-1 comparison remains unchanged.

Build batch 2 with `node build-offertory-comparison.js --batch=2`. Its comparison
shows all three verses of #67, one-/two-/three-verse selections, and the preserved
seasonal opening 987 in addition to primary opening 542.


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

## Follow-up requirement from batch-2 user corrections

Do not add v mechanically at every ascent before inclinata. A connected pes
followed by diamonds is encoded directly (fhGF, fiHG, hiHF, ehFE); an added v
can turn its upper note into a separate virga and change the neume. Read
actual heads/connections, including a following clivis (Inclina hi/ih).
Read square-head centres against the local staff, not the top edge of a
head or the lower edge of a porrectus ribbon. Check every repeated head and
liquescent pitch; accidental letters refer to staff position under the
active clef (the batch-2 C3 flat is gx, not ix). See
batch-2-user-corrections.json for all changes. Earlier rendered count
agreement did not certify the reading and its pitch/shape review is superseded.

## Batch 3 completion evidence

#78, #79, #81 and #82 each print two verses. Exact verse spans are #78
p. 135 systems 7–8 through p. 136 system 7; #79 p. 137 systems 4–9 through
p. 138 system 3; #81 p. 140 system 8 through p. 141 system 7; #82 p. 142
systems 5–9 through p. 143 system 3. The preceding opening starts of #79
and #82 remain on pp. 136 and 141 respectively.

The 34 verse-bearing systems and 79 ordered physical bars (including five
blank cue-panel closing doubles) are recorded in `../../../tests/fixtures/offertory/historical-reviews/batch-3-review.json`.
The renewed pitch/connected-neume pass is recorded in
`batch-3-encoding-review.json`; final rendering evidence is in
`../../../tests/fixtures/offertory/historical-reviews/batch-3-render-audit.json`. Build the standalone comparison with
`node build-offertory-comparison.js --batch=3`; the default remains batch 1.

Gloriabuntur returns to the second Dómine in its opening. Explicit
`cueOccurrences` prevents the earlier Dómine from being marked in either
full or psalm-tone views. Mirabilis ends verse 2 without a printed cue; its
full integrated selection adds an editorial Benedíctus only through
`selectionCues`. Keep sung final notes in a separate group before `(::)`
so return insertion preserves them. All five local openings remain unchanged.


## Batch 4 completion evidence

#83 has one long printed verse; #86 and #89 have two each; #90 has three.
Exact verse spans: #83 p.143 systems7–9 through p.144 system4; #86 p.147
systems8–9 through p.148 system7; #89 p.152 systems5–8 through p.153 system5;
#90 p.154 systems2–9. Its opening starts on p.153; p.155 contains no continuation.

The 33 verse-bearing systems and all 75 physical bars, including six cue-panel
closing doubles, are recorded with PDF and exact manual-file hashes in
`../../../tests/fixtures/offertory/historical-reviews/batch-4-review.json`. Rendering evidence is in `../../../tests/fixtures/offertory/historical-reviews/batch-4-render-audit.json`.
Build the standalone offline comparison with
`node build-offertory-comparison.js --batch=4`. Batches1–3 comparisons are preserved.

#83 has no final printed return; its integrated selection adds Exsultabunt
editorially. #90 preserves the distinct Et voluntate and Posuisti returns;
only its full three-verse integration adds a final editorial Et voluntate.
The notated Desiderium cue after #89 verse1 remains in its source. Shortened
selections omit a terminal clef belonging to the next verse, preventing an empty
last staff; authoritative clef changes and custodes remain intact.


## Batch 5 completion evidence (2026-11-18)

Four settings contain nine printed verses: #91 two, #94 two, #95 three
(including the single alternative to its first two), and #96 two. Nineteen
manual sets now contain forty printed verses; only the four batch-6 settings
remain in this transcription plan.

Exact verse coverage: #91 p.155 systems4–9 through p.156 system6;
#94 p.159 system9 through p.160 systems1–9 and p.161 systems1–2;
#95 p.161 system8 through p.162 systems1–9 and p.163 systems1–5;
#96 p.163 system8 through p.164 systems1–7. All endings beneath next-chant
headings are included. The 47 systems and 114 ordered physical bars, including
four closing cue-panel doubles, are recorded in `../../../tests/fixtures/offertory/historical-reviews/batch-5-review.json` with
PDF, exact manual-file, source-strip and body-review fingerprints.

The third Elegerunt verse is offered by the printed rubric in place of both
earlier verses. The application labels its third selection “Alternative verse
(3)” and uses that verse alone in both full and psalm-toned styles. The
standalone comparison offers separate combined first-two and alternative
views. Editorial returns live only in selectionCues; the authoritative bodies
retain direct transitions and unlabelled endings. Rice p.31 shortens #94 verse1;
its existing simple adaptation remains unchanged.

The historical batch-5 comparison embedded every source continuation, exact GABC, fonts
and renderer, and opens offline. Rebuild with
`node build-offertory-comparison.js --batch=5`. Rendering evidence is in
`../../../tests/fixtures/offertory/historical-reviews/batch-5-render-audit.json`. Regeneration reports 100 full sets,
21 verified and 79 pending: the same 77 imported sources plus manual-039 and manual-041,
whose concurrent edits invalidate their earlier review hashes. No earlier
batch source, review hash, comparison HTML or opening was changed by batch5.

Regression: 155 passes, three unrelated failures after concurrent batch-1 edits
(manual-039 close-quilisma and Exsultemus/Laetemur text; manual-041 return cue). The batch5 source/selection and
alternative-style checks pass. No commit or worktree was created.


## Batch 6 completion evidence (2026-11-18)

The final four planned settings contain five printed verses: #97 one, #98 two,
#99 one and #102 one. All six batches are complete: 23 manual sets and 45 verses.
#97's opening begins on p.164, but its only verse ends on p.165; p.166 begins
Confessio without an Oratio continuation. Exact verse coverage: #97 p.165
systems5–9; #98 p.166 systems4–8 and p.167 systems1–2; #99 p.167 systems7–8
and p.168 systems1–3; #102 p.172 system7 and p.173 systems1–4.

All 22 verse-bearing systems and 42 ordered physical bars, including four
cue-panel closing doubles, are recorded in `../../../tests/fixtures/offertory/historical-reviews/batch-6-review.json` with source-PDF,
complete-system crop and exact-manual hashes. Separate source passes checked
text and underlay, head centres, every diamond, porrectus endpoints, ledger notes,
clefs/accidentals, actual connections, shapes, physical bars and horizontal cuts.
Rice's printed p.32 (PDF36) contents contain none of these four titles.
All four existing openings remain unchanged; no pitch discrepancy was identified
in the visual opening comparison.

The historical batch-6 comparison embedded all verse source excerpts, exact GABC and hashes,
fonts and renderer. It includes individual verses and every applicable integrated
selection. Assumpta retains its complete notated Alleluia; the other settings keep
their printed Ascendat, Sanctitas and Sic veniet returns. Final rendering evidence
is in `../../../tests/fixtures/offertory/historical-reviews/batch-6-render-audit.json`. Rebuild with
`node build-offertory-comparison.js --batch=6`.

Regeneration reports 104 full sets: 24 verified, 80 pending. The same 77 imported
sources remain pending, along with manual-039/041/044 whose earlier reviews no
longer match current source bodies. Earlier review hashes are preserved. The full
regression reports 161 passes and 5 failures in earlier-source expectations and
published-vs-local source identity; all 4 batch6 checks pass. Concurrent manual-044
edits and published-source registrations were preserved. Earlier comparison HTML, review files and all four local openings retain their
initial fingerprints; earlier crops were not written by this batch.
No worktree or commit was created.
