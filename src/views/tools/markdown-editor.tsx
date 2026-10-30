import ToolPageShell from "@/components/ToolPageShell";
import MarkdownEditorTool from "@/components/tools/MarkdownEditorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/markdown-editor/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <MarkdownEditorTool />
    </ToolPageShell>
  );
}
