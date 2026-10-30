import ToolPageShell from "@/components/ToolPageShell";
import WaterIntakeCalculatorTool from "@/components/tools/WaterIntakeCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/water-intake-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <WaterIntakeCalculatorTool />
    </ToolPageShell>
  );
}
