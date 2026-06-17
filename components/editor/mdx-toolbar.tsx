"use client"

import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  CreateLink,
  InsertThematicBreak,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  Separator,
  usePublisher,
  insertCodeBlock$,
} from "@mdxeditor/editor"
import { SquareCodeIcon, SigmaIcon, WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

function InsertBlockButtons() {
  const insertCodeBlock = usePublisher(insertCodeBlock$)

  const items = [
    { key: "txt", label: "Blok kode", icon: SquareCodeIcon, language: "txt" },
    { key: "math", label: "Rumus (LaTeX)", icon: SigmaIcon, language: "math" },
    { key: "mermaid", label: "Diagram (Mermaid)", icon: WorkflowIcon, language: "mermaid" },
  ]

  return (
    <>
      {items.map((item) => (
        <Button
          key={item.key}
          type="button"
          variant="ghost"
          size="icon-sm"
          title={item.label}
          aria-label={item.label}
          onClick={() =>
            insertCodeBlock({ language: item.language, code: "", meta: "" })
          }
        >
          <item.icon className="size-4" />
        </Button>
      ))}
    </>
  )
}

export function MdxToolbar() {
  return (
    <ConditionalContents
      options={[
        {
          when: (editor) => editor?.editorType === "codeblock",
          contents: () => <ChangeCodeMirrorLanguage />,
        },
        {
          fallback: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <BlockTypeSelect />
              <ListsToggle />
              <Separator />
              <CreateLink />
              <InsertThematicBreak />
              <Separator />
              <InsertBlockButtons />
            </>
          ),
        },
      ]}
    />
  )
}
