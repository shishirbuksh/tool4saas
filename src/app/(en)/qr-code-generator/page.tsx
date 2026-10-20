import ToolPageShell from "@/components/ToolPageShell";
import QrStudioTool from "@/components/tools/QrStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "qr-code-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <QrStudioTool />
    </ToolPageShell>
  );
}
