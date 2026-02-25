# YEK Portal Search Playbook

Procedural reference for searching portal.yek.gov.tr. Used by `yek-search` and `visual-confirmation` agents.

**Scope**: Decorated paper (gold-sprinkled, marbled, colored, gold-worked) and page/margin ornamentation (halkâr, illuminated margins, framing systems) in **codex manuscripts only**. Binding features and berat/ferman document types are excluded.

## Portal Overview

**URL**: https://portal.yek.gov.tr
**Advanced search**: https://portal.yek.gov.tr/works/advancedsearch/full
**Registration**: Free, required for full access
**Language**: Turkish
**Coverage**: ~600,000 manuscript records across 252 collections in Turkey

## Authentication

The YEK portal requires login.

Workflow assumes:
- A persistent browser session
OR
- Stored cookies/session state

Credentials must NOT be stored in repository files.

## Search Interface

### Form structure
The advanced search form has:
1. A **field selector** dropdown (42 fields available)
2. An **operator** dropdown (İçeren = contains, Eşit = equals, etc.)
3. A **value** text input
4. A **search** button (Ara)

Multiple filter rows can be added for AND-combined searches.

**Default form state** (as of 2026-02-25): The form loads with **5 pre-populated rows**: Eser adi, Muellif adi, Tasnif numarasi/Konu, Koleksiyonlar (combobox, default "Hepsi"), Koleksiyon numarasi. All have Iceren operator selected and empty values. The form also persists session state across page navigations.

**Connectors**: Ve (AND) / Veya (OR) toggle at the top. Ve (AND) is the default.

⚠️ **Empty row behavior** (empirically tested 2026-02-25):

- **Rows with a field selected but empty value**: The portal **ignores** these. A search with one filled row + one empty row (field selected, value blank) returns identical results to the same search with only the filled row. The 5 default empty rows do NOT affect results.
- **Rows with "------" (no field selected)**: These cause a **JavaScript TypeError** and the search returns **zero results** with a stuck loading mask. The "+\ Kural Ekle" (Add Rule) button creates rows with "------" as default. Always select a field before submitting, or delete newly added rows that have no field selected.

For safety:
- For **single-term searches**: the default form with its 5 pre-populated empty rows is safe — no need to delete them. Just fill your target row and submit.
- For **multi-row AND searches** (Protocol D): every filled row must have both a field selected AND a non-empty value. Empty rows with selected fields are harmless.
- **Never submit** with a row whose field selector shows "------" — this crashes the search.

### Key searchable fields

| Field ID | Turkish label | Best for |
|---|---|---|
| kagit_ozellikleri | Kağıt Özellikleri | Paper type, surface treatment, decoration on paper itself |
| genel_notlar | Genel Notlar | Detailed descriptions, often includes decoration not in paper field |
| tezhip_minyatur_harita_cizim | Tezhip/Minyatür/Harita/Çizim | Illumination, miniatures, halkâr, margin decoration |
| yazi_turu | Yazı Türü | Script type — powerful precision multiplier when combined with decoration terms |
| dili | Dili | Language — use to isolate Ottoman vs. Persian vs. Arabic manuscripts |
| eser_adi | Eser Adı | Work title |
| yazar_adi | Yazar Adı | Author name |
| koleksiyon_adi | Koleksiyon Adı | Collection name |
| yer_numarasi | Yer Numarası | Shelf mark |
| konu | Konu | Subject — useful for filtering by genre (divan, mushaf, etc.) |

**Note on field evolution:** The older YEK/Yazmalar interface used **Kağıt Türü** and **Notlar** as field labels. The current portal may map these to kagit_ozellikleri and genel_notlar respectively. If field labels don't match, the categories still apply: paper treatments → paper field, ornament terms → notes/description field.

