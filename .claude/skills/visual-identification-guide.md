# Visual Identification Guide

Reference for identifying paper decoration types in manuscript screenshots. Used by `visual-confirmation` for verdict decisions and `motif-classifier` for image analysis.

## Decoration Types: What to Look For

### Gold-sprinkled paper (serpme / zerefşân)

**Identifying features:**

- Fine metallic particles scattered across the paper surface
- Irregular distribution pattern (hand-sprinkled, not uniform)
- Particles vary slightly in size and density across the page
- Surface has a subtle sparkle/shimmer in well-lit images — however, absence of shimmer in digital images does not rule out zerefşân (tarnished gold appears matte; screenshots rarely capture metallicity)

**Subtypes (when resolution allows):**

- **Kalbur zerefşanı** (sieve-sprinkled): Finer, more evenly distributed particles. Sieved through mesh, producing a relatively uniform density.
- **Fırça zerefşanı** (brush-sprinkled): Coarser, more irregular distribution. Flicked from a brush, producing uneven clusters and gaps. Generally easier to see at lower resolution due to larger particle size.

**Resolution sensitivity:** HIGH — fine gold particles are frequently invisible at low screenshot resolution. This is the most resolution-dependent paper decoration type (teşʿîr in margins is even harder to detect — see below). If resolution is too low to confirm, verdict should be `inconclusive`, not `not_confirmed`.

**Distinguish from:**

- Gold ruling lines (cetveller) — straight, regular, confined to frame
- Gold headpiece illumination (serlevha) — localized at top of page
- Digital compression artifacts — check if speckling appears on all pages uniformly (artifact) vs. varies (genuine)
- Foxing or paper deterioration — brown/dark spots, no metallic quality

### Color-splashed paper (boya efşân / rangafshān)

**Identifying features:**

- Colored (non-metallic) pigment particles scattered across the paper surface
- Same application technique as zerefşân but using paint/pigment instead of gold
- Produces matte colored speckles — NOT metallic
- Common colors: pink/rose, red, blue, green
- Irregular distribution pattern from brush-flicking (fırça serpme)
- Particles vary in size and density; some may form small clusters or elongated streaks from the flicking motion

**Resolution sensitivity:** HIGH — same challenges as gold-sprinkled. Fine pigment particles can be invisible at low resolution. Color helps: pink/red speckles on cream ground produce more contrast than gold, making boya efşân slightly easier to detect than zerefşân at equivalent resolution.

**Distinguish from:**

- Zerefşân (gold-sprinkled) — metallic particles with shimmer; boya efşân has matte colored particles with no metallic quality
- Mülevven (colored/dyed paper) — uniform color throughout the sheet; boya efşân has discrete speckles on a contrasting ground
- Foxing or paper deterioration — irregular brown spots with halo effect, concentrated in damp-damaged areas; boya efşân has even distribution of intentionally colored particles
- Battal ebru (stone marbling) — flowing/swirling color patterns from marbling trough; boya efşân has discrete scattered particles, not continuous patterns
- Digital compression artifacts — check if speckling appears identically on all pages (artifact) vs. varies in color/density (genuine)

**Category mapping:** In the output schema, boya efşân is classified under `gold_sprinkled` (the broader "sprinkled" technique family) when it co-occurs with zerefşân, or under `colored` when it appears independently.

### Gold-worked paper (zerkâri / zer-endûd)

**Identifying features:**

- Gold motifs applied directly to the paper surface
- Patterns: floral, vegetal, geometric, chevron, medallion
- Often covers large areas of the page, though it may also appear in border bands or localized fields
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

**Distinguish from:**

- Simple gold ruling (cetveller) — straight lines only, no floral motifs
- Headpiece illumination (serlevha) — confined to the top of the page
- Geometric border patterns — regular, repeating; halkâr is organic and flowing
- Text block decoration — halkâr is specifically in the margins, outside the text area

**Note:** Hybrid margins combining halkâr shading with opaque pigment accents are common in Ottoman practice; classification should prioritize the dominant technique.

### Illuminated margins (tezhipli kenar / kenar tezhibi / kenar süsleme)

