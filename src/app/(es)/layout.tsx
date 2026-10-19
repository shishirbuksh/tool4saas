import "../globals.css";
import RootDocument, { baseMetadata, baseViewport } from "@/components/RootDocument";

export const metadata = baseMetadata("es");
export const viewport = baseViewport;

// ES root layout — owns <html lang="es"> for /es/* (server-rendered).
export default function EsRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
