import ToolPageShell from "@/components/ToolPageShell";
import BusinessNameGeneratorTool from "@/components/tools/BusinessNameGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "business-name-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><BusinessNameGeneratorTool /></ToolPageShell>; }
