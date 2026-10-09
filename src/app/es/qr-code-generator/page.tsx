import type { Metadata } from "next";
import ToolPageShell from "@/components/ToolPageShell";
import QrCodeTool from "@/components/tools/QrCodeTool";
import { siteConfig } from "@/lib/site";
import { qrCodeGeneratorEs } from "@/lib/i18n";

// ES pilot #2: /es/qr-code-generator (covers QR cluster; qr-size-print guide
// holds 215 imp / 0 clicks in GSC). English slug kept. SEO shell renders native
// ES; QrCodeTool UI stays EN in V1. Canonical /es/slug, hreflang ES<->EN.
// Same <html lang> limitation as invoice pilot (Phase 2 fixes via [locale]/).
const tool = qrCodeGeneratorEs;

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
  const ogImage = `${base}/og/${tool.slug}`;
  const fullTitle = esTitle();
  return {
    title: { absolute: fullTitle },
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
      languages: { es: url, en: enUrl, "x-default": enUrl },
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

export default function EsQrCodeGeneratorPage() {
  return (
    <ToolPageShell tool={tool} locale="es">
      <QrCodeTool />
    </ToolPageShell>
  );
}
