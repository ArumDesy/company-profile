"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"

import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  className?: string
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Tulis isi artikel di sini…",
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  return (
    <div
      className={cn(
        "border border-border bg-card",
        className
      )}
    >
      {editor && <EditorToolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "prose-blueprint min-h-[280px] px-4 py-3 focus-within:outline-none",
          "[&_.tiptap]:min-h-[256px] [&_.tiptap]:outline-none",
          "[&_.tiptap_p.is-empty::before]:pointer-events-none",
          "[&_.tiptap_p.is-empty::before]:float-left",
          "[&_.tiptap_p.is-empty::before]:h-0",
          "[&_.tiptap_p.is-empty::before]:text-muted-foreground",
          "[&_.tiptap_p.is-empty::before]:content-[attr(data-placeholder)]"
        )}
      />
    </div>
  )
}
