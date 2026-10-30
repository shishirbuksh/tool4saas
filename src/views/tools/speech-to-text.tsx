import ToolPageShell from "@/components/ToolPageShell";
import SpeechToTextTool from "@/components/tools/SpeechToTextTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/speech-to-text/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SpeechToTextTool />
    </ToolPageShell>
  );
}
