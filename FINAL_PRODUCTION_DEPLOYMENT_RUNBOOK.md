# Tool4SaaS — Controlled Production Deployment Runbook

**Target Domain:** `https://tool4saas.com/`  
**Git Branch:** `audit-and-optimization`  
**Host Architecture:** Ubuntu Linux VPS (Nginx) behind Cloudflare CDN  
**Author:** Senior Full-Stack Developer, DevOps & Site Reliability Engineer  
**Status:** **READY FOR EXECUTION (Awaiting Explicit Owner Authorization)**

> [!CAUTION]
> **SAFETY GATE NOTICE:**
> Do NOT execute these commands on the live server, do NOT connect to or modify the production VPS, do NOT change Cloudflare settings, and do NOT overwrite production files until the project owner provides explicit authorization to deploy.

---

## 1. Release Package Inventory & Staged Artifacts

Before executing deployment, verify the integrity of local artifacts in this repository:

| Component / Artifact | Staged Path | Production Destination Path | Purpose / Description |
| :--- | :--- | :--- | :--- |
| **Compiled Web Root** | `dist/` | `/home/tool4saas/htdocs/tool4saas.com/dist/` | 347 static HTML pages, WebAssembly bundles, and assets |
| **Nginx Main Config** | `deploy/nginx.conf` | `/etc/nginx/sites-available/tool4saas.conf` | HTTPS server block, CSP, Permissions-Policy, caching rules |
| **Nginx 301 Redirects**| `deploy/nginx-redirects.conf` | `/etc/nginx/conf.d/nginx-redirects.conf` | 96 legacy HTTP 301 redirect mappings (1 hop to HTTP 200) |
| **Robots.txt** | `dist/robots.txt` | `/home/tool4saas/htdocs/tool4saas.com/dist/robots.txt` | Crawler directives declaring sitemap and `Disallow: /probe` |
| **Backup Automation** | `deploy/backup-production.sh`| `/home/tool4saas/htdocs/tool4saas.com/deploy/backup-production.sh` | Atomic snapshot script for `dist/`, Nginx configs, and Git commit |
| **Rollback Automation**| `deploy/rollback-production.sh`| `/home/tool4saas/htdocs/tool4saas.com/deploy/rollback-production.sh` | Sub-60-second rollback script to restore previous operational snapshot |
| **Verification Suite** | `deploy/verify-production-deployment.mjs` | Local or VPS verification runner | Automated tests for HTTP 200, 301s, robots, headers, and PDF E2E |

---

## 2. Cloudflare Edge Configuration Adjustments

### The Issue (Duplicate Response Headers)
Live production responses currently return duplicate headers because both Cloudflare and origin Nginx emit them concurrently:
```http
x-content-type-options: nosniff, nosniff
x-frame-options: SAMEORIGIN, SAMEORIGIN
referrer-policy: same-origin, strict-origin-when-cross-origin
```

### Action Required in Cloudflare Dashboard:
1. Log in to the **Cloudflare Dashboard** -> Select domain **`tool4saas.com`**.
2. In the left navigation menu, go to **Rules** > **Transform Rules**.
3. Click the **Modify Response Header** tab.
4. **Identify and Disable/Delete Duplicate Rules:**
   - Look for any rule setting `X-Content-Type-Options` to `"nosniff"`. -> **Delete or Toggle Off**.
   - Look for any rule setting `X-Frame-Options` to `"SAMEORIGIN"`. -> **Delete or Toggle Off**.
   - Look for any rule setting `Referrer-Policy` to `"same-origin"`. -> **Delete or Toggle Off**.
5. *Alternative (Overwrite Mode):* If Cloudflare header rules are retained, change the operator from **"Add"** (which appends a comma-separated value) to **"Set static"** (which replaces the origin header).

---

## 3. Step-by-Step Controlled Deployment Procedure

Execute the following commands sequentially on the production Ubuntu VPS upon authorization.

### Step 1: Connect to Production VPS & Navigate to App Directory
```bash
ssh tool4saas@<production_vps_ip>
cd /home/tool4saas/htdocs/tool4saas.com
```
*Expected prompt:* `tool4saas@vps:/home/tool4saas/htdocs/tool4saas.com$`

---

### Step 2: Create Atomic Pre-Deployment Snapshot (Automated Backup)
Run the staged backup script or execute manual snapshot commands:
```bash
# Make script executable and run
chmod +x deploy/backup-production.sh
./deploy/backup-production.sh
```
*Expected Output:*
```text
====================================================================
 Starting Tool4SaaS Production Backup: 20261104_140000
====================================================================
Active Git Branch: main
Active Git Commit: 4d6f17b8...
Backing up active dist/ directory...
Backed up 443 files to /home/tool4saas/htdocs/tool4saas.com/backups/20261104_140000/dist
Backing up Nginx configuration...
Copied /etc/nginx/sites-available/tool4saas.conf
Copied /etc/nginx/conf.d/nginx-redirects.conf
====================================================================
 Backup successfully created at: /home/tool4saas/htdocs/tool4saas.com/backups/20261104_140000
 Pointer updated: /home/tool4saas/htdocs/tool4saas.com/backups/LATEST -> ...
====================================================================
```
*Verification:* Confirm `/home/tool4saas/htdocs/tool4saas.com/backups/LATEST/dist` exists.

---

### Step 3: Pull Release Candidate Code & Install Dependencies
```bash
# Ensure clean working directory
git fetch origin main
git reset --hard origin/main
chown -R tool4saas:tool4saas /home/tool4saas/htdocs/tool4saas.com

# Install dependencies (strictly adhering to package-lock.json with dompurify@3.4.17 override)
sudo -u tool4saas npm ci
```
*Expected Output:*
```text
added 0 packages, removed 0 packages, and audited 531 packages in 6s
12 vulnerabilities (8 moderate, 2 high, 2 critical) [all in devDependencies]
```

