import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import type { ReactNode } from "react";

/**
 * Shared page shell.
 *
 * Rendered to static HTML at build time by `renderReactPage()` in
 * AppPage.astro. Nothing here is hydrated: the header, footer and consent
 * banner are plain markup, and their behaviour comes from the vanilla modules
 * in src/lib/shell. Only the `#app` subtree is handed to React, and only on
 * pages that opt in with `hydrate`.
 */
export default function AppShell({
  pathname = "/",
  viewKey,
  hydrate = false,
  children,
}: {
  pathname?: string;
  viewKey?: string;
  hydrate?: boolean;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="relative z-[1] overflow-x-clip min-h-screen flex flex-col justify-between bg-base-100 text-base-content font-sans antialiased">
        <Header pathname={pathname} />
        <main id="main" className="flex-grow">
          <div
            id="app"
            data-view={viewKey}
            data-pathname={pathname}
            data-hydrate={hydrate ? "true" : "false"}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </>
  );
}
