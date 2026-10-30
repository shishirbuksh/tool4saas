import ToolPageShell from "@/components/ToolPageShell";
import BmiStudioTool from "@/components/tools/BmiStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/bmi-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <BmiStudioTool />
    </ToolPageShell>
  );
}
