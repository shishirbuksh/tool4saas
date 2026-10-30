import ToolPageShell from "@/components/ToolPageShell";
import SalaryStudioTool from "@/components/tools/SalaryStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/salary-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SalaryStudioTool />
    </ToolPageShell>
  );
}
