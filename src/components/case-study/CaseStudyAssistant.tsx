import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronUp, X } from 'lucide-react'
import { AIMark } from '@/sections/AIOrb'
import { PROFILE } from '@/data/profile'
import type { CaseSection, CaseSummary } from '@/data/caseStudies'
import './case-study-assistant.css'

interface Props {
  summary: CaseSummary
  /** The page's sections, in reading order. Omit when the page has no section tracker. */
  sections?: CaseSection[]
  /** Width in px from which the page shows its own desktop tracker; below it the dock carries the tracker. */
  trackerFrom?: number
  /** Dark case studies get the dark glass. */
  tone?: 'light' | 'dark'
}

/** Live result of a media query. */
function useMedia(query: string) {
  return useSyncExternalStore(
    cb => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Section labels on some pages carry their own numbers ("04 Process"); the dock numbers them itself. */
const cleanLabel = (label: string) => label.replace(/^\d+\s+/, '')

/** Which section is being read, how far through the page the reader is, and whether the dock should show. */
function useReading(sections: CaseSection[] | undefined, mobile: boolean) {
  const [state, setState] = useState({ index: 0, progress: 0, shown: false })
  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      let index = 0
      if (sections?.length) {
        const line = window.innerHeight * 0.35
        sections.forEach((s, i) => {
          const el = document.getElementById(s.id)
          if (el && el.getBoundingClientRect().top <= line) index = i
        })
        if (progress > 0.995) index = sections.length - 1
      }
      // On phones the dock waits until the hero's own buttons have scrolled away,
      // and steps aside at the very end so the page footer stays tappable.
      const nearEnd = max - y < 160
      const shown = !nearEnd && (!mobile || y > window.innerHeight * 0.4)
      setState(prev =>
        prev.index === index && prev.shown === shown && Math.abs(prev.progress - progress) < 0.002
          ? prev
          : { index, progress, shown },
      )
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sections, mobile])
  return state
}

/** Locks page scroll, closes on Escape, and hands focus back to the trigger on close. */
function useDialog(open: boolean, onClose: () => void, focusRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    const t = window.setTimeout(() => focusRef.current?.focus({ preventScroll: true }), 60)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      root.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      trigger?.focus?.({ preventScroll: true })
    }
  }, [open, onClose, focusRef])
}

function ProgressRing({ progress, index }: { progress: number; index: number }) {
  const r = 12.5
  const c = 2 * Math.PI * r
  return (
    <span className="csa-ring" aria-hidden="true">
      <svg viewBox="0 0 30 30" width="30" height="30">
        <circle cx="15" cy="15" r={r} className="csa-ring-track" />
        <circle
          cx="15"
          cy="15"
          r={r}
          className="csa-ring-fill"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <span className="csa-ring-num">{index + 1}</span>
    </span>
  )
}

/** Reveals an answer a few words at a time, the way the chat streams. */
function StreamedAnswer({ text }: { text: string }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const [count, setCount] = useState(reduce ? words.length : 0)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setCount(n => {
        if (n >= words.length) {
          window.clearInterval(id)
          return n
        }
        return n + 2
      })
    }, 28)
    return () => window.clearInterval(id)
  }, [reduce, words.length])
  // The full answer sits invisibly underneath, so the card has its final height
  // from the first frame and scrolling it into view shows all of it.
  return (
    <div className="csa-answer-text">
      <p className="csa-answer-ghost" aria-hidden="true">{text}</p>
      <p className="csa-answer-live" aria-live="polite">
        {words.slice(0, count).join(' ')}
        {count < words.length && <span className="csa-caret" aria-hidden="true" />}
      </p>
    </div>
  )
}

