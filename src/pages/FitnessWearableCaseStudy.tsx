import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/* ── Types ──────────────────────────────────────────────────────────────────── */
type AppTab    = 'today' | 'activity' | 'health' | 'workouts'
type HealthTab = 'heartrate' | 'sleep' | 'stress'

/* ── Case study page tokens (light, matching Hearth) ───────────────────────── */
const BG     = '#fafaf9'
const FG     = '#0a0a09'
const ACCENT = '#3B82F6'
const MUTED  = '#737373'
const BONE   = '#f0efec'
const CARD   = '#ffffff'
const BORDER = 'rgba(0,0,0,0.09)'
const HL     = `1px solid ${BORDER}`
const SERIF  = '"Playfair Display", Georgia, serif'
const MONO   = 'ui-monospace, "SF Mono", "Courier New", monospace'
const SANS   = '"Inter", system-ui, -apple-system, sans-serif'

/* ── App screen tokens (dark) ───────────────────────────────────────────────── */
const BLUE   = '#3B82F6'
const GREEN  = '#10B981'
const ORANGE = '#F59E0B'
const RED    = '#EF4444'
const PURPLE = '#8B5CF6'

/* ── Count-up hook ──────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration: number, started: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let t0: number | null = null
    const tick = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])
  return val
}

/* ── Shared layout helpers ──────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, margin: '0 0 18px' }}>{children}</p>
}
function Box({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', ...style }}>{children}</div>
}
function Sec({ id, bone, children }: { id?: string; bone?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ borderTop: HL, backgroundColor: bone ? BONE : 'transparent', padding: '80px 0', scrollMarginTop: 60 }}>
      <Box>{children}</Box>
    </section>
  )
}

/* ── Section nav (right side, Hearth-style) ─────────────────────────────────── */
const NAV_SECTIONS = [
  { id: 'hero',          label: 'Intro'            },
  { id: 'overview',      label: '01 Overview'      },
  { id: 'problem',       label: '02 Problem'       },
  { id: 'objectives',    label: '03 Objectives'    },
  { id: 'process',       label: '04 Process'       },
  { id: 'research',      label: '05 Research'      },
  { id: 'framework',     label: '06 Framework'     },
  { id: 'ia',            label: '07 Architecture'  },
  { id: 'wireframes',    label: '08 Wireframes'    },
  { id: 'onboarding',    label: '09 Onboarding'    },
  { id: 'accessibility', label: '10 Accessibility' },
  { id: 'final-design',  label: '11 Final Design'  },
  { id: 'prototype',     label: '12 Prototype'     },
  { id: 'results',       label: '13 Results'       },
  { id: 'reflection',    label: '14 Reflection'    },
]

function SectionNav({ active }: { active: string }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <nav style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 40, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
      {NAV_SECTIONS.map(s => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}
          >
            <span style={{
              fontFamily: MONO, fontSize: 9, color: isActive ? ACCENT : MUTED,
              opacity: isActive ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap',
              letterSpacing: '0.06em',
            }}>
              {s.label}
            </span>
            <div style={{
              width: isActive ? 20 : 6, height: 2, borderRadius: 2,
              backgroundColor: isActive ? ACCENT : BORDER,
              transition: 'all 0.25s ease', flexShrink: 0,
            }} />
          </button>
        )
      })}
    </nav>
  )
}

function useSectionObserver() {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    NAV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}

/* ════════════════════════════════════════════════════════════════════════════
   SVG ICONS
════════════════════════════════════════════════════════════════════════════ */
const HeartIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)
const MoonIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
  </svg>
)
const FlameIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z" />
  </svg>
)
const ZapIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
)


/* ════════════════════════════════════════════════════════════════════════════
   APP COMPONENTS
════════════════════════════════════════════════════════════════════════════ */

/* ── Activity Ring ─────────────────────────────────────────────────────────── */
const ActivityRing = ({
  progress, color, size, strokeWidth, children,
}: {
  progress: number; color: string; size: number; strokeWidth: number; children?: React.ReactNode
}) => {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * Math.min(progress, 1)
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>}
    </div>
  )
}

/* ── Sparkline ─────────────────────────────────────────────────────────────── */
const Sparkline = ({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) => {
  const min = Math.min(...data); const max = Math.max(...data); const range = max - min || 1
  const w = 100 / (data.length - 1)
  const points = data.map((v, i) => `${i * w},${height - ((v - min) / range) * height}`).join(' ')
  const area = `0,${height} ` + data.map((v, i) => `${i * w},${height - ((v - min) / range) * height}`).join(' ') + ` ${(data.length - 1) * w},${height}`
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
      <polygon points={area} fill={`${color}20`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Shared micro-components ───────────────────────────────────────────────── */
const AppLabel = ({ children, color = 'rgba(255,255,255,0.45)' }: { children: React.ReactNode; color?: string }) => (
  <p style={{ fontSize: 8, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color, margin: 0 }}>{children}</p>
)
const AppVal = ({ children, size = 22, color = '#fff' }: { children: React.ReactNode; size?: number; color?: string }) => (
  <p style={{ fontSize: size, fontWeight: 700, color, lineHeight: 1, margin: 0 }}>{children}</p>
)
const AppCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ borderRadius: 16, padding: '12px 14px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', ...style }}>
    {children}
  </div>
)

/* ── Today Screen ──────────────────────────────────────────────────────────── */
const TodayScreen = () => {
  const stepPct = 8432 / 10000
  const rings = [
    { label: 'Move',     val: 847, max: 900,  unit: 'cal', pct: 847/900,  color: '#EF4444' },
    { label: 'Exercise', val: 32,  max: 30,   unit: 'min', pct: 1,        color: '#10B981' },
    { label: 'Stand',    val: 10,  max: 12,   unit: 'hrs', pct: 10/12,    color: '#3B82F6' },
  ]
  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
      {/* greeting */}
      <div style={{ padding: '4px 14px 10px' }}>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', margin: '0 0 1px' }}>Saturday, Apr 19</p>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>Good morning, Karishma</p>
      </div>

      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 16 }}>

        {/* Step ring + progress */}
        <AppCard style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ActivityRing progress={stepPct} color={BLUE} size={76} strokeWidth={8}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1 }}>84%</p>
            </div>
          </ActivityRing>
          <div style={{ flex: 1 }}>
            <AppLabel>Daily Steps</AppLabel>
            <AppVal size={26} color={BLUE}>8,432</AppVal>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', margin: '2px 0 6px' }}>Goal: 10,000 steps</p>
            <div style={{ height: 5, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ width: `${stepPct * 100}%`, height: '100%', backgroundColor: BLUE, borderRadius: 99 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', margin: 0 }}>1,568 to goal</p>
              <p style={{ fontSize: 8, color: BLUE, fontWeight: 600, margin: 0 }}>3.8 mi</p>
            </div>
          </div>
        </AppCard>

        {/* Activity rings row */}
        <AppCard style={{ padding: '12px 14px' }}>
          <AppLabel>Activity Rings</AppLabel>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
            {rings.map(r => (
              <div key={r.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <ActivityRing progress={r.pct} color={r.color} size={48} strokeWidth={6}>
                  <p style={{ fontSize: r.pct >= 1 ? 10 : 9, fontWeight: 700, color: '#fff', margin: 0 }}>{r.pct >= 1 ? '✓' : `${Math.round(r.pct*100)}%`}</p>
                </ActivityRing>
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{r.label}</p>
                <p style={{ fontSize: 9, color: r.color, fontWeight: 600, margin: 0 }}>{r.val} {r.unit}</p>
              </div>
            ))}
          </div>
        </AppCard>

        {/* 2×2 metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { icon: <HeartIcon size={11} color={GREEN} />, label: 'Heart Rate', value: '72', unit: 'BPM',   color: GREEN,  bg: `${GREEN}12`,  border: `${GREEN}28`  },
            { icon: <MoonIcon  size={11} />,               label: 'Sleep',      value: '7h 23m', unit: 'last night', color: BLUE, bg: `${BLUE}12`, border: `${BLUE}28` },
            { icon: <FlameIcon size={11} />,               label: 'Calories',   value: '1,847',  unit: 'kcal burned', color: ORANGE, bg: `${ORANGE}12`, border: `${ORANGE}28` },
            { icon: <ZapIcon   size={11} />,               label: 'Recovery',   value: '78',     unit: '/ 100',  color: PURPLE, bg: `${PURPLE}12`, border: `${PURPLE}28` },
          ].map(m => (
            <div key={m.label} style={{ borderRadius: 14, padding: '10px 12px', backgroundColor: m.bg, border: `1px solid ${m.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                <span style={{ color: m.color }}>{m.icon}</span>
                <AppLabel color={m.color}>{m.label}</AppLabel>
              </div>
              <AppVal size={18}>{m.value}</AppVal>
              <p style={{ fontSize: 8, color: m.color, margin: '2px 0 0', opacity: 0.8 }}>{m.unit}</p>
            </div>
          ))}
        </div>

        {/* Insight card */}
        <div style={{ borderRadius: 16, padding: '14px', background: `linear-gradient(135deg, ${BLUE}28 0%, ${GREEN}18 100%)`, border: `1px solid ${BLUE}38` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 12 }}>&#128161;</span>
            <AppLabel color={BLUE}>Today's Insight</AppLabel>
          </div>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: '0 0 4px', lineHeight: 1.45 }}>
            Well-rested. Good day for a hard workout.
          </p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
            Recovery 78 · HRV 52ms · Sleep score 82
          </p>
        </div>

        {/* Weekly summary strip */}
        <AppCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <AppLabel>This week</AppLabel>
            <p style={{ fontSize: 9, color: BLUE, fontWeight: 600, margin: 0 }}>5 of 7 days active</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 36 }}>
            {[72, 88, 60, 84, 95, 54, 84].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: '100%', height: (v / 100) * 28, backgroundColor: i === 6 ? BLUE : i === 4 ? GREEN : v > 70 ? `${BLUE}55` : `rgba(255,255,255,0.12)`, borderRadius: '3px 3px 0 0' }} />
                <p style={{ fontSize: 7, color: i === 6 ? BLUE : 'rgba(255,255,255,0.3)', margin: 0 }}>
                  {['M','T','W','T','F','S','S'][i]}
                </p>
              </div>
            ))}
          </div>
        </AppCard>

        {/* Notification / next action */}
        <div style={{ borderRadius: 14, padding: '11px 13px', backgroundColor: `${ORANGE}14`, border: `1px solid ${ORANGE}30`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>&#9202;</span>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: '#fff', margin: '0 0 1px' }}>Hydration reminder</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', margin: 0 }}>You're 600ml short of your daily goal</p>
          </div>
        </div>

      </div>
    </div>
  )
}

