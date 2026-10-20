import ToolPageShell from "@/components/ToolPageShell";
import BmiStudioTool from "@/components/tools/BmiStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "bmi-calculator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <BmiStudioTool />
    </ToolPageShell>
  );
}
