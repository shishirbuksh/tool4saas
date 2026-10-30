import ToolPageShell from "@/components/ToolPageShell";
import MortgageCalculatorTool from "@/components/tools/MortgageCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/mortgage-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <MortgageCalculatorTool />
    </ToolPageShell>
  );
}
