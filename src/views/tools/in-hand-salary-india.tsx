import ToolPageShell from "@/components/ToolPageShell";
import InHandSalaryTool from "@/components/tools/InHandSalaryTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/in-hand-salary-india/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <InHandSalaryTool />
    </ToolPageShell>
  );
}
