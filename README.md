# Islamic Manuscript Decoration Analysis

An AI-powered research pipeline for discovering, cataloguing, and analyzing decorative programs in Islamic manuscripts — with a focus on Ottoman, Timurid, Safavid, and Mamluk traditions.

The project uses [Claude Code](https://claude.ai/code) with seven specialized AI agents to automate manuscript discovery in the YEK Turkish manuscript portal (~600,000 records), perform visual confirmation of catalogue claims, and produce structured catalog records with standardized multilingual terminology.

## Research Focus

**Decorated paper**:

- Gold-sprinkled (*zerefşân / serpme*) — subtypes: sieve (*kalbur zerefşanı*), brush (*fırça zerefşanı*)
- Gold-worked (*zerkâri / zer-endûd / zer-ender-zer*)
- Marbled (*ebrulu / ebrî*) — subtypes: floral (*hatip ebru*), stone/spotted (*battal ebru*), combed (*gel-git / taraklı ebru*)
- Colored/dyed (*mülevven / boyalı / renkli yaprak*)
- Silver-sprinkled (*gümüş yaldız serpmeli*)
- Stenciled paper — pigment applied through pre-cut masks; no standardized Turkish catalogue term
- Silhouetted paper — pattern impressed between sheets with pigmented intermediate sheet
- Impressed / relief paper — pattern pressed between engraved matrices without pigment; deformation only
- Block-printed paper — carved wooden block pressed onto paper

**Margin decoration**:

- *Halkâr* (shaded gold floral painting) — subtypes: hatched (*taramalı*), outlined (*tahrirli*)
- Illuminated borders (*kenar tezhibi / kenar suyu / dış pervaz*)
- Marginal drawings (*teşʿîr / tashʿīr* — fine-line gold drawings of animals, plants, landscapes)

**Framing and surface treatment**:

- Gold ruling (*cetvel*), chain borders (*zencirek*)
- Edge gilding (*yaldızlı kenar / ağız yaldızlı*)

## Pipeline Architecture

Four analysis pipelines, all orchestrated through Claude Code:

```text
Image analysis:
  Folio image(s) → motif-classifier → metadata-generator → qc-reviewer

YEK catalogue search:
  Search request → yek-search → yek-search (filter FPs) → qc-reviewer
                → visual-confirmation → motif-classifier → metadata-generator → qc-reviewer

  Visual triage variant (album screening):
    Collection list → yek-search (browse thumbnails) → quick positive/negative calls
                    → queue positives for IIIF follow-up or deep analysis

Comparative analysis:
  Research question → Explore → comparative-analyst → metadata-generator

Material/codicological questions:
  Physical question → codicology-agent → metadata-generator (if record needed)
```

The **visual triage** variant of the search pipeline is used for rapidly screening large album collections (e.g., murakka calligraphy albums) where full search + visual confirmation would be impractical. The agent browses YEK viewer thumbnails, makes quick positive/negative decoration calls, and queues positives for deeper analysis.

## Agents

Each agent is defined as a Claude Code custom agent in `.claude/agents/*.md`. They share knowledge bases from `.claude/skills/` and coordinate through `MEMORY.md`.

| Agent | Model | Role |
| --- | --- | --- |
| `motif-classifier` | Opus | Visual analysis of folio images; identifies decorative elements with standardized terminology |
| `codicology-agent` | Sonnet | Physical/material analysis: paper, binding, ruling, condition |
| `metadata-generator` | Sonnet | Produces catalog records with bibliography; exports to JSON, TEI-XML, IIIF |
| `comparative-analyst` | Opus | Cross-manuscript stylistic comparison for dating, attribution, and provenance |
| `yek-search` | Opus | Automated search of the YEK portal via Playwright MCP; handles false-positive filtering |
| `visual-confirmation` | Opus | Navigates YEK viewer, extracts IIIF image IDs, takes screenshots, verifies catalogue claims |
| `qc-reviewer` | Opus | Quality-control gate before any record is saved to `catalog/` |

### Skills (shared knowledge bases)

Agents draw on shared knowledge files in `.claude/skills/`:

| File | Purpose |
| --- | --- |
| [`terminology-reference.md`](.claude/skills/terminology-reference.md) | Standardized multilingual terminology — spelling variants, IJMES transliteration, Munsell color descriptions |
| [`yek-playbook.md`](.claude/skills/yek-playbook.md) | YEK portal navigation, search protocols, and false-positive detection rules |
| [`visual-identification-guide.md`](.claude/skills/visual-identification-guide.md) | Visual identification criteria for each decoration type |
| [`workshop-identification-guide.md`](.claude/skills/workshop-identification-guide.md) | Workshop and tradition attribution criteria |

### Output schemas

Each pipeline stage produces structured JSON conforming to a defined schema in `.claude/skills/`:

| Schema | Used by |
| --- | --- |
| [`output-schema-catalog-record.md`](.claude/skills/output-schema-catalog-record.md) | `metadata-generator` — manuscript catalog records |
| [`output-schema-folio-analysis.md`](.claude/skills/output-schema-folio-analysis.md) | `motif-classifier` — per-folio decoration analysis |
| [`output-schema-visual-confirmation.md`](.claude/skills/output-schema-visual-confirmation.md) | `visual-confirmation` — screenshot verification verdicts |
| [`output-schema-yek-search.md`](.claude/skills/output-schema-yek-search.md) | `yek-search` — search session results |
| [`output-schema-qc-review.md`](.claude/skills/output-schema-qc-review.md) | `qc-reviewer` — quality control reports |
| [`output-schema-comparative.md`](.claude/skills/output-schema-comparative.md) | `comparative-analyst` — cross-manuscript comparison |

## Project Structure

```text
.
├── .claude/
│   ├── agents/              # 7 custom agent definition files (.md)
│   └── skills/              # Shared knowledge bases and output schemas (see below)
├── catalog/
│   ├── *.json               # One catalog record per manuscript 
│   ├── corpus_index.json    # Master index of all catalogued manuscripts
│   ├── searches/            # YEK search sessions, visual confirmations, manuscript registry (gitignored)
│   └── temp/                # Intermediate folio-level analyses (gitignored)
├── corpus/
│   ├── yek_screenshots/             # Folio screenshots (gitignored)
│   └── visual_confirmation_batch*/  # Per-batch confirmation screenshots (gitignored)
├── examples/                # Reference images (e.g., silhouetted paper specimens)
├── memory/                  # Detailed search history log (gitignored)
├── output/                  # Generated reports and exports (empty until pipeline runs)
├── CLAUDE.md                # Full workflow documentation and agent delegation rules
├── MEMORY.md                # Live project state — coordination hub for all agents (gitignored)
├── .env.example             # Credential template (copy to .env and fill in)
└── LICENSE                  # CC-BY-4.0
```

### Gitignored data

Several directories are gitignored because their contents are either session-specific or regenerable:

- **`corpus/`** — Folio screenshots captured during `visual-confirmation` runs. Regenerable by re-running the agent against the YEK portal.
- **`catalog/searches/`** and **`catalog/temp/`** — Search session JSON files and intermediate folio analyses. Generated during pipeline runs.
- **`memory/`** — Detailed search history log, referenced from `MEMORY.md`.
- **`MEMORY.md`** — Live operational state, maintained by agents each session.

## Setup

### Prerequisites

- [Claude Code CLI](https://claude.ai/code) (latest version)
- [Playwright MCP server](https://github.com/microsoft/playwright-mcp) configured in Claude Code
- A free account on [portal.yek.gov.tr](https://portal.yek.gov.tr) (required for YEK searches)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/koenvdheide/Decorated-Manuscripts.git
   cd Decorated-Manuscripts
   ```

2. Configure credentials:

   ```bash
   cp .env.example .env
   # Edit .env and add your YEK portal username and password
   ```

3. Open Claude Code in the project directory:

   ```bash
   claude
   ```

4. Verify all seven agents loaded:

   ```text
   /agents
   ```

   You should see `motif-classifier`, `codicology-agent`, `metadata-generator`, `comparative-analyst`, `yek-search`, `visual-confirmation`, and `qc-reviewer` alongside the built-in agents.

5. Check project state: Claude will automatically read `MEMORY.md` to load current search history and pipeline status.

## Usage Examples

### Analyze a folio image

```text
Analyze this manuscript folio for its decorative program.
[attach image]
```

Claude chains: `motif-classifier` → `metadata-generator` → `qc-reviewer`

### Search the YEK portal for decorated manuscripts

```text
Search the YEK database for manuscripts with halkâr margin decoration.
```

Claude runs: `yek-search` (search + FP filtering) → `qc-reviewer` → `visual-confirmation`

### Compare two manuscripts

```text
Compare the illumination style of these two folios and suggest whether they share a workshop origin.
[attach images]
```

Claude uses: `comparative-analyst` (with `motif-classifier` for each image)

### Export a catalog record

```text
Generate a TEI-XML record for the analysis we just completed.
```

Claude uses: `metadata-generator` in TEI mode

### Triage a collection of manuscripts/albums

```text
Visually triage a large amount of manuscripts/albums for decorated paper. Browse thumbnails and make quick positive/negative calls.
```

Claude runs: `yek-search` (browse viewer thumbnails for each album, record decoration presence/absence, queue positives for follow-up)

### Continue a previous search session

```text
Continue the YEK search from where we left off — we finished Batch 1 (gold-sprinkled). Start Batch 2 (gold-worked: zerkâri, zer-endûd).
```

Claude reads `MEMORY.md` for current state and resumes the search plan.

## Current Research State

`MEMORY.md` is the project's live coordination hub — a gitignored file that every agent reads before starting work and updates after completing significant tasks. It prevents duplicate work across sessions and tracks:

- **Search history** — which YEK search term × field combinations have been completed, with result counts
- **Catalogued manuscripts** — all records in `catalog/`, with verdicts, confidence scores, and decoration types
- **Collection patterns** — learned cataloguing conventions per library (e.g., "Kastamonu `zerefshan` = binding FP")
- **Follow-up queue** — manuscripts requiring physical examination, higher-resolution imaging, or targeted folio navigation
- **Known issues** — IIIF quirks, pagination offsets, and other portal-specific problems
- **Session log** — chronological record of all pipeline runs

The master index of all catalogued manuscripts is in `catalog/corpus_index.json`. A separate `catalog/searches/manuscript_registry.json` tracks every manuscript encountered during searches (including those not yet catalogued).

## Terminology

All agents use primarily Arabic, Persian, and Ottoman Turkish technical terms following [IJMES transliteration conventions](https://www.cambridge.org/core/journals/international-journal-of-middle-east-studies/information/author-resources/ijmes-translation-and-transliteration-guide). Terms that deviate from IJMES conventions but are nevertheless commonly used in scholarship are also included.

The full terminology reference — including spelling variants, multilingual equivalents, and Munsell-based color descriptions — is in [`.claude/skills/terminology-reference.md`](.claude/skills/terminology-reference.md).

Key classification systems:

- **Motif types**: Based on Déroche (2005) with Ottoman extensions
- **Color nomenclature**: Munsell-based supplemented with historical pigment names
- **Layout types**: Following Gacek (2009)

## Data Sources

Manuscript records are drawn from [portal.yek.gov.tr](https://portal.yek.gov.tr) (Yazma Eserler Kurumu / Turkish Foundation for Manuscripts), which provides access to ~600,000 records across 252 collections in Turkey. The YEK portal requires free registration.

## License

This project is licensed under the [Creative Commons Attribution 4.0 International License](LICENSE) (CC-BY-4.0). You are free to share and adapt the material for any purpose, provided you give appropriate credit.
