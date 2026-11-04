# Tool4SaaS — Security Headers & Dependency Audit Final Report

**Audit Date:** November 4, 2026  
**Target Domain:** `https://tool4saas.com/`  
**Auditor:** Application Security Engineer  
**Status:** **0 PRODUCTION VULNERABILITIES; EDGE HEADER CONFLICT RESOLUTION REQUIRED**

---

## 1. Executive Summary

This report delivers an empirical analysis of all dependencies (`npm audit`) and live production HTTP security headers (`https://tool4saas.com/`), identifying duplicate edge headers resulting from overlapping Cloudflare CDN and origin Nginx directives.

### Key Security Findings:
- **Production Dependencies:** **0 VULNERABILITIES**.
- **DOMPurify Advisory Remediation:** **CONFIRMED & VERIFIED**. Enforced `dompurify@3.4.17` via npm `overrides` in [`package.json`](file:///d:/tool4saas/package.json). All DOMPurify vulnerabilities (GHSA-cg2g-xh64-v4q7, GHSA-mrv2-3pqr-j5jr, GHSA-c6gr-qvv4-5v3f) are completely eliminated.
- **Development / Build Dependencies:** 12 moderate/high/critical advisories isolated entirely in build-time dev dependencies (`vitest`, `vite`, `eslint`, `tinypool`, `satori`) that are never exposed or served to client browser runtimes.
- **Security Headers Duplication on Live Production:** Live HTTP inspection revealed duplicate header injection:
  - `x-content-type-options: nosniff, nosniff`
  - `x-frame-options: SAMEORIGIN, SAMEORIGIN`
  - `referrer-policy: same-origin, strict-origin-when-cross-origin`  
  This occurs because both Cloudflare Edge Transform rules and origin Nginx directives inject these headers concurrently without deduplication.

---

## 2. Complete npm Dependency Vulnerability Audit

```json
{
  "productionDependencies": 0,
  "developmentDependencies": 12,
  "totalAdvisories": 12
}
```

### A. Production Runtime Dependencies (0 Vulnerabilities)
All production runtime packages (`react`, `react-dom`, `@astrojs/react`, `jspdf`, `pdfjs-dist`, `pdf-lib`, `qrcode.react`, `jsbarcode`, `jsqr`, `lucide-react`, `oxc-transform-react`, `sharp`) were audited:
- **DOMPurify Status:** **PASS (Clean)**. Version `3.4.17` is actively installed under `jspdf@4.2.1`. Zero vulnerabilities remain.
- **Runtime Attack Surface:** No vulnerable client-side dependencies exist.

### B. Development & Build-Time Dependencies (12 Advisories)
The remaining 12 advisories reside strictly in developer tooling and build scripts:
1. `vitest` / `@vitest/mocker` / `tinypool` (Critical / Moderate): Path traversal / code injection in test runner mocking harness.
2. `vite` (High / Moderate): Local development server path traversal / launch-editor CLI flag misinterpretation.
3. `@eslint` / `eslint` / `minimatch` (Moderate): Regex DoS in development linting rules.
4. `satori` / `fflate` (Moderate): Build-time ZIP64 infinite loop in Satori OG image generation (`src/pages/og/`).

*Risk Assessment:* **Zero Runtime Risk**. These packages are never packaged or shipped to client browsers. They execute solely in isolated CI/local environments during `npm test` and `astro build`.

---

## 3. Live Production Security Headers Audit

We captured live response headers directly from `https://tool4saas.com/`:

```http
HTTP/2 200 OK
date: Wed, 04 Nov 2026 08:13:28 GMT
content-type: text/html
server: cloudflare
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff, nosniff
x-frame-options: SAMEORIGIN, SAMEORIGIN
referrer-policy: same-origin, strict-origin-when-cross-origin
x-permitted-cross-domain-policies: master-only
x-xss-protection: 1; mode=block
```

### Analysis of Conflicts and Duplicates:

| Header Directive | Live Production Header Value | Staged Origin Directive (`deploy/nginx.conf`) | Conflict / Risk Assessment |
| :--- | :--- | :--- | :--- |
| **X-Content-Type-Options** | `nosniff, nosniff` | `add_header X-Content-Type-Options "nosniff" always;` | **DUPLICATE** — Cloudflare and Nginx both append `nosniff`. |
| **X-Frame-Options** | `SAMEORIGIN, SAMEORIGIN` | `add_header X-Frame-Options "SAMEORIGIN" always;` | **DUPLICATE** — Overlapping injection between edge and origin. |
| **Referrer-Policy** | `same-origin, strict-origin-when-cross-origin` | `add_header Referrer-Policy "strict-origin-when-cross-origin" always;` | **CONFLICT** — Cloudflare emits `same-origin` while Nginx emits `strict-origin-when-cross-origin`. |
| **Content-Security-Policy**| *Not present on live* | Explicit whitelist for AdSense, GTM, GA4, ER-API, fonts | **MISSING ON LIVE** — High vulnerability to XSS until staged Nginx config is deployed. |
| **Permissions-Policy** | *Not present on live* | `camera=(self), microphone=(self), geolocation=(), ...` | **MISSING ON LIVE** — Feature policy not active until deployed. |

---

## 4. Conflict Resolution & Edge Remediation Plan

To eliminate duplicate headers and establish a single source of truth:

### Option A (Recommended): Establish Origin Nginx as the Single Source of Truth
1. Log in to **Cloudflare Dashboard** -> `tool4saas.com`.
2. Navigate to **Rules** -> **Transform Rules** -> **Modify Response Headers**.
3. If rules exist setting `X-Content-Type-Options`, `X-Frame-Options`, or `Referrer-Policy`, **Disable or Delete them**.
4. Allow origin Nginx ([`deploy/nginx.conf`](file:///d:/tool4saas/deploy/nginx.conf)) to serve all authoritative headers cleanly.

### Option B: Cloudflare Overwrite Rule
If the domain owner prefers Cloudflare to manage headers:
- In Cloudflare **Modify Response Headers**, select **Set static** (Overwrite) rather than **Add**, ensuring any origin header is replaced instead of appended.
