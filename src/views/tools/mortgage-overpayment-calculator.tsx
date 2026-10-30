import ToolPageShell from "@/components/ToolPageShell";
import MortgageOverpaymentTool from "@/components/tools/MortgageOverpaymentTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/mortgage-overpayment-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <MortgageOverpaymentTool />
    </ToolPageShell>
  );
}
