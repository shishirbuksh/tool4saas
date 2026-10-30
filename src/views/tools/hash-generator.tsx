import ToolPageShell from "@/components/ToolPageShell";
import HashStudioTool from "@/components/tools/HashStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/hash-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <HashStudioTool />
    </ToolPageShell>
  );
}
