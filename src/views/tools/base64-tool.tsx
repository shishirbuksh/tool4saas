import ToolPageShell from "@/components/ToolPageShell";
import Base64Tool from "@/components/tools/Base64Tool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/base64-tool/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <Base64Tool />
    </ToolPageShell>
  );
}
