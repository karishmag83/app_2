import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// ─── Brand Database ───────────────────────────────────────────────────────────
const BRANDS: Record<string, BrandData> = {
  bloom: {
    id: 'bloom', name: 'Bloom', tagline: 'Wellness, Reimagined',
    category: 'Wellness App · Brand Identity', year: '2024', duration: '8 weeks',
    role: 'Brand Identity Designer',
    deliverables: ['Logo System', 'Colour Palette', 'Typography', 'Brand Guidelines', 'App Icon', 'Social Templates'],
    accent: '#6B48FF', accentLight: '#F3F0FF', accentMid: '#A78BFA', accentDark: '#4C1D95',
    bgHero: 'linear-gradient(160deg, #F3F0FF 0%, #EDE9FE 60%, #C4B5FD 100%)',
    challenge: 'Bloom needed a brand identity that could compete with Calm and Headspace while carving out a distinctly premium, human-centred niche. The existing visual identity was generic — indistinguishable from dozens of wellness apps. The brief was to create something that felt both ancient (rooted in yoga tradition) and modern (digital-first, Gen Z appeal).',
    audience: [
      { type: 'The Burnout Professional', age: '28–38', desc: 'Works 60-hour weeks, uses the app during commute. Values efficiency — wants results in 10-minute sessions.', icon: '💼' },
      { type: 'The Mindful Parent', age: '32–44', desc: 'Squeezes in practice during nap times. Needs calming UI, no overwhelming notifications, family-friendly.', icon: '🌿' },
      { type: 'The Yoga Curious', age: '22–30', desc: 'Never done yoga, intimidated by studios. Needs beginner-safe content and a non-judgmental brand voice.', icon: '✨' },
    ],
    positioning: 'Where ancient wisdom meets modern simplicity. Not a fitness app. Not a meditation app. A space to come home to.',
    moodboard: [
      { color: '#6B48FF', label: 'Bloom Purple', mood: 'Trust · Depth' },
      { color: '#A78BFA', label: 'Lavender', mood: 'Calm · Gentle' },
      { color: '#10B981', label: 'Sage', mood: 'Growth · Balance' },
      { color: '#F9FAFB', label: 'Cloud', mood: 'Clean · Open' },
      { color: '#1E1B4B', label: 'Midnight', mood: 'Premium · Grounded' },
    ],
    moodKeywords: ['Botanical', 'Japanese Minimalism', 'Sacred Geometry', 'Soft Light', 'Wabi-Sabi'],
    logoConcepts: [
      { label: 'Concept A', desc: 'Abstract petal ring — felt too generic, similar to competitor marks', chosen: false },
      { label: 'Concept B', desc: 'Lettermark "B" with lotus — too literal, lost meaning at small sizes', chosen: false },
      { label: 'Concept C', desc: 'Radial bloom — 6 petals from centre, scalable, sacred geometry feel', chosen: true },
      { label: 'Concept D', desc: 'Wordmark only — versatile but lacks brand recall without icon', chosen: false },
    ],
    palette: [
      { hex: '#6B48FF', name: 'Bloom Purple', use: 'Primary — CTAs, headings, key UI' },
      { hex: '#A78BFA', name: 'Lavender', use: 'Secondary — backgrounds, accents' },
      { hex: '#10B981', name: 'Sage', use: 'Success states, nature elements' },
      { hex: '#F3F0FF', name: 'Cloud', use: 'Light backgrounds, cards' },
      { hex: '#1E1B4B', name: 'Midnight', use: 'Dark mode, premium feel' },
    ],
    typeDisplay: { name: 'Fraunces', style: 'Optical · Variable', use: 'Headlines, hero text, pull quotes' },
    typeBody: { name: 'DM Sans', style: 'Geometric · Friendly', use: 'UI copy, body text, labels' },
    typeSample: 'Find your calm.',
    voice: {
      adjectives: ['Gentle', 'Wise', 'Encouraging', 'Unhurried', 'Honest'],
      doSay: ['"Take a breath. You\'re here now."', '"Small steps, big shifts."', '"Your practice, your pace."'],
      dontSay: ['"Crush your goals"', '"No excuses"', '"Hustle"'],
    },
    applications: [
      { type: 'App Icon', desc: 'Bloom mark on gradient purple — recognisable at 29px' },
      { type: 'Onboarding Card', desc: 'Full-bleed lavender, centered mark, serif headline' },
      { type: 'Social Post', desc: 'Daily quote template — clean, shareable, on-brand' },
      { type: 'Yoga Mat', desc: 'Tone-on-tone bloom mark, sage colourway' },
    ],
    outcome: {
      metrics: [
        { value: '15K+', label: 'Downloads in launch month' },
        { value: '4.9★', label: 'App Store rating' },
        { value: '$500K', label: 'Pre-seed funding secured' },
        { value: '92%', label: 'Brand recognition in user tests' },
      ],
      quote: '"The brand made us feel like we\'d always existed. That\'s exactly what we wanted."',
      quoteBy: '— Maya R., Bloom Co-Founder',
    },
    LogoMark: () => (
      <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
        <circle cx="60" cy="60" r="56" fill="#6B48FF" fillOpacity="0.08" />
        <circle cx="60" cy="60" r="10" fill="#6B48FF" />
        <circle cx="60" cy="30" r="7" fill="#A78BFA" /><circle cx="86" cy="45" r="7" fill="#A78BFA" fillOpacity="0.8" />
        <circle cx="86" cy="75" r="7" fill="#A78BFA" fillOpacity="0.8" /><circle cx="60" cy="90" r="7" fill="#A78BFA" />
        <circle cx="34" cy="75" r="7" fill="#A78BFA" fillOpacity="0.8" /><circle cx="34" cy="45" r="7" fill="#A78BFA" fillOpacity="0.8" />
        <path d="M60 50 C60 50 54 40 60 30 C66 40 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 70 50 78 44 C74 56 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 66 61 74 66 C62 68 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 54 61 46 66 C34 64 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 42 50 46 44 C50 38 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
      </svg>
    ),
  },

  volta: {
    id: 'volta', name: 'Volta', tagline: 'Drive the Future',
    category: 'EV Startup · Brand Identity', year: '2024', duration: '10 weeks',
    role: 'Brand Identity & Strategy Designer',
    deliverables: ['Brand Strategy', 'Logo System', 'Motion Identity', 'UI Kit', 'Vehicle Livery', 'Investor Deck Branding'],
    accent: '#0EA5E9', accentLight: '#F0F9FF', accentMid: '#7DD3FC', accentDark: '#0369A1',
    bgHero: 'linear-gradient(135deg, #0F172A 0%, #0C2341 50%, #0F172A 100%)',
    challenge: 'Volta was entering a crowded EV market dominated by Tesla\'s cold minimalism, Rivian\'s adventure-outdoor positioning, and Lucid\'s ultra-luxury angle. They needed a brand that felt powerful and technical without alienating mainstream buyers.',
    audience: [
      { type: 'The Tech Early Adopter', age: '30–42', desc: 'Already has solar panels. Cares about specs first, aesthetics second. Range anxiety is real.', icon: '⚡' },
      { type: 'The Conscious Commuter', age: '28–40', desc: 'Drives 40 miles daily, wants to cut fuel costs. Climate-conscious but budget-aware.', icon: '🌍' },
      { type: 'The Status Seeker', age: '35–50', desc: 'Switches from BMW or Audi. EV is a status signal. Wants it to look as premium as it performs.', icon: '🚗' },
    ],
    positioning: 'Not just electric. Electrifying. Volta doesn\'t ask you to sacrifice power for principle — it proves you never had to choose.',
    moodboard: [
      { color: '#0EA5E9', label: 'Electric Blue', mood: 'Speed · Innovation' },
      { color: '#0F172A', label: 'Midnight', mood: 'Power · Premium' },
      { color: '#F59E0B', label: 'Voltage', mood: 'Energy · Warning' },
      { color: '#F8FAFC', label: 'Arctic', mood: 'Clean · Pure' },
      { color: '#334155', label: 'Carbon', mood: 'Technical · Solid' },
    ],
    moodKeywords: ['Aerospace', 'Speed Lines', 'Electric Light', 'Minimalist Tech', 'Night Drives'],
    logoConcepts: [
      { label: 'Concept A', desc: 'Abstract lightning bolt — too generic, used by 200+ energy brands', chosen: false },
      { label: 'Concept B', desc: 'Monogram "V" with negative space bolt integrated — strong, scalable', chosen: true },
      { label: 'Concept C', desc: 'Custom wordmark "VOLTA" with electrified letterforms — too complex', chosen: false },
      { label: 'Concept D', desc: 'Circle badge with chevron — felt too automotive, not tech-forward', chosen: false },
    ],
    palette: [
      { hex: '#0EA5E9', name: 'Electric Blue', use: 'Primary — hero moments, CTAs, UI highlights' },
      { hex: '#0F172A', name: 'Midnight', use: 'Dark backgrounds, premium surfaces' },
      { hex: '#F59E0B', name: 'Voltage', use: 'Alerts, energy indicators, key callouts' },
      { hex: '#F8FAFC', name: 'Arctic', use: 'Light mode, clean backgrounds' },
      { hex: '#334155', name: 'Carbon', use: 'Secondary text, technical UI' },
    ],
    typeDisplay: { name: 'Space Grotesk', style: 'Geometric · Bold', use: 'Headlines, vehicle names, bold statements' },
    typeBody: { name: 'Inter', style: 'System · Precise', use: 'Spec sheets, UI copy, technical documentation' },
    typeSample: 'Zero to sixty.',
    voice: {
      adjectives: ['Confident', 'Direct', 'Ambitious', 'Intelligent', 'Energised'],
      doSay: ['"Built for those who move the world."', '"Range without compromise."', '"Your road. Your rules."'],
      dontSay: ['"Eco-friendly option"', '"Save the planet"', '"Alternative vehicle"'],
    },
    applications: [
      { type: 'Vehicle Livery', desc: 'Midnight body with Electric Blue accent stripe, bold wordmark' },
      { type: 'Charging Station UI', desc: 'Dark interface, blue energy indicators, crisp typography' },
      { type: 'Investor Deck', desc: 'Full-bleed midnight slides, data-forward, minimal chrome' },
      { type: 'Brand Brochure', desc: 'Landscape format, spec-forward layout, photography treatment' },
    ],
    outcome: {
      metrics: [
        { value: '$2M', label: 'Seed round closed post-rebrand' },
        { value: '50K+', label: 'Pre-order waitlist' },
        { value: '300%', label: 'Increase in press coverage' },
        { value: '8', label: 'Auto show features in year one' },
      ],
      quote: '"Investors said the brand made us look like a $50M company. We were pre-revenue."',
      quoteBy: '— Dani K., Volta CEO',
    },
    LogoMark: () => (
      <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
        <rect x="4" y="4" width="112" height="112" rx="24" fill="#0F172A" />
        <polygon points="68,16 36,64 60,64 52,104 84,56 60,56" fill="#0EA5E9" />
        <polygon points="68,16 60,56 84,56" fill="#F59E0B" fillOpacity="0.9" />
        <rect x="4" y="4" width="112" height="112" rx="24" fill="none" stroke="#0EA5E9" strokeWidth="1.5" strokeOpacity="0.3" />
      </svg>
    ),
  },

  harvest: {
    id: 'harvest', name: 'Harvest', tagline: 'From Earth to Table',
    category: 'Food Delivery · Brand Identity', year: '2023', duration: '6 weeks',
    role: 'Brand Identity Designer',
    deliverables: ['Logo System', 'Packaging Design', 'Colour & Type System', 'App Icon', 'Farmer Co-branding Kit', 'Social Templates'],
    accent: '#F97316', accentLight: '#FFF7ED', accentMid: '#FED7AA', accentDark: '#C2410C',
    bgHero: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #FDE68A 100%)',
    challenge: 'Harvest was competing against Instacart, Imperfect Foods, and Thrive Market. None of them told the story of the farmers behind the food. Harvest\'s advantage was relationships — 500+ local farm partners. The brand needed to make customers feel that relationship too.',
    audience: [
      { type: 'The Conscious Family', age: '30–45', desc: 'Two kids, reads ingredient labels, shops farmers markets on weekends. Will pay 20% more for local + organic.', icon: '🌾' },
      { type: 'The Urban Health-Seeker', age: '25–35', desc: 'Meal preps on Sundays. Wants premium ingredients delivered with zero effort.', icon: '🥗' },
      { type: 'The Community Supporter', age: '35–55', desc: 'Buys local on principle, not price. Knows their farmer by name. Brand story matters.', icon: '🤝' },
    ],
    positioning: '"Honest food, beautiful stories." Harvest doesn\'t just deliver groceries — it delivers a relationship between people who grow food and people who eat it.',
    moodboard: [
      { color: '#F97316', label: 'Terra', mood: 'Warmth · Energy' },
      { color: '#15803D', label: 'Forest', mood: 'Life · Trust' },
      { color: '#FEF3C7', label: 'Wheat', mood: 'Natural · Warm' },
      { color: '#1C1917', label: 'Soil', mood: 'Grounded · Rich' },
      { color: '#FED7AA', label: 'Peach', mood: 'Friendly · Approachable' },
    ],
    moodKeywords: ['Farmers Markets', 'Hand-drawn Textures', 'Rustic Craft', 'Morning Light', 'Terroir'],
    logoConcepts: [
      { label: 'Concept A', desc: 'Barn icon — too clichéd, reads as "American Midwest farm" not artisan', chosen: false },
      { label: 'Concept B', desc: 'Leaf + circle monogram — clean and scalable, passed stakeholder review', chosen: false },
      { label: 'Concept C', desc: 'Hand-drawn grain stalk with sun mark — warm, artisan, story-led', chosen: true },
      { label: 'Concept D', desc: 'Fork and leaf combination — too close to existing restaurant brands', chosen: false },
    ],
    palette: [
      { hex: '#F97316', name: 'Terra', use: 'Primary — logo, CTAs, packaging accent' },
      { hex: '#15803D', name: 'Forest', use: 'Secondary — fresh produce, healthy indicators' },
      { hex: '#FEF3C7', name: 'Wheat', use: 'Light backgrounds, packaging base colour' },
      { hex: '#1C1917', name: 'Soil', use: 'Headlines, rich body text' },
      { hex: '#FED7AA', name: 'Peach', use: 'Highlights, tags, card backgrounds' },
    ],
    typeDisplay: { name: 'Lora', style: 'Serif · Humanist', use: 'Brand name, headlines, farmer stories' },
    typeBody: { name: 'Source Sans Pro', style: 'Humanist · Readable', use: 'Product descriptions, UI copy, ingredients' },
    typeSample: 'Grown with love.',
    voice: {
      adjectives: ['Warm', 'Honest', 'Community-first', 'Knowledgeable', 'Unpretentious'],
      doSay: ['"Meet the farmer behind your salad."', '"Good food takes good care."', '"Your table, their hands."'],
      dontSay: ['"Premium organic"', '"Disrupting food"', '"Superfoods only"'],
    },
    applications: [
      { type: 'Delivery Box', desc: 'Kraft box with stamp-print logo, Terra orange tape, handwritten note slot' },
      { type: 'App Interface', desc: 'Warm wheat bg, farmer profile cards, story-forward product pages' },
      { type: 'Farmer Co-branding', desc: 'Each partner gets a co-branded "Harvest Partner" badge kit' },
      { type: 'Social Template', desc: '"Farm Spotlight" weekly series — farmer portrait + origin story' },
    ],
    outcome: {
      metrics: [
        { value: '3×', label: 'Revenue growth in 6 months' },
        { value: '98%', label: 'Farmer partner retention rate' },
        { value: '500+', label: 'Local farm partnerships' },
        { value: '4.8★', label: 'Average customer rating' },
      ],
      quote: '"People started recognising our boxes before they even opened them. That\'s brand power."',
      quoteBy: '— Sam O., Harvest Founder',
    },
    LogoMark: () => (
      <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
        <circle cx="60" cy="60" r="56" fill="#FEF3C7" />
        <line x1="60" y1="90" x2="60" y2="45" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 45 C60 45 42 36 36 20 C50 24 60 45 60 45Z" fill="#15803D" />
        <path d="M60 45 C60 45 78 36 84 20 C70 24 60 45 60 45Z" fill="#15803D" fillOpacity="0.75" />
        <path d="M60 58 C60 58 46 53 40 40 C52 40 60 58 60 58Z" fill="#15803D" fillOpacity="0.55" />
        <ellipse cx="60" cy="91" rx="14" ry="4" fill="#F97316" fillOpacity="0.25" />
        <circle cx="60" cy="20" r="7" fill="#F97316" /><circle cx="60" cy="20" r="4" fill="#FEF3C7" />
      </svg>
    ),
  },
}

