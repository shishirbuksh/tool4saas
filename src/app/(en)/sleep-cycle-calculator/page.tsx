import ToolPageShell from "@/components/ToolPageShell";
import SleepCycleCalculatorTool from "@/components/tools/SleepCycleCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "sleep-cycle-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SleepCycleCalculatorTool /></ToolPageShell>; }
