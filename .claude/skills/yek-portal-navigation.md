# YEK Portal Navigation

Viewer navigation and IIIF access reference for `visual-confirmation`. Contains only what is
needed to locate, open, and capture manuscript folios. For search strategies, term tiers, and
false positive rules, see `yek-playbook` (loaded by `yek-search`).

**Portal URL**: https://portal.yek.gov.tr
**Coverage**: ~600,000 manuscript records across 252 collections in Turkey
**Language**: Turkish. Registration is free and required for full access.

## Authentication

The portal requires login. Use a persistent browser session or stored cookies. Credentials must
NOT be stored in repository files.

---

## Navigating to a Manuscript Record

From the main portal, navigate directly by YEK record ID:

```txt
https://portal.yek.gov.tr/works/detail/{yek_id}
```

The `yek_id` is the integer ID stored in the search JSON (`yek_id` field). If navigating from a
search session, the record URL is also present in the result metadata.

---

## Using the YEK Viewer

From a manuscript detail page, click:

- **"Görüntüle"** button, or
- **"Dijital Kopyalar"** section → viewer link

The viewer opens with folio thumbnails on the side and the current folio in the main panel.

### Folio coverage patterns (YEK default captures)

Standard YEK digitization captures approximately the first 5 pages:

| Position | Typical content |
| --- | --- |
| Page 1 | Cover — usually skip for paper decoration |
| Page 2–3 | Inside cover, flyleaf — check for marbled doublures, endpapers |
| Page 3–5 | Opening text pages — most likely to show paper decoration |

Additional pages may be captured for larger digitization campaigns. Browse thumbnails to assess
total available coverage.

### Targeted navigation

When the catalogue description specifies where decoration appears, navigate accordingly:

- "ilk iki sayfa zerkârî" → navigate past cover to first text opening
- "kenarları halkâr" → check opening pages and section openings
- "yan kağıtları ebrulu" → inspect margins carefully at page edges
- "renkli yaprak" → flip through multiple folios; colored leaves may be scattered

Use the viewer **only to identify which page numbers are relevant**. Once you know the target
page numbers, fetch them via IIIF direct download for higher quality analysis images.

### Screenshot filename convention

```txt
{collection}_{shelfmark}_{folio}_{method}.png
```

- `{folio}` — zero-padded page number as returned by the viewer/IIIF (e.g. `p007`, `p014`)
- `{method}` — `view` for Playwright viewer captures, `iiif` for IIIF direct downloads

Examples:
- `nuruosmaniye_03880_p007_iiif.png` — page 7 fetched via IIIF
- `nuruosmaniye_03821_p007_view.png` — page 7 captured from viewer during discovery navigation

Date is recorded in the visual confirmation JSON, not in the filename.

### Portal reliability

Turkish government portals can be intermittently slow. If a page fails to load: wait 5 seconds
and retry. If the viewer fails, try refreshing the detail page first.

---

## IIIF Direct Image Access

The YEK portal uses **IIIF Image API Level 2**. Every folio image is accessible as a plain JPEG
URL — no viewer, no iframe, no OpenSeadragon wait. IIIF delivers higher native resolution than
viewer screenshots. Use IIIF for all **analysis-quality captures**. Use the viewer only when you
need to browse pages to discover which page numbers are relevant.

### Image URL pattern

```txt
https://portal.yek.gov.tr/iiif/webservice/ShowImage/{internal_iiif_id}/{page}/full/{size}/0/default.jpg
```

- `{internal_iiif_id}` — 13-digit zero-padded internal image collection ID (e.g. `0000000660191`)
- `{page}` — 1-indexed page number (page 1 = first digitized image, usually cover)
- `{size}` — IIIF size parameter: `full` for native resolution, `1600,` for 1600px width, `90,` for thumbnail

Example (Nuruosmaniye 03880, page 7, full resolution):

```txt
https://portal.yek.gov.tr/iiif/webservice/ShowImage/0000000660191/7/full/full/0/default.jpg
```

Native resolution varies by scan (typically 1600–4500 px wide).

### Extracting the internal IIIF ID

The internal ID is **not in the detail page HTML**. Extract it by intercepting the network request
to `get_manifesto_data` that fires when the "Görüntü" viewer button is clicked. Use
`browser_run_code` with `page.on('request')`:

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

Key notes:
- Use `page.on('request')` not `page.waitForRequest()` — the manifest URL appears URL-encoded
  (`%2F`) inside the `app.html` iframe query string; `decodeURIComponent` fixes this
- Clear `captured` after `page.goto` (not before) so only requests from the click are captured
- The 5-second wait is needed for the iframe to initiate its own network requests
- Store extracted IDs in the search JSON as `internal_iiif_id` to avoid re-extraction next session

### Rendering IIIF images for screenshot

Navigating directly to a IIIF JPEG URL causes the browser to display binary data as text. Wrap
in an HTML img tag using `browser_run_code`:

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

Then call `browser_take_screenshot` (not `page.screenshot()` inside `browser_run_code` — that
times out).

---

## Browser Tool Efficiency

### browser_snapshot vs. browser_run_code

`browser_snapshot` returns the full accessibility tree as text — typically 5,000–30,000 tokens
per call. Use it sparingly.

**Use `browser_run_code` instead** for any state check that can be answered with a small object:

#### Confirming a detail page loaded

```js
async (page) => {
  return await page.evaluate(() => ({
    url: location.href,
    title: document.title.substring(0, 100),
    has_viewer_link: !!(
      document.querySelector('a[href*="Goruntu"]') ||
      document.querySelector('a[href*="goruntu"]') ||
      Array.from(document.querySelectorAll('a')).find(a => a.innerText.includes('Görüntü'))
    )
  }));
}
```

If `has_viewer_link` is true, the detail page loaded correctly.

#### Confirming the viewer opened

```js
async (page) => {
  return await page.evaluate(() => ({
    url: location.href,
    iframe_count: document.querySelectorAll('iframe').length,
    modal_visible: !!(
      document.querySelector('[class*="modal"][style*="display: block"]') ||
      document.querySelector('[class*="modal"].show') ||
      document.querySelector('[class*="viewer"]')
    )
  }));
}
```

#### When to still use browser_snapshot

- When a `browser_run_code` check returns unexpected results and you need to see the full UI state
- When the viewer has an error you cannot identify from a lightweight check
- The first time you encounter a portal page structure you haven't seen before in this session