type BrandData = {
  id: string; name: string; tagline: string; category: string; year: string; duration: string; role: string
  deliverables: string[]; accent: string; accentLight: string; accentMid: string; accentDark: string; bgHero: string
  challenge: string; audience: { type: string; age: string; desc: string; icon: string }[]
  positioning: string; moodboard: { color: string; label: string; mood: string }[]; moodKeywords: string[]
  logoConcepts: { label: string; desc: string; chosen: boolean }[]
  palette: { hex: string; name: string; use: string }[]
  typeDisplay: { name: string; style: string; use: string }; typeBody: { name: string; style: string; use: string }
  typeSample: string; voice: { adjectives: string[]; doSay: string[]; dontSay: string[] }
  applications: { type: string; desc: string }[]
  outcome: { metrics: { value: string; label: string }[]; quote: string; quoteBy: string }
  LogoMark: () => React.ReactElement
}

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>{children}</motion.div>
)

// ═══════════════════════════════════════════════════════════════════════════════
// BLOOM LAYOUT — Editorial Magazine: centered, airy, large typographic moments
// ═══════════════════════════════════════════════════════════════════════════════
function BloomLayout({ brand, onBack }: { brand: BrandData; onBack: () => void }) {
  return (
    <div className="min-h-screen" style={{ background: '#FDFCFF', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero — full-width lavender gradient, centered */}
      <div className="relative overflow-hidden min-h-[85vh] flex flex-col items-center justify-center text-center" style={{ background: brand.bgHero }}>
        <button onClick={onBack} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full" style={{ background: 'rgba(107,72,255,0.1)', color: brand.accentDark, border: '1px solid rgba(107,72,255,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>Back
        </button>
        {/* Large blurred orbs */}
        <div className="absolute top-[-20%] left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(107,72,255,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[5%] w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />

        <motion.div initial={{ opacity: 0, scale: 0.7, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="w-36 h-36 mb-6 drop-shadow-xl">
          <brand.LogoMark />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: brand.accent }}>{brand.category}</p>
          <h1 className="text-6xl lg:text-8xl font-display font-bold mb-3" style={{ color: brand.accentDark }}>{brand.name}</h1>
          <p className="text-xl text-gray-500 mb-10">{brand.tagline}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[brand.year, brand.duration, brand.role].map(v => (
              <span key={v} className="text-sm px-4 py-2 rounded-full font-medium" style={{ background: 'rgba(107,72,255,0.08)', color: brand.accentDark, border: '1px solid rgba(107,72,255,0.18)' }}>{v}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Deliverables strip */}
      <div className="py-6 border-y border-purple-100 overflow-x-auto" style={{ background: '#F8F7FF' }}>
        <div className="flex items-center justify-center gap-6 px-6 flex-wrap">
          {brand.deliverables.map((d, i) => (
            <div key={d} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">{d}</span>
              {i < brand.deliverables.length - 1 && <span className="w-1.5 h-1.5 rounded-full" style={{ background: brand.accentMid }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">

        {/* Challenge */}
        <FadeUp className="py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>The Brief</p>
          <h2 className="text-4xl font-display font-bold mb-8 text-gray-900">The Challenge</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{brand.challenge}</p>
        </FadeUp>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-20"><div className="flex-1 h-px bg-purple-100" /><div className="w-2 h-2 rounded-full" style={{ background: brand.accentMid }} /><div className="flex-1 h-px bg-purple-100" /></div>

        {/* Audience — circular profile cards */}
        <FadeUp className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Research</p>
          <h2 className="text-4xl font-display font-bold mb-10 text-gray-900">Who We're Designing For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {brand.audience.map((a, i) => (
              <motion.div key={a.type} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center p-6 rounded-[2rem]" style={{ background: brand.accentLight, border: `1px solid ${brand.accent}20` }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4" style={{ background: `linear-gradient(135deg, ${brand.accent}18, ${brand.accentMid}30)` }}>{a.icon}</div>
                <p className="font-bold text-gray-900 mb-1 text-sm">{a.type}</p>
                <p className="text-xs font-semibold mb-3" style={{ color: brand.accent }}>Age {a.age}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Positioning — full-width pull quote */}
        <FadeUp className="mb-20">
          <div className="rounded-[2.5rem] p-12 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brand.accentDark}, ${brand.accent})` }}>
            <div className="absolute -top-4 -left-4 text-[120px] font-serif opacity-10 text-white leading-none select-none">"</div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5 text-white/60">Brand Positioning</p>
            <p className="text-2xl font-display font-semibold text-white leading-relaxed relative z-10">{brand.positioning}</p>
          </div>
        </FadeUp>

        {/* Moodboard — horizontal colour flow */}
        <FadeUp className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Visual Direction</p>
          <h2 className="text-4xl font-display font-bold mb-10 text-gray-900">Moodboard</h2>
          <div className="flex gap-3 mb-6">
            {brand.moodboard.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, scaleY: 0.6 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex-1 flex flex-col gap-2">
                <div className="h-32 rounded-2xl" style={{ background: m.color, boxShadow: `0 8px 24px ${m.color}40` }} />
                <p className="text-xs font-semibold text-gray-700">{m.label}</p>
                <p className="text-[10px] text-gray-400 italic">{m.mood}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {brand.moodKeywords.map(k => <span key={k} className="text-xs italic px-3 py-1.5 rounded-full text-gray-500" style={{ background: brand.accentLight }}>{k}</span>)}
          </div>
        </FadeUp>

        {/* Logo exploration */}
        <FadeUp className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Identity Design</p>
          <h2 className="text-4xl font-display font-bold mb-10 text-gray-900">Logo Exploration</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {brand.logoConcepts.map((c) => (
              <div key={c.label} className="rounded-2xl p-6 text-left relative" style={{ background: c.chosen ? `${brand.accent}08` : 'rgba(0,0,0,0.02)', border: c.chosen ? `2px solid ${brand.accent}50` : '1px solid rgba(0,0,0,0.07)', boxShadow: c.chosen ? `0 0 32px ${brand.accent}20` : 'none' }}>
                {c.chosen && <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: brand.accent }}>CHOSEN ✓</span>}
                <p className="font-bold text-gray-800 mb-1 text-sm">{c.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[2rem] p-12 flex flex-col items-center" style={{ background: `linear-gradient(160deg, ${brand.accentLight}, ${brand.accentMid}40)`, border: `1px solid ${brand.accent}20` }}>
            <div className="w-28 h-28 mb-5 drop-shadow-lg"><brand.LogoMark /></div>
            <p className="font-display font-bold text-3xl mb-1" style={{ color: brand.accentDark }}>{brand.name}</p>
            <p className="text-sm text-gray-500">{brand.tagline}</p>
          </div>
        </FadeUp>

        {/* Colour system */}
        <FadeUp className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Colour System</p>
          <h2 className="text-4xl font-display font-bold mb-10 text-gray-900">The Palette</h2>
          <div className="flex gap-2 h-40 rounded-2xl overflow-hidden mb-8 shadow-lg">
            {brand.palette.map(c => <div key={c.hex} className="flex-1 transition-all duration-300 hover:flex-[2]" style={{ background: c.hex }} title={c.name} />)}
          </div>
          <div className="grid grid-cols-5 gap-3">
            {brand.palette.map(c => (
              <div key={c.hex} className="text-center">
                <p className="text-xs font-semibold text-gray-800 mb-0.5">{c.name}</p>
                <p className="text-[10px] font-mono text-gray-400">{c.hex}</p>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">{c.use.split(' — ')[0]}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Typography — full bleed */}
      <FadeUp className="mb-20">
        <div className="py-20 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brand.accentDark} 0%, ${brand.accent} 100%)` }}>
          <div className="absolute inset-0 opacity-5 text-white text-[300px] font-display font-bold flex items-center justify-center select-none overflow-hidden leading-none">Aa</div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/50 relative z-10">Typography</p>
          <p className="text-7xl lg:text-9xl font-display font-bold text-white relative z-10 mb-6">{brand.typeSample}</p>
          <div className="flex justify-center gap-12 relative z-10">
            <div className="text-center"><p className="text-white font-semibold text-sm">{brand.typeDisplay.name}</p><p className="text-white/50 text-xs">{brand.typeDisplay.style}</p></div>
            <div className="w-px bg-white/20" />
            <div className="text-center"><p className="text-white font-semibold text-sm">{brand.typeBody.name}</p><p className="text-white/50 text-xs">{brand.typeBody.style}</p></div>
          </div>
        </div>
      </FadeUp>

      <div className="max-w-3xl mx-auto px-6">

        {/* Brand Voice */}
        <FadeUp className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Brand Voice</p>
          <h2 className="text-4xl font-display font-bold mb-6 text-gray-900">Tone & Personality</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {brand.voice.adjectives.map(a => <span key={a} className="text-sm font-semibold px-4 py-2 rounded-full" style={{ background: brand.accent + '12', color: brand.accent, border: `1px solid ${brand.accent}25` }}>{a}</span>)}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-6 text-left" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-4">✓ We say</p>
              <div className="space-y-3">{brand.voice.doSay.map(s => <p key={s} className="text-sm text-gray-700 font-medium">{s}</p>)}</div>
            </div>
            <div className="rounded-2xl p-6 text-left" style={{ background: '#FFF1F2', border: '1px solid #FECDD3' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">✗ We don't say</p>
              <div className="space-y-3">{brand.voice.dontSay.map(s => <p key={s} className="text-sm text-gray-500 line-through">{s}</p>)}</div>
            </div>
          </div>
        </FadeUp>

        {/* Applications */}
        <FadeUp className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Applications</p>
          <h2 className="text-4xl font-display font-bold mb-10 text-gray-900">Brand in the Wild</h2>
          <div className="grid grid-cols-2 gap-4">
            {brand.applications.map((app, i) => (
              <motion.div key={app.type} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 text-left" style={{ background: i % 2 === 0 ? brand.accentLight : `linear-gradient(135deg, ${brand.accent}10, ${brand.accentMid}18)`, border: `1px solid ${brand.accent}20` }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentMid})` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
                <p className="font-bold text-gray-800 mb-1 text-sm">{app.type}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Outcome */}
        <FadeUp className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Results</p>
          <h2 className="text-4xl font-display font-bold mb-10 text-gray-900">The Outcome</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {brand.outcome.metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl p-5" style={{ background: brand.accentLight, border: `1px solid ${brand.accent}20` }}>
                <p className="text-3xl font-display font-bold mb-1" style={{ color: brand.accent }}>{m.value}</p>
                <p className="text-xs text-gray-500 leading-snug">{m.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="rounded-[2rem] p-10 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brand.accentDark}, ${brand.accent})` }}>
            <div className="absolute top-4 left-6 text-8xl font-serif opacity-20 text-white leading-none">"</div>
            <p className="text-white text-xl font-display font-medium leading-relaxed mb-4 relative z-10">{brand.outcome.quote}</p>
            <p className="text-white/60 text-sm relative z-10">{brand.outcome.quoteBy}</p>
          </div>
        </FadeUp>

      </div>

      {/* Footer */}
      <div className="border-t py-10" style={{ borderColor: `${brand.accent}20` }}>
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>Back to Portfolio
          </button>
          <p className="text-xs text-gray-400">Brand Identity · {brand.name} · {brand.year}</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HARVEST LAYOUT — Artisan Journal: warm paper, earthy, scrapbook asymmetry
// ═══════════════════════════════════════════════════════════════════════════════
function HarvestLayout({ brand, onBack }: { brand: BrandData; onBack: () => void }) {
  return (
    <div className="min-h-screen" style={{ background: '#FFFCF5' }}>

      {/* Hero — split layout: left text, right big logo on terracotta circle */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)' }}>
        <button onClick={onBack} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full" style={{ background: 'rgba(249,115,22,0.1)', color: brand.accentDark, border: '1px solid rgba(249,115,22,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>Back
        </button>
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-5 gap-0 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="md:col-span-3 pr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: brand.accent, maxWidth: 40 }} />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: brand.accent }}>{brand.category}</p>
            </div>
            <h1 className="text-6xl lg:text-7xl font-display font-bold mb-4 leading-tight" style={{ color: '#1C1917' }}>{brand.name}</h1>
            <p className="text-xl text-gray-600 mb-8 font-display italic">{brand.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {[{ l: 'Year', v: brand.year }, { l: 'Duration', v: brand.duration }, { l: 'Role', v: brand.role }].map(m => (
                <div key={m.l} className="px-4 py-2 rounded-xl" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{m.l}</p>
                  <p className="text-sm font-semibold" style={{ color: '#1C1917' }}>{m.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="md:col-span-2 flex items-center justify-center">
            <div className="relative">
              <div className="w-56 h-56 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentDark})`, boxShadow: `0 24px 60px ${brand.accent}40` }}>
                <div className="w-36 h-36"><brand.LogoMark /></div>
              </div>
              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full text-xs font-bold text-white" style={{ background: '#15803D' }}>2023</div>
            </div>
          </motion.div>
        </div>

        {/* Deliverables as orange tags */}
        <div className="border-t py-4 px-6" style={{ borderColor: 'rgba(249,115,22,0.15)' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
            {brand.deliverables.map(d => <span key={d} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: brand.accentMid + '60', color: brand.accentDark }}>{d}</span>)}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Challenge — left-accent tab style */}
        <FadeUp>
          <div className="pl-6" style={{ borderLeft: `4px solid ${brand.accent}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brand.accent }}>The Brief</p>
            <h2 className="text-3xl font-display font-bold mb-4" style={{ color: '#1C1917' }}>The Challenge</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl">{brand.challenge}</p>
          </div>
        </FadeUp>

        {/* Audience — horizontal story cards */}
        <FadeUp>
          <div className="pl-6 mb-6" style={{ borderLeft: `4px solid #15803D` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#15803D' }}>Research</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: '#1C1917' }}>Who We're Designing For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {brand.audience.map((a, i) => (
              <motion.div key={a.type} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(249,115,22,0.15)' }}>
                <div className="h-2" style={{ background: i === 0 ? brand.accent : i === 1 ? '#15803D' : brand.accentMid }} />
                <div className="p-5" style={{ background: '#FFFCF5' }}>
                  <span className="text-3xl block mb-3">{a.icon}</span>
                  <p className="font-bold mb-0.5" style={{ color: '#1C1917' }}>{a.type}</p>
                  <p className="text-xs font-semibold mb-3" style={{ color: brand.accent }}>Age {a.age}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Positioning — chalkboard sign feel */}
        <FadeUp>
          <div className="rounded-3xl p-10 relative" style={{ background: '#1C1917' }}>
            <div className="absolute top-6 right-6 w-8 h-8 rounded-full border-2 border-dashed opacity-20" style={{ borderColor: brand.accent }} />
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Brand Positioning</p>
            <p className="font-display text-2xl font-semibold leading-relaxed" style={{ color: '#FEF3C7' }}>{brand.positioning}</p>
          </div>
        </FadeUp>

        {/* Moodboard — paint chips */}
        <FadeUp>
          <div className="pl-6 mb-6" style={{ borderLeft: `4px solid ${brand.accentMid}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brand.accent }}>Visual Direction</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: '#1C1917' }}>Moodboard</h2>
          </div>
          <div className="flex gap-3 mb-5">
            {brand.moodboard.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex-1 rounded-xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                <div className="h-28" style={{ background: m.color }} />
                <div className="p-3" style={{ background: '#FFF7ED' }}>
                  <p className="text-xs font-bold" style={{ color: '#1C1917' }}>{m.label}</p>
                  <p className="text-[10px] text-gray-500">{m.mood}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {brand.moodKeywords.map(k => <span key={k} className="text-xs italic px-3 py-1.5 rounded-full" style={{ background: brand.accentMid + '40', color: brand.accentDark }}>{k}</span>)}
          </div>
        </FadeUp>

        {/* Logo Exploration — stamp cards on kraft bg */}
        <FadeUp>
          <div className="pl-6 mb-6" style={{ borderLeft: `4px solid ${brand.accent}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brand.accent }}>Identity Design</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: '#1C1917' }}>Logo Exploration</h2>
          </div>
          <div className="rounded-3xl p-6" style={{ background: '#FEF3C7' }}>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {brand.logoConcepts.map(c => (
                <div key={c.label} className="rounded-xl p-4 flex gap-3 items-start relative" style={{ background: c.chosen ? 'white' : 'rgba(255,255,255,0.5)', border: c.chosen ? `2px solid ${brand.accent}` : '1px solid rgba(249,115,22,0.15)', boxShadow: c.chosen ? `0 4px 20px ${brand.accent}25` : 'none' }}>
                  {c.chosen && <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: brand.accent }}>✓ SELECTED</span>}
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ background: c.chosen ? brand.accent : 'rgba(249,115,22,0.15)', color: c.chosen ? 'white' : brand.accentDark }}>{c.label.slice(-1)}</div>
                  <div><p className="font-semibold text-sm mb-0.5" style={{ color: '#1C1917' }}>{c.label}</p><p className="text-xs text-gray-500">{c.desc}</p></div>
                </div>
              ))}
            </div>
            {/* Final mark */}
            <div className="rounded-2xl p-8 flex items-center justify-center gap-8" style={{ background: 'white', border: `2px dashed ${brand.accent}30` }}>
              <div className="w-24 h-24"><brand.LogoMark /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: brand.accent }}>Final Mark</p>
                <p className="font-display font-bold text-3xl" style={{ color: '#1C1917' }}>{brand.name}</p>
                <p className="text-sm text-gray-500">{brand.tagline}</p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Colour — stacked horizontal bars */}
        <FadeUp>
          <div className="pl-6 mb-6" style={{ borderLeft: `4px solid #15803D` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#15803D' }}>Colour System</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: '#1C1917' }}>The Palette</h2>
          </div>
          <div className="space-y-2">
            {brand.palette.map((c, i) => (
              <motion.div key={c.hex} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="w-20 h-14 shrink-0" style={{ background: c.hex }} />
                <div className="flex-1 py-3 pr-4">
                  <div className="flex items-baseline gap-3"><p className="font-semibold text-sm" style={{ color: '#1C1917' }}>{c.name}</p><p className="text-xs font-mono text-gray-400">{c.hex}</p></div>
                  <p className="text-xs text-gray-500 mt-0.5">{c.use}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Typography — dark soil section */}
        <FadeUp>
          <div className="rounded-3xl overflow-hidden">
            <div className="p-10" style={{ background: '#1C1917' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brand.accent }}>Typography</p>
              <p className="font-display text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#FEF3C7' }}>{brand.typeSample}</p>
              <div className="flex gap-10">
                <div><p className="font-semibold text-sm" style={{ color: '#FEF3C7' }}>{brand.typeDisplay.name}</p><p className="text-xs" style={{ color: 'rgba(254,243,199,0.5)' }}>{brand.typeDisplay.style} · {brand.typeDisplay.use}</p></div>
                <div><p className="font-semibold text-sm" style={{ color: '#FEF3C7' }}>{brand.typeBody.name}</p><p className="text-xs" style={{ color: 'rgba(254,243,199,0.5)' }}>{brand.typeBody.style} · {brand.typeBody.use}</p></div>
              </div>
            </div>
            <div className="px-10 py-6 flex gap-3 flex-wrap" style={{ background: brand.accentMid + '40' }}>
              <p className="text-sm" style={{ color: '#1C1917' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="text-sm text-gray-600">abcdefghijklmnopqrstuvwxyz</p>
              <p className="text-sm text-gray-600">0123456789 !@#$%</p>
            </div>
          </div>
        </FadeUp>

        {/* Brand Voice — recipe card */}
        <FadeUp>
          <div className="pl-6 mb-6" style={{ borderLeft: `4px solid ${brand.accent}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brand.accent }}>Brand Voice</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: '#1C1917' }}>Tone & Personality</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {brand.voice.adjectives.map(a => <span key={a} className="text-sm font-semibold px-4 py-2 rounded-full" style={{ background: brand.accentMid + '50', color: brand.accentDark }}>{a}</span>)}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #BBF7D0' }}>
              <div className="px-5 py-3" style={{ background: '#15803D' }}><p className="text-xs font-bold uppercase tracking-widest text-white">✓ We say</p></div>
              <div className="p-5 space-y-3" style={{ background: '#F0FDF4' }}>{brand.voice.doSay.map(s => <p key={s} className="text-sm text-gray-700 font-medium">{s}</p>)}</div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #FECDD3' }}>
              <div className="px-5 py-3" style={{ background: '#DC2626' }}><p className="text-xs font-bold uppercase tracking-widest text-white">✗ We don't say</p></div>
              <div className="p-5 space-y-3" style={{ background: '#FFF1F2' }}>{brand.voice.dontSay.map(s => <p key={s} className="text-sm text-gray-500 line-through">{s}</p>)}</div>
            </div>
          </div>
        </FadeUp>

        {/* Applications */}
        <FadeUp>
          <div className="pl-6 mb-6" style={{ borderLeft: `4px solid ${brand.accentMid}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brand.accent }}>Applications</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: '#1C1917' }}>Brand in the Wild</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {brand.applications.map((app, i) => (
              <motion.div key={app.type} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5" style={{ background: i % 2 === 0 ? brand.accentLight : '#FEF3C7', border: `1px solid ${brand.accent}20` }}>
                <div className="w-6 h-6 rounded-lg mb-3" style={{ background: i < 2 ? brand.accent : '#15803D' }} />
                <p className="font-bold text-sm mb-1" style={{ color: '#1C1917' }}>{app.type}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Outcome */}
        <FadeUp className="pb-8">
          <div className="pl-6 mb-6" style={{ borderLeft: `4px solid ${brand.accent}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brand.accent }}>Results</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: '#1C1917' }}>The Outcome</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {brand.outcome.metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl p-5 text-center" style={{ background: i % 2 === 0 ? brand.accent : '#15803D' }}>
                <p className="text-3xl font-display font-bold text-white mb-1">{m.value}</p>
                <p className="text-xs text-white/70 leading-snug">{m.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="rounded-3xl p-8" style={{ background: '#1C1917' }}>
            <div className="text-5xl font-serif opacity-30 text-white leading-none mb-2">"</div>
            <p className="text-white font-display text-xl font-medium leading-relaxed mb-3">{brand.outcome.quote}</p>
            <p className="text-sm" style={{ color: brand.accentMid }}>{brand.outcome.quoteBy}</p>
          </div>
        </FadeUp>

      </div>

      {/* Footer */}
      <div className="border-t py-10" style={{ borderColor: 'rgba(249,115,22,0.15)', background: '#FFF7ED' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>Back to Portfolio
          </button>
          <p className="text-xs text-gray-400">Brand Identity · {brand.name} · {brand.year}</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// VOLTA LAYOUT — Dark Technical Grid: data-forward, spec-sheet precision
// ═══════════════════════════════════════════════════════════════════════════════
function VoltaLayout({ brand, onBack }: { brand: BrandData; onBack: () => void }) {
  return (
    <div className="min-h-screen" style={{ background: '#0A0F1A' }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: brand.bgHero }}>
        <button onClick={onBack} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>Back
        </button>
        {/* Electric grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>{brand.category}</p>
            <h1 className="text-6xl lg:text-7xl font-display font-bold text-white mb-3 tracking-tight">{brand.name}</h1>
            <p className="text-xl mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>{brand.tagline}</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ l: 'Year', v: brand.year }, { l: 'Duration', v: brand.duration }, { l: 'Role', v: 'Lead Designer' }].map(m => (
                <div key={m.l} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{m.l}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{m.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="flex justify-center">
            <div className="w-48 h-48 drop-shadow-2xl" style={{ filter: `drop-shadow(0 0 40px ${brand.accent}60)` }}><brand.LogoMark /></div>
          </motion.div>
        </div>
        <div className="border-t py-4 px-6" style={{ borderColor: 'rgba(14,165,233,0.15)' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
            {brand.deliverables.map(d => <span key={d} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'rgba(14,165,233,0.1)', color: brand.accent, border: '1px solid rgba(14,165,233,0.2)' }}>{d}</span>)}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Challenge */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 01 · CHALLENGE</p>
          <h2 className="text-3xl font-display font-bold text-white mb-5">The Brief</h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl">{brand.challenge}</p>
        </FadeUp>

        {/* Audience */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 02 · RESEARCH</p>
          <h2 className="text-3xl font-display font-bold text-white mb-6">User Segments</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {brand.audience.map((a, i) => (
              <motion.div key={a.type} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-2xl block mb-3">{a.icon}</span>
                <p className="font-bold text-white mb-0.5 text-sm">{a.type}</p>
                <p className="text-xs font-mono mb-3" style={{ color: brand.accent }}>AGE {a.age}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Positioning */}
        <FadeUp>
          <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(14,165,233,0.08), rgba(14,165,233,0.02))`, border: '1px solid rgba(14,165,233,0.2)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 03 · POSITIONING</p>
            <p className="text-white text-xl font-display font-semibold leading-relaxed">{brand.positioning}</p>
          </div>
        </FadeUp>

        {/* Moodboard */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 04 · VISUAL DIRECTION</p>
          <h2 className="text-3xl font-display font-bold text-white mb-6">Moodboard</h2>
          <div className="flex gap-3 mb-4">
            {brand.moodboard.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex-1">
                <div className="h-24 rounded-xl mb-2" style={{ background: m.color, boxShadow: `0 0 20px ${m.color}40` }} />
                <p className="text-xs font-semibold text-gray-300">{m.label}</p>
                <p className="text-[10px] text-gray-600">{m.mood}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">{brand.moodKeywords.map(k => <span key={k} className="text-xs font-mono px-3 py-1 rounded" style={{ background: 'rgba(14,165,233,0.08)', color: brand.accent, border: '1px solid rgba(14,165,233,0.15)' }}>{k}</span>)}</div>
        </FadeUp>

        {/* Logo */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 05 · IDENTITY</p>
          <h2 className="text-3xl font-display font-bold text-white mb-6">Logo Exploration</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {brand.logoConcepts.map(c => (
              <div key={c.label} className="rounded-xl p-4 flex gap-3 relative" style={{ background: c.chosen ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.03)', border: c.chosen ? `1px solid ${brand.accent}50` : '1px solid rgba(255,255,255,0.06)' }}>
                {c.chosen && <span className="absolute top-2 right-2 text-[10px] font-bold font-mono px-2 py-0.5 rounded" style={{ background: brand.accent, color: '#0F172A' }}>SELECTED</span>}
                <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold font-mono shrink-0" style={{ background: c.chosen ? brand.accent : 'rgba(255,255,255,0.08)', color: c.chosen ? '#0F172A' : '#64748b' }}>{c.label.slice(-1)}</div>
                <div><p className="font-semibold text-sm text-white mb-0.5">{c.label}</p><p className="text-xs text-gray-500">{c.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-8 flex items-center justify-center gap-8" style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)' }}>
            <div className="w-24 h-24" style={{ filter: `drop-shadow(0 0 20px ${brand.accent}50)` }}><brand.LogoMark /></div>
            <div><p className="text-xs font-mono mb-1" style={{ color: brand.accent }}>FINAL MARK</p><p className="font-display font-bold text-3xl text-white">{brand.name}</p><p className="text-sm text-gray-500">{brand.tagline}</p></div>
          </div>
        </FadeUp>

        {/* Colour */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 06 · COLOUR SYSTEM</p>
          <h2 className="text-3xl font-display font-bold text-white mb-6">Palette</h2>
          <div className="space-y-2">
            {brand.palette.map((c, i) => (
              <motion.div key={c.hex} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-10 rounded-lg shrink-0" style={{ background: c.hex, boxShadow: `0 0 16px ${c.hex}40` }} />
                <div className="flex-1"><div className="flex items-baseline gap-3"><p className="font-semibold text-sm text-white">{c.name}</p><p className="text-xs font-mono" style={{ color: brand.accent }}>{c.hex}</p></div><p className="text-xs text-gray-600 mt-0.5">{c.use}</p></div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Typography */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 07 · TYPOGRAPHY</p>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(14,165,233,0.2)' }}>
            <div className="p-8" style={{ background: `linear-gradient(135deg, #0F172A, #0C2341)` }}>
              <p className="text-5xl font-display font-bold text-white mb-4">{brand.typeSample}</p>
              <div className="flex gap-8">
                <div><p className="text-sm font-semibold text-white">{brand.typeDisplay.name}</p><p className="text-xs text-gray-500">{brand.typeDisplay.style}</p></div>
                <div><p className="text-sm font-semibold text-white">{brand.typeBody.name}</p><p className="text-xs text-gray-500">{brand.typeBody.style}</p></div>
              </div>
            </div>
            <div className="px-8 py-4 flex gap-4" style={{ background: 'rgba(14,165,233,0.06)' }}>
              <p className="text-xs font-mono text-gray-600 tracking-wider">ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789 · !@#$%^&</p>
            </div>
          </div>
        </FadeUp>

        {/* Voice */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 08 · BRAND VOICE</p>
          <h2 className="text-3xl font-display font-bold text-white mb-6">Tone & Personality</h2>
          <div className="flex flex-wrap gap-2 mb-6">{brand.voice.adjectives.map(a => <span key={a} className="text-sm font-semibold px-4 py-2 rounded-xl" style={{ background: 'rgba(14,165,233,0.1)', color: brand.accent, border: '1px solid rgba(14,165,233,0.2)' }}>{a}</span>)}</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl p-5" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <p className="text-xs font-mono font-bold text-green-400 mb-3">// WE SAY</p>
              <div className="space-y-2">{brand.voice.doSay.map(s => <p key={s} className="text-sm text-gray-300">{s}</p>)}</div>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="text-xs font-mono font-bold text-red-400 mb-3">// WE DON'T SAY</p>
              <div className="space-y-2">{brand.voice.dontSay.map(s => <p key={s} className="text-sm text-gray-600 line-through">{s}</p>)}</div>
            </div>
          </div>
        </FadeUp>

        {/* Applications */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 09 · APPLICATIONS</p>
          <h2 className="text-3xl font-display font-bold text-white mb-6">Brand in the Wild</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {brand.applications.map((app, i) => (
              <motion.div key={app.type} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-6 h-1 rounded-full mb-3" style={{ background: brand.accent }} />
                <p className="font-bold text-sm text-white mb-1">{app.type}</p>
                <p className="text-xs text-gray-500">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Outcome */}
        <FadeUp className="pb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: brand.accent }}>// 10 · RESULTS</p>
          <h2 className="text-3xl font-display font-bold text-white mb-6">The Outcome</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {brand.outcome.metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-xl p-5 text-center" style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.15)' }}>
                <p className="text-3xl font-display font-bold mb-1" style={{ color: brand.accent }}>{m.value}</p>
                <p className="text-xs text-gray-500 leading-snug">{m.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl p-8" style={{ background: `linear-gradient(135deg, rgba(14,165,233,0.1), rgba(14,165,233,0.03))`, border: '1px solid rgba(14,165,233,0.2)' }}>
            <p className="text-xl font-display font-medium text-white leading-relaxed mb-3">{brand.outcome.quote}</p>
            <p className="text-sm" style={{ color: brand.accent }}>{brand.outcome.quoteBy}</p>
          </div>
        </FadeUp>

      </div>

      {/* Footer */}
      <div className="border-t py-10" style={{ borderColor: 'rgba(14,165,233,0.15)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>Back to Portfolio
          </button>
          <p className="text-xs text-gray-600 font-mono">BRAND IDENTITY · {brand.name.toUpperCase()} · {brand.year}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function BrandCaseStudy() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const brand = BRANDS[id ?? '']

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  const onBack = () => navigate('/')

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-2xl font-display font-bold mb-4">Brand not found</p>
          <button onClick={onBack} className="text-gray-500 underline">← Back to portfolio</button>
        </div>
      </div>
    )
  }

  if (brand.id === 'bloom') return <BloomLayout brand={brand} onBack={onBack} />
  if (brand.id === 'harvest') return <HarvestLayout brand={brand} onBack={onBack} />
  return <VoltaLayout brand={brand} onBack={onBack} />
}
