import ToolPageShell from "@/components/ToolPageShell";
import IncomeTaxCalculatorTool from "@/components/tools/IncomeTaxCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/income-tax-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <IncomeTaxCalculatorTool />
    </ToolPageShell>
  );
}
