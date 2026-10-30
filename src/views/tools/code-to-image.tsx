import ToolPageShell from "@/components/ToolPageShell";
import CodeToImageTool from "@/components/tools/CodeToImageTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/code-to-image/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CodeToImageTool />
    </ToolPageShell>
  );
}
