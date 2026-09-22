import type { Metadata, Viewport } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Inter, Fraunces } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Box from "@mui/material/Box";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseScript from "@/components/AdSenseScript";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import SiteJsonLd from "@/components/SiteJsonLd";

import CookieConsentLazy from "@/components/CookieConsentLazy";

// Body: Inter variable — optimized for UI, tight tracking -0.015em, optical sizing
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
  preload: true,
});

// Display: Fraunces — 700 only for hero/h1/h2 critical path.
// 800 dropped: unused (all headings resolve to 700), saves 1 woff2 preload + RTT on LCP.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url.replace(/\/$/, ""),
    languages: {
      en: siteConfig.url.replace(/\/$/, ""),
      "x-default": siteConfig.url.replace(/\/$/, ""),
    },
  },
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/og/home", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og/home"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // DEEP-5: Search Console verification — only emitted when env is set, else omitted.
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* DEEP-5: Google Funding Choices (TCF v2.2) snippet placeholder.
            Paste the Funding Choices script(s) from
            Ad Manager > Privacy & messaging here, BEFORE consent-default.
            Keep order: Funding Choices -> consent-default -> GA -> AdSense.
            Left commented until AdSense approval; CookieConsent forwards
            t4s-consent to window.__tcfapi only when FC is present (stub guard). */}
        {/* <Script src="https://fundingchoicesmessages.google.com/i/xxxx.js?ers=1" strategy="beforeInteractive" /> */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `try{var m=localStorage.getItem('color-mode');if(m!=='light'&&m!=='dark')m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',m);document.documentElement.style.colorScheme=m;var c=m==='dark'?'#0A0A0A':'#FCFCF9';var q=document.querySelector('meta[name="theme-color"]');if(q)q.setAttribute('content',c);else{var t=document.createElement('meta');t.name='theme-color';t.content=c;document.head.appendChild(t);}}catch(e){}` }}
        />
      </head>
      <body suppressHydrationWarning>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JD0HNN61MF"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JD0HNN61MF');
          `}
        </Script>
        <AdSenseScript />
        <CookieConsentLazy />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AppRouterCacheProvider>
          <ThemeProviderClient>
            <Box sx={{ position: "relative", zIndex: 1, overflowX: "clip" }}>
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </Box>
          </ThemeProviderClient>
        </AppRouterCacheProvider>
        <SiteJsonLd />
      </body>
    </html>
  );
}
