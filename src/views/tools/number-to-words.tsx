import ToolPageShell from "@/components/ToolPageShell";
import EncoderStudioTool from "@/components/tools/EncoderStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/number-to-words/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <EncoderStudioTool />
    </ToolPageShell>
  );
}
