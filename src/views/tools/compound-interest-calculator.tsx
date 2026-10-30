import ToolPageShell from "@/components/ToolPageShell";
import GrowthStudioTool from "@/components/tools/GrowthStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/compound-interest-calculator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <GrowthStudioTool />
    </ToolPageShell>
  );
}
