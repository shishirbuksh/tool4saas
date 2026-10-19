import ToolPageShell from "@/components/ToolPageShell";
import JsBeautifierTool from "@/components/tools/JsBeautifierTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "js-beautifier";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><JsBeautifierTool /></ToolPageShell>; }
