import ToolPageShell from "@/components/ToolPageShell";
import PpfCalculatorTool from "@/components/tools/PpfCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/ppf-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PpfCalculatorTool />
    </ToolPageShell>
  );
}
