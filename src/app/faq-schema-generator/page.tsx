import ToolPageShell from "@/components/ToolPageShell";
import FaqSchemaGeneratorTool from "@/components/tools/FaqSchemaGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "faq-schema-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><FaqSchemaGeneratorTool /></ToolPageShell>; }
