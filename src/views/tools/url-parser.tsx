import ToolPageShell from "@/components/ToolPageShell";
import UrlParserTool from "@/components/tools/UrlParserTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/url-parser/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <UrlParserTool />
    </ToolPageShell>
  );
}
