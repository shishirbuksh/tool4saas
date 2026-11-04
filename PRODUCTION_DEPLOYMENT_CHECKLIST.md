# Production Deployment Checklist — Tool4SaaS

**Date:** November 4, 2026  
**Auditor:** Senior DevOps & Technical SEO Specialist  
**Branch:** `audit-and-optimization`  
**Target:** Tool4SaaS Live Production VPS (`https://tool4saas.com`)  
**Deployment Status:** **READY FOR DEPLOYMENT (Awaiting Manual Approval)**

---

## 1. Pre-Deployment Verification Sign-Off

Before initiating production deployment, ensure the following local quality gates are satisfied:

- [x] **Git Branch:** Verified clean on `audit-and-optimization`.
- [x] **Astro Diagnostics:** `npm run check` passes with **0 errors, 0 warnings** across 753 files.
- [x] **Unit Tests:** `npm test` passes **345/345 unit tests** across 31 test suites.
- [x] **Static Build:** `npm run build` compiles **347 real pages** + **96 redirect stubs** = **443 files** in `dist/`.
- [x] **Route Reconciliation:** Verified 342 sitemap URLs + 5 excluded non-indexable routes = 347 real pages.
- [x] **Secret Scanning:** 0 exposed API keys or tokens in codebase.
- [ ] **Pending Bug Fix (Requires Approval):** Fix missing `await` on `PDFDocument.create()` in `PdfMergeTool.tsx` and `PdfSplitTool.tsx`.

---

## 2. Server Deployment Procedure (Step-by-Step)

> [!IMPORTANT]
> Do NOT execute these steps without explicit stakeholder approval. Deployment requires SSH access to the production VPS hosting Tool4SaaS.

### Step 1: Deploy Server-Level Nginx Redirect Configuration
To resolve the live production discrepancy where legacy URLs return HTTP 200 instead of HTTP 301:

```bash
# 1. Connect to production server via SSH
ssh root@tool4saas.com

# 2. Copy the updated redirects configuration from repository to Nginx
scp deploy/nginx-redirects.conf /etc/nginx/conf.d/nginx-redirects.conf

# 3. Verify that the main site configuration includes the redirects file
grep -rn "nginx-redirects.conf" /etc/nginx/sites-available/ /etc/nginx/conf.d/
# (If missing, add: include /etc/nginx/conf.d/nginx-redirects.conf; inside the server block)

# 4. Test Nginx syntax configuration
sudo nginx -t

# 5. Reload Nginx without dropping active connections
sudo systemctl reload nginx
```

### Step 2: Deploy Static Site Output (`dist/`)
Synchronize the compiled Astro static build to the web root:

```bash
# Rsync compiled dist files to web server root
rsync -avz --delete dist/ /var/www/tool4saas/dist/

# Ensure correct file permissions for Nginx worker user
chown -R www-data:www-data /var/www/tool4saas/dist/
chmod -R 755 /var/www/tool4saas/dist/
```

---

## 3. Post-Deployment Verification Commands

Run the following checks immediately following deployment to verify live server behavior:

### A. Test Legacy 301 Redirects (Fix Verification)
```bash
# Should return HTTP 301 with Location: https://tool4saas.com/pdf-merge
curl -I https://tool4saas.com/pdf-split

# Should return HTTP 301 with Location: https://tool4saas.com/image-compressor
curl -I https://tool4saas.com/image-resizer

# Should return HTTP 301 with Location: https://tool4saas.com/qr-code-generator
curl -I https://tool4saas.com/es/qr-code-generator
```

### B. Verify robots.txt and sitemap.xml
```bash
# Check robots.txt (Verify Disallow: /probe is present)
curl -s https://tool4saas.com/robots.txt

# Check sitemap.xml (Verify HTTP 200 and XML validity)
curl -I https://tool4saas.com/sitemap.xml
```

### C. Verify Security Headers
```bash
curl -I https://tool4saas.com/ | grep -Ei "(strict-transport|content-security|x-content-type|x-frame)"
```

---

## 4. Search Engine Indexing & Notification Tasks

### A. Google Search Console
1. Open [Google Search Console](https://search.google.com/search-console).
2. Select property `https://tool4saas.com/`.
3. Under **Sitemaps**, submit: `https://tool4saas.com/sitemap.xml`.
4. Use **URL Inspection** on:
   - `https://tool4saas.com/`
   - `https://tool4saas.com/category/calculators`
   - `https://tool4saas.com/json-formatter`
   - `https://tool4saas.com/pdf-merge`
5. Request indexing to trigger rapid re-crawling.

### B. IndexNow Instant Search Notification (Bing, Yandex, Naver)
Submit all 342 canonical URLs via the IndexNow protocol:
```bash
node scripts/submit-indexnow.mjs
```

---

## 5. Rollback Plan

If an unexpected regression occurs in production:
1. Revert Nginx configuration:
   ```bash
   rm /etc/nginx/conf.d/nginx-redirects.conf
   sudo systemctl reload nginx
   ```
2. Re-point web root to previous release backup:
   ```bash
   ln -sfn /var/www/tool4saas/dist_previous /var/www/tool4saas/dist
   sudo systemctl reload nginx
   ```
