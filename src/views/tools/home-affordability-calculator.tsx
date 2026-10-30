import ToolPageShell from "@/components/ToolPageShell";
import HomeAffordabilityCalculatorTool from "@/components/tools/HomeAffordabilityCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/home-affordability-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <HomeAffordabilityCalculatorTool />
    </ToolPageShell>
  );
}
