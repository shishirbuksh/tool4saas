import { Alert, Link } from "@/components/ds";

const ADVICE = {
  finance: "financial",
  health: "medical",
  general: "professional",
} as const;

export default function YMYLDisclaimer({
  type,
}: {
  type: "finance" | "health" | "general";
}) {
  const advice = ADVICE[type] || "professional";
  const professional =
    type === "health" ? "healthcare professional" : type === "finance" ? "qualified financial advisor" : "qualified professional";
  return (
    <Alert severity="info">
      For informational purposes only — not {advice} advice. Estimates may vary; consult a {professional} for
      decisions. See <Link href="/terms">/terms</Link>.
    </Alert>
  );
}
