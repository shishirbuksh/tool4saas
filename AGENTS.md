# Tool4SaaS — Multi-Agent Engineering & Framework Guidelines

This codebase operates strictly on **modern Laravel 12 (PHP 8.3+)**, **Blade components**, **Alpine.js 3.14+**, **Tailwind CSS v4**, and **daisyUI v5**. Astro.js, Next.js, and Material UI (MUI) have been completely decommissioned and removed.

---

## 1. Multi-Agent Roster & Functional Specialization

When operating across subagents or multi-agent swarms, assign work according to these 4 specialized roles:

1. **Laravel & Security Specialist (`laravel-specialist`, `laravel-security`, `php-pro`, `php-best-practices`)**:
   - Owns controllers, services, middleware, DTOs, security headers, and SSRF prevention.
   - Enforces `declare(strict_types=1);` and maintains PHPStan Level 8 with 0 errors.
   - Socket connections must enforce IP validation (e.g. `FILTER_FLAG_NO_PRIV_RANGE`, blocking cloud metadata `169.254.169.254`) and connect via validated IP with SNI `peer_name` to defeat DNS rebinding.

2. **Frontend & Design Specialist (`daisyui`, `tailwindcss`, `web-design-guidelines`)**:
   - Owns Blade layouts, components, and DaisyUI v5 Wise design tokens (`wise-light`, `wise-dark`, Wise Vivid Lime `#9fe870`, Deep Forest Green `#163300`, Sage Canvas `#e8ebe6`, and 24px rounded card surfaces).
   - Ensures WCAG 2.2 AAA accessibility: 44px touch targets, skip links, visible focus rings, and high contrast.
   - Keeps client bundle minimal using native Alpine.js plugins and Tailwind CSS v4.

3. **Tool Reactivity & Client Specialist (`alpinejs`)**:
   - Owns interactive browser calculations in `resources/views/tools/`.
   - All tool computations run 100% client-side with zero data egress.
   - Uses defensive parsing (`parseFloat(val) || 0`) and proper clipboard/download utilities.

4. **Technical SEO & Growth Specialist (`seo-technical`, `seo-optimization`, `seo-sitemap`, `seo-content`, `google-adsense`)**:
   - Audits meta titles (50–60 chars), descriptions (140–160 chars), Open Graph, and Twitter Cards.
   - Audits Schema.org structured data (`WebApplication`, `BlogPosting`, `BreadcrumbList`, `Organization`).
   - Enforces English-only canonicals, robots.txt bot allowances (GPTBot, ClaudeBot, PerplexityBot), and clean XML sitemaps.

---

## 2. Core Architectural Invariants

### Zero Tolerance for Decommissioned Stacks
- **Strictly Forbidden**: Any new files or imports of Astro (`.astro`, `@astrojs/*`), Next.js (`next/*`), or Material UI (`@mui/*`, `@emotion/*`).
- **Standard Stack**: Laravel 12 + Blade + Alpine.js + Tailwind CSS v4 + daisyUI v5.

### Strict English-Only Rule (Zero Multi-Language)
- Tool4SaaS is strictly an English-language platform.
- **Root Element**: `<html lang="en" data-theme="wise-light" class="h-full">`.
- **Open Graph**: `<meta property="og:locale" content="en_US">`.
- **No Hreflang Alternates**: Do NOT emit alternate language tags (`es`, `fr`, etc.) or hreflang clusters.
- **Legacy Redirects**: Any legacy incoming request for `/es`, `/fr`, or `/es/*`, `/fr/*` MUST 301 redirect permanently to the English canonical URL (via `HandleLegacyRedirects`).

### Code Quality & Testing Standards
- **PHPStan**: Level 8 compliance is mandatory across `app/` and `config/`.
- **Testing**: Feature tests in `tests/Feature/` must test all routes, redirects, feeds, and SEO tags.
- **Formatting**: PSR-12 standard via Laravel Pint.
- **Assets**: Bundled cleanly via Vite 8 (`npm run build`).

---

## 3. Directory Layout & Source of Truth

- **Controllers**: `app/Http/Controllers/`
- **Middleware**: `app/Http/Middleware/`
- **Services**: `app/Services/`
- **Domain Models & DTOs**: `app/DTOs/`, `app/Enums/`
- **Catalog Registry**: `config/tools.php` (127 tools)
- **Category Registry**: `config/categories.php` (12 categories)
- **Redirects**: `config/redirects.php` & `deploy/nginx-redirects.conf`
- **Blog Data**: `storage/app/blog/posts.json` & `pillars.json`
- **Blade Components**: `resources/views/components/`
- **Blade Layouts**: `resources/views/components/layouts/`
- **Tool Views**: `resources/views/tools/`
- **Styling**: `resources/css/app.css` (Tailwind CSS v4 + daisyUI v5)
- **Client Scripting**: `resources/js/app.js` (Alpine.js 3.14+)
- **Production Server**: `deploy/nginx.conf`