### İçeren operator behavior
The İçeren (contains) operator **tokenizes multi-word queries** and matches each word independently anywhere in the field. This means:
- ✅ "yaldız serpmeli" also matches "serpme yaldızlı" (catches variant word orders)
- ⚠️ "yaldızlı kağıt" also matches "cetvelleri yaldızlı ... kağıt" (false positive)
- ⚠️ "tezhipli" matches "başlığı tezhipli" (false positive — headpiece only)
- ⚠️ **Hyphens are tokenized**: "zer-efşan" splits into "zer" + "efşan" matched independently — results inflate to unusable levels, especially in long fields. **Never search hyphenated variants.**
- ⚠️ **Spaces behave differently from hyphens**: space-separated forms use proximity or phrase-level matching and return far fewer results than hyphenated forms. The space form `zer efşan` is a superset of the compound `zerefşan` — the extra results often contain token-split noise ("efsanevi", "efsaneler", "Bezm-efşan") unrelated to zerefşan.
- ⚠️ **"ender" contamination**: Turkish "ender" (rare/scarce) inflates space-separated "zer ender zer" because "ender" alone matches independently. Always use the compound form "zerenderzer" instead.
- ✅ **Diacritics are normalized**: "zerefşan", "zerefşân", and "zerefsan" all return identical results. **Do not search diacritic variants separately** — one form suffices.
- ℹ️ **Search hits are candidates, not evidence.** Every result must be validated against the full field text and, for ambiguous cases, against digitized images.

This behavior cannot be changed. Plan for false positives and filter them after retrieval.

## Search Term Tiers

### Tier 1: High precision (use first)
Low false positive rate — almost always genuine decorated paper or margin decoration:

| Term | Meaning | Best field |
|---|---|---|
| serpme | gold-sprinkled | kagit_ozellikleri |
| zerefşan | gold-sprinkled (Persian). Diacritics normalized — one form suffices. Also try space form `zer efşan` (superset with some noise). Never use hyphen form `zer-efşan` (causes tokenization inflation). | kagit_ozellikleri |
| altın serpme | gold-sprinkled (Turkish descriptive) | genel_notlar |
| zerkâri / zerkari | gold-worked | kagit_ozellikleri, genel_notlar |
| zer endud (space form) | gold-applied — describes berat calligraphic decoration (tughra, nisan inscriptions), not book paper. Never use hyphen form. | genel_notlar only |
| halkâr / halkar / halkârî / halkari | shaded gold floral painting | all three fields, prioritize genel_notlar |
| ebrulu | marbled (in paper field only) | kagit_ozellikleri |
| mülevven | colored paper | kagit_ozellikleri |
| boyalı | dyed/painted paper | kagit_ozellikleri |
| Doğu kâğıdı | Eastern paper | kagit_ozellikleri |
| kenar suyu | outer border illumination band | genel_notlar, tezhip field |
| dış pervaz | outer border | genel_notlar, tezhip field |
| zencirek / zencerek | chain border (interlinked rings) | genel_notlar |
| altın cetvelli / cetvelli | gold-ruled / ruled (framing system) | genel_notlar |
| teşʿîr / teşir | marginal gold drawings | genel_notlar, tezhip field |

### Tier 2: Medium precision (use second, filter carefully)
Produce genuine results but also many false positives:

| Term | Meaning | Common false positive |
|---|---|---|
| yaldızlı kağıt | gilded paper | "cetvelleri yaldızlı" (gold ruling) |
| altınlı kağıt / altınlı | gilded paper | various |
| tezhipli | illuminated | "başlığı tezhipli" (headpiece only) |
| ebrulu (in notes field) | marbled | ~85% are "ebrulu mukavva" (binding covers) |
| süslemeli | decorated | generic, many non-paper matches |
| bezemeli | ornamented | generic |
| renkli yaprak | colored leaves | genuine but inconsistently used |
| tezhipli kenar | illuminated margin | may be headpiece extension only |
| kenar süsleme | border decoration | mixed quality |
| kenar tezhibi | border illumination | mixed quality |
| kenar bezemeli | border-decorated | mixed quality |
| lacivert | lapis blue | may describe ink, not paper |
| iç pervaz | inner border band | may be generic description |
| şemse | central medallion | often binding only, not page decoration |
| salbek | pendant from medallion | binding only |
| köşebent / köşebend | corner pieces | binding only |
| tığ / tığlı | spike extensions | very common, low precision alone |
| bulut / Çin bulutu | cloud motif | very common motif term, low precision alone |
| hataî / rûmî | standard motif terms | too generic on their own |
| ruganî / lake | lacquer binding | binding context, but signals luxury production |
| murakkaʿ / murakka | album | genre indicator, not decoration — but strong co-anchor |

