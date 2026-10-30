import ToolPageShell from "@/components/ToolPageShell";
import DiscountCalculatorTool from "@/components/tools/DiscountCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/discount-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <DiscountCalculatorTool />
    </ToolPageShell>
  );
}
