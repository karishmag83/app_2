import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { ArrowRight, Moon, Sun, X } from 'lucide-react'
import { THEMES, getTheme, type Origin, type ThemeId, type ThemeTokens } from '../theme/themes'
import { playEnter, playTick } from '../lib/sound'

interface ThemeSelectorProps {
  initialTheme: ThemeId
  initialDark: boolean
  isFirstRun: boolean
  onCommit: (theme: ThemeId, dark: boolean, origin: Origin) => void
  onClose: () => void
}

function centerOf(el: Element | null): Origin {
  if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

export default function ThemeSelector({ initialTheme, initialDark, isFirstRun, onCommit, onClose }: ThemeSelectorProps) {
  const [themeId, setThemeId] = useState<ThemeId>(initialTheme)
  const [dark, setDark] = useState(initialDark)
  const [leaving, setLeaving] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const swatchRefs = useRef<Partial<Record<ThemeId, HTMLButtonElement | null>>>({})

  const theme = getTheme(themeId)
  const t = dark ? theme.dark : theme.light

  // Lock page scroll and move focus into the dialog while it is open.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus({ preventScroll: true })
    return () => { document.body.style.overflow = prev }
  }, [])

  const commit = () => {
    playEnter()
    onCommit(themeId, dark, centerOf(ctaRef.current))
  }

  const chooseTheme = (id: ThemeId) => {
    if (id !== themeId) playTick()
    setThemeId(id)
  }

  const chooseAppearance = (value: boolean) => {
    if (value !== dark) playTick(0.8)
    setDark(value)
  }

  const close = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(onClose, 320)
  }

  const moveSelection = (delta: number) => {
    const i = THEMES.findIndex(x => x.id === themeId)
    const next = THEMES[(i + delta + THEMES.length) % THEMES.length].id
    chooseTheme(next)
    swatchRefs.current[next]?.focus()
  }

  const onSwatchKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); moveSelection(1) }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); moveSelection(-1) }
  }

  const onDialogKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); close() }
    if (e.key === 'Enter' && e.target === dialogRef.current) { e.preventDefault(); commit() }
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ts-title"
      tabIndex={-1}
      onKeyDown={onDialogKey}
      className={`theme-selector ts-morph fixed inset-0 z-[100] overflow-y-auto outline-none ${leaving ? 'ts-leave' : 'ts-enter'}`}
      style={{ backgroundColor: t.bg, color: t.text, '--ts-surface': t.surface, '--ts-border': t.border } as CSSProperties}
    >
      {/* Ambient light: two soft orbs tinted by the current finish */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ts-orb ts-orb-a" style={{ backgroundColor: theme.swatch[0] }} />
        <div className="ts-orb ts-orb-b" style={{ backgroundColor: theme.swatch[1] }} />
        <div className="absolute inset-0 ts-grain" />
      </div>

      {/* Phones and tablets: one screen, preview above and a control sheet below (no scrolling).
          Desktop: copy and controls on the left, preview on the right. */}
      <div className="relative flex h-full flex-col lg:h-auto lg:min-h-full">
        <header className="flex shrink-0 items-center justify-between px-5 pt-4 sm:px-10 sm:pt-7">
          <span className="font-display text-xl font-bold tracking-tight">Karishma.</span>
          <button
            type="button"
            onClick={close}
            className="ts-ghost inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium"
            style={{ color: t.muted, backgroundColor: t.surface2, border: `1px solid ${t.border}` }}
            aria-label={isFirstRun ? 'Skip and use the default theme' : 'Close theme selector'}
          >
            {isFirstRun ? 'Skip' : <><X className="h-4 w-4" aria-hidden="true" /> Close</>}
          </button>
        </header>

        <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:px-10 lg:py-10">
          {/* Controls: a bottom sheet on small screens */}
          <div className="ts-stagger ts-sheet order-2 shrink-0 px-5 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-5 sm:px-10 lg:order-1 lg:p-0">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] lg:mb-4 lg:text-xs" style={{ color: t.accent }}>
              Personalize your visit
            </p>
            <h2 id="ts-title" className="font-display text-[1.9rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Choose your finish.
            </h2>
            <p className="mt-4 hidden text-[17px] leading-relaxed lg:block" style={{ color: t.muted }}>
              Six palettes, each in light and dark. You can change it anytime.
            </p>

            {/* Swatches */}
            <div
              role="radiogroup"
              aria-label="Color finish"
              onKeyDown={onSwatchKey}
              className="mt-5 flex items-center justify-between gap-3 sm:justify-start sm:gap-3.5 lg:mt-10 lg:flex-wrap"
            >
              {THEMES.map(th => {
                const selected = th.id === themeId
                return (
                  <button
                    key={th.id}
                    ref={el => { swatchRefs.current[th.id] = el }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={`${th.name}: ${th.tagline}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => chooseTheme(th.id)}
                    className="ts-swatch relative h-11 w-11 shrink-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.45), rgba(255,255,255,0) 46%), linear-gradient(145deg, ${th.swatch[0]}, ${th.swatch[1]})`,
                      boxShadow: selected
                        ? `0 0 0 3px ${t.bg}, 0 0 0 4.5px ${t.text}, 0 8px 20px -6px ${th.swatch[1]}`
                        : `inset 0 0 0 1px rgba(255,255,255,0.18), 0 4px 12px -6px ${th.swatch[1]}`,
                      transform: selected ? 'scale(1.06)' : undefined,
                    }}
                  />
                )
              })}
            </div>

            <div className="mt-3.5 min-h-[2.6rem] lg:mt-5 lg:min-h-[3.25rem]" aria-live="polite">
              <div key={themeId} className="ts-name">
                <div className="text-base font-semibold tracking-tight lg:text-lg">{theme.name}</div>
                <div className="truncate text-[13px] lg:text-sm" style={{ color: t.subtle }}>{theme.tagline}</div>
              </div>
            </div>

            {/* Appearance and entry share one row */}
            <div className="mt-4 flex items-center gap-3 lg:mt-8 lg:gap-4">
              <div className="shrink-0">
                <div
                  role="radiogroup"
                  aria-label="Appearance"
                  className="relative inline-grid grid-cols-2 rounded-full p-1"
                  style={{ backgroundColor: t.surface2, border: `1px solid ${t.border}` }}
                >
                  <span
                    aria-hidden="true"
                    className="ts-seg-thumb absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full"
                    style={{
                      left: dark ? 'calc(50% + 0px)' : '4px',
                      backgroundColor: t.surface,
                      boxShadow: `0 1px 2px rgba(0,0,0,0.12), 0 4px 14px -6px rgba(0,0,0,0.25), inset 0 0 0 1px ${t.border}`,
                    }}
                  />
                  {[
                    { value: false, label: 'Light', Icon: Sun },
                    { value: true, label: 'Dark', Icon: Moon },
                  ].map(({ value, label, Icon }) => (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={dark === value}
                      aria-label={label}
                      onClick={() => chooseAppearance(value)}
                      className="relative z-[1] inline-flex h-10 items-center justify-center gap-2 rounded-full px-3.5 text-sm font-medium sm:px-5 lg:h-11"
                      style={{ color: dark === value ? t.text : t.subtle }}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 flex-1 lg:flex-none">
                <button
                  ref={ctaRef}
                  type="button"
                  onClick={commit}
                  className="ts-cta group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold lg:w-auto"
                  style={{
                    backgroundColor: t.accent,
                    color: t.onAccent,
                    boxShadow: `0 12px 32px -12px ${theme.swatch[1]}, inset 0 1px 0 rgba(255,255,255,0.18)`,
                  }}
                >
                  Enter portfolio
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </div>

          </div>

          {/* Live preview: fills the space above the sheet, scaled to fit */}
          <PreviewFit className="order-1 px-5 pb-4 pt-3 sm:px-10 lg:order-2 lg:p-0">
            <DesignCanvas t={t} />
          </PreviewFit>
        </main>
      </div>
    </div>
  )
}

/**
 * Below desktop the preview gets whatever height the screen leaves above the
 * control sheet, and scales down (never up) to fit it. On desktop it renders
 * at its natural size.
 */
function PreviewFit({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner || typeof ResizeObserver === 'undefined') return
    const desktop = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      if (desktop.matches) { setScale(1); return }
      const style = getComputedStyle(outer)
      const available = outer.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
      const natural = inner.offsetHeight
      setScale(natural > 0 && available > 0 ? Math.min(1, available / natural) : 1)
    }
    const observer = new ResizeObserver(update)
    observer.observe(outer)
    observer.observe(inner)
    desktop.addEventListener('change', update)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', update)
    }
  }, [])

  return (
    <div
      ref={outerRef}
      className={`flex min-h-0 flex-1 flex-col overflow-hidden lg:block lg:overflow-visible ${scale < 1 ? 'justify-start' : 'justify-center'} ${className}`}
    >
      <div ref={innerRef} style={scale < 1 ? { transform: `scale(${scale})`, transformOrigin: 'top center' } : undefined}>
        {children}
      </div>
    </div>
  )
}

