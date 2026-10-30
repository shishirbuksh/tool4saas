import ToolPageShell from "@/components/ToolPageShell";
import StopwatchTool from "@/components/tools/StopwatchTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/stopwatch/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <StopwatchTool />
    </ToolPageShell>
  );
}
