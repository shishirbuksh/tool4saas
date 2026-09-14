import ToolPageShell from "@/components/ToolPageShell";
import ReceiptGeneratorTool from "@/components/tools/ReceiptGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "receipt-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ReceiptGeneratorTool /></ToolPageShell>; }
