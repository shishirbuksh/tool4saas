import ToolPageShell from "@/components/ToolPageShell";
import WordCounterStudioTool from "@/components/tools/WordCounterStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/word-counter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <WordCounterStudioTool />
    </ToolPageShell>
  );
}
