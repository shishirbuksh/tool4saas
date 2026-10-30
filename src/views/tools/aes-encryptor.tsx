import ToolPageShell from "@/components/ToolPageShell";
import AesEncryptorTool from "@/components/tools/AesEncryptorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/aes-encryptor/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <AesEncryptorTool />
    </ToolPageShell>
  );
}
