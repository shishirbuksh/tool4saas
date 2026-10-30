import ToolPageShell from "@/components/ToolPageShell";
import DebtPayoffTool from "@/components/tools/DebtPayoffTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/debt-payoff-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <DebtPayoffTool />
    </ToolPageShell>
  );
}
