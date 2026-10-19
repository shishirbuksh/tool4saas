import ToolPageShell from "@/components/ToolPageShell";
import RobotsTxtGeneratorTool from "@/components/tools/RobotsTxtGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "robots-txt-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><RobotsTxtGeneratorTool /></ToolPageShell>; }
