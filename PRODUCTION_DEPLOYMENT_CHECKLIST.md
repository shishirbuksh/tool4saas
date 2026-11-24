# Production Deployment Checklist — Tool4SaaS

**Audit Target**: `https://tool4saas.com/` (Hostinger VPS / CloudPanel)  
**Date**: November 24, 2026  
**Auditor**: Lead DevOps & Reliability Engineer  
**Status**: READY FOR DEPLOYMENT  

---

## 1. Pre-Deployment Verification (Local Environment)
- [x] Run full test suite: `php artisan test` (50 passed, 7,815 assertions).
- [x] Run static analysis: `./vendor/bin/phpstan analyse --memory-limit=2G` (0 errors at Level 8).
- [x] Check code style: `./vendor/bin/pint --test`.
- [x] Confirm clean git status with all changes committed to `main`.

---

## 2. Production Deployment Steps (Run on VPS)

```bash
# 1. Navigate to application root
cd /home/tool4saas/htdocs/tool4saas.com

# 2. Pull latest code from GitHub
git fetch origin
git reset --hard origin/main

# 3. Clear and re-compile application caches
php artisan optimize:clear
php artisan optimize

# 4. Enforce strict permissions
chown -R tool4saas:tool4saas /home/tool4saas/htdocs/tool4saas.com
chmod -R 775 storage bootstrap/cache

# 5. Submit updated URLs via IndexNow
php artisan seo:indexnow

# 6. Gracefully reload Nginx
sudo systemctl reload nginx
```

---

## 3. Post-Deployment Smoke Tests

```bash
# 1. Verify Homepage responds with HTTP 200
curl -I https://tool4saas.com/

# 2. Verify Sitemap contains 319 URLs and valid XML
curl -s https://tool4saas.com/sitemap.xml | grep "<url>" | wc -l

# 3. Verify /text-cleaner returns HTTP 301
curl -I https://tool4saas.com/text-cleaner

# 4. Verify LLM Feeds respond with 133 tools
curl -s https://tool4saas.com/llms.txt | head -n 5
curl -s https://tool4saas.com/llms-full.txt | head -n 5

# 5. Verify Zero Ghost Node/Next/Astro processes
ps aux | grep -Ei "(node|next|astro)" | grep -v grep
```
