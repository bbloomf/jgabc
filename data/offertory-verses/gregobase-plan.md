# Offertoriale review and GregoBase publication

## Open the review desk

From the repository, run `npm run review:offertory`, then open
http://127.0.0.1:8766/review/ . Keep that command running while editing.
The server uses only the local PDFs, GABC, fonts, and renderer. It binds to this
computer's loopback address; nothing is sent to GregoBase by the editor.

The review desk is now **verses only**. Select a chant and optionally filter by
source page. All six batches (23 chants, 210 printed systems) are available.
Every printed verse system appears directly above its matching
Exsurge system, with one SVG per system. Full-page buttons retain access to the
surrounding source. Click a rendered note to select its original GABC token,
including when a melisma continues across a printed line break.

Review-only `Z` breaks hold the lines to the book. The saved verse file and
publication draft are not given those forced breaks. Expand **Review copy with
Z line breaks** to inspect or download the fixed-layout review GABC. Source
positions follow note corrections without shifting click selections.

Ctrl/Cmd+S or **Save correction** writes the authoritative verse file and its
app copy. Browser drafts survive navigation and can be restored explicitly.
The previous saved file is retained in `publication/history/`. Conflicts protect
files changed by another editor. Changed verse hashes require another review.

The verse proofreader is **not** asked to edit or approve a GregoBase opening.
The page's review checkbox certifies only the exact saved verses. Opening
preparation and its final source check belong to a separate publication step;
a verse check alone does not make the complete score ready to submit.
Publication opening overrides, if prepared separately, live under
`publication/openings/` and never replace the app's reused antiphons.

## Edition and source policy

Publish a complete setting: the opening followed by every printed verse and
its printed repeat references. Use the 1935 Offertoriale, source 32, rather than
claiming the verses are from the Graduale. The opening melody begins with the
Vatican Gradual tradition and has no added Solesmes rhythmic signs.

The review desk first looks for an already-local Vatican antiphon through the
repo's `chantID.offertorium` index. Indexed pairs include 941/1676, 668/1585,
584/1562, 1303/1795, 848/1639, and 542/1545. An index entry alone is not a local
GABC file: those six Vatican counterpart files were absent at setup time.
Other Vatican chants do exist in the repo. When a matching Vatican file is
present it is reused directly; otherwise the opening starts from the local
antiphon with rhythmic dots, horizontal episemata, and ictus removed, and is
explicitly labeled for comparison with the scan.

Removing signs is not proof that bar lengths, neume grouping, intonation stars,
and all printed details match. Check the opening visually and correct its
publication draft. Do not change musical signs such as flats/naturals,
liquescents, quilismas, virgas, strophae, or orisci merely to remove rhythm.
Use the main opening only: optional seasonal additions after its final double
bar are excluded. Laetamini uses local 870 because the source includes Alleluia;
786 omits it. Domine Deus salutis uses 542, not the seasonal 987 ending.

The complete submission uses the printed verse files, not `prepareFull`'s
application output: no synthetic shortening cues, return custodes, or editorial
bold type are added to the verses. Printed respond positions are marked in the
publication opening and need the same visual check as the rest of that opening.

## Work through the batches

1. Review batch 1: #39 Benedictus qui venit; #41 Lauda anima; #44 Confitebor
   Domino; #48 Benedictus sit. These were the first transcriptions and earlier
   automatic/manual passes missed some shapes and cuts; inspect the revised
   source files rather than relying on an old comparison HTML.
2. Review batch 2: #50 Domine convertere; #67 Domine Deus salutis; #77 Gloria et
   honore. #49 in the book is Intende voci, not Sacerdotes Domini. There is no
   invented full setting for Sacerdotes Domini.
3. Review batch 3: #78 Gloriabuntur; #79 Posuisti; #81 Laetamini; #82 Mirabilis Deus.
4. Review batch 4: #83 Exsultabunt sancti; #86 Inveni David; #89 In virtute tua;
   #90 Desiderium animae.
5. Review batch 5: #91 Afferentur proximae; #94 Domine Deus in simplicitate;
   #95 Elegerunt Apostoli; #96 Afferentur S. Agathae post eam.
6. Review batch 6: #97 Oratio mea; #98 Confessio et pulchritudo;
   #99 Assumpta est; #102 Viri Galilaei.

The last two batches add 69 matched systems. Elegerunt includes all three
printed verses, including the alternative third verse. Only chants with
prepared system alignments appear in the review list. The main batch plan
remains in `batch-plan.md`.

