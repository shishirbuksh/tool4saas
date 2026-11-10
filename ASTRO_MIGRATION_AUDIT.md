# Astro + astro-seo Migration Audit — tool4saas.com

**Date:** 2026-11-10
**Scope:** full `src/` tree (724 source files), build config, test config, `dist/` output
**Question:** remove Next.js and Material UI / Material icons, use only Astro + Astro icon solution, with SEO optimized.

---

## 1. What `astro-seo` actually provides

Source: `jonasmerlin/astro-seo` v1.2.0 (inspected at `node_modules/astro-seo/src/SEO.astro`, not just the README).

It is a build-time `<head>` tag generator. No runtime, no client JS, no data fetching.

| Capability | Prop | Notes |
| --- | --- | --- |
| Title | `title`, `titleTemplate`, `titleDefault` | `%s` substitution; `set:html` so entities pass through |
| Description | `description` | Omitted when falsy |
| Canonical | `canonical` | Defaults to `Astro.url`; **pass `null` to omit** (error pages) |
| Robots | `noindex`, `nofollow`, `noarchive`, `nocache`, `robotsExtras` | `robotsExtras` carries `max-snippet` etc. |
| Hreflang | `languageAlternates` | `[{ href, hrefLang }]` |
| Open Graph | `openGraph.basic` + `.optional` + `.image` + `.article` | **Throws** if `basic` lacks title/type/image |
| Twitter | `twitter` | card, site, creator, title, description, image, imageAlt |
| Escape hatch | `extend.meta` / `extend.link` | Any `<meta>` / `<link>` |
| Trailing slash | `removeTrailingSlashForRoot` | For `trailingSlash: "never"` root |

**What it does NOT do** — and therefore must stay in this repo:

1. **JSON-LD.** No structured-data support. `src/lib/seo/jsonld.ts` (15 KB of schema builders) stays.
2. **`googlebot` meta.** Emits only `name="robots"`. Kept via `extend.meta`.
3. **App/author meta.** `application-name`, `author`, `creator`, `apple-mobile-web-app-*` — kept via `extend.meta`.
4. **Title/description fitting.** `src/lib/seo-title.ts` (pixel-width-aware truncation) is project-specific and stays.
5. **Verification meta.** Kept via `extend.meta`.

Also note: `openGraph` requires `title`, `type`, **and** `image`. Your builders always pass exactly one image, so this is safe — but it is a hard runtime throw, so the mapping must supply a fallback image.

---

## 2. Codebase state

| Folder | Files | .tsx | .ts | .astro |
| --- | --- | --- | --- | --- |
| `src/components` | 273 | 270 | 2 | 1 |
| `src/views` | 141 | 141 | 0 | 0 |
| `src/content` | 198 | 0 | 198 | 0 |
| `src/lib` | 78 | 4 | 73 | 0 |
| `src/pages` | 23 | 0 | 8 | 15 |
| `src/layouts` | 2 | 0 | 0 | 2 |
| **Total source** | **724** | | | **18** |

**Verdict: Next.js is already gone.** Zero `next/*` imports. No `next.config`, no `app/` router, no server components. The site is SSG + React islands with a custom hydration scheduler (`src/lib/astro/hydrate.ts`, `hydrateApp()` in `BaseLayout.astro`).

**Verdict: Material UI was never installed.** `@mui/material` and `@mui/icons-material` are not in `package.json`. What existed was a 25-file local shim at `src/components/ds/` (69 KB) that imitated the MUI API, wired up through path aliases so `@mui/material` imports resolved to it.

---

## 3. Findings

### 3.1 Next.js remnants

| Item | Location | Severity | Status |
| --- | --- | --- | --- |
| `@mui/*` path aliases | `astro.config.mjs`, `vitest.config.ts`, `tsconfig.json` | dead config | **removed** |
| `NEXT_PUBLIC_*` env fallbacks | 38 refs / 8 files | intentional migration support | keep |
| `next/link` / `next/navigation` shim | `src/lib/astro/navigation.tsx` | internal API naming | keep (documented) |
| `"use client"` directives | 2 files | inert strings in Astro | cosmetic |
| Next-shaped `PageMeta` fields | `src/lib/seo.ts` | naming only | keep |

