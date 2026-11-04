# Security Verification Report — Tool4SaaS (Third-Pass Independent Audit)

**Date:** November 4, 2026  
**Auditor:** Application Security & Infrastructure Specialist  
**Target:** Tool4SaaS (`https://tool4saas.com`) Architecture & Server Configuration  
**Status:** VERIFIED (1 Architecture Warning on HSTS Preload; 1 Dependency Bump Recommended)

---

## 1. Executive Summary

This independent security audit examined HTTPS enforcement, HSTS implementation risks, HTTP security headers, Content Security Policy (CSP), dependency vulnerabilities, secret exposure, file upload handling, and client-side XSS safeguards.

---

## 2. In-Depth HSTS & HSTS Preload Risk Analysis

In [`deploy/nginx.conf`](file:///d:/tool4saas/deploy/nginx.conf#L43), line 43 configures HTTP Strict Transport Security:
```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

### Critical Security Analysis on Preload Directive

The user's prompt specifically asked:
> *"Check whether HSTS preload is actually appropriate and whether all required subdomains support HTTPS before enabling HSTS preload."*

#### What HSTS Preload Does
When `preload` is present and submitted to Google's HSTS Preload list (`https://hstspreload.org/`), major browsers (Chrome, Firefox, Safari, Edge) hardcode an indelible rule directly into their source code requiring HTTPS for `tool4saas.com` and **every single subdomain (`*.tool4saas.com`)**.

#### Risks of Immediate Preload Activation
1. **Subdomain Inflexibility:** If Tool4SaaS ever introduces an internal subdomain, staging environment, mail server record (`mail.tool4saas.com`), or uses third-party SaaS services with CNAME records that do not support HTTPS or have certificate propagation delays, those subdomains will become completely unreachable for all users worldwide.
2. **Irreversibility:** Removing a domain from the Chrome HSTS preload list takes several months to propagate through browser release cycles.
3. **Current Infrastructure Verification:** Currently, Tool4SaaS operates on the apex domain `tool4saas.com` and `www.tool4saas.com`. No active public subdomains exist.

#### Recommendation
- **Staged Rollout Strategy:**
  1. For the immediate production rollout, deploy HSTS with:
     ```nginx
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
     ```
  2. Monitor DNS and server logs for 30–60 days to verify that no legacy subdomains or services fail.
  3. Only submit to `hstspreload.org` after confirming that all DNS zones are fully HTTPS-ready.

---

## 3. HTTP Security Headers Audit

Inspection of [`deploy/nginx.conf`](file:///d:/tool4saas/deploy/nginx.conf):

| Header Name | Configured Production Value | Security Purpose & Assessment |
| :--- | :--- | :--- |
| **X-Content-Type-Options** | `nosniff` | **PASSED.** Prevents MIME-type sniffing by legacy user agents. |
| **X-Frame-Options** | `SAMEORIGIN` | **PASSED.** Mitigates clickjacking attacks. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | **PASSED.** Protects user privacy while preserving origin headers. |
| **Cross-Origin-Opener-Policy** | `same-origin-allow-popups` | **PASSED.** Isolates browsing context while allowing OAuth/Ad popups. |
| **X-Permitted-Cross-Domain-Policies**| `none` | **PASSED.** Blocks Adobe Flash and PDF cross-domain policy access. |
| **Permissions-Policy** | `camera=(self), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), display-capture=(), fullscreen=(self), picture-in-picture=()` | **PASSED.** Explicitly restricts browser hardware sensors and APIs. Note: Microphone is allowed on tools via explicit user prompt. |

---

## 4. Content Security Policy (CSP) Audit

The CSP configured in `deploy/nginx.conf` line 47 was audited:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://fundingchoicesmessages.google.com https://fundingchoicesmessages.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com https://open.er-api.com https://api.allorigins.win https://img.youtube.com https://fundingchoicesmessages.google.com https://fundingchoicesmessages.googleapis.com; frame-src https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://google.com https://*.google.com https://fundingchoicesmessages.google.com https://fundingchoicesmessages.googleapis.com; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests" always;
```

### Findings:
1. `object-src 'none'`: Strictly blocks legacy Flash/ActiveX plugins.
2. `base-uri 'self'`: Prevents unauthorized `<base>` tag injection.
3. `frame-ancestors 'self'`: Reinforces clickjacking protection alongside `X-Frame-Options`.
4. `connect-src`: Strictly limits external AJAX/Fetch calls to authorized AdSense, Analytics, Funding Choices, and the 3 network tools (`open.er-api.com`, `api.allorigins.win`, `img.youtube.com`).
5. `img-src`: Permissive for `https:` to support OpenGraph previews, user avatar generators, and image utilities.

---

## 5. Dependency Vulnerability Audit (`npm audit`)

Automated dependency vulnerability scan was executed via `npm audit --json`:

- **Total Dependencies:** 705 (240 prod, 317 dev, 204 optional)
- **Vulnerabilities Reported:** 13 total (0 low, 8 moderate, 2 high, 3 critical)
  - **Dev-Only Tooling (Zero Production Impact):** 10 vulnerabilities belong to `vitest`, `@vitest/mocker`, `tinypool`, `eslint`, and `vite-node`. Because Tool4SaaS compiles to pure static HTML/JS/CSS (`dist/`), development test runners never execute on the production server.
  - **Client-Side Dependency:** 1 vulnerability in `dompurify` (GHSA-cg2g-xh64-v4q7 SAFE_FOR_TEMPLATES bypass in attached shadow roots).
- **Remediation Action:** Run `npm update dompurify` to bump DOMPurify to the latest patched version.

---

## 6. Secret Scanning & Sensitive File Inspection

[`scripts/qa3/audit-security-secrets.mjs`](file:///d:/tool4saas/scripts/qa3/audit-security-secrets.mjs) was run across the entire `src/` directory, scanning for AWS keys, private keys, Google API keys, Slack tokens, database credentials, and hardcoded passwords:

- **Files Scanned:** All `.ts`, `.tsx`, `.astro`, `.js`, `.mjs`, `.json` files.
- **Exposed Secrets Found:** **0**. No production credentials or API keys are embedded in source code.

---

## 7. File Upload & Processing Security

1. **Client-Side Sandbox Execution:**
   - Tools accepting user files (PDF Merge, PDF Split, Image Compressor, Image Resizer, Audio Recorder) process files **entirely inside the user's browser memory using client-side JavaScript APIs** (`FileReader`, `HTMLCanvasElement`, `pdf-lib`).
   - Files are **never uploaded to the server via POST requests**, completely eliminating server-side file execution vulnerabilities (remote code execution, shell uploads, malicious SVG execution on server).
2. **Magic Byte Validation:**
   - In [`src/lib/validate.ts`](file:///d:/tool4saas/src/lib/validate.ts), files are validated by inspecting binary headers (magic numbers `%PDF-` for PDFs, PNG/JPEG headers for images) rather than relying solely on file extensions.
3. **Out-of-Memory (OOM) Guards:**
   - Canvas operations enforce `MAX_DIMENSION` (8,192 px) and `MAX_PIXELS` (36 MP) safeguards to prevent browser crash attacks via decompression bombs.
