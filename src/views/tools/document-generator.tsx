import ToolPageShell from "@/components/ToolPageShell";
import DocumentStudioTool from "@/components/tools/DocumentStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/document-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <DocumentStudioTool />
    </ToolPageShell>
  );
}
