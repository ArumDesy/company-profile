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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
        <Tooltip key={item.key}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={item.label}
              onClick={() =>
                insertCodeBlock({ language: item.language, code: "", meta: "" })
              }
            >
              <item.icon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{item.label}</TooltipContent>
        </Tooltip>
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
