import ToolPageShell from "@/components/ToolPageShell";
import DateCalculatorTool from "@/components/tools/DateCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "date-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <DateCalculatorTool />
    </ToolPageShell>
  );
}
