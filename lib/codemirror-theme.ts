import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const blueprintHighlight = HighlightStyle.define([
  {
    tag: [t.keyword, t.controlKeyword, t.operatorKeyword, t.moduleKeyword, t.definitionKeyword],
    color: "var(--measure-ink)",
  },
  { tag: [t.string, t.special(t.string), t.regexp], color: "var(--signal-600)" },
  { tag: [t.number, t.bool, t.null], color: "var(--measure-600)" },
  {
    tag: [t.comment, t.lineComment, t.blockComment],
    color: "var(--ink-400)",
    fontStyle: "italic",
  },
  {
    tag: [t.function(t.variableName), t.function(t.propertyName), t.definition(t.function(t.variableName))],
    color: "var(--ink-900)",
    fontWeight: "600",
  },
  { tag: [t.typeName, t.className, t.namespace], color: "var(--signal-600)" },
  { tag: [t.propertyName, t.attributeName], color: "var(--foreground)" },
  { tag: [t.variableName, t.definition(t.variableName)], color: "var(--foreground)" },
  { tag: [t.tagName], color: "var(--measure-ink)" },
  { tag: [t.operator], color: "var(--measure-ink)" },
  { tag: [t.punctuation, t.bracket, t.paren, t.brace, t.squareBracket], color: "var(--ink-500)" },
  { tag: [t.link, t.url], color: "var(--measure-ink)", textDecoration: "underline" },
  { tag: t.strong, fontWeight: "700" },
  { tag: t.emphasis, fontStyle: "italic" },
])

export const codeMirrorTheme = [syntaxHighlighting(blueprintHighlight)]
