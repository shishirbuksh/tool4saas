import type { Metadata } from "next";
import ToolPageShell from "@/components/ToolPageShell";
import UnitConverterTool from "@/components/tools/UnitConverterTool";
import { siteConfig } from "@/lib/site";
import { unitConverterEs } from "@/lib/i18n";

// ES pilot #4: /es/unit-converter (GSC #5: 205 imp).
// English slug kept. SEO shell renders native ES; UnitConverterTool UI stays
// EN in V1. Canonical /es/slug, hreflang ES<->EN.
// Same <html lang> limitation as other pilots (Phase 2 fixes via [locale]/).
const tool = unitConverterEs;

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
  const enUrl = `${base}/${tool.slug}`;
  const frUrl = `${base}/fr/${tool.slug}`;
  const ogImage = `${base}/og/${tool.slug}`;
  const fullTitle = esTitle();
  return {
    title: { absolute: fullTitle },
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
      languages: { es: url, fr: frUrl, en: enUrl, "x-default": enUrl },
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

export default function EsUnitConverterPage() {
  return (
    <ToolPageShell tool={tool} locale="es">
      <UnitConverterTool />
    </ToolPageShell>
  );
}
