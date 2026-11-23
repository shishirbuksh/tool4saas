# Tool4SaaS — High-Performance Online Utilities

<p align="center">
  <a href="https://tool4saas.com">
    <img src="https://img.shields.io/badge/Live_Website-tool4saas.com-0052FF?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Website" />
  </a>
  <a href="https://tool4saas.com">
    <img src="https://img.shields.io/badge/Tools-135+_Free_Utilities-9fe870?style=for-the-badge&labelColor=163300" alt="135+ Tools" />
  </a>
  <a href="https://github.com/shishirbuksh/tool4saas/actions">
    <img src="https://img.shields.io/badge/Tests-50_Passed_·_7815_Assertions-brightgreen?style=for-the-badge&logo=pest" alt="Pest Tests" />
  </a>
  <a href="https://phpstan.org">
    <img src="https://img.shields.io/badge/PHPStan-Level_8_Compliant-blue?style=for-the-badge" alt="PHPStan Level 8" />
  </a>
</p>

A comprehensive collection of **135+ free, privacy-first, client-side productivity utilities** for developers, creators, marketers, founders, and everyday users. Built with modern **Laravel 12 (PHP 8.3+)**, **Tailwind CSS v4**, **daisyUI v5**, and **Alpine.js 3.14+**.

🌐 **Production Website:** [https://tool4saas.com](https://tool4saas.com)

---

## 🚀 Popular Live Tools

Explore directly in your browser with zero signup and zero data storage:

| Category | Popular Tools & Live Links |
|---|---|
| **Developer Tools** | [JSON Formatter](https://tool4saas.com/json-formatter) · [Base64 Encoder/Decoder](https://tool4saas.com/base64-tool) · [Hash Generator](https://tool4saas.com/hash-generator) · [SQL Formatter](https://tool4saas.com/sql-formatter) · [Regex Tester](https://tool4saas.com/regex-tester) · [SSL Checker](https://tool4saas.com/ssl-checker) · [Timestamp Converter](https://tool4saas.com/timestamp-converter) |
| **Text & Documents** | [Word Counter](https://tool4saas.com/word-counter) · [Text Tools & Cleaner](https://tool4saas.com/text-tools) · [Markdown Editor](https://tool4saas.com/markdown-editor) · [Lorem Ipsum Generator](https://tool4saas.com/lorem-ipsum) |
| **Calculators & Math** | [Percentage Calculator](https://tool4saas.com/percentage-calculator) · [BMI Calculator](https://tool4saas.com/bmi-calculator) · [Age Calculator](https://tool4saas.com/age-calculator) · [Discount Calculator](https://tool4saas.com/discount-calculator) · [Grade Calculator](https://tool4saas.com/grade-calculator) |
| **Finance & Money** | [Mortgage Calculator](https://tool4saas.com/mortgage-calculator) · [SIP Calculator](https://tool4saas.com/sip-calculator) · [EMI Calculator](https://tool4saas.com/emi-calculator) · [Salary Calculator](https://tool4saas.com/salary-calculator) · [Currency Converter](https://tool4saas.com/currency-converter) |
| **Images & Design** | [Image Compressor](https://tool4saas.com/image-compressor) · [QR Code Generator](https://tool4saas.com/qr-code-generator) · [Favicon Generator](https://tool4saas.com/favicon-generator) · [Color Contrast Checker](https://tool4saas.com/color-contrast) |
| **PDF Utilities** | [PDF Merge](https://tool4saas.com/pdf-merge) · [PDF Compress](https://tool4saas.com/pdf-compress) · [Image to PDF](https://tool4saas.com/image-to-pdf) · [PDF to Text](https://tool4saas.com/pdf-to-text) |
| **Business & Writing** | [Invoice Generator](https://tool4saas.com/invoice-generator) · [Resume Builder](https://tool4saas.com/resume-builder) · [Cover Letter Builder](https://tool4saas.com/cover-letter-builder) |
| **SEO & Marketing** | [Robots.txt Generator](https://tool4saas.com/robots-txt-generator) · [Sitemap Generator](https://tool4saas.com/sitemap-generator) · [Meta Tag Generator](https://tool4saas.com/meta-tag-generator) · [SERP Preview](https://tool4saas.com/serp-preview) |

👉 Explore all categories at [https://tool4saas.com](https://tool4saas.com).

---

## ⚡ Key Architectural Highlights

- 🔒 **100% Client-Side Privacy**: Computations and file manipulations run strictly in-browser via JavaScript/WebAssembly. Sensitive data never leaves your device.
- 🎨 **Wise.com Design Tokens**: Clean modern aesthetic built with DaisyUI v5 & Tailwind CSS v4 (`#9fe870` Vivid Lime, `#163300` Deep Forest Green, `#e8ebe6` Sage Canvas, 24px rounded card surfaces).
- 🚀 **High-Performance SSR**: Sub-50ms TTFB powered by Laravel 12 Blade components, Zend OPcache, and Varnish caching proxy.
- 🛡️ **Hardened Security & SSRF Protection**: Strict CSP with dynamic nonces, IP validation against cloud metadata (`169.254.169.254`) and private subnets, and DNS rebinding prevention.
- 🔍 **Search & AI Optimized**: Complete Open Graph, Twitter Cards, IndexNow protocol, self-referencing canonicals, and automated 301 legacy redirects.
- 🌐 **Strict English-First Architecture**: Standardized canonical English routing (`en_US`) with automated 301 redirects for legacy localized paths.

---

## 🛠️ Technology Stack

- **Backend & SSR**: Laravel 12 (PHP 8.3+)
- **Templating**: Blade Components
- **Reactivity**: Alpine.js 3.14+
- **Styling**: Tailwind CSS v4 + daisyUI v5
- **Bundler**: Vite 8 with `@tailwindcss/vite`
- **Testing**: Pest PHP 3 & PHPStan (Level 8)
- **Deployment**: Nginx + Varnish + PHP 8.3-FPM (Production-ready)

---

## 💻 Local Development

### Requirements
- PHP 8.3+ with `curl`, `mbstring`, `xml`, `openssl`, `sockets`, `gd` extensions
- Composer 2.7+
- Node.js 20+ & npm

### Setup
```bash
# Clone the repository
git clone https://github.com/shishirbuksh/tool4saas.git
cd tool4saas

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

---

## 🧪 Quality Assurance & Testing

```bash
# Run feature & unit test suite (50 tests, 7800+ assertions)
php artisan test

# Run static analysis (Strict PHPStan Level 8)
.\vendor\bin\phpstan analyse --memory-limit=1G

# Code formatting (PSR-12 via Laravel Pint)
.\vendor\bin\pint --test
```

---

## 📄 License

The Tool4SaaS codebase is open-source software licensed under the [MIT license](LICENSE).
