import ToolPageShell from "@/components/ToolPageShell";
import ChmodCalculatorTool from "@/components/tools/ChmodCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/chmod-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ChmodCalculatorTool />
    </ToolPageShell>
  );
}
