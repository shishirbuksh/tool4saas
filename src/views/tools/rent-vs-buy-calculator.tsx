import ToolPageShell from "@/components/ToolPageShell";
import RentVsBuyCalculatorTool from "@/components/tools/RentVsBuyCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/rent-vs-buy-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <RentVsBuyCalculatorTool />
    </ToolPageShell>
  );
}
