import ToolPageShell from "@/components/ToolPageShell";
import CssClipPathTool from "@/components/tools/CssClipPathTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "css-clip-path-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CssClipPathTool /></ToolPageShell>; }
