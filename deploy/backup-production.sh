#!/usr/bin/env bash
# ==============================================================================
# Tool4SaaS — Production Automated Backup Script
# Creates an atomic, timestamped snapshot of active dist/ and Nginx configurations
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
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="${BACKUP_BASE}/${TIMESTAMP}"

echo "===================================================================="
echo " Starting Tool4SaaS Production Backup: ${TIMESTAMP}"
echo "===================================================================="

mkdir -p "${BACKUP_DIR}/nginx"

# 1. Record Git commit and branch state
cd "${APP_DIR}"
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    CURRENT_COMMIT=$(git rev-parse HEAD)
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo "Active Git Branch: ${CURRENT_BRANCH}"
    echo "Active Git Commit: ${CURRENT_COMMIT}"
    echo "${CURRENT_COMMIT}" > "${BACKUP_DIR}/git-commit.txt"
    echo "${CURRENT_BRANCH}" > "${BACKUP_DIR}/git-branch.txt"
else
    echo "Warning: Not a Git repository, skipping Git commit record"
fi

# 2. Snapshot the current dist/ directory
if [ -d "${APP_DIR}/dist" ]; then
    echo "Backing up active dist/ directory..."
    cp -r "${APP_DIR}/dist" "${BACKUP_DIR}/dist"
    FILE_COUNT=$(find "${BACKUP_DIR}/dist" -type f | wc -l)
    echo "Backed up ${FILE_COUNT} files to ${BACKUP_DIR}/dist"
else
    echo "Warning: ${APP_DIR}/dist not found, skipping dist backup"
fi

# 3. Snapshot Nginx configuration files
echo "Backing up Nginx configuration..."
if [ -f "/etc/nginx/sites-available/tool4saas.conf" ]; then
    sudo cp "/etc/nginx/sites-available/tool4saas.conf" "${BACKUP_DIR}/nginx/tool4saas.conf"
    echo "Copied /etc/nginx/sites-available/tool4saas.conf"
fi

if [ -f "/etc/nginx/conf.d/nginx-redirects.conf" ]; then
    sudo cp "/etc/nginx/conf.d/nginx-redirects.conf" "${BACKUP_DIR}/nginx/nginx-redirects.conf"
    echo "Copied /etc/nginx/conf.d/nginx-redirects.conf"
fi

# 4. Update LATEST pointer
ln -sfn "${BACKUP_DIR}" "${BACKUP_BASE}/LATEST"

echo "===================================================================="
echo " Backup successfully created at: ${BACKUP_DIR}"
echo " Pointer updated: ${BACKUP_BASE}/LATEST -> ${BACKUP_DIR}"
echo "===================================================================="
