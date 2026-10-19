import ToolPageShell from "@/components/ToolPageShell";
import SalaryCalculatorTool from "@/components/tools/SalaryCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "salary-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SalaryCalculatorTool /></ToolPageShell>; }
