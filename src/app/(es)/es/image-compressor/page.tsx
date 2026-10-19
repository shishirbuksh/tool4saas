import type { Metadata } from "next";
import ToolPageShell from "@/components/ToolPageShell";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import { siteConfig } from "@/lib/site";
import { hreflangLanguages, imageCompressorEs } from "@/lib/i18n";

// ES pilot #11: /es/image-compressor (top images hero: HERO_SLUGS 0.9, pairs
// with qr-code-generator; non-YMYL).
// English slug kept. SEO shell renders native ES; ImageCompressorTool UI stays
// EN in V1. Canonical /es/slug, hreflang ES<->EN.
// <html lang> is served server-side by the locale root layout.
const tool = imageCompressorEs;

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
      alternateLocale: ["en_US"],
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

export default function EsImageCompressorPage() {
  return (
    <ToolPageShell tool={tool} locale="es">
      <ImageCompressorTool />
    </ToolPageShell>
  );
}
