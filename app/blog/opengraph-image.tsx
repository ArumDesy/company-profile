import { renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Catatan teknis studio Rakitan"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Catatan",
    title: "Catatan teknis dari dapur studio.",
  })
}
