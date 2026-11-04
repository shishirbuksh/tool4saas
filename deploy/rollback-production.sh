#!/usr/bin/env bash
# ==============================================================================
# Tool4SaaS — Production Fast Rollback Script
# Reverts dist/ and Nginx configurations to the latest backup in < 60 seconds
# ==============================================================================
set -euo pipefail

# Auto-detect application directory
if [ -d "/home/tool4saas/htdocs/tool4saas.com" ]; then
    APP_DIR="/home/tool4saas/htdocs/tool4saas.com"
elif [ -d "/var/www/tool4saas" ]; then
    APP_DIR="/var/www/tool4saas"
else
    APP_DIR="$(pwd)"
fi
BACKUP_BASE="${APP_DIR}/backups"
TARGET_BACKUP="${1:-${BACKUP_BASE}/LATEST}"

echo "===================================================================="
echo " Initiating Tool4SaaS Production Rollback"
echo " Target Backup: ${TARGET_BACKUP}"
echo "===================================================================="

if [ ! -d "${TARGET_BACKUP}" ]; then
    echo "ERROR: Backup directory not found at ${TARGET_BACKUP}"
    exit 1
fi

# 1. Rollback static distribution files
if [ -d "${TARGET_BACKUP}/dist" ]; then
    echo "Restoring dist/ directory from backup..."
    rm -rf "${APP_DIR}/dist"
    cp -r "${TARGET_BACKUP}/dist" "${APP_DIR}/dist"
    echo "Restored ${APP_DIR}/dist"
else
    echo "ERROR: ${TARGET_BACKUP}/dist does not exist!"
    exit 1
fi

# 2. Rollback Nginx configuration
echo "Restoring Nginx configurations..."
if [ -f "${TARGET_BACKUP}/nginx/tool4saas.conf" ]; then
    sudo cp "${TARGET_BACKUP}/nginx/tool4saas.conf" "/etc/nginx/sites-available/tool4saas.conf"
    echo "Restored /etc/nginx/sites-available/tool4saas.conf"
fi

if [ -f "${TARGET_BACKUP}/nginx/nginx-redirects.conf" ]; then
    sudo cp "${TARGET_BACKUP}/nginx/nginx-redirects.conf" "/etc/nginx/conf.d/nginx-redirects.conf"
    echo "Restored /etc/nginx/conf.d/nginx-redirects.conf"
fi

# 3. Test and reload Nginx
echo "Validating Nginx syntax..."
sudo nginx -t

echo "Reloading Nginx daemon..."
sudo systemctl reload nginx
sudo systemctl status nginx --no-pager

# 4. Restore Git commit if recorded
cd "${APP_DIR}"
if [ -f "${TARGET_BACKUP}/git-commit.txt" ] && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    PREV_COMMIT=$(cat "${TARGET_BACKUP}/git-commit.txt")
    echo "Checking out previous Git commit: ${PREV_COMMIT}"
    git checkout "${PREV_COMMIT}"
fi

# 5. Restart PM2 application if pm2 is present
if command -v pm2 >/dev/null 2>&1; then
    echo "Restarting PM2 process..."
    pm2 restart tool4saas || true
fi

echo "===================================================================="
echo " Rollback completed successfully!"
echo " IMPORTANT: Purge Cloudflare cache now to clear edge cache:"
echo "   Dashboard -> Caching -> Configuration -> Purge Everything"
echo "===================================================================="
