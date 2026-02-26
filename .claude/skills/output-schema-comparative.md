# Comparative Analysis Schema (comparative-analyst output)

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

## Shared Enums

### Confidence scores
All confidence values are `number` between 0.0 and 1.0:
- **0.9–1.0**: High confidence, strong evidence
- **0.7–0.89**: Moderate confidence, good evidence with minor limitations
- **0.5–0.69**: Low-moderate confidence, significant limitations noted
- **0.3–0.49**: Low confidence, tentative identification
- **0.0–0.29**: Very low confidence, speculative

### Overall relationship values
```
same_workshop | same_tradition | indirect_influence | no_clear_connection
```
