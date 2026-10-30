import ToolPageShell from "@/components/ToolPageShell";
import FractionCalculatorTool from "@/components/tools/FractionCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/fraction-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <FractionCalculatorTool />
    </ToolPageShell>
  );
}
