import ToolPageShell from "@/components/ToolPageShell";
import PasswordStrengthTool from "@/components/tools/PasswordStrengthTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "password-strength";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PasswordStrengthTool />
    </ToolPageShell>
  );
}
