import ToolPageShell from "@/components/ToolPageShell";
import ScientificCalculatorTool from "@/components/tools/ScientificCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/scientific-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ScientificCalculatorTool />
    </ToolPageShell>
  );
}
