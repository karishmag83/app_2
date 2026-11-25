import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Check,
  Copy,
  FileText,
  Mail,
  MessagesSquare,
  ScrollText,
  RotateCcw,
  Square,
  X,
} from 'lucide-react'
import ChatMarkdown from './chat/ChatMarkdown'
import { AIMark } from './AIOrb'
import {
  generateSmartResponse,
  suggestionsFor,
  type ChatAction,
  type ConversationContext,
} from './aiChatLogic.ts'

interface AIChatProps {
  onClose: () => void
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  suggestions?: string[]
  actions?: ChatAction[]
  sources?: string[]
  streaming?: boolean
}

const STORAGE_KEY = 'karishma-ai-chat-v2'
const HISTORY_LIMIT = 12
const MAX_INPUT = 6000

const STARTERS = [
  { icon: BadgeCheck, label: 'Why hire Karishma?', prompt: 'Why should we hire Karishma?' },
  { icon: ScrollText, label: 'Summarize her in 3 lines', prompt: 'Summarize her in 3 lines' },
  { icon: MessagesSquare, label: 'Her work with AI', prompt: 'What is her experience designing AI products?' },
  { icon: Briefcase, label: 'Check fit for my role', prompt: null },
] as const

const CASE_STUDY_NAMES = ['AI Care Navigator', 'Restoration Medicine', 'RePack Portal', 'Folio Tracker', 'Hearth', 'Pulse']

/** Sources for a live answer: the case studies it mentions, plus her résumé. */
const deriveSources = (text: string) => [
  'Résumé',
  ...CASE_STUDY_NAMES.filter(n => text.includes(n)).slice(0, 2).map(n => `${n} case study`),
]

// Once the live endpoint says it isn't configured, stay on-device for the session.
let liveUnavailable = false

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function loadMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as ChatMessage[]) : []
    return Array.isArray(parsed) ? parsed.map(m => ({ ...m, streaming: false })).filter(m => m.text) : []
  } catch {
    return []
  }
}

type LiveEvent = { type: 'text' | 'replace'; text: string } | { type: 'reset' | 'done' } | { type: 'error'; code?: string }

/** Streams a reply from /api/chat. Resolves 'unavailable' when the endpoint isn't set up. */
async function streamLive(
  history: { role: 'user' | 'assistant'; content: string }[],
  onEvent: (e: LiveEvent) => void,
  signal: AbortSignal,
): Promise<'ok' | 'unavailable' | 'failed'> {
  if (liveUnavailable) return 'unavailable'
  let res: Response
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
      signal,
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err
    return 'failed'
  }
  if (res.status === 503 || res.status === 404 || res.status === 405) {
    liveUnavailable = true
    return 'unavailable'
  }
  const type = res.headers.get('content-type') ?? ''
  if (!res.ok || !res.body || !type.includes('ndjson')) return 'failed'

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let gotText = false
  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let nl: number
    while ((nl = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, nl).trim()
      buffer = buffer.slice(nl + 1)
      if (!line) continue
      let event: LiveEvent
      try {
        event = JSON.parse(line) as LiveEvent
      } catch {
        continue
      }
      if (event.type === 'error') return gotText ? 'ok' : 'failed'
      if (event.type === 'text' || event.type === 'replace') gotText = true
      onEvent(event)
    }
  }
  return gotText ? 'ok' : 'failed'
}

