import ToolPageShell from "@/components/ToolPageShell";
import CmykConverterTool from "@/components/tools/CmykConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "cmyk-converter";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CmykConverterTool /></ToolPageShell>; }
