import ToolPageShell from "@/components/ToolPageShell";
import TextDiffTool from "@/components/tools/TextDiffTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/text-diff/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TextDiffTool />
    </ToolPageShell>
  );
}
