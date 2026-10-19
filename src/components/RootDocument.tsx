/* eslint-disable @next/next/no-head-element --
   App Router root layout: this component IS the document shell, so a raw
   <head> plus beforeInteractive theme/consent scripts are intentional (the
   pages/_document.js rule does not apply to the App Router). */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Fraunces } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Box from "@mui/material/Box";
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import ConsentGatedGoogleScripts from "@/components/ConsentGatedGoogleScripts";
import SiteJsonLd from "@/components/SiteJsonLd";
import CookieConsentLazy from "@/components/CookieConsentLazy";
import { hreflangHubLanguages, OG_LOCALE, type Locale } from "@/lib/i18n";

// Shared root document for the three root layouts (app/(en), app/(es),
// app/(fr)). Each locale group has its own layout.tsx so <html lang> is
// server-rendered correctly per locale (previously one root layout hardcoded
// lang="en" for every route including /es/* and /fr/*). Fonts are instantiated
// once here so the preload set is shared, not tripled.

// Body: Inter variable — optimized for UI, tight tracking -0.015em, optical sizing
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
  preload: true,
});

// Display: Fraunces — 700 only for hero/h1/h2 critical path.
// 800 dropped: unused (all headings resolve to 700), saves 1 woff2 preload + RTT on LCP.
// preload:false: Inter (body + LCP-adjacent UI text) keeps the single preload;
// Fraunces swaps in via display:swap with adjustFontFallback (no CLS), saving
// high-priority bandwidth on mobile LCP.
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
  preload: false,
});

export const baseViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Group-level fallback metadata (pages override with their own). Canonical +
// hreflang are derived per locale from hreflangHubLanguages so the EN home and
// both hubs stay a mutually-reciprocal cluster (EN now lists es/fr too).
export function baseMetadata(locale: Locale = "en"): Metadata {
  const base = siteConfig.url.replace(/\/$/, "");
  const canonical = locale === "en" ? base : `${base}/${locale}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: {
      canonical,
      languages: hreflangHubLanguages(base, locale),
    },
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: canonical,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [{ url: `${base}/og/home`, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${base}/og/home`],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
}

const SKIP_LABEL: Record<Locale, string> = {
  en: "Skip to content",
  es: "Saltar al contenido",
  fr: "Aller au contenu",
};

export default function RootDocument({ locale = "en", children }: { locale?: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `try{var m=localStorage.getItem('color-mode');if(m!=='light'&&m!=='dark')m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',m);document.documentElement.style.colorScheme=m;var c=m==='dark'?'#0A0A0A':'#FCFCF9';var q=document.querySelector('meta[name="theme-color"]');if(q)q.setAttribute('content',c);else{var t=document.createElement('meta');t.name='theme-color';t.content=c;document.head.appendChild(t);}}catch(e){}` }}
        />
        {/* DEEP-5: Google Funding Choices (TCF v2.2) — EEA/UK consent message.
            Google-provided message id lives in the env as
            NEXT_PUBLIC_FUNDING_CHOICES_ID (e.g. "pub-6310719489589992"), the
            segment after /i/ in Ad Manager > Privacy & messaging. Kept OFF
            until set, so a missing message never adds a 404/latency. Loaded
            BEFORE consent-default (below) per the documented order:
            Funding Choices -> consent-default -> gated loader. GA + AdSense
            still load ONLY via ConsentGatedGoogleScripts after stored consent;
            CookieConsent forwards t4s-consent to window.__tcfapi when present. */}
        {siteConfig.fundingChoicesId && (
          <>
            <Script
              id="googlefc-present"
              strategy="beforeInteractive"
              src={`https://fundingchoicesmessages.google.com/i/${siteConfig.fundingChoicesId}?ers=1`}
              crossOrigin="anonymous"
            />
            <Script id="googlefc-bootstrap" strategy="beforeInteractive">
              {`(function(){function s(){if(!window.frames['googlefcPresent']){if(document.body){var i=document.createElement('iframe');i.style='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;';i.style.display='none';i.name='googlefcPresent';document.body.appendChild(i);}else{setTimeout(s,0);}}}s();})();`}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
          `}
        </Script>
        <ConsentGatedGoogleScripts />
        <CookieConsentLazy />
        <a href="#main" className="skip-link">
          {SKIP_LABEL[locale]}
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
