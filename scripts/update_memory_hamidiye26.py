#!/usr/bin/env python3
"""
One-shot script: update MEMORY.md after cataloguing hamidiye_00026.
Run from project root: python scripts/update_memory_hamidiye26.py
"""

MEMORY_PATH = "MEMORY.md"

with open(MEMORY_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update project status line
old_status = "**Current phase**: Tier 2 Sub-Batch B COMPLETE (2026-02-28). 66 corpus records. Dedup registry: 320 YEK IDs. **Next**: Tier 2 Sub-Batch C (Hamidiye + Pertevniyal, 6 albums)."
new_status = "**Current phase**: Tier 2 Sub-Batch C IN PROGRESS (2026-02-28). 67 corpus records. Dedup registry: 320 YEK IDs. **Next**: Remaining Tier 2 Sub-Batch C albums (Hamidiye + Pertevniyal)."
content = content.replace(old_status, new_status, 1)

# 2. Insert new Tier 2 Sub-Batch C section after Sub-Batch B section
sub_batch_b_end = """| tiem_02426 | confirmed (0.90) | marbled, framing_system | 4TH CONFIRMED HATIP EBRU in corpus. Spectacular pink+orange multi-petaled flowers on grey-green battal ground (front cover p001). MISMATCHED COVER PAIR: hatip ebru front vs. abstract leaf/petal ebru back (p015) — unique in corpus; possible repair/replacement. Mesk murakkasi: 21 harf meski in sulus-nesih, no ketebe or date. Interior margins plain cream/nohudi — triage-claimed mulevven NOT confirmed. YEK ID corrected 705363→705372. |

---

## Murakka Visual Triage"""

new_sub_batch_c = """| tiem_02426 | confirmed (0.90) | marbled, framing_system | 4TH CONFIRMED HATIP EBRU in corpus. Spectacular pink+orange multi-petaled flowers on grey-green battal ground (front cover p001). MISMATCHED COVER PAIR: hatip ebru front vs. abstract leaf/petal ebru back (p015) — unique in corpus; possible repair/replacement. Mesk murakkasi: 21 harf meski in sulus-nesih, no ketebe or date. Interior margins plain cream/nohudi — triage-claimed mulevven NOT confirmed. YEK ID corrected 705363→705372. |

---

## Catalogued Manuscripts -- Tier 2 Sub-Batch C (Hamidiye + Pertevniyal)

1 record catalogued (2026-02-28). corpus_index.json at 67 records.

| Record ID | Verdict | Decoration types | Notes |
| --- | --- | --- | --- |
| hamidiye_00026 | confirmed (0.97) | marbled, colored, framing_system | 5TH CONFIRMED HATIP EBRU — UNIQUE heart-shaped golden motifs (distinct from rosette/flower type in all other corpus specimens). Battal ebru on ALL 9 calligraphy pages (9 distinct sheets, distinct palette per page). Dual ebru subtype (hatip cover + battal margins) — paralleled only by tiem_02489. Pink/rose mulevven strips as writing surface for selected sulus lines (pp009 bottom, p011 top). No ketebe; undated; Hamidiye waqf provenance. YEK ID 265201. |

---

## Murakka Visual Triage"""

content = content.replace(sub_batch_b_end, new_sub_batch_c, 1)

# 3. Add follow-up item for hamidiye_00026
old_followup_end = "| tiem_02426 | Back cover (p015) marbling type requires closer physical examination or specialist consultation to confirm whether abstract leaf/petal pattern is a variant hatip ebru or a different ebru subtype (gel-git/hatip hybrid). Mismatched cover pair is unique in corpus; provenance research for repair/replacement history. | low | open |"
new_followup_end = """| tiem_02426 | Back cover (p015) marbling type requires closer physical examination or specialist consultation to confirm whether abstract leaf/petal pattern is a variant hatip ebru or a different ebru subtype (gel-git/hatip hybrid). Mismatched cover pair is unique in corpus; provenance research for repair/replacement history. | low | open |
| hamidiye_00026 | (1) Transcription of waqf inscription on p002 for provenance and date. (2) Transcription of circular seal stamp on p011 (calligrapher/owner seal). (3) Physical exam: confirm mulevven strip technique on pp009/011; resolve possible gel-git influence on p007 ebru. (4) Compare heart-shaped hatip motif with Topkapi and TIEM ebru specimens. (5) Contact GlobalDecoPaper ERC for hatip motif typology consultation. (6) No back cover image: confirm whether back cover exists and its decoration type. | medium | open |"""
content = content.replace(old_followup_end, new_followup_end, 1)

# 4. Update session log
old_log_end = "| 2026-02-28 | Tier 2 Sub-Batch B COMPLETE: 5 albums catalogued (66 total). QC passed (0 errors, 5 warnings). tiem_02481 (two-scheme battal + gel-git), tiem_02462 (3rd hatip ebru matched pair + pink margin strips), vahid_pasa_01220 (rare red serpme + Yesari), tiem_02489 (richest 5-color mulevven + Ayasofya prov.), tiem_02426 (4th hatip ebru, mismatched covers). |"
new_log_end = """| 2026-02-28 | Tier 2 Sub-Batch B COMPLETE: 5 albums catalogued (66 total). QC passed (0 errors, 5 warnings). tiem_02481 (two-scheme battal + gel-git), tiem_02462 (3rd hatip ebru matched pair + pink margin strips), vahid_pasa_01220 (rare red serpme + Yesari), tiem_02489 (richest 5-color mulevven + Ayasofya prov.), tiem_02426 (4th hatip ebru, mismatched covers). |
| 2026-02-28 | Tier 2 Sub-Batch C started: hamidiye_00026 catalogued (67 total). 5th confirmed hatip ebru — unique heart-shaped motifs. Battal ebru on all 9 calligraphy pages. Dual ebru subtype combination. All 11 IIIF images examined. corpus_index.json at 67 records. |"""
content = content.replace(old_log_end, new_log_end, 1)

with open(MEMORY_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("MEMORY.md updated successfully.")
