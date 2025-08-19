function getCantica() {
  var r = [];
  r.push(
    "Benedictus",
    "Magnificat",
    "Nunc dimittis",
    "Canticum Trium puerorum",
    "Canticum Isaiae",
    "Canticum Isaiae (alterum)",
    "Canticum Isaiae 12",
    "Canticum Ezechiae",
    "Canticum Annae",
    "Canticum Habacuc",
    "Canticum Moysis (Deut 32, 1-18)",
    "Canticum Moysis.1 (Deut 32, 1-21)",
    "Canticum Moysis.2 (Deut 32, 22-43)",
    "Canticum Moysis (Exod)",
    "Canticum David",
    "Canticum Ecclesiastici",
    "Canticum Ecclesiastici (monastic)",
    "Canticum Jeremiae",
    "Canticum Judith",
    "Canticum Tobiae",
    "Philippians Canticle",
    "Canticum Isaiæ 33, 2-10",
    "Canticum Isaiæ 33, 13-18",
    "Canticum Ecclesiasticæ 36, 14-19",
    "Symbolum Athanasianum",
    "Canticum Isaiæ 40, 10-17",
    "Canticum Isaiæ 42, 10-16",
    "Canticum Isaiæ 49, 7-13",
    "Canticum Isaiæ 63, 1-5",
    "Canticum Oseæ 6, 1-6",
    "Canticum Sophoniæ 3, 8-13",
    "Canticum Habacuc 3, 1-6",
    "Canticum Habacuc 3, 7-12",
    "Canticum Habacuc 3, 13-19",
    "Canticum Jeremiæ 14, 17-21",
    "Canticum Threni 5, 1-7, 15-17, 19-21",
    "Canticum Ezechielis 36, 24-28"
  );
  return r;
}

function getCanticaVulgata() {
  return [
    'Benedictus',
    'Canticum Annae',
    'Canticum David',
    'Canticum Ecclesiasticæ 36, 14-19',
    'Canticum Ecclesiastici',
    'Canticum Ecclesiastici (monastic)',
    'Canticum Ezechiae',
    'Canticum Ezechielis 36, 24-28',
    'Canticum Habacuc',
    'Canticum Habacuc 3, 1-6',
    'Canticum Habacuc 3, 7-12',
    'Canticum Habacuc 3, 13-19',
    'Canticum Isaiae',
    'Canticum Isaiae (alterum)',
    'Canticum Isaiae 12',
    'Canticum Isaiæ 33, 2-10',
    'Canticum Isaiæ 33, 13-18',
    'Canticum Isaiæ 40, 10-17',
    'Canticum Isaiæ 42, 10-16',
    'Canticum Isaiæ 49, 7-13',
    'Canticum Isaiæ 63, 1-5',
    'Canticum Jeremiae',
    'Canticum Jeremiæ 14, 17-21',
    'Canticum Judith',
    'Canticum Moysis (Deut 32, 1-18)',
    'Canticum Moysis (Exod)',
    'Canticum Moysis.1 (Deut 32, 1-21)',
    'Canticum Moysis.2 (Deut 32, 22-43)',
    'Canticum Oseæ 6, 1-6',
    'Canticum Sophoniæ 3, 8-13',
    'Canticum Threni 5, 1-7, 15-17, 19-21',
    'Canticum Tobiae',
    'Canticum Trium puerorum',
    'Symbolum Athanasianum',
    'Nunc dimittis',
    'Magnificat'
  ]
}

function getCanticaNovaVulgata() {
  return [
    'Benedictus',
    'Canticum 1 Chr 29, 10-13',
    'Canticum 1 Petr 2, 21-24',
    'Canticum 1 Sam 2, 1-10',
    'Canticum Ap 4,11; 5, 9.10.12',
    'Canticum Ap 11, 17-18; 12, 10b-12a',
    'Canticum Ap 15, 3-4',
    'Canticum Azariæ (Dan 3, 26. 27. 29. 34-41)',
    'Canticum Cf. 1 Tim 3, 16',
    'Canticum Cf. Ap 19,1-2. 5-7',
    'Canticum Cf. Col 1, 12-20',
    'Canticum Dan 3, 52-57',
    'Canticum Eph 1, 3-10',
    'Canticum Ezechielis 36, 24-28',
    'Canticum Habacuc (Hab 3, 2-4.13a 15-19)',
    'Canticum Isaiæ (Is 2, 2-5)',
    'Canticum Isaiæ (Is 12, 1-6)',
    'Canticum Isaiæ (Is 26, 1-4. 7-9. 12)',
    'Canticum Isaiæ (Is 33, 13-16)',
    'Canticum Isaiæ (Is 38, 10-14. 17-20)',
    'Canticum Isaiæ (Is 40, 10-17)',
    'Canticum Isaiæ (Is 42, 10-16)',
    'Canticum Isaiæ (Is 45, 15-25)',
    'Canticum Isaiæ (Is 61,10-62, 5)',
    'Canticum Isaiæ (Is 66, 10-14a)',
    'Canticum Jeremiæ (Jer 31, 10-14)',
    'Canticum Jeremiæ 14, 17-21',
    'Canticum Jonæ (Jon 2, 3-10)',
    'Canticum Judith (Judt 16,1-2.13-15)',
    'Canticum Lam 5, 1-7.15-17.19-21',
    'Canticum Moysis (Deut 32, 1-12)',
    'Canticum Moysis (Exod)',
    'Canticum Phil 2, 6-11',
    'Canticum Sapientiæ (Sap 9, 1-6. 9.11)',
    'Canticum Sirach (Sir 36, 1-7. 13-16)',
    'Canticum Tobiæ (Tob 13, 2-8)',
    'Canticum Tobiæ (Tob 13,8-11.13-14ab.15-16ab)',
    'Canticum Trium puerorum',
    'Magnificat',
    'Nunc dimittis',
    'Philippians Canticle',
  ]
}

function getCanticaOptions() {
  var vulgata = new Set(getCanticaVulgata());
  var nova = new Set(getCanticaNovaVulgata());
  var all = new Set(vulgata);
  nova.forEach(val => all.add(val));
  const sorted = Array.from(all).sort();
  return sorted.map(val => `<option class="${vulgata.has(val) ? 'vulgata' : ''} ${nova.has(val) ? 'nova-vulgata' : ''}">${val}</option>`).join('');
}