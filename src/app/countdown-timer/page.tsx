import ToolPageShell from "@/components/ToolPageShell";
import CountdownTimerTool from "@/components/tools/CountdownTimerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "countdown-timer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CountdownTimerTool /></ToolPageShell>; }
