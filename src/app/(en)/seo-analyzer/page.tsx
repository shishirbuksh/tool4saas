import ToolPageShell from "@/components/ToolPageShell";
import SeoAnalyzerTool from "@/components/tools/SeoAnalyzerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "seo-analyzer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SeoAnalyzerTool /></ToolPageShell>; }
