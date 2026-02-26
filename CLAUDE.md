# Islamic Manuscript Decoration Analysis Project

## Overview

This project uses Claude Code to analyze, catalog, and research decorative programs in Islamic manuscripts — with a focus on Ottoman, Timurid, Safavid, and Mamluk traditions. The workflow combines computer vision analysis with domain-specific codicological and art-historical knowledge.

## Key Conventions

- **Memory**: All agents must read `MEMORY.md` before starting work and update it after completing significant tasks (searches, catalog records, QC reviews). This prevents duplicate work across sessions.
- **Terminology**: Always use correct Arabic, Persian, and Ottoman Turkish technical terms with proper transliteration (following IJMES conventions). Include the original script where relevant.
- **Transliteration**: Use the International Journal of Middle East Studies (IJMES) transliteration system for Arabic and Persian. For Ottoman Turkish, use modern Turkish orthography with diacritical marks where needed.
- **Output format**: All structured data should be output as JSON unless otherwise specified. Use UTF-8 encoding throughout.
- **File naming**: Catalog records use the pattern `{collection}_{shelfmark}.json` (e.g., `nuruosmaniye_03903.json`). Image files use `{collection}_{shelfmark}_{folio}_{description}.{ext}`.
- **Canonical unit**: The manuscript is the canonical record in `catalog/`. Each record may contain multiple folio-level analyses within it.
- **Image handling**: When analyzing images, always note resolution/quality limitations that may affect classification confidence.
- **Confidence scoring**: All classifications must include a confidence score (0.0–1.0) and a brief justification.

## Subagent Workflow

The typical analysis pipeline is:

```
User provides folio image(s)
    → motif-classifier (identify decorative elements with standardized terminology)
    → metadata-generator (produce catalog record with bibliography)
    → qc-reviewer (validate before saving to catalog)
```

**Folio analysis pipeline notes:**

- **Before starting**: confirm single folio or batch; whether codicological analysis is needed; and the collection + shelfmark for the record_id.
- **Image quality gate**: if motif-classifier flags image quality as insufficient for reliable analysis, stop immediately and ask the user whether to continue with low-confidence output or wait for a better image.
- **CHECKPOINT after motif-classifier**: present the analysis to the user before invoking metadata-generator. Highlight unusual/hybrid features, any Mughal-origin flags (out of scope for this project), and confidence scores below 0.5. Wait for user confirmation before creating the catalog record.
- **Conditional codicology**: invoke `codicology-agent` only if the user explicitly requested material analysis, or if motif-classifier flagged date or provenance ambiguity that physical evidence might resolve.

For catalogue searching:
```
User requests a search
    → yek-search (query YEK portal via Playwright MCP)
    → yek-search (filter false positives, categorize results)
    → qc-reviewer (re-check false positive filtering, independently)
    → visual-confirmation (check screenshots against catalogue claims)
    → motif-classifier (deeper analysis of confirmed decorated folios)
    → metadata-generator (produce catalog records with bibliography)
    → qc-reviewer (final validation)
```

**YEK search pipeline notes:**

- **After yek-search**: run `qc-reviewer` on the saved search session JSON to independently re-check false positive classification before proceeding to visual confirmation. This is a second pair of eyes, not the final QC gate.
- **CHECKPOINT after search**: present raw count, genuine count, false positive count and rate, any new false positive patterns not in the playbook, and notable collection clusters. Wait for user confirmation before visual confirmation.
- **Visual confirmation verdicts** — handle each type as follows:
  - `confirmed` / `probable` → queue for deep analysis
  - `inconclusive` → add to MEMORY.md Pipeline Status as "blocked: needs targeted folio nav or physical exam"; retain as a real candidate, do not discard
  - `not_confirmed` → ask user whether to discard or retain for follow-up
  - `contradicted` → mark as false positive; do not process further
  - `no_images` → retain as unverified candidate; note in Pipeline Status
- **`probable` verdict**: treat as equivalent to `confirmed` for cataloguing. A `probable` result may be catalogued immediately with its confidence score — do not artificially hold it back. Add to MEMORY.md Follow-up Items if higher-confidence imaging is still desired.
- **CHECKPOINT before deep analysis**: present confirmed/probable count and full verdict summary. Deep analysis (motif-classifier + codicology-agent) is optional — only proceed if the user explicitly requests it.

