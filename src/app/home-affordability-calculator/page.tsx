import ToolPageShell from "@/components/ToolPageShell";
import HomeAffordabilityCalculatorTool from "@/components/tools/HomeAffordabilityCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "home-affordability-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><HomeAffordabilityCalculatorTool /></ToolPageShell>; }
