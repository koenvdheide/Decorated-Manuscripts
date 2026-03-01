# YEK Search Result Schema (yek-search output)

```json
{
  "title": "YEKSearchSession",
  "type": "object",
  "required": ["search_session"],
  "properties": {
    "search_session": {
      "type": "object",
      "required": ["date", "field_searched", "term_searched", "results"],
      "properties": {
        "date": { "type": "string", "format": "date" },
        "field_searched": {
          "type": "string",
          "enum": ["kagit_ozellikleri", "genel_notlar", "tezhip_minyatur_harita_cizim", "yazi_turu", "dili", "eser_adi", "yazar_adi", "koleksiyon_adi", "yer_numarasi", "konu"]
        },
        "term_searched": { "type": "string" },
        "operator": { "type": "string", "default": "İçeren" },
        "raw_result_count": { "type": "integer", "minimum": 0 },
        "results": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["yek_id", "title", "collection", "classification", "is_false_positive"],
            "properties": {
              "yek_id": { "type": "string" },
              "title": { "type": "string" },
              "author": { "type": ["string", "null"] },
              "collection": { "type": "string" },
              "shelfmark": { "type": "string" },
              "date_ah": { "type": ["string", "null"] },
              "date_ce": { "type": ["string", "null"] },
              "paper_field": { "type": ["string", "null"] },
              "notes_field": { "type": ["string", "null"] },
              "decoration_field": { "type": ["string", "null"] },
              "classification": {
                "type": "string",
                "enum": ["gold_sprinkled", "gold_worked", "marbled", "colored", "halkar_margins", "illuminated_margins", "marginal_drawings", "framing_system", "silver_sprinkled", "edge_gilding", "stenciled", "silhouetted", "impressed", "block_printed", "cut_paper", "penwork", "lacquer", "mixed", "none", "other"]
              },
              "is_false_positive": { "type": "boolean" },
              "false_positive_reason": { "type": ["string", "null"] },
              "has_digitized_images": { "type": "boolean" },
              "iiif_manifest_url": { "type": ["string", "null"] },
              "iiif_internal_id": { "type": ["string", "null"] },
              "digitized_page_count": { "type": ["number", "null"] },
              "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
              "notes": { "type": ["string", "null"] }
            }
          }
        },
        "false_positive_count": { "type": "integer", "minimum": 0 },
        "genuine_count": { "type": "integer", "minimum": 0 },
        "false_positive_rate": { "type": "number", "minimum": 0, "maximum": 1 }
      }
    }
  }
}
```

## Shared Enums

### Decoration categories

```text
gold_sprinkled | gold_worked | marbled | colored | halkar_margins | illuminated_margins | marginal_drawings | framing_system | silver_sprinkled | edge_gilding | stenciled | silhouetted | impressed | block_printed | cut_paper | penwork | lacquer | mixed | none | other
```

### Confidence scores

All confidence values are `number` between 0.0 and 1.0:

- **0.9–1.0**: High confidence, strong evidence
- **0.7–0.89**: Moderate confidence, good evidence with minor limitations
- **0.5–0.69**: Low-moderate confidence, significant limitations noted
- **0.3–0.49**: Low confidence, tentative identification
- **0.0–0.29**: Very low confidence, speculative
