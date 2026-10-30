import ToolPageShell from "@/components/ToolPageShell";
import UsSalesTaxCalculatorTool from "@/components/tools/UsSalesTaxCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/us-sales-tax-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <UsSalesTaxCalculatorTool />
    </ToolPageShell>
  );
}
