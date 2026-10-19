import ToolPageShell from "@/components/ToolPageShell";
import HmacGeneratorTool from "@/components/tools/HmacGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "hmac-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><HmacGeneratorTool /></ToolPageShell>; }
