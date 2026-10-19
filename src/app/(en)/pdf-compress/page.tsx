import ToolPageShell from "@/components/ToolPageShell";
import PdfCompressTool from "@/components/tools/PdfCompressTool";
import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "pdf-compress";
const tool = getTool(slug)!;
const baseMetadata = toolMetadata(slug);
// TODO: implement real pdf-lib compression in PdfCompressTool; keep noindex until real.
// Placeholder currently only validates file type/size and shows an install error.
export const metadata: Metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfCompressTool />
    </ToolPageShell>
  );
}
