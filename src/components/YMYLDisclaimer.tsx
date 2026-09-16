import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

export default function YMYLDisclaimer({ type }: { type: "finance" | "health" | "general" }) {
  const advice = type === "health" ? "medical" : type === "finance" ? "financial" : "professional";
  const professional =
    type === "health" ? "healthcare professional" : type === "finance" ? "qualified financial advisor" : "qualified professional";
  return (
    <Alert severity="info">
      For informational purposes only — not {advice} advice. Estimates may vary; consult a {professional} for
      decisions. See <Link href="/terms">/terms</Link>.
    </Alert>
  );
}
