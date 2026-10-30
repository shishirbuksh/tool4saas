import ToolPageShell from "@/components/ToolPageShell";
import CssStudioTool from "@/components/tools/CssStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/gradient-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CssStudioTool />
    </ToolPageShell>
  );
}
