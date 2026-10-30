import ToolPageShell from "@/components/ToolPageShell";
import InflationCalculatorTool from "@/components/tools/InflationCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/inflation-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <InflationCalculatorTool />
    </ToolPageShell>
  );
}
