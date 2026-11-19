# Unpublished manual offertory verse syllabification review

2026-11-18. Reviewed **13 chants / 24 verses** against the supplied 1935 PDF. Corrected **8 chants / 21 passages**, restoring **8 printed note heads** omitted with collapsed syllables. Five chants needed no changes. This review is specific to syllable underlay; it does not recertify the earlier whole-score reviews or user proofreading.

## Scope and safeguards

Excluded the ten chants already carrying a saved GregoBase ID or published URL: manual-039, manual-041, manual-044, manual-048, manual-050, manual-067, manual-077, manual-078, manual-079, manual-081. Re-read publication state and required the expected exact-file hash immediately before each ReviewStore save. Final state still has the same exclusions. Only authoritative verse sources and the copies/data/history written by ReviewStore were changed. Opening antiphons, alignment files, UI and tests were not edited. No upload or proofreading certification was performed.

PDF SHA-256: `c73d049f5ba90d3ec57a3f97e367a913ff100d64bb2a1f4454fc378ada6d1c1f`. Visual evidence: the then-generated verse-only source excerpts and their full continuations were read. Those obsolete crops have since been removed; the source PDF is retained. Use the [interactive proofreading tool](http://127.0.0.1:8766/review/) after running `npm run review:offertory` to inspect the current verses against the PDF. All eight changed exact-source scores were also rendered and visually inspected.

## Chant-by-chant findings

### manual-082 — Mirabilis Deus

Pages 141, 142, 143; 2 verse(s). **Corrected.** Reviewed both complete verses, including Péreant, faci-e, iu-sti, epuléntur and printed Benedíctus reference. Six collapsed words corrected. Consonantal i in iusti retained.

- Ex-súr-gat: distribute the three printed groups over three syllables (p. 142).
  - Before: `Exsúr(d)gat(e/fe/fih)`
  - After: `Ex(d)súr(e)gat(fe/fih)`
- pec-ca-tó-res: restore the second separate i punctum visible above ca (p. 142).
  - Before: `pecca(i)tó`
  - After: `pec(i)ca(i)tó`
- ex-súl-tent: move the first e of tent to súl (p. 143).
  - Before: `exsúl(de)tent,(e/hh/h/hh/hhh/jvIH/hvGF/E/f;)`
  - After: `ex(de)súl(e)tent,(hh/h/hh/hhh/jvIH/hvGF/E/f;)`
- con-spé-ctu: give the independent h to con (p. 143).
  - Before: `conspé(h/hfh/hhhh)`
  - After: `con(h)spé(hfh/hhhh)`
- de-lec-tén-tur: move the first independent h to lec (p. 143).
  - Before: `lectén(h/hhh/jvIH/hvGF)`
  - After: `lec(h)tén(hhh/jvIH/hvGF)`
- læ-tí-ti-a: separate the eg podatus on læ (p. 143).
  - Before: `lætí(eg/fh/hhhh/ih)`
  - After: `læ(eg)tí(fh/hhhh/ih)`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Ex·súr·gat De·us et dis·si·pén·tur in·i·mí·ci e·jus: et fú·gi·ant, qui o·dé·runt e·um a fá·ci·e e·jus. * Benedíctus. Pér·e·ant pec·ca·tó·res a fá·ci·e De·i: iu·sti, qui e·pu·lén·tur, ex·súl·tent, in con·spé·ctu De·i, de·lec·tén·tur in læ·tí·ti·a.

Exact file reviewed: `a9a210eb6cd79ddc5ccc381782899e0cf2c5c0be41e57e30f695d800ae377faf`. 300 → 301 note heads.

### manual-083 — Exsultabunt sancti

Pages 143, 144; 1 verse(s). **No change.** Reviewed the complete Cantáte verse. Existing Is-ra-el, fí-li-i, Si-on, ec-clé-si-a, e-um and su-o match the scan; no change.


Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Can·tá·te Dó·mi·no cán·ti·cum no·vum, can·tá·te Dó·mi·no cán·ti·cum no·vum: laus e·jus in ec·clé·si·a San·ctó·rum. Læ·té·tur Is·ra·el in e·o, qui fe·cit e·um et fí·li·i Si·on ex·súl·tent in Re·ge su·o.

Exact file reviewed: `a560d441e3733ddaa2212ad464213c684cf92239571956d4ab514764e00b40d9`. 220 → 220 note heads.

### manual-086 — Inveni David

Pages 147, 148; 2 verse(s). **No change.** Reviewed both verses. Pot-ens, cir-cú-i-tu, Pó-su-i, ad-ju-tó-ri-um, pot-én-tem, sæ-cú-lum, di-es and cæ-li already have separate printed syllables. No change.


Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Pot·ens es Dó·mi·ne et vé·ri·tas tu·a in cir·cú·i·tu tu·o: tu di·xí·sti: Pó·su·i ad·ju·tó·ri·um su·per pot·én·tem: et ex·al·tá·vi e·lé·ctum de ple·be me·a. * Manus. Et po·nam in sæ·cú·lum sæ·cu·li se·dem e·jus et thro·num e·jus sic·ut di·es cæ·li. * Manus.

Exact file reviewed: `26fd976ee0dc694453883923b3c4d15f047980dea9237a71ab6762b6029532ee`. 299 → 299 note heads.

### manual-089 — In virtute tua

Pages 152, 153; 2 verse(s). **No change.** Reviewed both verses and the sung Desidérium cue. pé-ti-it, tri-bu-í-sti, di-é-rum, gló-ri-a/gló-ri-am and tu-o already match. No change.


Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Vi·tam pé·ti·it et tri·bu·í·sti e·i lon·gi·tú·di·nem di·é·rum in sæ·cu·lum sæ·cu·li. * De·si·dé·ri·um Mag·na est gló·ri·a e·jus in sa·lu·tá·ri tu·o ma·gna est gló·ri·a e·jus in sa·lu·tá·ri tu·o: gló·ri·am et ma·gnum de·có·rem im·pó·nes su·per e·um. * Desidérium.

Exact file reviewed: `93e88238363c078cbb69f56edf335f929113bbc0fe0fcad673dbba4f124b732f`. 329 → 329 note heads.

### manual-090 — Desiderium animae

Pages 153, 154; 3 verse(s). **Corrected.** Reviewed all three verses. Restored In-ve-ni-á-tur ma-nus from C3 staff on p. 154. Printed gáu-di-o and the distinct return references retained.

- In-ve-ni-á-tur ma-nus: recover the printed underlay and the omitted h/hi/h groups; á has f followed by hhhi (p. 154, C3).
  - Before: `Inve(f)ni(d)á(f)tur(f) manus(hhhi)`
  - After: `In(f)ve(d)ni(f)á(f/hhhi)tur(h) ma(hi)nus(h)`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Vi·tam pé·ti·it et tri·bu·í·sti e·i, Dó·mi·ne. * Et voluntáte. Læ·ti·fi·cá·bis e·um in gáu·di·o cum vul·tu tu·o. * Posuísti. In·ve·ni·á·tur ma·nus tu·a óm·ni·bus in·i·mí·cis tu·is: déx·te·ra tu·a in·vé·ni·at o·mnes qui te o·dé·runt, Dó·mi·ne

Exact file reviewed: `08df91a6920a9f3d8ec3f85e855ed1b7ec4e0e9f7d9697f83b6aa66e1ffaf646`. 225 → 229 note heads.

### manual-091 — Afferentur proximae

Pages 155, 156; 2 verse(s). **Corrected.** Reviewed both verses and repeated phrases. Corrected only the second eructávit; retained the same e-ru-ctá-vit consonant allocation as the first printed occurrence. scri-bae and ae-tér-num preserve their diphthongs.

- Repeated e-ru-ctá-vit: separate d on ru from g/jhj on ctá (p. 155).
  - Before: `e(ffff)ructá(d/g/jhj)`
  - After: `e(ffff)ru(d)ctá(g/jhj)`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

E·ru·ctá·vit cor me·um ver·bum bo·num, e·ru·ctá·vit cor me·um ver·bum bo·num: di·co e·go ó·pe·ra me·a re·gi: lin·gua me·a cá·la·mus scri·bae ve·ló·ci·ter scri·bén·tis. Dif·fú·sa est grá·ti·a in lá·bi·is tu·is, dif·fú·sa est grá·ti·a in lá·bi·is tu·is: pro·pté·re·a be·ne·dí·xit te De·us in ae·tér·num. * Adducéntur.

Exact file reviewed: `2708f09b79ed1a90276a22661cccdab1d19c6c819f6d201988a28bf0d5333cbc`. 391 → 391 note heads.

### manual-094 — Domine Deus in simplicitate

Pages 159, 160, 161; 2 verse(s). **Corrected.** Reviewed both verses through dicéntes and Deus Israel reference. Corrected appáruit, aedificávit and the second Israel. Preserve ae as one syllable and printed spelling solemnitatem.

- ap-pá-ru-it: restore the independent j punctum on ap before the kj clivis on pá (p. 160).
  - Before: `appá(kj)`
  - After: `ap(j)pá(kj)`
- ae-di-fi-cá-vit: preserve ae as one syllable; distribute fg, d, f, fgf as printed (p. 160).
  - Before: `aedi(fg)fi(d)cá(ffgf)`
  - After: `ae(fg)di(d)fi(f)cá(fgf)`
- Is-ra-el: restore the second f punctum on ra (p. 160).
  - Before: `Isra(f)el(fgh/hg;)`
  - After: `Is(f)ra(f)el(fgh/hg;)`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Fe·cit Sa·ló·mon sol·em·ni·tá·tem in tém·po·re il·lo, fe·cit Sa·ló·mon sol·em·ni·tá·tem in tém·po·re il·lo: et pro·spe·rá·tus est et ap·pá·ru·it e·i Dó·mi·nus, De·us Is·ra·el. Ma·jé·stas Dó·mi·ni ae·di·fi·cá·vit tem·plum: vi·dé·bant o·mnes fí·li·i Is·ra·el gló·ri·am Dó·mi·ni de·scen·dén·tem su·per do·mum et ad·o·ra·vé·runt et col·lau·da·vé·runt Dó·mi·num di·cén·tes. * Deus Israel.

Exact file reviewed: `e26cdf3755a2428d348b4a2683bd33015a6b8e36e41248fe94e35348cfe547a6`. 426 → 428 note heads.

### manual-095 — Elegerunt Apostoli

Pages 161, 162, 163; 3 verse(s). **Corrected.** Reviewed all three verses, including the complete alternative verse. Corrected Angeli in verses 1 and 3, autem in verse 2, and disputántes/caedébant in verse 3. Printed final -ia of both Alleluia endings is retained on one note; au and cae remain diphthongs.

- Verse 1 An-ge-li: separate fh from the liquescent jh~ (p. 162).
  - Before: `Ange(fh/jh~)li(ij)`
  - After: `An(fh)ge(jh~)li(ij)`
- Verse 2 au-tem: preserve au; separate hj and ih~ (p. 162).
  - Before: `autem(hj/ih~)`
  - After: `au(hj)tem(ih~)`
- Verse 3 dis-pu-tán-tes: pu takes the initial f of the next group (p. 163).
  - Before: `dispu(d)tán(fghffg~)`
  - After: `dis(d)pu(f)tán(ghffg~)`
- Verse 3 An-ge-li: ge takes the efg figure formerly assigned to li (p. 163).
  - Before: `Ange(gf~)li(efg/ge/fvED;)`
  - After: `An(gf~)ge(efg)li(ge/fvED;)`
- Verse 3 cae-dé-bant: preserve cae; separate fh on cae from fg/gd on dé (p. 163).
  - Before: `caedé(fh/fg/gd)`
  - After: `cae(fh)dé(fg/gd)`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Vi·dé·bant fá·ci·em e·jus tam·quam fá·ci·em An·ge·li De·i: et con·cur·rén·tes la·pí·di·bus cae·dé·bant e·um o·rán·tem et di·cén·tem. * Dómine. Pó·si·tis au·tem gé·ni·bus Sté·pha·nus o·rá·bat di·cens: Dó·mi·ne Je·su, ne stá·tu·as il·lis hoc pec·cá·tum, qui·a né·sci·unt, quid fá·ci·unt, al·le·lú·ia. Sur·re·xé·runt au·tem qui·dam ex Ju·dǽ·is dis·pu·tán·tes cum Sté·pha·no et non pót·e·rant re·sí·ste·re Spi·rí·tu·i Sanc·to qui lo·que·bá·tur: Vi·dé·runt fá·ci·em e·jus tam·quam fá·ci·em An·ge·li et la·pí·di·bus cae·dé·bant e·um, al·le·lú·ia.

Exact file reviewed: `0ac11640b61798c255a1f959acee7bfdec4e95d4ed28e8047b70e4b9e9cb76ba`. 512 → 512 note heads.

### manual-096 — Afferentur S. Agathae post eam

Pages 163, 164; 2 verse(s). **Corrected.** Reviewed both complete verses through the Afferéntur reference. Corrected eructávit and the repeated addu-céntur. Original first Ad-du-cén-tur and lae-tí-ti-a remain; lae is one syllable.

- E-ru-ctá-vit: separate the c punctum on ru (p. 163).
  - Before: `E(d)ructá(c/d/fffvDC)`
  - After: `E(d)ru(c)ctá(d/fffvDC)`
- Repeated ad-du-cén-tur: du takes ghg formerly assigned to cén (p. 164).
  - Before: `addu(f)cén(ghg/hf/hvGE`
  - After: `ad(f)du(ghg)cén(hf/hvGE`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

E·ru·ctá·vit cor me·um ver·bum bo·num: di·co e·go ó·pe·ra me·a Re·gi. Ad·du·cén·tur in lae·tí·ti·a et ex·sul·ta·ti·ó·ne: ad·du·cén·tur in tem·plum Re·gi. * Afferéntur.

Exact file reviewed: `475ce787a85840cb1367276d947dd2ec4e5cb40f62de38ee8f3fbdef562ad900`. 312 → 312 note heads.

### manual-097 — Oratio mea

Pages 164, 165; 1 verse(s). **Corrected.** Reviewed the complete Probávit verse. Corrected praecéptis and discéssi. Printed e-ius remains two syllables; au-rum and prae-cé-ptis retain diphthongs.

- prae-cé-ptis: preserve prae; separate fh on prae (p. 165).
  - Before: `praecé(fh/hhhf)`
  - After: `prae(fh)cé(hhhf)`
- dis-cés-si: separate independent h on dis (p. 165).
  - Before: `discés(h/hhhf)`
  - After: `dis(h)cés(hhhf)`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Pro·bá·vit me Dó·mi·nus sic·ut au·rum: vi·as e·ius cu·sto·dí·vi et a prae·cé·ptis e·ius non dis·cés·si. * Ascéndat.

Exact file reviewed: `618848cfbc0137919c28eed9e9e683c6b3e256e5320664f55607dbcc7377fcc7`. 140 → 140 note heads.

### manual-098 — Confessio et pulchritudo

Pages 166, 167; 2 verse(s). **No change.** Reviewed both verses including continuation above Assumpta. Can-tá-te, o-mnis, be-ne-dí-ci-te, nun-ti-á-te, di-e/di-em and e-ius already match; no change.


Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Can·tá·te Dó·mi·no cán·ti·cum no·vum: can·tá·te Dó·mi·no o·mnis ter·ra. * Sánctitas. Can·tá·te Dó·mi·no: be·ne·dí·ci·te no·men e·ius: be·ne nun·ti·á·te de di·e in di·em sa·lu·tá·re e·ius. * Sánctitas.

Exact file reviewed: `35db76b3029894b89d835b85f42a42903194a499dd4ae599d9df3467f47f2f45`. 214 → 214 note heads.

### manual-099 — Assumpta est

Pages 167, 168; 1 verse(s). **No change.** Reviewed the complete Paradísi verse and sung Alleluia. Ma-rí-am, Vír-gi-nem, í-te-rum and pa-te-fá-cta match; final -ia remains one printed syllable. No change.


Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Pa·ra·dí·si por·ta per E·vam cun·ctis clau·sa est et per Ma·rí·am Vír·gi·nem í·te·rum pa·te·fá·cta est. * Al·le·lú·ia.

Exact file reviewed: `e69afd25c88f5368761bcbc499425faa3958b03f46fc3333e40ebb61b907b221`. 166 → 166 note heads.

### manual-102 — Viri Galilaei

Pages 172, 173; 1 verse(s). **Corrected.** Reviewed the complete Cumque verse. Restored in-tu-e-rén-tur; cae-lum, e-ún-tem, du-o, ad-sti-té-runt and iux-ta match. Initial i in iuxta is consonantal.

- in-tu-e-rén-tur: restore the second f punctum, giving in and tu one each before e (p. 172).
  - Before: `intu(f)e(f/ghg)`
  - After: `in(f)tu(f)e(f/ghg)`

Reviewed syllable inventory (middots mark encoded syllable boundaries, punctuation/reference labels retained):

Cum·que in·tu·e·rén·tur in cae·lum e·ún·tem il·lum: ec·ce du·o vi·ri ad·sti·té·runt iux·ta il·los in vés·ti·bus al·bis, qui et di·xé·runt. * Sic véniet.

Exact file reviewed: `9ed5556560ef05afadfdd9864d516aa98e58e97ded67d81affb49bcfa7e4463b`. 146 → 147 note heads.

## Ambiguities and deliberate retentions

No unresolved underlay ambiguity was left in a changed passage. The source prints two-syllable e-ius/ejus, consonantal i in iusti/iuxta, and a single final -ia in the sung Alleluia endings. These were retained. ae, au and cae were not mechanically divided. Consonant allocation follows the printed text and existing matching repetitions, including e-ru-ctá-vit. All accents, wording, repeat-reference text, bar sequences, and existing note modifiers were preserved.

## Validation

- All 13 reviewed sources pass focused consistency checks: exact-file hashes, complete verse counts, unchanged lyric text and bars, unchanged shape/accidental modifier counts, and byte-identical app verse copies.
- Pitch order is identical for nine chants; the only changes in the remaining four are the eight source-verified restored heads: manual-082 +1 (i), manual-090 +4 (h/hi/h), manual-094 +2 (j and f), manual-102 +1 (f).
- All eight changed exact-source verse-only scores rendered without errors and were visually inspected.
- Six focused workflow/safeguard tests pass (34 assertions).
- The broader three-file run has 55 passes and 17 failures: stale review/render fingerprints and old literal syllabification expectations, an alignment snapshot being maintained in the other chat, plus unrelated published-source differences. No historical fingerprints or tests were rewritten to conceal these.
- All eight changed bodies remain pending. User verse/opening checkboxes and publication state were not edited.

The companion JSON records every source hash, before/after passage, note count, exclusion and validation result.
