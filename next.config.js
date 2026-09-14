/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@mui/material-nextjs",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const scriptSrc = `script-src 'self' 'unsafe-inline' ${
      isDev ? "'unsafe-eval'" : ""
    } https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://adservice.google.com https://www.google.com https://www.googletagmanager.com https://www.google-analytics.com`;

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com https://open.er-api.com https://api.allorigins.win https://img.youtube.com; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://google.com; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
