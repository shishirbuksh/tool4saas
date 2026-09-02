import ToolPageShell from "@/components/ToolPageShell";
import TextSummarizerTool from "@/components/tools/TextSummarizerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "text-summarizer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><TextSummarizerTool /></ToolPageShell>; }
