"use client"

import {
  useCodeBlockEditorContext,
  type CodeBlockEditorProps,
} from "@mdxeditor/editor"

import { Textarea } from "@/components/ui/textarea"
import { renderMath } from "@/lib/katex"

export function MathBlockEditor({ code }: CodeBlockEditorProps) {
  const { setCode } = useCodeBlockEditorContext()
  const html = renderMath(code.trim() || "\\text{rumus tampil di sini}", true)

  return (
    <div className="my-3 border border-border bg-secondary" data-no-mdx="true">
      <div className="border-b border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Rumus · LaTeX
      </div>
      <Textarea
        value={code}
        onChange={(event) => setCode(event.target.value)}
        rows={3}
        placeholder="contoh: E = mc^2"
        className="resize-y rounded-none border-0 bg-card font-mono text-sm focus-visible:ring-0"
      />
      <div
        className="overflow-x-auto border-t border-border px-3 py-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
