# Offertory regression fixtures

These small, permanent fixtures are independent of the ignored working archives
under `data/offertory-verses/`. Keep them in Git when running the test suite.

- `proofread-baseline.json`: accepted exact source/verse hashes and bar sequences.
- `published/`: extracted GregoBase verse downloads and their comparison report.
- `imported-sources/`: original 18146 and 18150 sources, plus upstream-corrected
  18150, used to exercise correction guards. The original copies remain in the
  local review archive for its optional evidence checker.
- `historical-reviews/`: batch 2–6 source reviews and batch 1–6 rendering audits.
  Their hashes describe the historical versions checked, not necessarily later
  proofreading edits. Preserve their contents when moving them.

The maintained correction ledger lives in
[`data/offertory-verses/corrections.json`](../../../data/offertory-verses/corrections.json).
Its evidence references are relative to the optional local
`data/offertory-verses/imported-review/` archive.

The sibling `../offertory-feature-inputs.json` remains a retained generated
browser-audit input. Rebuild it with `node tools/build-offertory-feature-fixture.js`
when application transformations change.

## Review-status regression checks (19 November 2026)

`imported-review-baseline.json` retains source verse fingerprints from the
PDF-review ledgers and application-body fingerprints computed from those source
snapshots with lyric normalization. It was not generated from current runtime
scores. The original four verified settings were checked against their existing
manifest review fingerprints; the other 77 were checked against their retained
raw snapshot and review ledger. Ordinary tests therefore need no working archive.

Tests check all 81 imported settings individually, replacing the old assumption
that 77 must always remain pending. Verification requires both the reviewed raw
fingerprint and its normalized application body to agree. In particular, 15006
remains pending because its application grouping differs from the reviewed raw
body, despite the manifest's earlier verified source review. Existing pending
corrections are not newly certified.

Lauda anima and Gloriabuntur application bodies match the normalized proofread
originals exactly, using the simpler source grouping. The user confirmed that
the added cuts/fusion were unnecessary and render identically in Exsurge.
Those application-only variants and their test exceptions have been removed.
The original source hashes, saved publication checks and downloaded verse hashes
were verified before restoring the two runtime review flags to verified.
Regression tests reject reintroducing those variants or any unknown pitch,
rhythm, grouping or layout changes in an application copy.
