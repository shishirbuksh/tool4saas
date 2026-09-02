import ToolPageShell from "@/components/ToolPageShell";
import QuotationGeneratorTool from "@/components/tools/QuotationGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "quotation-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><QuotationGeneratorTool /></ToolPageShell>; }
