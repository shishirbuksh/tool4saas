import ToolPageShell from "@/components/ToolPageShell";
import PercentageStudioTool from "@/components/tools/PercentageStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/percentage-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PercentageStudioTool />
    </ToolPageShell>
  );
}
