import ToolPageShell from "@/components/ToolPageShell";
import PayslipGeneratorTool from "@/components/tools/PayslipGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "payslip-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PayslipGeneratorTool />
    </ToolPageShell>
  );
}
