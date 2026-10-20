# Consolidation Map — tool4saas

Status: **in progress** — rows 1–25 applied (185 → 130 tools). Evidence measured on `2b33f01`.

## Why (root cause in one line)

The site is a **template farm**: ~20 engines rendered as 185 near-identical tool pages by one
content frame (4-step `howTo` + exactly 3 guide sections + ~5 FAQs), replicated in 2 more
languages. Google's *scaled content abuse / low-value* classifier keys on **mass-produced
template pages with no marginal information gain per URL** — not on word count or duplicated
sentences (phrase de-spin is already complete: 0 shared 5-grams at df ≥ 20).

Measured signals:

| Signal | Value |
|---|---|
| Tools | 185 (12 categories) |
| Guide sections | 555 ÷ 185 = **exactly 3.0 per tool** (100% uniform) |
| FAQs | 907 (4.9/tool), 901 unique → prose is NOT duplicated |
| howTo step names | 191/740 (26%) reuse a name (`copy` 18×, `try an example` 13×) |
| Tool copy words | median 779, min 478 (not a length problem) |
| Locale pilots | 23, **23/23 same FAQ count AND guide count as EN** (1:1 clones) |
| Blog | 105 posts, median 573 words, ~68 < 700 words |
| Engine reuse | `finance-calc` → 11 components, `pdf-lib` → 22 components |

**Two levers, in order:** (1) *consolidate* duplicate-intent pages into hubs (this doc);
(2) *differentiate* what remains (separate pass).

## Principles

- **Canonical = an existing slug** wherever possible (avoids a new route). New hub slugs only
  where no existing name fits (`document-generator`, `text-tools`, `css-generator`).
- Every absorbed slug gets a **301** (Next `redirects()`, `permanent: true`) to its canonical.
- Absorbed slugs are **removed from the registry** (`src/lib/tools/data/*.ts`) so pages stop
  being generated, then `EXPECTED_TOOL_COUNT` / catalog-lite / sitemap / llms regenerate.
- Only merge when **one page satisfies the intent**. Where intent is adjacent but real, prefer
  *differentiate* (Tier B) to avoid losing long-tail.

## Tier A — safe merges (same engine + same intent)

`canonical ← absorbed` (all absorbed → 301 to canonical).

| # | Canonical | Absorbed (301 → canonical) | Δ |
|---|---|---|---|
| 1 | `json-formatter` | json-tree-viewer, json-to-yaml, yaml-to-json | −3 | ✅ done |
| 2 | `code-minifier` (retitle "Code Formatter & Minifier") | css-beautifier, html-beautifier, js-beautifier | −3 | ✅ done |
| 3 | `emi-calculator` (retitle "Loan & EMI Calculator"; kept as ES pilot) | loan-calculator, auto-loan-calculator, simple-interest-calculator | −3 | ✅ done |
| 4 | `compound-interest-calculator` (retitle "Compound Interest & CAGR Calculator") | cagr-calculator | −1 | ✅ done |
| 5 | `percentage-calculator` | percentage-change, percentage-difference | −2 | ✅ done |
| 6 | `color-converter` (hub "Color Studio") | cmyk-converter, color-palette, color-shades-generator, random-hex-color | −4 | ✅ done |
| 7 | `gradient-generator` (hub "CSS Effects") | css-box-shadow-generator, css-clip-path-generator, css-border-radius-generator | −3 | ✅ done |
| 8 | `random-number` (hub "Random Generator") | random-string, uuid-generator | −2 | ✅ done |
| 9 | `password-generator` (hub "Password & Passphrase Generator") | random-passphrase | −1 | ✅ done |
| 10 | `coin-flip` (hub "Coin Flip & Dice Roller") | dice-roller | −1 | ✅ done |
| 11 | `pdf-merge` (hub "PDF Organizer") | pdf-split, pdf-rotate, pdf-watermark | −3 | ✅ done |
| 12 | `image-compressor` (hub "Image Editor") | image-resizer, image-cropper, image-border | −3 | ✅ done |
| 13 | `invoice-generator` (hub "Invoice Studio") | freelance-gst-invoice-generator | −1 | ✅ done |
| 14 | `document-generator` **(new)** (hub "Document Generator") | quotation-generator, purchase-order-generator, receipt-generator, rent-receipt-generator, payslip-generator, offer-letter-generator | −5 | ✅ done |
| 15 | `qr-code-generator` (hub "QR Code Generator") | wifi-qr-generator | −1 | ✅ done |
| 16 | `hash-generator` (hub "Hash & HMAC") | hmac-generator | −1 | ✅ done |
| 17 | `text-tools` (hub "Text Tools") | text-reverser, case-converter, text-cleaner, text-list, text-find-replace | −4 | ✅ done |
| 18 | `word-counter` (hub "Word Counter & Analysis") | keyword-density, readability-checker | −2 | ✅ done |
| 19 | `number-to-words` (hub "Encoder") | roman-numeral, ascii-converter, base-converter | −3 | ✅ done |
| 20 | `unit-converter` (hub "Unit & File Size Converter") | file-size-converter | −1 | ✅ done |
| 21 | `serp-preview` (hub "SERP & Open Graph") | open-graph-preview | −1 | ✅ done |
| 22 | `timezone-converter` (hub "Timezone & World Clock") | world-clock | −1 | ✅ done |
| 23 | `date-calculator` (hub "Date, Countdown & Duration") | countdown-timer, work-days-calculator, time-duration-calculator | −3 | ✅ done |
| 24 | `bmi-calculator` (hub "BMI, Ideal Weight & Body Fat") | ideal-weight-calculator, body-fat-calculator | −2 | ✅ done |
| 25 | `calorie-calculator` (hub "Calorie & Macro") | macro-calculator | −1 | ✅ done |
| 26 | `period-calculator` | ovulation-calculator | −1 |
| 27 | `salary-calculator` | us-paycheck-calculator | −1 |
| 28 | `image-format-converter` | svg-to-png-converter | −1 |

