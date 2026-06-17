import { Resvg } from "@resvg/resvg-js"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

type Target = { src: string; out: string; size: number }

const root = resolve(import.meta.dirname, "..")

const targets: Target[] = [
  { src: "public/brand/rakitan-icon.svg", out: "app/apple-icon.png", size: 180 },
  { src: "public/brand/rakitan-icon.svg", out: "app/icon.png", size: 96 },
  { src: "public/brand/rakitan-icon.svg", out: "public/brand/rakitan-icon-512.png", size: 512 },
  { src: "public/brand/rakitan-icon.svg", out: "public/brand/rakitan-icon-192.png", size: 192 },
  { src: "public/brand/rakitan-mark.svg", out: "public/brand/rakitan-mark-1024.png", size: 1024 },
]

mkdirSync(resolve(root, "public/brand"), { recursive: true })

for (const { src, out, size } of targets) {
  const svg = readFileSync(resolve(root, src), "utf8")
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: src.includes("mark") ? "rgba(0,0,0,0)" : undefined,
  })
  const png = resvg.render().asPng()
  writeFileSync(resolve(root, out), png)
  process.stdout.write(`${out} (${size}px)\n`)
}
