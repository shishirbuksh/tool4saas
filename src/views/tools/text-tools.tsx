import ToolPageShell from "@/components/ToolPageShell";
import TextStudioTool from "@/components/tools/TextStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/text-tools/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TextStudioTool />
    </ToolPageShell>
  );
}
