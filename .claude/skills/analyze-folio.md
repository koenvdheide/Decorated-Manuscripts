# Analyze Folio Pipeline

Step-by-step orchestration for analyzing manuscript images.
Follow these steps in order. Pause at every CHECKPOINT.

## Before You Start

Read `MEMORY.md`. Check the Catalogued Manuscripts table.
- If this manuscript already has a record, check whether the specific folio has been examined.
  If it has, ask the user whether to update the existing record or skip.
- Confirm with the user before proceeding:
  - Single folio or batch of images?
  - Is codicological/material context needed?
  - Known collection and shelfmark for the record_id?

---

## Step 1 — Visual analysis

Invoke `motif-classifier` on each image. One analysis per folio.

**If image quality is flagged as too low for reliable analysis:** Tell the user immediately.
Ask whether to continue with low-confidence output or wait for a better image.

---

## CHECKPOINT A — Review visual analysis

Present the motif-classifier output to the user. Highlight:
- Any unusual or hybrid features that may need specialist review
- Any Mughal-origin flags (out of scope for this project — see motif-classifier guidelines)
- Confidence scores below 0.5

**Wait for user confirmation before creating the catalog record.**

---

## Step 2 — Material context (conditional)

Invoke `codicology-agent` on the same image(s) only if:
- The user explicitly requested material analysis, or
- motif-classifier flagged date or provenance ambiguity that physical evidence might resolve

---

## Step 3 — Create catalog record

Invoke `metadata-generator` with:
- motif-classifier output (required)
- codicology-agent output (if Step 2 was run)

The agent saves a draft record to `catalog/{collection}_{shelfmark}.json`.

---

## Step 4 — QC gate

Invoke `qc-reviewer` on the draft record.

- `fail` → Do NOT save. Present the specific fixes to the user.
- `pass_with_warnings` → Present warnings. User decides whether to save.
- `pass` → Record is finalized.

---

## Step 5 — Update MEMORY.md

- Add the manuscript to **Catalogued Manuscripts**
- Log the session in **Session Log**
- Remove from **Pipeline Status** if it was listed there
