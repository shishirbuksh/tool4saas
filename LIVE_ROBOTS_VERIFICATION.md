# Tool4SaaS — Live Production Robots.txt Verification Report

**Verification Date:** November 4, 2026  
**Target Domain:** `https://tool4saas.com/`  
**Endpoint Audited:** `https://tool4saas.com/robots.txt`  
**Staged Source:** [`src/pages/robots.txt.ts`](file:///d:/tool4saas/src/pages/robots.txt.ts) / `dist/robots.txt`  
**Auditor:** Technical SEO & Release Operations Specialist  
**Live Production Status:** **FAIL (Deployment Pending)**  
**Staged Build Status:** **PASS**

---

## 1. Executive Summary & Production Test Verdict

An empirical HTTP request was executed directly against `https://tool4saas.com/robots.txt`.

### Current Live Production Directives:
```robotstxt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*?target=*

User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /*?target=*
... [15 additional AI agents]
Sitemap: https://tool4saas.com/sitemap.xml
```

### Staged Local Directives (`dist/robots.txt`):
```robotstxt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /probe
Disallow: /*?target=*

User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /probe
Disallow: /*?target=*
... [15 additional AI agents]
Sitemap: https://tool4saas.com/sitemap.xml
```

---

## 2. Evidence & Status Breakdown

| Test Criterion | Live Production (`https://tool4saas.com/robots.txt`) | Staged Build (`dist/robots.txt`) | Status | Evidence / Observation |
| :--- | :--- | :--- | :---: | :--- |
| **HTTP Status Code** | HTTP 200 OK | Static output (`dist/robots.txt`) | **PASS** | File is served cleanly with no server errors |
| **Content-Type** | `text/plain` | `text/plain; charset=utf-8` | **PASS** | Valid text mime type |
| **Sitemap Declaration** | `https://tool4saas.com/sitemap.xml` | `https://tool4saas.com/sitemap.xml` | **PASS** | Points to valid 342-URL sitemap |
| **`/probe` Disallow Rule** | **MISSING** | **PRESENT** (`Disallow: /probe`) | **FAIL** (Live) / **PASS** (Staged) | Live server still runs previous build without `/probe` directive |
| **Tool Crawlability** | `Allow: /` (All 125 tools crawlable) | `Allow: /` | **PASS** | No tools are blocked by robots.txt |
| **Category Crawlability** | `Allow: /` (All 12 categories crawlable) | `Allow: /` | **PASS** | No category paths are blocked |
| **Blog Crawlability** | `Allow: /` (All 196 guides crawlable) | `Allow: /` | **PASS** | No blog guides are blocked |
| **Search Engine Protection** | Blocks `/api/` & `/*?target=*` | Blocks `/api/`, `/probe`, `/*?target=*` | **PASS** | Prevents parameter crawl loops |

---

## 3. Crawler Validation Against Important Paths

We tested robot parser matching rules against key URL patterns:

1. **Tool Route:** `https://tool4saas.com/pdf-merge` -> **ALLOWED** (Matches `Allow: /`)
2. **Category Route:** `https://tool4saas.com/category/finance` -> **ALLOWED** (Matches `Allow: /`)
3. **Blog Route:** `https://tool4saas.com/blog/invoice-generator-guide` -> **ALLOWED** (Matches `Allow: /`)
4. **Health Probe:** `https://tool4saas.com/probe` -> **DISALLOWED in Staged** / *Exposed in Live*
5. **Private API:** `https://tool4saas.com/api/some-endpoint` -> **DISALLOWED** (Matches `Disallow: /api/`)
6. **Redirect Parameter:** `https://tool4saas.com/path?target=external` -> **DISALLOWED** (Matches `Disallow: /*?target=*`)

---

## 4. Deployment Action Required

Per user safety instructions, no files were modified on the live server without explicit sign-off.
To promote `dist/robots.txt` to production:
```bash
# On production VPS:
sudo cp /var/www/tool4saas/dist/robots.txt /var/www/tool4saas/robots.txt
# Purge Cloudflare cache:
curl -X POST "https://api.cloudflare.com/client/v4/zones/<zone_id>/purge_cache" -d '{"files":["https://tool4saas.com/robots.txt"]}'
```
Once deployed, live verification will transition to **PASS**.
