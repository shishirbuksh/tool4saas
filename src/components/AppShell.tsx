
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import CookieConsent from "@/components/CookieConsent";
import ConsentGatedGoogleScripts from "@/components/ConsentGatedGoogleScripts";
import { PathnameProvider } from "@/lib/astro/navigation";
import type { Locale } from "@/lib/i18n-core";
import type { ReactNode } from "react";

// Shared React shell for every page. Rendered to static HTML at build time and
// hydrated as one root by src/lib/astro/hydrate.ts.
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
        <div className="relative z-[1] overflow-x-clip min-h-screen flex flex-col justify-between bg-base-100 text-base-content font-sans antialiased">
          <Header />
          <main id="main" className="flex-grow">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </ThemeProviderClient>
      <ConsentGatedGoogleScripts />
    </PathnameProvider>
  );
}
