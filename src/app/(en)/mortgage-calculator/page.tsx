import ToolPageShell from "@/components/ToolPageShell";
import MortgageCalculatorTool from "@/components/tools/MortgageCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "mortgage-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><MortgageCalculatorTool /></ToolPageShell>; }
