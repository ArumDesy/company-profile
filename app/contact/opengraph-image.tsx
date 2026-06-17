import { renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Hubungi studio Rakitan"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Kontak",
    title: "Mulai dari satu pesan.",
  })
}
