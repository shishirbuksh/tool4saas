import ToolPageShell from "@/components/ToolPageShell";
import SleepCycleCalculatorTool from "@/components/tools/SleepCycleCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/sleep-cycle-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SleepCycleCalculatorTool />
    </ToolPageShell>
  );
}
