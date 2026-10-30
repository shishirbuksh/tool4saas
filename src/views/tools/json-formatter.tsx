import ToolPageShell from "@/components/ToolPageShell";
import JsonStudioTool from "@/components/tools/JsonStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/json-formatter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <JsonStudioTool />
    </ToolPageShell>
  );
}
