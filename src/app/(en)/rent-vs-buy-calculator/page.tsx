import ToolPageShell from "@/components/ToolPageShell";
import RentVsBuyCalculatorTool from "@/components/tools/RentVsBuyCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "rent-vs-buy-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><RentVsBuyCalculatorTool /></ToolPageShell>; }
