import ToolPageShell from "@/components/ToolPageShell";
import CalorieStudioTool from "@/components/tools/CalorieStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/calorie-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CalorieStudioTool />
    </ToolPageShell>
  );
}
