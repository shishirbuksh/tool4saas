import ToolPageShell from "@/components/ToolPageShell";
import EmailExtractorTool from "@/components/tools/EmailExtractorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/email-extractor/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <EmailExtractorTool />
    </ToolPageShell>
  );
}
