import ToolPageShell from "@/components/ToolPageShell";
import SslCheckerTool from "@/components/tools/SslCheckerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "ssl-checker";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SslCheckerTool /></ToolPageShell>; }
