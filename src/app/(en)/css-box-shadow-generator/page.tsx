import ToolPageShell from "@/components/ToolPageShell";
import CssBoxShadowTool from "@/components/tools/CssBoxShadowTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "css-box-shadow-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CssBoxShadowTool /></ToolPageShell>; }
