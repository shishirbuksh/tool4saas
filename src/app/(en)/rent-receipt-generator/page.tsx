import ToolPageShell from "@/components/ToolPageShell";
import RentReceiptTool from "@/components/tools/RentReceiptTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "rent-receipt-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><RentReceiptTool /></ToolPageShell>; }
