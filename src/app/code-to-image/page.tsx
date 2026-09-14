import ToolPageShell from "@/components/ToolPageShell";
import CodeToImageTool from "@/components/tools/CodeToImageTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "code-to-image";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CodeToImageTool /></ToolPageShell>; }
