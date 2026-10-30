import ToolPageShell from "@/components/ToolPageShell";
import LoanStudioTool from "@/components/tools/LoanStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/emi-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <LoanStudioTool />
    </ToolPageShell>
  );
}
