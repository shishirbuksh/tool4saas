import ToolPageShell from "@/components/ToolPageShell";
import TextToSpeechTool from "@/components/tools/TextToSpeechTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/text-to-speech/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TextToSpeechTool />
    </ToolPageShell>
  );
}
