import ToolPageShell from "@/components/ToolPageShell";
import ImageColorExtractorTool from "@/components/tools/ImageColorExtractorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "image-color-extractor";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ImageColorExtractorTool /></ToolPageShell>; }
