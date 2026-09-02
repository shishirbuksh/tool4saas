import ToolPageShell from "@/components/ToolPageShell";
import IncomeTaxCalculatorTool from "@/components/tools/IncomeTaxCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "income-tax-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><IncomeTaxCalculatorTool /></ToolPageShell>; }
