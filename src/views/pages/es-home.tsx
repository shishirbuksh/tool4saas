import { Container, Typography, Box } from "@/components/ds";

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
    <Container maxWidth="md" className="py-12">
      <Typography variant="h1" className="text-[2.25rem] mb-4">
        Herramientas gratis en español
      </Typography>
      <Typography color="text.secondary" className="mb-2">
        También disponible en inglés:{" "}
        <Link href="/" hrefLang="en">
          English version →
        </Link>
      </Typography>
      <Typography color="text.secondary" className="mb-8 leading-[1.8]">
        Dieciséis herramientas gratuitas, sin registro y privadas en tu navegador. Elige una para empezar —
        cada página incluye guía en 4 pasos y preguntas frecuentes.
      </Typography>
      <Box component="ul" className="p-0 m-0 list-none grid gap-4">
        {pilots.map((t) => (
          <Box
            component="li"
            key={t.slug}
            className="p-6 border border-base-300 rounded-xl"
          >
            <Typography variant="h2" className="text-[1.25rem] mb-2">
              <Link href={`/es/${t.slug}`} hrefLang="es">
                {t.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" className="leading-[1.7]">
              {t.description}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h2" className="text-[1.5rem] mt-10 mb-4">
        Guías en español
      </Typography>
      <Box component="ul" className="p-0 m-0 list-none grid gap-4">
        {guides.map((g) => (
          <Box
            component="li"
            key={`${g.pillar}/${g.slug}`}
            className="p-6 border border-base-300 rounded-xl"
          >
            <Typography variant="h3" className="text-[1.1rem] mb-2">
              <Link href={`/es/blog/${g.pillar}/${g.slug}`} hrefLang="es">
                {g.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" className="leading-[1.7]">
              {g.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
