import ToolPageShell from "@/components/ToolPageShell";
import GstCalculatorTool from "@/components/tools/GstCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/gst-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <GstCalculatorTool />
    </ToolPageShell>
  );
}
