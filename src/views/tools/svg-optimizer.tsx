import ToolPageShell from "@/components/ToolPageShell";
import SvgOptimizerTool from "@/components/tools/SvgOptimizerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/svg-optimizer/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SvgOptimizerTool />
    </ToolPageShell>
  );
}
