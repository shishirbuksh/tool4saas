import ToolPageShell from "@/components/ToolPageShell";
import AgeCalculatorTool from "@/components/tools/AgeCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/age-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <AgeCalculatorTool />
    </ToolPageShell>
  );
}
