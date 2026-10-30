import ToolPageShell from "@/components/ToolPageShell";
import CreditCardValidatorTool from "@/components/tools/CreditCardValidatorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/credit-card-validator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CreditCardValidatorTool />
    </ToolPageShell>
  );
}
