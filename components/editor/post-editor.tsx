"use client"

import { useRef } from "react"
import type { MDXEditorMethods } from "@mdxeditor/editor"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ForwardRefEditor } from "@/components/editor/forward-ref-editor"
import { MarkdownContent } from "@/components/blog/markdown-content"

type PostEditorProps = {
  initialMarkdown: string
  value: string
  onChange: (markdown: string) => void
  invalid?: boolean
}

const inlineInsertions = [
  { label: "Judul bagian", markdown: "\n## Judul bagian\n" },
  { label: "Daftar poin", markdown: "\n- poin pertama\n" },
  { label: "Kutipan", markdown: "\n> kutipan\n" },
  { label: "Tautan", markdown: "[teks tautan](https://)" },
]

const blockInsertions = [
  { label: "Blok kode", markdown: "\n```ts\n\n```\n" },
  { label: "Rumus (LaTeX)", markdown: "\n```math\nE = mc^2\n```\n" },
  {
    label: "Diagram (Mermaid)",
    markdown: "\n```mermaid\nflowchart LR\n  A --> B\n```\n",
  },
]

export function PostEditor({
  initialMarkdown,
  value,
  onChange,
  invalid,
}: PostEditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null)

  const insert = (markdown: string) => {
    editorRef.current?.focus()
    editorRef.current?.insertMarkdown(markdown)
  }

  return (
    <Tabs defaultValue="write">
      <TabsList>
        <TabsTrigger value="write">Tulis</TabsTrigger>
        <TabsTrigger value="preview">Pratinjau</TabsTrigger>
      </TabsList>

      <TabsContent value="write">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={invalid ? "border border-destructive" : "border border-border"}
            >
              <ForwardRefEditor
                ref={editorRef}
                markdown={initialMarkdown}
                onChange={onChange}
                placeholder="Tulis isi artikel di sini…"
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel className="font-mono text-xs uppercase tracking-widest">
              Sisipkan
            </ContextMenuLabel>
            {inlineInsertions.map((item) => (
              <ContextMenuItem
                key={item.label}
                onSelect={() => insert(item.markdown)}
              >
                {item.label}
              </ContextMenuItem>
            ))}
            <ContextMenuSeparator />
            {blockInsertions.map((item) => (
              <ContextMenuItem
                key={item.label}
                onSelect={() => insert(item.markdown)}
              >
                {item.label}
              </ContextMenuItem>
            ))}
          </ContextMenuContent>
        </ContextMenu>
      </TabsContent>

      <TabsContent value="preview">
        <div className="min-h-[320px] border border-border bg-card px-4 py-4">
          {value.trim() ? (
            <MarkdownContent markdown={value} />
          ) : (
            <p className="font-mono text-xs text-muted-foreground">
              Belum ada isi untuk ditampilkan.
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
