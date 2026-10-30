import ToolPageShell from "@/components/ToolPageShell";
import SignatureMakerTool from "@/components/tools/SignatureMakerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/signature-maker/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SignatureMakerTool />
    </ToolPageShell>
  );
}