### Tier 3: Supplementary (for comprehensive surveys)

| Term | Meaning | Notes |
|---|---|---|
| altın mürekkeple hataî | hatāyī in gold ink | margin decoration |
| gümüş yaldız serpmeli | silver-sprinkled | very rare |
| tamamı yaldız bezemeli | entirely gold-decorated | very rare, high value |
| vassale | window-mounting | codicological technique |
| yan kağıtları ebrulu | marbled side papers | specific location |
| zerenderzer (compound only) | gold-on-gold | genel_notlar only — space and hyphen forms unusable |
| kalbur zerefşanı | sieve-sprinkled gold | technical subtype — not used by YEK cataloguers |
| fırça zerefşanı | brush-sprinkled gold | technical subtype — not used by YEK cataloguers |
| yaldızlı kenar / ağız yaldızlı | gilt edges | edge gilding, inconsistently recorded |

### Tier 3b: Paratext handles (indicate margin-heavy manuscripts)
Not decoration terms per se, but records containing these often have elaborate framing:

| Term | Meaning | Notes |
|---|---|---|
| derkenar | marginal writing | "derkenar vardır" → margin-heavy layout |
| hâşiye | marginal gloss | signals annotated margins, often framed |
| kenar notu | marginal note | same signal as derkenar |
| hāmiš (هامش) | margin (Arabic) | Arabic-language catalogue entries |

## Search Strategy Protocols

### Protocol A: Focused search (specific decoration type)
1. Search all Tier 1 terms for that type in kagit_ozellikleri
2. Repeat in genel_notlar
3. Repeat in tezhip_minyatur_harita_cizim
4. Deduplicate across fields
5. Filter false positives
6. Categorize results

### Protocol B: Broad survey (entire collection or all types)
1. Search ALL Tier 1 terms in kagit_ozellikleri
2. Search ALL Tier 1 terms in genel_notlar
3. Search ALL Tier 1 terms in tezhip_minyatur_harita_cizim
4. Expand to Tier 2 terms across all fields
5. Deduplicate across all searches
6. Filter aggressively — expect 30–35% false positive rate on Tier 2 terms
7. Report raw counts, filtered counts, and false positive rate per term

### Protocol C: Expanding previous results
1. Review which term × field combinations were already searched
2. Identify gaps in the search matrix
3. Execute missing combinations
4. Deduplicate against existing results — use the YEK record ID as the primary key; for cross-search deduplication also normalize shelfmarks (strip spaces, standardize slashes)
5. Report only net new finds

### Protocol D: Precision multiplier strategy
Use script type and language fields as AND-filters to dramatically increase precision:

