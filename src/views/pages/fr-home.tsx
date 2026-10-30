import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
        Seize outils gratuits, sans inscription et privés dans votre navigateur — avec guide en 4 étapes
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
