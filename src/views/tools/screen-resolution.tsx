import ToolPageShell from "@/components/ToolPageShell";
import ScreenResolutionTool from "@/components/tools/ScreenResolutionTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/screen-resolution/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ScreenResolutionTool />
    </ToolPageShell>
  );
}
