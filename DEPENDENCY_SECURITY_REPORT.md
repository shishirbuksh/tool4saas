# Tool4SaaS — Dependency & Production Security Verification Report

**Audit Date:** November 4, 2026  
**Target Domain:** `https://tool4saas.com/`  
**Git Branch:** `audit-and-optimization`  
**Auditor:** Senior Full-Stack Developer & Application Security Engineer  
**Status:** **SECURED & PATCHED** (Local build validated; pending production deployment sync)

---

## 1. Executive Summary

This report covers the vulnerability remediation of dependencies (specifically `dompurify` advisory GHSA-cg2g-xh64-v4q7, GHSA-mrv2-3pqr-j5jr, and GHSA-c6gr-qvv4-5v3f) and an end-to-end security audit of production headers, CSP, Permissions-Policy, and HSTS preload risk.

### Key Remediation Results:
- **DOMPurify Vulnerability:** **RESOLVED**  
  - Previous Version: `3.4.16` (bundled via `jspdf@4.2.1`).  
  - Patched Version: `3.4.17` (enforced via npm `overrides` in [`package.json`](file:///d:/tool4saas/package.json)).  
  - `npm audit` Status for DOMPurify: **0 vulnerabilities**.
- **Astro & TypeScript Health:**  
  - `astro check`: **0 errors, 0 warnings** across all 774 files.  
  - Vitest Test Suite: **31 test files, 345 unit tests PASSED (100%)**.
- **Security Headers Remediation:**  
  - **Permissions-Policy Fix:** Identified and fixed a critical flaw in [`deploy/nginx.conf`](file:///d:/tool4saas/deploy/nginx.conf) where `microphone=()` would have completely disabled the browser Web Speech API on the Speech-to-Text tool. Updated to `microphone=(self)`.
  - **Duplicate Header Detection:** Identified duplicate headers on production (`nosniff, nosniff` and `SAMEORIGIN, SAMEORIGIN`) caused by overlapping Cloudflare Edge Transform rules and origin Nginx directives.
  - **HSTS Preload Risk Assessment:** Comprehensive risk analysis conducted regarding domain preload permanence and wildcard subdomain lock-in.

---

## 2. DOMPurify Vulnerability Remediation

### Vulnerabilities Addressed:
1. **GHSA-cg2g-xh64-v4q7 (Critical / Severity: 0 CVSS unassigned, High Impact):**  
   *Title:* DOMPurify `SAFE_FOR_TEMPLATES` bypass: split template expressions survive in attached shadow root content on DOM output modes.  
   *Affected Range:* `>=3.4.4 <=3.4.16`.
2. **GHSA-mrv2-3pqr-j5jr (High):**  
   *Title:* DOMPurify `IN_PLACE`: hook that removes a parent or sibling leaves the detached subtree's event handlers armed.  
   *Affected Range:* `<=3.4.16`.
3. **GHSA-c6gr-qvv4-5v3f (Low):**  
   *Title:* DOMPurify SMIL `attributeName=href` guard skipped when parser media type is `application/xhtml+xml`.  
   *Affected Range:* `<=3.4.16`.

### Action Taken:
Configured npm dependency override in [`package.json`](file:///d:/tool4saas/package.json):
```json
"overrides": {
  "dompurify": "^3.4.17"
}
```
Executed `npm install`. Re-inspected dependency tree:
```text
tool4saas@1.0.0 D:\tool4saas
`-- jspdf@4.2.1
  `-- dompurify@3.4.17
```
Re-ran `npm audit --json`: DOMPurify is 100% clean and no longer flagged.

---

## 3. Production Security Headers & Configuration Audit

We analyzed the current live response headers at `https://tool4saas.com/` and the staging Nginx configuration at [`deploy/nginx.conf`](file:///d:/tool4saas/deploy/nginx.conf):

| Header Directive | Current Live Production | Staged `deploy/nginx.conf` | Security Assessment | Action / Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Strict-Transport-Security** | `max-age=63072000; includeSubDomains; preload` | `max-age=63072000; includeSubDomains; preload` | **STRONG** | Enforces 2-year HTTPS. See HSTS Preload Risk Analysis below. |
| **Content-Security-Policy (CSP)** | *Missing* (not emitted by live) | Configured with whitelisted Google AdSense, GTM, GA4, ER-API, fonts, and inline styles | **HIGH IMPROVEMENT** | Protects against XSS, clickjacking, and rogue external script injections. |
| **Permissions-Policy** | *Missing* (not emitted by live) | `camera=(self), microphone=(self), geolocation=(), payment=(), usb=(), bluetooth=(), display-capture=(), fullscreen=(self), picture-in-picture=()` | **CORRECTED** | `microphone=(self)` restored to permit `/speech-to-text` while blocking rogue third parties. |
| **X-Content-Type-Options** | `nosniff, nosniff` (Duplicate) | `add_header X-Content-Type-Options "nosniff" always;` | **ISSUE ON LIVE** | Cloudflare and Nginx are both injecting `nosniff`. Remove duplicate in Cloudflare Transform Rules. |
| **X-Frame-Options** | `SAMEORIGIN, SAMEORIGIN` (Duplicate) | `add_header X-Frame-Options "SAMEORIGIN" always;` | **ISSUE ON LIVE** | Remove duplicate header rule in Cloudflare Transform Rules. |
| **Referrer-Policy** | `same-origin, strict-origin-when-cross-origin` | `strict-origin-when-cross-origin` | **ACCEPTABLE** | Clean single policy in staged Nginx. |
| **Cross-Origin-Opener-Policy** | *Missing* | `same-origin-allow-popups` | **STRONG** | Protects OAuth and popup interactions. |
| **X-Permitted-Cross-Domain-Policies** | `master-only` | `none` | **STRONG** | Staged `none` restricts Flash/Silverlight cross-domain policy access. |

---

## 4. HSTS Preload Risk Assessment

The live site and [`deploy/nginx.conf`](file:///d:/tool4saas/deploy/nginx.conf) specify:
```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

### Risk Evaluation:
1. **Irreversibility:** Once `tool4saas.com` is submitted and accepted into the Chromium HSTS Preload List, the domain and ALL subdomains are hardcoded into browser binaries (Chrome, Firefox, Safari, Edge) as HTTPS-only.
2. **Subdomain Blast Radius (`includeSubDomains`):** Any future internal, staging, or partner subdomains (e.g., `dev.tool4saas.com`, `mail.tool4saas.com`, `vpn.tool4saas.com`, `staging.tool4saas.com`) MUST serve a valid CA-signed SSL certificate on port 443. Any HTTP-only service will fail to load with non-bypassable browser security errors (`NET::ERR_CERT_COMMON_NAME_INVALID` or connection failure).
3. **Removal Latency:** Removing a domain from the HSTS preload list requires manual submission to `hstspreload.org` and can take **6 to 12 months** to propagate across all client browser updates.
4. **Recommendation:**
   - If the engineering team is confident that all present and future subdomains will exclusively support HTTPS, retaining `preload` is acceptable.
   - If the domain owner plans to use self-signed staging servers or non-HTTPS microservices in the future, remove `preload` and keep `Strict-Transport-Security "max-age=31536000; includeSubDomains" always;`, which achieves an **A+ grade on SSL Labs** without binary hardcoding.

---

## 5. Verification Commands & Evidence

1. **Astro Type Check:**
   ```powershell
   npm run check
   # Result: 0 errors, 0 warnings across 774 files
   ```
2. **Automated Vitest Test Suite:**
   ```powershell
   npm test
   # Result: 31 test files passed, 345 unit tests passed (100%)
   ```
3. **DOMPurify Version Verification:**
   ```powershell
   npm list dompurify
   # Output: dompurify@3.4.17
   ```
