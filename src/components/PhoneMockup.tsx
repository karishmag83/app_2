import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Project Data (real content) ────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'ai-care',
    emoji: '🏥',
    title: 'AI Care Navigator',
    subtitle: 'Healthcare · AI · UX Design',
    gradient: ['#0c1a3e', '#06101f'],
    accent: '#0ea5e9',
    metric: '85%',
    metricLabel: 'User Satisfaction',
    impact: '+73% daily engagement',
    tags: ['UX Design', 'AI', 'Healthcare'],
    image: '/project-ai-care.jpg',
  },
  {
    id: 'restoration',
    emoji: '🌿',
    title: 'Restoration Medicine',
    subtitle: 'Health Platform · Design System',
    gradient: ['#052e1a', '#030f0a'],
    accent: '#10b981',
    metric: '95%',
    metricLabel: 'Patient Satisfaction',
    impact: '500+ practitioners',
    tags: ['Healthcare', 'Platform'],
    image: '/RestorationMedicineCard.png',
  },
  {
    id: 'repack',
    emoji: '♻️',
    title: 'RePack Portal',
    subtitle: 'Sustainability · E-commerce',
    gradient: ['#04261a', '#02120d'],
    accent: '#22c55e',
    metric: '78%',
    metricLabel: 'Return Rate',
    impact: '2.5M lbs CO₂ saved',
    tags: ['Sustainability', 'UX'],
    image: '/Repack_thumbail.jpg',
  },
  {
    id: 'folio',
    emoji: '📈',
    title: 'Folio Tracker',
    subtitle: 'Fintech · Data Visualization',
    gradient: ['#1c0d00', '#100600'],
    accent: '#f59e0b',
    metric: '$131K',
    metricLabel: 'Avg Portfolio',
    impact: '12K+ active users',
    tags: ['Fintech', 'Dashboard'],
    image: '/Folio_thumbnail.jpg',
  },
]

const SKILLS = [
  { name: 'Figma',         icon: '🎨', level: 98, color: '#a855f7' },
  { name: 'React / Next',  icon: '⚛️', level: 90, color: '#0ea5e9' },
  { name: 'TypeScript',    icon: '🔷', level: 85, color: '#3b82f6' },
  { name: 'UX Research',   icon: '🔬', level: 95, color: '#10b981' },
  { name: 'Tailwind CSS',  icon: '💨', level: 92, color: '#06b6d4' },
  { name: 'Prototyping',   icon: '📐', level: 96, color: '#f59e0b' },
  { name: 'Framer Motion', icon: '🎞️', level: 88, color: '#ec4899' },
  { name: 'Node.js',       icon: '🟢', level: 80, color: '#16a34a' },
]

// ─── Live Clock ───────────────────────────────────────────────────────────────
function useTime() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

