import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import type { Locale } from "@/lib/i18n";

const ADVICE: Record<Locale, { finance: string; health: string; general: string }> = {
  en: { finance: "financial", health: "medical", general: "professional" },
  es: { finance: "financiero", health: "médico", general: "profesional" },
  fr: { finance: "financier", health: "médical", general: "professionnel" },
};

export default function YMYLDisclaimer({
  type,
  locale = "en",
}: {
  type: "finance" | "health" | "general";
  locale?: Locale;
}) {
  if (locale === "es") {
    const advice =
      type === "health" ? "médico" : type === "finance" ? "financiero" : "profesional";
    const professional =
      type === "health"
        ? "profesional sanitario"
        : type === "finance"
          ? "asesor financiero cualificado"
          : "profesional cualificado";
    return (
      <Alert severity="info">
        Solo con fines informativos — no es asesoramiento {advice}. Las estimaciones pueden variar; consulta a un{" "}
        {professional} para decisiones. Ver <Link href="/terms">/terms</Link>.
      </Alert>
    );
  }
  if (locale === "fr") {
    const advice =
      type === "health" ? "médical" : type === "finance" ? "financier" : "professionnel";
    const professional =
      type === "health"
        ? "professionnel de santé"
        : type === "finance"
          ? "conseiller financier qualifié"
          : "professionnel qualifié";
    return (
      <Alert severity="info">
        À titre informatif uniquement — pas un conseil {advice}. Estimations indicatives ; consultez un{" "}
        {professional} pour vos décisions. Voir <Link href="/terms">/terms</Link>.
      </Alert>
    );
  }
  const advice = ADVICE.en[type];
  const professional =
    type === "health" ? "healthcare professional" : type === "finance" ? "qualified financial advisor" : "qualified professional";
  return (
    <Alert severity="info">
      For informational purposes only — not {advice} advice. Estimates may vary; consult a {professional} for
      decisions. See <Link href="/terms">/terms</Link>.
    </Alert>
  );
}
