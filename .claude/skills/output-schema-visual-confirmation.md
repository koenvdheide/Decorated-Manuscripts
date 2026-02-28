# Visual Confirmation Schema (visual-confirmation output)

```json
{
  "title": "VisualConfirmation",
  "type": "object",
  "required": ["visual_confirmation"],
  "properties": {
    "visual_confirmation": {
      "type": "object",
      "required": ["record_id", "catalogue_claim", "verdict", "confidence"],
      "properties": {
        "record_id": { "type": "string" },
        "catalogue_claim": {
          "type": "object",
          "required": ["decoration_type"],
          "properties": {
            "decoration_type": { "type": "string" },
            "location_claimed": { "type": "string" },
            "exact_text": { "type": "string", "description": "Original Turkish catalogue text" }
          }
        },
        "screenshots_examined": {
          "type": "object",
          "properties": {
            "total_available": { "type": "integer" },
            "folios_examined": { "type": "array", "items": { "type": "string" } },
            "folios_relevant": { "type": "array", "items": { "type": "string" } },
            "coverage_notes": { "type": "string" }
          }
        },
        "verdict": {
          "type": "string",
          "enum": ["confirmed", "probable", "inconclusive", "not_confirmed", "contradicted", "no_images"]
        },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "confidence_breakdown": {
          "type": "object",
          "description": "Optional decomposition of confidence score to help qc-reviewer identify which factor limits certainty",
          "properties": {
            "resolution_quality": {
              "type": ["number", "null"], "minimum": 0, "maximum": 1,
              "description": "Quality of available images — 1.0 = IIIF native resolution, ~0.5 = viewer screenshot only"
            },
            "folio_coverage": {
              "type": ["number", "null"], "minimum": 0, "maximum": 1,
              "description": "Proportion of relevant folios actually examined vs. total folios in the manuscript"
            },
            "visual_match": {
              "type": ["number", "null"], "minimum": 0, "maximum": 1,
              "description": "Strength of visual match between screenshot evidence and the catalogue claim"
            },
            "limiting_factor": {
              "type": ["string", "null"],
              "enum": ["resolution", "coverage", "visual_ambiguity", "inherent_uncertainty", null],
              "description": "Primary factor preventing score from reaching 0.9+"
            }
          }
        },
        "evidence": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "folio": { "type": "string" },
              "observation": { "type": "string" },
              "supports_claim": { "type": "boolean" },
              "decoration_type_observed": { "type": "string" },
              "screenshot": { "type": ["string", "null"], "description": "Relative filepath to the screenshot used as evidence" }
            }
          }
        },
        "iiif_images": {
          "type": "array",
          "description": "Metadata for each IIIF image downloaded during this confirmation session. Used by qc-reviewer to validate image integrity without needing Bash access.",
          "items": {
            "type": "object",
            "required": ["filename", "width_px", "height_px", "file_size_kb"],
            "properties": {
              "filename": { "type": "string", "description": "Filename in corpus/iiif/, e.g. na_00084_p001.jpg" },
              "width_px": { "type": "integer" },
              "height_px": { "type": "integer" },
              "file_size_kb": { "type": "integer" },
              "page_number": { "type": "integer", "description": "IIIF page number used in the download URL" }
            }
          }
        },
        "limitations": { "type": "array", "items": { "type": "string" } },
        "recommendation": { "type": "string" },
        "discrepancies": { "type": ["string", "null"] }
      }
    }
  }
}
```

## Shared Enums

### Visual confirmation verdicts

```text
confirmed | probable | inconclusive | not_confirmed | contradicted | no_images
```

### Confidence scores

All confidence values are `number` between 0.0 and 1.0:

- **0.9–1.0**: High confidence, strong evidence
- **0.7–0.89**: Moderate confidence, good evidence with minor limitations
- **0.5–0.69**: Low-moderate confidence, significant limitations noted
- **0.3–0.49**: Low confidence, tentative identification
- **0.0–0.29**: Very low confidence, speculative

### Decoration categories

```text
gold_sprinkled | gold_worked | marbled | colored | halkar_margins | illuminated_margins | marginal_drawings | framing_system | silver_sprinkled | edge_gilding | mixed | none | other
```
