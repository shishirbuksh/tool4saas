import ToolPageShell from "@/components/ToolPageShell";
import CreditCardValidatorTool from "@/components/tools/CreditCardValidatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "credit-card-validator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CreditCardValidatorTool />
    </ToolPageShell>
  );
}
