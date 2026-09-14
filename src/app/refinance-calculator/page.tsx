import ToolPageShell from "@/components/ToolPageShell";
import RefinanceCalculatorTool from "@/components/tools/RefinanceCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "refinance-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><RefinanceCalculatorTool /></ToolPageShell>; }
