import ToolPageShell from "@/components/ToolPageShell";
import PomodoroTimerTool from "@/components/tools/PomodoroTimerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pomodoro-timer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PomodoroTimerTool /></ToolPageShell>; }
