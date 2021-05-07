import 'github-markdown-css'
import MarkdownIt from 'markdown-it'
import { memo, useMemo } from 'react'

const md = new MarkdownIt({
  html: true,
  linkify: true,
})

function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str)))
}

export default memo(function MarkdownRenderer({ content, isBase64 }) {
  const str = isBase64 ? b64_to_utf8(content) : atob(content)

  const html = useMemo(() => md.render(str), [str])

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  )
})
