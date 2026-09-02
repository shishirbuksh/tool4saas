import ToolPageShell from "@/components/ToolPageShell";
import YamlToJsonTool from "@/components/tools/YamlToJsonTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "yaml-to-json";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><YamlToJsonTool /></ToolPageShell>; }
