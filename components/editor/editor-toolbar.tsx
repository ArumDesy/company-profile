"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import {
  BoldIcon,
  ItalicIcon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  TextQuoteIcon,
  CodeIcon,
  LinkIcon,
} from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ToolbarProps = {
  editor: Editor
}

function LinkPopover({ editor }: ToolbarProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")

  const apply = () => {
    const trimmed = url.trim()
    if (trimmed === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: trimmed }).run()
    }
    setOpen(false)
  }

  const remove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run()
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) {
          const href = editor.getAttributes("link").href as string | undefined
          setUrl(href ?? "https://")
        }
        setOpen(next)
      }}
    >
      <PopoverTrigger asChild>
        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          aria-label="Tautan"
          title="Tautan"
        >
          <LinkIcon className="size-3.5" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="editor-link-url" className="text-xs">
            Alamat tautan
          </Label>
          <Input
            id="editor-link-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://contoh.com"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                apply()
              }
            }}
          />
        </div>
        <div className="flex justify-between gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={remove}
            disabled={!editor.isActive("link")}
          >
            Hapus
          </Button>
          <Button type="button" size="sm" onClick={apply}>
            Terapkan
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function EditorToolbar({ editor }: ToolbarProps) {
  const tools = [
    {
      key: "bold",
      icon: BoldIcon,
      label: "Tebal",
      active: () => editor.isActive("bold"),
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      key: "italic",
      icon: ItalicIcon,
      label: "Miring",
      active: () => editor.isActive("italic"),
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      key: "h2",
      icon: Heading2Icon,
      label: "Judul H2",
      active: () => editor.isActive("heading", { level: 2 }),
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      key: "h3",
      icon: Heading3Icon,
      label: "Judul H3",
      active: () => editor.isActive("heading", { level: 3 }),
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      key: "bulletList",
      icon: ListIcon,
      label: "Daftar poin",
      active: () => editor.isActive("bulletList"),
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      key: "orderedList",
      icon: ListOrderedIcon,
      label: "Daftar angka",
      active: () => editor.isActive("orderedList"),
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      key: "blockquote",
      icon: TextQuoteIcon,
      label: "Kutipan",
      active: () => editor.isActive("blockquote"),
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      key: "code",
      icon: CodeIcon,
      label: "Kode",
      active: () => editor.isActive("code"),
      action: () => editor.chain().focus().toggleCode().run(),
    },
  ]

  return (
    <div className="flex flex-wrap gap-0.5 border-b border-border bg-secondary px-2 py-1.5">
      {tools.map((tool) => (
        <Toggle
          key={tool.key}
          size="sm"
          pressed={tool.active()}
          onPressedChange={tool.action}
          aria-label={tool.label}
          title={tool.label}
        >
          <tool.icon className="size-3.5" />
        </Toggle>
      ))}
      <LinkPopover editor={editor} />
    </div>
  )
}