**Identifying features:**

- Polychrome or gold illumination in the margin zone, using standard tezhip motifs (rūmī, hatāyī, bulut, münhanî, geometric interlace)
- Distinguished from halkâr by technique: illuminated margins use flat opaque pigments and gold leaf in the manner of headpiece (serlevha) illumination, rather than halkâr's distinctive shaded gold brushwork
- May fill the full margin or appear in bands (kenar suyu / dış pervaz)
- Dense, fully saturated color — typically lapis blue, vermillion, green, white, gold
- Often appears on the same opening as an illuminated headpiece, extending the headpiece program into the margins

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

**Specific border elements within framing systems:**

- **Dendân-ı mûşî / dendanlı** — sawtooth/zigzag border between the cedvel and illuminated field. See dedicated section below for full identification guidance.
- **İplik** — thin thread-line parallel to cedvel; **kuzu** — very fine line parallel to the main border. These delicate lines enrich the layered border system.
- **Tâcü'l-cedvel / tepelik** — decorative crown-shaped extension rising above the rectangular text frame. Often features a mihrab-like rise.

**Miniature framing conventions (tradition-specific):**

- **Timurid**: stepped frames where the rectangular text frame steps inward/outward; gold and polychrome rules
- **Safavid**: the signature **"broken frame"** — figures, trees, animals deliberately extend beyond the ruled frame (*jadval*) into the margin
- **Mughal**: most elaborate border system with concentric color bands; specialist *naqshānavīs* (border painters) distinct from main painter
- **Ottoman**: more restrained frame-breaking; dense gold illumination around miniatures; same colored rulings as text cedvel

**Distinguish from:**

- Simple single-line ruling (basic cedvel) — luxury framing has multiple colored lines
- Printed borders in modern reproductions — check for slight irregularity indicating hand-drawn
- "Cetvelleri yaldızlı" in catalogue = gold ruling lines only, not necessarily an elaborate framing system

### Edge gilding (yaldızlı kenar / ağız yaldızlı)

**Identifying features:**

- Shiny gold along bookblock edges (visible only when the book is closed or from edge-on angles)
- May be smooth (plain gilt) or patterned/tooled (gauffered edges)
- Rarely visible in standard YEK open-folio captures; only detectable from closed-book or spine images

**Distinguish from:**

- Age-darkened page edges (brownish, not metallic)
- Gold-tooled board edges (on binding covers, not the bookblock)

### Stenciled paper

**Identifying features:**

- Flat, even color within motifs — uniform density with no visible brushstroke variation
- Crisp, well-defined edges between motif and ground (compared to hand-painted work which shows edge softness)
- Mechanical regularity: repeated motifs are nearly identical in size and spacing
- **Stencil bridges** — tiny unpainted connectors inside closed shapes (e.g., the center of an "O" shape needs a bridge to hold the stencil island in place). Stencil bridges are among the strongest diagnostic indicators of stenciling when visible
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

**Resolution sensitivity:** MEDIUM-HIGH — overall motif presence is visible at moderate resolution, but key diagnostic features (stencil bridges, misregistration, edge haloing, pigment pooling) require higher resolution to detect. At low resolution, stenciled paper may be indistinguishable from hand-painted decoration.

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

**Reference images:** `examples/silhouetted_paper/` — 4 photographs showing album-format vassale margins (images 1–2) and full-page silhouetted paper (images 3–4)

### Impressed / relief paper

**Identifying features:**

- Pattern visible as shadow/relief on the paper surface, created by pressing between engraved matrices
- No pigment or color — the effect is purely from paper deformation (light and shadow)
- May be nearly invisible in flat lighting; best detected under raking/oblique light where shadows are cast
- Subtle variation in surface level may be visible, especially under raking or oblique light (thinner where pressed, thicker where not)

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

**Distinguish from:**

- Natural paper edges or tears — vassale seams are straight and intentional
- Conservation repairs — repairs tend to be less precise and use modern materials
- Binding gutter shadow — the dark strip near the spine is a photographic artifact, not a mounting seam

