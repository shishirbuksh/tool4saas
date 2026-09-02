import ToolPageShell from "@/components/ToolPageShell";
import SvgOptimizerTool from "@/components/tools/SvgOptimizerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "svg-optimizer";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SvgOptimizerTool /></ToolPageShell>; }
