import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// ─── Brand Data ───────────────────────────────────────────────────────────────
const BRANDS = [
  {
    id: 'bloom',
    name: 'Bloom',
    tagline: 'Wellness, Reimagined',
    category: 'Wellness App · Brand Identity',
    year: '2024',
    description:
      'Full brand identity for a mindfulness and yoga platform targeting urban professionals seeking calm in chaos. The challenge was balancing premium feel with approachability.',
    palette: [
      { hex: '#6B48FF', name: 'Bloom Purple' },
      { hex: '#A78BFA', name: 'Lavender' },
      { hex: '#10B981', name: 'Sage' },
      { hex: '#F3F0FF', name: 'Cloud' },
    ],
    typography: { display: 'Fraunces', body: 'DM Sans', style: 'Organic · Humanist' },
    personality: ['Calm', 'Premium', 'Mindful', 'Trustworthy'],
    accent: '#6B48FF',
    accentLight: '#F3F0FF',
    accentMid: '#A78BFA',
    process: [
      { step: '01', label: 'Discovery', desc: 'User research, competitor audit, brand positioning workshops' },
      { step: '02', label: 'Mood Board', desc: 'Visual direction, references, tone of voice definition' },
      { step: '03', label: 'Identity', desc: '12 logo concepts, 3 directions presented to stakeholders' },
      { step: '04', label: 'Refinement', desc: 'Iteration rounds, accessibility checks, final lock-up' },
      { step: '05', label: 'Brand System', desc: 'Full guidelines, motion principles, digital asset library' },
    ],
    metric: { value: '15K+', label: 'App downloads in launch month', sub: '4.9★ on App Store' },
    LogoMark: () => (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
        <circle cx="40" cy="40" r="38" fill="#6B48FF" fillOpacity="0.12" />
        <path d="M40 14 C40 14 54 26 54 40 C54 54 40 66 40 66 C40 66 26 54 26 40 C26 26 40 14 40 14Z" fill="#6B48FF" fillOpacity="0.25" />
        <path d="M40 22 C40 22 50 31 50 40 C50 49 40 58 40 58 C40 58 30 49 30 40 C30 31 40 22 40 22Z" fill="#6B48FF" fillOpacity="0.5" />
        <circle cx="40" cy="40" r="8" fill="#6B48FF" />
        <circle cx="40" cy="24" r="4" fill="#A78BFA" />
        <circle cx="52" cy="32" r="4" fill="#A78BFA" fillOpacity="0.7" />
        <circle cx="52" cy="48" r="4" fill="#A78BFA" fillOpacity="0.7" />
        <circle cx="40" cy="56" r="4" fill="#A78BFA" />
        <circle cx="28" cy="48" r="4" fill="#A78BFA" fillOpacity="0.7" />
        <circle cx="28" cy="32" r="4" fill="#A78BFA" fillOpacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'volta',
    name: 'Volta',
    tagline: 'Drive the Future',
    category: 'EV Startup · Brand Identity',
    year: '2024',
    description:
      'Bold, electrifying identity for an EV tech startup disrupting legacy automotive. Needed to feel powerful and cutting-edge while remaining approachable for mainstream consumers.',
    palette: [
      { hex: '#0EA5E9', name: 'Electric Blue' },
      { hex: '#0F172A', name: 'Midnight' },
      { hex: '#F59E0B', name: 'Voltage' },
      { hex: '#F0F9FF', name: 'Arctic' },
    ],
    typography: { display: 'Space Grotesk', body: 'Inter', style: 'Geometric · Bold' },
    personality: ['Bold', 'Innovative', 'Powerful', 'Clean'],
    accent: '#0EA5E9',
    accentLight: '#F0F9FF',
    accentMid: '#7DD3FC',
    process: [
      { step: '01', label: 'Competitor Audit', desc: 'Landscape analysis of Tesla, Rivian, Lucid — finding white space' },
      { step: '02', label: 'Brand Strategy', desc: 'Positioning, brand voice, promise, and archetype definition' },
      { step: '03', label: 'Identity Design', desc: 'Custom wordmark, icon system, motion language guidelines' },
      { step: '04', label: 'System Design', desc: 'UI kit, packaging, vehicle livery, environmental signage' },
      { step: '05', label: 'Rollout', desc: 'Brand launch assets, pitch deck, investor presentation' },
    ],
    metric: { value: '$2M', label: 'Seed round closed post-rebrand', sub: '300% increase in press coverage' },
    LogoMark: () => (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
        <rect x="2" y="2" width="76" height="76" rx="16" fill="#0F172A" />
        <polygon points="44,12 24,44 40,44 36,68 56,36 40,36" fill="#0EA5E9" />
        <polygon points="44,12 40,36 56,36" fill="#F59E0B" fillOpacity="0.8" />
      </svg>
    ),
  },
  {
    id: 'harvest',
    name: 'Harvest',
    tagline: 'From Earth to Table',
    category: 'Food Delivery · Brand Identity',
    year: '2023',
    description:
      'Warm, grounded identity for a farm-to-table delivery service connecting local farmers with city dwellers. The brand needed to feel trustworthy, fresh, and rooted in community.',
    palette: [
      { hex: '#F97316', name: 'Terra' },
      { hex: '#15803D', name: 'Forest' },
      { hex: '#FEF3C7', name: 'Wheat' },
      { hex: '#1C1917', name: 'Soil' },
    ],
    typography: { display: 'Lora', body: 'Source Sans Pro', style: 'Humanist · Warm' },
    personality: ['Natural', 'Honest', 'Local', 'Fresh'],
    accent: '#F97316',
    accentLight: '#FFF7ED',
    accentMid: '#FED7AA',
    process: [
      { step: '01', label: 'Discovery', desc: 'Farmer interviews, customer surveys, brand values alignment' },
      { step: '02', label: 'Positioning', desc: '"Honest food, beautiful stories" — brand narrative framework' },
      { step: '03', label: 'Visual Direction', desc: 'Earthy palette, hand-drawn textures, warm photography style' },
      { step: '04', label: 'Identity System', desc: 'Logo, packaging design, print collateral, app icon set' },
      { step: '05', label: 'Launch', desc: 'Campaign assets, social templates, farmer co-branding kit' },
    ],
    metric: { value: '3×', label: 'Revenue growth in 6 months', sub: '98% farmer partner retention' },
    LogoMark: () => (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
        <circle cx="40" cy="40" r="38" fill="#FEF3C7" />
        <path d="M40 62 C40 62 40 36 40 36" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 36 C40 36 28 28 24 18 C34 20 40 36 40 36Z" fill="#15803D" />
        <path d="M40 36 C40 36 52 28 56 18 C46 20 40 36 40 36Z" fill="#15803D" fillOpacity="0.7" />
        <path d="M40 44 C40 44 30 40 26 32 C34 32 40 44 40 44Z" fill="#15803D" fillOpacity="0.5" />
        <ellipse cx="40" cy="63" rx="10" ry="3" fill="#F97316" fillOpacity="0.3" />
        <circle cx="40" cy="18" r="5" fill="#F97316" />
        <circle cx="40" cy="18" r="3" fill="#FEF3C7" />
      </svg>
    ),
  },
]

// ─── Brand Card ───────────────────────────────────────────────────────────────
function BrandCard({ brand, index }: { brand: typeof BRANDS[0]; index: number }) {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const navigate = useNavigate()
  const flip = index % 2 === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      {/* ── Left: Brand Showcase ── */}
      <div
        className={`relative flex flex-col ${flip ? 'lg:order-2' : 'lg:order-1'}`}
        style={{ background: brand.accentLight }}
      >
        {/* Top strip — deep color */}
        <div
          className="relative flex flex-col items-center justify-center py-14 px-8 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${brand.accent}15 0%, ${brand.accentMid}20 100%)` }}
        >
          {/* Big blurred orb behind logo */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              className="w-48 h-48 rounded-full"
              style={{ background: brand.accent, filter: 'blur(70px)', opacity: 0.15 }}
            />
          </div>

          {/* Category pill */}
          <span
            className="relative z-10 text-xs font-semibold px-3 py-1 rounded-full mb-6"
            style={{ background: brand.accent + '18', color: brand.accent, border: `1px solid ${brand.accent}30` }}
          >
            {brand.category}
          </span>

          {/* Logo mark */}
          <motion.div
            className="relative z-10 mb-5"
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <brand.LogoMark />
          </motion.div>

          {/* Brand name */}
          <h3
            className="relative z-10 text-4xl font-display font-bold tracking-tight"
            style={{ color: brand.accent }}
          >
            {brand.name}
          </h3>
          <p className="relative z-10 text-sm text-gray-500 mt-1">{brand.tagline}</p>
          <p className="relative z-10 text-xs text-gray-400 mt-1">{brand.year}</p>
        </div>

        {/* Color Palette */}
        <div className="px-8 pt-7 pb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Colour Palette</p>
          <div className="flex gap-2">
            {brand.palette.map((c) => (
              <motion.div
                key={c.hex}
                whileHover={{ scaleY: 1.12 }}
                className="flex-1 group cursor-default"
              >
                <div
                  className="w-full h-10 rounded-xl mb-1.5 transition-all duration-200"
                  style={{ background: c.hex, boxShadow: `0 4px 12px ${c.hex}40` }}
                />
                <p className="text-[9px] font-medium text-gray-500 text-center leading-tight">{c.name}</p>
                <p className="text-[9px] text-gray-400 text-center font-mono">{c.hex}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="px-8 pt-5 pb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Typography</p>
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-display font-bold" style={{ color: brand.accent }}>Aa</span>
              <div>
                <p className="text-xs font-semibold text-gray-700">{brand.typography.display}</p>
                <p className="text-[10px] text-gray-400">Display · Headings</p>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-medium text-gray-500">Aa</span>
              <div>
                <p className="text-xs font-semibold text-gray-700">{brand.typography.body}</p>
                <p className="text-[10px] text-gray-400">Body · UI Copy</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-3 italic">{brand.typography.style}</p>
          </div>
        </div>
      </div>

      {/* ── Right: Brand Story ── */}
      <div
        className={`bg-white flex flex-col ${flip ? 'lg:order-1' : 'lg:order-2'}`}
      >
        {/* Description */}
        <div className="px-8 pt-10 pb-6 border-b border-gray-100">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: brand.accent }}>
            The Brief
          </p>
          <p className="text-gray-600 leading-relaxed text-sm">{brand.description}</p>

          {/* Personality chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {brand.personality.map((p) => (
              <span
                key={p}
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: brand.accent + '10', color: brand.accent, border: `1px solid ${brand.accent}25` }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="px-8 py-6 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Design Process</p>
          {brand.process.map((s, i) => (
            <motion.div
              key={s.step}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              className="cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    animate={{
                      background: activeStep === i ? brand.accent : brand.accent + '15',
                      color: activeStep === i ? '#fff' : brand.accent,
                    }}
                    style={{ border: `1.5px solid ${brand.accent}35` }}
                  >
                    {s.step}
                  </motion.div>
                  {i < brand.process.length - 1 && (
                    <div className="w-px flex-1 mt-2 mb-0" style={{ background: brand.accent + '20' }} />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">{s.label}</p>
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-gray-500 leading-relaxed overflow-hidden"
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outcome metric */}
        <div
          className="mx-8 mb-8 rounded-2xl p-5 flex items-center gap-5"
          style={{
            background: `linear-gradient(135deg, ${brand.accent}10, ${brand.accentMid}15)`,
            border: `1px solid ${brand.accent}25`,
          }}
        >
          <div>
            <p
              className="text-3xl font-display font-bold leading-none"
              style={{ color: brand.accent }}
            >
              {brand.metric.value}
            </p>
            <p className="text-sm text-gray-600 mt-1 font-medium">{brand.metric.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{brand.metric.sub}</p>
          </div>
          <div
            className="ml-auto w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: brand.accent + '18' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
        </div>

        {/* View Case Study button */}
        <div className="mx-8 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/brand/${brand.id}`)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentMid})`,
              color: 'white',
              boxShadow: `0 4px 16px ${brand.accent}35`,
            }}
          >
            View Full Case Study
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function BrandDesign() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="brand"
      className="py-24 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span
            className="inline-block text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
            style={{ color: 'var(--primary-color)' }}
          >
            Brand Identity
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
            Building Brands People Remember
          </h2>
          <p className="text-lg opacity-70">
            From discovery to delivery — full-spectrum brand identity design for startups and growing businesses.
          </p>
        </motion.div>

        {/* Process legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {['Research', 'Strategy', 'Identity', 'System', 'Launch'].map((phase, i) => (
            <div key={phase} className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', color: '#64748b' }}
              >
                {String(i + 1).padStart(2, '0')} {phase}
              </span>
              {i < 4 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
            </div>
          ))}
        </motion.div>

        {/* Brand Cards */}
        <div className="space-y-10">
          {BRANDS.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 mb-5 text-sm">Interested in working together on your brand?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-white transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #818cf8)', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}
          >
            Start a Brand Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
