import ToolPageShell from "@/components/ToolPageShell";
import JwtDecoderTool from "@/components/tools/JwtDecoderTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/jwt-decoder/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <JwtDecoderTool />
    </ToolPageShell>
  );
}
