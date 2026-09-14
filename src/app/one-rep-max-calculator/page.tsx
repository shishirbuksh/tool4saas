import ToolPageShell from "@/components/ToolPageShell";
import OneRepMaxCalculatorTool from "@/components/tools/OneRepMaxCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "one-rep-max-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><OneRepMaxCalculatorTool /></ToolPageShell>; }
