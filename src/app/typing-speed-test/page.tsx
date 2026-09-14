import ToolPageShell from "@/components/ToolPageShell";
import TypingSpeedTestTool from "@/components/tools/TypingSpeedTestTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "typing-speed-test";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><TypingSpeedTestTool /></ToolPageShell>; }
