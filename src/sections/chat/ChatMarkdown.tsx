import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * A deliberately tiny markdown renderer for chat replies: paragraphs, "- " and
 * "1." lists, **bold**, *italic* and [links](url). It builds React elements (no
 * innerHTML), and only links to this site, email, or Karishma's own profiles.
 */

const SAFE_EXTERNAL = /^https:\/\/(www\.)?(linkedin\.com|github\.com|behance\.net)\//i

type Block =
  | { type: 'p'; lines: string[] }
  | { type: 'ul' | 'ol'; items: string[] }

function toBlocks(text: string): Block[] {
  const blocks: Block[] = []
  let current: Block | null = null
  const flush = () => {
    if (current) blocks.push(current)
    current = null
  }

  for (const raw of text.replace(/\r/g, '').split('\n')) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flush()
      continue
    }
    const bullet = line.match(/^\s{0,1}[-*•]\s+(.*)$/)
    const numbered = line.match(/^\s{0,1}\d+[.)]\s+(.*)$/)
    if (bullet || numbered) {
      const type = bullet ? 'ul' : 'ol'
      const content = (bullet ?? numbered)![1]
      if (!current || current.type !== type) {
        flush()
        current = { type, items: [] }
      }
      current.items.push(content)
      continue
    }
    // Indented line right after a list item continues that item.
    if (current && current.type !== 'p' && /^\s{2,}\S/.test(line)) {
      current.items[current.items.length - 1] += '\n' + line.trim()
      continue
    }
    if (!current || current.type !== 'p') {
      flush()
      current = { type: 'p', lines: [] }
    }
    current.lines.push(line.trim())
  }
  flush()
  return blocks
}

interface InlineProps {
  onNavigate?: () => void
}

function renderLink(label: string, href: string, key: string, { onNavigate }: InlineProps): ReactNode {
  const cls = 'chat-link'
  if (href.startsWith('mailto:')) {
    return <a key={key} className={cls} href={href}>{label}</a>
  }
  if (href.startsWith('/') && !href.startsWith('//')) {
    const isFile = /\.(pdf|png|jpe?g)$/i.test(href) || href.startsWith('/DesignSystem')
    if (isFile) {
      return <a key={key} className={cls} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
    }
    return <Link key={key} className={cls} to={href} onClick={onNavigate}>{label}</Link>
  }
  if (SAFE_EXTERNAL.test(href)) {
    return <a key={key} className={cls} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
  }
  return <Fragment key={key}>{label}</Fragment>
}

function renderInline(text: string, keyPrefix: string, props: InlineProps): ReactNode[] {
  const out: ReactNode[] = []
  const pattern = /(\*\*[^*\n]+\*\*|\[[^\]\n]+\]\([^)\s]+\)|(?<![*\w])\*[^*\n]+\*(?![*\w])|\n)/g
  let last = 0
  let i = 0
  for (const match of text.matchAll(pattern)) {
    const token = match[0]
    const start = match.index ?? 0
    if (start > last) out.push(text.slice(last, start))
    const key = `${keyPrefix}-${i++}`
    if (token === '\n') out.push(<br key={key} />)
    else if (token.startsWith('**')) out.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('[')) {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      out.push(m ? renderLink(m[1], m[2], key, props) : token)
    } else out.push(<em key={key}>{token.slice(1, -1)}</em>)
    last = start + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export default function ChatMarkdown({ text, onNavigate }: { text: string; onNavigate?: () => void }) {
  const blocks = toBlocks(text)
  const props = { onNavigate }
  return (
    <div className="chat-md">
      {blocks.map((block, b) => {
        if (block.type === 'p') {
          return <p key={b}>{renderInline(block.lines.join('\n'), `p${b}`, props)}</p>
        }
        const ListTag = block.type
        return (
          <ListTag key={b}>
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item, `l${b}-${j}`, props)}</li>
            ))}
          </ListTag>
        )
      })}
    </div>
  )
}
