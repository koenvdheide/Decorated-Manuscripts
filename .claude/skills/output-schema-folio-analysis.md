# Folio Analysis Schema (motif-classifier output)

Schema for a single folio analysis produced by `motif-classifier`. Return one object per folio; when analyzing multiple folios in one call, return an array. `metadata-generator` will use the array as the `folio_analyses` field of the manuscript record.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "FolioAnalysis",
  "type": "object",
  "required": ["folio", "decoration_type"],
  "properties": {
    "folio": { "type": "string", "examples": ["f1v", "f2r", "f3a"] },
    "decoration_type": {
      "type": "string",
      "enum": ["serlevha", "zahriye", "margin", "carpet_page", "paper_decoration", "binding", "other"]
    },
    "elements": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "element_type": { "type": "string" },
          "element_type_ottoman": { "type": "string" },
          "element_type_persian": { "type": ["string", "null"] },
          "motifs": { "type": "array", "items": { "type": "string" } },
          "colors": { "type": "array", "items": { "type": "string" } },
          "gold_technique": { "type": ["string", "null"] },
          "position": { "type": "string" }
        }
      }
    },
    "paper_decoration": {
      "type": ["object", "null"],
      "properties": {
        "type": {
          "type": "string",
          "enum": ["gold_sprinkled", "gold_worked", "marbled", "colored", "halkar_margins", "illuminated_margins", "marginal_drawings", "framing_system", "silver_sprinkled", "edge_gilding", "mixed", "none", "other"]
        },
        "technique_terms": {
          "type": "object",
          "properties": {
            "ottoman": { "type": "string" },
            "persian": { "type": ["string", "null"] },
            "arabic": { "type": ["string", "null"] }
          }
        },
        "details": { "type": "string" }
      }
    },
    "style_attribution": {
      "type": "object",
      "properties": {
        "tradition": { "type": "string" },
        "period": { "type": ["string", "null"] },
        "workshop": { "type": ["string", "null"] },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "justification": { "type": "string" }
      }
    },
    "workshop_attribution": {
      "type": ["object", "null"],
      "description": "Workshop attribution from textual sources. Distinct from style_attribution.workshop (visual/stylistic inference).",
      "properties": {
        "source": {
          "type": "string",
          "enum": ["preface", "colophon", "dedication", "artisan_signature", "waqf_inscription", "catalogue_text"]
        },
        "text_evidence": { "type": "string" },
        "workshop_name": { "type": ["string", "null"] },
        "workshop_name_ottoman": { "type": ["string", "null"] },
        "city": { "type": ["string", "null"] },
        "artisans": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "role": { "type": "string", "enum": ["müzehhib", "kâtib", "nakkaş", "mücellid", "ressam", "unknown"] },
              "name": { "type": "string" },
              "source_term": { "type": ["string", "null"] }
            }
          }
        },
        "patron": { "type": ["string", "null"] },
        "date_stated": { "type": ["string", "null"] },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 }
      }
    },
    "condition_notes": { "type": ["string", "null"] },
    "analysis_limitations": { "type": ["string", "null"] }
  }
}
```

## Shared Enums

### Decoration categories

```text
gold_sprinkled | gold_worked | marbled | colored | halkar_margins | illuminated_margins | marginal_drawings | framing_system | silver_sprinkled | edge_gilding | mixed | none | other
```

### Confidence scores

All confidence values are `number` between 0.0 and 1.0:

- **0.9–1.0**: High confidence, strong evidence
- **0.7–0.89**: Moderate confidence, good evidence with minor limitations
- **0.5–0.69**: Low-moderate confidence, significant limitations noted
- **0.3–0.49**: Low confidence, tentative identification
- **0.0–0.29**: Very low confidence, speculative

### Visual confirmation verdicts

```text
confirmed | probable | inconclusive | not_confirmed | contradicted | no_images
```
