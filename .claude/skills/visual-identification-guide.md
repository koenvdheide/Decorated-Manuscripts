# Visual Identification Guide

Reference for identifying paper decoration types in manuscript screenshots. Used by `visual-confirmation` for verdict decisions and `motif-classifier` for image analysis.

## Decoration Types: What to Look For

### Gold-sprinkled paper (serpme / zerefşân)

**Identifying features:**

- Fine metallic particles scattered across the paper surface
- Irregular distribution pattern (hand-sprinkled, not uniform)
- Particles vary slightly in size and density across the page
- Surface has a subtle sparkle/shimmer in well-lit images

**Subtypes (when resolution allows):**

- **Kalbur zerefşanı** (sieve-sprinkled): Finer, more evenly distributed particles. Sieved through mesh, producing a relatively uniform density.
- **Fırça zerefşanı** (brush-sprinkled): Coarser, more irregular distribution. Flicked from a brush, producing uneven clusters and gaps. Generally easier to see at lower resolution due to larger particle size.

**Resolution sensitivity:** HIGH — fine gold particles are frequently invisible at low screenshot resolution. This is the most resolution-dependent paper decoration type (teşʿîr in margins is even harder to detect — see below). If resolution is too low to confirm, verdict should be `inconclusive`, not `not_confirmed`.

**Distinguish from:**

- Gold ruling lines (cetveller) — straight, regular, confined to frame
- Gold headpiece illumination (serlevha) — localized at top of page
- Digital compression artifacts — check if speckling appears on all pages uniformly (artifact) vs. varies (genuine)
- Foxing or paper deterioration — brown/dark spots, no metallic quality

### Gold-worked paper (zerkâri / zer-endûd)

**Identifying features:**

- Gold motifs applied directly to the paper surface
- Patterns: floral, vegetal, geometric, chevron, medallion
- Typically covers large areas of the page (not just margins)
- "tamamı yaldız bezemeli" = entire paper surface decorated

**Subtypes (when resolution allows):**

- **Zer-ender-zer** (gold-on-gold): gold motifs on a gold ground — extremely subtle, detectable mainly by differences in gold tone, texture, or surface finish between the motif and ground. May require high resolution and oblique lighting to distinguish.

**Resolution sensitivity:** LOW for most zerkâri — large-scale gold patterns are usually visible even at moderate resolution. Exception: zer-ender-zer (gold-on-gold) is MEDIUM to HIGH, as the motif-ground contrast relies on subtle tonal differences.

**Distinguish from:**

- Halkâr — shaded floral painting in the margin zone; zerkâri — flat gold motifs applied across the full page surface
- Gold headpiece — localized; zerkâri covers broader areas
- Later gilding/repair — may have different gold tone or cover damage

### Marbled paper (ebrulu / ebrî)

**Identifying features:**

- Swirling, combed, or flowing color patterns characteristic of the marbling process
- Colors blend and flow into each other (not painted with brushstrokes)

**Subtypes:**

