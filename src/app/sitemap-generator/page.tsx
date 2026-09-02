import ToolPageShell from "@/components/ToolPageShell";
import SitemapGeneratorTool from "@/components/tools/SitemapGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "sitemap-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SitemapGeneratorTool /></ToolPageShell>; }
