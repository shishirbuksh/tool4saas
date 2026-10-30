import ToolPageShell from "@/components/ToolPageShell";
import TipCalculatorTool from "@/components/tools/TipCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/tip-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TipCalculatorTool />
    </ToolPageShell>
  );
}
