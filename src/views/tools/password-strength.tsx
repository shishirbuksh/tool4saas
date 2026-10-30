import ToolPageShell from "@/components/ToolPageShell";
import PasswordStrengthTool from "@/components/tools/PasswordStrengthTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/password-strength/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PasswordStrengthTool />
    </ToolPageShell>
  );
}
