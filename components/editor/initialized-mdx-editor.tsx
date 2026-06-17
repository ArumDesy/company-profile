"use client"

import type { ForwardedRef } from "react"
import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor"

import { MdxToolbar } from "@/components/editor/mdx-toolbar"
import { MathBlockEditor } from "@/components/editor/math-block-editor"
import { MermaidBlockEditor } from "@/components/editor/mermaid-block-editor"
import { codeMirrorTheme } from "@/lib/codemirror-theme"

const codeBlockLanguages = {
  txt: "Teks",
  js: "JavaScript",
  ts: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  json: "JSON",
  css: "CSS",
  html: "HTML",
  bash: "Bash",
  sql: "SQL",
  python: "Python",
  math: "LaTeX",
  mermaid: "Mermaid",
}

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      ref={editorRef}
      contentEditableClassName="prose-blueprint mdx-content"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        codeBlockPlugin({
          defaultCodeBlockLanguage: "txt",
          codeBlockEditorDescriptors: [
            {
              priority: 10,
              match: (language) => language === "math" || language === "latex",
              Editor: MathBlockEditor,
            },
            {
              priority: 10,
              match: (language) => language === "mermaid",
              Editor: MermaidBlockEditor,
            },
          ],
        }),
        codeMirrorPlugin({
          codeBlockLanguages,
          codeMirrorExtensions: codeMirrorTheme,
        }),
        toolbarPlugin({
          toolbarClassName: "mdx-toolbar",
          toolbarContents: () => <MdxToolbar />,
        }),
        markdownShortcutPlugin(),
      ]}
      {...props}
    />
  )
}
