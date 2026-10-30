import ToolPageShell from "@/components/ToolPageShell";
import TimeStudioTool from "@/components/tools/TimeStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/timezone-converter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TimeStudioTool />
    </ToolPageShell>
  );
}
