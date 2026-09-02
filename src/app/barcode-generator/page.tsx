import ToolPageShell from "@/components/ToolPageShell";
import BarcodeGeneratorTool from "@/components/tools/BarcodeGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "barcode-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><BarcodeGeneratorTool /></ToolPageShell>; }
