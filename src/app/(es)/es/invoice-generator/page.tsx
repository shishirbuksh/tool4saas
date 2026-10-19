import type { Metadata } from "next";
import ToolPageShell from "@/components/ToolPageShell";
import InvoiceTool from "@/components/tools/InvoiceTool";
import { siteConfig } from "@/lib/site";
import { hreflangLanguages, invoiceGeneratorEs } from "@/lib/i18n";

// ES pilot: /es/invoice-generator (GSC #2 winner).
// English slugs kept (/es/<slug>). SEO shell (H1/desc/FAQ/HowTo/JSON-LD via
// ToolPageShell+ToolSeo) renders native ES from invoiceGeneratorEs; the
// interactive InvoiceTool UI stays EN in V1 (documented limitation).
// Canonical is /es/slug; hreflang is bidirectional EN<->ES + x-default.
// <html lang="es"> is served by src/app/(es)/layout.tsx; OG locale + hreflang
// + ES copy carry the language signal for the pilot.
const tool = invoiceGeneratorEs;

function esTitle(): string {
  let core = `${tool.title} - ${tool.short}`;
  if (core.length > 55) {
    core = core.slice(0, 55).trimEnd();
    const lastSpace = core.lastIndexOf(" ");
    if (lastSpace > 35) core = core.slice(0, lastSpace);
  }
  return `${core} | Tool4SaaS`;
}

export const metadata: Metadata = (() => {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}/es/${tool.slug}`;
      const ogImage = `${base}/og/${tool.slug}`;
  const fullTitle = esTitle();
  return {
    title: { absolute: fullTitle },
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
      languages: hreflangLanguages(base, tool.slug),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      alternateLocale: ["en_US", "fr_FR"],
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: tool.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${tool.title} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: tool.description,
      images: [ogImage],
    },
  };
})();

export default function EsInvoiceGeneratorPage() {
  return (
    <ToolPageShell tool={tool} locale="es">
      <InvoiceTool />
    </ToolPageShell>
  );
}
