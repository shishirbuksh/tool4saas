import type { Metadata } from "next";
import ToolPageShell from "@/components/ToolPageShell";
import QrCodeTool from "@/components/tools/QrCodeTool";
import { siteConfig } from "@/lib/site";
import { qrCodeGeneratorFr } from "@/lib/i18n";

// FR pilot #2: /fr/qr-code-generator (universal volume, pairs with the QR
// print-size playbook; non-YMYL).
// English slug kept. SEO shell renders native FR; QrCodeTool UI stays EN
// in V1. Canonical /fr/slug, hreflang FR<->EN (ES gains fr via the EN hub).
// Same <html lang> limitation as other pilots (Phase 2 fixes via [locale]/).
const tool = qrCodeGeneratorFr;

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
  const ogImage = `${base}/og/${tool.slug}`;
  const fullTitle = frTitle();
  return {
    title: { absolute: fullTitle },
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
      languages: { fr: url, en: enUrl, "x-default": enUrl },
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

export default function FrQrCodeGeneratorPage() {
  return (
    <ToolPageShell tool={tool} locale="fr">
      <QrCodeTool />
    </ToolPageShell>
  );
}
