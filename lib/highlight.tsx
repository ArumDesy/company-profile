import { Fragment, type ReactNode } from "react"

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function highlightText(text: string, query: string): ReactNode {
  const trimmed = query.trim()
  if (!trimmed) return text

  const terms = trimmed.split(/\s+/).filter((term) => term.length >= 2)
  if (terms.length === 0) return text

  const lowered = new Set(terms.map((term) => term.toLowerCase()))
  const pattern = terms.map(escapeRegExp).join("|")
  const regex = new RegExp(`(${pattern})`, "gi")
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (!part) return null
    if (lowered.has(part.toLowerCase())) {
      return (
        <mark
          key={index}
          className="rounded-[1px] bg-measure px-1 font-semibold text-measure-foreground"
        >
          {part}
        </mark>
      )
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}