**Tier A total: −60 tools absorbed** (all 60 verified present, no canonical/absorbed overlap).
185 − 60 + **2 new hub routes** = **127 tools** (visible 184 → 126).

New routes needed: `document-generator`, `text-tools` (and optionally `css-generator` if
`gradient-generator` is retitled).

## Tier B — differentiate or fold later (adjacent intent; keep only with unique value)

- **% / tax:** discount-calculator, tip-calculator, gst-calculator, us-sales-tax-calculator.
- **Pay:** income-tax-calculator, in-hand-salary-india (keep ≤2 take-home pages).
- **Home finance:** mortgage-calculator, mortgage-overpayment-calculator, refinance-calculator,
  home-affordability-calculator, home-loan-eligibility-india, rent-vs-buy-calculator
  (keep `mortgage-calculator` + 1–2).
- **PDF convert:** pdf-to-jpg, pdf-to-text, image-to-pdf, pdf-compress (distinct outputs; keep).
- **JSON convert:** json-csv, json-to-excel (high intent; keep).
- **Formatters:** xml-formatter, sql-formatter (distinct languages; keep).
- **Write-checkers:** ai-detector, plagiarism-checker, grammar-checker, text-summarizer
  (keep only if honest & differentiated).
- **Timers:** pomodoro-timer, stopwatch (merge to 1 if low value).

## Tier D — noindex / remove

- `pdf-compress` — already NOINDEX (`src/lib/tools/noindex.ts`).
- `fancy-text-generator` — 297 words (validator warning) → expand or noindex.
- `plagiarism-checker`, `ai-detector` — client-heuristic accuracy → review for honesty risk.
- **All 23 locale tool pilots** — 1:1 EN clones → noindex (already decided in Phase 1:
  `LOCALE_TOOL_INDEXABLE`). Hubs + ES blog pilot stay indexable. Δ ≈ −23 indexable URLs.

## Locale policy

Locales exist to serve localized demand, not to multiply URLs. Keep ES/FR only for tools with
(a) real translated search demand and (b) localized utility (units, currency, tax). Everything
else stays EN-only. No new locale clones until EN is clean.

## Blog thin tier (separate pass)

105 posts, median 573 words, ~68 < 700. 6 pillar posts are 2,400–2,500. Options: (a) expand
sub-500 clusters, (b) merge near-duplicate clusters, (c) noindex the thinnest. Do this after the
tool consolidation.

## URL math (indexable)

| | Before | After Tier A + D |
|---|---|---|
| EN tools | 184 | ~126 |
| Category | 8 | ~8 (recount) |
| Static + home | 7 | 7 |
| Blog | 105 (11 pillars + 94 clusters) | 105 (unchanged) |
| Locale hubs/pilots | 24 | hubs only (~2–4) |
| **Total** | **~328** | **~250** |

Tool surface −31%; blog remains the largest thin tier and the next target.

## Execution checklist (per family)

1. Build the modes UI on the canonical page (tabs/select → one engine).
2. Move the absorbed tools' unique FAQ/guide value into the hub as modes.
3. Delete absorbed entries from `src/lib/tools/data/*.ts`; add slugs to a `RETIRED_TOOLS` set if
   code still references them.
4. Add `redirects()` entries (`permanent: true`) old → canonical in `next.config.js`.
5. Update `EXPECTED_TOOL_COUNT` (`src/lib/tools/index.ts`), `EXPECTED_TOOLS`
   (`scripts/generate-catalog-lite.mjs`), `generate-edit-dates.mjs` gate.
6. Update internal links (Header/Footer/RelatedTools/category pages/blog CTAs).
7. Run: `npm run validate` → `npm run lint` → `npm test` → `npm run build`; spot-check 301s,
   sitemap, and that canonical pages render all modes.

## Open decisions for the user

1. Approve Tier A as-is, or trim the aggressive merges (e.g. keep `compound-interest`,
   `uuid-generator`, `svgo`)?
2. New hub routes: approve `document-generator` / `text-tools` (new URLs) vs reusing an
   existing slug as canonical?
3. Blog pass: expand vs merge vs noindex first?
