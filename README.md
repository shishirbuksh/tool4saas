# Tool4SaaS — High-Performance Online Utilities

A comprehensive collection of 127 free, client-side productivity utilities for developers, creators, marketers, and businesses. Built with **Laravel 12 (PHP 8.3+)**, **Tailwind CSS v4**, **daisyUI v5**, and **Alpine.js 3.14+**.

## Highlights

- ⚡ **127 Interactive Tools**: Instant, privacy-first client-side calculations across 12 categories.
- 🔒 **100% Client-Side Privacy**: Tools process files and data locally in the browser (Zero server data transmission).
- 🎨 **daisyUI v5 & Tailwind CSS v4 Design**: High-contrast, accessibility-audited design with `expo-light` and `expo-dark` themes.
- 🚀 **Ultra-Fast Server-Side Rendering**: Laravel 12 Blade components with Alpine.js reactivity and full JSON-LD structured data.
- 🌐 **Strictly English**: Dedicated English-first canonical routing (`en_US`) with automated 301 redirects for legacy routes.
- 🔍 **Search Engine & AI Ready**: Complete OpenGraph, Twitter Cards, XML Sitemaps, and robots.txt directives tailored for search engines and AI crawlers.

## Technology Stack

- **Backend & SSR**: Laravel 12 (PHP 8.3+)
- **Templating**: Blade Components
- **Reactivity**: Alpine.js 3.14+
- **Styling**: Tailwind CSS v4 + daisyUI v5
- **Bundler**: Vite 8 with `@tailwindcss/vite`
- **Testing**: Pest PHP 3 & PHPStan (Level 8)
- **Deployment**: Nginx + PHP 8.3-FPM (Production-ready)

## Local Development

### Requirements
- PHP 8.3+ with `curl`, `mbstring`, `xml`, `openssl`, `sockets` extensions
- Composer 2.7+
- Node.js 20+ & npm

### Setup
```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Build frontend assets
npm run build

# Start local development server
php artisan serve
```

## Running Quality Assurance & Tests

```bash
# Run unit & feature tests (Pest PHP)
php ./vendor/bin/pest

# Run static analysis (PHPStan Level 8)
php ./vendor/bin/phpstan analyse --memory-limit=1G

# Build production assets
npm run build
```
