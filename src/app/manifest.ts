import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Web app manifest: the PWA maskable icon (public/icon-maskable-512.png) was
// referenced by nothing before — installable-app metadata now surfaces it.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#FCFCF9",
    theme_color: "#FCFCF9",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
