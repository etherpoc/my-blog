import { marked } from "marked"

export async function markdownToHTML(markdownText: string) {
  // Convert Markdown to HTML
  const htmlText = await marked(markdownText)
  return htmlText
}
