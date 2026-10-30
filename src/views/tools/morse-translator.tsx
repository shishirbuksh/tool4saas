import ToolPageShell from "@/components/ToolPageShell";
import MorseTranslatorTool from "@/components/tools/MorseTranslatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/morse-translator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <MorseTranslatorTool />
    </ToolPageShell>
  );
}
