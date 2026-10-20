import ToolPageShell from "@/components/ToolPageShell";
import DocumentStudioTool from "@/components/tools/DocumentStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "document-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <DocumentStudioTool />
    </ToolPageShell>
  );
}
