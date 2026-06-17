import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

import { CodeBlock } from "@/components/blog/code-block"
import { Mermaid } from "@/components/blog/mermaid"
import { MathBlock } from "@/components/blog/math-block"

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="prose-blueprint">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          pre: ({ children }) => <>{children}</>,
          code({ className, children }) {
            const text = String(children).replace(/\n$/, "")
            const match = /language-([\w-]+)/.exec(className ?? "")
            const language = match?.[1]

            if (!language) return <code>{children}</code>
            if (language === "mermaid") return <Mermaid chart={text} />
            if (language === "math" || language === "latex") {
              return <MathBlock code={text} />
            }
            return <CodeBlock code={text} language={language} />
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
