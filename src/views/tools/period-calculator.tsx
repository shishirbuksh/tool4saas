import ToolPageShell from "@/components/ToolPageShell";
import PeriodStudioTool from "@/components/tools/PeriodStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/period-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PeriodStudioTool />
    </ToolPageShell>
  );
}
