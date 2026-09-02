import ToolPageShell from "@/components/ToolPageShell";
import SignatureMakerTool from "@/components/tools/SignatureMakerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "signature-maker";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SignatureMakerTool /></ToolPageShell>; }
