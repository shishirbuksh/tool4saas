import ToolPageShell from "@/components/ToolPageShell";
import TimeDurationCalculatorTool from "@/components/tools/TimeDurationCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "time-duration-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><TimeDurationCalculatorTool /></ToolPageShell>; }
