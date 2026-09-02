import ToolPageShell from "@/components/ToolPageShell";
import AsciiConverterTool from "@/components/tools/AsciiConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "ascii-converter";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><AsciiConverterTool /></ToolPageShell>; }
