import ToolPageShell from "@/components/ToolPageShell";
import RefinanceCalculatorTool from "@/components/tools/RefinanceCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/refinance-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <RefinanceCalculatorTool />
    </ToolPageShell>
  );
}
