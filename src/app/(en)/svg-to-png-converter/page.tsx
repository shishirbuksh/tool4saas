import ToolPageShell from "@/components/ToolPageShell";
import SvgToPngConverterTool from "@/components/tools/SvgToPngConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "svg-to-png-converter";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SvgToPngConverterTool /></ToolPageShell>; }
