import ToolPageShell from "@/components/ToolPageShell";
import GradeCalculatorTool from "@/components/tools/GradeCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/grade-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <GradeCalculatorTool />
    </ToolPageShell>
  );
}
