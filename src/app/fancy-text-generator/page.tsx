import ToolPageShell from "@/components/ToolPageShell";
import FancyTextGeneratorTool from "@/components/tools/FancyTextGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "fancy-text-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><FancyTextGeneratorTool /></ToolPageShell>; }
