import ToolPageShell from "@/components/ToolPageShell";
import CagrCalculatorTool from "@/components/tools/CagrCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "cagr-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CagrCalculatorTool /></ToolPageShell>; }
