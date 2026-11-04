# Tool4SaaS — Production Deployment & Operations Checklist

**Target Domain:** `https://tool4saas.com/`  
**Git Branch:** `audit-and-optimization`  
**Target Host:** Production Ubuntu VPS / Nginx / Cloudflare CDN  
**Auditor:** Senior Full-Stack Engineer & Release Operations Lead  

---

## 1. Pre-Deployment Readiness Verification

Before executing the production deployment, verify that all local checks have completed successfully:

- [x] **Git Branch Cleanliness:** Working directory on `audit-and-optimization` is clean and committed.
- [x] **Test Suite Pass:** `npm test` passes 100% (31 test files, 345 unit tests).
- [x] **Type Check Pass:** `npm run check` reports 0 errors and 0 warnings.
- [x] **Production SSG Build:** `npm run build` compiles 347 static pages in under 60s.
- [x] **Security Audit:** `dompurify@3.4.17` override is installed; `npm audit` shows 0 DOMPurify vulnerabilities.
- [x] **E2E Tool Verification:** Browser tests pass for PDF Merge, PDF Split, Speech-to-Text, and calculators.
- [x] **Route Reconciliation:** 342 canonical sitemap URLs and 96 legacy 301 redirects documented.

---

## 2. Server Deployment Procedure (Step-by-Step)

> [!IMPORTANT]
> Do NOT execute these commands on the live server without explicit sign-off from the domain owner.

### Step 1: Pull Latest Changes to Production Server
SSH into the production VPS and update the repository:
```bash
cd /var/www/tool4saas
git fetch origin
git checkout audit-and-optimization
git pull origin audit-and-optimization
```

### Step 2: Install Dependencies & Run Production Build
```bash
# Ensure Node 20+ is active
node -v

# Install dependencies with locked overrides
npm ci

# Run Astro production build
npm run build
```
*Verify that `dist/` contains 347 generated pages and `dist/sitemap.xml` is present.*

### Step 3: Update Nginx Configuration & Redirect Rules
Copy or symlink the staged Nginx configuration files:
```bash
# 1. Copy Nginx redirects mapping (all 96 legacy 301 rules)
sudo cp deploy/nginx-redirects.conf /etc/nginx/conf.d/nginx-redirects.conf

# 2. Update main Nginx server block
sudo cp deploy/nginx.conf /etc/nginx/sites-available/tool4saas.conf
sudo ln -sf /etc/nginx/sites-available/tool4saas.conf /etc/nginx/sites-enabled/

# 3. Test Nginx syntax
sudo nginx -t
```
*Expected output: `nginx: configuration file /etc/nginx/nginx.conf test is successful`*

### Step 4: Reload Nginx
```bash
sudo systemctl reload nginx
sudo systemctl status nginx
```

### Step 5: Cloudflare CDN Cache Purge
Log in to the Cloudflare dashboard:
1. Navigate to **Caching** > **Configuration**.
2. Click **Purge Everything** to invalidate stale HTML cache and legacy redirect stubs.
3. In **Rules** > **Transform Rules** (Modify Response Headers), verify that Cloudflare is NOT adding duplicate `X-Content-Type-Options: nosniff` or `X-Frame-Options: SAMEORIGIN` headers that clash with Nginx origin headers.

---

## 3. Post-Deployment Smoke Test Protocol

Run these automated or curl checks immediately following deployment:

### Test 1: Verify robots.txt Directives
```bash
curl -s https://tool4saas.com/robots.txt | grep -E "Disallow: /probe"
```
- **Pass Criteria:** `Disallow: /probe` is present.

### Test 2: Verify XML Sitemap
```bash
curl -I https://tool4saas.com/sitemap.xml
curl -s https://tool4saas.com/sitemap.xml | grep -c "<loc>"
```
- **Pass Criteria:** HTTP 200 OK, `Content-Type: application/xml`, exactly 342 `<loc>` entries.

### Test 3: Verify Legacy 301 Redirects (Nginx Edge)
Test a sample of legacy redirected URLs:
```bash
curl -I https://tool4saas.com/tools/pdf-merge
curl -I https://tool4saas.com/tools/json-formatter
curl -I https://tool4saas.com/tools/percentage-calculator
```
- **Pass Criteria:** HTTP 301 Moved Permanently, `Location: https://tool4saas.com/<target>`, 0 redirect hops, target returns HTTP 200.

### Test 4: Verify Live System Health Probe
```bash
curl -I https://tool4saas.com/probe
```
- **Pass Criteria:** HTTP 200 OK, JSON status `ok`.

### Test 5: Verify Browser Security Headers
```bash
curl -I https://tool4saas.com/
```
- **Pass Criteria:** Single `X-Content-Type-Options: nosniff`, `Permissions-Policy` includes `microphone=(self)`, `Content-Security-Policy` header present.

### Test 6: Verify Interactive Tools in Real Browser
1. Visit `https://tool4saas.com/pdf-merge` -> Upload 2 test PDFs, merge, and download. Confirm PDF opens cleanly.
2. Visit `https://tool4saas.com/speech-to-text` -> Confirm the "Privacy Note" warning alert is visible.
3. Visit `https://tool4saas.com/emi-calculator` -> Change loan amount, verify instant chart update.

---

## 4. Rollback Plan

If unexpected regressions occur during deployment:
1. **Rollback Git Branch:**
   ```bash
   git checkout <previous-commit-hash>
   npm run build
   ```
2. **Restore Previous Nginx Config:**
   ```bash
   sudo cp /etc/nginx/conf.d/nginx-redirects.conf.bak /etc/nginx/conf.d/nginx-redirects.conf
   sudo systemctl reload nginx
   ```
3. **Purge Cloudflare Cache:** Click **Purge Everything** in Cloudflare.
