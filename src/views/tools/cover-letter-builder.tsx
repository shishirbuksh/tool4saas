import ToolPageShell from "@/components/ToolPageShell";
import CoverLetterBuilderTool from "@/components/tools/CoverLetterBuilderTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/cover-letter-builder/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CoverLetterBuilderTool />
    </ToolPageShell>
  );
}
