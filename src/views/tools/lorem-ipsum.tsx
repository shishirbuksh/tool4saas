import ToolPageShell from "@/components/ToolPageShell";
import LoremIpsumTool from "@/components/tools/LoremIpsumTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/lorem-ipsum/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <LoremIpsumTool />
    </ToolPageShell>
  );
}
