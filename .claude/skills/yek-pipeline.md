# YEK Search Pipeline

Step-by-step orchestration for searching the YEK portal and processing results.
Follow these steps in order. Do not skip steps. Pause at every CHECKPOINT.

## Before You Start

Read `MEMORY.md`. Check the Search History table.
- If the requested term × field has already been searched, tell the user and suggest an untried combination instead.
- Note which collections have known cataloguing quirks.

---

## Step 1 — Execute search

Invoke the `yek-search` agent with the search term and target field
(`kagit_ozellikleri` first, then `genel_notlar`, then `tezhip_minyatur_harita_cizim`).
Follow Tier 1 → Tier 2 → Tier 3 order from yek-playbook unless the user specifies otherwise.

The agent saves results to `catalog/searches/search_{date}_{term}.json`.

**If raw count = 0:** Report to user. Suggest the next term/field combination from the yek-playbook tier list. Do not proceed to Step 2.

---

## CHECKPOINT A — Review search results

Present to the user:
- Raw result count, genuine count, false positive count and rate
- Any new false positive patterns not previously documented in the playbook
- Notable collection clusters or unexpected findings

**Wait for user confirmation before continuing.**

---

## Step 2 — QC on search results

Invoke `qc-reviewer` on the saved search session JSON (`catalog/searches/search_{date}_{term}.json`). Do this by spawning the `qc-reviewer` agent directly — it has read-only access and will not modify any files.

Instruct qc-reviewer to specifically re-check each result against the **False Positive Detection Rules** table in `yek-playbook`. This is the primary value of Step 2: a second pair of eyes on false positive classification, independent of the search agent.

- `fail` → Present the specific errors to the user. Fix before continuing.
- `pass_with_warnings` → Present warnings to the user. Continue unless user says stop.
- `pass` → Continue.

> **Small result sets (≤ 10 results):** qc-reviewer is still recommended. The search agent may have missed a false positive pattern — the independent check is fast and worth running.

---

## Step 3 — Visual confirmation

For each genuine result where `has_digitized_images = true`, invoke `visual-confirmation`.

Handle verdicts as follows:

- `confirmed` / `probable` → Queue for Step 4.
- `inconclusive` → Add to MEMORY.md Pipeline Status table as "blocked: needs targeted folio nav or physical exam". Do not discard — these are real candidates.
- `not_confirmed` → Ask user whether to discard or retain for follow-up.
- `contradicted` → Mark as false positive; do not process further.
- `no_images` → Retain as unverified candidate; note in Pipeline Status.

**On `probable` verdicts:** Both `confirmed` and `probable` proceed to Step 4. A `probable` verdict means evidence is consistent but resolution or page coverage was insufficient to be certain. Motif-classifier analysis of additional folios (especially at IIIF full resolution) will typically upgrade `probable` to `confirmed`. If time-constrained, a `probable` manuscript may be catalogued immediately with its confidence score — do not artificially hold it. Add it to the **Follow-up Items** section of `MEMORY.md` if higher-confidence imaging is still desired.

---

## CHECKPOINT B — Review verdicts

Present a summary to the user:
- confirmed/probable: N manuscripts → ready for Step 4
- inconclusive: N manuscripts → added to Pipeline Status
- not_confirmed / contradicted: N manuscripts → discarded or flagged

**Wait for user confirmation before continuing to deep analysis.**

---

## Step 4 — Deep analysis (optional)

Only if the user requests full decoration analysis for confirmed/probable results:

Invoke `motif-classifier` on available folio screenshots for each confirmed manuscript.
If the user also wants material context (paper type, binding, ruling), invoke `codicology-agent` on the same images.

---

## Step 5 — Create catalog records

Invoke `metadata-generator` for each manuscript with sufficient evidence
(confirmed/probable verdict + motif-classifier output if Step 4 was run, or catalogue description alone if not).

The agent saves draft records to `catalog/{collection}_{shelfmark}.json`.

---

## Step 6 — Final QC gate

Invoke `qc-reviewer` on each new draft catalog record.

- `fail` → Do NOT save the record. Present the specific fixes to the user.
- `pass_with_warnings` → Present warnings. User decides whether to save.
- `pass` → Record is finalized.

---

## Step 7 — Update MEMORY.md

After all records are processed, update `MEMORY.md`:
- Add rows to **Search History** for each term × field searched this session
- Add finalized manuscripts to **Catalogued Manuscripts**
- Update or remove entries from **Pipeline Status**
- Log the session in **Session Log**
- Note any new false positive patterns in **False Positive Patterns**