### Carpet pages (tam sayfa tezhibi)

**Identifying features:**

- Full-page illumination filling an entire folio with **non-figurative geometric and/or vegetal ornamentation**
- Typically presented as a double-page spread with mirror-image symmetry across the gutter
- Central compositions often based on stars (8-pointed *khatam*, hexagons, octagons) surrounded by concentric frames
- **No continuous body text** — the critical distinction from serlevha/ʿunwān pages which contain readable text below the headpiece
- Brief Qur'anic inscriptions may appear in small rectangular panels at top and bottom

**Tradition-specific variants:**

- **Mamluk** (13th–15th c.): extensive geometric patterns with gold filigree, polychrome palette (gold, lapis blue, red, green)
- **Ilkhanid** (13th–14th c.): complex layered surfaces connecting to architectural decoration; around 1335, shamsa medallion began displacing carpet pages
- **Timurid** (15th c.): cloud-chain (*bulut*) motifs replaced heavier geometric patterns; increased vegetal arabesques
- **Safavid and later**: shamsa frontispieces became increasingly common, though carpet pages continued in some traditions

**Distinguish from:**

- Serlevha/ʿunwān — contains readable text below the headpiece; carpet page has no continuous text
- Shamsa page — dominated by a single central medallion; carpet page fills the entire field with repeating/radiating patterns
- Zahriye — illuminated frontispiece that may contain text panels; carpet page is purely ornamental

### Shamsa/medallion pages

**Identifying features:**

- A **large central medallion or rosette** dominating a full page, radiating outward like a sunburst
- Forms: 8-pointed star, 12-pointed star, circular rosette, or lobed/scalloped medallion
- Central panel contains an inscription — owner's name, dedication, title, or pious invocation
- Surrounded by arabesques, florals, or vegetal motifs in gold and lapis

**Distinguish from:**

- Binding shamsa — stamped/tooled on leather covers; shamsa PAGE is an interior illuminated page in pigments and gold, far more elaborate
- Carpet page — fills entire field with geometric/vegetal patterns without a dominant central medallion
- Zahriye — may include shamsa elements but also contains text panels and other decorative components

### Verse markers (mushaf gülleri)

**Identifying features:**

- Hierarchical system of ornamental markers in Qur'an manuscripts, from smallest to largest:
  - **Durak** (verse-ending rosettes): small ornamental rosettes at the end of each verse within the text line
  - **Hamse/aşere gülü**: marginal medallions at every 5th/10th verse
  - **Cüz/hizb gülü**: larger marginal medallions marking structural divisions (~every 10–20 pages)
  - **Secde gülü**: marginal medallions at 14 prostration verses, typically containing "secde" in white on gold
  - **Sûre başı tezhibi**: illuminated rectangular panels separating surahs
