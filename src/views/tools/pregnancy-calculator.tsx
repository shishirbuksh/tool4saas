import ToolPageShell from "@/components/ToolPageShell";
import PregnancyCalculatorTool from "@/components/tools/PregnancyCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/pregnancy-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PregnancyCalculatorTool />
    </ToolPageShell>
  );
}
