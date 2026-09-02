import ToolPageShell from "@/components/ToolPageShell";
import PdfMergeTool from "@/components/tools/PdfMergeTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-merge";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfMergeTool />
    </ToolPageShell>
  );
}
