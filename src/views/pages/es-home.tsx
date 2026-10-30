import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@/lib/astro/navigation";
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
  bmiCalculatorEs,
  qrSizePrintEs,
} from "@/lib/i18n";

const pilots = [
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
  bmiCalculatorEs,
];
const guides = [qrSizePrintEs];

export default function EsHomeView() {
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
        Dieciséis herramientas gratuitas, sin registro y privadas en tu navegador. Elige una para empezar —
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
