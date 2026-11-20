# Graduale files: words missing an accent on GregoBase

Found on 19 November 2026 by running the lenient syllable pass
(`resyllabifyLatin` with `issues`, in `gabc-latin-normalization.js`) over every
`gabc/<id>.gabc`. Each word has three or more sung syllables and no accent on
either of the two before the last. All were confirmed in the raw GregoBase
download, so the fix belongs upstream. The prints were not checked.

| GregoBase ID | Chant | Source given | As transcribed | Should be | Edit |
| --- | --- | --- | --- | --- | --- |
| 2999 | O sola magnarum (hymn, v. 4) | Liber Usualis 1961, p. 456 | `De(f)um(gh)q<e>u{e}</e>(d)` | Deúmque | <https://gregobase.selapa.net/chant_edit.php?id=2999> |
| 3968 | Jesu dulcis memoria (hymn, last line) | Chants of the Church 1956, p. 99 | `sae(g')cu(h)la.(h.)` | sǽcula | <https://gregobase.selapa.net/chant_edit.php?id=3968> |
| 7366 | Stella cæli | none | `fi(k')li(j)us(i)` | fílius | <https://gregobase.selapa.net/chant_edit.php?id=7366> |
| 8041 | Alleluia Emitte Spiritum (altera melodia) | Graduale Romanum 1974, p. 249 | `Spi(f)ri(f)tum(f)` | Spíritum | <https://gregobase.selapa.net/chant_edit.php?id=8041> |
| 8129 | Cor arca legem continens (another chant), v. 5 | Liber Hymnarius 1983, p. 119 | `ge(ef)sti(d)at?(d.)` | géstiat | <https://gregobase.selapa.net/chant_edit.php?id=8129> |
| 10200 | Vexilla Regis (Inventio Sanctæ Crucis) | Antiphonale Monasticum 1934, p. 897 | `con(ghg)ci(f)nit(ed..)` | cóncinit | <https://gregobase.selapa.net/chant_edit.php?id=10200> |
| 10200 | same | same | `pur(ef)pu(dc)ra,(cd..)` | púrpura | same |
| 10579 | Vexilla Regis (Exaltatio Sanctæ Crucis) | Antiphonale Monasticum 1934, p. 1038 | `con(ghg)ci(f)nit(ed..)` | cóncinit | <https://gregobase.selapa.net/chant_edit.php?id=10579> |
| 10579 | same | same | `pur(ef)pu(dc)ra,(cd..)` | púrpura | same |
| 19929 | Alleluia Hoc erit signum fœderis | none | `fœ(f/hh/…)de(fe)ris(e.)` | fœ́deris | <https://gregobase.selapa.net/chant_edit.php?id=19929> |

All but `Deúmque` now have their accent in the local files, because
`download-gabc.js` supplies it (see `gabc-latin-accents.js`). `Deúmque` is
written with an elided vowel in tags, which that step leaves alone.

## Not upstream errors

Six local files lacked an accent only because `download-gabc.js` lowercases an
incipit that GregoBase has in capitals. Nothing needs changing on GregoBase;
the downloader now supplies these too.

| Local file | Chant | Local, now |
| --- | --- | --- |
| `gabc/336.gabc` | Exsultet gaudio | EXsúltet |
| `gabc/497.gabc` | Asperges me | Aspérges |
| `gabc/646.gabc` | Introit Sapientia reddidit | SApiéntia |
| `gabc/1286.gabc` | Introit Suscitabo | SUscitábo |
| `gabc/3445.gabc` | Gradual Sapientia ædificavit | SApiéntia |
| `gabc/12999.gabc` | Vexilla Regis (extra Tempus Passionis) | VExílla |

The same pass also lists about fifty hymn words written with an elided vowel
in italics (`Patr<i>e</i>`, `Parcénd<i>o</i>`). Those are deliberate and need
no change.
