import ToolPageShell from "@/components/ToolPageShell";
import AtsResumeCheckerTool from "@/components/tools/AtsResumeCheckerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/ats-resume-checker/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <AtsResumeCheckerTool />
    </ToolPageShell>
  );
}
