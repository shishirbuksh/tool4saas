import ToolPageShell from "@/components/ToolPageShell";
import AiDetectorTool from "@/components/tools/AiDetectorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "ai-detector";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><AiDetectorTool /></ToolPageShell>; }
