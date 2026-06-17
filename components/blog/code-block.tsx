import hljs from "highlight.js/lib/common"

import { CopyButton } from "@/components/blog/copy-button"

type CodeBlockProps = {
  code: string
  language?: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const lang = language && hljs.getLanguage(language) ? language : undefined
  const highlighted = lang
    ? hljs.highlight(code, { language: lang }).value
    : hljs.highlightAuto(code).value

  return (
    <div className="my-5 border border-border bg-secondary">
      <div className="flex items-center justify-between border-b border-border px-3 py-1">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {lang ?? "teks"}
        </span>
        <CopyButton value={code} />
      </div>
      <pre
        className="overflow-x-auto px-4 py-3 text-sm"
        style={{ background: "transparent", border: "none", margin: 0 }}
      >
        <code
          className="hljs font-mono"
          style={{ background: "transparent", padding: 0 }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}
