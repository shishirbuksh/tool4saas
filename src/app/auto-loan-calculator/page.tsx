import ToolPageShell from "@/components/ToolPageShell";
import AutoLoanCalculatorTool from "@/components/tools/AutoLoanCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "auto-loan-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><AutoLoanCalculatorTool /></ToolPageShell>; }
