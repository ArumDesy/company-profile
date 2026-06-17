"use client"

import { useRef } from "react"
import type { MDXEditorMethods } from "@mdxeditor/editor"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ForwardRefEditor } from "@/components/editor/forward-ref-editor"
import { EditorContextMenu } from "@/components/editor/editor-context-menu"
import { MarkdownContent } from "@/components/blog/markdown-content"

type PostEditorProps = {
  initialMarkdown: string
  value: string
  onChange: (markdown: string) => void
  invalid?: boolean
}

export function PostEditor({
  initialMarkdown,
  value,
  onChange,
  invalid,
}: PostEditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null)

  return (
    <Tabs defaultValue="write">
      <TabsList>
        <TabsTrigger value="write">Tulis</TabsTrigger>
        <TabsTrigger value="preview">Pratinjau</TabsTrigger>
      </TabsList>

      <TabsContent value="write" forceMount className="data-[state=inactive]:hidden">
        <EditorContextMenu editorRef={editorRef}>
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
        </EditorContextMenu>
      </TabsContent>

      <TabsContent value="preview" forceMount className="data-[state=inactive]:hidden">
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
