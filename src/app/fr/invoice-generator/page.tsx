import type { Metadata } from "next";
import ToolPageShell from "@/components/ToolPageShell";
import InvoiceTool from "@/components/tools/InvoiceTool";
import { siteConfig } from "@/lib/site";
import { invoiceGeneratorFr } from "@/lib/i18n";

// FR pilot #1: /fr/invoice-generator (highest-ROI tool, proves the N-locale
// registry: EN hreflang/sitemap now serve es+fr via getPilotLocales).
// English slug kept. SEO shell renders native FR; InvoiceTool UI stays EN
// in V1. Canonical /fr/slug, hreflang FR<->EN<->ES.
// Same <html lang> limitation as ES pilots (Phase 2 fixes via [locale]/).
const tool = invoiceGeneratorFr;

function frTitle(): string {
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
  const url = `${base}/fr/${tool.slug}`;
  const enUrl = `${base}/${tool.slug}`;
  const esUrl = `${base}/es/${tool.slug}`;
  const ogImage = `${base}/og/${tool.slug}`;
  const fullTitle = frTitle();
  return {
    title: { absolute: fullTitle },
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
      languages: { fr: url, es: esUrl, en: enUrl, "x-default": enUrl },
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
      locale: "fr_FR",
      alternateLocale: ["en_US", "es_ES"],
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

export default function FrInvoiceGeneratorPage() {
  return (
    <ToolPageShell tool={tool} locale="fr">
      <InvoiceTool />
    </ToolPageShell>
  );
}
