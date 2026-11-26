#!/usr/bin/env bash
# ==============================================================================
# Tool4SaaS — Laravel Production Backup Script
# Creates an atomic, timestamped snapshot of public/build, storage/app/blog, and Nginx configs
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
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="${BACKUP_BASE}/${TIMESTAMP}"

echo "===================================================================="
echo " Starting Tool4SaaS Laravel Production Backup: ${TIMESTAMP}"
echo "===================================================================="

mkdir -p "${BACKUP_DIR}/nginx" "${BACKUP_DIR}/public" "${BACKUP_DIR}/storage"

cd "${APP_DIR}"
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    CURRENT_COMMIT=$(git rev-parse HEAD)
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo "${CURRENT_COMMIT}" > "${BACKUP_DIR}/git-commit.txt"
    echo "${CURRENT_BRANCH}" > "${BACKUP_DIR}/git-branch.txt"
    echo "Recorded commit ${CURRENT_COMMIT} (${CURRENT_BRANCH})"
fi

if [ -d "${APP_DIR}/public/build" ]; then
    cp -r "${APP_DIR}/public/build" "${BACKUP_DIR}/public/build"
fi

if [ -d "${APP_DIR}/storage/app" ]; then
    cp -r "${APP_DIR}/storage/app" "${BACKUP_DIR}/storage/app"
fi

if [ -f "/etc/nginx/sites-enabled/tool4saas.com.conf" ]; then
    sudo cp "/etc/nginx/sites-enabled/tool4saas.com.conf" "${BACKUP_DIR}/nginx/tool4saas.com.conf"
fi

ln -sfn "${BACKUP_DIR}" "${BACKUP_BASE}/LATEST"

echo "Backup created cleanly at ${BACKUP_DIR}"
