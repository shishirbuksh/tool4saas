import ToolPageShell from "@/components/ToolPageShell";
import GstInvoiceTool from "@/components/tools/GstInvoiceTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "freelance-gst-invoice-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><GstInvoiceTool /></ToolPageShell>; }
