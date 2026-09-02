import ToolPageShell from "@/components/ToolPageShell";
import ColorShadesTool from "@/components/tools/ColorShadesTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "color-shades-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ColorShadesTool /></ToolPageShell>; }
