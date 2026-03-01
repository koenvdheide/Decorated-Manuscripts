/**
 * One-time script: upsert sm_00012 and sm_00015 into corpus_index.json
 * Run from project root: node scripts/update_corpus_index.js
 */
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'catalog', 'corpus_index.json');
const idx = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntries = [
  {
    record_id: 'sm_00012',
    collection: 'Süleymaniye Kütüphanesi — Süleymaniye Murakka Koleksiyonu',
    shelfmark: 'SM 00012',
    title: 'Muraqqaʿāt / \u0645\u0631\u0642\u0639\u0627\u062a',
    author: null,
    date_ah: 'before 1202 AH (terminus ante quem)',
    date_ce: 'before 1787\u201388 CE; probably c. 1750\u20131787',
    decoration_types: ['colored', 'gold_sprinkled', 'marbled', 'illuminated_margins', 'framing_system'],
    paper_categories: [
      'sar\u0131 m\u00fclevven + zeref\u015fan',
      '\u015feftali/somon m\u00fclevven + zeref\u015fan',
      'battal ebru (2 palet)',
      'bile\u015fik cetvelli'
    ],
    key_features: [
      'RICHEST SM sub-batch F album: five techniques (m\u00fclevven+zeref\u015fan \u00d72 colors, two-palette battal ebru, illuminated medallion, compound cetvelli)',
      'TWO-PALETTE BATTAL EBRU: blue-green monochrome (p008R) + polychrome red/green/blue (p010R) \u2014 deliberate two-scheme program',
      'Yellow + peach/salmon m\u00fclevven with zeref\u015fan overlay \u2014 m\u00fclevven+zeref\u015fan combined on both color variants',
      "Hamdullahi copy inscription: k\u0131t\u02bfa I+II inscribed 'Nukile min hatti\u2019l-\u015eeyh' (copied from \u015eeyh Hamdullah)"
    ],
    visual_confirmation: 'confirmed',
    primary_tradition: 'ottoman',
    workshop_centre: 'Istanbul',
    confidence: 0.93,
    catalogued_date: '2026-02-28'
  },
  {
    record_id: 'sm_00015',
    collection: 'Süleymaniye Kütüphanesi — Süleymaniye Murakka Koleksiyonu',
    shelfmark: 'SM 00015',
    title: 'Muraqqaʿāt / \u0645\u0631\u0642\u0639\u0627\u062a',
    author: null,
    date_ah: 'before 1202 AH (terminus ante quem); Karahis\u00e2r\u00ee content c. 963/1556',
    date_ce: '16th century (Karahis\u00e2r\u00ee k\u0131t\u02bfalar) to before 1787\u201388 CE (vakf)',
    decoration_types: ['colored', 'framing_system'],
    paper_categories: [
      'ye\u015fil m\u00fclevven',
      'terra kota m\u00fclevven (kiremit k\u0131rm\u0131z\u0131s\u0131)',
      'sade cetvelli',
      'zeref\u015fan (muhtemel, 0.65)'
    ],
    key_features: [
      'Ahmed Karahis\u00e2r\u00ee (d. 963/1556) attribution \u2014 potentially earliest calligraphic content in SM corpus; canonical Ottoman master',
      'TERRA COTTA m\u00fclevven (p016) \u2014 new color in corpus palette; darker and more earth-toned than any prior m\u00fclevven',
      'Mixed album: formally mounted decorated k\u0131t\u02bfalar (m\u00fclevven) AND loose undecorated me\u015fk practice sheets (pp020, 024)',
      '5 calligraphers: Karahis\u00e2r\u00ee, Abdullah b. H\u00fcseyin, Muhammed, S\u0131dk\u0131, Sal\u00fbt\u00ee; S\u00fcl\u00fcs+Nesih+Divani multi-script program'
    ],
    visual_confirmation: 'confirmed',
    primary_tradition: 'ottoman',
    workshop_centre: 'Istanbul',
    confidence: 0.90,
    catalogued_date: '2026-02-28'
  }
];

// Upsert each entry
for (const entry of newEntries) {
  const pos = idx.entries.findIndex(e => e.record_id === entry.record_id);
  if (pos >= 0) {
    idx.entries[pos] = entry;
    console.log(`Updated existing entry: ${entry.record_id}`);
  } else {
    idx.entries.push(entry);
    console.log(`Appended new entry: ${entry.record_id}`);
  }
}

idx.manuscript_count = idx.entries.length;
idx.generated = '2026-02-28';

fs.writeFileSync(indexPath, JSON.stringify(idx, null, 2), 'utf8');
console.log(`\nDone. corpus_index.json now has ${idx.manuscript_count} entries.`);
