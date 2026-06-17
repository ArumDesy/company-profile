import DOMPurify from "isomorphic-dompurify"

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "h1", "h2", "h3", "h4",
      "ul", "ol", "li",
      "strong", "em",
      "a", "code", "pre", "blockquote",
      "br", "hr", "img",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt"],
  })
}
