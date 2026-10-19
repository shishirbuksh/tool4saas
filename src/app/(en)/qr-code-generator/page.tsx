import ToolPageShell from "@/components/ToolPageShell";
import QrCodeTool from "@/components/tools/QrCodeTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "qr-code-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <QrCodeTool />
    </ToolPageShell>
  );
}
