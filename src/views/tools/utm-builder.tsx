import ToolPageShell from "@/components/ToolPageShell";
import UtmBuilderTool from "@/components/tools/UtmBuilderTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/utm-builder/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <UtmBuilderTool />
    </ToolPageShell>
  );
}
