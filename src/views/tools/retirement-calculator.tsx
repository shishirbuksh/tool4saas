import ToolPageShell from "@/components/ToolPageShell";
import RetirementCalculatorTool from "@/components/tools/RetirementCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/retirement-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <RetirementCalculatorTool />
    </ToolPageShell>
  );
}
