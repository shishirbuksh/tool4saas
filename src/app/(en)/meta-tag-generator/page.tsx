import ToolPageShell from "@/components/ToolPageShell";
import MetaTagGeneratorTool from "@/components/tools/MetaTagGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "meta-tag-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><MetaTagGeneratorTool /></ToolPageShell>; }
