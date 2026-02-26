# Output Schemas

Shared schema definitions for all structured outputs in the pipeline. Agents should reference these schemas to ensure consistent output format.

## 1. Catalog Record (metadata-generator)

The primary output for the `catalog/` directory. One record per manuscript (not per folio). A manuscript record contains folio-level analyses as nested entries.

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
      "description": "Per-folio decoration analyses from motif-classifier. One entry per examined folio. When motif-classifier is called with multiple images in one batch, it returns an array of these objects directly — pass that array here. A single-folio call returns one object; wrap it in an array.",
      "items": {
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
          "condition_notes": { "type": ["string", "null"] },
          "analysis_limitations": { "type": ["string", "null"] },
          "workshop_attribution": {
            "type": ["object", "null"],
            "description": "Workshop attribution from textual sources (preface, colophon, dedication, catalogue text). Distinct from style_attribution.workshop which records visual/stylistic inference only.",
            "properties": {
              "source": {
                "type": "string",
                "enum": ["preface", "colophon", "dedication", "artisan_signature", "waqf_inscription", "catalogue_text"],
                "description": "Textual source type"
              },
              "text_evidence": {
                "type": "string",
                "description": "Verbatim quote or close paraphrase in original language"
              },
              "workshop_name": {
                "type": ["string", "null"],
                "description": "Standardized English name (e.g. 'Imperial Ottoman workshop')"
              },
              "workshop_name_ottoman": {
                "type": ["string", "null"],
                "description": "Ottoman/Persian name as found in source (e.g. 'nakkaşhâne-i hümâyun')"
              },
              "city": { "type": ["string", "null"] },
              "artisans": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "role": {
                      "type": "string",
                      "enum": ["müzehhib", "kâtib", "nakkaş", "mücellid", "ressam", "unknown"]
                    },
                    "name": { "type": "string" },
                    "source_term": { "type": ["string", "null"], "description": "Original-language role term from source" }
                  }
                }
              },
              "patron": { "type": ["string", "null"] },
              "date_stated": { "type": ["string", "null"], "description": "Date stated in the source (AH or CE)" },
              "confidence": { "type": "number", "minimum": 0, "maximum": 1 }
            }
          }
        }
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

## 2. YEK Search Result (yek-search)

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
                "enum": ["gold_sprinkled", "gold_worked", "marbled", "colored", "halkar_margins", "illuminated_margins", "marginal_drawings", "framing_system", "silver_sprinkled", "edge_gilding", "mixed", "none", "other"]
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

## 3. Visual Confirmation Verdict (visual-confirmation)

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
              "screenshot": { "type": ["string", "null"], "description": "Relative filepath to the screenshot used as evidence (e.g. corpus/yek_screenshots/nuruosmaniye_03880_p007_view.png)" }
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

## 4. QC Review Report (qc-reviewer)

```json
{
  "title": "QCReview",
  "type": "object",
  "required": ["qc_review"],
  "properties": {
    "qc_review": {
      "type": "object",
      "required": ["record_reviewed", "review_date", "status", "issues", "summary"],
      "properties": {
        "record_reviewed": { "type": "string" },
        "review_date": { "type": "string", "format": "date" },
        "status": {
          "type": "string",
          "enum": ["pass", "pass_with_warnings", "fail"]
        },
        "issues": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["severity", "check_type", "description"],
            "properties": {
              "severity": {
                "type": "string",
                "enum": ["error", "warning", "info"]
              },
              "check_type": {
                "type": "string",
                "enum": ["consistency", "false_positive", "confidence", "terminology", "completeness", "limitations", "deduplication"]
              },
              "description": { "type": "string" },
              "agents_involved": { "type": "array", "items": { "type": "string" } },
              "field_affected": { "type": ["string", "null"] },
              "suggested_fix": { "type": "string" }
            }
          }
        },
        "summary": {
          "type": "object",
          "properties": {
            "errors": { "type": "integer", "minimum": 0 },
            "warnings": { "type": "integer", "minimum": 0 },
            "info": { "type": "integer", "minimum": 0 },
            "passed_checks": { "type": "array", "items": { "type": "string" } }
          }
        }
      }
    }
  }
}
```

## 5. Comparative Analysis (comparative-analyst)

```json
{
  "title": "ComparativeAnalysis",
  "type": "object",
  "required": ["comparison"],
  "properties": {
    "comparison": {
      "type": "object",
      "required": ["manuscripts_compared", "overall_relationship", "confidence"],
      "properties": {
        "manuscripts_compared": {
          "type": "array",
          "items": { "type": "string" },
          "minItems": 2
        },
        "overall_relationship": {
          "type": "string",
          "enum": ["same_workshop", "same_tradition", "indirect_influence", "no_clear_connection"]
        },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "shared_features": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "feature": { "type": "string" },
              "significance": { "type": "string" },
              "found_in_both": { "type": "boolean" }
            }
          }
        },
        "distinguishing_features": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "feature": { "type": "string" },
              "present_in": { "type": "string" },
              "significance": { "type": "string" }
            }
          }
        },
        "proposed_relationship": { "type": "string" },
        "supporting_parallels": { "type": "array", "items": { "type": "string" } },
        "caveats": { "type": "string" }
      }
    }
  }
}
```

## 6. Corpus Index Entry (metadata-generator → corpus_index.json)

One entry per catalogued manuscript. Lightweight summary for comparative-analyst
pre-filtering. The full record lives in `catalog/{record_id}.json`.

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
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
    "catalogued_date": { "type": "string", "format": "date" }
  }
}
```

## Shared Enums

### Decoration categories
Used consistently across all schemas:
```
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
```
confirmed | probable | inconclusive | not_confirmed | contradicted | no_images
```
