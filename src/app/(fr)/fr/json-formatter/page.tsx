import type { Metadata } from "next";
import ToolPageShell from "@/components/ToolPageShell";
import JsonFormatterTool from "@/components/tools/JsonFormatterTool";
import { siteConfig } from "@/lib/site";
import { hreflangLanguages, jsonFormatterFr } from "@/lib/i18n";

// FR pilot #13: /fr/json-formatter (developer hero).
// English slug kept. SEO shell renders native FR; JsonFormatterTool UI
// stays EN in V1. Canonical /fr/slug, hreflang FR<->EN<->ES.
// <html lang> is served server-side by the locale root layout.
const tool = jsonFormatterFr;

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
  const ogImage = `${base}/og/${tool.slug}`;
  const fullTitle = frTitle();
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

export default function FrJsonFormatterPage() {
  return (
    <ToolPageShell tool={tool} locale="fr">
      <JsonFormatterTool />
    </ToolPageShell>
  );
}