For each setting, check every pitch, clef, accidental, visible note head,
virga/stropha, quilisma, group boundary, horizontal cut, bar length, lyric,
verse number, and repeat reference against all pages. Record page/syllable
uncertainties in the page's notes. Mark the verse-review checkbox after the saved verses have been reviewed.
The opening review is recorded separately during publication preparation. These checks are bound to exact file hashes and clear when the corresponding
saved score changes. They supplement the existing transcription review records.

## Prepare the handoff

Below **Your proofreading notes**, the **Ready to copy** section provides the
complete saved GABC and individual copy buttons for the submission fields.
Extent includes every book page from the opening to the final verse. Sequence
is the chant's order on its starting page and remains editable.
The prefilled new-chant link supplies source 32 and the starting page;
the plain new-score link is also available. GregoBase's
[form implementation](https://github.com/gregorio-project/GregoBase/blob/master/chant_edit.php)
accepts those two query parameters, but a POST for a new score immediately
inserts it rather than opening a prefilled draft. Copy the other fields and
save on GregoBase yourself. Afterwards, enter the real ID or chant URL in
**GregoBase ID** and save it; it is stored with this chant's review record.
The downloader reads that record on its next run, fetches the complete remote
setting and stores only its verses under the existing local key. All local
antiphon links and verse-selection cues remain in place. The original manual
file remains as provenance; clearing the ID returns imports to that local file.
Downloads use the existing exact-body review check, so changed music needs
another review. A failed or malformed download stops the import before output
files are replaced.

**Original Transcriber** starts with `Benjamin Bloomfield (w/ ChatGPT)`,
with no separate opening credit. It is editable and is included
in the copied complete GABC.

Use **Copy complete GABC** or **Download GABC** for the current saved score.
**Download all drafts** builds a ZIP of the current complete files, a metadata
manifest with readiness and provenance, and this plan. The button includes
unchecked work as clearly identified drafts; it does not certify or submit it.
For an on-disk packet run `npm run export:offertory-gregobase`. Draft GABC,
ZIP and manifest outputs are generated on demand; stale exports have been
removed from the checkout. The files below distinguish generated exports
from the saved review state that is retained in the checkout:

- `publication/gabc/manual-NNN.gabc`: complete, non-rhythmic draft.
- `publication/offertoriale-gregobase-drafts.zip`: the complete handoff packet.
- `publication/manifest.json`: source pages, mode, provenance, exact hashes,
  transcriber, publication checks, and any published link.
- `publication/review-state.json`: your saved checks, notes, and GregoBase links.

The generic manual-transcription date in a GABC header is not a person's name.
The submission uses `Benjamin Bloomfield (w/ ChatGPT)` as Original Transcriber.
Regenerate the packet after every correction; do not upload an older export.

## Add each score yourself

GregoBase's participation guidance describes the fields and the distinction
between Vatican and Solesmes versions:
https://gregobase.selapa.net/?page_id=18 . The new-score page is
https://gregobase.selapa.net/chant_edit.php and requires login. Existing source
32 records use the version **Offertoriale 1935** (for example score 14211), while
the source is labeled **Vatican-Offertoriale**.

For each checked setting:

1. Search the current source 32 index and chant incipit to avoid a duplicate
   added since the inventory: https://gregobase.selapa.net/source.php?id=32 .
   An opening-only record from the Graduale is not a duplicate of the full
   Offertoriale setting, but record that relationship in the remarks.
2. Log in and open **Add scores**. Paste the complete saved GABC into **Score**.
   Put all offertory verses in Score, not the field intended for subsequent
   verses of hymns with identical music.
3. Set the incipit, Offertorium usage, and numerical mode from the packet.
   Match the existing **Offertoriale 1935** version used by this source, without
   rhythmic signs. Select the existing 1935 Offertoriale source 32; enter the
   starting printed page and extent through the last printed page. Enter actual
   Original Transcriber. Do not label the full setting simply
   as Solesmes or as a 1908 Graduale score.
4. Use GregoBase's own preview before saving. Check clef changes, long melismas,
   verse labels, and text-only repeat alternatives. Its Gregorio renderer can
   differ from the local Exsurge preview. Resolve any discrepancies first.
5. You perform the actual addition. Save its new ID or chant URL in the review
   desk to register future verse downloads. Reopen that record and compare/download the
   resulting GABC before marking it proofread.
6. Run the verse downloader to import the registered score, then compare its
   extracted verses with the reviewed source. The manual source is retained;
   changed downloaded bodies do not inherit its review.

No editor button logs in, submits, proofreads, or sends messages on your behalf.
