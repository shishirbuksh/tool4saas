import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Fraunces } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Box from "@mui/material/Box";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseScript from "@/components/AdSenseScript";
import CookieConsent from "@/components/CookieConsent";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import SiteJsonLd from "@/components/SiteJsonLd";

// Body: Inter variable — optimized for UI, tight tracking -0.015em, optical sizing
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
  preload: true,
});

// Display: Fraunces — 2 weights only (700/800) for hero/h1/h2 critical path.
// h2-h6 request 600 in theme but resolve to nearest loaded (700) — no extra fetch.
// Do NOT add 600/900 without preload audit: each weight = extra woff2 + FOUT risk.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["700", "800"],
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
  alternates: { canonical: siteConfig.url.replace(/\/$/, "") },
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JD0HNN61MF');
          `}
        </Script>
        <AdSenseScript />
        <CookieConsent />
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
