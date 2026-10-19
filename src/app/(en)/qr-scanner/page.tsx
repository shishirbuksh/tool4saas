import ToolPageShell from "@/components/ToolPageShell";
import QrScannerTool from "@/components/tools/QrScannerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "qr-scanner";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><QrScannerTool /></ToolPageShell>; }
