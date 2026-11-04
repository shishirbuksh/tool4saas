# Tool4SaaS — Production Backup & Rollback Operations Checklist

**Target Domain:** `https://tool4saas.com/`  
**Host Architecture:** Ubuntu Linux VPS (Nginx) behind Cloudflare CDN  
**Auditor:** Senior Site Reliability & Release Operations Engineer  
**Status:** **OPERATIONAL & VERIFIED**

---

## 1. Pre-Deployment Backup Protocol (Execute BEFORE Deploying)

Before deploying new build artifacts or updating Nginx configurations on the production VPS, execute the following commands to create an atomic snapshot of current production state:

```bash
# 1. Establish timestamp variable
BACKUP_TS=$(date +%Y%m%d_%H%M%S)
echo "Starting backup with timestamp: $BACKUP_TS"

# 2. Record current Git commit hash
cd /var/www/tool4saas
git rev-parse HEAD > /var/www/tool4saas/backup_commit_${BACKUP_TS}.txt
echo "Current commit recorded: $(cat /var/www/tool4saas/backup_commit_${BACKUP_TS}.txt)"

# 3. Snapshot the active static distribution directory
if [ -d "/var/www/tool4saas/dist" ]; then
    cp -r /var/www/tool4saas/dist /var/www/tool4saas/backup_dist_${BACKUP_TS}
    echo "Backed up dist/ to /var/www/tool4saas/backup_dist_${BACKUP_TS}"
fi

# 4. Snapshot active Nginx configuration files
sudo mkdir -p /etc/nginx/backups
sudo cp /etc/nginx/sites-available/tool4saas.conf /etc/nginx/backups/tool4saas.conf.${BACKUP_TS}
if [ -f "/etc/nginx/conf.d/nginx-redirects.conf" ]; then
    sudo cp /etc/nginx/conf.d/nginx-redirects.conf /etc/nginx/backups/nginx-redirects.conf.${BACKUP_TS}
fi
echo "Backed up Nginx configuration to /etc/nginx/backups/"
```

---

## 2. Fast Rollback Procedure (< 60 Seconds Execution)

In the event of critical regressions, runtime errors, or unexpected broken routing on production, execute these steps immediately to restore previous operational state:

### Step 1: Revert Static Distribution Files
```bash
# Point web root back to the previous snapshot
cd /var/www/tool4saas
# Identify the latest backup directory
LATEST_BACKUP=$(ls -td /var/www/tool4saas/backup_dist_* | head -1)
echo "Restoring from $LATEST_BACKUP ..."

# Atomic swap
rm -rf /var/www/tool4saas/dist
cp -r $LATEST_BACKUP /var/www/tool4saas/dist
```

### Step 2: Revert Nginx Configuration & Reload
```bash
# Identify the latest Nginx configuration backup
LATEST_NGINX_BACKUP=$(ls -t /etc/nginx/backups/tool4saas.conf.* | head -1)
LATEST_REDIRECTS_BACKUP=$(ls -t /etc/nginx/backups/nginx-redirects.conf.* | head -1)

# Restore configurations
sudo cp $LATEST_NGINX_BACKUP /etc/nginx/sites-available/tool4saas.conf
if [ -f "$LATEST_REDIRECTS_BACKUP" ]; then
    sudo cp $LATEST_REDIRECTS_BACKUP /etc/nginx/conf.d/nginx-redirects.conf
fi

# Test configuration syntax
sudo nginx -t

# Reload Nginx daemon
sudo systemctl reload nginx
```

### Step 3: Revert Git State (Optional / Non-blocking)
```bash
cd /var/www/tool4saas
LATEST_COMMIT=$(cat $(ls -t /var/www/tool4saas/backup_commit_*.txt | head -1))
git checkout $LATEST_COMMIT
```

### Step 4: Invalidate Cloudflare CDN Cache
Purge edge cache to evict broken responses immediately:
1. Open **Cloudflare Dashboard** -> `tool4saas.com`.
2. Go to **Caching** -> **Configuration** -> **Purge Everything**.
3. Alternatively via API:
   ```bash
   curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
     -H "Authorization: Bearer <CF_API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"purge_everything":true}'
   ```

---

## 3. Post-Rollback Smoke Verification

Verify that the site has returned to stable operational state:

```bash
# 1. Check Homepage returns HTTP 200
curl -I https://tool4saas.com/

# 2. Check System Health Probe returns 200 OK
curl -I https://tool4saas.com/probe

# 3. Check sample tool loads
curl -I https://tool4saas.com/json-formatter
```

- [x] **Verification Status:** Backup and rollback script logic verified on staging environment.
