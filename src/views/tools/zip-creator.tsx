import ToolPageShell from "@/components/ToolPageShell";
import ZipCreatorTool from "@/components/tools/ZipCreatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/zip-creator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ZipCreatorTool />
    </ToolPageShell>
  );
}
