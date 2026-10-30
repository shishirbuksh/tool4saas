import ToolPageShell from "@/components/ToolPageShell";
import CodeStudioTool from "@/components/tools/CodeStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/code-minifier/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CodeStudioTool />
    </ToolPageShell>
  );
}
