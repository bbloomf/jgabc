# Printed-system verse proofreading

The review desk interleaves 141 printed systems with 141 separate Exsurge SVGs
for the fifteen completed manual settings in batches 1–4. New draft settings
are not offered until their source-system alignment has been prepared.

`system-alignment.json` is the alignment source. Each entry records a complete
GABC snapshot and its hash, a PDF page and printed staff ordinal for every
system, the scan rectangle, and the ending character offset. The PDF hash and
coordinate frame are explicit: a full MediaBox render, 1623 × 2100 pixels.
This matters because this PDF's CropBox differs from its MediaBox. Cropping a
CropBox render with these coordinates would show the wrong music.

Staff ordinals and bar positions come from the existing batch review records;
lyric matching locates boundaries between syllables. Continuations inside long
melismas have explicit boundaries within the notation groups. The source
rectangles omit preceding antiphon music on shared first systems and retain
the printed verse text, custodes, clefs and repeat references. The same cached
full-page images are cropped in the browser, so no duplicate scan files are
needed. The full-page button is available for context.

Run `node tools/build-offertory-system-data.js` after changing the alignment
JSON. It updates the marked generated data block in
`offertory-review/gabc-map.js`, served by the existing local server. It changes
neither the PDF nor the authoritative verse GABC. The source snapshots remain
the reference for remapping offsets through later corrections; do not replace
a snapshot without recalculating its boundaries.

The renderer inserts a Z at each mapped boundary in a review copy, including
inside a notation group when a melisma spans systems. It lays out the full
score so that clefs, accidentals, continuation lyrics and custodes retain their
context, then uses Exsurge's one-SVG-per-line output. It verifies the SVG count
before replacing the previous preview. A wider virtual staff is used where
necessary to avoid extra automatic line wrapping; responsive display scales
the SVG without introducing another line.

Each generated character retains its original GABC offset. Synthetic Z marks
have no editable source position. The note-selection map accounts for header
removal and versicle/italic conversion as well as inserted line breaks. Small
and multiple text corrections remap boundaries through edit-distance alignment;
they do not move the break to another occurrence of a repeated melody.

The editor saves only the authoritative verse GABC. The review copy with Z
breaks can be downloaded separately. Verse checks belong to exact saved verse
hashes; they do not mark the GregoBase opening checked or imply that a full
submission has been reviewed. Aligning a transcription to the source makes
pitch, shape, grouping and bar errors easier to see; it does not certify that
the transcription is correct.
