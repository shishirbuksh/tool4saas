import ToolPageShell from "@/components/ToolPageShell";
import SerpPreviewTool from "@/components/tools/SerpPreviewTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "serp-preview";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SerpPreviewTool /></ToolPageShell>; }
