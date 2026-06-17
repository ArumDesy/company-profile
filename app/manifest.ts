import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.legalName}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e2e8f0",
    theme_color: "#14202e",
    lang: "id",
    icons: [
      {
        src: "/brand/rakitan-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/rakitan-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
