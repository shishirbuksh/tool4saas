import ToolPageShell from "@/components/ToolPageShell";
import WifiQrGeneratorTool from "@/components/tools/WifiQrGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "wifi-qr-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><WifiQrGeneratorTool /></ToolPageShell>; }
