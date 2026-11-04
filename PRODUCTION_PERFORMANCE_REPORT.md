# Tool4SaaS — Production Performance & Core Web Vitals Benchmark Report

**Audit Date:** November 4, 2026  
**Target Domain:** `https://tool4saas.com/` (Tested against production build artifacts in `dist/`)  
**Git Branch:** `audit-and-optimization`  
**Auditor:** Senior Website Performance Engineer  
**Status:** **ALL TARGET PAGES PASS CORE WEB VITALS (100%)**

---

## 1. Executive Summary & Measurement Methodology

This report documents fresh, independent automated performance measurements conducted on the compiled Astro SSG distribution using Chromium automation via Playwright and Chrome DevTools Performance APIs.

### Test Environment Specification:
- **Test Engine:** Playwright / Chromium (Headless mode)
- **Host Platform:** Windows NT 10.0 x64, Node.js v24.19.0
- **Server:** Local HTTP/1.1 static server streaming production `dist/` artifacts
- **Test Data File:** `scripts/qa3/performance-results.json`
- **Distinction between Lab and Field Data:**
  - **Lab Data (Measured below):** Synthetic measurements of initial load, JavaScript hydration, LCP element render, and cumulative layout shift in a controlled environment.
  - **Field Data (CrUX / Search Console):** Aggregated real-user metrics collected by Google Chrome over a 28-day rolling window. New optimizations in this build will reflect in public CrUX reports following production deployment and traffic accumulation.

---

## 2. Desktop Broadband Performance Results (Viewport: 1280x800)

| Core Page Tested | Path | FCP (ms) | LCP (ms) | LCP Element | CLS | JS Payload (KB) | Total Size (KB) | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Homepage** | `/` | 628 | 628 | `H1#hero-heading` | 0.0000 | 427.3 | 486.2 | **PASS** |
| **Category Hub** | `/category/developer` | 236 | 236 | `H1#cat-title` | 0.0002 | 429.0 | 468.4 | **PASS** |
| **JSON Formatter** | `/json-formatter` | 276 | 276 | `DIV#tool-surface` | 0.0000 | 418.9 | 451.8 | **PASS** |
| **PDF Merge** | `/pdf-merge` | 304 | 304 | `DIV#drop-zone` | 0.0000 | 420.6 | 453.5 | **PASS** |
| **Image Compressor** | `/image-compressor` | 256 | 256 | `DIV#compressor-card` | 0.0000 | 420.1 | 452.9 | **PASS** |
| **SEO Analyzer** | `/seo-analyzer` | 304 | 304 | `FORM#audit-form` | 0.0000 | 411.1 | 442.7 | **PASS** |
| **EMI Calculator** | `/emi-calculator` | 264 | 264 | `DIV#calc-summary` | 0.0000 | 415.7 | 448.2 | **PASS** |

*Desktop Summary: Median LCP = 276 ms (Google 'Good' threshold: < 2,500 ms). Median CLS = 0.0000 (Google 'Good' threshold: < 0.1).*

---

## 3. Mobile Viewport Performance Results (Viewport: 375x667, Touch Emulation)

| Core Page Tested | Path | FCP (ms) | LCP (ms) | LCP Element | CLS | JS Payload (KB) | Total Size (KB) | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Homepage** | `/` | 280 | 280 | `H1#hero-heading` | 0.0000 | 427.3 | 485.8 | **PASS** |
| **Category Hub** | `/category/developer` | 168 | 168 | `H1#cat-title` | 0.0000 | 429.0 | 468.0 | **PASS** |
| **JSON Formatter** | `/json-formatter` | 324 | 324 | `DIV#tool-surface` | 0.0000 | 418.9 | 451.4 | **PASS** |
| **PDF Merge** | `/pdf-merge` | 512 | 512 | `DIV#drop-zone` | 0.0000 | 420.6 | 453.1 | **PASS** |
| **Image Compressor** | `/image-compressor` | 268 | 268 | `DIV#compressor-card` | 0.0000 | 420.1 | 452.5 | **PASS** |
| **SEO Analyzer** | `/seo-analyzer` | 260 | 260 | `FORM#audit-form` | 0.0000 | 411.1 | 442.3 | **PASS** |
| **EMI Calculator** | `/emi-calculator` | 224 | 224 | `DIV#calc-summary` | 0.0000 | 415.7 | 447.8 | **PASS** |

*Mobile Summary: Median LCP = 268 ms (Google 'Good' threshold: < 2,500 ms). Median CLS = 0.0000.*

---

## 4. Key Performance Architectural Factors

1. **Astro SSG Island Architecture:**  
   The shell, navigation, header, footer, SEO head, and static copy are pre-rendered to pure HTML at build time. Zero hydration is required for the document shell.
2. **Selective Client-Side Hydration:**  
   Interactive tool surfaces use `client:idle` or `client:visible`, preventing JavaScript execution from delaying initial layout and text paint.
3. **Optimized Asset Pipeline:**  
   - Font preloading and subsetting prevent FOUT (Flash of Unstyled Text).
   - Zero layout shifts (CLS = 0.0000) achieved by setting explicit aspect-ratio and reserved bounding boxes for advertising slots and tool containers.
4. **Third-Party Script Isolation:**  
   Google AdSense and Google Analytics tags are deferred behind affirmative consent, preventing non-critical third-party network blocking during primary content rendering.
