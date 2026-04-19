import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// ─── Brand Database ───────────────────────────────────────────────────────────
const BRANDS: Record<string, BrandData> = {
  bloom: {
    id: 'bloom',
    name: 'Bloom',
    tagline: 'Wellness, Reimagined',
    category: 'Wellness App · Brand Identity',
    year: '2024',
    duration: '8 weeks',
    role: 'Brand Identity Designer',
    deliverables: ['Logo System', 'Colour Palette', 'Typography', 'Brand Guidelines', 'App Icon', 'Social Templates'],
    accent: '#6B48FF',
    accentLight: '#F3F0FF',
    accentMid: '#A78BFA',
    accentDark: '#4C1D95',
    bgHero: 'linear-gradient(135deg, #F3F0FF 0%, #EDE9FE 50%, #DDD6FE 100%)',
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
        <circle cx="60" cy="30" r="7" fill="#A78BFA" />
        <circle cx="86" cy="45" r="7" fill="#A78BFA" fillOpacity="0.8" />
        <circle cx="86" cy="75" r="7" fill="#A78BFA" fillOpacity="0.8" />
        <circle cx="60" cy="90" r="7" fill="#A78BFA" />
        <circle cx="34" cy="75" r="7" fill="#A78BFA" fillOpacity="0.8" />
        <circle cx="34" cy="45" r="7" fill="#A78BFA" fillOpacity="0.8" />
        <path d="M60 50 C60 50 54 40 60 30 C66 40 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 70 50 78 44 C74 56 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 66 61 74 66 C62 68 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 54 61 46 66 C34 64 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
        <path d="M60 50 C60 50 42 50 46 44 C50 38 60 50 60 50Z" fill="#6B48FF" fillOpacity="0.3" />
      </svg>
    ),
  },

  volta: {
    id: 'volta',
    name: 'Volta',
    tagline: 'Drive the Future',
    category: 'EV Startup · Brand Identity',
    year: '2024',
    duration: '10 weeks',
    role: 'Brand Identity & Strategy Designer',
    deliverables: ['Brand Strategy', 'Logo System', 'Motion Identity', 'UI Kit', 'Vehicle Livery', 'Investor Deck Branding'],
    accent: '#0EA5E9',
    accentLight: '#F0F9FF',
    accentMid: '#7DD3FC',
    accentDark: '#0369A1',
    bgHero: 'linear-gradient(135deg, #0F172A 0%, #0C2341 50%, #0F172A 100%)',
    challenge: 'Volta was entering a crowded EV market dominated by Tesla\'s cold minimalism, Rivian\'s adventure-outdoor positioning, and Lucid\'s ultra-luxury angle. They needed a brand that felt powerful and technical without alienating mainstream buyers. The challenge: be bold enough to stand out at auto shows, but human enough to make someone\'s mum consider buying one.',
    audience: [
      { type: 'The Tech Early Adopter', age: '30–42', desc: 'Already has solar panels, follows Elon on X. Cares about specs first, aesthetics second. Range anxiety is real.', icon: '⚡' },
      { type: 'The Conscious Commuter', age: '28–40', desc: 'Drives 40 miles daily, wants to cut fuel costs. Climate-conscious but budget-aware. Values practicality.', icon: '🌍' },
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
    id: 'harvest',
    name: 'Harvest',
    tagline: 'From Earth to Table',
    category: 'Food Delivery · Brand Identity',
    year: '2023',
    duration: '6 weeks',
    role: 'Brand Identity Designer',
    deliverables: ['Logo System', 'Packaging Design', 'Colour & Type System', 'App Icon', 'Farmer Co-branding Kit', 'Social Templates'],
    accent: '#F97316',
    accentLight: '#FFF7ED',
    accentMid: '#FED7AA',
    accentDark: '#C2410C',
    bgHero: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #FDE68A 100%)',
    challenge: 'Harvest was competing against Instacart (big-box convenience), Imperfect Foods (quirky but budget-focused), and Thrive Market (discount warehouse feel). None of them told the story of the farmers behind the food. Harvest\'s advantage was relationships — 500+ local farm partners. The brand needed to make customers feel that relationship too.',
    audience: [
      { type: 'The Conscious Family', age: '30–45', desc: 'Two kids, reads ingredient labels, shops farmers markets on weekends. Will pay 20% more for local + organic.', icon: '🌾' },
      { type: 'The Urban Health-Seeker', age: '25–35', desc: 'Meal preps on Sundays, uses MyFitnessPal. Wants premium ingredients delivered with zero effort.', icon: '🥗' },
      { type: 'The Community Supporter', age: '35–55', desc: 'Buys local on principle, not price. Knows their farmer by name. Brand story matters as much as product.', icon: '🤝' },
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
        <circle cx="60" cy="20" r="7" fill="#F97316" />
        <circle cx="60" cy="20" r="4" fill="#FEF3C7" />
      </svg>
    ),
  },
}

