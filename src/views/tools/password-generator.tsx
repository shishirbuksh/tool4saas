import ToolPageShell from "@/components/ToolPageShell";
import PasswordStudioTool from "@/components/tools/PasswordStudioTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/password-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PasswordStudioTool />
    </ToolPageShell>
  );
}
