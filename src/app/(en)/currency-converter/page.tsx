import ToolPageShell from "@/components/ToolPageShell";
import CurrencyConverterTool from "@/components/tools/CurrencyConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "currency-converter";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CurrencyConverterTool /></ToolPageShell>; }
