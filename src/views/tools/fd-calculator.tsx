import ToolPageShell from "@/components/ToolPageShell";
import FdCalculatorTool from "@/components/tools/FdCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/fd-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <FdCalculatorTool />
    </ToolPageShell>
  );
}
