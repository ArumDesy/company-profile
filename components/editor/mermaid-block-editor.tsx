"use client"

import {
  useCodeBlockEditorContext,
  type CodeBlockEditorProps,
} from "@mdxeditor/editor"

import { Textarea } from "@/components/ui/textarea"
import { Mermaid } from "@/components/blog/mermaid"

export function MermaidBlockEditor({ code }: CodeBlockEditorProps) {
  const { setCode } = useCodeBlockEditorContext()

  return (
    <div className="my-3 border border-border bg-secondary" data-no-mdx="true">
      <div className="border-b border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Diagram · Mermaid
      </div>
      <Textarea
        value={code}
        onChange={(event) => setCode(event.target.value)}
        rows={5}
        placeholder={"flowchart LR\n  A --> B"}
        className="resize-y rounded-none border-0 bg-card font-mono text-sm focus-visible:ring-0"
      />
      <div className="border-t border-border p-3">
        {code.trim() ? (
          <Mermaid chart={code} />
        ) : (
          <span className="font-mono text-xs text-muted-foreground">
            Tulis sintaks Mermaid di atas — bagan muncul di sini.
          </span>
        )}
      </div>
    </div>
  )
}
