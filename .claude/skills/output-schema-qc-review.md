# QC Review Schema (qc-reviewer output)

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
