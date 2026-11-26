#!/usr/bin/env bash
# ==============================================================================
# Tool4SaaS — Laravel Production Fast Rollback Script
# Reverts Git state, public/build, caches, and PHP-FPM/Nginx cleanly
# ==============================================================================
set -euo pipefail

if [ -d "/home/tool4saas/htdocs/tool4saas.com" ]; then
    APP_DIR="/home/tool4saas/htdocs/tool4saas.com"
elif [ -d "/var/www/tool4saas" ]; then
    APP_DIR="/var/www/tool4saas"
else
    APP_DIR="$(pwd)"
fi
BACKUP_BASE="${APP_DIR}/backups"
TARGET_BACKUP="${1:-${BACKUP_BASE}/LATEST}"

if [ ! -d "${TARGET_BACKUP}" ]; then
    echo "ERROR: Backup directory not found at ${TARGET_BACKUP}"
    exit 1
fi

cd "${APP_DIR}"
if [ -f "${TARGET_BACKUP}/git-commit.txt" ] && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    PREV_COMMIT=$(cat "${TARGET_BACKUP}/git-commit.txt")
    git checkout "${PREV_COMMIT}"
fi

if [ -d "${TARGET_BACKUP}/public/build" ]; then
    rm -rf "${APP_DIR}/public/build"
    cp -r "${TARGET_BACKUP}/public/build" "${APP_DIR}/public/build"
fi

if command -v php >/dev/null 2>&1; then
    php artisan optimize:clear
    php artisan optimize
fi

if command -v systemctl >/dev/null 2>&1; then
    sudo systemctl reload php8.3-fpm || true
    sudo nginx -t && sudo systemctl reload nginx
fi

echo "Rollback completed. Purge Cloudflare cache from Dashboard if needed."
