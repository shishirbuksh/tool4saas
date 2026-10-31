import { Container, Typography, Box } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import {
  invoiceGeneratorFr,
  qrCodeGeneratorFr,
  unitConverterFr,
  wordCounterFr,
  creditCardValidatorFr,
  typingSpeedFr,
  plagiarismCheckerFr,
  mortgageCalculatorFr,
  bmiCalculatorFr,
  imageCompressorFr,
  pdfMergeFr,
  passwordGeneratorFr,
  jsonFormatterFr,
  resumeBuilderFr,
  sipCalculatorFr,
  emiCalculatorFr,
} from "@/lib/i18n";

const pilots = [
  invoiceGeneratorFr,
  qrCodeGeneratorFr,
  unitConverterFr,
  wordCounterFr,
  creditCardValidatorFr,
  typingSpeedFr,
  plagiarismCheckerFr,
  mortgageCalculatorFr,
  bmiCalculatorFr,
  imageCompressorFr,
  pdfMergeFr,
  passwordGeneratorFr,
  jsonFormatterFr,
  resumeBuilderFr,
  sipCalculatorFr,
  emiCalculatorFr,
];

export default function FrHomeView() {
  return (
    <Container maxWidth="md" className="py-12">
      <Typography variant="h1" className="text-[2.25rem] mb-4">
        Outils gratuits en français
      </Typography>
      <Typography color="text.secondary" className="mb-2">
        Aussi disponible en anglais :{" "}
        <Link href="/" hrefLang="en">
          English version →
        </Link>
      </Typography>
      <Typography color="text.secondary" className="mb-8 leading-[1.8]">
        Seize outils gratuits, sans inscription et privés dans votre navigateur — avec guide en 4 étapes
        et questions fréquentes. D&apos;autres outils suivront.
      </Typography>
      <Box component="ul" className="p-0 m-0 list-none grid gap-4">
        {pilots.map((t) => (
          <Box
            component="li"
            key={t.slug}
            className="p-6 border border-base-300 rounded-[24px]"
          >
            <Typography variant="h2" className="text-[1.25rem] mb-2">
              <Link href={`/fr/${t.slug}`} hrefLang="fr">
                {t.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" className="leading-[1.7]">
              {t.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
