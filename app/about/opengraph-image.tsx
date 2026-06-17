import { renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Tentang studio Rakitan"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Tentang",
    title: "Kami rakit web app yang memang kami pakai sendiri.",
  })
}