/* ---------- Live preview: a design-tool canvas themed by the chosen finish ---------- */

const SELECTION = '#0d99ff'
const PREVIEW_PROJECTS = [
  { name: 'AI Care Navigator', image: '/project-ai-care.jpg' },
  { name: 'Folio Tracker', image: '/Folio_thumbnail.jpg' },
  { name: 'RePack Portal', image: '/Repack_thumbail.jpg' },
]

/**
 * A calm, live preview of the portfolio in the chosen finish. One quiet design
 * signature remains: the primary button is selected on the canvas, with
 * Karishma's cursor beside it.
 */
function DesignCanvas({ t }: { t: ThemeTokens }) {
  const hairline = `1px solid ${t.border}`

  return (
    <div className="ts-preview mx-auto w-full max-w-[560px]" aria-hidden="true">
      <div
        className="overflow-hidden rounded-[24px]"
        style={{
          backgroundColor: t.surface,
          border: hairline,
          boxShadow: '0 1px 1px rgba(0,0,0,0.04), 0 30px 70px -30px rgba(0,0,0,0.35)',
        }}
      >
        {/* Window bar */}
        <div className="flex h-11 items-center gap-3 px-4" style={{ borderBottom: hairline }}>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.surface2, boxShadow: `inset 0 0 0 1px ${t.border}` }} />
            ))}
          </div>
          <div className="mx-auto truncate text-[11px]" style={{ color: t.subtle }}>
            Portfolio <span className="px-0.5 opacity-60">/</span> <span className="font-semibold" style={{ color: t.text }}>Home</span>
          </div>
          <img src="/karishma-avatar.jpg" alt="" className="h-6 w-6 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px ${t.surface}, 0 0 0 3.5px ${t.accent}` }} />
        </div>

        {/* Page */}
        <div className="px-6 pb-6 pt-5 sm:px-8 sm:pb-8" style={{ backgroundColor: t.bg, color: t.text }}>
          <div className="flex items-center justify-between">
            <span className="font-display text-[13px] font-bold">Karishma.</span>
            <div className="flex gap-3 text-[9.5px]" style={{ color: t.muted }}>
              <span>Work</span><span>About</span><span>Contact</span>
            </div>
          </div>

          <div className="mt-7 font-display text-[22px] font-semibold leading-[1.1] tracking-tight sm:text-[28px]">
            Designing products<br />people trust.
          </div>
          <p className="mt-2.5 max-w-[300px] text-[10px] leading-relaxed sm:text-[11px]" style={{ color: t.muted }}>
            Research-led product design, accessible systems and AI experiences.
          </p>

          <div className="relative mt-5 flex items-center gap-2">
            <span className="relative rounded-full px-3.5 py-1.5 text-[10px] font-semibold" style={{ backgroundColor: t.accent, color: t.onAccent }}>
              View work →
              <span className="ts-sel" style={{ borderColor: SELECTION }}>
                {['tl', 'tr', 'bl', 'br'].map(c => <span key={c} className={`ts-handle ts-handle-${c}`} style={{ borderColor: SELECTION }} />)}
              </span>
              <span className="ts-cursor">
                <svg viewBox="0 0 16 16" className="h-4 w-4" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' }}>
                  <path d="M2 1.5 13.5 7 8 8.4 5.6 14z" fill={t.accent} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                <span className="ts-cursor-tag" style={{ backgroundColor: t.accent, color: t.onAccent }}>Karishma</span>
              </span>
            </span>
            <span className="rounded-full px-3.5 py-1.5 text-[10px] font-semibold" style={{ border: hairline, backgroundColor: t.surface, color: t.text }}>
              Résumé
            </span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2.5">
            {PREVIEW_PROJECTS.map(p => (
              <div key={p.name} className="overflow-hidden rounded-xl" style={{ backgroundColor: t.surface, boxShadow: `0 0 0 1px ${t.border}` }}>
                <img src={p.image} alt="" className="aspect-[4/3] w-full object-cover" decoding="async" />
                <div className="truncate px-2 py-1.5 text-[8.5px] font-semibold sm:text-[9.5px]">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
