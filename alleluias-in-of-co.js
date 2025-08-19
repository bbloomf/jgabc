const { transposeGabc } = require('./util');

const alleluia = {
  introit: [
    "(c4)<i>T. P.</i> Al(ixhi)le(h)lú(hgh)ia,(f_d) (,) al(fg)le(e!fg/hf/gvFE)lú(d!ewfef)ia.(ed..) (::)",
    "(f3)<i>T. P.</i> Al(e!f'h~)le(h_g)lú(hih)ia,(hhhf/fe.) (,) al(fh~)le(hghf)lú(fgf___)ia.(f.) (::)",
    "(c4)<i>T. P.</i> Al(e)le(f)lú(gh)ia,(g.) (,) al(gh)le(g.h!iwj/jvIH'G)lú(g_e/fgF~'E~)ia.(e.) (::)",
    "(c4)<i>T. P.</i> Al(f)le(f)lú(ef!ghF'D/gf)ia,(f.) (,) al(fg~)le(gv.!ffd/gvFE)lú(egff)ia.(fe..) (::)",
    "(c3)<i>T. P.</i> Al(df~)le(fef)lú(hf/hhh)ia,(hiHF.) (,) al(ef)le(gxfhe___!fwgvFE)lú(de!fvED'/e)ia.(ed..) (::)",
    "(c4)<i>T. P.</i> Al(d)le(f_e)lú(fgf)ia,(fffddc.) (,) al(d)le(ff)lú(fhG~'F)ia.(f.) (::)",
    "(c3)<i>T. P.</i> Al(e)le(fh)lú(hig/hih)ia,(h.) (,) al(hi)le(ijh/hvG'FE)lú(efe___)ia.(e.) (::)",
    "(c4)<i>T. P.</i> Al(f)le(fg)lú(gh~)ia,(hgh.) (,) al(hiwj)le(jv.ijH'G)lú(ghg___)ia.(g.) (::)",
  ],
  offertory: [
    "(c4)<i>T. P.</i> Al(fff_d/ff/ixhiH'GF'/fe~)le(ghGF'/ge/f_d,fge/fhGF'/fd/gf'/gff)lú(dc~)ia.(d/fff_d/fff!ded___5.) (::)",
    "(f3)<i>T. P.</i> Al(fg)le(e/hhhhiHE'//f/hhh_f/hihi)lú(fgf___)ia.(f.) (::)",
    "(c4)<i>T. P.</i> Al(f)le(e!fg/hgh)lú(hjg)ia.(gvFE/f_e//g_f/gf/fe.) (::)",
    "(c4)<i>T. P.</i> Al(ce/gf)le(ffff_c//fff_e/hg/hf/fe)lú(egF~'E~)ia.(e.) (::)",
    "(c4)<i>T. P.</i> Al(hg~)le(g!jjj/kj'/ki'/jvH'F/g.,fh/hgh//jki'/jh)lú(fgf___)ia.(f.) (::)",
    "(c4)<i>T. P.</i> Al(gf~)le(fff/hg/h_g)lú(fg!hvGF'/g)ia.(gf..) (::)",
    "(c3)<i>T. P.</i> Al(df)le(hv.0iijh.0/ji/jh/he,f!hhh/jvIH'GF'/hvGF'/gvFE')lú(e!f'g)ia.(fe..) (::)",
    "(c4)<i>T. P.</i> Al(hg~)le(gjg/hg/gf//g.h!iwj/k_i/jvIH'/iwj_i/hiH'G)lú(gh/jhi)ia.(hg..) (::)"
  ],
  communion: [
    "(c4)<i>T. P.</i> Al(fg~)le(e_d/fh//ghg/e!fg/hf/gvFE)lú(d!ewfef)ia.(ed..) (::)",
    "(f3)<i>T. P.</i> Al(hi~)le(gf/hg)lú(eg/igh)ia.(gf..) (::)",
    "(c4)<i>T. P.</i> Al(gh)le(gf/hvGF'/g)lú(egff)ia.(fe..) (::)",
    "(c4)<i>T. P.</i> Al(f)le(d.!ghG'F/ghg)lú(egff)ia.(fe..) (::)",
    "(c3)<i>T. P.</i> Al(gxdf)le(e/hvhf!gwhvGE'/fwgvFE)lú(de!fvED'/e)ia.(ed..) (::)",
    "(c4)<i>T. P.</i> Al(fg~)le(ixgiHG')lú(hg/gfg)ia.(gf..) (::)",
    "(c3)<i>T. P.</i> Al(f!gh)le(hih___/gih./fhgh./fge___5)lú(efe___5)ia.(e.) (::)",
    "(c4)<i>T. P.</i> Al(g)le(ghfg)lú(gh/jhi)ia.(hg..) (::)"
  ]
}

const getAlleluia = (part, mode) => {
  const [, alleluias] = Object.entries(alleluia).find(([alPart]) => alPart.startsWith(part.toLowerCase()));
  return alleluias[mode - 1];
}

const addPtAlleluia = (gabc, h) => {
  const al = getAlleluia(h.officePart?.slice(0, 2) || '', Number(h.mode));

  // now check that the clefs match:
  const regexClef = /\(([cf])([1-4])\)/;
  const gabcClef = gabc.match(regexClef);
  const alClef = al.match(regexClef);
  let alWithoutClef = al.slice(alClef[0].length);
  if (gabcClef[2] !== alClef[2]) {
    // transpose alleluia:
    const transpose = 2 * (Number(gabcClef[2]) - Number(alClef[2]));
    alWithoutClef = transposeGabc(alWithoutClef, transpose);
  }

  return gabc.replace(/(::\))\s*(\n|$)/, '$1\n' + alWithoutClef + '$2');
};

if(typeof exports=='object') {
  exports.getAlleluia = getAlleluia;
  exports.addPtAlleluia = addPtAlleluia;
}