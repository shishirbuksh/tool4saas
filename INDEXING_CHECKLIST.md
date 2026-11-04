# Tool4SaaS Production Indexing & Search Engine Checklist

**Date:** November 2026  
**Auditor:** Google Search Optimization Specialist & Technical SEO Specialist  
**Domain:** [https://tool4saas.com/](https://tool4saas.com/)  
**Target Search Engines:** Google, Bing, Yahoo, Yandex, DuckDuckGo, AI Discovery Engines  

---

## 1. Pre-Deployment Build Verification

Before deploying any build to the live production server, execute and verify the following commands in sequence:

- [x] **1. Type Safety Check:**  
  `npm run check` — Must return **0 errors, 0 warnings** across all 757 source files.
- [x] **2. Automated Test Suite:**  
  `npm test` — Must confirm **31 test files passed, 345 tests passed**.
- [x] **3. Static Build Compilation:**  
  `npm run build` — Generates 347 HTML pages and compiles assets into `dist/`.
- [x] **4. Production Readiness Audit:**  
  `npm run verify:build` — Verifies `sitemap.xml`, `robots.txt`, `rss.xml`, OG images, and Tailwind CSS linkages.
- [x] **5. AdSense & Consent Readiness:**  
  `npm run adsense:check` — Validates `ads.txt`, Consent Mode v2 default, and YMYL disclaimers.
- [x] **6. Static Crawl Sanity:**  
  `node scripts/audit-full-site.mjs` — Confirms **0 broken links**, **0 duplicate titles**, **0 duplicate descriptions**, and **0 missing H1s**.

---

## 2. Server & Web Infrastructure Deployment Checklist

Deploy the static contents of `dist/` to the production web server (e.g. `/var/www/tool4saas/dist`):

- [ ] **1. Deploy Static Files:**  
  Sync compiled files: `rsync -avz --delete dist/ user@host:/var/www/tool4saas/dist/`
- [ ] **2. Deploy Nginx Configuration:**  
  Copy `deploy/nginx.conf` and `deploy/nginx-redirects.conf` to `/etc/nginx/sites-available/tool4saas.conf`.
- [ ] **3. Validate Web Server Configuration:**  
  Execute `nginx -t` to confirm syntax validity.
- [ ] **4. Reload Nginx Without Downtime:**  
  Execute `systemctl reload nginx`.
- [ ] **5. Test HTTP to HTTPS Redirection:**  
  Run `curl -I http://tool4saas.com/` — Must return `HTTP/1.1 301 Moved Permanently` pointing to `https://tool4saas.com/`.
- [ ] **6. Test HSTS Security Header:**  
  Run `curl -I https://tool4saas.com/` — Must confirm `strict-transport-security: max-age=63072000; includeSubDomains; preload`.
- [ ] **7. Verify robots.txt Accessibility:**  
  Run `curl -s https://tool4saas.com/robots.txt` — Must return HTTP 200 with declared sitemap URL.
- [ ] **8. Verify sitemap.xml Accessibility:**  
  Run `curl -sI https://tool4saas.com/sitemap.xml` — Must return `HTTP/1.1 200 OK` with `Content-Type: application/xml`.

---

## 3. Google Search Console (GSC) Protocol

- [ ] **1. Property Setup:**  
  Confirm domain-level property exists in Google Search Console: `sc-domain:tool4saas.com`.
- [ ] **2. Submit Fresh Sitemap:**  
  Navigate to **Sitemaps** $\rightarrow$ Enter `sitemap.xml` $\rightarrow$ Click **Submit**.  
  *Expected Result:* Status **Success**, Total discovered pages: **342**.
- [ ] **3. Priority URL Inspection Requests:**  
  Using GSC **URL Inspection**, test live URL and click **Request Indexing** for core entrypoints:
  - Homepage: `https://tool4saas.com/`
  - High-Volume Categories:
    - `https://tool4saas.com/category/calculators`
    - `https://tool4saas.com/category/pdf`
    - `https://tool4saas.com/category/developer`
    - `https://tool4saas.com/category/business`
  - High-Volume Tools:
    - `https://tool4saas.com/invoice-generator`
    - `https://tool4saas.com/resume-builder`
    - `https://tool4saas.com/qr-code-generator`
    - `https://tool4saas.com/mortgage-calculator`
    - `https://tool4saas.com/bmi-calculator`
- [ ] **4. Rich Results Testing:**  
  Test sample pages in [Google Rich Results Test](https://search.google.com/test/rich-results):
  - Homepage: Confirm `WebSite` and `ItemList` rich results.
  - Tool Page: Confirm `WebApplication`, `BreadcrumbList`, and `FAQPage` rich results.
  - Blog Guide: Confirm `Article` and `BreadcrumbList` rich results.

---

## 4. Bing Webmaster Tools & IndexNow Protocol

- [ ] **1. Bing Sitemap Submission:**  
  Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters) $\rightarrow$ **Sitemaps** $\rightarrow$ Submit `https://tool4saas.com/sitemap.xml`.
- [ ] **2. Automated IndexNow Submission:**  
  Run the automated IndexNow script to immediately broadcast all 342 canonical URLs to search engines:
  ```bash
  node scripts/submit-indexnow.mjs
  ```
  *Expected Output:* HTTP 200 or HTTP 202 from `https://api.indexnow.org`.

---

## 5. Ongoing Post-Deployment Monitoring Schedule

### Day 1 (Immediate Post-Launch):
- [ ] Check Nginx access and error logs for any 404 errors or unexpected client anomalies:
  `tail -n 100 /var/log/nginx/tool4saas.error.log`
- [ ] Confirm Google Analytics real-time tracking operates correctly after explicit cookie consent.

### Week 1:
- [ ] Review GSC **Indexing** $\rightarrow$ **Pages** report:
  - Check for "Excluded by 'noindex' tag" — Confirm only intentional slugs (`pdf-compress`, `fancy-text-generator`, redirect stubs) are listed.
  - Check for "Page with redirect" — Confirm only the 96 intended legacy redirects appear.
  - Check for "Crawled - currently not indexed" — Identify any pages requiring internal link reinforcement.

### Month 1:
- [ ] Analyze GSC **Performance** report:
  - Identify top-performing queries and landing pages.
  - Review click-through rates (CTR) and update FAQ schemas or title snippets for low-CTR queries.
- [ ] Review Core Web Vitals report for real-world user metrics (CrUX field data).
