import ToolPageShell from "@/components/ToolPageShell";
import ZipCreatorTool from "@/components/tools/ZipCreatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "zip-creator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ZipCreatorTool /></ToolPageShell>; }
