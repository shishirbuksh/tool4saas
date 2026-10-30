import ToolPageShell from "@/components/ToolPageShell";
import HomeLoanEligibilityTool from "@/components/tools/HomeLoanEligibilityTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/home-loan-eligibility-india/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <HomeLoanEligibilityTool />
    </ToolPageShell>
  );
}
