import "../globals.css";
import RootDocument, { baseMetadata, baseViewport } from "@/components/RootDocument";

export const metadata = baseMetadata("fr");
export const viewport = baseViewport;

// FR root layout — owns <html lang="fr"> for /fr/* (server-rendered).
export default function FrRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="fr">{children}</RootDocument>;
}
