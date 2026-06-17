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
  { label: "B / I", desc: "tebal & miring untuk menekankan kata" },
  { label: "H2 / H3", desc: "judul bagian biar tulisan rapi terbagi" },
  { label: "Daftar", desc: "poin atau bernomor untuk urutan langkah" },
  { label: "Kutipan", desc: "menyorot pernyataan penting" },
  { label: "Kode sebaris", desc: "menandai satu kata teknis di tengah kalimat" },
  { label: "Blok kode", desc: "potongan kode banyak baris, warnanya otomatis" },
  { label: "Diagram", desc: "gambar alur/bagan dari teks (format Mermaid)" },
  { label: "Tautan", desc: "sorot teks, klik ikon rantai, tempel alamat" },
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
            biasa — sorot teks dulu, lalu klik tombolnya.
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
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Contoh diagram
            </p>
            <p className="text-muted-foreground">
              Klik tombol Diagram, lalu tulis alurnya seperti ini — nanti otomatis
              jadi bagan di artikel:
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
