import ToolPageShell from "@/components/ToolPageShell";
import SqlFormatterTool from "@/components/tools/SqlFormatterTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/sql-formatter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <SqlFormatterTool />
    </ToolPageShell>
  );
}
