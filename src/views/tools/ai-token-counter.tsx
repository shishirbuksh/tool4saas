import ToolPageShell from "@/components/ToolPageShell";
import AiTokenCounterTool from "@/components/tools/AiTokenCounterTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/ai-token-counter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <AiTokenCounterTool />
    </ToolPageShell>
  );
}
