import ToolPageShell from "@/components/ToolPageShell";
import ResumeTool from "@/components/tools/ResumeTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/resume-builder/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ResumeTool />
    </ToolPageShell>
  );
}
