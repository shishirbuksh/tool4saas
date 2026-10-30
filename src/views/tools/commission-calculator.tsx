import ToolPageShell from "@/components/ToolPageShell";
import CommissionCalculatorTool from "@/components/tools/CommissionCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/commission-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CommissionCalculatorTool />
    </ToolPageShell>
  );
}
