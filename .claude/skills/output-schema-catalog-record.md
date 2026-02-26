# Catalog Record Schemas (metadata-generator / codicology-agent)

## 1. Catalog Record (metadata-generator)

The primary output for the `catalog/` directory. One record per manuscript. Contains folio-level analyses as nested entries.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ManuscriptRecord",
  "type": "object",
  "required": ["record_id", "collection", "manuscript", "analysis_metadata"],
  "properties": {
    "record_id": {
      "type": "string",
      "description": "Unique ID: {collection}_{shelfmark}",
      "pattern": "^[a-z0-9_-]+$",
      "examples": ["nuruosmaniye_03903", "amasya_beyazit_1234", "yusuf_aga_yy00006636-001", "esad_efendi_03292-001"]
    },
    "collection": {
      "type": "object",
      "required": ["institution", "city", "country", "shelfmark"],
      "properties": {
        "institution": { "type": "string" },
        "city": { "type": "string" },
        "country": { "type": "string" },
        "shelfmark": { "type": "string" },
        "yek_url": { "type": ["string", "null"], "format": "uri" }
      }
    },
    "manuscript": {
      "type": "object",
      "properties": {
        "title": { "type": ["string", "null"] },
        "author": { "type": ["string", "null"] },
        "date_ah": { "type": ["string", "null"] },
        "date_ce": { "type": ["string", "null"] },
        "format": {
          "type": ["string", "null"],
          "description": "mecmû'a, dîvân, kıt'a, vakfiye, murakkaa, etc."
        },
        "dimensions_mm": {
          "type": "object",
          "properties": {
            "height": { "type": ["number", "null"] },
            "width": { "type": ["number", "null"] }
          }
        },
        "folio_count": { "type": ["integer", "null"] }
      }
    },
    "paper_decoration": {
      "type": "object",
      "description": "Manuscript-level summary of paper decoration",
      "properties": {
        "types": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": ["gold_sprinkled", "gold_worked", "marbled", "colored", "halkar_margins", "illuminated_margins", "marginal_drawings", "framing_system", "silver_sprinkled", "edge_gilding", "mixed", "none", "other"]
          },
          "description": "All decoration types present in the manuscript"
        },
        "summary": { "type": "string", "description": "Brief prose summary of paper decoration across the manuscript" },
        "technique_terms": {
          "type": "object",
          "properties": {
            "ottoman": { "type": "string" },
            "persian": { "type": ["string", "null"] },
            "arabic": { "type": ["string", "null"] }
          }
        },
        "catalogue_description": {
          "type": "object",
          "description": "Original catalogue text from YEK or other source",
          "properties": {
            "paper_field": { "type": ["string", "null"] },
            "notes_field": { "type": ["string", "null"] },
            "decoration_field": { "type": ["string", "null"] }
          }
        }
      }
    },
    "workshop_attribution": {
      "type": ["object", "null"],
      "description": "Manuscript-level workshop/tradition attribution from comparative-analyst or motif-classifier",
      "properties": {
        "primary_tradition": {
          "type": "string",
          "enum": ["timurid", "safavid", "mamluk", "ottoman", "mixed", "uncertain"]
        },
        "workshop_centre": {
          "type": ["string", "null"],
          "description": "Specific atelier city or name, e.g. Herat, Tabriz, Cairo, Istanbul/nakkaşhane-i hümayun"
        },
        "date_range_ce": { "type": ["string", "null"], "description": "Proposed CE date range, e.g. '1550–1600'" },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "key_indicators": {
          "type": "array",
          "items": { "type": "string" },
          "description": "2–5 specific visual/material features supporting the attribution"
        },
        "cross_tradition_caveats": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Known ambiguities or cross-tradition influence patterns that limit confidence"
        }
      }
    },
    "codicology": {
      "type": ["object", "null"],
      "description": "Physical description from codicology-agent, if available",
      "properties": {
        "paper": { "type": "object" },
        "ruling": { "type": "object" },
        "binding": { "type": "object" },
        "format": {
          "type": ["string", "null"],
          "description": "Manuscript format (mecmû'a, dîvân, kıt'a, vakfiye, murakkaa, etc.)"
        },
        "condition_summary": { "type": "string" },
        "conservation_history": {
          "type": ["string", "null"],
          "description": "Known repair campaigns, rebinding, restoration, or later interventions"
        }
      }
    },
    "visual_confirmation": {
      "type": ["object", "null"],
      "description": "Manuscript-level verdict from visual-confirmation agent",
      "properties": {
        "verdict": {
          "type": "string",
          "enum": ["confirmed", "probable", "inconclusive", "not_confirmed", "contradicted", "no_images"]
        },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "screenshots_examined": { "type": "integer" },
        "limitations": { "type": "array", "items": { "type": "string" } }
      }
    },
    "folio_analyses": {
      "type": "array",
      "description": "Per-folio decoration analyses from motif-classifier. Pass the array returned by motif-classifier directly here.",
      "items": {
        "type": "object",
        "description": "See output-schema-folio-analysis skill for full item schema"
      }
    },
    "terminology": {
      "type": "object",
      "properties": {
        "terms_used": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "concept": { "type": "string" },
              "ottoman": { "type": "string" },
              "arabic": { "type": ["string", "null"] },
              "persian": { "type": ["string", "null"] },
              "english": { "type": "string" }
            }
          }
        }
      }
    },
    "bibliography": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["citation", "relevance"],
        "properties": {
          "citation": { "type": "string" },
          "relevance": { "type": "string" },
          "relevance_score": { "type": "number", "minimum": 0, "maximum": 1 },
          "access_notes": { "type": ["string", "null"] }
        }
      }
    },
    "suggested_collections": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "institution": { "type": "string" },
          "reason": { "type": "string" },
          "digital_access": { "type": ["string", "null"], "format": "uri" }
        }
      }
    },
    "provenance": {
      "type": ["object", "null"],
      "description": "Collection history, donor, waqf information",
      "properties": {
        "donor": { "type": ["string", "null"] },
        "waqf": { "type": ["string", "null"] },
        "previous_shelfmarks": { "type": "array", "items": { "type": "string" } },
        "notes": { "type": ["string", "null"] }
      }
    },
    "analysis_metadata": {
      "type": "object",
      "required": ["analyzed_date", "analyzer"],
      "properties": {
        "analyzed_date": { "type": "string", "format": "date" },
        "analyzer": { "type": "string", "default": "claude-code-manuscript-pipeline" },
        "image_source": { "type": "string" },
        "image_quality_notes": { "type": "string" },
        "folios_examined": {
          "type": "array",
          "items": { "type": "string" },
          "description": "List of folios that were visually examined"
        },
        "folios_not_examined": {
          "type": ["string", "null"],
          "description": "Note on which folios were not available or not checked"
        }
      }
    }
  }
}
```

## 2. Corpus Index Entry (metadata-generator → corpus_index.json)

One entry per catalogued manuscript. Lightweight summary for comparative-analyst pre-filtering. The full record lives in `catalog/{record_id}.json`.

```json
{
  "title": "CorpusIndexEntry",
  "type": "object",
  "required": ["record_id", "collection", "shelfmark", "decoration_types", "catalogued_date"],
  "properties": {
    "record_id": { "type": "string", "description": "Matches catalog/{record_id}.json filename stem" },
    "collection": { "type": "string" },
    "shelfmark": { "type": "string" },
    "title": { "type": ["string", "null"] },
    "author": { "type": ["string", "null"] },
    "date_ah": { "type": ["string", "null"], "description": "AH date range (e.g. '10th–11th c. AH')" },
    "date_ce": { "type": ["string", "null"], "description": "CE date range (e.g. '16th–17th c. CE')" },
    "decoration_types": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Values from decoration_types enum"
    },
    "paper_categories": {
      "type": "array",
      "items": { "type": "string" },
      "description": "2–4 Ottoman/Persian term keys describing paper decoration technique"
    },
    "key_features": {
      "type": "array",
      "items": { "type": "string" },
      "description": "2–4 brief phrases highlighting the most distinctive features for comparison"
    },
    "visual_confirmation": {
      "type": "string",
      "enum": ["confirmed", "probable", "inconclusive", "not_confirmed", "contradicted", "no_images"]
    },
    "primary_tradition": {
      "type": ["string", "null"],
      "enum": ["timurid", "safavid", "mamluk", "ottoman", "mixed", "uncertain", null],
      "description": "Primary tradition from workshop_attribution"
    },
    "workshop_centre": {
      "type": ["string", "null"],
      "description": "Workshop centre from workshop_attribution, e.g. Herat, Tabriz, Cairo, Istanbul"
    },
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
    "catalogued_date": { "type": "string", "format": "date" }
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
