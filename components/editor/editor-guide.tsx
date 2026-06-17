"use client"

import { useState } from "react"
import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const toolbarHelp: { label: string; desc: string }[] = [
  { label: "B / I / U", desc: "tebal, miring, garis bawah — sorot teks dulu" },
  { label: "Tipe blok", desc: "ganti jadi judul, paragraf, atau kutipan" },
  { label: "Daftar", desc: "poin atau bernomor untuk urutan langkah" },
  { label: "Tautan", desc: "sorot teks, klik ikon rantai, tempel alamat" },
  { label: "Blok kode", desc: "potongan kode banyak baris, warna otomatis" },
  { label: "Rumus", desc: "tulis LaTeX, hasilnya langsung tampil di editor" },
  { label: "Diagram", desc: "tulis Mermaid, bagannya muncul sambil mengetik" },
]

const shortcuts: { keys: string; desc: string }[] = [
  { keys: "## ", desc: "judul bagian (## untuk H2, ### untuk H3)" },
  { keys: "- ", desc: "memulai daftar berpoin" },
  { keys: "**teks**", desc: "menebalkan teks" },
  { keys: "$E=mc^2$", desc: "rumus singkat di tengah kalimat" },
]

export function EditorGuide() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="border border-border bg-secondary/50"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto w-full items-center justify-between rounded-none px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:bg-secondary"
        >
          Panduan singkat menulis
          <ChevronRightIcon
            className={`size-3.5 transition-transform ${open ? "rotate-90" : ""}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 border-t border-border px-4 py-4 text-sm">
          <p className="text-muted-foreground">
            Tak perlu paham kode. Pakai tombol di atas seperti aplikasi tulis
            biasa, atau ketik tanda di bawah dan teks otomatis terformat.
          </p>
          <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[8rem_1fr]">
            {toolbarHelp.map((item) => (
              <div key={item.label} className="contents">
                <dt className="font-mono text-xs font-semibold text-foreground">
                  {item.label}
                </dt>
                <dd className="text-muted-foreground">{item.desc}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-1.5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Pintasan ketik
            </p>
            <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[8rem_1fr]">
              {shortcuts.map((item) => (
                <div key={item.keys} className="contents">
                  <dt className="font-mono text-xs font-semibold text-foreground">
                    {item.keys}
                  </dt>
                  <dd className="text-muted-foreground">{item.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Contoh diagram
            </p>
            <p className="text-muted-foreground">
              Klik tombol Diagram, lalu tulis alurnya seperti ini — bagannya
              langsung muncul:
            </p>
            <pre className="overflow-x-auto border border-border bg-card p-3 font-mono text-xs text-foreground">
{`flowchart LR
  Ide --> Rancang
  Rancang --> Bangun
  Bangun --> Rilis`}
            </pre>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
