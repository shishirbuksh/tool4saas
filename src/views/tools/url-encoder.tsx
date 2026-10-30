import ToolPageShell from "@/components/ToolPageShell";
import UrlEncoderTool from "@/components/tools/UrlEncoderTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/url-encoder/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <UrlEncoderTool />
    </ToolPageShell>
  );
}
