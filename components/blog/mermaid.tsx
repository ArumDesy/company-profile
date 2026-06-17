"use client"

import { useEffect, useId, useRef, useState } from "react"

export function Mermaid({ chart }: { chart: string }) {
  const rawId = useId()
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`
  const ref = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let active = true

    import("mermaid")
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "neutral",
          fontFamily: "var(--font-mono)",
        })
        return mermaid.render(id, chart.trim())
      })
      .then(({ svg }) => {
        if (!active) return
        if (ref.current) ref.current.innerHTML = svg
        setStatus("ready")
      })
      .catch(() => {
        if (active) setStatus("error")
      })

    return () => {
      active = false
    }
  }, [chart, id])

  if (status === "error") {
    return <pre className="mermaid-fallback">{chart}</pre>
  }

  return (
    <div className="mermaid-diagram" role="img" aria-label="Diagram alur">
      <div ref={ref}>
        {status === "loading" && (
          <span className="font-mono text-xs text-muted-foreground">
            Memuat diagram…
          </span>
        )}
      </div>
    </div>
  )
}
