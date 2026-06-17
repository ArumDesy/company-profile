import { siteConfig } from "@/config/site"

export { default, generateStaticParams } from "./opengraph-image"

export const runtime = "nodejs"
export const alt = `Catatan teknis — ${siteConfig.name}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