Nothing here blocks Astro. The only genuinely dead code was the alias layer.

### 3.2 Material UI remnants — the real refactor

`src/components/ds/` is consumed by **248 of 270 React files**. API surface actually used:

| MUI component | Call sites | | MUI component | Call sites |
| --- | --- | --- | --- | --- |
| `Box` | 166 | | `Select` | 29 |
| `Typography` | 166 | | `FormControl` | 29 |
| `Stack` | 137 | | `Container` | 19 |
| `TextField` | 130 | | `Grid` | 17 |
| `Button` | 119 | | `Slider` | 15 |
| `Alert` | 72 | | `FormControlLabel` | 13 |
| `MenuItem` | 36 | | `Paper` | 12 |
| `InputLabel` | 29 | | `ToggleButton` | 12 |

**≈1,300 call sites.** `Box`/`Typography`/`Stack` are pure layout primitives and mechanically replaceable with Tailwind. `TextField`, `Select`, `Autocomplete`, `Alert`, `Tabs`, `Drawer`, `Slider` carry real behaviour (focus management, ARIA, portal logic) — replacing those is where regressions come from.

### 3.3 Icon layer

`src/components/ds/icons.ts` (152 lines) does `import * as Lucide from "lucide-react"` and re-exports ~130 icons under MUI names (`Add`, `AccountBalance`, `ArrowDropDown`…).

Two useful facts:

1. **`lucide-react` ships zero bytes to the browser.** I scanned every `dist/_astro/*.js` chunk: no `createLucideIcon`, no `lucide-` markers. Icons are server-rendered to inline SVG at build time. There is no client-side icon cost to fix.
2. **`astro-icon` cannot replace this.** It is an Astro component; it renders only in `.astro` files. All 130 icon consumers live inside React islands, where `<Icon />` from `astro-icon` is not available.

So the icon work is: **drop the MUI naming**, not add a dependency. Recommended shape — keep one indirection, use Lucide's own names:

```tsx
// src/components/ui/Icon.tsx
import { Plus, Landmark, ChevronDown } from "lucide-react";
export const Icon = { Add: Plus, AccountBalance: Landmark, ArrowDropDown: ChevronDown };
```

That is a rename-only change per consumer, and it keeps the build-time inlining that already works.

If you want `astro-icon` anyway, the correct place is `.astro` shells (`BaseLayout`, `AppPage`, `pages/*`), where it adds zero client JS and gives you Iconify's full catalogue. It will not touch the 248 island files.

### 3.4 SEO layer

Before this pass, `src/components/SEO.astro` hand-wrote every tag. It was good — it just lacked four things `astro-seo` does for free:

| Tag | Before | After |
| --- | --- | --- |
| `robots` | `index, follow` | `index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1` |
| `og:image:url` | absent | present (OG spec) |
| `twitter:image:alt` | absent | present (a11y + Twitter spec) |
| `hreflang` | built in metadata, **never rendered** | `en` + `x-default` emitted |
| `canonical` on `/404`, `/probe` | emitted (wrong) | omitted (correct) |

Verified by diffing the rendered `<head>` of `/`, `/word-counter`, `/about`, `/404` before vs after: every other tag is byte-identical (title, description, canonical, `og:*`, `twitter:*`, `googlebot`, icons, manifest, RSS).

---

## 4. Changes applied

### 4.1 SEO

| File | Change |
| --- | --- |
| `src/components/SEO.astro` | Rewritten on `astro-seo`; keeps title fitting, `googlebot`, app meta, JSON-LD |
| `package.json` | `astro-seo@1.2.0` added |

### 4.2 Framework cleanup

