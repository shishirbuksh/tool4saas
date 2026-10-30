import ToolPageShell from "@/components/ToolPageShell";
import SubnetCalculatorTool from "@/components/tools/SubnetCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/subnet-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SubnetCalculatorTool />
    </ToolPageShell>
  );
}
