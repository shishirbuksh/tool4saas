import ToolPageShell from "@/components/ToolPageShell";
import ReadabilityCheckerTool from "@/components/tools/ReadabilityCheckerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "readability-checker";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ReadabilityCheckerTool /></ToolPageShell>; }