function SummaryDialog({ summary, open, onClose, sheet, tone }: {
  summary: CaseSummary
  open: boolean
  onClose: () => void
  sheet: boolean
  tone: 'light' | 'dark'
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  const [asked, setAsked] = useState<number | null>(null)
  useDialog(open, onClose, closeRef)

  useEffect(() => {
    if (asked === null) return
    const t = window.setTimeout(() => answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
    return () => window.clearTimeout(t)
  }, [asked])

  const panel = sheet
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { opacity: 0, y: 16, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 10, scale: 0.98 } }

  return (
    <AnimatePresence onExitComplete={() => setAsked(null)}>
      {open && (
        <motion.div
          className={`csa csa-layer ${tone === 'dark' ? 'is-dark' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="csa-scrim" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="csa-title"
            className={`csa-dialog ${sheet ? 'is-sheet' : 'is-modal'}`}
            {...panel}
            transition={{ type: 'spring', damping: 32, stiffness: 340 }}
          >
            {sheet && <span className="csa-grabber" aria-hidden="true" />}
            <div className="csa-dialog-scroll">
              <header className="csa-head">
                <span className="csa-head-mark"><AIMark /></span>
                <div className="min-w-0">
                  <p className="csa-eyebrow">Summary by Karishma's AI</p>
                  <h2 id="csa-title" className="csa-title">{summary.title}</h2>
                </div>
                <button ref={closeRef} type="button" className="csa-close" onClick={onClose} aria-label="Close summary">
                  <X className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              </header>
              <ul className="csa-meta" aria-label="Project details">
                {summary.meta.map(m => <li key={m}>{m}</li>)}
              </ul>

              <section className="csa-block">
                <h3 className="csa-label">The problem</h3>
                <p className="csa-body">{summary.problem}</p>
              </section>

              <section className="csa-block">
                <h3 className="csa-label">What Karishma did</h3>
                <ul className="csa-list">
                  {summary.did.map(d => <li key={d}>{d}</li>)}
                </ul>
              </section>

              <section className="csa-block">
                <h3 className="csa-label">Impact</h3>
                <dl className={`csa-stats ${summary.impact.some(s => s.value.length > 8) ? 'is-long' : ''}`}>
                  {summary.impact.map(s => (
                    <div key={s.label} className="csa-stat">
                      <dt className="csa-stat-label">{s.label}</dt>
                      <dd className="csa-stat-value">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="csa-block">
                <h3 className="csa-label">Questions about this case study</h3>
                <div className="csa-chips">
                  {summary.questions.map((q, i) => (
                    <button
                      key={q.q}
                      type="button"
                      className={`csa-chip ${asked === i ? 'is-on' : ''}`}
                      aria-pressed={asked === i}
                      onClick={() => setAsked(i)}
                    >
                      {q.q}
                    </button>
                  ))}
                </div>
                {asked !== null && (
                  <div ref={answerRef} className="csa-answer">
                    <span className="csa-answer-mark"><AIMark /></span>
                    <StreamedAnswer key={asked} text={summary.questions[asked].a} />
                  </div>
                )}
              </section>

              <footer className="csa-foot">
                <span>Have a question this does not cover?</span>
                <a href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`About ${summary.title}`)}`} className="csa-foot-link">
                  Email Karishma
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </footer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SectionSheet({ sections, index, progress, open, onClose, onJump, tone }: {
  sections: CaseSection[]
  index: number
  progress: number
  open: boolean
  onClose: () => void
  onJump: (id: string) => void
  tone: 'light' | 'dark'
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useDialog(open, onClose, closeRef)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`csa csa-layer ${tone === 'dark' ? 'is-dark' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="csa-scrim" onClick={onClose} aria-hidden="true" />
          <motion.nav
            role="dialog"
            aria-modal="true"
            aria-labelledby="csa-toc-title"
            className="csa-dialog is-sheet csa-toc"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 340 }}
          >
            <span className="csa-grabber" aria-hidden="true" />
            <div className="csa-toc-head">
              <div>
                <h2 id="csa-toc-title" className="csa-toc-title">On this page</h2>
                <p className="csa-toc-sub">{Math.round(progress * 100)}% read</p>
              </div>
              <button ref={closeRef} type="button" className="csa-close" onClick={onClose} aria-label="Close sections">
                <X className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </div>
            <ol className="csa-toc-list">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`csa-toc-item ${i === index ? 'is-on' : ''} ${i < index ? 'is-read' : ''}`}
                    aria-current={i === index ? 'location' : undefined}
                    onClick={() => onJump(s.id)}
                  >
                    <span className="csa-toc-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="csa-toc-label">{cleanLabel(s.label)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Floating helper for every case study: a "Summarize" button that opens a short,
 * recruiter-friendly digest of the project, and on phones a dock that shows which
 * section is being read, with a sheet to jump between sections.
 */
export default function CaseStudyAssistant({ summary, sections, trackerFrom = 768, tone = 'light' }: Props) {
  const phone = useMedia('(max-width: 639px)')
  const belowTracker = useMedia(`(max-width: ${trackerFrom - 1}px)`)
  const withTracker = !!sections?.length && belowTracker
  const { index, progress, shown } = useReading(sections, phone)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const closeSummary = useCallback(() => setSummaryOpen(false), [])
  const closeToc = useCallback(() => setTocOpen(false), [])

  const jump = (id: string) => {
    setTocOpen(false)
    // Let the sheet release the scroll lock before moving the page
    window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: 'smooth' })
    }, 220)
  }

  const current = sections?.[index]
  const toneClass = tone === 'dark' ? 'is-dark' : ''

  return createPortal(
    <>
      <div className={`csa csa-dock-wrap ${toneClass} ${shown && !summaryOpen && !tocOpen ? 'is-shown' : ''} ${withTracker ? 'has-tracker' : ''}`}>
        {withTracker && current ? (
          <div className="csa-dock">
            <button
              type="button"
              className="csa-dock-section"
              onClick={() => setTocOpen(true)}
              aria-label={`Section ${index + 1} of ${sections!.length}: ${cleanLabel(current.label)}. Show all sections`}
            >
              <ProgressRing progress={progress} index={index} />
              <span className="csa-dock-text">
                <span className="csa-dock-kicker">{index + 1} of {sections!.length}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={current.id}
                    className="csa-dock-name"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    {cleanLabel(current.label)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <ChevronUp className="csa-dock-chev" aria-hidden="true" />
            </button>
            <span className="csa-dock-rule" aria-hidden="true" />
            <button type="button" className="csa-dock-summary" onClick={() => setSummaryOpen(true)}>
              <span className="csa-dock-mark"><AIMark /></span>
              Summary
            </button>
          </div>
        ) : (
          <button type="button" className="csa-pill" onClick={() => setSummaryOpen(true)}>
            <span className="csa-pill-mark"><AIMark /></span>
            <span className="csa-pill-text">Summarize</span>
          </button>
        )}
      </div>

      <SummaryDialog summary={summary} open={summaryOpen} onClose={closeSummary} sheet={phone} tone={tone} />
      {sections && (
        <SectionSheet
          sections={sections}
          index={index}
          progress={progress}
          open={tocOpen}
          onClose={closeToc}
          onJump={jump}
          tone={tone}
        />
      )}
    </>,
    document.body,
  )
}
