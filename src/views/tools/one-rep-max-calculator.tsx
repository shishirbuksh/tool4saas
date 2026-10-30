import ToolPageShell from "@/components/ToolPageShell";
import OneRepMaxCalculatorTool from "@/components/tools/OneRepMaxCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/one-rep-max-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <OneRepMaxCalculatorTool />
    </ToolPageShell>
  );
}
