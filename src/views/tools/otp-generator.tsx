import ToolPageShell from "@/components/ToolPageShell";
import OtpGeneratorTool from "@/components/tools/OtpGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/otp-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <OtpGeneratorTool />
    </ToolPageShell>
  );
}
