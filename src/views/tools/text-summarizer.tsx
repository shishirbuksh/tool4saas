import ToolPageShell from "@/components/ToolPageShell";
import TextSummarizerTool from "@/components/tools/TextSummarizerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/text-summarizer/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TextSummarizerTool />
    </ToolPageShell>
  );
}
