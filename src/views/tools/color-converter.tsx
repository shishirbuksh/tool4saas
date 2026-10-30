import ToolPageShell from "@/components/ToolPageShell";
import ColorStudioTool from "@/components/tools/ColorStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/color-converter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ColorStudioTool />
    </ToolPageShell>
  );
}
