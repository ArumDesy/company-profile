"use client"

import { type ReactNode, type RefObject, useState } from "react"
import type { MDXEditorMethods } from "@mdxeditor/editor"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

type EditorContextMenuProps = {
  editorRef: RefObject<MDXEditorMethods | null>
  children: ReactNode
}

export function EditorContextMenu({ editorRef, children }: EditorContextMenuProps) {
  const [selection, setSelection] = useState("")
  const hasSelection = selection.trim().length > 0

  const captureSelection = (open: boolean) => {
    if (!open) return
    const text =
      typeof window !== "undefined"
        ? window.getSelection()?.toString() ?? ""
        : ""
    setSelection(text)
  }

  const insert = (markdown: string) => {
    editorRef.current?.focus()
    editorRef.current?.insertMarkdown(markdown)
  }

  const wrap = (before: string, after = before) => {
    editorRef.current?.focus()
    editorRef.current?.insertMarkdown(`${before}${selection}${after}`)
  }

  const copy = () => document.execCommand("copy")
  const cut = () => document.execCommand("cut")
  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) insert(text)
    } catch {
      /* clipboard ditolak browser — abaikan */
    }
  }

  return (
    <ContextMenu onOpenChange={captureSelection}>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-60">
        <ContextMenuLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {hasSelection
            ? `${selection.trim().length} karakter terpilih`
            : "Tak ada yang dipilih"}
        </ContextMenuLabel>
        <ContextMenuSeparator />

        <ContextMenuItem disabled={!hasSelection} onSelect={copy}>
          Salin
          <ContextMenuShortcut>Ctrl C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled={!hasSelection} onSelect={cut}>
          Potong
          <ContextMenuShortcut>Ctrl X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={paste}>
          Tempel
          <ContextMenuShortcut>Ctrl V</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger disabled={!hasSelection}>
            Format teks
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem onSelect={() => wrap("**")}>Tebal</ContextMenuItem>
            <ContextMenuItem onSelect={() => wrap("_")}>Miring</ContextMenuItem>
            <ContextMenuItem onSelect={() => wrap("~~")}>Coret</ContextMenuItem>
            <ContextMenuItem onSelect={() => wrap("`")}>
              Kode sebaris
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={() => wrap("[", "](https://)")}>
              Jadikan tautan
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger>Sisipkan</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuSub>
              <ContextMenuSubTrigger>Judul</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem onSelect={() => insert("\n## Judul bagian\n")}>
                  Judul H2
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => insert("\n### Sub-judul\n")}>
                  Judul H3
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
              <ContextMenuSubTrigger>Daftar</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem onSelect={() => insert("\n- poin pertama\n")}>
                  Daftar poin
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => insert("\n1. langkah pertama\n")}>
                  Daftar bernomor
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => insert("\n- [ ] tugas\n")}>
                  Checklist
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
              <ContextMenuSubTrigger>Blok</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem onSelect={() => insert("\n```ts\n\n```\n")}>
                  Blok kode
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() => insert("\n```math\nE = mc^2\n```\n")}
                >
                  Rumus (LaTeX)
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() =>
                    insert("\n```mermaid\nflowchart LR\n  A --> B\n```\n")
                  }
                >
                  Diagram (Mermaid)
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSeparator />
            <ContextMenuItem onSelect={() => insert("\n> kutipan\n")}>
              Kutipan
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => insert("\n---\n")}>
              Garis pemisah
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
