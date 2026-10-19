import ToolPageShell from "@/components/ToolPageShell";
import CronParserTool from "@/components/tools/CronParserTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "cron-parser";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CronParserTool /></ToolPageShell>; }
