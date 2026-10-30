import ToolPageShell from "@/components/ToolPageShell";
import PlagiarismCheckerTool from "@/components/tools/PlagiarismCheckerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/plagiarism-checker/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PlagiarismCheckerTool />
    </ToolPageShell>
  );
}
