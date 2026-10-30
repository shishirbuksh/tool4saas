import ToolPageShell from "@/components/ToolPageShell";
import ColorContrastTool from "@/components/tools/ColorContrastTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/color-contrast/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ColorContrastTool />
    </ToolPageShell>
  );
}