type BrandData = {
  id: string
  name: string
  tagline: string
  category: string
  year: string
  duration: string
  role: string
  deliverables: string[]
  accent: string
  accentLight: string
  accentMid: string
  accentDark: string
  bgHero: string
  challenge: string
  audience: { type: string; age: string; desc: string; icon: string }[]
  positioning: string
  moodboard: { color: string; label: string; mood: string }[]
  moodKeywords: string[]
  logoConcepts: { label: string; desc: string; chosen: boolean }[]
  palette: { hex: string; name: string; use: string }[]
  typeDisplay: { name: string; style: string; use: string }
  typeBody: { name: string; style: string; use: string }
  typeSample: string
  voice: { adjectives: string[]; doSay: string[]; dontSay: string[] }
  applications: { type: string; desc: string }[]
  outcome: { metrics: { value: string; label: string }[]; quote: string; quoteBy: string }
  LogoMark: () => JSX.Element
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ text, accent }: { text: string; accent: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>{text}</p>
  )
}

// ─── Mock UI: App Icon ────────────────────────────────────────────────────────
function AppIconMock({ brand }: { brand: BrandData }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-20 h-20 rounded-[22px] flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentDark})`, boxShadow: `0 12px 32px ${brand.accent}40` }}
      >
        <div className="w-12 h-12"><brand.LogoMark /></div>
      </div>
      <p className="text-xs text-gray-500 font-medium">{brand.name}</p>
    </div>
  )
}

// ─── Mock UI: Business Card ───────────────────────────────────────────────────
function BusinessCardMock({ brand }: { brand: BrandData }) {
  return (
    <div className="space-y-2">
      {/* Front */}
      <div
        className="w-full aspect-[1.75/1] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentDark})` }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ background: 'white' }} />
        <div className="w-8 h-8"><brand.LogoMark /></div>
        <div>
          <p className="text-white font-bold text-sm font-display">{brand.name}</p>
          <p className="text-white/70 text-xs">{brand.tagline}</p>
        </div>
      </div>
      {/* Back */}
      <div
        className="w-full aspect-[1.75/1] rounded-2xl p-5 flex flex-col justify-center"
        style={{ background: brand.accentLight, border: `1.5px solid ${brand.accent}25` }}
      >
        <p className="font-semibold text-sm mb-1" style={{ color: brand.accentDark }}>hello@{brand.name.toLowerCase()}.co</p>
        <p className="text-xs text-gray-400">www.{brand.name.toLowerCase()}.co</p>
        <p className="text-xs text-gray-400 mt-0.5">San Francisco, CA</p>
      </div>
    </div>
  )
}

