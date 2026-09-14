import ToolPageShell from "@/components/ToolPageShell";
import SubnetCalculatorTool from "@/components/tools/SubnetCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "subnet-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SubnetCalculatorTool /></ToolPageShell>; }