function ActionChip({ action, onNavigate }: { action: ChatAction; onNavigate: () => void }) {
  const Icon = action.kind === 'mailto' ? Mail : action.kind === 'file' ? FileText : ArrowUpRight
  const cls = 'chat-action inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium'
  if (action.kind === 'route') {
    return (
      <Link to={action.href} onClick={onNavigate} className={cls}>
        {action.label}
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    )
  }
  const external = action.kind !== 'mailto'
  return (
    <a
      href={action.href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {action.label}
    </a>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="chat-icon-btn h-7 w-7"
      aria-label={copied ? 'Copied' : 'Copy answer'}
      title={copied ? 'Copied' : 'Copy'}
      onClick={() => {
        navigator.clipboard?.writeText(text.replace(/\*\*/g, '')).then(() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1600)
        }).catch(() => {})
      }}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

export default function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages)
  const [input, setInput] = useState('')
  const [fitMode, setFitMode] = useState(false)
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const revealRef = useRef<number | null>(null)
  const idRef = useRef(0)
  const contextRef = useRef<ConversationContext>({ projectsDiscussed: [], askedAboutContact: false, askedAboutSkills: false })
  const returnFocusRef = useRef<Element | null>(null)
  const closingRef = useRef(false)

  const nextId = () => `m-${Date.now().toString(36)}-${++idRef.current}`

  /**
   * Put the cursor in the text box. On touch screens this would raise the
   * keyboard over the answer, so it only happens there when the visitor asked
   * to type (force), e.g. "Check fit for my role".
   */
  const focusInput = (force = false) => {
    const finePointer = window.matchMedia?.('(pointer: fine)').matches
    if (force || finePointer) inputRef.current?.focus({ preventScroll: true })
  }

  // Enter animation + focus management
  useEffect(() => {
    returnFocusRef.current = document.activeElement
    const raf = requestAnimationFrame(() => setOpen(true))
    // Desktop: start typing right away. Touch screens: focus the sheet itself so the
    // keyboard does not jump up before the visitor has seen the starters.
    const typeFirst = window.matchMedia?.('(min-width: 640px) and (pointer: fine)').matches
    const t = window.setTimeout(() => (typeFirst ? inputRef.current : panelRef.current)?.focus({ preventScroll: true }), 60)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
      abortRef.current?.abort()
      if (revealRef.current) window.clearInterval(revealRef.current)
      const el = returnFocusRef.current
      if (el instanceof HTMLElement) el.focus({ preventScroll: true })
    }
  }, [])

  // Phones: keep the sheet above the on-screen keyboard and within the visible area
  useEffect(() => {
    const vv = window.visualViewport
    const panel = panelRef.current
    if (!vv || !panel) return
    const update = () => {
      const keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
      panel.style.setProperty('--chat-kb', `${Math.round(keyboard)}px`)
      panel.style.setProperty('--chat-vv', `${Math.round(vv.height)}px`)
    }
    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
    }
  }, [])

  // Persist the conversation for this browser session
  useEffect(() => {
    if (busy) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)))
    } catch {
      /* storage unavailable */
    }
  }, [messages, busy])

  // Keep the newest content in view
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy])

  // Auto-grow the composer
  useLayoutEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, fitMode ? 220 : 132)}px`
  }, [input, fitMode])

  const close = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setOpen(false)
    window.setTimeout(onClose, prefersReducedMotion() ? 0 : 260)
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
      // Keep keyboard focus inside the dialog
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea')
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close])

  const patchMessage = (id: string, patch: (m: ChatMessage) => Partial<ChatMessage>) =>
    setMessages(prev => prev.map(m => (m.id === id ? { ...m, ...patch(m) } : m)))

  /** Reveal an on-device answer progressively so it reads like the live model. */
  const revealLocal = (id: string, full: string, extras: Pick<ChatMessage, 'suggestions' | 'actions' | 'sources'>) =>
    new Promise<void>(resolve => {
      const finish = () => {
        if (revealRef.current) window.clearInterval(revealRef.current)
        revealRef.current = null
        patchMessage(id, () => ({ text: full, streaming: false, ...extras }))
        setAnnouncement(full.replace(/\*\*/g, ''))
        resolve()
      }
      if (prefersReducedMotion()) return finish()
      let shown = 0
      const step = Math.max(3, Math.ceil(full.length / 70))
      revealRef.current = window.setInterval(() => {
        shown = Math.min(full.length, shown + step)
        if (shown >= full.length) return finish()
        patchMessage(id, () => ({ text: full.slice(0, shown) }))
      }, 16)
      abortRef.current?.signal.addEventListener('abort', finish, { once: true })
    })

  const send = async (raw: string, opts: { fit?: boolean } = {}) => {
    const text = raw.trim()
    if (!text || busy) return
    const isFit = opts.fit ?? fitMode
    const content = isFit && !/^job description:/i.test(text) ? `Job description:\n${text}` : text

    const userMsg: ChatMessage = { id: nextId(), role: 'user', text: isFit ? text : content }
    const botId = nextId()
    const history = [...messages, { ...userMsg, text: content }]
      .slice(-HISTORY_LIMIT)
      .map(m => ({ role: m.role, content: m.text }))
    while (history.length && history[0].role !== 'user') history.shift()

    setMessages(prev => [...prev, userMsg, { id: botId, role: 'assistant', text: '', streaming: true }])
    setInput('')
    setFitMode(false)
    setBusy(true)

    const controller = new AbortController()
    abortRef.current = controller
    const local = () => generateSmartResponse(content, contextRef.current)

    try {
      let acc = ''
      const result = await streamLive(
        history,
        event => {
          if (event.type === 'text') acc += event.text
          else if (event.type === 'replace') acc = event.text
          else if (event.type === 'reset') acc = ''
          else return
          patchMessage(botId, () => ({ text: acc }))
        },
        controller.signal,
      )

      if (result === 'ok') {
        patchMessage(botId, () => ({ text: acc, streaming: false, suggestions: suggestionsFor(content), sources: deriveSources(acc) }))
        setAnnouncement(acc.replace(/\*\*/g, ''))
      } else {
        const answer = local()
        await revealLocal(botId, answer.response, { suggestions: answer.suggestions, actions: answer.actions, sources: answer.sources })
      }
    } catch {
      // Stopped by the visitor — keep whatever arrived.
      patchMessage(botId, m => ({ streaming: false, text: m.text || 'Stopped.' }))
    } finally {
      abortRef.current = null
      setBusy(false)
      focusInput()
    }
  }

  const stop = () => abortRef.current?.abort()

  const reset = () => {
    stop()
    contextRef.current = { projectsDiscussed: [], askedAboutContact: false, askedAboutSkills: false }
    setMessages([])
    setFitMode(false)
    setInput('')
    focusInput()
  }

  const startFit = () => {
    setFitMode(true)
    window.setTimeout(() => focusInput(true), 0)
  }

  const onSuggestion = (s: string) => {
    if (/check fit|fit for my role/i.test(s)) return startFit()
    if (/^email karishma$/i.test(s)) {
      window.location.href = 'mailto:karishmadilipgawali@gmail.com'
      return
    }
    void send(s, { fit: false })
  }

  const last = messages[messages.length - 1]
  const showSuggestions = !busy && last?.role === 'assistant' && (last.suggestions?.length ?? 0) > 0

  return (
    <>
      <div
        className={`chat-scrim fixed inset-0 z-[60] ${open ? 'is-open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        tabIndex={-1}
        className={`chat-panel fixed z-[61] flex flex-col overflow-hidden outline-none ${open ? 'is-open' : ''}`}
      >
        {/* Header */}
        <header className="chat-header flex items-center gap-3 px-4 py-3 sm:px-5">
          <span className="chat-avatar relative h-9 w-9 shrink-0">
            <img src="/karishma-avatar.jpg" alt="" className="h-full w-full rounded-full object-cover" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="chat-title" className="text-[15px] font-semibold leading-tight tracking-tight">Karishma's AI</h2>
            <p className="truncate text-xs" style={{ color: 'var(--subtle-color)' }}>
              Grounded in her résumé and case studies
            </p>
          </div>
          {messages.length > 0 && (
            <button type="button" onClick={reset} className="chat-icon-btn h-8 w-8" aria-label="Start a new chat" title="New chat">
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button type="button" onClick={close} className="chat-icon-btn h-8 w-8" aria-label="Close chat" title="Close">
            <X className="h-[18px] w-[18px]" />
          </button>
        </header>

        {/* Conversation */}
        <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-5 sm:px-5">
          {messages.length === 0 ? (
            <div className="chat-welcome flex min-h-full flex-col justify-end">
              <div className="mb-5 sm:mb-6">
                <span className="mb-5 hidden sm:inline-block">
                  <AIMark size={56} />
                </span>
                <p className="font-display text-[22px] font-semibold leading-[1.15] tracking-tight sm:text-[26px]">
                  Ask anything about Karishma's work.
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed sm:text-[14px]" style={{ color: 'var(--muted-color)' }}>
                  Ask about her experience, case studies or process, or paste a job description to see how she fits.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STARTERS.map(({ icon: Icon, label, prompt }) => (
                  <button
                    key={label}
                    type="button"
                    className="chat-starter flex items-center gap-2.5 rounded-2xl p-3 text-left text-[13.5px] font-medium leading-snug sm:flex-col sm:items-start sm:gap-3 sm:p-3.5"
                    onClick={() => (prompt ? void send(prompt, { fit: false }) : startFit())}
                  >
                    <Icon className="h-4 w-4 shrink-0" style={{ color: 'var(--primary-color)' }} aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ol className="space-y-5" aria-label="Conversation">
              {messages.map(m =>
                m.role === 'user' ? (
                  <li key={m.id} className="chat-row flex justify-end">
                    <div className="chat-bubble-user max-w-[85%] whitespace-pre-wrap rounded-[20px] rounded-br-md px-4 py-2.5 text-[14.5px] leading-relaxed">
                      {m.text.length > 420 ? `${m.text.slice(0, 420).trimEnd()}…` : m.text}
                    </div>
                  </li>
                ) : (
                  <li key={m.id} className="chat-row group">
                    {m.text ? (
                      <div className={`text-[14.5px] leading-relaxed ${m.streaming ? 'chat-streaming' : ''}`}>
                        <ChatMarkdown text={m.text} onNavigate={close} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 py-1.5" role="status">
                        <span className="chat-thinking flex items-center gap-1" aria-hidden="true"><span /><span /><span /></span>
                        <span className="chat-shimmer text-[13.5px] font-medium">Reviewing her résumé and case studies</span>
                      </div>
                    )}
                    {!m.streaming && m.sources?.length ? (
                      <p className="mt-3 flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--subtle-color)' }}>
                        <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>Based on {m.sources.join(' · ')}</span>
                      </p>
                    ) : null}
                    {!m.streaming && m.text && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        {m.actions?.map(a => <ActionChip key={a.href} action={a} onNavigate={close} />)}
                        <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                          <CopyButton text={m.text} />
                        </span>
                      </div>
                    )}
                  </li>
                ),
              )}
            </ol>
          )}

          {showSuggestions && (
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Suggested questions">
              {last.suggestions!.map(s => (
                <button key={s} type="button" className="chat-suggestion rounded-full px-3.5 py-1.5 text-[13px] font-medium" onClick={() => onSuggestion(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          className="chat-composer px-3 pb-3 pt-2 sm:px-4 sm:pb-4"
          onSubmit={e => {
            e.preventDefault()
            void send(input)
          }}
        >
          {fitMode && (
            <div className="mb-2 flex items-center justify-between gap-2 px-1">
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: 'var(--primary-color)' }}>
                <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                Role fit: paste a job description
              </span>
              <button type="button" className="text-[12.5px] font-medium hover:underline" style={{ color: 'var(--subtle-color)' }} onClick={() => setFitMode(false)}>
                Cancel
              </button>
            </div>
          )}
          <div className="chat-input-wrap flex items-end gap-2 rounded-[22px] p-1.5 pl-4">
            <label htmlFor="chat-input" className="sr-only">
              {fitMode ? 'Job description' : 'Ask about Karishma'}
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_INPUT}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  void send(input)
                }
              }}
              placeholder={fitMode ? 'Paste the role’s responsibilities and requirements…' : 'Ask about her work or fit…'}
              className="chat-input max-h-40 flex-1 resize-none bg-transparent py-2 text-[16px] leading-relaxed outline-none sm:max-h-56 sm:text-[14.5px]"
            />
            {busy ? (
              <button type="button" onClick={stop} className="chat-send h-9 w-9 shrink-0" aria-label="Stop generating" title="Stop">
                <Square className="h-3.5 w-3.5" fill="currentColor" />
              </button>
            ) : (
              <button type="submit" className="chat-send h-9 w-9 shrink-0" aria-label="Send message" disabled={!input.trim()}>
                <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.25} />
              </button>
            )}
          </div>
          <p className="mt-2 px-1 text-center text-[11px]" style={{ color: 'var(--subtle-color)' }}>
            AI answers can be imperfect. Her <a className="underline underline-offset-2" href="/Karishma-Dilip-Gawali-Resume.pdf" target="_blank" rel="noopener noreferrer">résumé</a> is the source of truth.
          </p>
        </form>

        <div className="sr-only" aria-live="polite">{announcement}</div>
      </div>
    </>
  )
}
