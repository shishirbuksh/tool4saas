import ToolPageShell from "@/components/ToolPageShell";
import GrammarCheckerTool from "@/components/tools/GrammarCheckerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/grammar-checker/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <GrammarCheckerTool />
    </ToolPageShell>
  );
}
