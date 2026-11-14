#!/usr/bin/env bash
# ==============================================================================
# Tool4SaaS — CloudPanel Production Deployment Script
# Target: Hostinger VPS / CloudPanel (Debian/Ubuntu)
# ==============================================================================

set -e

echo "🚀 [1/6] Starting Tool4SaaS Production Deployment..."

# Determine deployment directory
TARGET_DIR="${1:-$(pwd)}"
cd "$TARGET_DIR"

if [ ! -f "artisan" ]; then
    echo "❌ Error: artisan not found in $TARGET_DIR. Please run this script from the project root."
    exit 1
fi

echo "📁 Working directory: $TARGET_DIR"

# 1. Environment check
echo "⚙️  [2/6] Verifying environment configuration..."
if [ ! -f ".env" ]; then
    echo "⚠️  .env not found. Copying from .env.example..."
    cp .env.example .env
fi

# Ensure APP_ENV=production and APP_DEBUG=false
sed -i 's/^APP_ENV=.*/APP_ENV=production/' .env
sed -i 's/^APP_DEBUG=.*/APP_DEBUG=false/' .env

# 2. Composer dependencies (MUST run before any artisan commands)
echo "📦 [3/6] Installing Composer production dependencies..."
if command -v composer &> /dev/null; then
    composer install --no-dev --optimize-autoloader --no-interaction
else
    echo "❌ Composer not found in PATH."
    exit 1
fi

# Generate APP_KEY if empty
if grep -q "APP_KEY=$" .env || grep -q "APP_KEY=\"\"" .env; then
    echo "🔑 Generating APP_KEY..."
    php artisan key:generate --force
fi

# 3. Permissions check
echo "🔒 [4/6] Setting directory permissions for storage and cache..."
mkdir -p storage/framework/{cache,sessions,views,testing} storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache

# If run under root, detect site owner and chown if possible
if [ "$(id -u)" -eq 0 ]; then
    SITE_USER=$(stat -c '%U' "$TARGET_DIR" 2>/dev/null || echo "")
    if [ -n "$SITE_USER" ] && [ "$SITE_USER" != "root" ]; then
        echo "👤 Setting ownership to $SITE_USER..."
        chown -R "$SITE_USER":"$SITE_USER" "$TARGET_DIR"
    fi
fi

# 4. Laravel Production Optimization Caches
echo "⚡ [5/6] Warming production caches (config, routes, views)..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Reload PHP-FPM
echo "🔄 [6/6] Reloading PHP-FPM service..."
if command -v systemctl &> /dev/null; then
    for version in 8.3 8.2 8.4; do
        if systemctl is-active --quiet "php${version}-fpm"; then
            systemctl reload "php${version}-fpm" && echo "✅ Reloaded php${version}-fpm"
            break
        fi
    done
fi

echo "🎉 Deployment successfully completed! Tool4SaaS is live and optimized."