---

### Step 4: Execute Production Build (Astro SSG)
```bash
sudo -u tool4saas npm run build
```
*Expected Output:*
```text
validate-tools: OK – 127 tools, 12 categories, 57 icons
validate-blog: OK – 198 posts
generate-catalog-lite: wrote 127 tools, 125 search rows and registry counts
generate-edit-dates: wrote 127 tool dates + 7 page dates + 197 blog dates
generate-llms: wrote 125 tools across 12 categories + 179 clusters to public/llms.txt
generate-nginx: wrote 96 redirects to deploy/nginx-redirects.conf
[build] 347 page(s) built in ~50s
[build] Complete!
```
*Verification:* Confirm `dist/` contains 347 HTML pages and `dist/robots.txt` contains `Disallow: /probe`.

---

### Step 5: Update Nginx Configurations & Deploy 96 Redirects
```bash
# 1. Copy verified 96 HTTP 301 redirect mapping
sudo cp deploy/nginx-redirects.conf /etc/nginx/conf.d/nginx-redirects.conf

# 2. Copy main Nginx server block (with microphone=(self) and strict CSP)
sudo cp deploy/nginx.conf /etc/nginx/sites-available/tool4saas.conf
sudo ln -sf /etc/nginx/sites-available/tool4saas.conf /etc/nginx/sites-enabled/tool4saas.conf

# 3. Validate Nginx configuration syntax
sudo nginx -t

# 4. Reload Nginx Web Server
sudo systemctl reload nginx
sudo systemctl status nginx --no-pager
```
*Expected Output:*
```text
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
● nginx.service - A high performance web server and a reverse proxy server
     Active: active (running)
```

---

### Step 6: Restart PM2 Process Manager
```bash
sudo -u tool4saas pm2 restart tool4saas
sudo -u tool4saas pm2 save
```
*Expected Output:*
```text
[PM2] Applying action restartProcessId on app [tool4saas](ids: [ 0 ])
[PM2] [tool4saas](0) ✓
[PM2] Successfully saved in /home/tool4saas/.pm2/dump.pm2
```

---

### Step 7: Purge Cloudflare CDN Edge Cache
Immediately purge Cloudflare cache to evict cached redirect stubs and ensure immediate global delivery of the new build:
1. Go to **Cloudflare Dashboard** -> `tool4saas.com`.
2. Navigate to **Caching** > **Configuration**.
3. Under **Purge Cache**, click **Purge Everything**.
4. Confirm purge in modal dialog.

---

## 4. Post-Deployment Verification & Smoke Testing

Run the automated verification suite from local development machine or production terminal:

```bash
node deploy/verify-production-deployment.mjs
```

### Manual CLI Smoke Tests:

#### 1. Verify robots.txt Directives
```bash
curl -I https://tool4saas.com/robots.txt
curl -s https://tool4saas.com/robots.txt | grep -E "Disallow: /probe"
```
- **Expected Status:** HTTP 200 OK, `Content-Type: text/plain`
- **Expected Match:** `Disallow: /probe` is present.

#### 2. Verify Legacy Redirects (HTTP 301)
```bash
curl -I https://tool4saas.com/tools/pdf-merge
curl -I https://tool4saas.com/tools/json-formatter
curl -I https://tool4saas.com/es/invoice-generator
```
- **Expected Status:** `HTTP/2 301 Moved Permanently`
- **Expected Location Header:** `location: https://tool4saas.com/pdf-merge` (Exact canonical target, 1 hop).

#### 3. Verify Security Headers (No Duplicates)
```bash
curl -I https://tool4saas.com/
```
- **Expected `X-Content-Type-Options`:** `nosniff` (Single value, no duplicate comma).
- **Expected `X-Frame-Options`:** `SAMEORIGIN` (Single value).
- **Expected `Permissions-Policy`:** Contains `microphone=(self)`.
- **Expected `Content-Security-Policy`:** Present and populated with whitelist.

#### 4. Verify Interactive Tools in Browser
- **PDF Merge:** Visit `https://tool4saas.com/pdf-merge` -> Upload 2 PDFs -> Click Merge -> Verify combined PDF downloads and opens.
- **PDF Split:** Visit `https://tool4saas.com/pdf-split` -> Upload PDF -> Enter range `1-2` -> Click Split -> Verify downloaded PDF contains 2 pages.
- **Speech to Text:** Visit `https://tool4saas.com/speech-to-text` -> Verify the "Privacy Note" warning banner is visible above language select.

---

## 5. Instant Rollback Procedure (< 60 Seconds)

If any critical regression occurs post-deployment:

### Method A: Execute Automated Rollback Script
```bash
cd /var/www/tool4saas
chmod +x deploy/rollback-production.sh
./deploy/rollback-production.sh
```

### Method B: Manual Rollback Commands
```bash
cd /var/www/tool4saas

# 1. Restore previous dist directory
rm -rf dist
cp -r backups/LATEST/dist dist

# 2. Restore previous Nginx configuration
sudo cp backups/LATEST/nginx/tool4saas.conf /etc/nginx/sites-available/tool4saas.conf
sudo cp backups/LATEST/nginx/nginx-redirects.conf /etc/nginx/conf.d/nginx-redirects.conf

# 3. Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx

# 4. Checkout previous Git commit
git checkout $(cat backups/LATEST/git-commit.txt)
```

### Final Rollback Step: Purge Cloudflare Edge Cache
Go to **Cloudflare Dashboard** -> **Caching** -> **Purge Everything** to immediately evict failed responses.