For comparative work:
```
User provides research question
    → explore (built-in, scan project files)
    → comparative-analyst (cross-reference across corpus)
    → metadata-generator (bibliography and structured output)
```

For material/physical questions:
```
User asks about paper, binding, ruling, etc.
    → codicology-agent (physical analysis with standardized terminology)
    → metadata-generator (if a catalog record is needed)
```

## Subagent Delegation Rules

- **Always** use `yek-search` when the user wants to search Turkish manuscript collections or the YEK portal.
- **Always** use `motif-classifier` first when analyzing a new image.
- **Always** pass motif-classifier output to `metadata-generator` for structured records and bibliography.
- Use `comparative-analyst` when the user asks about stylistic relationships, dating, or provenance.
- Use `codicology-agent` when questions concern material aspects (paper, binding, ruling) rather than decoration.
- **Always** run `qc-reviewer` before saving any record to `catalog/`. It has read-only access intentionally.
- Use `visual-confirmation` after YEK searches to verify catalogue claims against screenshots. It produces verdicts, not full analysis — hand confirmed results to `motif-classifier` for deeper work.

## Agents (7 total)

| Agent | Model | Role |
|---|---|---|
| `motif-classifier` | Opus | Visual analysis + standardized decoration terminology |
| `codicology-agent` | Sonnet | Physical/material analysis + standardized codicological terminology |
| `metadata-generator` | Sonnet | Catalog records + bibliography + format exports (JSON, TEI, IIIF) |
| `comparative-analyst` | Opus | Cross-manuscript stylistic comparison |
| `yek-search` | Opus | YEK portal search via Playwright MCP |
| `visual-confirmation` | Opus | Screenshot verification of catalogue claims |
| `qc-reviewer` | Opus | Quality control on all pipeline outputs |

## Data Directories

- `corpus/` — manuscript images organized by collection
- `catalog/` — JSON metadata records per manuscript
- `catalog/searches/` — YEK search session results (named `search_{date}_{term}.json`)
- `references/` — bibliography database and PDFs
- `output/` — generated reports, visualizations, exports
- `schemas/` — JSON schemas for metadata validation (schemas are also embedded in `.claude/skills/output-schemas.md`)

## Reference Typologies

The project uses the following classification systems:
- **Motif types**: Based on Déroche (2005) with extensions for Ottoman-specific forms
- **Color nomenclature**: Munsell-based descriptions supplemented with historical pigment names
- **Layout types**: Following Gacek (2009) terminology for page layout elements

## Decorated Paper Categories (from YEK research)

When classifying decorated paper and margin decoration, use these categories:
- **Gold-sprinkled** (serpme / zerefşân / yaldız serpme / altınlı kağıt). Subtypes: kalbur zerefşanı (sieve), fırça zerefşanı (brush)
- **Gold-worked** (zerkâri / zer-endûd / tamamı yaldız bezemeli / zer-ender-zer)
- **Marbled** (ebrulu / ebrî) — distinguish hatip ebru (floral) from battal ebru (stone/spotted) and gel-git/taraklı ebru (combed)
- **Colored** (mülevven / boyalı / renkli yaprak / lacivert)
- **Halkâr margins** (halkâr / halkârî margin painting). Subtypes: taramalı (hatched), tahrirli (outlined)
- **Illuminated margins** (tezhipli kenar / kenar tezhibi / kenar süsleme / kenar suyu / dış pervaz)
- **Marginal drawings** (teşʿîr / tashʿīr — fine-line gold drawings of animals, plants, landscapes in margins)
- **Framing systems** (cetvelli / altın cetvelli / zencirek — multi-line ruling and chain borders)
- **Silver-sprinkled** (gümüş yaldız serpmeli) — rare
- **Edge gilding** (yaldızlı kenar / ağız yaldızlı)

### Important: false positive awareness
When searching Turkish catalogues, these terms describe OTHER features, not decorated paper:
- "cetvelleri yaldızlı" → gold ruling lines only
- "başlığı tezhipli" → illuminated headpiece only
- "ebrulu mukavva" → marbled binding covers, not paper
