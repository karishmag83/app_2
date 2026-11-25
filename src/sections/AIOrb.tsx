import { useEffect, useState } from 'react'

const NUDGE_KEY = 'ai-orb-nudged'

/** The Karishma's AI mark, shared by the launcher and the chat window. */
export function AIMark({ size }: { size?: number }) {
  return (
    <span className="ai-mark" style={size ? { width: size, height: size } : undefined} aria-hidden="true">
      <span className="ai-orb-ring" />
      <span className="ai-orb-core">
        <img src="/karishma-avatar.jpg" alt="" className="ai-orb-photo" decoding="async" />
      </span>
      <span className="ai-orb-badge">AI</span>
    </span>
  )
}

/**
 * Launcher for Karishma's AI. Its mark is her portrait inside a slowly turning
 * accent ring with a small "AI" tag: her face says whose assistant it is, the
 * ring and tag say it is an assistant. The label appears on hover or focus, and once per visit as a
 * gentle nudge, so the page stays uncluttered.
 */
export default function AIOrb({ hidden, onOpen }: { hidden: boolean; onOpen: () => void }) {
  const [nudge, setNudge] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === '1'
    } catch {
      /* storage unavailable */
    }
    if (seen) return
    const show = window.setTimeout(() => {
      setNudge(true)
      try {
        sessionStorage.setItem(NUDGE_KEY, '1')
      } catch {
        /* storage unavailable */
      }
    }, 6000)
    const hide = window.setTimeout(() => setNudge(false), 12000)
    return () => {
      window.clearTimeout(show)
      window.clearTimeout(hide)
    }
  }, [])

  const trackLight = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--lg-x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--lg-y', `${e.clientY - r.top}px`)
  }

  return (
    <div className={`ai-orb-wrap fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7 ${hidden ? 'is-hidden' : ''}`}>
      <span className={`ai-orb-label liquid-glass ${nudge && !hidden ? 'is-visible' : ''}`} aria-hidden="true">
        Ask Karishma's AI
      </span>
      <button
        type="button"
        className="ai-orb"
        onClick={() => {
          setNudge(false)
          onOpen()
        }}
        onPointerMove={trackLight}
        aria-label="Ask Karishma's AI"
        aria-haspopup="dialog"
        tabIndex={hidden ? -1 : 0}
      >
        <span className="ai-orb-glow" aria-hidden="true" />
        <AIMark />
      </button>
    </div>
  )
}
