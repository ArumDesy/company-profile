import { renderMath } from "@/lib/katex"

export function MathBlock({ code }: { code: string }) {
  const html = renderMath(code.trim(), true)

  return (
    <div
      className="my-5 overflow-x-auto border border-border bg-secondary px-4 py-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
