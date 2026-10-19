import ToolPageShell from "@/components/ToolPageShell";
import InvoiceTool from "@/components/tools/InvoiceTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "invoice-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <InvoiceTool />
    </ToolPageShell>
  );
}
