import ToolPageShell from "@/components/ToolPageShell";
import RandomStudioTool from "@/components/tools/RandomStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/random-number/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <RandomStudioTool />
    </ToolPageShell>
  );
}