// ─── Tab Icons ────────────────────────────────────────────────────────────────
const ACTIVE_COLOR  = '#0ea5e9'
const INACTIVE_COLOR = '#94a3b8'

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={active ? ACTIVE_COLOR : 'none'} stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
)
const WorkIcon = ({ active }: { active: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
  </svg>
)
const SkillsIcon = ({ active }: { active: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={active ? ACTIVE_COLOR : 'none'} stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const ContactIcon = ({ active }: { active: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

// ─── Shared card style ────────────────────────────────────────────────────────
const card = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: 'rgba(0,0,0,0.04)',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: 16,
  ...extra,
})

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', padding: '10px 14px 12px' }}>
      {/* Profile row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 13, flexShrink: 0, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
          <img
            src="/gallery-1.jpeg"
            alt="Karishma Gawali"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: 'scale(1.4)', transformOrigin: 'center top' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: '#0f172a', fontWeight: 600, fontSize: 12, marginBottom: 2 }}>Karishma Gawali</p>
          <p style={{ color: '#64748b', fontSize: 9.5 }}>Product Designer · SWE</p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
          color: '#059669', fontSize: 8.5, fontWeight: 600,
          padding: '3px 8px', borderRadius: 99,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'block', animation: 'pulse 2s infinite' }}/>
          Open to Work
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, marginBottom: 12 }}>
        {([['50+', 'Projects'], ['5+', 'Years'], ['30+', 'Clients']] as const).map(([val, label]) => (
          <motion.div key={label} whileTap={{ scale: 0.92 }} style={{ ...card({ padding: '9px 6px', textAlign: 'center', borderRadius: 13 }) }}>
            <p style={{ color: '#0f172a', fontWeight: 700, fontSize: 14 }}>{val}</p>
            <p style={{ color: '#94a3b8', fontSize: 8.5 }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Section label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <p style={{ color: '#94a3b8', fontSize: 8.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Recent Work</p>
        <p style={{ color: ACTIVE_COLOR, fontSize: 8.5 }}>4 projects →</p>
      </div>

      {/* Mini project rows — keep dark gradient for contrast */}
      {PROJECTS.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginBottom: 6, borderRadius: 15, padding: '9px 11px',
            background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{p.emoji}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontSize: 10.5, fontWeight: 600, marginBottom: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
            <p style={{ color: '#94a3b8', fontSize: 8.5 }}>{p.subtitle}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ color: p.accent, fontWeight: 700, fontSize: 11 }}>{p.metric}</p>
            <p style={{ color: '#64748b', fontSize: 8 }}>{p.metricLabel}</p>
          </div>
        </motion.div>
      ))}

      {/* Quote card */}
      <div style={{
        marginTop: 6, borderRadius: 15, padding: '11px 13px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06))',
        border: '1px solid rgba(99,102,241,0.15)',
      }}>
        <p style={{ color: '#818cf8', fontSize: 8.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Philosophy</p>
        <p style={{ color: '#475569', fontSize: 9.5, lineHeight: 1.6 }}>"Design is where strategy meets soul — I build products that feel as good as they perform."</p>
      </div>

      {/* Gallery */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <p style={{ color: '#94a3b8', fontSize: 8.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Life & Art</p>
          <p style={{ color: '#94a3b8', fontSize: 8.5 }}>✦</p>
        </div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
          {[
            { src: '/gallery-1.jpeg', label: 'Me' },
            { src: '/gallery-2.jpeg', label: 'Food' },
            { src: '/gallery-3.jpeg', label: 'Painting' },
            { src: '/gallery-4.jpeg', label: 'Cooking' },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileTap={{ scale: 0.94 }}
              style={{ flexShrink: 0, position: 'relative' }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: 72, height: 72, borderRadius: 14,
                  objectFit: 'cover', objectPosition: 'center',
                  display: 'block',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.45))',
                borderRadius: '0 0 14px 14px',
                padding: '10px 5px 4px',
                textAlign: 'center',
              }}>
                <span style={{ color: 'white', fontSize: 7.5, fontWeight: 600 }}>{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── WORK SCREEN ──────────────────────────────────────────────────────────────
function WorkScreen() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)

  const go = (dir: number) => {
    const next = active + dir
    if (next < 0 || next >= PROJECTS.length) return
    setDirection(dir)
    setActive(next)
  }

  const p = PROJECTS[active]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 14px 8px' }}>
      {/* Header + dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9, flexShrink: 0 }}>
        <p style={{ color: '#0f172a', fontWeight: 600, fontSize: 12.5 }}>My Work</p>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {PROJECTS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
              animate={{ width: i === active ? 16 : 6, backgroundColor: i === active ? p.accent : 'rgba(0,0,0,0.15)' }}
              style={{ height: 6, borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Project card — dark gradient cards look sharp on white */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 22, minHeight: 0 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={p.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 0.94 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit:  (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, scale: 0.94 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden',
              background: `linear-gradient(155deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 100%)`,
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Full image — contain so nothing is cropped */}
            <div style={{ flex: 1, background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img
                src={p.image}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>

            {/* Text bar at bottom */}
            <div style={{
              flexShrink: 0,
              background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
              padding: '10px 14px 12px',
              borderTop: `1px solid ${p.accent}20`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
                  <p style={{ color: '#64748b', fontSize: 8, marginBottom: 2 }}>{p.subtitle}</p>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>{p.title}</p>
                </div>
                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      display: 'inline-block', width: 'fit-content',
                      fontSize: 7, fontWeight: 600, padding: '1px 5px', borderRadius: 99,
                      color: p.accent, backgroundColor: p.accent + '18', border: `1px solid ${p.accent}40`,
                      whiteSpace: 'nowrap',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ color: p.accent, fontWeight: 800, fontSize: 20, lineHeight: 1 }}>{p.metric}</p>
                  <p style={{ color: '#475569', fontSize: 8, marginTop: 2 }}>{p.metricLabel}</p>
                </div>
                <p style={{ color: '#64748b', fontSize: 8.5, fontWeight: 500, textAlign: 'right', maxWidth: 90, lineHeight: 1.4 }}>{p.impact}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / counter / Next */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 9, flexShrink: 0 }}>
        {[{ dir: -1, disabled: active === 0, d: 'M15 18l-6-6 6-6' }, { dir: 1, disabled: active === PROJECTS.length - 1, d: 'M9 18l6-6-6-6' }].map(({ dir, disabled, d }, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.85 }}
            onClick={() => go(dir)}
            disabled={disabled}
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.25 : 1,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round"><path d={d}/></svg>
          </motion.button>
        ))}
        <p style={{ color: '#94a3b8', fontSize: 9.5 }}>{active + 1} / {PROJECTS.length}</p>
        <div style={{ width: 30 }} />
      </div>
    </div>
  )
}

// ─── SKILLS SCREEN ────────────────────────────────────────────────────────────
function SkillsScreen() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 120); return () => clearTimeout(t) }, [])

  return (
    <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', padding: '10px 14px 12px' }}>
      <p style={{ color: '#0f172a', fontWeight: 600, fontSize: 12.5, marginBottom: 11 }}>Skillset</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {SKILLS.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11 }}>{s.icon}</span>
                <span style={{ color: '#1e293b', fontSize: 10, fontWeight: 500 }}>{s.name}</span>
              </div>
              <span style={{ color: s.color, fontSize: 8.5, fontWeight: 700 }}>{s.level}%</span>
            </div>
            <div style={{ height: 5, background: 'rgba(0,0,0,0.07)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${s.color}99, ${s.color})` }}
                initial={{ width: 0 }}
                animate={{ width: mounted ? `${s.level}%` : 0 }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        style={{ ...card({ marginTop: 12, padding: '10px 12px', borderRadius: 14 }) }}
      >
        <p style={{ color: '#94a3b8', fontSize: 8.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Certifications</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['Google UX Design', 'AWS Cloud', 'Meta Frontend', 'Agile PM'].map(cert => (
            <span key={cert} style={{
              fontSize: 8.5, fontWeight: 500, padding: '3px 8px', borderRadius: 99,
              background: 'rgba(14,165,233,0.08)', color: '#0284c7', border: '1px solid rgba(14,165,233,0.2)',
            }}>{cert}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ─── CONTACT SCREEN ───────────────────────────────────────────────────────────
function ContactScreen() {
  const [copied, setCopied] = useState(false)

  const links = [
    {
      label: 'Email', value: 'karishmaworks08@gmail.com', icon: '✉️',
      hint: copied ? '✓ Copied!' : 'Tap to copy', hintColor: copied ? '#10b981' : ACTIVE_COLOR,
      action: () => {
        navigator.clipboard?.writeText('karishmaworks08@gmail.com').catch(() => {})
        setCopied(true); setTimeout(() => setCopied(false), 2500)
      },
    },
    { label: 'LinkedIn', value: 'linkedin.com/in/karishmagawali', icon: '💼', hint: 'View profile →', hintColor: ACTIVE_COLOR, action: () => window.open('https://www.linkedin.com/in/karishmagawali/', '_blank') },
    { label: 'Portfolio', value: 'karishmaworks.netlify.app', icon: '🌐', hint: 'View site →', hintColor: ACTIVE_COLOR, action: () => window.open('https://karishmaworks.netlify.app/', '_blank') },
    { label: 'Resume', value: 'View in About section', icon: '📄', hint: 'Go there →', hintColor: '#a78bfa', action: () => { const el = document.querySelector('#about'); if (el) el.scrollIntoView({ behavior: 'smooth' }) } },
  ]

  return (
    <div style={{ height: '100%', padding: '10px 14px 8px', display: 'flex', flexDirection: 'column' }}>
      <p style={{ color: '#0f172a', fontWeight: 600, fontSize: 12.5, marginBottom: 2 }}>Let's Connect</p>
      <p style={{ color: '#64748b', fontSize: 9.5, marginBottom: 11 }}>Open to full-time &amp; freelance roles</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {links.map((link, i) => (
          <motion.button
            key={link.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={link.action}
            style={{ ...card({ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 14, cursor: 'pointer', width: '100%', textAlign: 'left' }) }}
          >
            <span style={{ fontSize: 17, width: 26, textAlign: 'center', flexShrink: 0 }}>{link.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: '#0f172a', fontSize: 10.5, fontWeight: 500, marginBottom: 1.5 }}>{link.label}</p>
              <p style={{ color: '#94a3b8', fontSize: 8.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.value}</p>
            </div>
            <span style={{ color: link.hintColor, fontSize: 8.5, flexShrink: 0 }}>{link.hint}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
        style={{
          marginTop: 10, borderRadius: 16, padding: '14px 12px', flex: 1,
          background: 'linear-gradient(135deg, rgba(14,165,233,0.07), rgba(129,140,248,0.07))',
          border: '1px solid rgba(14,165,233,0.15)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}
      >
        <span style={{ fontSize: 20, marginBottom: 5 }}>👋</span>
        <p style={{ color: '#0f172a', fontSize: 11, fontWeight: 600, marginBottom: 3 }}>Available immediately</p>
        <p style={{ color: '#94a3b8', fontSize: 9 }}>Boston, MA · Remote friendly</p>
        <p style={{ color: '#94a3b8', fontSize: 9, marginTop: 2 }}>Open to relocation</p>
      </motion.div>
    </div>
  )
}

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
function StatusBar({ time }: { time: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px 3px', flexShrink: 0 }}>
      <span style={{ color: '#0f172a', fontSize: 11, fontWeight: 600, letterSpacing: '-0.3px' }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* Signal */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 10 }}>
          {[3, 5, 7, 10].map((h, i) => (
            <div key={i} style={{ width: 2.5, height: h, borderRadius: 1, background: '#0f172a' }} />
          ))}
        </div>
        {/* WiFi */}
        <svg width="13" height="10" viewBox="0 0 24 18" fill="#0f172a">
          <path d="M12 5C8.5 5 5.5 6.5 3.3 8.8L1.3 6.6C4.1 3.6 8 2 12 2s7.9 1.6 10.7 4.6l-2 2.2C18.5 6.5 15.5 5 12 5z"/>
          <path d="M12 11c-1.7 0-3.2.7-4.3 1.8L6 11.1C7.6 9.5 9.7 8.5 12 8.5s4.4 1 6 2.6l-1.7 1.7C15.2 11.7 13.7 11 12 11z"/>
          <circle cx="12" cy="17.5" r="2.5"/>
        </svg>
        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 20, height: 10, border: '1.5px solid rgba(0,0,0,0.4)', borderRadius: 2.5, position: 'relative', padding: 1.5 }}>
            <div style={{ width: '72%', height: '100%', background: '#0f172a', borderRadius: 1 }} />
          </div>
          <div style={{ width: 1.5, height: 5, background: 'rgba(0,0,0,0.35)', borderRadius: '0 1px 1px 0', marginLeft: 1 }} />
        </div>
      </div>
    </div>
  )
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'home',    label: 'Home',    Icon: HomeIcon    },
  { id: 'work',    label: 'Work',    Icon: WorkIcon    },
  { id: 'skills',  label: 'Skills',  Icon: SkillsIcon  },
  { id: 'contact', label: 'Contact', Icon: ContactIcon },
] as const

type TabId = typeof TABS[number]['id']

function BottomNav({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div style={{ flexShrink: 0, padding: '5px 10px 8px' }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 20, padding: 3,
      }}>
        {TABS.map(({ id, label, Icon }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.8 }}
            onClick={() => onChange(id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '5px 2px', borderRadius: 17, border: 'none', cursor: 'pointer',
              background: 'transparent', position: 'relative',
            }}
          >
            {active === id && (
              <motion.div
                layoutId="nav-pill"
                style={{ position: 'absolute', inset: 0, borderRadius: 17, background: 'rgba(14,165,233,0.1)' }}
                transition={{ type: 'spring', stiffness: 500, damping: 36 }}
              />
            )}
            <Icon active={active === id} />
            <span style={{ fontSize: 7.5, fontWeight: 600, color: active === id ? ACTIVE_COLOR : INACTIVE_COLOR, position: 'relative' }}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>
      {/* Home indicator bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
        <div style={{ width: 80, height: 4, background: 'rgba(0,0,0,0.18)', borderRadius: 99 }} />
      </div>
    </div>
  )
}

// ─── DYNAMIC ISLAND ───────────────────────────────────────────────────────────
function DynamicIsland({ label, expanded }: { label: string; expanded: boolean }) {
  return (
    <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
      <motion.div
        animate={{ width: expanded ? 126 : 88, height: expanded ? 32 : 26 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        style={{
          background: '#000', borderRadius: 99,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        }}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.span
              key="label"
              initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.75 }}
              style={{ color: 'white', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.02em' }}
            >{label}</motion.span>
          ) : (
            <motion.div
              key="dot"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1a1a1a', border: '1.5px solid #2a2a2a' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function PhoneMockup() {
  const [tab, setTab]         = useState<TabId>('home')
  const [prevTab, setPrevTab] = useState<TabId>('home')
  const [islandExpanded, setIslandExpanded] = useState(false)
  const [islandLabel, setIslandLabel]       = useState('')
  const time = useTime()

  const tabOrder: TabId[] = ['home', 'work', 'skills', 'contact']
  const direction = tabOrder.indexOf(tab) >= tabOrder.indexOf(prevTab) ? 1 : -1

  const switchTab = (id: TabId) => {
    if (id === tab) return
    setPrevTab(tab)
    setTab(id)
    const label = TABS.find(t => t.id === id)?.label ?? ''
    setIslandLabel(label)
    setIslandExpanded(true)
    setTimeout(() => setIslandExpanded(false), 1500)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* ── White iPhone shell ── */}
      <div style={{
        position: 'relative',
        width: '86%', height: '97%',
        borderRadius: 50,
        background: 'linear-gradient(160deg, #ffffff 0%, #f4f4f6 40%, #e9e9ec 100%)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.9)',
          'inset 0 -1px 0 rgba(0,0,0,0.08)',
          '0 0 0 0.75px rgba(0,0,0,0.1)',
          '0 32px 90px rgba(0,0,0,0.22)',
          '0 8px 30px rgba(0,0,0,0.12)',
        ].join(', '),
        padding: 10,
      }}>

        {/* ── Screen ── */}
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          borderRadius: 42, overflow: 'hidden',
          background: '#ffffff',
          display: 'flex', flexDirection: 'column',
        }}>
          <DynamicIsland label={islandLabel} expanded={islandExpanded} />
          <StatusBar time={time} />

          {/* Content */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={tab}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 28, opacity: 0, filter: 'blur(5px)' }),
                  center: { x: 0, opacity: 1, filter: 'blur(0px)' },
                  exit:  (d: number) => ({ x: d * -28, opacity: 0, filter: 'blur(5px)' }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.21, ease: [0.32, 0.72, 0, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                {tab === 'home'    && <HomeScreen />}
                {tab === 'work'    && <WorkScreen />}
                {tab === 'skills'  && <SkillsScreen />}
                {tab === 'contact' && <ContactScreen />}
              </motion.div>
            </AnimatePresence>
          </div>

          <BottomNav active={tab} onChange={switchTab} />
        </div>

        {/* ── Hardware side buttons (silver) ── */}
        {/* Silent */}
        <div style={{ position: 'absolute', left: -3.5, top: '14%', width: 3.5, height: 22, background: 'linear-gradient(180deg,#c8c8cc,#b0b0b4)', borderRadius: '2px 0 0 2px', boxShadow: '-1px 0 2px rgba(0,0,0,0.15)' }} />
        {/* Vol+ */}
        <div style={{ position: 'absolute', left: -3.5, top: '22%', width: 3.5, height: 32, background: 'linear-gradient(180deg,#c8c8cc,#b0b0b4)', borderRadius: '2px 0 0 2px', boxShadow: '-1px 0 2px rgba(0,0,0,0.15)' }} />
        {/* Vol- */}
        <div style={{ position: 'absolute', left: -3.5, top: '32%', width: 3.5, height: 32, background: 'linear-gradient(180deg,#c8c8cc,#b0b0b4)', borderRadius: '2px 0 0 2px', boxShadow: '-1px 0 2px rgba(0,0,0,0.15)' }} />
        {/* Power */}
        <div style={{ position: 'absolute', right: -3.5, top: '25%', width: 3.5, height: 54, background: 'linear-gradient(180deg,#c8c8cc,#b0b0b4)', borderRadius: '0 2px 2px 0', boxShadow: '1px 0 2px rgba(0,0,0,0.15)' }} />
      </div>
    </div>
  )
}