/* ── Activity Screen ───────────────────────────────────────────────────────── */
const ActivityScreen = () => {
  const stepData = [7200, 9100, 6800, 8432, 10200, 5400, 8432]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const maxSteps = Math.max(...stepData)
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '4px 14px 10px' }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>Activity</p>
      </div>
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 16 }}>

        {/* Active minutes + streak */}
        <AppCard style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ActivityRing progress={124 / 150} color={GREEN} size={76} strokeWidth={8}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1 }}>124</p>
              <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', margin: 0 }}>min</p>
            </div>
          </ActivityRing>
          <div style={{ flex: 1 }}>
            <AppLabel>Active Minutes</AppLabel>
            <AppVal size={22} color={GREEN}>124 / 150</AppVal>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', margin: '3px 0 8px' }}>26 min to weekly goal</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>&#128293;</span>
              <p style={{ fontSize: 11, color: '#fff', fontWeight: 700, margin: 0 }}>12-day streak</p>
            </div>
          </div>
        </AppCard>

        {/* 7-day step chart */}
        <AppCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <AppLabel>7-Day Steps</AppLabel>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', margin: 0 }}>Avg 7,938/day</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56 }}>
            {stepData.map((val, i) => {
              const isToday = i === 6
              const isGoal = val >= 10000
              const barH = (val / maxSteps) * 44
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  {isGoal && <p style={{ fontSize: 6, color: GREEN, margin: 0, fontWeight: 700 }}>✓</p>}
                  {!isGoal && <p style={{ fontSize: 6, color: 'transparent', margin: 0 }}>·</p>}
                  <div style={{ width: '100%', height: barH, backgroundColor: isToday ? BLUE : isGoal ? `${GREEN}70` : `${BLUE}38`, borderRadius: '4px 4px 0 0' }} />
                  <p style={{ fontSize: 7, color: isToday ? BLUE : 'rgba(255,255,255,0.3)', margin: 0, fontWeight: isToday ? 700 : 400 }}>{days[i]}</p>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', margin: 0 }}>0</p>
            <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', margin: 0 }}>10k goal</p>
          </div>
        </AppCard>

        {/* Rings today */}
        <AppCard>
          <AppLabel>Rings Today</AppLabel>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
            {[
              { label: 'Move',     val: '847', unit: 'cal', pct: 847/900,  color: RED   },
              { label: 'Exercise', val: '32',  unit: 'min', pct: 1,        color: GREEN },
              { label: 'Stand',    val: '10',  unit: 'hrs', pct: 10/12,    color: BLUE  },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <ActivityRing progress={r.pct} color={r.color} size={52} strokeWidth={6}>
                  <p style={{ fontSize: r.pct >= 1 ? 11 : 9, fontWeight: 700, color: '#fff', margin: 0 }}>
                    {r.pct >= 1 ? '✓' : `${Math.round(r.pct*100)}%`}
                  </p>
                </ActivityRing>
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{r.label}</p>
                <p style={{ fontSize: 10, color: r.color, fontWeight: 600, margin: 0 }}>{r.val} {r.unit}</p>
              </div>
            ))}
          </div>
        </AppCard>

        {/* Distance + floors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'Distance', value: '3.8', unit: 'miles today', color: BLUE   },
            { label: 'Floors',   value: '14',  unit: 'climbed',     color: ORANGE },
          ].map(s => (
            <AppCard key={s.label}>
              <AppLabel>{s.label}</AppLabel>
              <AppVal size={22} color={s.color}>{s.value}</AppVal>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>{s.unit}</p>
            </AppCard>
          ))}
        </div>

        {/* Pace card */}
        <AppCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <AppLabel>Avg Pace Today</AppLabel>
              <AppVal size={24} color="#fff">12'34"</AppVal>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>per mile</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <AppLabel>Best Mile</AppLabel>
              <AppVal size={18} color={GREEN}>10'22"</AppVal>
              <p style={{ fontSize: 9, color: GREEN, margin: '2px 0 0', fontWeight: 600 }}>Personal best ↑</p>
            </div>
          </div>
        </AppCard>

      </div>
    </div>
  )
}

