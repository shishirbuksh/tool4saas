import ToolPageShell from "@/components/ToolPageShell";
import JsonToExcelTool from "@/components/tools/JsonToExcelTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "json-to-excel";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><JsonToExcelTool /></ToolPageShell>; }
