import "../globals.css";
import RootDocument, { baseMetadata, baseViewport } from "@/components/RootDocument";

export const metadata = baseMetadata("en");
export const viewport = baseViewport;

// EN root layout — all English routes live in this group (URLs unchanged).
export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
