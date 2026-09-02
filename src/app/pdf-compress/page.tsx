import ToolPageShell from "@/components/ToolPageShell";
import PdfCompressTool from "@/components/tools/PdfCompressTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-compress";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfCompressTool />
    </ToolPageShell>
  );
}
