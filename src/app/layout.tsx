import type { Metadata, Viewport } from "next";
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

// Body: Inter variable — optimized for UI, tight tracking -0.015em, optical sizing
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
  preload: true,
});

// Display: Fraunces (9-144 opsz, SOFT/WONK) — premium serif for hero / h1-h4
// Falls back to Instrument Serif geometry; Fraunces SOFT 0 gives sharp, editorial contrast
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
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
  keywords: siteConfig.keywords,
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
  themeColor: "#FCFCF9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=localStorage.getItem('color-mode');if(m!=='light'&&m!=='dark')m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',m);document.documentElement.style.colorScheme=m;var c=m==='dark'?'#070b16':'#FCFCF9';var q=document.querySelector('meta[name="theme-color"]');if(q)q.setAttribute('content',c);else{var t=document.createElement('meta');t.name='theme-color';t.content=c;document.head.appendChild(t);}}catch(e){}`,
          }}
        />
        <AdSenseScript />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AppRouterCacheProvider>
          <ThemeProviderClient>
            <Box sx={{ position: "relative", zIndex: 1 }}>
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
