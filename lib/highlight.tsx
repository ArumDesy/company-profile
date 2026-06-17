import { Fragment, type ReactNode } from "react"

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function bigrams(value: string): Set<string> {
  const s = ` ${value.toLowerCase()} `
  const grams = new Set<string>()
  for (let i = 0; i < s.length - 1; i++) grams.add(s.slice(i, i + 2))
  return grams
}

function diceSimilarity(a: string, b: string): number {
  if (a === b) return 1
  if (a.length < 2 || b.length < 2) return 0
  const ga = bigrams(a)
  const gb = bigrams(b)
  let shared = 0
  for (const g of ga) if (gb.has(g)) shared++
  return (2 * shared) / (ga.size + gb.size)
}

function Mark({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-[1px] bg-measure px-1 font-semibold text-measure-foreground">
      {children}
    </mark>
  )
}

export function highlightText(text: string, query: string): ReactNode {
  const trimmed = query.trim()
  if (!trimmed) return text

  const terms = trimmed
    .split(/\s+/)
    .filter((term) => term.length >= 2)
    .map((term) => term.toLowerCase())
  if (terms.length === 0) return text

  const exactSet = new Set(terms)
  const pattern = terms.map(escapeRegExp).join("|")
  const exactRegex = new RegExp(`(${pattern})`, "gi")

  const tokens = text.split(/(\s+)/)

  return tokens.map((token, index) => {
    if (!token) return null

    if (/^\s+$/.test(token)) return <Fragment key={index}>{token}</Fragment>

    if (exactRegex.test(token)) {
      exactRegex.lastIndex = 0
      const parts = token.split(exactRegex)
      return (
        <Fragment key={index}>
          {parts.map((part, i) =>
            part && exactSet.has(part.toLowerCase()) ? (
              <Mark key={i}>{part}</Mark>
            ) : (
              <Fragment key={i}>{part}</Fragment>
            )
          )}
        </Fragment>
      )
    }

    const word = token.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase()
    const fuzzy = word.length >= 3 && terms.some((term) => diceSimilarity(word, term) >= 0.6)
    if (fuzzy) return <Mark key={index}>{token}</Mark>

    return <Fragment key={index}>{token}</Fragment>
  })
}
