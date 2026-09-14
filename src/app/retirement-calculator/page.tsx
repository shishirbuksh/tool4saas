import ToolPageShell from "@/components/ToolPageShell";
import RetirementCalculatorTool from "@/components/tools/RetirementCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "retirement-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><RetirementCalculatorTool /></ToolPageShell>; }
