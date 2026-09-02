import ToolPageShell from "@/components/ToolPageShell";
import XmlFormatterTool from "@/components/tools/XmlFormatterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "xml-formatter";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><XmlFormatterTool /></ToolPageShell>; }
