import ToolPageShell from "@/components/ToolPageShell";
import ImageToBase64Tool from "@/components/tools/ImageToBase64Tool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/image-to-base64/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ImageToBase64Tool />
    </ToolPageShell>
  );
}
