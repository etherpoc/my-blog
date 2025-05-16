import { marked } from "marked"

export const markdown_to_html = (mdtxt: string) => {
    const htmltxt = marked(mdtxt)
    console.log(htmltxt)
    return htmltxt
}