import { renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Layanan studio Rakitan"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Layanan",
    title: "Bangun dari nol, dashboard internal, atau revamp situs lama.",
  })
}
