import ToolPageShell from "@/components/ToolPageShell";
import TypingSpeedTestTool from "@/components/tools/TypingSpeedTestTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/typing-speed-test/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TypingSpeedTestTool />
    </ToolPageShell>
  );
}