**Ottoman luxury manuscripts:**
- Combine yazi_turu: **talik** (also try ta'lik) with decoration terms (zerefşan, halkâr, cetvelli)
- Ottoman evidence explicitly links taʿlîk script with zerefşan paper and halkâr margins

**Persian manuscripts:**
- Combine yazi_turu: **nestalik** (also try nesta'lik, nasta'lik) with decoration terms (zerefşan, zer efşan)
- Add dili: **Farsça** for further narrowing
- Gold-sprinkled paper clusters around 15th–16th century Timurid–Safavid production

**Deluxe Qurans:**
- Combine konu or eser_adi terms (mushaf, Kur'an) with margin decoration terms (kenar suyu, cetvelli, halkâr)

**Albums and calligraphic specimens:**
- Combine genre terms (murakka, kıt'a, levha) with paper terms (ebrulu, zerefşan)
- Marbled paper is disproportionately associated with albums (came into vogue 17th century)

### Protocol E: Spelling variant rotation
Rotate through **form variants** (compound vs. space) for key terms — cataloguer inconsistency is a major recall issue. **Do not rotate through diacritic variants** — YEK normalizes diacritics server-side, so they return identical results.

For each core term, try the usable form variants only. Key rotations:
- zerefşan → zer efşan (space form, superset)
- ebrî → ebri → ebrû → ebru → ebrulu
- halkârî → halkari → halkâr → halkar
- zencirek → zencerek
- cedvel → cetvel
- nestaʿlîk → nestalik → nesta'lik → nasta'lik
- taʿlîk → talik → ta'lik
- murakkaʿ → murakka → murakkaa
- teşʿîr → teşir → teş'ir

### Protocol F: Process vocabulary over motif vocabulary

When you need precision, prefer terms that name a **production process** over terms that name a **motif**:
- HIGH precision: zerefşan, ebrulu, cetvelli, zencirek (process/structure terms)
- LOW precision: bulut, rûmî, hataî (motif terms — too many non-margin uses)
- EXCEPTION: bulut and hataî become useful when combined with margin/border terms as co-anchors

### Protocol G: Escalation to visual confirmation

Text analysis alone is sufficient when:

- The matched term appears as a standalone, unambiguous phrase in the paper field (kagit_ozellikleri)
- No binding keywords (cilt, kapak, mukavva, mesin, köşebend) appear in the same field
- All false positive rules below are negative

Visual confirmation is required when:

- The match is in genel_notlar only (not also in kagit_ozellikleri)
- A binding FP rule fires but the manuscript has digitized images
- Text-based confidence is below 0.70
- The catalogue uses a Tier 2 or Tier 3 term

Visual confirmation is not possible when:

- No digitized images are available — record as `awaiting-visual-confirmation`

## False Positive Detection Rules

After retrieving results, apply these filters:

| Pattern to check | If found | Action |
|---|---|---|
| "cetvelleri yaldızlı" or "cedvel.*yaldız" | Gold ruling lines, not paper | Mark false positive |
| "başlığı tezhipli" or "başlık.*tezhip" | Headpiece illumination only | Mark false positive |
| "ebrulu mukavva" or "ebrulu cilt" or "ebrulu kapak" | Marbled binding, not paper | Mark false positive |
| "filigran" near matched term | Watermark description | Mark false positive |
| "cetvelleri" as only gold reference | Ruling only | Mark false positive |
| "kapak ici" near matched term | Gold-sprinkled inner cover (doublure), not paper | Mark false positive |
| "cilt içinde" wrapping the matched term | Binding description contaminating the paper field — read the full field; if the matched term falls inside a run-on binding description, mark false positive | Mark false positive |
| "zerefşan" near "şemse", "cilt", "ciltler", "mesin", "mukavva", or "köşebend" without a separate paper description | Gold-sprinkled binding medallions or cover, not paper decoration (confirmed pattern: Kastamonu Buharî set 5 vols, Kastamonu Mesnevî) | Mark false positive |
| "efsanevi", "efsaneler", or "Bezm-efşan" matched by space-separated "zer efşan" search | Token-split noise — these words contain the substring "efşan" but are grammatically and semantically unrelated to zerefşan | Mark false positive |
| "serpme tezhiplidir" or "serpme tarzında tezhip" | "serpme" modifies "tezhip" (illumination), meaning *scattered illumination motifs* between text sections — NOT gold-sprinkled paper. Confirmed by visual examination of Konya Bölge BY0000001267: plain paper with illuminated palmettes/rosettes scattered in text, no gold particles on paper surface | Mark false positive |
| "siyah serpme boyalı" | Black sprinkled paint — *siyah* (black) distinguishes this from gold/silver sprinkling; describes a painting technique, not decorated paper | Mark false positive |
| "serpme şekilde" | "in a scattered/dispersed manner" — *şekilde* means "in the manner of"; the phrase describes writing arrangement or layout, not physical gold sprinkling | Mark false positive |
| "İran işi zerefşân" near "mıkleli cilt" or "deri cilt" | Iranian-style gold-sprinkled leather binding — confirms a gold-sprinkled cover, not paper decoration. Confirmed: Kastamonu 459737 ("İran işi zerefşân kahverengi deri mıkleli cilt") | Mark false positive |
| Short multi-word term (e.g. "zer endud") matched in a long genel_notlar field where the phrase does not appear as a contiguous unit | Token-split noise — İçeren matches each word independently; "zer" is a common Ottoman prefix and may appear far from "endud" in long scholarly notes. Read the full field text to confirm. | Mark false positive if phrase is not contiguous |

**Expected false positive rates by term:**
- Tier 1 terms: ~5–10%
- Tier 2 terms: ~30–50%
- "ebrulu" in notes field: ~85% (binding covers)
- "tezhipli" alone: ~60% (headpieces)

**Document type exclusions (genuinely decorated but out of scope):**
Berat and ferman (Ottoman imperial decrees, single-sheet format) — exclude any result where the title or notes field identifies the item as a berat or ferman, even when genuine decoration is present. Key markers: "berat", "ferman", "tuğra", "nishan cümlesi" in combination with zer-endud. Do not mark as false positive — mark as `excluded` with `exclusion_reason: document_type_berat`.

## Result Categorization

Assign each genuine result to one category:

| Category | Key indicators |
|---|---|
| gold_sprinkled | serpme, zerefşân, yaldız serpme, altınlı kağıt, kalbur/fırça zerefşanı |
| gold_worked | zerkâri, zer-endûd, tamamı yaldız bezemeli, zer-ender-zer |
| marbled | ebrulu/ebrî paper (NOT binding), hatip ebru, battal ebru, gel-git/taraklı ebru |
| colored | mülevven, boyalı, renkli yaprak, lacivert paper |
| halkar_margins | halkâr, halkârî in margins |
| illuminated_margins | tezhipli kenar, kenar tezhibi, kenar süsleme, kenar suyu, dış pervaz |
| marginal_drawings | teşʿîr, tashʿīr, fine-line gold drawings in margins |
| framing_system | cetvelli, altın cetvelli, zencirek, multi-color ruling (without other margin decoration) |
| silver_sprinkled | gümüş yaldız serpmeli |
| edge_gilding | yaldızlı kenar, ağız yaldızlı |
| mixed | multiple decoration types in one manuscript |

## Navigating the YEK Viewer

### Accessing digitized images
From a manuscript detail page, look for:
- "Görüntüle" button or "Dijital Kopyalar" section
- Viewer opens with folio thumbnails on the side

### Folio capture strategy

Standard capture: first 5 folios (cover through ~f3r)

- **Folio 1**: Usually cover — skip for paper decoration
- **Folios 2–3**: Inside cover, flyleaf — check for marbled doublures, endpapers
- **Folios 3–5**: Opening text pages — most likely to show paper decoration

Use the viewer **only to identify which page numbers are relevant**. Once you know the target page numbers, fetch them via IIIF direct download for higher quality analysis images (see IIIF section below).

### Screenshot filename convention

All saved screenshots should follow this pattern:

```txt
{collection}_{shelfmark}_{folio}_{method}.png
```

- `{folio}` — zero-padded page number as returned by the viewer/IIIF (e.g. `p007`, `p014`)
- `{method}` — `view` for Playwright viewer captures, `iiif` for IIIF direct downloads

**Examples:**
- `nuruosmaniye_03880_p007_iiif.png` — page 7 fetched via IIIF
- `nuruosmaniye_03821_p007_view.png` — page 7 captured from viewer during discovery navigation

Date is recorded in the visual confirmation JSON, not in the filename. Do not include dates in filenames.

### Targeted navigation
When catalogue says decoration is on specific pages:
- "ilk iki sayfa zerkârî" → navigate past cover to first text opening
- "kenarları halkâr" → check opening pages and section openings
- "yan kağıtları ebrulu" → inspect margins carefully at page edges
- "renkli yaprak" → flip through multiple folios, colored leaves may be scattered

### Portal reliability

Turkish government portals can be intermittently slow. If a page fails to load:

- Wait 5 seconds and retry
- If viewer fails, try refreshing the detail page first

### Responsible Querying

- Avoid high-frequency automated queries.
- Pause between batch searches.
- Respect institutional access conditions.

## IIIF Direct Image Access

The YEK portal uses **IIIF Image API Level 2**. Every folio image is accessible as a plain JPEG URL — no viewer, no iframe, no OpenSeadragon wait. IIIF delivers higher native resolution than viewer screenshots and should be used for all **analysis-quality captures**. Use the viewer only when you need to navigate pages sequentially to discover which page numbers are relevant; once the target pages are identified, fetch them via IIIF.

### Image URL pattern

```txt
https://portal.yek.gov.tr/iiif/webservice/ShowImage/{internal_iiif_id}/{page}/full/{size}/0/default.jpg
```

- `{internal_iiif_id}` — 13-digit zero-padded internal image collection ID (e.g. `0000000660191`)
- `{page}` — 1-indexed page number (page 1 = first digitized image, usually cover)
- `{size}` — IIIF size parameter: `full` for native resolution, `1600,` for 1600px width, `90,` for thumbnail

**Example** (Nuruosmaniye 03880, page 7, full resolution):

```txt
https://portal.yek.gov.tr/iiif/webservice/ShowImage/0000000660191/7/full/full/0/default.jpg
```

Native resolution varies by scan (typically 1600–4500 px wide).

### Extracting the internal IIIF ID

The internal ID is **not in the detail page HTML**. Extract it by intercepting the network request to `get_manifesto_data` that fires when the "Görüntü" viewer button is clicked. Use `browser_run_code` with `page.on('request')`:

```js
async (page) => {
  const manuscripts = [
    { yekId: 177740, record: 'nuruosmaniye_03880' },
    // add more as needed
  ];
  const ids = {};
  for (const m of manuscripts) {
    const captured = [];
    const handler = req => captured.push(req.url());
    page.on('request', handler);
    await page.goto(`https://portal.yek.gov.tr/works/detail/${m.yekId}`);
    captured.length = 0;
    await page.getByRole('link', { name: 'Görüntü' }).click();
    await page.waitForTimeout(5000);
    page.off('request', handler);
    const manifestUrl = captured.find(url => url.includes('get_manifesto_data'));
    const decoded = decodeURIComponent(manifestUrl);
    const match = decoded.match(/get_manifesto_data\/(\d+)\//i);
    ids[m.record] = match ? match[1] : 'REGEX_FAIL';
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }
  return ids;
}
```

**Key notes:**

- Use `page.on('request')` not `page.waitForRequest()` — the manifest URL appears URL-encoded (`%2F`) inside the `app.html` iframe query string, so a regex on the raw URL will fail. `decodeURIComponent` fixes this.
- Clear `captured` after `page.goto` (not before) so only requests from the click are captured.
- The 5-second wait is needed for the iframe to initiate its own network requests.
- Store extracted IDs in the search JSON as `internal_iiif_id` to avoid re-extraction next session.

### Rendering IIIF images for screenshot

Navigating directly to a IIIF JPEG URL causes the browser to display binary data as text. Wrap in an HTML img tag using `browser_run_code`:

```js
async (page) => {
  const iiifUrl = 'https://portal.yek.gov.tr/iiif/webservice/ShowImage/0000000660191/7/full/full/0/default.jpg';
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;background:#000">
    <img id="img" src="${iiifUrl}" style="max-width:100%;display:block;" crossorigin="anonymous"/>
  </body></html>`);
  await page.waitForFunction(() => {
    const img = document.getElementById('img');
    return img && img.complete && img.naturalWidth > 0;
  }, { timeout: 15000 });
}
```

Then call `browser_take_screenshot` (not `page.screenshot()` inside `browser_run_code` — that times out).
