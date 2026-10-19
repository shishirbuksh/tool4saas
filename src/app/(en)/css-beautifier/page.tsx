import ToolPageShell from "@/components/ToolPageShell";
import CssBeautifierTool from "@/components/tools/CssBeautifierTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "css-beautifier";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CssBeautifierTool /></ToolPageShell>; }
