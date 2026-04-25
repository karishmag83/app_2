import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Dark mode reactive hook ─── */
function useIsDark() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-dark') === 'true'
  )
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.getAttribute('data-dark') === 'true')
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-dark'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

/* ─── LinkedIn icon ─── */
const LinkedInIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/* ─── Data ─── */
interface T {
  id: number
  quote: string
  name: string
  role: string
  company: string
  relationship: string
  image: string
  badge: string
  dotColor: string
  isLetter?: boolean
}

const testimonials: T[] = [
  {
    id: 1,
    quote: "Karishma is an exceptional UX designer with strong product thinking and AI-enhanced UX expertise. I highly recommend her for UX and product roles in AI and emerging technologies.",
    name: "Vishal Chawla",
    role: "Director, Enterprise Collaboration & AI Web Services",
    company: "MIT",
    relationship: "Collaborated at MIT",
    image: "/VishalChawla.jpg",
    badge: "MIT Director",
    dotColor: "#0d9488",
  },
  {
    id: 2,
    quote: "Karishma is an inquisitive, dedicated multidisciplinary UI/UX designer and web developer who quickly understands client needs and delivers strong work across decks, brands, and websites using UI/UX best practices and modern design trends.",
    name: "Matthew Smith",
    role: "Design Lead",
    company: "iBec Creative",
    relationship: "Karishma reported to Matthew",
    image: "/MatthewSmith.jpg",
    badge: "Design Manager",
    dotColor: "#7c3aed",
  },
  {
    id: 3,
    quote: "Thanks to Karishma, our website redesign became noticeably more user-friendly and conversion-ready. Her ability to simplify complex flows and deliver a refined UI was outstanding.",
    name: "John Neal",
    role: "Chief Product & Analytics Officer",
    company: "Restoration Medicine",
    relationship: "Client engagement",
    image: "/JohnNeal.jpg",
    badge: "Executive Client",
    dotColor: "#2563eb",
  },
  {
    id: 4,
    quote: "Karishma's thoughtful design direction brought clarity and cohesion to our showcase deck, making it easier to present and easier to understand.",
    name: "Uchenna Onyeachom",
    role: "Founder",
    company: "Health for Mankind",
    relationship: "Client engagement",
    image: "/UchennaOnyeachom.jpg",
    badge: "Founder & Client",
    dotColor: "#d97706",
  },
  {
    id: 5,
    quote: "What sets Karishma apart is her creative approach combined with remarkable flexibility in implementing feedback. She consistently created digital experiences that were both visually striking and functionally effective — a self-starter trusted to manage projects from conception to completion.",
    name: "Allyson Goida",
    role: "Senior Program Manager, Future of Healthcare Founder Residency",
    company: "Roux Institute · NEU",
    relationship: "Co-op Supervisor · July 2025",
    image: "/AllysonGoida.jpg",
    badge: "Co-op Supervisor",
    dotColor: "#db2777",
    isLetter: true,
  },
]

/* ─── Avatar with initials fallback ─── */
function Avatar({ t, size = 40, dark }: { t: T; size?: number; dark: boolean }) {
  const initials = t.name.split(' ').map(w => w[0]).slice(0, 2).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={t.image}
        alt={t.name}
        className="w-full h-full rounded-full object-cover"
        style={{ boxShadow: `0 0 0 2px ${dark ? '#1c1b28' : '#fff'}, 0 0 0 3.5px ${t.dotColor}50` }}
        onError={e => {
          const img = e.currentTarget
          img.style.display = 'none'
          const p = img.parentElement!
          if (!p.querySelector('.av-fallback')) {
            const el = document.createElement('div')
            el.className = 'av-fallback'
            el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${Math.round(size * 0.35)}px;color:#fff;background:${t.dotColor};box-shadow:0 0 0 2px ${dark ? '#1c1b28' : '#fff'},0 0 0 3.5px ${t.dotColor}50`
            el.textContent = initials
            p.appendChild(el)
          }
        }}
      />
    </div>
  )
}