- **Hatip ebru** (imam's marbling): Recognizable floral/vegetal motifs created in the marbling trough. Flowers, leaves, and stems visible within the marbled pattern. Most distinctive and easiest to identify.
- **Battal ebru** (stone marbling): Irregular spotted or mottled pattern. Random distribution of color droplets. Can look like speckled stone.
- **Gel-git / taraklı ebru** (combed marbling): Parallel wavy lines from combing through the size. Regular repeating wave or zigzag pattern.

**Resolution sensitivity:** LOW — marbling patterns are large-scale and usually clearly visible.

**Distinguish from:**

- Colored paper (uniform color, no pattern)
- Painted decoration (visible brushstrokes, sharp edges)
- Water damage/staining (irregular, brownish, no color variety)
- Ebrulu mukavva (marbled BINDING covers — check if it's a board, not a page)

### Colored paper (mülevven / boyalı / renkli yaprak)

**Identifying features:**

- Paper with uniform non-white color throughout
- Common colors: blue (lacivert), green, orange, pink, yellow, purple
- May vary between folios (different colored leaves interspersed)
- Surface is uniformly colored (tinted through, or surface-dyed)

**Resolution sensitivity:** LOW — color is usually obvious even at low resolution.

**Distinguish from:**

- Staining/foxing — irregular, brownish, limited areas, no intentional pattern
- Tinted paper — very pale wash, barely perceptible; colored paper has definite hue
- Aged paper yellowing — uniform but brownish-cream, not a vivid color
- Modern photographic color cast — check if surrounding elements also have the same color shift

### Halkâr margin decoration

**Identifying features:**

- Shaded gold (and sometimes polychrome) floral/vegetal painting
- Located in margins — fills the space between the ruling frames (iç pervaz and dış pervaz, or cedvel and page edge in simpler layouts)
- Dense scrollwork with naturalistic or stylized flowers and leaves
- Often includes stems, buds, composite flowers in flowing arrangement
- Gold may be combined with light washes of color (pink, blue, green)

**Subtypes (when resolution allows):**

- **Taramalı halkârî** (hatched shading): Shading built up from parallel hatched/lined strokes. Close inspection reveals fine parallel lines creating tonal gradients.
- **Tahrirli halkârî** (outlined): Motifs outlined with a darker gold or ink line, then filled. The outlines give a crisper, more defined appearance compared to the softer taramalı technique. Can sometimes appear outside the margins.

**Resolution sensitivity:** MEDIUM — overall presence is visible at moderate resolution, but fine details of brushwork require higher resolution.

**Distinguish from:**

- Simple gold ruling (cetveller) — straight lines only, no floral motifs
- Headpiece illumination (serlevha) — confined to the top of the page
- Geometric border patterns — regular, repeating; halkâr is organic and flowing
- Text block decoration — halkâr is specifically in the margins, outside the text area

### Illuminated margins (tezhipli kenar / kenar tezhibi / kenar süsleme)

**Identifying features:**

- Polychrome or gold illumination in the margin zone, using standard tezhip motifs (rūmī, hatāyī, bulut, münhanî, geometric interlace)
- Distinguished from halkâr by technique: illuminated margins use flat opaque pigments and gold leaf in the manner of headpiece (serlevha) illumination, rather than halkâr's distinctive shaded gold brushwork
- May fill the full margin or appear in bands (kenar suyu / dış pervaz)
- Dense, fully saturated color — typically lapis blue, vermillion, green, white, gold
- Often appears on the same opening as an illuminated headpiece, extending the headpiece program into the margins

**Resolution sensitivity:** MEDIUM — the saturated colors and gold leaf are visible at moderate resolution, but distinguishing this from halkâr requires enough resolution to see the technique (flat pigment vs. shaded brushwork).

**Distinguish from:**

- Halkâr — shaded gold floral painting with tonal gradients; illuminated margins use flat, opaque color fields and gold leaf
- Headpiece illumination (serlevha) — same technique but confined to top of page; illuminated margins extend around the text block
- Framing systems (cedvel) — ruling lines only; illuminated margins fill the space between the frames with motifs
- Teşʿîr — fine-line gold drawing; illuminated margins are dense polychrome

### Silver-sprinkled paper (gümüş yaldız serpmeli)

**Identifying features:**

- Grey/silver metallic particles on paper surface
- Similar distribution pattern to gold-sprinkled but grey/silver in color
- May tarnish over time to darker grey or blackish tone
- Occasional large individual pieces of silver incorporated in the paper

**Resolution sensitivity:** HIGH — same challenges as gold-sprinkled, plus tarnishing can make silver less reflective and harder to distinguish.

**Distinguish from:**

- Foxing (brown spots, not metallic)
- Mold damage (irregular patches, often with halo)
- Paper fiber inclusions (embedded in paper, not on surface)
- Tarnished silver may resemble dirt or discoloration — look for metallic quality and even distribution

### Teşʿîr / tashʿīr (marginal gold drawings)

**Identifying features:**

- Extremely fine line drawings in gold ink (zermürekkep), occupying the open margins
- Subject matter: animals, birds, plants, flowers (şükûfe), landscapes, occasionally human figures
- "Hairline" delicacy — very low contrast against paper surface
- May be nearly invisible unless image is well-lit or high-resolution
- Typically found in Persianate luxury manuscripts and albums (murakkaʿ)

**Resolution sensitivity:** VERY HIGH — the finest and most resolution-dependent decoration type. Fine gold lines on cream paper produce almost no contrast in low-resolution images. Only detectable in high-quality scans or when lit at an oblique angle.

**Distinguish from:**

- Halkâr — shaded/washed gold with volume and gradients; teşʿîr is pure line drawing
- Pencil or ink marginalia (derkenar) — text, not pictorial; different ink color
- Later annotation or ownership marks — typically darker ink, less delicate

### Zencirek (chain border)

**Identifying features:**

- Narrow band of repeating interlinked ring or loop motifs
- Usually gold with ink outlines (black or colored)
- Runs along page edges, around calligraphy panels, or on binding edges
- Regular, rhythmic, linked-chain pattern — distinct from other border types

**Resolution sensitivity:** MEDIUM — the repeating pattern is usually visible at moderate resolution, though fine details of the interlinking may blur.

**Distinguish from:**

- Other geometric borders (girih-style) — zencirek is specifically linked rings/loops, not angular interlace
- Simple gold ruling (cetveller) — straight lines without decorative pattern
- Zencirek on binding vs. on page — check whether it's on a board or a leaf

**Category mapping:** In the output schema, zencirek is classified under `framing_system` alongside cedvel and pervaz borders. See also the Framing systems section below.

### Framing systems (cedvel / iç pervaz / dış pervaz / zencirek)

**Identifying features:**

- Multiple thin straight lines bounding the text block: typically red, blue, black, and gold
- May have "box-within-box" appearance: inner frame (iç pervaz / ara suyu) and outer frame (dış pervaz / kenar suyu)
- Complex framing systems are a strong indicator of luxury production
- The space between inner and outer frames is where halkâr, teşʿîr, or illuminated motifs appear
- Zencirek (chain border) may appear as one of the framing bands — see the Zencirek section above for its distinctive visual pattern

**Resolution sensitivity:** LOW — ruling lines and frame structures are visible even at low resolution.

**Distinguish from:**

- Simple single-line ruling (basic cedvel) — luxury framing has multiple colored lines
- Printed borders in modern reproductions — check for slight irregularity indicating hand-drawn
- "Cetvelleri yaldızlı" in catalogue = gold ruling lines only, not necessarily an elaborate framing system

### Edge gilding (yaldızlı kenar / ağız yaldızlı)

**Identifying features:**

- Shiny gold along the bookblock edges (visible when the book is closed)
- May be smooth (plain gilt) or patterned/tooled (gauffered edges)
- Only visible in closed-book images or edge-on photographs

**Resolution sensitivity:** LOW when visible, but requires specific camera angle. Most YEK folio captures show pages open, so edge gilding is rarely visible. Only detectable from closed-book or spine images.

**Distinguish from:**

- Age-darkened page edges (brownish, not metallic)
- Paper color visible at edges (no metallic sheen)
- Gold-tooled board edges (on the binding covers, not the bookblock — check if the gold is on cardboard/leather or on paper edges)
- Painted or decorated fore-edges (Western tradition, figural scenes visible when pages are fanned — not typically found in Islamic manuscripts)

### Stenciled paper

**Identifying features:**

- Flat, even color within motifs — uniform density with no visible brushstroke variation
- Crisp, well-defined edges between motif and ground (compared to hand-painted work which shows edge softness)
- Mechanical regularity: repeated motifs are nearly identical in size and spacing
- **Stencil bridges** — tiny unpainted connectors inside closed shapes (e.g., the center of an "O" shape needs a bridge to hold the stencil island in place). This is the single strongest diagnostic indicator of stenciling
- Botanical subject matter dominates: flowers, leaves, stems in naturalistic or semi-naturalistic style (Karamemi tradition)

**Subtypes (when resolution allows):**

- **Color-field stencil**: Pigment in one or more opaque colors applied through stencil. Multiple color layers may show slight misregistration (color fields not perfectly aligned at edges)
- **Metallic stencil**: Gold leaf or shell-gold applied through stencil, producing gold repeat-patterns. May appear in combination with color stenciling
- **Stencil borders as inserted leaves**: Separate stencil-decorated leaves bound into or vassale-mounted in the manuscript — check for vassale seams indicating the stenciled paper is a separate element

**Diagnostic traces (high resolution required):**

- **Misregistration** between color layers — slight offset where two stenciled colors meet, revealing the sequential application of separate masks
- **Edge haloing / overspray** — faint color bleeding beyond the intended motif boundary where pigment crept under the mask edge
- **Pigment pooling** — slightly heavier color deposits at mask edges where pigment accumulated against the stencil wall
- **Stencil bridges** — see above; look for tiny interruptions in outlines of enclosed shapes

**Resolution sensitivity:** MEDIUM-HIGH — overall motif presence is visible at moderate resolution, but the key diagnostic features (stencil bridges, misregistration, edge haloing) require higher resolution to detect. At low resolution, stenciled paper may be indistinguishable from hand-painted decoration.

**Distinguish from:**

- Hand-painted halkâr or floral decoration — shows brushstroke variation, tonal gradients, organic irregularity; stenciled work is mechanically uniform
- Block-printed paper — may show press indentation (paper deformation from block pressure); stenciled paper has no indentation from the mask
- Pouncing traces — preparatory layout marks (powder dots along lines), found *under* paint/gilding, not the finished surface. Pounce = layout technique, stencil = finished decoration
- Gold-worked (zerkâri) — hand-applied gold motifs with visible brushwork and variation; metallic stenciling shows mechanical regularity

### Silhouetted paper

**Identifying features:**

- Pattern with a distinctly shadowed, soft-edged appearance — produced by pressing a pattern between sheets with a pigmented intermediate sheet
- Color has a diffused, pressure-transferred quality: pigment absorbed INTO the paper, not sitting on the surface. Edges of motifs fade/graduate rather than cutting off sharply
- Warm olive-brown to golden-brown tones dominate against cream ground (characteristic color palette)
- Large-scale botanical motifs: full-height flowering plants (tulips, hyacinths, carnations, composite flowers), much larger than halkâr or teşʿîr. Karamemi-tradition naturalistic vocabulary
- Bilateral symmetry: plant arrangements often mirror on either side of the text area
- Relief/texture may be visible: the paper surface shows slight deformation from the pressing process
- Motifs may appear on both sides of the sheet (pressure transfers through)

**Common formats:**

- **Album (murakkaʿ) margins**: vassale-mounted calligraphy panels (often on contrasting pink/salmon paper) set into silhouetted-paper margins. Gold teşʿîr drawings frequently overlaid on the silhouetted ground
- **Full-page silhouetted paper**: text written directly on the silhouetted sheet. Text area occupies a lighter central zone; radiating botanical silhouettes frame the text columns from the margins inward

**Resolution sensitivity:** LOW-MEDIUM — the large-scale shadow patterns and warm olive-brown color are visible even at moderate resolution. Distinguished from stenciled paper at higher resolution by the soft/diffused edge quality (vs. crisp mask edges). Much easier to detect than gold-sprinkled or teşʿîr.

**Distinguish from:**

- Stenciled paper — crisp mask edges, flat even color, surface-applied pigment with no paper deformation; silhouetted paper has soft-edged shadows from pressure transfer with pigment absorbed into the paper
- Impressed/relief paper — pure deformation without color; silhouetted paper combines deformation WITH color from the pigmented intermediate sheet
- Water damage or staining — irregular, unintentional, brownish; silhouetted patterns are regular, intentional botanical motifs with bilateral symmetry
- Halkâr — shaded gold brushwork in margins with tonal gradients from a brush; silhouetted paper has uniform color density within each motif (no painterly gradation) and the shadow-like diffused edges characteristic of pressure transfer
- Zerkâri (gold-worked) — hand-applied gold motifs with brushwork variation; silhouetted paper uses pressure-transferred pigment, not gold, and has diffused rather than painted edges

**Reference images:** `examples/silhouetted paper/` — 4 photographs showing album-format vassale margins (images 1–2) and full-page silhouetted paper (images 3–4)

### Impressed / relief paper

**Identifying features:**

- Pattern visible as shadow/relief on the paper surface, created by pressing between engraved matrices
- No pigment or color — the effect is purely from paper deformation (light and shadow)
- May be nearly invisible in flat lighting; best detected under raking/oblique light where shadows are cast
- Paper thickness varies across the pattern (thinner where pressed, thicker where not)

**Resolution sensitivity:** HIGH — subtle deformation patterns produce very low contrast in standard flat-lit photography. Often invisible in YEK portal screenshots taken under diffuse lighting. Best detected in high-quality scans with controlled lighting.

**Distinguish from:**

- Silhouetted paper — similar pressing process but WITH color transfer from a pigmented intermediate sheet; impressed paper has no color
- Blind-tooled binding covers — same embossing principle but on leather/board, not paper
- Paper texture or laid lines — structural features of paper manufacture, regular and uniform; impressed patterns are decorative motifs

### Block-printed paper

**Identifying features:**

- Motifs applied by pressing a carved wooden block onto the paper
- May show **press indentation** — paper slightly depressed/deformed where the block was pressed
- Ink or pigment transfer may be slightly uneven: heavier at edges of the block, lighter in center
- Repeated motifs may show slight positional variation from hand-placement of the block

**Resolution sensitivity:** MEDIUM — block-printed patterns are usually visible at moderate resolution, but press indentation requires higher resolution to confirm.

**Distinguish from:**

- Stenciled paper — no press indentation; stenciling leaves pigment on the surface without deforming the paper
- Hand-painted decoration — block-printed motifs have mechanical consistency within each impression
- Stamped binding decoration — on leather/board, not paper; different substrate and context

### Vassale (window-mounting)

Vassale is not a decoration type but a mounting technique — text is cut out and set into a window in a larger sheet of decorated paper. Its visual traces confirm decorated paper use.

**Identifying features:**

- Visible seam, overlap, or thickness change where the text sheet meets the surrounding decorated paper
- Text area may be slightly recessed or raised relative to the surrounding margins
- Surrounding paper often shows a different texture, color, or decoration from the text area
- Common in albums (murakkaʿ) and mounted calligraphy specimens (kıt'a, levha)

**Resolution sensitivity:** MEDIUM — the seam is visible at moderate resolution if the image captures the margin-to-text transition area.

**Distinguish from:**

- Natural paper edges or tears — vassale seams are straight and intentional
- Conservation repairs — repairs tend to be less precise and use modern materials
- Binding gutter shadow — the dark strip near the spine is a photographic artifact, not a mounting seam

### Identifying composite decoration (mixed)

Luxury manuscripts frequently combine multiple decoration types on the same page. Common co-occurrences:

- Gold-sprinkled paper + halkâr margins + multi-line framing (the "classic luxury triad")
- Colored paper + gold ruling + gold-sprinkled overlay
- Marbled side papers (yan kağıtları) flanking a gold-sprinkled or gold-worked text area (in albums)
- Zencirek border + cedvel framing + halkâr or illuminated margins filling the space between
- Stenciled/silhouetted leaves inserted via vassale into manuscripts with other decoration types

When multiple types are present, identify each individually. The output category should be `mixed` with all component types listed in the manuscript record's `types` array. Note the spatial relationship between them (e.g., "gold-sprinkled paper with halkâr in margins and zencirek at outer edge").

## Screenshot Coverage Assessment

### Standard YEK 5-folio capture

| Folio position | Typically contains | Relevant for paper decoration? |
| --- | --- | --- |
| 1 (cover) | Front board, binding | No — skip for paper decoration (but note marbled covers) |
| 2 (inside cover) | Doublure, flyleaf | Maybe — check for marbled doublures, endpapers |
| 3 (first leaf) | Flyleaf or opening text | Yes — may show paper color, sprinkling, margins |
| 4–5 (opening pages) | Text opening, possibly illuminated | Yes — most likely to show decorated paper |

### Common coverage gaps

These catalogue descriptions often indicate decoration BEYOND the 5-folio window:

- "ilk iki sayfa zerkârî" — first two TEXT pages may be f3a–f4a, not f1–f2
- "kenarları halkâr" — may only appear at certain section openings deeper in the manuscript
- "yan kağıtları ebrulu" — side papers may only be visible at certain page edges
- "renkli yaprak" — colored leaves may be scattered throughout, not concentrated at the beginning
- "son sayfa" — decoration on final pages (never captured in first-5 sequence)

When the claimed decoration is likely beyond the capture window, verdict should be `inconclusive` with a specific recommendation for targeted navigation.

## Resolution and Image Quality Heuristics

| Quality level | Gold-sprinkled | Gold-worked | Marbled | Colored | Halkâr | Illum. margins | Teşʿîr | Zencirek | Framing | Silver-sprinkled | Edge gilding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| High (>300 DPI equiv.) | ✅ visible | ✅ visible | ✅ visible | ✅ visible | ✅ details visible | ✅ details visible | ✅ visible | ✅ details visible | ✅ visible | ✅ visible | ✅ if angle allows |
| Medium (150–300 DPI) | ⚠ may be invisible | ✅ visible | ✅ visible | ✅ visible | ✅ presence visible | ✅ presence visible | ❌ likely invisible | ✅ pattern visible | ✅ visible | ⚠ may be invisible | ✅ if angle allows |
| Low (<150 DPI / thumbnails) | ❌ not discernible | ⚠ large patterns visible | ✅ usually visible | ✅ visible | ⚠ may miss subtle work | ⚠ presence visible | ❌ not discernible | ⚠ may blur to line | ✅ visible | ❌ not discernible | ⚠ if angle allows |

| Quality level | Stenciled | Silhouetted | Impressed/relief | Block-printed |
| --- | --- | --- | --- | --- |
| High (>300 DPI equiv.) | ✅ motifs + diagnostic traces (bridges, haloing) | ✅ shadow effect + edge quality | ✅ visible with raking light | ✅ motifs + press indentation |
| Medium (150–300 DPI) | ✅ motifs visible; ⚠ bridges may be missed | ✅ shadow visible; ⚠ edge quality unclear | ⚠ subtle deformation hard to detect | ✅ motifs visible; ⚠ indentation unclear |
| Low (<150 DPI / thumbnails) | ⚠ motifs visible but indistinguishable from hand-painted | ⚠ may resemble staining | ❌ not discernible | ⚠ motifs visible but technique unclear |

When resolution limits identification, always note this in the verdict limitations rather than marking `not_confirmed`.