- In-text markers (durak) are within the text line; structural markers (juz', hizb, sajda) project into the margin
- Size increases with hierarchical importance

**Resolution sensitivity:** MEDIUM-HIGH — larger markers (juz', surah headbands) visible at moderate resolution; small durak rosettes require higher resolution.

**Distinguish from:**

- Marginal annotations (derkenar) — text, not ornamental medallions
- Halkâr margin decoration — continuous floral program; verse markers are discrete isolated medallions at specific intervals
- Catchwords — functional text at bottom left of verso; verse markers are ornamental and at verse/division boundaries

### Finispiece/hatime decoration

**Identifying features:**

- Colophon text in a **triangular/inverted triangular shape** — progressively shorter lines tapering to a point
- Decorated frame separating the colophon from preceding text
- In Ottoman practice, the scribe often switched from naskh to **dīwānī** script for the colophon — a distinctive convention
- Records scribe's name, date, location, and patron; illuminator signatures are rare

**Distinguish from:**

- Serlevha/ʿunwān — elaborate headpiece ABOVE beginning text; finispiece shows text narrowing to a point at the END
- Regular colophon page — may have the colophon without any decorative framing; finispiece has illuminated decoration

### Interlinear illumination (beyit arası tezhibi)

**Identifying features:**

- Decorative elements occupy the **spaces between written lines** rather than surrounding the text block
- Two principal forms:
  - **Cloud bands (bulut/abr-i band):** contour bands following the rise and fall of letters, with gold, flowers, or crosshatching filling the space between bands
  - **Floral/geometric panels:** white floral sprays on blue ground or gilt sprays filling interlinear spaces
- **Particularly associated with Safavid/Persian luxury production** — "text within cloud bands in gold" is a strong indicator

**Distinguish from:**

- Illuminated margins (kenar tezhibi) — decoration AROUND the text block in margins; interlinear illumination is BETWEEN text lines
- Halkâr — shaded gold floral painting in margins; interlinear work is typically within the text area itself
- Gold ruling (cedvel) — straight framing lines; interlinear decoration follows the organic contours of script

### Cut paper (qat'ī)

**Identifying features:**

- Individual letters, dots, and syllables **cut from paper and pasted** onto contrasting backgrounds
- Light-toned cut-outs on dark grounds (or reverse)
- The finest examples simulate written calligraphy virtually indistinguishably

**Diagnostic traces (high resolution required):**

- Slight variations in paper tone/thickness between letters and background
- Seams at letter edges where cut pieces are pasted
- Contrasting paper colors between letterforms and ground
- Combination with müsennā (mirror calligraphy) and architectural framing (mihrab shapes)

**Resolution sensitivity:** HIGH — the collage process is intentionally invisible. Seams and tone variations require high-resolution imaging to detect.

**Distinguish from:**

- Written calligraphy — seamless, uniform paper; qat'ī shows paper tone/thickness changes at letter boundaries
- Stenciled paper — pigment applied through masks; qat'ī involves physically cut and pasted paper pieces
- Silhouetted paper — pressure-transferred color; qat'ī shows discrete pasted elements with clean-cut edges

### Penwork (kalem işi)

**Identifying features:**

- Decorative embellishments executed solely with **pen and ink** — NO gold leaf, NO opaque pigments, NO lapis lazuli grounds
- Typically 1–3 ink colors (red most common, then blue, occasionally black/green)
- Simple geometric borders, pen-drawn florets and vine scrolls, marginal dividers
- Flat, single-layer execution — quick and affordable alternative to full illumination

**Most developed in the Maghribi tradition:** North African Qur'ans characteristically use polychrome ink for text AND decoration — brown ink for text, diacritics in blue/yellow, voweling in mauve/purple.

**Distinguish from:**

- Full illumination (tezhip) — uses gold leaf, opaque pigments, layered technique; penwork is flat ink only
- Halkâr — shaded gold brushwork with tonal gradients; penwork has no gold and no tonal shading
- Marginal annotations — text content; penwork is decorative patterns and borders

### Lacquer painting (roghanī)

**Identifying features:**

- Visible **surface sheen/gloss** — the hallmark indicator, from shellac varnish layer
- Slight amber yellowing from shellac aging
- Network cracking pattern — distinct from paint flaking (shellac cracks in a fine web pattern)
- Deeply saturated colors with a luminous quality from the sandwich structure (pigment between two shellac layers)
- Often on pasteboard substrate rather than paper

**Distinguish from:**

- Regular miniature painting — matte gouache on sized paper, no gloss or shellac yellowing
- Varnished modern reproduction — even, uniform gloss; lacquer painting shows aging-specific yellowing and cracking
- Oil painting — different cracking patterns (alligator cracking); lacquer shows fine web-like crazing

### Dendân-ı mûşî (sawtooth border)

**Identifying features:**

- A **continuous symmetrical zigzag or serrated edge pattern** — fine sawtooth border element
- Typically executed in burnished gold
- Defines the boundary between illuminated fields and plain paper
- Sits between the cedvel (ruling frame) and the illuminated field; outside the dendân: *kuzu* (fine line), then *tığ* (ornamental finials)

**Resolution sensitivity:** MEDIUM-HIGH — the zigzag pattern is visible at moderate resolution, but the fineness of "mouse teeth" (dendân-ı mûşî) requires higher resolution to appreciate fully.

**Distinguish from:**

- Straight cedvel (ruling lines) — continuous straight lines; dendân has a zigzag pattern
- Zencirek (chain border) — interlinked loops/rings; dendân is a simple zigzag/sawtooth
- Tığ (finials) — projecting spike-like elements extending outward; dendân is a border BETWEEN frames

### Hurde-nakş (miniature painting)

**Identifying features:**

- Decorations so small they approach the **limit of what a brush can execute**, requiring magnification to fully appreciate
- **Motifs within motifs**: hurde rūmī (rūmī nested inside larger rūmī), hurde bulut (miniature cloud fill elements)
- Extraordinary density — secondary and tertiary forms filling the interiors of primary motifs
- Distinguished from regular illumination by the exceptional fineness and density of painted elements

**Resolution sensitivity:** VERY HIGH — by definition, hurde-nakş is at the limit of visual perception. Low-resolution images will show illumination that appears standard; only high-resolution reveals the nested detail.

**Distinguish from:**

- Standard illumination — visible motifs at normal viewing distance; hurde-nakş requires magnification
- Dense but normal-scale illumination — hurde-nakş specifically features motifs WITHIN motifs, not just many motifs packed together

### Chinese paper (kāġaẕ-i Ḫiṭāʾī)

**Identifying features:**

- Imported Ming Chinese luxury paper, most commonly documented in 15th-century Timurid manuscripts
- Gold-painted designs appear at **right angles to the text direction** — the perpendicular orientation tell (Chinese horizontal sheets rotated for vertical Persian codex format)
- Vivid colors dyed on both sides: pink, mauve, olive green, light blue, orange, grey, dark purple, yellow-green
- Gold compositions depicting **Chinese subject matter**: landscapes with mountains, pavilions, and pine trees; gourd vines; pomegranates; bamboo; birds in flowering trees — subjects NOT found in Islamic paper decoration
- Fine gold sprinkles + large gold flecks + painted gold compositions (overlapping with zerefşân/zerkâri)
- Absence of diagonal burnishing lines (often visible on Islamic papers from agate/glass polishing; their absence supports but does not confirm Chinese origin)

**⚠ Visual identification provides PROBABLE attribution only.** Definitive identification requires fiber analysis (paper mulberry, ramie, hemp). When visually suspected, record as "probable Chinese paper (kāġaẕ-i Ḫiṭāʾī)" with confidence ≤ 0.7.

**Distinguish from:**

- Islamic gold-sprinkled paper (zerefşân) — irregular hand-scattered particles on burnished Islamic rag paper; Chinese: mixed gold sprinkles WITH painted gold compositions on bast-fiber paper without burnishing, designs at perpendicular orientation to text
- Islamic colored paper (mülevven) — uniformly dyed single color without gold decoration; Chinese paper: vivid color + gold decoration, often multiple colors in one manuscript
- Islamic gold-worked paper (zerkâri) — gold motifs in Islamic decorative vocabulary (hatāyī, rūmī, arabesques); Chinese paper: gold motifs in Chinese decorative vocabulary (landscapes, pavilions, gourd vines)
- Foxing or staining — irregular, unintentional brown spots; Chinese paper decoration is intentional with clear subject matter

### Identifying composite decoration (mixed)

Luxury manuscripts frequently combine multiple decoration types on the same page. Common co-occurrences:

- Gold-sprinkled paper + halkâr margins + multi-line framing (the "classic luxury triad")
- Colored paper + gold ruling + gold-sprinkled overlay
- Marbled side papers (yan kağıtları) flanking a gold-sprinkled or gold-worked text area (in albums)
- Zencirek border + cedvel framing + halkâr or illuminated margins filling the space between
- Stenciled/silhouetted leaves inserted via vassale into manuscripts with other decoration types

When multiple types are present, identify each individually. The output category should be `mixed` with all component types listed in the manuscript record's `types` array. Note the spatial relationship between them (e.g., "gold-sprinkled paper with halkâr in margins and zencirek at outer edge").

## Screenshot Coverage Assessment

Standard YEK 5-folio capture covers: front board (skip), doublure/flyleaf (check endpapers), first leaf, opening text pages. Most decorated paper is concentrated in this window.

**Common gaps** — catalogue descriptions indicating decoration BEYOND the 5-folio window:

- "ilk iki sayfa zerkârî" — first two TEXT pages may be deeper than f1–f2
- "kenarları halkâr" — may only appear at certain section openings
- "yan kağıtları ebrulu" — check both opening AND closing pages
- "renkli yaprak" — colored leaves may be scattered throughout
- "son sayfa" — final pages never in first-5 capture

When the claimed decoration is likely beyond the capture window, verdict should be `inconclusive` with a specific recommendation for targeted navigation.

## Resolution and Image Quality Heuristics

| Quality level | Gold-sprinkled | Boya efşân | Gold-worked | Marbled | Colored | Halkâr | Illum. margins | Teşʿîr | Zencirek | Framing | Silver-sprinkled | Edge gilding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| High (>300 DPI equiv.) | ✅ visible | ✅ visible | ✅ visible | ✅ visible | ✅ visible | ✅ details visible | ✅ details visible | ✅ visible | ✅ details visible | ✅ visible | ✅ visible | ✅ if angle allows |
| Medium (150–300 DPI) | ⚠ may be invisible | ⚠ color contrast helps | ✅ visible | ✅ visible | ✅ visible | ✅ presence visible | ✅ presence visible | ❌ likely invisible | ✅ pattern visible | ✅ visible | ⚠ may be invisible | ✅ if angle allows |
| Low (<150 DPI / thumbnails) | ❌ not discernible | ⚠ may resemble foxing | ⚠ large patterns visible | ✅ usually visible | ✅ visible | ⚠ may miss subtle work | ⚠ presence visible | ❌ not discernible | ⚠ may blur to line | ✅ visible | ❌ not discernible | ⚠ if angle allows |

| Quality level | Stenciled | Silhouetted | Impressed/relief | Block-printed |
| --- | --- | --- | --- | --- |
| High (>300 DPI equiv.) | ✅ motifs + diagnostic traces (bridges, haloing) | ✅ shadow effect + edge quality | ✅ visible with raking light | ✅ motifs + press indentation |
| Medium (150–300 DPI) | ✅ motifs visible; ⚠ bridges may be missed | ✅ shadow visible; ⚠ edge quality unclear | ⚠ subtle deformation hard to detect | ✅ motifs visible; ⚠ indentation unclear |
| Low (<150 DPI / thumbnails) | ⚠ motifs visible but indistinguishable from hand-painted | ⚠ may resemble staining | ❌ not discernible | ⚠ motifs visible but technique unclear |

| Quality level | Carpet page | Shamsa page | Verse markers | Finispiece | Interlinear illum. | Cut paper | Penwork | Lacquer | Dendân-ı mûşî | Hurde-nakş | Chinese paper | Vassale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| High (>300 DPI equiv.) | ✅ visible | ✅ visible | ✅ all markers visible | ✅ visible | ✅ cloud bands visible | ✅ seams detectable | ✅ ink patterns clear | ✅ sheen + cracking | ✅ zigzag clear | ✅ nested motifs visible | ✅ orientation + motifs | ✅ seam + texture change visible |
| Medium (150–300 DPI) | ✅ visible | ✅ visible | ⚠ large markers only; durak may be missed | ✅ visible | ✅ presence visible | ⚠ may appear as calligraphy | ✅ patterns visible | ⚠ sheen may be missed | ⚠ zigzag visible; fineness unclear | ❌ appears as standard illumination | ✅ color + gold compositions visible | ✅ seam visible at margin-text transition |
| Low (<150 DPI / thumbnails) | ✅ usually visible | ✅ usually visible | ⚠ surah headbands only | ⚠ triangular shape may be visible | ⚠ may miss interlinear detail | ❌ indistinguishable from writing | ⚠ may resemble simple ruling | ❌ not discernible | ❌ merges with border lines | ❌ not discernible | ⚠ color visible; detail lost | ⚠ texture difference may hint at mounting |

When resolution limits identification, always note this in the verdict limitations rather than marking `not_confirmed`.
