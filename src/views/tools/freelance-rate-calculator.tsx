import ToolPageShell from "@/components/ToolPageShell";
import FreelanceRateCalculatorTool from "@/components/tools/FreelanceRateCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/freelance-rate-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <FreelanceRateCalculatorTool />
    </ToolPageShell>
  );
}
