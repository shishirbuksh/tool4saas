import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import {
  invoiceGeneratorEs,
  qrCodeGeneratorEs,
  creditCardValidatorEs,
  unitConverterEs,
  typingSpeedEs,
  plagiarismCheckerEs,
  wordCounterEs,
  mortgageCalculatorEs,
  resumeBuilderEs,
  passwordGeneratorEs,
  imageCompressorEs,
  pdfMergeEs,
  jsonFormatterEs,
  sipCalculatorEs,
  emiCalculatorEs,
  qrSizePrintEs,
} from "@/lib/i18n";

// ES hub: /es/ — crawl hub linking the 4 ES pilots (no EN equivalent content
// duplicated; EN home stays canonical EN). Canonical /es/, hreflang es/en.
// V1 limitation: global Header/Footer/nav stay EN (root layout); hub body + cards
// are native ES. Full shell translation lands with Phase 2 [locale]/ migration.
const pilots = [invoiceGeneratorEs, qrCodeGeneratorEs, creditCardValidatorEs, unitConverterEs, typingSpeedEs, plagiarismCheckerEs, wordCounterEs, mortgageCalculatorEs, resumeBuilderEs, passwordGeneratorEs, imageCompressorEs, pdfMergeEs, jsonFormatterEs, sipCalculatorEs, emiCalculatorEs];
const guides = [qrSizePrintEs];

export const metadata: Metadata = (() => {
  const base = siteConfig.url.replace(/\/$/, "");
  const enUrl = base;
  const title = "Herramientas Gratis Online – Sin Registro (2026) | Tool4SaaS";
  const description =
    "Herramientas gratis en español: facturas, QR, tarjetas y unidades. Sin registro, privadas en tu navegador — prueba gratis.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${base}/es`,
      languages: { es: `${base}/es`, en: enUrl, "x-default": enUrl },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "es_ES",
      alternateLocale: ["en_US"],
      url: `${base}/es`,
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

export default function EsHubPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>
        Herramientas gratis en español
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        También disponible en inglés:{" "}
        <Link href="/" hrefLang="en">
          English version →
        </Link>
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
        Quince herramientas gratuitas, sin registro y privadas en tu navegador. Elige una para empezar —
        cada página incluye guía en 4 pasos y preguntas frecuentes.
      </Typography>
      <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", display: "grid", gap: 2 }}>
        {pilots.map((t) => (
          <Box
            component="li"
            key={t.slug}
            sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
          >
            <Typography variant="h2" sx={{ fontSize: "1.25rem", mb: 1 }}>
              <Link href={`/es/${t.slug}`} hrefLang="es">
                {t.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {t.description}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h2" sx={{ fontSize: "1.5rem", mt: 5, mb: 2 }}>
        Guías en español
      </Typography>
      <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", display: "grid", gap: 2 }}>
        {guides.map((g) => (
          <Box
            component="li"
            key={`${g.pillar}/${g.slug}`}
            sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
          >
            <Typography variant="h3" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <Link href={`/es/blog/${g.pillar}/${g.slug}`} hrefLang="es">
                {g.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {g.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