/* ── Health Screen ─────────────────────────────────────────────────────────── */
const HealthScreen = ({ healthTab, setHealthTab }: { healthTab: HealthTab; setHealthTab: (t: HealthTab) => void }) => {
  const hrData    = [68, 72, 75, 70, 88, 102, 85, 74, 68, 71, 73, 76, 72, 69, 74, 78, 82, 77, 73, 70, 72, 74, 71, 72]
  const sleepData = [
    { awake: 8, light: 35, deep: 22, rem: 20 }, { awake: 12, light: 40, deep: 18, rem: 15 },
    { awake: 6, light: 32, deep: 25, rem: 22 }, { awake: 10, light: 38, deep: 20, rem: 18 },
    { awake: 5, light: 30, deep: 28, rem: 24 }, { awake: 8, light: 36, deep: 21, rem: 19 },
    { awake: 7, light: 33, deep: 24, rem: 20 },
  ]
  const sleepDays  = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const stressData = [42, 38, 55, 62, 48, 35, 40, 38, 44, 50, 58, 52, 45, 38, 42, 46, 40, 36, 42, 48, 44, 38, 40, 36]

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '4px 14px 10px' }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>Health</p>
      </div>

      {/* Sub-tab selector */}
      <div style={{ margin: '0 12px 10px', display: 'flex', borderRadius: 12, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {([
          { id: 'heartrate' as HealthTab, label: 'Heart Rate' },
          { id: 'sleep'     as HealthTab, label: 'Sleep'      },
          { id: 'stress'    as HealthTab, label: 'Stress'     },
        ]).map(t => (
          <button key={t.id} onClick={() => setHealthTab(t.id)}
            style={{ flex: 1, padding: '8px 4px', fontSize: 9, fontWeight: 600,
              backgroundColor: healthTab === t.id ? BLUE : 'transparent',
              color: healthTab === t.id ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', borderRadius: 10 }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 12px', paddingBottom: 16 }}>
        <AnimatePresence mode="wait">

          {healthTab === 'heartrate' && (
            <motion.div key="hr" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Current BPM */}
              <AppCard style={{ backgroundColor: `${RED}14`, border: `1px solid ${RED}28` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <AppLabel color="rgba(255,255,255,0.5)">Current BPM</AppLabel>
                  <HeartIcon size={12} color={RED} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
                  <AppVal size={36}>72</AppVal>
                  <p style={{ fontSize: 11, color: GREEN, fontWeight: 600, marginBottom: 6 }}>Normal</p>
                </div>
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', margin: '0 0 8px' }}>Resting · Updated now · Min 54 · Max 108</p>
                <Sparkline data={hrData} color={RED} height={38} />
                <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>Last 24 hours</p>
              </AppCard>
              {/* Zones */}
              <AppCard>
                <AppLabel>Heart Rate Zones — today</AppLabel>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[
                    { label: 'Resting',  range: '50–60',   pct: 42, color: BLUE,   hrs: '10.1h' },
                    { label: 'Fat Burn', range: '60–100',  pct: 35, color: GREEN,  hrs: '8.4h'  },
                    { label: 'Cardio',   range: '100–140', pct: 18, color: ORANGE, hrs: '4.3h'  },
                    { label: 'Peak',     range: '140+',    pct: 5,  color: RED,    hrs: '1.2h'  },
                  ].map(z => (
                    <div key={z.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, width: 64, flexShrink: 0 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: z.color, flexShrink: 0 }} />
                        <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{z.label}</p>
                      </div>
                      <div style={{ flex: 1, height: 6, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{ width: `${z.pct}%`, height: '100%', backgroundColor: z.color, borderRadius: 99 }} />
                      </div>
                      <p style={{ fontSize: 8, color: z.color, fontWeight: 600, margin: 0, width: 28, textAlign: 'right' }}>{z.hrs}</p>
                    </div>
                  ))}
                </div>
              </AppCard>
              {/* HRV */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'HRV', value: '52', unit: 'ms · good', color: GREEN },
                  { label: 'Resting HR', value: '54', unit: 'BPM · low', color: BLUE },
                ].map(s => (
                  <AppCard key={s.label}>
                    <AppLabel>{s.label}</AppLabel>
                    <AppVal size={20} color={s.color}>{s.value}</AppVal>
                    <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>{s.unit}</p>
                  </AppCard>
                ))}
              </div>
            </motion.div>
          )}

          {healthTab === 'sleep' && (
            <motion.div key="sleep" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Score header */}
              <AppCard style={{ backgroundColor: `${BLUE}14`, border: `1px solid ${BLUE}28` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <AppLabel color="rgba(255,255,255,0.5)">Last Night</AppLabel>
                    <AppVal size={28}>7h 23m</AppVal>
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>10:42 PM – 6:05 AM</p>
                  </div>
                  <div style={{ textAlign: 'center', backgroundColor: `${BLUE}30`, borderRadius: 12, padding: '8px 12px' }}>
                    <AppVal size={26} color={BLUE}>82</AppVal>
                    <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', margin: '2px 0 0' }}>Score</p>
                  </div>
                </div>
                {/* Stage breakdown bar */}
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', margin: '0 0 5px' }}>Sleep stages — last 7 nights</p>
                <div style={{ display: 'flex', gap: 3 }}>
                  {sleepData.map((d, i) => {
                    const total = d.awake + d.light + d.deep + d.rem
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 48, gap: 1 }}>
                        <div style={{ flex: d.awake / total, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '2px 2px 0 0' }} />
                        <div style={{ flex: d.light / total, backgroundColor: `${BLUE}55` }} />
                        <div style={{ flex: d.deep  / total, backgroundColor: BLUE }} />
                        <div style={{ flex: d.rem   / total, backgroundColor: PURPLE, borderRadius: '0 0 2px 2px' }} />
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  {sleepDays.map(d => <p key={d} style={{ fontSize: 6, color: 'rgba(255,255,255,0.28)', margin: 0 }}>{d}</p>)}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Awake', color: 'rgba(255,255,255,0.25)' },
                    { label: 'Light', color: `${BLUE}80` },
                    { label: 'Deep',  color: BLUE   },
                    { label: 'REM',   color: PURPLE },
                  ].map(l => (
                    <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 2, backgroundColor: l.color }} />
                      <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{l.label}</p>
                    </div>
                  ))}
                </div>
              </AppCard>
              {/* Stage durations */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Deep Sleep',  value: '1h 28m', color: BLUE,   tip: 'Above avg' },
                  { label: 'REM',         value: '1h 22m', color: PURPLE, tip: 'On target'  },
                  { label: 'Light Sleep', value: '4h 10m', color: `${BLUE}70`, tip: 'Normal'   },
                  { label: 'Awake',       value: '23m',    color: 'rgba(255,255,255,0.4)', tip: 'Low' },
                ].map(s => (
                  <AppCard key={s.label}>
                    <AppLabel>{s.label}</AppLabel>
                    <AppVal size={16} color={s.color}>{s.value}</AppVal>
                    <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', margin: '2px 0 0' }}>{s.tip}</p>
                  </AppCard>
                ))}
              </div>
            </motion.div>
          )}

          {healthTab === 'stress' && (
            <motion.div key="stress" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Stress level */}
              <AppCard style={{ backgroundColor: `${PURPLE}14`, border: `1px solid ${PURPLE}28` }}>
                <AppLabel color="rgba(255,255,255,0.5)">Stress Level — Now</AppLabel>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, margin: '4px 0 6px' }}>
                  <AppVal size={36}>38</AppVal>
                  <p style={{ fontSize: 12, color: GREEN, fontWeight: 700, marginBottom: 5 }}>Low</p>
                </div>
                <Sparkline data={stressData} color={PURPLE} height={42} />
                <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>Last 24 hours · Measured via HRV</p>
              </AppCard>
              {/* Stress zones */}
              <AppCard>
                <AppLabel>Stress zones today</AppLabel>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Rest',   hours: '6.2h', pct: 26, color: GREEN  },
                    { label: 'Low',    hours: '9.1h', pct: 38, color: BLUE   },
                    { label: 'Medium', hours: '6.8h', pct: 28, color: ORANGE },
                    { label: 'High',   hours: '1.9h', pct: 8,  color: RED    },
                  ].map(z => (
                    <div key={z.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, width: 52, flexShrink: 0 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: z.color }} />
                        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{z.label}</p>
                      </div>
                      <div style={{ flex: 1, height: 6, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{ width: `${z.pct}%`, height: '100%', backgroundColor: z.color, borderRadius: 99 }} />
                      </div>
                      <p style={{ fontSize: 9, color: z.color, fontWeight: 600, margin: 0, width: 28, textAlign: 'right' }}>{z.hours}</p>
                    </div>
                  ))}
                </div>
              </AppCard>
              {/* Recovery readiness */}
              <AppCard style={{ background: `linear-gradient(135deg, ${GREEN}18, ${BLUE}14)`, border: `1px solid ${GREEN}28` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <span style={{ fontSize: 12 }}>&#129304;</span>
                  <AppLabel color={GREEN}>Recovery readiness</AppLabel>
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', margin: '0 0 3px', lineHeight: 1.45 }}>
                  Low stress + good HRV. Your body is ready to perform today.
                </p>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', margin: 0 }}>HRV 52ms · Resting HR 54 BPM</p>
              </AppCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Workouts Screen ───────────────────────────────────────────────────────── */
const WorkoutsScreen = () => {
  const [activeWorkoutType, setActiveWorkoutType] = useState<string | null>(null)
  const types = [
    { label: 'Run',   icon: '&#127939;', color: GREEN  },
    { label: 'Cycle', icon: '&#128692;', color: BLUE   },
    { label: 'Lift',  icon: '&#127947;', color: ORANGE },
    { label: 'HIIT',  icon: '&#9889;',   color: RED    },
    { label: 'Yoga',  icon: '&#129510;', color: PURPLE },
  ]
  const recentWorkouts = [
    { name: 'Morning Run',       icon: '&#127939;', dist: '5.2 km', dur: '28:14', cal: '312', date: 'Yesterday', color: GREEN,  bpm: '142 avg', pace: "10'32\"" },
    { name: 'Strength Training', icon: '&#127947;', dist: '',        dur: '45:02', cal: '280', date: 'Thu',       color: ORANGE, bpm: '128 avg', pace: '' },
    { name: 'HIIT Session',      icon: '&#9889;',   dist: '',        dur: '22:30', cal: '198', date: 'Wed',       color: RED,    bpm: '162 avg', pace: '' },
    { name: 'Evening Ride',      icon: '&#128692;', dist: '18.4 km', dur: '52:08', cal: '445', date: 'Tue',       color: BLUE,   bpm: '138 avg', pace: "17.2 km/h" },
  ]
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '4px 14px 10px' }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>Workouts</p>
      </div>
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 16 }}>

        {/* Start CTA */}
        <button
          style={{ borderRadius: 18, padding: '16px 14px', background: `linear-gradient(135deg, ${BLUE} 0%, ${GREEN} 100%)`, border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, boxShadow: `0 8px 24px ${BLUE}40` }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20 }}>&#9654;</span>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>Start Workout</p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', margin: 0 }}>GPS ready · HR 72 BPM · {activeWorkoutType ?? 'Choose type below'}</p>
        </button>

        {/* Quick-type selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {types.map(w => (
            <button key={w.label}
              onClick={() => setActiveWorkoutType(activeWorkoutType === w.label ? null : w.label)}
              style={{ borderRadius: 12, padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                backgroundColor: activeWorkoutType === w.label ? `${w.color}28` : 'rgba(255,255,255,0.07)',
                border: `1px solid ${activeWorkoutType === w.label ? `${w.color}60` : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer', transition: 'all 0.15s' }}>
              <span style={{ fontSize: 16 }} dangerouslySetInnerHTML={{ __html: w.icon }} />
              <p style={{ fontSize: 7, color: activeWorkoutType === w.label ? w.color : 'rgba(255,255,255,0.55)', margin: 0, fontWeight: activeWorkoutType === w.label ? 700 : 400 }}>{w.label}</p>
            </button>
          ))}
        </div>

        {/* Weekly summary */}
        <AppCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <AppLabel>This week</AppLabel>
            <p style={{ fontSize: 9, color: GREEN, fontWeight: 600, margin: 0 }}>4 workouts</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { label: 'Total Time', value: '2h 28m', color: BLUE   },
              { label: 'Calories',   value: '1,235',  color: ORANGE },
              { label: 'Avg HR',     value: '143 BPM', color: RED   },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <AppVal size={14} color={s.color}>{s.value}</AppVal>
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </AppCard>

        {/* Recent workouts */}
        <div>
          <AppLabel>Recent</AppLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {recentWorkouts.map(w => (
              <div key={w.name} style={{ borderRadius: 16, padding: '12px 13px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${w.color}20`, border: `1px solid ${w.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}
                    dangerouslySetInnerHTML={{ __html: w.icon }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', margin: 0 }}>{w.name}</p>
                    <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>{w.date} · {w.dur} · {w.cal} cal</p>
                  </div>
                  {w.dist && <p style={{ fontSize: 11, color: w.color, fontWeight: 700, margin: 0, flexShrink: 0 }}>{w.dist}</p>}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', margin: '0 0 1px' }}>AVG HR</p>
                    <p style={{ fontSize: 9, color: RED, fontWeight: 600, margin: 0 }}>{w.bpm}</p>
                  </div>
                  {w.pace && <div>
                    <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', margin: '0 0 1px' }}>PACE</p>
                    <p style={{ fontSize: 9, color: w.color, fontWeight: 600, margin: 0 }}>{w.pace}</p>
                  </div>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

/* ── Phone frame (Hearth-style, dark inside) ───────────────────────────────── */
function PPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', margin: '0 auto', width: '100%', maxWidth: 360 }}>
      <div style={{ borderRadius: 48, backgroundColor: '#0C1829', padding: 10, boxShadow: '0 48px 96px -24px rgba(0,0,0,0.7), 0 0 60px #3B82F615' }}>
        <div style={{ borderRadius: 38, overflow: 'hidden', backgroundColor: '#060D1A', height: 740, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 30, width: 108, height: 22, borderRadius: 11, backgroundColor: '#000' }} />
          <div style={{ height: '100%', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Dark status bar ───────────────────────────────────────────────────────── */
function PStatus() {
  return (
    <div style={{ padding: '12px 28px 4px', display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: SANS, fontWeight: 500, color: 'rgba(255,255,255,0.85)', flexShrink: 0 }}>
      <span>9:41</span>
      <span style={{ opacity: 0.6 }}>&#9679;&#9679;&#9679;&#9679; 5G &#9646;</span>
    </div>
  )
}

/* ── Tab bar (pill style, dark) ────────────────────────────────────────────── */
function PTabBar({ active, onChange }: { active: AppTab; onChange: (t: AppTab) => void }) {
  const tabs: { id: AppTab; label: string }[] = [
    { id: 'today',    label: 'Today'    },
    { id: 'activity', label: 'Activity' },
    { id: 'health',   label: 'Health'   },
    { id: 'workouts', label: 'Workouts' },
  ]
  return (
    <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(6,13,26,0.97)', padding: '8px 0 14px', flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: t.id === active ? 20 : 5, height: 3, borderRadius: 1.5, backgroundColor: t.id === active ? BLUE : 'rgba(255,255,255,0.15)', transition: 'width 0.2s' }} />
          <span style={{ fontFamily: SANS, fontSize: 9, color: t.id === active ? BLUE : 'rgba(255,255,255,0.35)', fontWeight: t.id === active ? 700 : 400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ── Full interactive prototype ────────────────────────────────────────────── */
function PhoneMockup() {
  const [activeTab, setActiveTab] = useState<AppTab>('today')
  const [healthTab, setHealthTab] = useState<HealthTab>('heartrate')
  return (
    <PPhoneFrame>
      <PStatus />
      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }} style={{ height: '100%' }}>
            {activeTab === 'today'    && <TodayScreen />}
            {activeTab === 'activity' && <ActivityScreen />}
            {activeTab === 'health'   && <HealthScreen healthTab={healthTab} setHealthTab={setHealthTab} />}
            {activeTab === 'workouts' && <WorkoutsScreen />}
          </motion.div>
        </AnimatePresence>
      </div>
      <PTabBar active={activeTab} onChange={setActiveTab} />
    </PPhoneFrame>
  )
}

/* ── Wireframe card — realistic Figma-style annotated wireframes ─────────── */
function PWireframe({ variant }: { variant: string }) {
  const paper  = '#faf9f7'
  const line   = '#c9c5be'
  const block  = '#e2dfd9'
  const dark   = '#a8a39a'
  const acc    = '#3B82F6'
  const red    = '#EF4444'
  const note   = '#FEF3C7'

  /* shared helpers */
  const Anno = ({ x, y, w, text }: { x: number; y: number; w: number; text: string }) => (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={acc} strokeWidth="0.8" strokeDasharray="2,1.5"/>
      <circle cx={x} cy={y} r="1.5" fill={acc}/>
      <rect x={x + w + 2} y={y - 5} width={text.length * 4.2} height="9" rx="2" fill={`${acc}18`}/>
      <text x={x + w + 4} y={y + 2} fontFamily="ui-monospace,monospace" fontSize="5.5" fill={acc}>{text}</text>
    </g>
  )
  const Sticky = ({ x, y, w, h, text }: { x: number; y: number; w: number; h: number; text: string }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill={note} stroke="#F59E0B" strokeWidth="0.6"/>
      <text x={x + 3} y={y + 8} fontFamily="ui-monospace,monospace" fontSize="5" fill="#92400E">{text}</text>
    </g>
  )

  if (variant === 'today-lofi') return (
    <svg width="100%" height="100%" viewBox="0 0 280 200" fontFamily="system-ui,sans-serif">
      <rect width="280" height="200" fill={paper}/>
      {/* phone outline */}
      <rect x="18" y="8" width="110" height="184" rx="14" fill="none" stroke={line} strokeWidth="1.2"/>
      {/* status bar */}
      <rect x="28" y="16" width="20" height="4" rx="1" fill={block}/>
      <rect x="88" y="16" width="30" height="4" rx="1" fill={block}/>
      {/* dynamic island */}
      <rect x="58" y="14" width="22" height="7" rx="3.5" fill={dark}/>
      {/* greeting block */}
      <rect x="28" y="28" width="45" height="5" rx="1.5" fill={block}/>
      <rect x="28" y="36" width="75" height="9" rx="2" fill={dark} opacity="0.5"/>
      {/* step ring card — no detail, just boxy */}
      <rect x="28" y="52" width="90" height="44" rx="8" fill={block} stroke={line} strokeWidth="0.7"/>
      <circle cx="50" cy="74" r="14" fill="none" stroke={dark} strokeWidth="4"/>
      <rect x="70" y="64" width="36" height="5" rx="1.5" fill={dark} opacity="0.4"/>
      <rect x="70" y="72" width="44" height="8" rx="2" fill={dark} opacity="0.55"/>
      <rect x="70" y="83" width="30" height="4" rx="1" fill={block}/>
      {/* 2×2 metric placeholders */}
      <rect x="28" y="102" width="42" height="34" rx="6" fill={block} stroke={line} strokeWidth="0.7"/>
      <rect x="76" y="102" width="42" height="34" rx="6" fill={block} stroke={line} strokeWidth="0.7"/>
      <rect x="28" y="141" width="42" height="34" rx="6" fill={block} stroke={line} strokeWidth="0.7"/>
      <rect x="76" y="141" width="42" height="34" rx="6" fill={block} stroke={line} strokeWidth="0.7"/>
      {/* label marks inside cards */}
      {[{x:34,y:115},{x:82,y:115},{x:34,y:154},{x:82,y:154}].map((p,i)=>(
        <g key={i}><rect x={p.x} y={p.y} width="20" height="4" rx="1" fill={dark} opacity="0.35"/>
        <rect x={p.x} y={p.y+8} width="28" height="7" rx="1.5" fill={dark} opacity="0.5"/></g>
      ))}
      {/* insight banner placeholder */}
      <rect x="28" y="180" width="90" height="5" rx="1.5" fill={dark} opacity="0.25"/>

      {/* annotation callouts */}
      <Anno x={132} y={74} w={18} text="ring: progress"/>
      <Anno x={132} y={119} w={18} text="metric cards ×4"/>
      <Anno x={132} y={162} w={18} text="— no insight yet"/>

      {/* sticky note */}
      <Sticky x={142} y={14} w={72} h={36} text="v1 — raw numbers"/>
      <text x={142} y={28} fontFamily="ui-monospace,monospace" fontSize="5" fill="#92400E">no benchmarks, no</text>
      <text x={142} y={36} fontFamily="ui-monospace,monospace" fontSize="5" fill="#92400E">action prompt</text>

      {/* red X marks on problem areas */}
      <line x1="34" y1="60" x2="40" y2="66" stroke={red} strokeWidth="0.9"/>
      <line x1="40" y1="60" x2="34" y2="66" stroke={red} strokeWidth="0.9"/>
    </svg>
  )

  if (variant === 'today-hifi') return (
    <svg width="100%" height="100%" viewBox="0 0 280 200" fontFamily="system-ui,sans-serif">
      <rect width="280" height="200" fill={paper}/>
      {/* phone */}
      <rect x="18" y="8" width="110" height="184" rx="14" fill="none" stroke={line} strokeWidth="1.2"/>
      <rect x="58" y="14" width="22" height="7" rx="3.5" fill={dark}/>
      {/* greeting */}
      <rect x="28" y="28" width="38" height="4" rx="1" fill={`${acc}40`}/>
      <rect x="28" y="35" width="78" height="8" rx="2" fill={dark} opacity="0.5"/>
      {/* step card — styled */}
      <rect x="28" y="50" width="90" height="44" rx="10" fill="#fff" stroke={`${acc}50`} strokeWidth="0.9"/>
      <circle cx="50" cy="72" r="14" fill="none" stroke={`${acc}25`} strokeWidth="5"/>
      <circle cx="50" cy="72" r="14" fill="none" stroke={acc} strokeWidth="5"
        strokeDasharray="72 88" strokeLinecap="round" transform="rotate(-90 50 72)"/>
      <text x="50" y="75" textAnchor="middle" fontSize="7" fontWeight="700" fill={acc}>84%</text>
      <rect x="68" y="60" width="36" height="5" rx="1.5" fill={dark} opacity="0.4"/>
      <text x="68" y="76" fontSize="10" fontWeight="700" fill={acc}>8,432</text>
      <rect x="68" y="80" width="42" height="3.5" rx="1" fill={`${acc}20`}/>
      <rect x="68" y="80" width="35" height="3.5" rx="1" fill={acc}/>
      {/* 2×2 colored metric cards */}
      <rect x="28" y="100" width="42" height="36" rx="8" fill="#10B98118" stroke="#10B98145" strokeWidth="0.8"/>
      <rect x="76" y="100" width="42" height="36" rx="8" fill={`${acc}18`} stroke={`${acc}45`} strokeWidth="0.8"/>
      <rect x="28" y="141" width="42" height="36" rx="8" fill="#F59E0B18" stroke="#F59E0B45" strokeWidth="0.8"/>
      <rect x="76" y="141" width="42" height="36" rx="8" fill="#8B5CF618" stroke="#8B5CF645" strokeWidth="0.8"/>
      {/* metric label+value */}
      {[
        {x:30,y:108,c:'#10B981',lbl:'HR',val:'72'},{x:78,y:108,c:acc,lbl:'SLP',val:'7h'},
        {x:30,y:149,c:'#F59E0B',lbl:'CAL',val:'1.8k'},{x:78,y:149,c:'#8B5CF6',lbl:'REC',val:'78'},
      ].map((m,i)=>(
        <g key={i}>
          <text x={m.x+2} y={m.y} fontSize="5" fill={m.c} fontWeight="600">{m.lbl}</text>
          <text x={m.x+2} y={m.y+12} fontSize="11" fontWeight="700" fill="#0a0a09">{m.val}</text>
        </g>
      ))}
      {/* insight card */}
      <rect x="28" y="182" width="90" height="4" rx="1.5" fill={`${acc}30`}/>

      {/* annotations */}
      <Anno x={132} y={72} w={20} text="ring + % label"/>
      <Anno x={132} y={120} w={20} text="color-coded zones"/>
      <Anno x={132} y={160} w={20} text="benchmark added"/>
      <Anno x={132} y={182} w={20} text="insight card NEW"/>

      <Sticky x={148} y={12} w={76} h={26} text="v3 final — framework"/>
      <text x={148} y={26} fontFamily="ui-monospace,monospace" fontSize="5" fill="#92400E">Raw → Context → Insight → Action</text>

      {/* green checkmark */}
      <circle cx="122" cy="50" r="5" fill="#10B98130"/>
      <polyline points="119,50 121,52 125,47" fill="none" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )

  if (variant === 'onboarding') return (
    <svg width="100%" height="100%" viewBox="0 0 280 200" fontFamily="system-ui,sans-serif">
      <rect width="280" height="200" fill={paper}/>

      {/* 3 mini phone columns: v A, v B, v C */}
      {[0,1,2].map(col => {
        const x = 12 + col * 72
        const isC = col === 2
        return (
          <g key={col}>
            <rect x={x} y={14} width={58} height={150} rx="8"
              fill="none" stroke={isC ? acc : line} strokeWidth={isC ? 1.5 : 0.9}/>
            {/* variant label */}
            <rect x={x+4} y={18} width={30} height={5} rx="1.5" fill={isC ? `${acc}30` : block}/>
            <text x={x+6} y={22} fontSize="4.5" fill={isC ? acc : dark}>Variant {['A','B','C'][col]}</text>

            {/* dynamic island */}
            <rect x={x+20} y={16} width={18} height={5} rx="2.5" fill={dark}/>

            {col === 0 && (<>
              {/* permission wall — stacked prompts */}
              <rect x={x+4} y={30} width={50} height={30} rx="5" fill={block} stroke={`${red}60`} strokeWidth="0.8"/>
              <rect x={x+8} y={34} width={42} height="5" rx="1.5" fill={dark} opacity="0.5"/>
              <rect x={x+8} y={42} width={42} height="5" rx="1.5" fill={`${red}40`}/>
              <rect x={x+8} y={50} width={42} height="5" rx="1.5" fill={`${red}40`}/>
              <rect x={x+4} y={66} width={50} height={16} rx="5" fill={block}/>
              <rect x={x+4} y={86} width={50} height={16} rx="5" fill={block}/>
              <rect x={x+4} y={106} width={50} height={16} rx="5" fill={block}/>
              {/* abandon label */}
              <rect x={x+6} y={130} width={46} height={10} rx="3" fill={`${red}20`} stroke={`${red}50`} strokeWidth="0.6"/>
              <text x={x+9} y={137} fontSize="5" fill={red}>71% abandoned</text>
            </>)}

            {col === 1 && (<>
              {/* auto scan — confusing list */}
              <rect x={x+4} y={30} width={50} height={20} rx="5" fill={block}/>
              <rect x={x+8} y={34} width={42} height="5" rx="1.5" fill={dark} opacity="0.5"/>
              <rect x={x+4} y={55} width={50} height="8" rx="3" fill={block} stroke={line} strokeWidth="0.6"/>
              <rect x={x+4} y={66} width={50} height="8" rx="3" fill={block} stroke={line} strokeWidth="0.6"/>
              <rect x={x+4} y={77} width={50} height="8" rx="3" fill={block} stroke={`${red}40`} strokeWidth="0.8"/>
              <text x={x+7} y={83} fontSize="4.5" fill={red}>Unknown Device?</text>
              <rect x={x+4} y={88} width={50} height="8" rx="3" fill={block} stroke={line} strokeWidth="0.6"/>
              <rect x={x+4} y={106} width={50} height="8" rx="3" fill={`${red}15`} stroke={`${red}50`} strokeWidth="0.6"/>
              <text x={x+8} y={112} fontSize="4.5" fill={red}>Cancel</text>
              <rect x={x+6} y={125} width={46} height={10} rx="3" fill={`${red}20`} stroke={`${red}50`} strokeWidth="0.6"/>
              <text x={x+9} y={132} fontSize="5" fill={red}>58% cancelled</text>
            </>)}

            {col === 2 && (<>
              {/* deferred — value first */}
              <rect x={x+4} y={28} width={50} height={34} rx="6" fill={`${acc}15`} stroke={`${acc}40`} strokeWidth="0.8"/>
              <rect x={x+10} y={34} width={38} height="5" rx="1.5" fill={acc} opacity="0.5"/>
              <rect x={x+10} y={42} width={30} height="4" rx="1" fill={block}/>
              <rect x={x+10} y={49} width={34} height="4" rx="1" fill={block}/>
              <rect x={x+4} y={68} width={50} height="7" rx="3" fill={`${acc}20`} stroke={`${acc}40`} strokeWidth="0.7"/>
              <text x={x+8} y={73} fontSize="5" fill={acc}>Heart Rate — Allow</text>
              <rect x={x+4} y={80} width={50} height="7" rx="3" fill={block}/>
              <text x={x+8} y={85} fontSize="5" fill={dark}>Location — Later</text>
              <rect x={x+4} y={100} width={50} height={14} rx="6" fill={acc} opacity="0.85"/>
              <text x={x+29} y={109} textAnchor="middle" fontSize="6" fontWeight="700" fill="#fff">Get started</text>
              {/* win label */}
              <rect x={x+6} y={123} width={46} height={10} rx="3" fill="#10B98120" stroke="#10B98150" strokeWidth="0.6"/>
              <text x={x+9} y={130} fontSize="5" fill="#10B981">✓ 88% completed</text>
            </>)}
          </g>
        )
      })}

      {/* annotations */}
      <Anno x={222} y={45} w={14} text="permission wall"/>
      <Anno x={222} y={80} w={14} text="unfamiliar devices"/>
      <Anno x={222} y={106} w={14} text="value first ✓"/>

      <Sticky x={224} y={140} w={50} h={28} text="deferred perms"/>
      <text x={224} y={154} fontFamily="ui-monospace,monospace" fontSize="4.5" fill="#92400E">drop-off: 65% → 30%</text>
    </svg>
  )

  if (variant === 'health') return (
    <svg width="100%" height="100%" viewBox="0 0 280 200" fontFamily="system-ui,sans-serif">
      <rect width="280" height="200" fill={paper}/>
      {/* left: before */}
      <rect x="12" y="10" width="108" height="180" rx="10" fill="none" stroke={line} strokeWidth="1"/>
      <rect x="20" y="18" width="50" height="7" rx="2" fill={dark} opacity="0.5"/>
      {/* big raw BPM — no context */}
      <rect x="20" y="30" width="92" height="44" rx="8" fill={block} stroke={`${red}40`} strokeWidth="0.8"/>
      <text x="26" y="44" fontSize="6" fill={red}>Current BPM</text>
      <text x="26" y="62" fontSize="22" fontWeight="700" fill="#0a0a09">72</text>
      <rect x="20" y="80" width="92" height="32" rx="8" fill={block}/>
      <rect x="20" y="118" width="92" height="32" rx="8" fill={block}/>
      <rect x="20" y="156" width="92" height="22" rx="8" fill={block}/>
      {/* crossed out — no zones, no sparkline */}
      <line x1="20" y1="80" x2="112" y2="112" stroke={red} strokeWidth="0.8" opacity="0.5"/>
      <line x1="112" y1="80" x2="20" y2="112" stroke={red} strokeWidth="0.8" opacity="0.5"/>

      {/* right: after */}
      <rect x="132" y="10" width="108" height="180" rx="10" fill="none" stroke={acc} strokeWidth="1.2"/>
      <text x="140" y="20" fontSize="5.5" fill={acc} fontWeight="600">AFTER — health redesign</text>
      {/* segment control */}
      <rect x="140" y="24" width="92" height="12" rx="6" fill={`${acc}15`} stroke={`${acc}30`} strokeWidth="0.7"/>
      <rect x="140" y="24" width="30" height="12" rx="6" fill={acc}/>
      <text x="155" y="32" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="600">HR</text>
      <text x="186" y="32" textAnchor="middle" fontSize="5" fill={dark}>Sleep</text>
      <text x="216" y="32" textAnchor="middle" fontSize="5" fill={dark}>Stress</text>
      {/* sparkline card */}
      <rect x="140" y="40" width="92" height="50" rx="8" fill="#EF444415" stroke="#EF444430" strokeWidth="0.8"/>
      <text x="146" y="52" fontSize="5.5" fill={dark}>Current BPM</text>
      <text x="146" y="66" fontSize="18" fontWeight="700" fill="#0a0a09">72</text>
      <text x="172" y="66" fontSize="8" fill="#10B981" fontWeight="600">Normal</text>
      {/* mini sparkline */}
      <polyline points="146,82 152,74 158,78 164,70 170,75 176,72 182,76 188,73 194,77 200,74 206,72 212,75 220,73 224,76"
        fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
      {/* zone bars */}
      <rect x="140" y="96" width="92" height="44" rx="8" fill="#fff" stroke={`${block}`} strokeWidth="0.8"/>
      <text x="146" y="107" fontSize="5" fill={dark}>HEART RATE ZONES</text>
      {[
        {y:112,w:38,c:'#3B82F6',l:'Resting 42%'},
        {y:120,w:32,c:'#10B981',l:'Fat Burn 35%'},
        {y:128,w:16,c:'#F59E0B',l:'Cardio 18%'},
        {y:136,w:5, c:'#EF4444',l:'Peak 5%'},
      ].map((z,i)=>(
        <g key={i}>
          <rect x="146" y={z.y} width={z.w} height="5" rx="2" fill={z.c}/>
          <text x={148+z.w} y={z.y+4} fontSize="4.5" fill={dark}>{z.l}</text>
        </g>
      ))}

      {/* annotations */}
      <Anno x={12} y={62} w={-4} text="no context"/>
      <Anno x={132} y={66} w={-4} text="benchmark added"/>
      <Anno x={132} y={120} w={-4} text="zone breakdown"/>
    </svg>
  )

  if (variant === 'ia') return (
    <svg width="100%" height="100%" viewBox="0 0 280 200" fontFamily="system-ui,sans-serif">
      <rect width="280" height="200" fill={paper}/>

      {/* BEFORE — 6-level drawer */}
      <text x="14" y="12" fontSize="5.5" fill={red} fontWeight="600">BEFORE — 6-level nav</text>
      <rect x="14" y="16" width="70" height="12" rx="4" fill={block} stroke={line} strokeWidth="0.7"/>
      <text x="20" y="25" fontSize="5.5" fill={dark}>☰  Hamburger Menu</text>
      {/* deep tree */}
      {['Dashboard','Health','  Heart Rate','  Sleep','  Stress','Activity','Settings'].map((label,i)=>(
        <g key={i}>
          <rect x="14" y={30 + i*16} width="70" height="12" rx="2"
            fill={i>1&&i<5 ? `${red}10` : block} stroke={i>1&&i<5 ? `${red}40` : line} strokeWidth="0.6"/>
          <text x="18" y={39 + i*16} fontSize="5" fill={i>1&&i<5 ? red : dark}>{label}</text>
        </g>
      ))}
      <line x1="49" y1="158" x2="49" y2="168" stroke={red} strokeWidth="0.8" strokeDasharray="2,1.5"/>
      <text x="14" y="176" fontSize="5" fill={red}>3+ taps to Health → Sleep</text>

      {/* arrow */}
      <text x="95" y="105" fontSize="14" fill={dark}>→</text>

      {/* AFTER — 4-tab bottom nav */}
      <text x="114" y="12" fontSize="5.5" fill={acc} fontWeight="600">AFTER — 4-tab flat nav</text>
      {/* phone shell */}
      <rect x="114" y="16" width="150" height="178" rx="12" fill="none" stroke={acc} strokeWidth="1"/>
      {/* content area */}
      <rect x="122" y="24" width="134" height="132" rx="8" fill={block} opacity="0.4"/>
      {/* IA boxes */}
      <rect x="130" y="32" width="118" height="22" rx="5" fill={`${acc}20`} stroke={`${acc}50`} strokeWidth="0.7"/>
      <text x="189" y="46" textAnchor="middle" fontSize="7" fontWeight="700" fill={acc}>Today</text>
      <text x="189" y="56" textAnchor="middle" fontSize="5" fill={dark}>insight-first summary</text>
      {[
        {l:'Activity',sub:'steps · rings · streak'},
        {l:'Health',  sub:'HR · sleep · stress'},
        {l:'Workouts',sub:'log · history · goals'},
      ].map((t,i)=>(
        <g key={i}>
          <rect x="130" y={62 + i*32} width={i===1?118:55} height="24" rx="5" fill={block} stroke={line} strokeWidth="0.7"/>
          <text x="137" y={74 + i*32} fontSize="6.5" fontWeight="600" fill="#0a0a09">{t.l}</text>
          <text x="137" y={82 + i*32} fontSize="4.5" fill={dark}>{t.sub}</text>
          {i===1 && <>
            {/* sub-tabs for Health */}
            {['HR','SLP','STR'].map((_s,j)=>(
              <rect key={j} x={191 + j*19} y={62 + i*32} width="16" height="24" rx="4"
                fill={j===0?`${acc}30`:block} stroke={j===0?acc:line} strokeWidth="0.7"/>
            ))}
            {['HR','SLP','STR'].map((s,j)=>(
              <text key={j} x={199 + j*19} y={77 + i*32} textAnchor="middle" fontSize="5" fill={j===0?acc:dark}>{s}</text>
            ))}
          </>}
        </g>
      ))}
      {/* tab bar */}
      <rect x="114" y="156" width="150" height="38" rx="0" fill={block} stroke={line} strokeWidth="0.7"/>
      <rect x="114" y="190" width="150" height="4" rx="0" fill="none"/>
      {['Today','Activity','Health','Workouts'].map((t,i)=>(
        <g key={i}>
          <rect x={122 + i*36} y={162} width={i===0?28:20} height="3" rx="1.5" fill={i===0?acc:dark} opacity={i===0?1:0.3}/>
          <text x={122+10 + i*36} y="177" textAnchor="middle" fontSize="5" fill={i===0?acc:dark}>{t}</text>
        </g>
      ))}

      <Anno x={114} y={140} w={-6} text="max 2 taps anywhere"/>
    </svg>
  )

  if (variant === 'workouts') return (
    <svg width="100%" height="100%" viewBox="0 0 280 200" fontFamily="system-ui,sans-serif">
      <rect width="280" height="200" fill={paper}/>

      {/* phone */}
      <rect x="12" y="8" width="130" height="184" rx="12" fill="none" stroke={line} strokeWidth="1"/>
      <rect x="52" y="13" width="24" height="7" rx="3.5" fill={dark}/>
      {/* screen title */}
      <rect x="22" y="26" width="50" height="8" rx="2" fill={dark} opacity="0.5"/>
      {/* BIG start CTA */}
      <rect x="22" y="40" width="110" height="42" rx="12"
        fill={`${acc}20`} stroke={`${acc}60`} strokeWidth="1.2"/>
      <circle cx="77" cy="61" r="10" fill={acc} opacity="0.85"/>
      <polygon points="73,57 73,65 83,61" fill="#fff"/>
      <text x="77" y="88" textAnchor="middle" fontSize="7" fontWeight="700" fill={acc}>Start Workout</text>

      {/* quick-type icons row */}
      {['Run','Bike','Lift','HIIT','Yoga'].map((label,i)=>(
        <g key={i}>
          <rect x={22 + i*24} y="94" width="20" height="22" rx="5" fill={block} stroke={line} strokeWidth="0.6"/>
          <text x={32 + i*24} y="108" textAnchor="middle" fontSize="5" fill={dark}>{label}</text>
        </g>
      ))}

      {/* recent sessions */}
      <text x="22" y="126" fontSize="5.5" fill={dark} fontWeight="600">RECENT</text>
      {[
        {label:'Morning Run',sub:'5.2 km · 28 min',c:'#10B981'},
        {label:'Strength',   sub:'45 min · 280 cal',c:'#F59E0B'},
        {label:'HIIT',       sub:'22 min · 198 cal',c:'#EF4444'},
      ].map((w,i)=>(
        <g key={i}>
          <rect x="22" y={132 + i*18} width="110" height="14" rx="5" fill="#fff" stroke={line} strokeWidth="0.7"/>
          <rect x="26" y={135 + i*18} width="6" height="6" rx="2" fill={`${w.c}40`} stroke={w.c} strokeWidth="0.5"/>
          <rect x="36" y={135 + i*18} width="44" height="3.5" rx="1" fill={dark} opacity="0.5"/>
          <rect x="36" y={141 + i*18} width="32" height="3" rx="1" fill={dark} opacity="0.3"/>
          <text x="124" y={141 + i*18} textAnchor="end" fontSize="5" fill={w.c} fontWeight="600">{w.sub.split('·')[0]}</text>
        </g>
      ))}

      {/* annotations */}
      <Anno x={146} y={61} w={14} text="1-tap CTA"/>
      <Anno x={146} y={105} w={14} text="quick-type grid"/>
      <Anno x={146} y={139} w={14} text="recent sessions"/>

      <Sticky x={148} y={14} w={90} h={36} text="single-tap start removed"/>
      <text x={148} y={28} fontFamily="ui-monospace,monospace" fontSize="5" fill="#92400E">multi-step flow → smart</text>
      <text x={148} y={36} fontFamily="ui-monospace,monospace" fontSize="5" fill="#92400E">mode detection</text>

      {/* flow arrows for decision logic */}
      <line x1="196" y1="54" x2="220" y2="70" stroke={dark} strokeWidth="0.8" strokeDasharray="3,2"/>
      <rect x="220" y="64" width="50" height="16" rx="4" fill={`${acc}15`} stroke={`${acc}40`} strokeWidth="0.7"/>
      <text x="245" y="73" textAnchor="middle" fontSize="5" fill={acc}>auto GPS detect</text>
      <line x1="196" y1="54" x2="220" y2="90" stroke={dark} strokeWidth="0.8" strokeDasharray="3,2"/>
      <rect x="220" y="84" width="50" height="16" rx="4" fill={`${acc}15`} stroke={`${acc}40`} strokeWidth="0.7"/>
      <text x="245" y="93" textAnchor="middle" fontSize="5" fill={acc}>HR zone tracking</text>
    </svg>
  )

  return <svg width="100%" height="100%" viewBox="0 0 280 200"><rect width="280" height="200" fill={paper}/></svg>
}

/* ── Metric card (count-up, Hearth-style) ──────────────────────────────────── */
function MetricCard({ target, suffix, label, desc, started, index }: {
  target: number; suffix: string; label: string; desc: string; started: boolean; index: number
}) {
  const val = useCountUp(target, 1400, started)
  return (
    <div style={{ padding: '40px 28px', borderRight: index < 2 ? HL : 'none' }}>
      <div style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 700, color: FG, lineHeight: 1, marginBottom: 8 }}>{val}{suffix}</div>
      <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: FG, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: SANS, fontSize: 12, color: MUTED, lineHeight: 1.55 }}>{desc}</div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════════════════════ */
export default function FitnessWearableCaseStudy() {
  const navigate = useNavigate()
  const protoRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const activeSection = useSectionObserver()

  const scrollTo = (ref: React.RefObject<Element | null>) =>
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const metricsRef = useRef<HTMLDivElement>(null)
  const [metricsStarted, setMetricsStarted] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const el = metricsRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setMetricsStarted(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const METRICS = [
    { target: 40, suffix: '%', label: 'Data comprehension lift',      desc: 'Across all 6 participants in moderated testing of the daily summary screen.' },
    { target: 35, suffix: '%', label: 'Onboarding drop-off reduced',  desc: 'From 65% to 30% with contextual, deferred permission requests.' },
    { target: 91, suffix: '%', label: 'Task completion rate',         desc: 'Across all 4 core flows: onboarding, check-in, workout start, sleep review.' },
  ]

  return (
    <div style={{ backgroundColor: BG, color: FG, minHeight: '100vh', fontFamily: SANS }}>
      <SectionNav active={activeSection} />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(250,250,249,0.9)', backdropFilter: 'blur(12px)', borderBottom: HL }}>
        <Box style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/')}
            style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}>
            &#8592; Back
          </button>
          <button onClick={() => scrollTo(protoRef)}
            style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, backgroundColor: FG, color: BG, border: 'none', borderRadius: 999, padding: '7px 16px', cursor: 'pointer' }}>
            Try prototype &#8599;
          </button>
        </Box>
      </header>

      {/* Hero */}
      <div id="hero" style={{ scrollMarginTop: 60 }}>
        <Box style={{ padding: '72px 48px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 22px' }}>
                Case study · Connected fitness wearable · iOS &amp; Android · 2024
              </p>
              <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 5.5vw, 72px)', color: FG, margin: '0 0 20px', lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.02em' }}>
                Designing a wearable app where{' '}
                <em style={{ color: ACCENT, fontStyle: 'italic' }}>data finally makes sense.</em>
              </h1>
              <p style={{ fontFamily: SANS, fontSize: 15, color: MUTED, margin: '0 0 10px', maxWidth: 520, fontWeight: 600 }}>
                Pulse — Connected Fitness Wearable Companion
              </p>
              <p style={{ fontFamily: SANS, fontSize: 15, color: FG, lineHeight: 1.75, margin: '0 0 32px', maxWidth: 540, opacity: 0.7 }}>
                Wearable owners opened the app 7 times a day but acted on what they saw only 1.2 times. All 4 core flows failed comprehension testing. This is how we redesigned Pulse from the ground up around one principle: no raw number appears on screen without a plain-language interpretation.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => scrollTo(protoRef)}
                  style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, backgroundColor: FG, color: BG, border: 'none', borderRadius: 999, padding: '11px 22px', cursor: 'pointer' }}>
                  &#128241; Try the live prototype
                </button>
                <button onClick={() => scrollTo(processRef)}
                  style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, backgroundColor: 'transparent', color: FG, border: HL, borderRadius: 999, padding: '11px 22px', cursor: 'pointer' }}>
                  Read the process &#8595;
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8 }}>
              {[
                { label: 'Role',      value: 'UX Designer' },
                { label: 'Tools',     value: 'Figma · Figma Make · Principle · ProtoPie' },
                { label: 'Platforms', value: 'iOS · Android' },
                { label: 'Timeline',  value: '12 weeks · 2024' },
                { label: 'By',        value: 'Karishma Dilip Gawali' },
              ].map(m => (
                <div key={m.label}>
                  <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, margin: '0 0 3px' }}>{m.label}</p>
                  <p style={{ fontFamily: SANS, fontSize: 12, color: FG, margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero phone panel */}
          <div style={{ width: '100%', borderRadius: 20, backgroundColor: '#060D1A', padding: '48px 0 0', overflow: 'hidden', position: 'relative', marginTop: 40 }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 420, height: 220, background: `radial-gradient(ellipse, ${BLUE}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 32px' }}>
              <div style={{ width: 200, flexShrink: 0 }}>
                <div style={{ borderRadius: 40, backgroundColor: '#0C1829', padding: 8, boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>
                  <div style={{ borderRadius: 32, overflow: 'hidden', backgroundColor: '#060D1A', height: 420, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '10px 20px 2px', display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(255,255,255,0.8)', flexShrink: 0 }}>
                      <span style={{ fontWeight: 600 }}>9:41</span><span style={{ opacity: 0.5 }}>5G</span>
                    </div>
                    <div style={{ padding: '6px 12px 3px', flexShrink: 0 }}>
                      <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Saturday, Apr 19</p>
                      <p style={{ fontSize: 11, color: '#fff', fontWeight: 700, margin: 0 }}>Good morning</p>
                    </div>
                    <div style={{ flex: 1, padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="40" height="40" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5"/>
                          <circle cx="20" cy="20" r="16" fill="none" stroke={BLUE} strokeWidth="5" strokeDasharray="85 101" strokeLinecap="round" transform="rotate(-90 20 20)"/>
                        </svg>
                        <div>
                          <p style={{ fontSize: 11, color: BLUE, fontWeight: 700, margin: 0 }}>8,432</p>
                          <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', margin: 0 }}>of 10,000 steps</p>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                        {[
                          { l: 'Heart Rate', v: '72 BPM',  c: GREEN  },
                          { l: 'Sleep',      v: '7h 23m',  c: BLUE   },
                          { l: 'Calories',   v: '1,847',   c: ORANGE },
                          { l: 'Recovery',   v: '78/100',  c: PURPLE },
                        ].map(m => (
                          <div key={m.l} style={{ backgroundColor: `${m.c}15`, borderRadius: 8, padding: '6px 8px', border: `1px solid ${m.c}30` }}>
                            <p style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)', margin: '0 0 2px', textTransform: 'uppercase' }}>{m.l}</p>
                            <p style={{ fontSize: 10, color: '#fff', fontWeight: 700, margin: 0 }}>{m.v}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ backgroundColor: `${BLUE}20`, borderRadius: 8, padding: '7px 10px', border: `1px solid ${BLUE}30` }}>
                        <p style={{ fontSize: 7, color: BLUE, fontWeight: 700, margin: '0 0 2px' }}>TODAY'S INSIGHT</p>
                        <p style={{ fontSize: 8, color: '#fff', margin: 0, lineHeight: 1.4 }}>Well-rested. Good day for a hard workout.</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(6,13,26,0.97)', padding: '5px 0 8px', flexShrink: 0 }}>
                      {['Today','Activity','Health','Workouts'].map((t, i) => (
                        <div key={t} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                          <div style={{ width: i === 0 ? 14 : 4, height: 2.5, borderRadius: 1.5, backgroundColor: i === 0 ? BLUE : 'rgba(255,255,255,0.15)' }} />
                          <span style={{ fontFamily: SANS, fontSize: 6, color: i === 0 ? BLUE : 'rgba(255,255,255,0.3)' }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px 0 24px' }}>
              <p style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.35)', margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Pulse · Connected Fitness Wearable
              </p>
            </div>
          </div>
        </Box>
      </div>

      {/* Metrics bar */}
      <div ref={metricsRef} style={{ borderTop: HL, borderBottom: HL }}>
        <Box>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {METRICS.map((m, i) => <MetricCard key={m.label} {...m} started={metricsStarted} index={i} />)}
          </div>
        </Box>
      </div>

      {/* 01 Overview */}
      <div id="overview" style={{ borderTop: HL, padding: '80px 0', scrollMarginTop: 60 }} ref={processRef}>
        <Box>
          <Eyebrow>01 · Overview</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { h: 'Product',     b: 'Pulse is a companion app for connected fitness wearables that translates raw biometric data (heart rate, sleep, HRV) into plain-language insights users can act on every day.' },
              { h: 'Challenge',   b: 'Wearable owners checked their device an average of 7 times daily but acted on data only 1.2 times. Onboarding had a 65% abandonment rate. All 4 core flows failed comprehension testing.' },
              { h: 'Opportunity', b: 'Apply a structured data translation model across every screen: raw numbers become contextual benchmarks, benchmarks become human insights, and insights become clear next-step recommendations.' },
            ].map(c => (
              <div key={c.h}>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, color: FG, margin: '0 0 12px', fontWeight: 600 }}>{c.h}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </Box>
      </div>

      {/* 02 Problem */}
      <Sec id="problem">
        <Eyebrow>02 · Problem</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>Four gaps, one broken experience.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {[
            { label: 'Data without context',   body: 'Users saw "72 BPM · 52ms HRV" with zero sense of whether those numbers were good, bad, or worth worrying about. Metrics without benchmarks create anxiety, not action.' },
            { label: 'Onboarding abandonment', body: 'Average drop-off during device pairing and permissions was 65%. The permission wall appeared before users understood what the app did or why it needed access.' },
            { label: 'Passive interaction',    body: 'Participants averaged 7 daily opens but only 1.2 meaningful interactions. The app was a glance destination, not an insight tool. Nothing prompted a decision or a behavior change.' },
            { label: 'Comprehension failure',  body: 'All 4 core flows (onboarding, daily check-in, workout start, sleep review) failed baseline comprehension testing before redesign. Users guessed at what they were looking at.' },
          ].map(p => (
            <div key={p.label} style={{ borderTop: `2px solid ${FG}`, paddingTop: 16 }}>
              <p style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px' }}>Pain point</p>
              <h3 style={{ fontFamily: SERIF, fontSize: 20, color: FG, margin: '0 0 8px', fontWeight: 600 }}>{p.label}</h3>
              <p style={{ fontFamily: SANS, fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* 03 Objectives */}
      <Sec id="objectives" bone>
        <Eyebrow>03 · Objectives</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>Four measurable goals.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
          {[
            { n: '01', h: 'Translate data into language',   b: 'Apply the Raw to Context to Insight to Action model on every screen. No metric should ever stand alone without a plain-language interpretation.' },
            { n: '02', h: 'Cut onboarding drop-off',        b: 'Reduce abandonment from 65% to under 30% by deferring non-critical permissions and showing value before asking for access.' },
            { n: '03', h: 'Drive daily active usage',       b: 'Increase meaningful interactions from 1.2x to 3.5x per day by surfacing timely, personalized insights that prompt a response.' },
            { n: '04', h: 'Pass comprehension across flows',b: 'Achieve 90%+ task completion across all 4 core flows in moderated usability testing before handoff.' },
          ].map(o => (
            <div key={o.n} style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: ACCENT, fontWeight: 700, flexShrink: 0, paddingTop: 4 }}>{o.n}</span>
              <div>
                <h3 style={{ fontFamily: SERIF, fontSize: 20, color: FG, margin: '0 0 8px', fontWeight: 600 }}>{o.h}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>{o.b}</p>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 04 Process */}
      <Sec id="process">
        <Eyebrow>04 · Process</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>12 weeks, 5 phases.</h2>
        <div>
          {[
            { w: 'Weeks 1–2',   t: 'Stakeholder alignment',       d: 'Scoped the project with product and engineering. Defined success metrics and established what "comprehension" meant quantitatively.' },
            { w: 'Weeks 2–4',   t: 'User research and audit',     d: '10 in-depth interviews with wearable owners across beginner, intermediate, and advanced fitness levels. Competitive audit of Fitbit, Apple Health, Garmin, and WHOOP.' },
            { w: 'Weeks 4–6',   t: 'Framework and architecture',  d: 'Defined the data translation model (Raw, Context, Insight, Action). Restructured the IA from 6 levels to 3, built around 4 primary tabs.' },
            { w: 'Weeks 6–10',  t: 'Design and prototyping',      d: 'Designed all screens in Figma. Prototyped 3 onboarding variants in Principle. Tested micro-interactions in ProtoPie. Ran 5 moderated sessions across 2 rounds.' },
            { w: 'Weeks 10–12', t: 'Testing and handoff',         d: 'Tested 4 core flows with 6 participants. Iterated on insight card density and notification clarity. Delivered annotated specs, motion guidelines, and a complete component library.' },
          ].map((p, i, arr) => (
            <div key={p.w} style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 24, padding: '20px 0', borderTop: HL, borderBottom: i === arr.length - 1 ? HL : 'none' }}>
              <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, paddingTop: 3 }}>{p.w}</span>
              <div>
                <h3 style={{ fontFamily: SERIF, fontSize: 18, color: FG, margin: '0 0 6px', fontWeight: 600 }}>{p.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 05 Research */}
      <Sec id="research" bone>
        <Eyebrow>05 · User Understanding</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>Who we were designing for.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, lineHeight: 1.7, margin: '0 0 20px' }}>
              10 in-depth interviews with wearable owners: casual walkers, amateur runners, and competitive athletes. All owned a device. None could confidently explain their HRV or VO2 Max score without looking it up. The data was there. The meaning wasn't.
            </p>
            <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
              {[
                'All 10 owned a wearable but could not interpret HRV or VO2 Max',
                '8 of 10 described onboarding as "overwhelming" or "confusing"',
                'Average daily app opens: 7. Meaningful interactions: 1.2',
                '6 of 10 ignored everything except steps and heart rate',
                'None had ever changed a behavior based on their stress score',
              ].map(b => (
                <li key={b} style={{ fontFamily: SANS, fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 7 }}>{b}</li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                name: 'Maya · 29', role: 'Casual runner, beginner fitness tracker',
                goals: 'Track her runs, understand if her sleep is affecting her energy, get actionable daily suggestions.',
                frustrations: 'Sees "HRV 52ms" every morning. Has no idea if that is good. Has stopped checking the Health tab entirely.',
              },
              {
                name: 'Rajan · 38', role: 'Amateur cyclist, data-oriented user',
                goals: 'Optimize recovery, track zone time during training, correlate sleep with performance.',
                frustrations: 'The app shows 12 metrics. He cares about 3. He cannot customize what he sees first and has tried three different apps looking for one that works the way he thinks.',
              },
            ].map(p => (
              <div key={p.name} style={{ border: HL, borderRadius: 16, padding: 20, backgroundColor: CARD }}>
                <p style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>Persona</p>
                <h3 style={{ fontFamily: SERIF, fontSize: 18, color: FG, margin: '0 0 3px', fontWeight: 600 }}>{p.name}</h3>
                <p style={{ fontFamily: SANS, fontSize: 11, color: MUTED, margin: '0 0 14px' }}>{p.role}</p>
                {[{ l: 'Goals', v: p.goals }, { l: 'Frustrations', v: p.frustrations }].map(r => (
                  <div key={r.l} style={{ marginTop: 10 }}>
                    <p style={{ fontFamily: MONO, fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>{r.l}</p>
                    <p style={{ fontFamily: SANS, fontSize: 12, color: FG, margin: 0, lineHeight: 1.5 }}>{r.v}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* 06 Framework */}
      <Sec id="framework">
        <Eyebrow>06 · Data Translation Framework</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 16px', fontWeight: 700, lineHeight: 1.15 }}>Every metric earns its place.</h2>
        <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, margin: '0 0 40px', maxWidth: 620, lineHeight: 1.7 }}>
          The core design principle: no raw number appears on screen without a plain-language interpretation. We defined a four-step translation model applied to every metric, card, and notification in the app.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { n: '01', step: 'Raw',     eg: 'HRV: 52ms · Sleep: 6h 14m · Resting HR: 68 BPM',                      note: 'What the device measured. Accurate, but meaningless to most users.' },
            { n: '02', step: 'Context', eg: 'HRV is in your top 35%. Sleep was 74 min below your 7-day average.',    note: 'A benchmark that gives the number meaning relative to the user.' },
            { n: '03', step: 'Insight', eg: 'You\'re well-rested with solid recovery. Physiologically ready for effort.', note: 'A human-readable interpretation derived from the context.' },
            { n: '04', step: 'Action',  eg: 'Go for a run. Aim for Zone 3 to 4. Your body can handle it today.',      note: 'A specific, low-friction next step the user can take right now.' },
          ].map((s, i) => (
            <div key={s.n} style={{ padding: '28px 24px', borderLeft: i > 0 ? HL : 'none', borderTop: `3px solid ${i < 2 ? FG : ACCENT}` }}>
              <p style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, letterSpacing: '0.12em', margin: '0 0 8px' }}>{s.n} · {s.step}</p>
              <p style={{ fontFamily: SANS, fontSize: 13, color: FG, lineHeight: 1.55, margin: '0 0 14px', fontStyle: 'italic' }}>"{s.eg}"</p>
              <p style={{ fontFamily: SANS, fontSize: 12, color: MUTED, lineHeight: 1.5, margin: 0 }}>{s.note}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: '22px 24px', backgroundColor: BONE, borderRadius: 16, borderLeft: `4px solid ${ACCENT}` }}>
          <p style={{ fontFamily: SANS, fontSize: 14, color: FG, lineHeight: 1.7, margin: 0 }}>
            This framework was applied to <strong>every metric card, every insight notification, and every empty state</strong> in the app. It gave the design team and engineers a shared vocabulary for evaluating whether a screen was doing its job: does this help the user get from Raw to Action?
          </p>
        </div>
      </Sec>

      {/* 07 Architecture */}
      <Sec id="ia" bone>
        <Eyebrow>07 · Information Architecture</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 16px', fontWeight: 700, lineHeight: 1.15 }}>Four tabs, eight flows.</h2>
        <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, margin: '0 0 36px', maxWidth: 620, lineHeight: 1.7 }}>
          The original app had a 6-level hierarchy that buried key data behind multiple taps. We restructured it into 4 primary tabs (Today, Activity, Health, Workouts) with a maximum of 3 levels anywhere in the app.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { n: '01', l: 'Onboarding and pairing'    },
            { n: '02', l: 'Daily summary and insights' },
            { n: '03', l: 'Activity and step tracking' },
            { n: '04', l: 'Heart rate zones and trends'},
            { n: '05', l: 'Sleep stage analysis'      },
            { n: '06', l: 'Stress and recovery score' },
            { n: '07', l: 'Workout logging and history'},
            { n: '08', l: 'Alerts and notifications'  },
          ].map(f => (
            <div key={f.n} style={{ border: HL, borderRadius: 13, padding: '15px 13px', backgroundColor: CARD }}>
              <p style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, letterSpacing: '0.1em', margin: '0 0 8px' }}>{f.n}</p>
              <h3 style={{ fontFamily: SERIF, fontSize: 14, color: FG, margin: 0, fontWeight: 600, lineHeight: 1.3 }}>{f.l}</h3>
            </div>
          ))}
        </div>
      </Sec>

      {/* 08 Wireframes */}
      <Sec id="wireframes">
        <Eyebrow>08 · Wireframes &amp; UX Evolution</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>From numbers to narrative.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { badge: 'Lo-fi to Mid-fi',    title: 'Today screen',     variant: 'today-lofi', desc: 'Evolved from a raw metric list to an insight-first card hierarchy with a clear daily focus.' },
            { badge: 'Mid-fi to Hi-fi',    title: 'Today (final)',    variant: 'today-hifi', desc: 'Added contextual benchmarks, color-coded zones, and the insight card with action prompt.' },
            { badge: 'Onboarding v1 to v3',title: 'Onboarding flow',  variant: 'onboarding', desc: 'Deferred permissions to the moment of need. Drop-off fell from 65% to 30% in testing.' },
            { badge: 'Concept to Final',   title: 'Health screen',    variant: 'health',     desc: 'Heart rate zones replaced raw BPM. Sleep stages replaced a single sleep score number.' },
            { badge: 'IA sketch to Final', title: 'Navigation',       variant: 'ia',         desc: 'Collapsed 6-level drawer into 4-tab bottom nav. Every screen is reachable in 2 taps.' },
            { badge: 'Draft to Final',     title: 'Workout flow',     variant: 'workouts',   desc: 'Single-tap workout start with smart mode detection, replacing a multi-step selection flow.' },
          ].map(w => (
            <div key={w.title} style={{ border: HL, borderRadius: 16, overflow: 'hidden', backgroundColor: CARD }}>
              <div style={{ aspectRatio: '4/3', backgroundColor: '#f0efec', position: 'relative', overflow: 'hidden' }}>
                <PWireframe variant={w.variant} />
              </div>
              <div style={{ padding: '13px 15px' }}>
                <span style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{w.badge}</span>
                <h3 style={{ fontFamily: SERIF, fontSize: 16, color: FG, margin: '4px 0 6px', fontWeight: 600 }}>{w.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 09 Onboarding */}
      <Sec id="onboarding" bone>
        <Eyebrow>09 · Onboarding Exploration</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 16px', fontWeight: 700, lineHeight: 1.15 }}>Three variants. One winner.</h2>
        <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, margin: '0 0 36px', maxWidth: 600, lineHeight: 1.7 }}>
          We prototyped three onboarding approaches in Principle and ran moderated sessions with 6 participants. The permission timing was the single biggest lever for completion.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { v: 'Variant A', t: 'Permission-first',          hi: false, benefit: 'Covers all access requirements upfront', risk: 'Users see a wall of prompts before seeing any app value', outcome: 'Dropped. 71% abandoned at the Bluetooth prompt before seeing the app.' },
            { v: 'Variant B', t: 'Auto device scan',          hi: false, benefit: 'Finds devices automatically, no manual input', risk: 'Multiple unknown devices appear at once, no clear guidance', outcome: 'Dropped. Users panicked. 58% tapped "Cancel" when they saw unfamiliar device names.' },
            { v: 'Variant C', t: 'Deferred permissions',      hi: true,  benefit: 'App value shown first, permissions requested in context', risk: 'Slightly longer session before full functionality is unlocked', outcome: '✅ Selected. Drop-off from 65% to 30%. Completion rate 88%.' },
          ].map(v => (
            <div key={v.v} style={{ border: v.hi ? `2px solid ${FG}` : HL, borderRadius: 16, padding: 20, backgroundColor: v.hi ? BONE : CARD }}>
              <p style={{ fontFamily: MONO, fontSize: 9, color: v.hi ? ACCENT : MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>{v.v}</p>
              <h3 style={{ fontFamily: SERIF, fontSize: 20, color: FG, margin: '0 0 16px', fontWeight: 600 }}>{v.t}</h3>
              {[{ l: 'Benefit', val: v.benefit }, { l: 'Risk', val: v.risk }, { l: 'Outcome', val: v.outcome }].map(r => (
                <div key={r.l} style={{ borderTop: HL, paddingTop: 10, marginTop: 10 }}>
                  <p style={{ fontFamily: MONO, fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>{r.l}</p>
                  <p style={{ fontFamily: SANS, fontSize: 12, color: FG, margin: 0, lineHeight: 1.5 }}>{r.val}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Sec>

      {/* 10 Accessibility */}
      <Sec id="accessibility">
        <Eyebrow>10 · Accessibility &amp; Usability</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>Color is never the only signal.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
          <div>
            <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, lineHeight: 1.7, margin: '0 0 20px' }}>
              Pulse uses color to communicate health zones (Resting, Fat Burn, Cardio, Peak), but color alone is never sufficient. Every zone has a text label. Every alert has an icon. Every metric has both a value and a plain-language status. Accessibility was part of the design spec from week one, not a checklist at the end.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Minimum 4.5:1 contrast on all body text (WCAG AA)',
                '48pt minimum touch targets across all interactive controls',
                'Color zones always paired with a text label (Fat Burn, not just orange)',
                'Animations respect prefers-reduced-motion system setting',
                'Maximum 4 insight cards visible at once to limit cognitive load',
                'Every empty state includes a clear explanation and a next step',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: ACCENT, fontSize: 14, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: SANS, fontSize: 13, color: FG, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, borderTop: `2px solid ${ACCENT}`, paddingTop: 16 }}>
              <span style={{ fontFamily: SERIF, fontSize: 22, color: ACCENT, fontWeight: 700 }}>91%</span>
              <span style={{ fontFamily: SANS, fontSize: 13, color: MUTED, marginLeft: 10 }}>task completion across all 4 core flows</span>
            </div>
          </div>
          <div style={{ backgroundColor: FG, borderRadius: 20, padding: '24px 28px' }}>
            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 20px' }}>Before vs. After</p>
            {[
              { metric: 'Touch target size',     before: '28 pt',       after: '48 pt' },
              { metric: 'Zone label format',     before: 'Color only',  after: 'Color + text' },
              { metric: 'Body contrast ratio',   before: '3.2:1',       after: '5.8:1' },
              { metric: 'Insight cards per view',before: '8+',          after: '4 max' },
            ].map((r, i, arr) => (
              <div key={r.metric} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', gap: 12, padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', alignItems: 'center' }}>
                <span style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{r.metric}</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'line-through' }}>{r.before}</span>
                <span style={{ fontFamily: MONO, fontSize: 13, color: ORANGE, fontWeight: 700 }}>{r.after}</span>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* 11 Final Design */}
      <Sec id="final-design" bone>
        <Eyebrow>11 · Final Design</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 16px', fontWeight: 700, lineHeight: 1.15 }}>Four screens, one framework.</h2>
        <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, margin: '0 0 36px', maxWidth: 640, lineHeight: 1.7 }}>
          Every screen applies the same translation logic. Raw metrics are never shown without context. Insights are always accompanied by a clear next step. The visual hierarchy is consistent across all four tabs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {[
            { tab: 'Today', color: BLUE,   desc: 'The daily summary applies the full framework in a single scroll. A step ring anchors the view, four metric cards provide context, and an insight card delivers the day\'s key recommendation.' },
            { tab: 'Activity', color: GREEN, desc: 'A weekly active-minutes donut shows progress toward the goal. A 7-day step bar chart surfaces weekly patterns. Apple-style rings show Move, Exercise, and Stand completion at a glance.' },
            { tab: 'Health', color: PURPLE, desc: 'Three sub-tabs (Heart Rate, Sleep, Stress) use the same card structure. Each metric includes a sparkline for trends, a plain-language status, and contextual benchmarks.' },
            { tab: 'Workouts', color: ORANGE, desc: 'A single-tap Start button removes decision friction. Five quick-start workout types sit below it. Recent sessions show duration, calories, and distance in a scannable list.' },
          ].map(s => (
            <div key={s.tab} style={{ border: HL, borderRadius: 16, padding: 24, backgroundColor: CARD }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: s.color }} />
                <p style={{ fontFamily: MONO, fontSize: 10, color: s.color, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>{s.tab} tab</p>
              </div>
              <p style={{ fontFamily: SANS, fontSize: 13, color: MUTED, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* 12 Prototype */}
      <Sec id="prototype">
        <Eyebrow>12 · Interactive Prototype</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 16px', fontWeight: 700, lineHeight: 1.15 }}>Fully interactive, built in React.</h2>
        <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, margin: '0 0 40px', maxWidth: 540, lineHeight: 1.7 }}>
          Use the tab bar to explore Today, Activity, Health, and Workouts. The Health tab has three sub-views: Heart Rate, Sleep, and Stress. All interactions are live.
        </p>
        <div ref={protoRef} style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneMockup />
        </div>
        <p style={{ fontFamily: MONO, fontSize: 9, color: MUTED, textAlign: 'center', marginTop: 20, letterSpacing: '0.1em' }}>
          Tap the tab bar to switch screens · Tap Heart Rate / Sleep / Stress inside Health
        </p>
      </Sec>

      {/* 13 Results */}
      <Sec id="results" bone>
        <Eyebrow>13 · Outcomes</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>The framework worked.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: HL, borderBottom: HL, marginBottom: 40 }}>
          {METRICS.map((m, i) => <MetricCard key={m.label} {...m} started={metricsStarted} index={i} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { value: '3.8x/day', label: 'Daily active usage',     desc: 'Up from 1.2x before the redesign. Users now act on data, not just check it.' },
            { value: 'NPS 68',   label: 'Post-test satisfaction', desc: 'Net Promoter Score from participant surveys after moderated sessions.' },
            { value: '0 revisions', label: 'Engineering handoff', desc: 'Engineering requested zero spec clarifications after the annotated Figma handoff.' },
          ].map(r => (
            <div key={r.label} style={{ border: HL, borderRadius: 16, padding: '22px 20px', backgroundColor: CARD }}>
              <p style={{ fontFamily: SERIF, fontSize: 32, color: ACCENT, fontWeight: 700, margin: '0 0 6px', lineHeight: 1 }}>{r.value}</p>
              <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: FG, margin: '0 0 6px' }}>{r.label}</p>
              <p style={{ fontFamily: SANS, fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.5 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* 14 Reflection */}
      <Sec id="reflection">
        <Eyebrow>14 · Reflection</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', color: FG, margin: '0 0 40px', fontWeight: 700, lineHeight: 1.15 }}>What I learned.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            {[
              { h: 'What worked', b: 'The data translation framework gave the entire team a shared lens for evaluation. Every design decision could be tested against a single question: does this help the user move from Raw to Action? That made critiques faster and more productive, and it made the handoff much cleaner because engineers and PMs were using the same vocabulary.' },
              { h: 'What I\'d change', b: 'I would bring engineering into the research phase earlier. Some of the most elegant contextual benchmarks we designed (real-time HRV comparison against the user\'s 30-day rolling average) turned out to require complex backend calculation. The handoff was clean but the feasibility conversation arrived too late. Earlier involvement would have shaped the framework, not just the implementation.' },
              { h: 'What is next',     b: 'The framework was designed for healthy adult users with a general fitness goal. The next question is how it applies to users with chronic conditions, where interpreting data incorrectly carries higher stakes. I would also explore how the translation model works in notifications: surfacing the right insight at the right moment, not just on demand inside the app.' },
            ].map(s => (
              <div key={s.h} style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: SERIF, fontSize: 20, color: FG, margin: '0 0 10px', fontWeight: 600 }}>{s.h}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: MUTED, lineHeight: 1.75, margin: 0 }}>{s.b}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: FG, borderRadius: 20, padding: '28px 28px' }}>
              <p style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 16px' }}>Key takeaway</p>
              <p style={{ fontFamily: SERIF, fontSize: 22, color: '#fff', lineHeight: 1.45, margin: '0 0 16px', fontWeight: 400 }}>
                "The design problem was not how to display health data. It was how to translate health data into something a person could act on before breakfast."
              </p>
              <p style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Karishma Dilip Gawali · UX Designer</p>
            </div>
            <div style={{ border: HL, borderRadius: 16, padding: '22px 24px', backgroundColor: BONE }}>
              <p style={{ fontFamily: MONO, fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>Project details</p>
              {[
                { l: 'Duration',  v: '12 weeks · 2024'                          },
                { l: 'Methods',   v: 'User interviews · Competitive audit · A/B/C prototype testing · Moderated usability testing' },
                { l: 'Deliverables', v: 'Figma file · ProtoPie prototype · Component library · Motion spec · Annotated handoff' },
              ].map(d => (
                <div key={d.l} style={{ marginBottom: 10 }}>
                  <p style={{ fontFamily: MONO, fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 3px' }}>{d.l}</p>
                  <p style={{ fontFamily: SANS, fontSize: 12, color: FG, margin: 0, lineHeight: 1.5 }}>{d.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sec>

      {/* Footer */}
      <div style={{ borderTop: HL, padding: '40px 0' }}>
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Pulse · Connected Fitness Wearable · 2024</p>
          <button onClick={() => navigate('/')}
            style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            &#8592; Back to portfolio
          </button>
        </Box>
      </div>
    </div>
  )
}
