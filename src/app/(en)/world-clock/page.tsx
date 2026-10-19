import ToolPageShell from "@/components/ToolPageShell";
import WorldClockTool from "@/components/tools/WorldClockTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "world-clock";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><WorldClockTool /></ToolPageShell>; }