| File | Change |
| --- | --- |
| `astro.config.mjs` | 4 `@mui/*` aliases deleted |
| `vitest.config.ts` | 4 `@mui/*` aliases deleted |
| `tsconfig.json` | 4 `@mui/*` path mappings deleted |

### 4.3 Icon layer (Phase C — complete)

| File | Change |
| --- | --- |
| `src/components/ui/icons.tsx` | **New.** 78 Lucide icons imported by name, re-exported as `<Name>Icon` |
| `src/components/ds/icons.ts` | **Deleted** (MUI-named shim) |
| `src/components/ds/SvgIcon.tsx` | **Deleted** (unused) |
| 93 component files | Codemodded to `@/components/ui/icons` with Lucide names |
| `src/lib/tools/icons.ts` | `ICON_NAMES` renamed from MUI to Lucide vocabulary (44 names) |
| 12 tool data files | 254 `icon:` values renamed |
| `src/components/ToolCard.tsx` | Import + `Record<IconName, CardIcon>` map regenerated |

### 4.4 Design system (Phase D1a — partial)

| Change | Count |
| --- | --- |
| `<Box>` → `<div>` (files with no `component` prop) | 517 tags / 167 files |
| `Box` import removed from those files | 167 |

**Safety proof:** rebuilt and diffed 5 representative pages (`/`, `/word-counter`, `/invoice-generator`, `/pdf-merge`, a blog pillar) against the pre-change build. After normalizing build hashes, the HTML is **byte-identical except for removed empty `class=""` attributes** — markup the browser ignores. Zero visual or DOM-semantic change.

### Verification

`astro check` 0 errors / 0 warnings · `npm test` 345/345 · `npm run build` 347 pages · `npm run verify:build` all pass.

---

## 5. Remaining work

### Phase D1b — `Box` with `component` (73 files, 645 tags)

`<Box component="span">` → `<span>`, `<Box component={Link}>` → `<Link>`. Mechanical but needs per-file tag mapping; same safety proof applies (rendered HTML must stay identical).

### Phase D2 — `Typography` (166 call sites)

`variant` maps to a tag + class set. The mapping table already exists in `Typography.tsx`, so this is a lookup codemod, but it touches headings — h1/h2 changes are SEO-relevant. Verify heading counts per page before and after.

### Phase D3–D5 — form and behaviour components

| Batch | Components | Call sites | Risk |
| --- | --- | --- | --- |
| D3 | `Button`, `IconButton`, `Chip`, `Paper` | ~145 | medium — variants |
| D4 | `TextField`, `Select`, `InputLabel`, `FormControl`, `FormControlLabel` | ~340 | high — ARIA + focus |
| D5 | `Alert`, `Tabs`, `Drawer`, `Menu`, `Autocomplete`, `Slider`, `Collapse` | ~180 | high — behaviour |

Rename `src/components/ds` → `src/components/ui` once D1–D5 land, and extend the existing guard in `tests/tools-audit-all.test.ts` to fail on any `@/components/ds` import.

---

## 6. Recommendation

**Phases A–C and D1a are done. Stop before D4/D5.**

The SEO head is now standards-compliant, the MUI icon layer is gone (module, vocabulary and 254 data values), and 517 of 1,162 `<Box>` tags are plain `<div>` — proven to render byte-identical HTML.

What is left splits cleanly by risk:

- **D1b + D2** (`Box component=`, `Typography`) — mechanical, verifiable by HTML diff. Worth finishing if the goal is "no MUI names anywhere".
- **D3** (`Button`, `Chip`, `Paper`) — low behaviour risk, moderate visual risk.
- **D4/D5** (form controls, overlays) — 520 call sites of real ARIA, focus and portal behaviour. This is where a refactor breaks 127 working tools, and it buys nothing for SEO or performance.

If the target is *cleanliness*, finish D1b + D2. If the target is *rankings*, stop here: the remaining work is naming, not ranking.
