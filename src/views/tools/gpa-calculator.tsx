import ToolPageShell from "@/components/ToolPageShell";
import GpaCalculatorTool from "@/components/tools/GpaCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/gpa-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <GpaCalculatorTool />
    </ToolPageShell>
  );
}
