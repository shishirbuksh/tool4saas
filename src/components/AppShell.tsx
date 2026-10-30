"use client";

import Box from "@mui/material/Box";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import CookieConsent from "@/components/CookieConsent";
import ConsentGatedGoogleScripts from "@/components/ConsentGatedGoogleScripts";
import { PathnameProvider } from "@/lib/astro/navigation";
import type { Locale } from "@/lib/i18n-core";
import type { ReactNode } from "react";

// Shared React shell for every page. Rendered to static HTML at build time and
// hydrated as one root by src/lib/astro/hydrate.ts. Keeping one root preserves
// the single Emotion cache + MUI theme that the Next.js app relied on.
export default function AppShell({
  locale = "en",
  pathname = "/",
  children,
}: {
  locale?: Locale;
  pathname?: string;
  children?: ReactNode;
}) {
  return (
    <PathnameProvider value={pathname}>
      <ThemeProviderClient>
        <Box sx={{ position: "relative", zIndex: 1, overflowX: "clip" }}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Box>
        <CookieConsent />
      </ThemeProviderClient>
      <ConsentGatedGoogleScripts />
    </PathnameProvider>
  );
}
