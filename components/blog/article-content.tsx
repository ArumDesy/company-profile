import parse, { Element, Text, type DOMNode } from "html-react-parser"

import { sanitizeHtml } from "@/lib/sanitize"
import { CodeBlock } from "@/components/blog/code-block"
import { Mermaid } from "@/components/blog/mermaid"

function collectText(nodes: DOMNode[]): string {
  let text = ""
  for (const node of nodes) {
    if (node instanceof Text) {
      text += node.data
    } else if (node instanceof Element) {
      text += collectText(node.children as DOMNode[])
    }
  }
  return text
}

export function ArticleContent({ html }: { html: string }) {
  const clean = sanitizeHtml(html)

  const content = parse(clean, {
    replace: (node) => {
      if (!(node instanceof Element) || node.name !== "pre") return undefined

      const codeEl = node.children.find(
        (child): child is Element =>
          child instanceof Element && child.name === "code"
      )
      if (!codeEl) return undefined

      const className = codeEl.attribs?.class ?? ""
      const match = className.match(/language-([\w-]+)/)
      const language = match?.[1]
      const code = collectText(codeEl.children as DOMNode[])

      if (language === "mermaid") {
        return <Mermaid chart={code} />
      }
      return <CodeBlock code={code} language={language} />
    },
  })

  return <div className="prose-blueprint">{content}</div>
}
