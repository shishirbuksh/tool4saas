import ToolPageShell from "@/components/ToolPageShell";
import ProfitMarginCalculatorTool from "@/components/tools/ProfitMarginCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/profit-margin-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ProfitMarginCalculatorTool />
    </ToolPageShell>
  );
}
