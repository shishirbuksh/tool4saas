import ToolPageShell from "@/components/ToolPageShell";
import FakeDataGeneratorTool from "@/components/tools/FakeDataGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "fake-data-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><FakeDataGeneratorTool /></ToolPageShell>; }