/* ─── Single marquee card ─── */
function MarqueeCard({ t, dark }: { t: T; dark: boolean }) {
  const cardBg    = dark ? '#1c1b28' : '#ffffff'
  const cardBdr   = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const cardShadow = dark
    ? '0 4px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)'
    : '0 4px 28px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03)'
  const quoteColor = dark ? 'rgba(237,232,245,0.78)' : 'rgba(15,15,15,0.74)'
  const nameColor  = dark ? '#ede8f5' : '#111827'
  const metaColor  = dark ? 'rgba(237,232,245,0.42)' : 'rgba(0,0,0,0.44)'
  const divColor   = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'

  return (
    <div
      className="t-marquee-card flex-shrink-0 flex flex-col rounded-2xl cursor-default select-none"
      style={{
        width: '360px',
        backgroundColor: cardBg,
        border: `1px solid ${cardBdr}`,
        boxShadow: cardShadow,
        padding: '22px 24px',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Badge */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${t.dotColor}12`,
            color: t.dotColor,
            border: `1px solid ${t.dotColor}28`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.dotColor }} />
          {t.badge}
        </div>
        {t.isLetter && (
          <span className="text-[10px] font-medium opacity-50 italic">
            Letter of Rec.
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote
        className="text-sm leading-relaxed flex-1 mb-5"
        style={{
          color: quoteColor,
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div
        className="flex items-center gap-3 pt-4"
        style={{ borderTop: `1px solid ${divColor}` }}
      >
        <Avatar t={t} size={38} dark={dark} />
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate" style={{ color: nameColor }}>
            {t.name}
          </div>
          <div className="text-xs truncate mt-0.5" style={{ color: metaColor }}>
            {t.role}
          </div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: t.dotColor }}>
            {t.company}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Marquee row ─── */
function MarqueeRow({
  items,
  direction,
  dark,
}: {
  items: T[]
  direction: 'left' | 'right'
  dark: boolean
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]
  return (
    <div
      className="marquee-row overflow-hidden"
      style={{ cursor: 'grab' }}
      onMouseEnter={e => {
        const inner = e.currentTarget.querySelector<HTMLElement>('.marquee-inner')
        if (inner) inner.style.animationPlayState = 'paused'
      }}
      onMouseLeave={e => {
        const inner = e.currentTarget.querySelector<HTMLElement>('.marquee-inner')
        if (inner) inner.style.animationPlayState = 'running'
      }}
    >
      <div
        className="marquee-inner"
        style={{
          display: 'flex',
          gap: '20px',
          width: 'max-content',
          animation: direction === 'left'
            ? 'marquee-l 42s linear infinite'
            : 'marquee-r 52s linear infinite',
        }}
      >
        {doubled.map((t, i) => (
          <MarqueeCard key={`${t.id}-${i}`} t={t} dark={dark} />
        ))}
      </div>
    </div>
  )
}

/* ─── Stats ─── */
const stats = [
  { value: '5', label: 'Recommendations' },
  { value: '3+', label: 'Years of client work' },
  { value: '100%', label: '5-star feedback' },
]

/* ─── Section ─── */
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const dark = useIsDark()


  useEffect(() => {
    if (!sectionRef.current) return

    /* ── 3D tilt on hover (desktop only, run once) ── */
    if (!window.matchMedia('(hover: hover)').matches) return

    const cards = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>('.t-marquee-card')
    )
    const hs: { el: HTMLElement; mv: (e: MouseEvent) => void; ml: () => void }[] = []

    cards.forEach(card => {
      const mv = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 2
        const y = ((e.clientY - r.top)  / r.height - 0.5) * 2
        gsap.to(card, {
          rotateY: x * 8, rotateX: -y * 5,
          transformPerspective: 800,
          scale: 1.02,
          duration: 0.35, ease: 'power2.out', overwrite: 'auto',
        })
      }
      const ml = () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0, scale: 1,
          duration: 0.6, ease: 'elastic.out(1, 0.5)', overwrite: 'auto',
        })
      }
      card.addEventListener('mousemove', mv)
      card.addEventListener('mouseleave', ml)
      hs.push({ el: card, mv, ml })
    })

    return () => hs.forEach(({ el, mv, ml }) => {
      el.removeEventListener('mousemove', mv)
      el.removeEventListener('mouseleave', ml)
    })
  }, []) // run once — tilt listeners survive dark mode re-renders

  /* edge-fade mask: transparent edges, opaque center */
  const edgeMask = `linear-gradient(to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%)`

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="t-header text-center max-w-2xl mx-auto mb-12">
          <span
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
            style={{ color: 'var(--primary-color)' }}
          >
            <LinkedInIcon size={13} />
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
            Words from people I've worked with
          </h2>
          <p className="text-lg opacity-60 leading-relaxed">
            Real recommendations from clients, managers, and collaborators —
            verified on LinkedIn.
          </p>
        </div>

        {/* Stats */}
        <div className="t-stats-row flex flex-wrap justify-center gap-10 lg:gap-20 mb-14">
          {stats.map(s => (
            <div key={s.label} className="t-stat text-center">
              <div
                className="text-3xl lg:text-4xl font-display font-bold"
                style={{ color: 'var(--primary-color)' }}
              >
                {s.value}
              </div>
              <div className="text-xs font-medium opacity-45 mt-1 tracking-wider uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Single marquee row — full bleed */}
      <div
        style={{
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
        }}
      >
        <MarqueeRow items={testimonials} direction="left" dark={dark} />
      </div>

      {/* LinkedIn CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="mt-12 text-center">
          <p className="text-sm opacity-40 mb-4">Hover over the cards to pause · All verified on LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/karishmagawali/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: 'rgba(10,102,194,0.07)',
              color: '#0A66C2',
              border: '1px solid rgba(10,102,194,0.18)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(10,102,194,0.13)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(10,102,194,0.07)')}
          >
            <LinkedInIcon size={15} />
            View all recommendations on LinkedIn
            <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

    </section>
  )
}
