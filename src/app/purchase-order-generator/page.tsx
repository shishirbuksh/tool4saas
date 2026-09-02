import ToolPageShell from "@/components/ToolPageShell";
import PurchaseOrderGeneratorTool from "@/components/tools/PurchaseOrderGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "purchase-order-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PurchaseOrderGeneratorTool /></ToolPageShell>; }
