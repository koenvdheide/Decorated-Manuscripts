#!/usr/bin/env python3
"""
One-shot script: upsert hamidiye_00026 into corpus_index.json.
Run from project root: python scripts/update_corpus_index.py
"""
import json

INDEX_PATH = "catalog/corpus_index.json"

new_entry = {
  "record_id": "hamidiye_00026",
  "collection": "Süleymaniye Kütüphanesi — Hamidiye Koleksiyonu",
  "shelfmark": "00026",
  "title": "Muraqqaʿ / \u0645\u0631\u0642\u0639 (Murakka\u02bfa\u0302t / 11 K\u0131t\u02bfa)",
  "author": None,
  "date_ah": None,
  "date_ce": "17th\u201318th century (c. 1650\u20131750, undated)",
  "decoration_types": ["marbled", "colored", "framing_system"],
  "paper_categories": [
    "hatip ebru (kalp motifli \u2014 heart-shaped)",
    "battal ebru (9 ayr\u0131 tabaka)",
    "m\u00fclevven pembe \u015ferit",
    "\u00e7ok renkli cetvel"
  ],
  "key_features": [
    "5th confirmed hatip ebru in corpus \u2014 UNIQUE heart-shaped golden motifs (vs. rosette/flower type in all other corpus specimens)",
    "Battal ebru on ALL 9 calligraphy pages, each a distinct sheet with its own palette \u2014 one of the most systematic battal ebru margin programs in corpus",
    "Dual ebru subtype combination (hatip cover + battal margins) \u2014 paralleled only by tiem_02489 in corpus",
    "Pink/rose m\u00fclevven strips as writing surface for selected s\u00fcl\u00fcs lines (pp009 bottom, p011 top); Hamidiye waqf provenance; YEK ID 265201"
  ],
  "visual_confirmation": "confirmed",
  "primary_tradition": "ottoman",
  "workshop_centre": "Istanbul",
  "confidence": 0.97,
  "catalogued_date": "2026-02-28"
}

with open(INDEX_PATH, "r", encoding="utf-8") as f:
    idx = json.load(f)

existing_ids = [e["record_id"] for e in idx["entries"]]
if "hamidiye_00026" in existing_ids:
    pos = existing_ids.index("hamidiye_00026")
    idx["entries"][pos] = new_entry
    print(f"Updated existing entry at position {pos}")
else:
    idx["entries"].append(new_entry)
    print("Appended new entry")

idx["manuscript_count"] = len(idx["entries"])
idx["generated"] = "2026-02-28"

with open(INDEX_PATH, "w", encoding="utf-8") as f:
    json.dump(idx, f, ensure_ascii=False, indent=2)

print(f"Done. manuscript_count={idx['manuscript_count']}")
print(f"Last entry: {idx['entries'][-1]['record_id']}")
