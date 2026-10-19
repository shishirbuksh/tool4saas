import ToolPageShell from "@/components/ToolPageShell";
import AgeCalculatorTool from "@/components/tools/AgeCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "age-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <AgeCalculatorTool />
    </ToolPageShell>
  );
}
