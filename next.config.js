/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    // Multiple root layouts (app/(en|es|fr)) have no single layout to compose a
    // global 404 from → use app/global-not-found.tsx for unmatched URLs.
    globalNotFound: true,
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@mui/material-nextjs",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tool4saas.com" }],
        destination: "https://tool4saas.com/:path*",
        permanent: true,
      },
      // Consolidation: absorbed tools now live as views inside /json-formatter.
      { source: "/json-to-yaml", destination: "/json-formatter", permanent: true },
      { source: "/yaml-to-json", destination: "/json-formatter", permanent: true },
      { source: "/json-tree-viewer", destination: "/json-formatter", permanent: true },
      // Consolidation: absorbed tools now live as views inside /code-minifier.
      { source: "/html-beautifier", destination: "/code-minifier", permanent: true },
      { source: "/css-beautifier", destination: "/code-minifier", permanent: true },
      { source: "/js-beautifier", destination: "/code-minifier", permanent: true },
      // Consolidation: absorbed tools now live as views inside /emi-calculator.
      { source: "/loan-calculator", destination: "/emi-calculator", permanent: true },
      { source: "/auto-loan-calculator", destination: "/emi-calculator", permanent: true },
      { source: "/simple-interest-calculator", destination: "/emi-calculator", permanent: true },
      // Consolidation: cagr-calculator now live as a view inside /compound-interest-calculator.
      { source: "/cagr-calculator", destination: "/compound-interest-calculator", permanent: true },
      // Consolidation: absorbed tools now live as views inside /percentage-calculator.
      { source: "/percentage-change", destination: "/percentage-calculator", permanent: true },
      { source: "/percentage-difference", destination: "/percentage-calculator", permanent: true },
      // Consolidation: color tools now live as views inside /color-converter.
      { source: "/cmyk-converter", destination: "/color-converter", permanent: true },
      { source: "/color-palette", destination: "/color-converter", permanent: true },
      { source: "/color-shades-generator", destination: "/color-converter", permanent: true },
      { source: "/random-hex-color", destination: "/color-converter", permanent: true },
      // Consolidation: CSS effect tools now live as views inside /gradient-generator.
      { source: "/css-box-shadow-generator", destination: "/gradient-generator", permanent: true },
      { source: "/css-border-radius-generator", destination: "/gradient-generator", permanent: true },
      { source: "/css-clip-path-generator", destination: "/gradient-generator", permanent: true },
      // Consolidation: random string and UUID tools now live as views inside /random-number.
      { source: "/random-string", destination: "/random-number", permanent: true },
      { source: "/uuid-generator", destination: "/random-number", permanent: true },
      // Consolidation: passphrase generation now lives as a view inside /password-generator.
      { source: "/random-passphrase", destination: "/password-generator", permanent: true },
      // Consolidation: dice rolling now lives as a view inside /coin-flip.
      { source: "/dice-roller", destination: "/coin-flip", permanent: true },
      // Consolidation: split, rotate and watermark now live as views inside /pdf-merge.
      { source: "/pdf-split", destination: "/pdf-merge", permanent: true },
      { source: "/pdf-rotate", destination: "/pdf-merge", permanent: true },
      { source: "/pdf-watermark", destination: "/pdf-merge", permanent: true },
      // Consolidation: resize, crop and border now live as views inside /image-compressor.
      { source: "/image-resizer", destination: "/image-compressor", permanent: true },
      { source: "/image-cropper", destination: "/image-compressor", permanent: true },
      { source: "/image-border", destination: "/image-compressor", permanent: true },
      // Consolidation: GST invoice generation now lives as a view inside /invoice-generator.
      { source: "/freelance-gst-invoice-generator", destination: "/invoice-generator", permanent: true },
      // Consolidation: quotation, PO, receipt, rent receipt, payslip and offer letter now live in /document-generator.
      { source: "/quotation-generator", destination: "/document-generator", permanent: true },
      { source: "/purchase-order-generator", destination: "/document-generator", permanent: true },
      { source: "/receipt-generator", destination: "/document-generator", permanent: true },
      { source: "/rent-receipt-generator", destination: "/document-generator", permanent: true },
      { source: "/payslip-generator", destination: "/document-generator", permanent: true },
      { source: "/offer-letter-generator", destination: "/document-generator", permanent: true },
      // Consolidation: WiFi QR generation now lives as a view inside /qr-code-generator.
      { source: "/wifi-qr-generator", destination: "/qr-code-generator", permanent: true },
      // Consolidation: HMAC hashing now lives as a view inside /hash-generator.
      { source: "/hmac-generator", destination: "/hash-generator", permanent: true },
      // Consolidation: text cleaning, case, reverse, list and find/replace now live inside /text-tools.
      { source: "/text-reverser", destination: "/text-tools", permanent: true },
      { source: "/case-converter", destination: "/text-tools", permanent: true },
      { source: "/text-cleaner", destination: "/text-tools", permanent: true },
      { source: "/text-list", destination: "/text-tools", permanent: true },
      { source: "/text-find-replace", destination: "/text-tools", permanent: true },
      // Consolidation: keyword density and readability now live inside /word-counter.
      { source: "/keyword-density", destination: "/word-counter", permanent: true },
      { source: "/readability-checker", destination: "/word-counter", permanent: true },
      // Consolidation: Roman numerals, ASCII codes and base conversion now live inside /number-to-words.
      { source: "/roman-numeral", destination: "/number-to-words", permanent: true },
      { source: "/ascii-converter", destination: "/number-to-words", permanent: true },
      { source: "/base-converter", destination: "/number-to-words", permanent: true },
      // Consolidation: file size conversion now lives as a view inside /unit-converter.
      { source: "/file-size-converter", destination: "/unit-converter", permanent: true },
      // Consolidation: Open Graph preview now lives as a view inside /serp-preview.
      { source: "/open-graph-preview", destination: "/serp-preview", permanent: true },
      // Consolidation: live city clocks now live as a view inside /timezone-converter.
      { source: "/world-clock", destination: "/timezone-converter", permanent: true },
      // Consolidation: countdown, work days and duration now live inside /date-calculator.
      { source: "/countdown-timer", destination: "/date-calculator", permanent: true },
      { source: "/work-days-calculator", destination: "/date-calculator", permanent: true },
      { source: "/time-duration-calculator", destination: "/date-calculator", permanent: true },
      // Consolidation: ideal weight and body fat now live inside /bmi-calculator.
      { source: "/ideal-weight-calculator", destination: "/bmi-calculator", permanent: true },
      { source: "/body-fat-calculator", destination: "/bmi-calculator", permanent: true },
      // Consolidation: macro splitting now lives inside /calorie-calculator.
      { source: "/macro-calculator", destination: "/calorie-calculator", permanent: true },
      // Consolidation: ovulation tracking now lives inside /period-calculator.
      { source: "/ovulation-calculator", destination: "/period-calculator", permanent: true },
      // Consolidation: US paycheck withholding now lives inside /salary-calculator.
      { source: "/us-paycheck-calculator", destination: "/salary-calculator", permanent: true },
      // Consolidation: SVG to PNG now lives inside /image-format-converter.
      { source: "/svg-to-png-converter", destination: "/image-format-converter", permanent: true },
    ];
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const scriptSrc = `script-src 'self' 'unsafe-inline' ${
      isDev ? "'unsafe-eval'" : ""
    } https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://fundingchoicesmessages.google.com https://fundingchoicesmessages.googleapis.com`;

    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), display-capture=(), fullscreen=(self), picture-in-picture=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com https://open.er-api.com https://api.allorigins.win https://img.youtube.com https://fundingchoicesmessages.google.com https://fundingchoicesmessages.googleapis.com; frame-src https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://google.com https://*.google.com https://fundingchoicesmessages.google.com https://fundingchoicesmessages.googleapis.com; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