// ─── Mock UI: Social Post ─────────────────────────────────────────────────────
function SocialMock({ brand }: { brand: BrandData }) {
  return (
    <div
      className="w-full aspect-square rounded-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${brand.accentLight}, ${brand.accentMid}40)`, border: `1px solid ${brand.accent}20` }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-full h-full" style={{ background: brand.accent, filter: 'blur(60px)' }} />
      </div>
      <div className="w-14 h-14 mb-4 relative z-10"><brand.LogoMark /></div>
      <p className="font-display font-bold text-center text-lg leading-tight relative z-10" style={{ color: brand.accentDark }}>
        {brand.typeSample}
      </p>
      <p className="text-xs mt-3 relative z-10" style={{ color: brand.accent }}>@{brand.name.toLowerCase()}</p>
    </div>
  )
}

// ─── Mock UI: Brand Banner ────────────────────────────────────────────────────
function BrandBannerMock({ brand }: { brand: BrandData }) {
  return (
    <div
      className="w-full rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${brand.accentDark}, ${brand.accent})` }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex items-center justify-end pr-4">
        <div className="w-24 h-24"><brand.LogoMark /></div>
      </div>
      <div className="w-12 h-12 shrink-0"><brand.LogoMark /></div>
      <div>
        <p className="text-white font-display font-bold text-xl">{brand.name}</p>
        <p className="text-white/70 text-sm">{brand.tagline}</p>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BrandCaseStudy() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const brand = BRANDS[id ?? '']

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-display font-bold mb-4">Brand not found</p>
          <button onClick={() => navigate('/')} className="text-gray-500 underline">← Back to portfolio</button>
        </div>
      </div>
    )
  }

  const isDark = brand.id === 'volta'

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: brand.bgHero }}>
        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => { sessionStorage.setItem('homepage-scroll', '0'); navigate('/') }}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
              color: isDark ? 'white' : '#374151',
              border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{ background: brand.accent + '18', color: brand.accent, border: `1px solid ${brand.accent}30` }}
              >
                {brand.category}
              </span>
              <h1
                className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-3"
                style={{ color: isDark ? 'white' : brand.accentDark }}
              >
                {brand.name}
              </h1>
              <p className="text-xl mb-8" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>{brand.tagline}</p>

              {/* Meta grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Year', value: brand.year },
                  { label: 'Duration', value: brand.duration },
                  { label: 'Role', value: brand.role.split(' ')[0] + ' ' + brand.role.split(' ')[1] },
                ].map(m => (
                  <div key={m.label} className="rounded-2xl p-3" style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.07)' }}>
                    <p className="text-xs mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#9CA3AF' }}>{m.label}</p>
                    <p className="text-sm font-semibold" style={{ color: isDark ? 'white' : '#1F2937' }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <div className="w-56 h-56 drop-shadow-2xl">
                <brand.LogoMark />
              </div>
            </motion.div>
          </div>

          {/* Deliverables */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-10"
          >
            {brand.deliverables.map(d => (
              <span
                key={d}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: isDark ? 'rgba(255,255,255,0.7)' : '#374151', border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)' }}
              >
                {d}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">

        {/* 1. The Challenge */}
        <Section>
          <SectionLabel text="01 · The Challenge" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-5 text-gray-900">The Brief</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">{brand.challenge}</p>
        </Section>

        {/* 2. Target Audience */}
        <Section>
          <SectionLabel text="02 · Research" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-2 text-gray-900">Who We're Designing For</h2>
          <p className="text-gray-500 mb-8">Three distinct user archetypes emerged from discovery interviews and market research.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {brand.audience.map(a => (
              <div
                key={a.type}
                className="rounded-2xl p-6"
                style={{ background: brand.accentLight, border: `1px solid ${brand.accent}20` }}
              >
                <span className="text-3xl mb-4 block">{a.icon}</span>
                <p className="font-bold text-gray-900 mb-0.5">{a.type}</p>
                <p className="text-xs font-medium mb-3" style={{ color: brand.accent }}>Age {a.age}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 3. Brand Positioning */}
        <Section>
          <SectionLabel text="03 · Strategy" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Brand Positioning</h2>
          <div
            className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${brand.accent}10, ${brand.accentMid}20)`, border: `1px solid ${brand.accent}25` }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: brand.accent, filter: 'blur(48px)', transform: 'translate(30%, -30%)' }} />
            <p className="text-2xl font-display font-semibold text-gray-800 leading-relaxed relative z-10">
              "{brand.positioning}"
            </p>
          </div>
        </Section>

        {/* 4. Moodboard */}
        <Section>
          <SectionLabel text="04 · Visual Direction" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-2 text-gray-900">Moodboard & Inspiration</h2>
          <p className="text-gray-500 mb-8">Key visual themes that defined the creative direction.</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {brand.moodboard.map(m => (
              <div key={m.label} className="flex flex-col gap-2">
                <div className="aspect-square rounded-2xl" style={{ background: m.color, boxShadow: `0 8px 24px ${m.color}40` }} />
                <p className="text-xs font-semibold text-gray-700">{m.label}</p>
                <p className="text-[10px] text-gray-400">{m.mood}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {brand.moodKeywords.map(k => (
              <span
                key={k}
                className="text-xs font-medium px-3 py-1.5 rounded-full italic"
                style={{ background: 'rgba(0,0,0,0.04)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                {k}
              </span>
            ))}
          </div>
        </Section>

        {/* 5. Logo Exploration */}
        <Section>
          <SectionLabel text="05 · Identity Design" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-2 text-gray-900">Logo Exploration</h2>
          <p className="text-gray-500 mb-8">Four concept directions were explored before landing on the final mark.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {brand.logoConcepts.map(c => (
              <div
                key={c.label}
                className="rounded-2xl p-5 flex gap-4 items-start relative"
                style={{
                  background: c.chosen ? `${brand.accent}08` : 'rgba(0,0,0,0.02)',
                  border: c.chosen ? `2px solid ${brand.accent}40` : '1px solid rgba(0,0,0,0.07)',
                }}
              >
                {c.chosen && (
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: brand.accent, color: 'white' }}
                  >
                    CHOSEN
                  </span>
                )}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: c.chosen ? brand.accent : 'rgba(0,0,0,0.07)', color: c.chosen ? 'white' : '#9CA3AF' }}
                >
                  {c.label.slice(-1)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{c.label}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Final mark showcase */}
          <div
            className="rounded-3xl p-10 flex flex-col items-center justify-center text-center"
            style={{ background: `linear-gradient(135deg, ${brand.accentLight}, ${brand.accentMid}30)`, border: `1px solid ${brand.accent}20` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: brand.accent }}>Final Logo Mark</p>
            <div className="w-32 h-32 mb-6"><brand.LogoMark /></div>
            <p className="font-display font-bold text-3xl mb-1" style={{ color: brand.accentDark }}>{brand.name}</p>
            <p className="text-sm text-gray-500">{brand.tagline}</p>
          </div>
        </Section>

        {/* 6. Colour System */}
        <Section>
          <SectionLabel text="06 · Colour System" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Colour Palette</h2>
          <div className="space-y-3">
            {brand.palette.map((c, i) => (
              <motion.div
                key={c.hex}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-5 rounded-2xl p-4"
                style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="w-14 h-14 rounded-xl shrink-0" style={{ background: c.hex, boxShadow: `0 4px 16px ${c.hex}50` }} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-0.5">
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className="text-xs font-mono text-gray-400">{c.hex}</p>
                  </div>
                  <p className="text-sm text-gray-500">{c.use}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 7. Typography */}
        <Section>
          <SectionLabel text="07 · Typography" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Type System</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Display */}
            <div className="rounded-2xl p-7" style={{ background: brand.accentLight, border: `1px solid ${brand.accent}20` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Display</p>
              <p className="text-5xl font-display font-bold mb-3" style={{ color: brand.accentDark }}>Aa</p>
              <p className="font-semibold text-gray-800 mb-0.5">{brand.typeDisplay.name}</p>
              <p className="text-xs text-gray-500 mb-2">{brand.typeDisplay.style}</p>
              <p className="text-xs text-gray-400 italic">{brand.typeDisplay.use}</p>
            </div>
            {/* Body */}
            <div className="rounded-2xl p-7" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.07)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: brand.accent }}>Body</p>
              <p className="text-5xl font-medium text-gray-500 mb-3">Aa</p>
              <p className="font-semibold text-gray-800 mb-0.5">{brand.typeBody.name}</p>
              <p className="text-xs text-gray-500 mb-2">{brand.typeBody.style}</p>
              <p className="text-xs text-gray-400 italic">{brand.typeBody.use}</p>
            </div>
          </div>
          {/* Type specimen */}
          <div
            className="mt-5 rounded-2xl p-8 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${brand.accentDark}, ${brand.accent})` }}
          >
            <p className="font-display font-bold text-white text-4xl text-center">{brand.typeSample}</p>
          </div>
        </Section>

        {/* 8. Brand Voice */}
        <Section>
          <SectionLabel text="08 · Brand Voice" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Tone & Personality</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {brand.voice.adjectives.map(a => (
              <span
                key={a}
                className="text-sm font-semibold px-4 py-2 rounded-full"
                style={{ background: brand.accent + '12', color: brand.accent, border: `1px solid ${brand.accent}30` }}
              >
                {a}
              </span>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-4">✓ We say</p>
              <div className="space-y-3">
                {brand.voice.doSay.map(s => (
                  <p key={s} className="text-sm text-gray-700 font-medium">{s}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: '#FFF1F2', border: '1px solid #FECDD3' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">✗ We don't say</p>
              <div className="space-y-3">
                {brand.voice.dontSay.map(s => (
                  <p key={s} className="text-sm text-gray-500 line-through">{s}</p>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 9. Brand Applications */}
        <Section>
          <SectionLabel text="09 · Applications" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-2 text-gray-900">Brand in the Wild</h2>
          <p className="text-gray-500 mb-8">How the identity comes to life across touchpoints.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* App Icon + Business Card */}
            <div className="space-y-5">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{brand.applications[0].type}</p>
                <div className="flex items-center gap-5">
                  <AppIconMock brand={brand} />
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{brand.applications[0].desc}</p>
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{brand.applications[1].type}</p>
                <BusinessCardMock brand={brand} />
                <p className="text-sm text-gray-500 mt-3">{brand.applications[1].desc}</p>
              </div>
            </div>

            {/* Social + Banner */}
            <div className="space-y-5">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{brand.applications[2].type}</p>
                <SocialMock brand={brand} />
                <p className="text-sm text-gray-500 mt-3">{brand.applications[2].desc}</p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{brand.applications[3].type}</p>
                <BrandBannerMock brand={brand} />
                <p className="text-sm text-gray-500 mt-3">{brand.applications[3].desc}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 10. Outcome */}
        <Section>
          <SectionLabel text="10 · Results" accent={brand.accent} />
          <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">The Outcome</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {brand.outcome.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5 text-center"
                style={{ background: `linear-gradient(135deg, ${brand.accent}08, ${brand.accentMid}12)`, border: `1px solid ${brand.accent}20` }}
              >
                <p className="text-3xl font-display font-bold mb-1" style={{ color: brand.accent }}>{m.value}</p>
                <p className="text-xs text-gray-500 leading-snug">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <div
            className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${brand.accentDark}, ${brand.accent})` }}
          >
            <div className="absolute top-4 left-6 text-8xl font-serif opacity-20 text-white leading-none">"</div>
            <p className="text-white text-xl font-display font-medium leading-relaxed relative z-10 mb-4">
              {brand.outcome.quote}
            </p>
            <p className="text-white/60 text-sm relative z-10">{brand.outcome.quoteBy}</p>
          </div>
        </Section>

      </div>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back to Portfolio
          </button>
          <p className="text-xs text-gray-400">Brand Identity · {brand.name} · {brand.year}</p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); navigate('/') }}
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentDark})` }}
          >
            Work with me →
          </a>
        </div>
      </div>

    </div>
  )
}
