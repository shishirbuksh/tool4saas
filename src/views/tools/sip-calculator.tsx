import ToolPageShell from "@/components/ToolPageShell";
import SipCalculatorTool from "@/components/tools/SipCalculatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/sip-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SipCalculatorTool />
    </ToolPageShell>
  );
}
