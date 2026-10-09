import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { invoiceGeneratorFr, qrCodeGeneratorFr, unitConverterFr, wordCounterFr, creditCardValidatorFr, typingSpeedFr, plagiarismCheckerFr, mortgageCalculatorFr } from "@/lib/i18n";

// FR hub: /fr/ — crawl hub for the French pilots (8 tools).
// Canonical /fr/, hreflang fr/en. Global Header/Footer/nav stay EN (root
// layout); hub body is native FR. Listed in the sitemap via HUB_LOCALES.
const pilots = [invoiceGeneratorFr, qrCodeGeneratorFr, unitConverterFr, wordCounterFr, creditCardValidatorFr, typingSpeedFr, plagiarismCheckerFr, mortgageCalculatorFr];

export const metadata: Metadata = (() => {
  const base = siteConfig.url.replace(/\/$/, "");
  const enUrl = base;
  const title = "Outils Gratuits en Ligne – Sans Inscription (2026) | Tool4SaaS";
  const description =
    "Outils gratuits en français : factures PDF avec TVA et logo. Sans inscription, privés dans votre navigateur — essayez gratis.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${base}/fr`,
      languages: { fr: `${base}/fr`, en: enUrl, "x-default": enUrl },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      alternateLocale: ["en_US"],
      url: `${base}/fr`,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: `${base}/og/home`, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${base}/og/home`],
    },
  };
})();

export default function FrHubPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>
        Outils gratuits en français
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        Aussi disponible en anglais :{" "}
        <Link href="/" hrefLang="en">
          English version →
        </Link>
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
        Huit outils gratuits, sans inscription et privés dans votre navigateur — avec guide en 4 étapes
        et questions fréquentes. D&apos;autres outils suivront.
      </Typography>
      <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", display: "grid", gap: 2 }}>
        {pilots.map((t) => (
          <Box
            component="li"
            key={t.slug}
            sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
          >
            <Typography variant="h2" sx={{ fontSize: "1.25rem", mb: 1 }}>
              <Link href={`/fr/${t.slug}`} hrefLang="fr">
                {t.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {t.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
