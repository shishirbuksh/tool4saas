import ToolPageShell from "@/components/ToolPageShell";
import UsSalesTaxCalculatorTool from "@/components/tools/UsSalesTaxCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "us-sales-tax-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><UsSalesTaxCalculatorTool /></ToolPageShell>; }
