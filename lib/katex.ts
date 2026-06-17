import katex from "katex"

export function renderMath(code: string, displayMode = true): string {
  try {
    return katex.renderToString(code, {
      displayMode,
      throwOnError: false,
      output: "htmlAndMathml",
    })
  } catch {
    return code
  }
}
