import ToolPageShell from "@/components/ToolPageShell";
import ConcreteCalculatorTool from "@/components/tools/ConcreteCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/concrete-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ConcreteCalculatorTool />
    </ToolPageShell>
  );
}
