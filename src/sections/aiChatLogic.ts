/**
 * On-device engine for Karishma's AI.
 *
 * The chat first tries the Claude-powered endpoint (/api/chat). When that isn't
 * configured or reachable, this engine answers instead. It understands the
 * question (skills, companies, projects, industries, topics and follow-ups),
 * answers from the same data the site renders (src/data/profile.ts and
 * src/data/projects.ts), says plainly when something isn't on her résumé, and
 * keeps her privacy rules intact.
 */
import { projects, type Project } from '../data/projects.ts'
import {
  AI_EXTRA_FACTS,
  CASE_STUDY_ROUTES,
  EDUCATION,
  EXPERIENCE,
  LEADERSHIP,
  PROFILE,
  TEACHING_RESEARCH,
  TESTIMONIAL_QUOTES,
  type CareerItem,
} from '../data/profile.ts'

export interface ConversationContext {
  lastTopic?: string
  lastProject?: string
  lastRole?: string
  projectsDiscussed: string[]
  askedAboutContact: boolean
  askedAboutSkills: boolean
}

export interface ChatAction {
  label: string
  href: string
  kind: 'route' | 'external' | 'mailto' | 'file'
}

export interface SmartResponse {
  response: string
  suggestions: string[]
  topic: string
  actions?: ChatAction[]
  /** Where the answer comes from, shown under the reply. */
  sources?: string[]
}

export const CONTACT_EMAIL = PROFILE.email

const DEFER_TEXT = `Great question. Although I know a lot about Karishma, for that one you might have to ask her personally.\n\nYou can reach her at ${PROFILE.email}.`

const ACTIONS = {
  resume: { label: 'Open résumé', href: PROFILE.resumeUrl, kind: 'file' } as ChatAction,
  email: { label: 'Email Karishma', href: `mailto:${PROFILE.email}`, kind: 'mailto' } as ChatAction,
  linkedin: { label: 'LinkedIn', href: PROFILE.links.linkedin, kind: 'external' } as ChatAction,
  github: { label: 'GitHub', href: PROFILE.links.github, kind: 'external' } as ChatAction,
  behance: { label: 'Behance', href: PROFILE.links.behance, kind: 'external' } as ChatAction,
  caseStudy: (p: Project): ChatAction => ({
    label: `${p.title} case study`,
    href: CASE_STUDY_ROUTES[p.id] ?? `/${p.id}`,
    kind: 'route',
  }),
}

const SRC = { resume: 'Résumé', site: 'Portfolio', recs: 'LinkedIn recommendations', caseStudy: (p: Project) => `${p.title} case study` }

const FOLLOW_UPS = {
  general: ['Why hire Karishma?', 'Show me her best work', 'Check fit for my role'],
  afterSkill: ['Show me examples', 'Summarize her experience', 'Check fit for my role'],
  afterRole: ['Tell me more', 'What was her biggest impact?', 'Show me her best work'],
  afterProject: ['Tell me more', 'Show another project', 'Why hire Karishma?'],
}

/* ───────────────────────── Small helpers ───────────────────────── */

const orgShort = (o: string) => o.split(',')[0]
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

const allMetrics = () =>
  EXPERIENCE.flatMap(r => (r.metrics ?? []).map(m => ({ ...m, org: orgShort(r.org) })))

/* ───────────────────────── Knowledge ───────────────────────── */

const ROLE_ALIASES: Record<string, string[]> = {
  atlassian: ['atlassian', 'rovo'],
  roux: ['roux', 'health portal', 'co-op', 'coop'],
  hexaware: ['hexaware', 'retail bank'],
}

const findRole = (msg: string): CareerItem | undefined =>
  EXPERIENCE.find(r => (ROLE_ALIASES[r.id] ?? [r.org.toLowerCase()]).some(a => msg.includes(a)))

const PROJECT_KEYWORDS: Record<string, string[]> = {
  'ai-care-navigator': ['ai care', 'care navigator'],
  'restoration-medicine': ['restoration medicine', 'regenerative'],
  'repack-portal': ['repack', 're-pack', 'packaging return'],
  'folio-tracker': ['folio', 'portfolio tracker'],
  'smart-home-app': ['hearth', 'smart home', 'smart-home', 'smart appliance'],
  'fitness-wearable': ['pulse app', 'wearable'],
}

const findProject = (msg: string): Project | undefined =>
  projects.find(p =>
    (PROJECT_KEYWORDS[p.id] ?? []).some(k => msg.includes(k)) ||
    new RegExp(`\\b${p.title.toLowerCase()}\\b`).test(msg))

const projectById = (id: string) => projects.find(p => p.id === id)

interface Skill {
  id: string
  aliases: string[]
  answer: (asked?: string) => string
  /** One line, used when a question covers several skills at once. */
  short: string
  examples?: string[]
}

const DEV_NAMES: Record<string, string> = {
  react: 'React', typescript: 'TypeScript', javascript: 'JavaScript', html: 'HTML', css: 'CSS', angular: 'Angular',
  'node.js': 'Node.js', nodejs: 'Node.js', node: 'Node.js', storybook: 'Storybook', 'd3': 'D3.js', 'rest api': 'REST APIs',
  github: 'GitHub', git: 'Git', sass: 'Sass', redux: 'Redux', bootstrap: 'Bootstrap', sql: 'SQL', 'front-end': 'front-end development',
  frontend: 'front-end development', coding: 'coding', code: 'coding', developer: 'development',
}

const SKILLS: Skill[] = [
  {
    id: 'figma',
    aliases: ['figma', 'dev mode', 'auto layout', 'figjam'],
    short: '**Figma:** her primary design tool, including Auto Layout, Variables and Dev Mode.',
    answer: () => 'Yes. Figma is her primary design tool, including Auto Layout, Variables and Dev Mode. She also uses FigJam and Figma Make for workshops and fast exploration.',
  },
  {
    id: 'prototyping',
    aliases: ['prototyp', 'protopie', 'framer'],
    short: '**Prototyping:** Figma, ProtoPie, Framer and React, behind the 11% Rovo AI adoption lift.',
    answer: () => 'Yes. She prototypes in Figma, ProtoPie and Framer, and in React when an interaction needs real data. Prototyping and A/B testing drove the **11%** lift in Rovo AI adoption at Atlassian, and her scheduling prototypes at the Roux Institute made tasks **25%** faster.',
  },
  {
    id: 'research',
    aliases: ['user research', 'ux research', 'research', 'user interview', 'customer interview', 'stakeholder interview', 'conduct interview', 'usability', 'user testing', 'jobs-to-be-done', 'jtbd', 'heuristic', 'journey map', 'user persona', 'personas', 'survey', 'discovery', 'participatory', 'dovetail', 'maze'],
    short: '**User research:** Jobs-to-Be-Done discovery, participatory workshops, usability testing and A/B tests.',
    answer: () =>
      'Research is the foundation of her process:\n\n' +
      '- **Discovery:** Jobs-to-Be-Done interviews with Jira administrators at Atlassian, and participatory workshops with patients and clinicians at the Roux Institute.\n' +
      '- **Evaluation:** usability testing, heuristic evaluation, and accessibility studies with assistive technology users.\n' +
      '- **Measurement:** A/B tests, task success, and UX metrics such as SUS and HEART.\n\n' +
      'She runs studies and synthesizes findings with tools such as Maze and Dovetail.',
    examples: ['ai-care-navigator', 'fitness-wearable'],
  },
  {
    id: 'accessibility',
    aliases: ['accessib', 'wcag', 'a11y', 'screen reader', 'inclusive'],
    short: '**Accessibility:** WCAG 2.2 AA reviews at Atlassian and 94% biometric login success after studies with assistive technology users.',
    answer: () =>
      'Accessibility is where her design starts, not a final check:\n\n' +
      '- **WCAG 2.2 AA reviews** with screen reader and contrast testing for Jira Service Management and the Confluence editor.\n' +
      '- **Inclusive authentication:** she tested biometric sign-in with keyboard and assistive technology users, raising login success to **94%**.\n' +
      '- **Accessible by default:** WCAG 2.1 AA dashboards at Hexaware, and **7 accessible university websites** delivered by the design club she founded.',
  },
  {
    id: 'design-systems',
    aliases: ['design system', 'design token', 'tokens studio', 'component librar', 'tokeni', 'style guide'],
    short: '**Design systems:** 30+ tokenized components in the Atlassian Design System and a 60+ component fintech system (Quorum).',
    answer: () =>
      'Design systems are one of her strengths:\n\n' +
      '- **Atlassian Design System:** consolidated **30+** tokenized components, improving handoff and implementation fidelity.\n' +
      '- **Quorum:** a fintech system of **60+** tokenized components with light and dark themes, which made screen assembly **45%** faster.\n' +
      '- **Hexaware:** a reusable component library with usage guidelines that made engineering handoff **35%** more efficient.',
  },
  {
    id: 'dataviz',
    aliases: ['data visual', 'data viz', 'dataviz', 'dashboard', 'chart', 'd3'],
    short: '**Data visualization:** accessible operations dashboards, the Tickerline trading dashboard and Folio Tracker.',
    answer: () => 'Yes. She designed accessible operations dashboards at Hexaware that meet WCAG 2.1 AA, the **Tickerline** trading analytics dashboard built with D3.js, and **Folio Tracker**, an investment dashboard with real-time analytics.',
    examples: ['folio-tracker'],
  },
  {
    id: 'dev',
    aliases: ['react', 'typescript', 'javascript', 'html', 'css', 'angular', 'node.js', 'nodejs', 'storybook', 'rest api', 'github', 'sass', 'redux', 'bootstrap', 'sql', 'front-end', 'frontend', 'coding', 'code', 'developer'],
    short: '**Front-end development:** HTML, CSS, JavaScript, TypeScript, React, Angular, Node.js and Storybook.',
    answer: asked => {
      const name = asked ? DEV_NAMES[asked] ?? asked : 'front-end development'
      const lead = name === 'coding' || name === 'development' || name === 'front-end development'
        ? 'Yes. Karishma designs and builds.'
        : `Yes. ${name} is part of her development toolkit.`
      return `${lead} She works with HTML, CSS, JavaScript, TypeScript, React, Angular, Node.js, D3.js and Storybook, and at the Roux Institute she built HIPAA-compliant role-based permissions in React and TypeScript herself. That fluency is why her handoffs are buildable.`
    },
  },
  {
    id: 'interaction',
    aliases: ['interaction design', 'microinteraction', 'motion', 'animation', 'framer motion'],
    short: '**Interaction design:** user flows, microinteractions and motion.',
    answer: () => 'Yes. Interaction design is central to her work, from user flows and microinteractions to motion. Motion design is one of the capabilities listed on this site, and this portfolio itself is animated with GSAP and Framer Motion.',
  },
  {
    id: 'ia',
    aliases: ['information architecture', 'user flow', 'site map', 'sitemap', 'navigation design'],
    short: '**Information architecture:** user flows and structure on every project she leads.',
    answer: () => 'Yes. Information architecture and user flows are part of every project she leads, and as a lead teaching assistant she built the grading rubrics for information architecture and visual composition.',
  },
  {
    id: 'mobile',
    aliases: ['mobile', 'ios', 'android', 'apple hig', 'human interface', 'material design', 'app design'],
    short: '**Mobile:** Hearth and Pulse for iOS and Android, designed to Apple HIG and Material Design 3.',
    answer: () => 'Yes. She designed **Hearth**, a smart appliance hub for iOS and Android, and **Pulse**, a fitness wearable companion app. She designs to both Apple’s Human Interface Guidelines and Material Design 3.',
    examples: ['smart-home-app', 'fitness-wearable'],
  },
  {
    id: 'brand',
    aliases: ['visual design', 'ui design', 'typography', 'branding', 'brand identity', 'logo'],
    short: '**Visual and brand design:** identities for Bloom, Volta and Harvest.',
    answer: () => 'Yes. Alongside product work she creates brand identities, including **Bloom** (wellness app), **Volta** (EV startup) and **Harvest** (food delivery), each with logo, color, typography and applications. You can find them in the Brand Design section.',
  },
  {
    id: 'experimentation',
    aliases: ['a/b', 'ab test', 'experiment', 'analytics', 'heart framework', 'kpi', 'data-driven', 'data driven'],
    short: '**Experimentation:** A/B tests at Atlassian and Hexaware, measured with task success, SUS and HEART.',
    answer: () => 'Yes. She designs with measurement in mind: A/B tests on Rovo AI entry points at Atlassian and on payment screens at Hexaware, plus UX metrics such as task success, SUS and HEART.',
  },
  {
    id: 'collaboration',
    aliases: ['engineer', 'developers', 'handoff', 'hand off', 'cross-functional', 'cross functional', 'stakeholder', 'product manager', 'agile', 'scrum', 'sprint', 'design qa', 'collaborat'],
    short: '**Collaboration:** design sprints, buildable specifications and a 35% more efficient engineering handoff.',
    answer: () =>
      'She works closely with product managers and engineers:\n\n' +
      '- **A shared language:** she codes in React and TypeScript, so her specifications are buildable and her design QA is precise.\n' +
      '- **Systems thinking:** tokenized components and usage guidelines made engineering handoff **35%** more efficient at Hexaware.\n' +
      '- **Structured delivery:** she facilitates design sprints and turns requirements into screen specifications and Agile release plans.',
  },
  {
    id: 'pm-tools',
    aliases: ['jira', 'confluence', 'notion', 'miro'],
    short: '**Team tools:** Jira, Confluence, Notion and Miro.',
    answer: () => 'Yes. She works in Jira, Confluence, Notion and Miro, and at Atlassian she has designed for Jira and Confluence themselves.',
  },
  {
    id: 'adobe',
    aliases: ['illustrator', 'adobe'],
    short: '**Adobe:** Illustrator, plus the Adobe Certified Professional: Product Design certification.',
    answer: () => 'Yes. Adobe Illustrator is part of her toolkit, and she holds the Adobe Certified Professional: Product Design certification.',
  },
  {
    id: '3d',
    aliases: ['3d', 'three-dimensional'],
    short: '**3D:** 3D visual elements and illustrations.',
    answer: () => 'Yes. 3D design for visual elements and illustrations is one of the design capabilities listed on this site.',
  },
  {
    id: 'speaking',
    aliases: ['public speaking', 'present', 'workshop', 'facilitat', 'lectur'],
    short: '**Presenting:** lectures, workshops and design sprint facilitation.',
    answer: () => 'Yes. As a lead teaching assistant she lectured on usability heuristics and moderated testing, ran generative AI ideation workshops, and she facilitates design sprints with product and engineering partners.',
  },
  {
    id: 'writing',
    aliases: ['ux writing', 'content design', 'copywriting', 'microcopy', 'content strategy'],
    short: '**Content:** plain-language writing, such as AI Care Navigator’s visit summaries.',
    answer: () => 'UX writing is not listed as a separate specialty on her résumé, but clear language is central to her work. AI Care Navigator, for example, turns medical visits into plain-language summaries.',
  },
]

const AI_ANSWER =
  'AI is a consistent thread in Karishma’s work:\n\n' +
  '- **Rovo AI at Atlassian:** defined conversational patterns for AI search and agents in Confluence, validated with prototypes and A/B tests, for an **11%** lift in initial adoption.\n' +
  '- **Atlas:** an agentic AI assistant for enterprise operations with transparent suggestions, source citations and approval controls, which made request resolution **35%** faster.\n' +
  '- **AI Care Navigator:** plain-language visit summaries and AI-generated preparation questions for chronic care patients.\n' +
  '- **Teaching:** graduate head teaching assistant for AI for UX, where she ran generative AI ideation workshops.'

const DOMAINS: { id: string; aliases: string[]; answer: string; projects: string[] }[] = [
  {
    id: 'healthcare',
    aliases: ['healthcare', 'health care', 'health tech', 'healthtech', 'medical', 'clinical', 'clinician', 'patient', 'hipaa', 'hospital'],
    answer:
      'Healthcare is one of her deepest domains:\n\n' +
      '- **Roux Institute:** a HIPAA-compliant digital health portal designed with patients and clinicians, with **25%** faster scheduling and messaging and **94%** biometric login success.\n' +
      '- **AI Care Navigator:** an AI platform that helps chronic care patients manage appointments, medications and visit summaries.\n' +
      '- **Restoration Medicine:** a platform connecting patients with regenerative medicine practitioners.\n' +
      '- **Pulse:** a wearable companion app that turns biometric data into clear, actionable insights.',
    projects: ['ai-care-navigator', 'restoration-medicine'],
  },
  {
    id: 'fintech',
    aliases: ['fintech', 'finance', 'financial', 'banking', 'bank', 'payments', 'trading', 'investment', 'insurance', 'wealth'],
    answer:
      'She has strong fintech experience:\n\n' +
      '- **Hexaware Technologies:** retail banking onboarding that raised task success by **40%**, plus A/B-tested payment screens.\n' +
      '- **Quorum:** a fintech design system with patterns for masked account details and transaction status.\n' +
      '- **Tickerline:** a trading analytics dashboard for execution quality and transaction costs.\n' +
      '- **Folio Tracker:** an investment portfolio dashboard with real-time analytics.',
    projects: ['folio-tracker'],
  },
  {
    id: 'enterprise',
    aliases: ['enterprise', 'b2b', 'saas', 'productivity', 'collaboration software', 'collaboration tool', 'admin', 'internal tool'],
    answer:
      'Enterprise and B2B SaaS is her core:\n\n' +
      '- **Atlassian:** workflows in Jira, Confluence and Jira Service Management, from board and backlog filtering to conversational AI.\n' +
      '- **Hexaware Technologies:** banking platforms and operations dashboards for enterprise clients.\n' +
      '- **Atlas and Tickerline:** an enterprise AI assistant and an institutional trading dashboard.',
    projects: [],
  },
  {
    id: 'sustainability',
    aliases: ['sustainab', 'e-commerce', 'ecommerce', 'marketplace', 'climate', 'circular'],
    answer: 'Her **RePack Portal** case study covers sustainable packaging returns for e-commerce: a three-click return flow, real-time carbon tracking and an eco-points reward system for consumers and brands.',
    projects: ['repack-portal'],
  },
  {
    id: 'iot',
    aliases: ['iot', 'internet of things', 'connected device', 'hardware', 'smart device'],
    answer: 'Her **Hearth** case study unifies eight kitchen appliances in one accessible iOS and Android app, with guided pairing, smart routines and real-time alerts.',
    projects: ['smart-home-app'],
  },
  {
    id: 'wearables',
    aliases: ['wearable', 'biometric', 'fitness app', 'health data'],
    answer: 'Her **Pulse** case study is a fitness wearable companion app that translates heart rate, sleep and HRV data into plain-language insights, cutting onboarding drop-off by **35%** and lifting comprehension by **40%**.',
    projects: ['fitness-wearable'],
  },
  {
    id: 'startup',
    aliases: ['startup', 'start-up', 'early-stage', 'early stage', 'zero to one', '0 to 1', '0-1'],
    answer: 'Yes. Beyond enterprise roles she has worked directly with founders and small teams, including **Health for Mankind** and **Restoration Medicine**, whose Chief Product and Analytics Officer said her redesign made the site “noticeably more user-friendly and conversion-ready.” Many of her case studies follow a product from zero to one.',
    projects: ['restoration-medicine'],
  },
]

const projectTechIndex = (() => {
  const index = new Map<string, Project[]>()
  for (const p of projects) {
    for (const t of p.caseStudy.technologies) {
      const key = t.toLowerCase()
      index.set(key, [...(index.get(key) ?? []), p])
    }
  }
  return index
})()

/* ───────────────────────── Job-description fit ───────────────────────── */

const FIT_SIGNALS: { label: string; keywords: string[]; evidence: string }[] = [
  { label: 'Research and product discovery', keywords: ['research', 'discovery', 'interview', 'usability', 'user testing', 'jobs-to-be-done', 'jtbd', 'insight', 'validate'], evidence: 'Jobs-to-Be-Done discovery with Jira administrators at Atlassian and participatory research with patients and clinicians at the Roux Institute.' },
  { label: 'Interaction and visual design', keywords: ['interaction', 'prototyp', 'figma', 'visual design', 'wireframe', 'high-fidelity', 'user flow', 'ui design', 'ux/ui', 'ui/ux'], evidence: 'End-to-end flows from wireframes to high-fidelity prototypes in Figma and ProtoPie across six published case studies.' },
  { label: 'Design systems', keywords: ['design system', 'component', 'token', 'pattern library', 'storybook', 'style guide'], evidence: 'Consolidated 30+ tokenized components in the Atlassian Design System and built a component library at Hexaware that made handoff 35% more efficient.' },
  { label: 'AI and conversational experiences', keywords: [' ai ', 'ai-', 'artificial intelligence', 'machine learning', 'llm', 'conversational', 'chatbot', 'agent', 'copilot', 'generative', 'genai'], evidence: 'Defined conversational patterns for Rovo AI (11% adoption lift), designed the Atlas agentic assistant, and taught AI for UX at Northeastern.' },
  { label: 'Accessibility', keywords: ['accessib', 'wcag', 'a11y', 'inclusive', 'screen reader', 'ada '], evidence: 'WCAG 2.2 AA reviews for Jira Service Management and Confluence, and 94% biometric login success after studies with assistive technology users.' },
  { label: 'Front-end fluency', keywords: ['react', 'typescript', 'javascript', 'html', 'css', 'front-end', 'frontend', 'code', 'engineer'], evidence: 'Builds in React and TypeScript, including HIPAA-compliant role-based permissions at the Roux Institute.' },
  { label: 'Data, metrics and experimentation', keywords: ['a/b', 'experiment', 'metric', 'analytics', 'data-driven', 'data driven', 'kpi', 'dashboard', 'data visual'], evidence: 'A/B tests on Rovo AI entry points and payment screens, and D3 analytics dashboards (Tickerline, Folio Tracker).' },
  { label: 'Enterprise and B2B SaaS', keywords: ['b2b', 'saas', 'enterprise', 'admin', 'workflow', 'platform', 'collaboration tool'], evidence: 'Designs enterprise workflows in Jira, Confluence and Jira Service Management at Atlassian.' },
  { label: 'Healthcare', keywords: ['health', 'clinical', 'patient', 'hipaa', 'medical'], evidence: 'A HIPAA-compliant digital health portal at the Roux Institute, plus the AI Care Navigator and Restoration Medicine case studies.' },
  { label: 'Fintech', keywords: ['fintech', 'banking', 'payment', 'finance', 'financial', 'trading', 'checkout'], evidence: 'Retail banking onboarding at Hexaware (40% higher task success), the Quorum fintech design system and Folio Tracker.' },
  { label: 'Mobile', keywords: ['mobile', 'ios', 'android', 'native app', 'apple hig', 'material design'], evidence: 'Hearth and Pulse, iOS and Android apps designed through to engineering handoff.' },
  { label: 'Collaboration and leadership', keywords: ['cross-functional', 'stakeholder', 'mentor', 'workshop', 'sprint', 'agile', 'collaborat', 'lead ', 'leadership'], evidence: 'Leads design sprints with product and engineering, mentored 150+ graduate students as lead TA, and founded a 90-member design club.' },
]

const JD_HINTS = /(responsibilit|requirement|qualification|what you('|’)ll do|you will|we('|’)re looking|we are looking|about the role|nice to have|preferred|years of experience|must have|job description)/

const looksLikeJobDescription = (msg: string) =>
  msg.startsWith('job description:') || (msg.length > 260 && JD_HINTS.test(msg))

function analyzeFit(raw: string): string {
  const msg = ` ${raw.toLowerCase().replace(/[\n\r]+/g, ' ')} `
  const matches = FIT_SIGNALS
    .map(s => ({ s, hits: s.keywords.filter(k => msg.includes(k)).length }))
    .filter(x => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)

  const years = msg.match(/(\d+)\s*\+?\s*(?:-|to)?\s*\d*\s*years/)
  const asked = years ? Number(years[1]) : null
  const mine = parseInt(PROFILE.yearsExperience, 10)

  if (matches.length === 0) {
    return `I could not map this description to Karishma’s experience with confidence. Her core is **product design for complex products**: research, interaction design, design systems, accessibility and AI experiences, backed by React and TypeScript.\n\nIf you share more about the role, I can be more specific, or you can reach her at ${PROFILE.email}.`
  }

  const strength = matches.length >= 5 ? 'a strong match' : matches.length >= 3 ? 'a solid match' : 'a partial match'
  const lines = matches.slice(0, 5).map(({ s }) => `- **${s.label}:** ${s.evidence}`)
  const discuss: string[] = []
  if (asked !== null && asked > mine) {
    discuss.push(`The role asks for ${asked}+ years. Karishma has ${PROFILE.yearsExperience} years of product design experience, with depth in enterprise software, healthcare and fintech.`)
  }
  discuss.push('Anything I have not mapped above is best discussed with her directly. She can walk you through the most relevant work.')

  return `Based on this description, Karishma looks like **${strength}**.\n\n**Strong matches**\n${lines.join('\n')}\n\n**Worth discussing**\n${discuss.map(d => `- ${d}`).join('\n')}`
}

/* ───────────────────────── Retrieval fallback ───────────────────────── */

const STOP = new Set('a an and are as at be been but by can could did do does for from had has have her hers herself him his how i if in into is it its me my of on or our she so than that the their them then there these they this to too us was we were what when where which who whom why will with would you your yours about any tell know much many more some also just very really please give show me let lets'.split(' '))

const tokenize = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9%+/.\- ]/g, ' ').split(/\s+/)
    .map(t => t.replace(/^[^a-z0-9]+|[^a-z0-9%+]+$/g, ''))
    .filter(t => t.length > 2 && !STOP.has(t))
    .map(t => t.replace(/(ing|ed|es|s)$/, ''))

interface Fact { text: string; source: string; tokens: string[] }

const FACTS: Fact[] = (() => {
  const facts: { text: string; source: string }[] = []
  for (const r of EXPERIENCE) for (const h of r.highlights ?? []) facts.push({ text: `At ${orgShort(r.org)}: ${h}`, source: SRC.resume })
  for (const p of projects) {
    facts.push({ text: `**${p.title}:** ${p.description}`, source: SRC.caseStudy(p) })
    facts.push({ text: `**${p.title}:** ${p.caseStudy.solution}`, source: SRC.caseStudy(p) })
    for (const f of p.caseStudy.keyFeatures) facts.push({ text: `**${p.title}** includes ${lower(f)}.`, source: SRC.caseStudy(p) })
  }
  for (const t of AI_EXTRA_FACTS.teaching) facts.push({ text: t, source: SRC.resume })
  for (const l of AI_EXTRA_FACTS.leadership) facts.push({ text: l, source: SRC.resume })
  for (const e of AI_EXTRA_FACTS.education) facts.push({ text: e, source: SRC.resume })
  for (const p of AI_EXTRA_FACTS.resumeProjects) facts.push({ text: p, source: SRC.resume })
  facts.push({ text: `Her certifications: ${AI_EXTRA_FACTS.certifications.join('; ')}.`, source: SRC.resume })
  return facts.map(f => ({ ...f, tokens: tokenize(f.text) }))
})()

const IDF = (() => {
  const df = new Map<string, number>()
  for (const f of FACTS) for (const t of new Set(f.tokens)) df.set(t, (df.get(t) ?? 0) + 1)
  const n = FACTS.length
  const idf = new Map<string, number>()
  for (const [t, d] of df) idf.set(t, Math.log(1 + n / d))
  return idf
})()

function retrieve(message: string): Fact[] {
  const q = [...new Set(tokenize(message))]
  if (!q.length) return []
  const scored = FACTS.map(f => {
    const set = new Set(f.tokens)
    let score = 0
    let strong = 0
    for (const t of q) {
      if (!set.has(t)) continue
      const w = IDF.get(t) ?? 0
      score += w
      if (w > 2.2) strong++
    }
    return { f, score, strong }
  }).filter(x => x.strong > 0 && x.score >= 4)
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2).map(x => x.f)
}

/* ───────────────────────── Privacy ───────────────────────── */

function isPrivate(msg: string): 'current' | 'personal' | null {
  if (/currently working|current project|working on now|what are you working on|what project.*working on/.test(msg)) return 'current'
  const personal = [
    /where does she work|working currently|where is she working|who does she work for|what company does she work for|is she looking for work|looking for work|working full-time|working remotely/,
    /father's name|fathers name|mother's name|mothers name|her parent|her sibling|is she married|she have a boyfriend|she have a girlfriend|when is her birthday|where was.*born|what is her address|does she have.*pet|she have.*pet/,
    /therapist|therapy|mental health|coffee or tea person|astrology|believe in astrology|lived there|how long.*lived/,
    /her salary|her income|how much does she earn|how much does she make|her net worth|how much is she worth|how much did she earn|her debt|she have.*debt|her student loan|how much debt|how much money does she|how much has she saved|how much does she owe|how much is her rent|how much earn|how much make|how much saved/,
    /her favorite|her hobby|her hobbies|she do for fun|does she exercise|is she vegan|is she vegetarian|her diet|is she healthy|she wear glasses|does she drink coffee|her daily routine|she wake up|she spend her time|she feeling|she get around|drink coffee|apple or android|how much drink|favorite social media|what good at/,
    /her career goal|her aspiration|her dream job|her future plan|she see herself|she introverted|she extroverted|her friend|where does she want to work|her next steps|do believe fate|do believe luck|what life philosophy|how long commute|how long relationship|how long together/,
    /cultural background|how long has she been|job offers|considering any offers|she considering|they break up|have received offers|are on social media|is she on social media/,
    /career plan|plans? for (her )?career|change careers?|career change|first career|first job|relocat/,
    /\b(visa|sponsorship|sponsor|work authori[sz]ation|green card|h-?1b|opt\b|stem opt|citizenship|immigration)\b|salary expectation|expected salary|compensation expectation/,
    /fitness routine|workout routine|her workout|does she (work ?out|party|go clubbing|invest|follow)|stocks? (does she|she) own|her (stocks|investments|record)|biggest win|satisfied at work|companies is she targeting|where does she want to be|remember (her )?first job|who does she follow|does she have a mentor|who is her mentor|her mentor\b/,
    /\b(family|relationship status|dating|boyfriend|girlfriend|spouse|husband|wife|married|role models?|personality|political|politics|religio\w*|medications?|medical conditions?|insurance|bank balance|financial status|student loans?|afford|sleep\w*|routine|weekends?|relax\w*|laugh|angry|sad|happy|keeps her going|video games?|bars?|clubbing|party|cardio|pushups|lift weights|gym|first language|native language|neighbou?rhood|targeting|interviewing|applied to|still a student|current job|start a business)\b/,
    /(have a|her|in a|meet|what) partner|(where|who) (does|did|would|do) (she )?(like to )?live|live (alone|with|anywhere)|currently live|does she want to|would she like to|where would she like|does she do at work|(facebook|instagram|twitter|tiktok|snapchat|whatsapp|reddit|dating app)|laptop|macbook|phone model|what phone|computer (does she )?use|what computer|apps? (does she )?use|what apps|post personal/,
  ]
  return personal.some(r => r.test(msg)) ? 'personal' : null
}

/* ───────────────────────── Answer builders ───────────────────────── */

function projectDetail(p: Project, deep = false): string {
  if (deep) {
    const process = p.caseStudy.process.map(s => `- **${s.phase}:** ${s.description}`)
    return `How **${p.title}** came together:\n\n${process.join('\n')}\n\nBuilt with ${p.caseStudy.technologies.join(', ')}.`
  }
  const results = p.caseStudy.results.slice(0, 3).map(r => `- **${r.value}** ${r.metric.toLowerCase()}: ${lower(r.description)}`)
  return `**${p.title}** is ${lower(p.subtitle)}.\n\n${p.description}\n\n${results.join('\n')}`
}

function roleDetail(r: CareerItem, msg = ''): string {
  const q = new Set(tokenize(msg))
  const highlights = [...(r.highlights ?? [])].sort((a, b) =>
    tokenize(b).filter(t => q.has(t)).length - tokenize(a).filter(t => q.has(t)).length)
  const metrics = (r.metrics ?? []).map(m => `**${m.value}** ${lower(m.label)}`).join(', ')
  return `As **${r.title}** at **${orgShort(r.org)}** (${r.period}), Karishma worked on ${lower(r.summary ?? '')}\n\n${highlights.map(h => `- ${h}`).join('\n')}${metrics ? `\n\nHeadline results: ${metrics}.` : ''}`
}

const projectsAsActions = (ids: string[]) =>
  ids.map(projectById).filter((p): p is Project => !!p).slice(0, 2).map(ACTIONS.caseStudy)

function respondTopic(topic: string, context: ConversationContext): SmartResponse | null {
  switch (topic) {
    case 'capabilities':
      return {
        topic,
        response:
          'I am Karishma’s AI assistant. I know her experience, case studies, skills and recommendations, and I can:\n\n' +
          '- Summarize her background in a few lines\n- Walk you through any case study\n- Check how her experience matches a job description\n- Point you to her résumé and contact details\n\nWhat would you like to know?',
        suggestions: ['Summarize her in 3 lines', 'Show me her best work', 'Check fit for my role'],
      }
    case 'thanks':
      return { topic, response: 'You are welcome. Is there anything else you would like to know about Karishma’s work?', suggestions: FOLLOW_UPS.general }
    case 'bye':
      return { topic, response: `Thank you for visiting. If you would like to continue the conversation, Karishma is at ${PROFILE.email}.`, suggestions: [], actions: [ACTIONS.email, ACTIONS.resume] }
    case 'summary': {
      const m = allMetrics()
      return {
        topic,
        response:
          `Karishma Dilip Gawali is a product designer with more than four years of experience turning complex, high-stakes workflows into products people trust. ` +
          `Her work spans enterprise software, conversational AI, healthcare and fintech, with results such as **${m[0]?.value}** ${lower(m[0]?.label ?? '')} and **${m[1]?.value}** ${lower(m[1]?.label ?? '')}. ` +
          `She pairs research and interaction design with React and TypeScript, and she has mentored more than 150 graduate designers.`,
        suggestions: ['Why hire Karishma?', 'Show me her best work', 'Check fit for my role'],
        actions: [ACTIONS.resume],
        sources: [SRC.resume],
      }
    }
    case 'pitch': {
      const quote = TESTIMONIAL_QUOTES[0]
      const where: Record<string, string> = {
        atlassian: 'enterprise software at Atlassian',
        roux: 'a HIPAA-compliant health portal at the Roux Institute',
        hexaware: 'retail banking at Hexaware Technologies',
      }
      const places = EXPERIENCE.map(r => where[r.id] ?? orgShort(r.org))
      places[0] = places[0].charAt(0).toUpperCase() + places[0].slice(1)
      const metrics = EXPERIENCE.map(r => r.metrics?.[0]).filter(Boolean).map(m => `**${m!.value}** ${lower(m!.label)}`)
      return {
        topic,
        response:
          'Three qualities stand out:\n\n' +
          `- **Complex, high-stakes products.** ${places.slice(0, -1).join(', ')}, and ${places[places.length - 1]}.\n` +
          `- **Measurable outcomes.** ${metrics.slice(0, -1).join(', ')}, and ${metrics[metrics.length - 1]}.\n` +
          '- **Design that ships.** Research and interaction design backed by React and TypeScript, with accessibility built in from the start.\n\n' +
          `“${quote.quote.split('. ')[0]}.” ${quote.name}, ${quote.role.split(',').pop()?.trim()}`,
        suggestions: ['Walk me through a case study', 'Check fit for my role', 'How do I contact her?'],
        actions: [ACTIONS.resume, ACTIONS.email],
        sources: [SRC.resume, SRC.recs],
      }
    }
    case 'impact': {
      const lines = allMetrics().map(m => `- **${m.value}** ${lower(m.label)} (${m.org})`)
      return {
        topic,
        response: `Her measurable impact, role by role:\n\n${lines.join('\n')}\n\nShe also mentored more than 150 graduate designers and led a 90-member design club that launched 7 accessible websites.`,
        suggestions: ['How did she achieve that?', 'Show me her best work', 'Check fit for my role'],
        actions: [ACTIONS.resume],
        sources: [SRC.resume],
      }
    }
    case 'industries':
      return {
        topic,
        response: 'Karishma has designed across:\n\n- **Enterprise SaaS:** Jira, Confluence and Jira Service Management at Atlassian\n- **Healthcare:** a HIPAA-compliant patient portal, AI Care Navigator and Restoration Medicine\n- **Fintech:** retail banking, payments, trading analytics and investment tracking\n- **Consumer and IoT:** Hearth (smart home), Pulse (wearables) and RePack (sustainable e-commerce)',
        suggestions: ['Tell me about healthcare work', 'Tell me about fintech work', 'Show me her best work'],
        sources: [SRC.resume, SRC.site],
      }
    case 'years': {
      const first = EXPERIENCE[EXPERIENCE.length - 1]
      return {
        topic,
        response: `Karishma has **${PROFILE.yearsExperience} years** of professional product design experience, beginning at ${orgShort(first.org)} in ${first.period.split(' – ')[0]}:\n\n${EXPERIENCE.map(r => `- **${r.title}**, ${orgShort(r.org)} (${r.period})`).join('\n')}\n\nShe also has teaching and HCI research experience at Northeastern University and the University of Mumbai.`,
        suggestions: ['What was her biggest impact?', 'Where did she study?', 'Check fit for my role'],
        actions: [ACTIONS.resume],
        sources: [SRC.resume],
      }
    }
    case 'location':
      return { topic, response: `Karishma is based in ${PROFILE.location}. For anything about work arrangements, it is best to ask her directly at ${PROFILE.email}.`, suggestions: FOLLOW_UPS.general, actions: [ACTIONS.email] }
    case 'email':
      context.askedAboutContact = true
      return { topic, response: `Her email is **${PROFILE.email}**. She typically replies within 24 hours.`, suggestions: ['Open her résumé', 'Why hire Karishma?', 'Show me her best work'], actions: [ACTIONS.email, ACTIONS.linkedin] }
    case 'linkedin':
      return { topic, response: 'Here are her profiles:\n\n- [LinkedIn](' + PROFILE.links.linkedin + '), with recommendations from managers and clients\n- [GitHub](' + PROFILE.links.github + ')\n- [Behance](' + PROFILE.links.behance + ')', suggestions: ['What do people say about her?', 'How do I contact her?', 'Show me her best work'], actions: [ACTIONS.linkedin, ACTIONS.github, ACTIONS.behance] }
    case 'best-project': {
      const p = projectById('ai-care-navigator')!
      context.lastProject = p.id
      if (!context.projectsDiscussed.includes(p.id)) context.projectsDiscussed.push(p.id)
      return {
        topic: 'projects',
        response: `A strong place to start is **AI Care Navigator**. It brings together her strengths in one project: research with 25 patient interviews, AI-powered features, accessible design, and measurable results such as **+73%** patient engagement and **94%** appointment adherence.\n\nFor enterprise depth, ask about her work at Atlassian. For mobile, look at **Pulse** or **Hearth**.`,
        suggestions: ['Tell me more', 'Show another project', 'Why hire Karishma?'],
        actions: [ACTIONS.caseStudy(p)],
        sources: [SRC.caseStudy(p)],
      }
    }
    case 'research-projects': {
      const ids = ['ai-care-navigator', 'restoration-medicine', 'fitness-wearable', 'repack-portal']
      const lines = ids.map(projectById).filter((p): p is Project => !!p).map(p => `- **${p.title}:** ${p.caseStudy.process[0]?.description ?? ''}`)
      return {
        topic,
        response: `These case studies show her research most clearly:\n\n${lines.join('\n')}`,
        suggestions: ['Tell me about AI Care Navigator', 'How does she approach research?', 'Check fit for my role'],
        actions: projectsAsActions(ids),
        sources: [SRC.site],
      }
    }
    case 'education':
      return {
        topic,
        response: `Karishma’s education:\n\n${EDUCATION.map(e => `- **${e.title}**, ${e.org} (${e.period})`).join('\n')}\n\nHer master’s focused on human-computer interaction and computer science, with a GPA of 3.75/4.0. She also holds the Google UX Design Professional Certificate and Adobe Certified Professional: Product Design.`,
        suggestions: ['Summarize her experience', 'Tell me about teaching', 'Why hire Karishma?'],
        sources: [SRC.resume],
      }
    case 'teaching': {
      const ta = TEACHING_RESEARCH[0]
      return {
        topic,
        response:
          `Karishma served as **${ta.title}** for ${ta.focus} at ${ta.org} (${ta.period}).\n\n` +
          `${AI_EXTRA_FACTS.teaching.slice(1).map(t => `- ${t}`).join('\n')}`,
        suggestions: ['Tell me about leadership', 'Summarize her experience', 'Why hire Karishma?'],
        sources: [SRC.resume],
      }
    }
    case 'leadership': {
      const club = LEADERSHIP[0]
      return {
        topic,
        response:
          'Leadership shows up across her work:\n\n' +
          `- **${club.title}, ${club.focus}** at ${club.org}: grew it to **90 members** and directed team leads who delivered **7 accessible websites** for university departments.\n` +
          '- **Lead teaching assistant:** directed TAs across 7 course sections and mentored **150+** graduate students.\n' +
          '- **At work:** leads discovery and design sprints with product and engineering partners.',
        suggestions: ['Tell me about teaching', 'Summarize her experience', 'Why hire Karishma?'],
        sources: [SRC.resume],
      }
    }
    case 'testimonials': {
      const picks = TESTIMONIAL_QUOTES.slice(0, 3).map(t => `- “${t.quote}” **${t.name}**, ${t.role}`)
      return {
        topic,
        response: `Here is what people who have worked with her say:\n\n${picks.join('\n\n')}\n\nEvery recommendation is verified on LinkedIn.`,
        suggestions: ['Why hire Karishma?', 'Show me her best work', 'How do I contact her?'],
        actions: [ACTIONS.linkedin],
        sources: [SRC.recs],
      }
    }
    case 'resume':
      return {
        topic,
        response: `Here is Karishma’s résumé. It covers ${PROFILE.yearsExperience} years of product design across ${EXPERIENCE.map(r => orgShort(r.org)).join(', ')}, along with teaching, research and education. It opens as a PDF in a new tab.`,
        suggestions: ['Summarize her experience', 'Why hire Karishma?', 'How do I contact her?'],
        actions: [ACTIONS.resume, ACTIONS.linkedin],
        sources: [SRC.resume],
      }
    case 'ai':
      return {
        topic,
        response: AI_ANSWER,
        suggestions: ['Tell me about AI Care Navigator', 'Check fit for my role', 'Why hire Karishma?'],
        actions: [ACTIONS.caseStudy(projects[0])],
        sources: [SRC.resume, SRC.caseStudy(projects[0])],
      }
    case 'fit-intro':
      return {
        topic,
        response: 'Happy to check. Paste the job description, or the key requirements, and I will map them to Karishma’s experience: strong matches with evidence, plus anything worth discussing.',
        suggestions: [],
      }
    default:
      return null
  }
}

function detectTopic(msg: string): string | null {
  const t = msg.trim()
  if (/\b(who are you|what are you|what can you (do|help)|how can you help|what do you do|are you (a bot|real|human|an ai|ai)|help me)\b/.test(t)) return 'capabilities'
  if (/^(thanks|thank you|thx|ty|great|awesome|cool|nice|perfect|ok|okay|got it|amazing|wonderful)\b[\s!.,a-z]{0,20}$/.test(t)) return 'thanks'
  if (/^(bye|goodbye|see you|that'?s all)\b/.test(t)) return 'bye'
  if (/\b(fit|match|right fit|good fit|suitable|qualified) for (my|our|a|the|this)\b.*\b(role|job|position|team|opening)\b|job description|\bjd\b|check (her )?fit|role fit/.test(t)) return 'fit-intro'
  if (/\b(resume|résumé|cv|curriculum vitae)\b/.test(t)) return 'resume'
  if (/\b(linkedin|github|behance|portfolio links?|social profiles?)\b/.test(t)) return 'linkedin'
  if (/\b(email|e-mail|mail id|email address)\b/.test(t) && !/\b(how|when|should)\b/.test(t)) return 'email'
  if (/where (is she|are you) (based|located)|based (in|out of)|which city|what city|\blocation\b/.test(t)) return 'location'
  if (/summar|tl;?dr|in (\d|one|two|three|a few) (lines?|sentences?|words)|brief (intro|introduction|overview)|in a nutshell|elevator pitch|introduce (her|karishma|yourself)|who is karishma|tell me about (her|karishma)$|quick overview|overview of (her|karishma)/.test(t)) return 'summary'
  if (/(best|strongest|top|most impressive|flagship|signature|standout) (project|case study|work)|best work|which (project|case study) should i (look|see|start|read)|where should i start/.test(t)) return 'best-project'
  if (/which (project|case study|work).*(research|interview)|research.*(project|case stud)/.test(t)) return 'research-projects'
  if (/why (should|would) (i|we|anyone|a company) (hire|choose|pick|interview)|why hire|why karishma|stand out|sets? her apart|what makes (her|you|karishma) (different|special|unique|stand)|her (biggest |key |main |core )?strengths|(what is|what's) she best at|best at|superpower|is she a (good|great|strong|talented) designer|good designer|great designer|top skills|core skills/.test(t)) return 'pitch'
  if (/\b(impact|achievements|accomplishments|outcomes|metrics|numbers|results)\b/.test(t) && !findProject(t)) return 'impact'
  if (/industr|domains?\b|sectors?|verticals?|what (kind|type)s? of (companies|products|clients|teams)/.test(t)) return 'industries'
  if (/how (many|much) years|years of (experience|work)|how experienced|experience level|seniority|how senior|is she (a )?senior/.test(t)) return 'years'
  if (/recommendation|testimonial|reference|what do (people|others|colleagues|managers|clients) say|what (did|do) .* say about her|endorse|reviews? of her/.test(t)) return 'testimonials'
  if (/where did (she|you) study|what did (she|you) study|studied|degree|masters?\b|master's|bachelor|universit|college|\bgpa\b|education|certif|(when|where) did (she|you) graduate|\bmajor\b/.test(t)) return 'education'
  if (/\b(teach|teaching|teaching assistant|ta)\b/.test(t)) return 'teaching'
  if (/\b(leader|leadership|led a team|lead a team|lead teams|founder|founded|design club|web design club|mentored|mentoring|mentorship|does she mentor|she mentors|managed (a )?team|manage people)\b/.test(t)) return 'leadership'
  if (/\b(ai|a\.i\.|artificial intelligence|machine learning|llm|genai|gen ai|generative|conversational|chatbot|rovo|copilot|agentic|agents?)\b/.test(t) && !/ai care/.test(t)) return 'ai'
  return null
}

const SKILL_QUESTION = /\b(does she|can she|has she|is she|do you|can you|have you|are you|did she)\b.*\b(know|knows|use|uses|used|using|work(ed|s)? with|experience|experienced|familiar|proficient|skilled|comfortable|good (at|with)|fluent|design|build|code|handle|understand)\b|\bexperience (with|in)\b|\bknowledge of\b|\bskills? in\b/

function skillMatches(msg: string): { skill: Skill; alias: string }[] {
  const found: { skill: Skill; alias: string }[] = []
  for (const skill of SKILLS) {
    const alias = skill.aliases.find(a => (a.length <= 3 ? new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}\\b`).test(msg) : msg.includes(a)))
    if (alias) found.push({ skill, alias })
  }
  return found
}

function extractSubject(msg: string): string | null {
  const m = msg.match(/\b(?:know|use|used|using|worked with|work with|code in|build with|familiar with|proficient in|experience with|experience in|knowledge of|skilled in)\s+(?:any\s+|the\s+|a\s+)?([a-z0-9.+#/ -]{2,28}?)(?:\s+(?:well|too|as well|at all|before))?\s*\??$/)
  if (!m) return null
  const subject = m[1].trim()
  if (!subject || /^(it|that|this|them|her|him|she|you|me|us|things|stuff|everything|anything)$/.test(subject)) return null
  return subject
}

/* ───────────────────────── Legacy topics (services, pricing, process…) ───────────────────────── */

function legacyIntent(msg: string): string {
  if (/contact|your email|email address|reach out|reach you|hire you|hire her|work with you|work together|available for|collaboration|get in touch|how can i work|where are you located|schedule a call|book a|taking new clients|how quickly|get started|next step|portfolio website|discovery call|meet in person|work remotely|timezone|international clients|travel for projects|sign nda|provide references|see your work|send you a message|send message|verify your work|what information do you need|what information needed|verify work|interview her|set up an interview/.test(msg)) return 'contact'
  if (/(social media|are you on|how.*respond|response time|how.*book|how do i start|work internationally|do you travel)/.test(msg)) return 'contact'
  if (/\b(can you code|coding|programming language)\b/.test(msg)) return 'skills'
  if (/\b(typescript|javascript|html|css|react|vue|angular|node)\b/.test(msg)) return 'skills'
  if (/skill|expert|capable|proficient|tech stack|good at|specialty|makes you different|frameworks|technologies do you know|programming languages do you know|experienced in|tools/.test(msg)) return 'skills'
  if (/do you (use|know|have|understand|do).*adobe|sketch|figma|redux|sass|bootstrap|wireframe|prototyp|research|accessibility|design system|front-end|responsive|animation|interaction|information architecture|visual design|product design|documentation|usability|design thinking|api|git|version control|a\/b test|data visual|mobile design|ios|android|component librar|typescript|javascript|html|css/.test(msg)) return 'skills'
  if (/can you (do|create|work with|design|build).*wireframe|wireframing|prototype|research|accessibility|animation|interaction|architecture|documentation|api|a\/b test|data visual|mobile|ios|android/.test(msg)) return 'skills'
  if (/are you (familiar|good|experienced).*redux|sass|bootstrap|adobe|git|component/.test(msg)) return 'skills'
  if (/what about.*project|case stud|best work|industries.*worked|client work|fintech|show.*ui|saas|show.*recent work|show.*portfolio|show me examples|examples of (your|her) work|another project/.test(msg)) return 'projects'
  if (/biggest achievement.*(portfolio|your work)|what is your biggest achievement/.test(msg)) return 'projects'
  if (/(startup|scale|e-commerce|ecommerce|b2b|b2c|cross-platform).*experience/.test(msg)) return 'projects'
  if (/do you have.*(startup|fintech|saas|e-commerce|ecommerce|b2b|b2c|healthcare|mobile.*app).*experience/.test(msg)) return 'projects'
  if (/what.*scale.*product/.test(msg)) return 'projects'
  if (/project|portfolio|built|example|showcase/.test(msg)) return 'projects'
  if (/branding|brand identity/.test(msg)) return 'services'
  if (/service|offer|provide|help|design|develop|user testing|prototypes|create prototype|work with startups|work with my team|join.*team|join existing team/.test(msg)) return 'services'
  if (/(do you|can you|do you offer|can you do|can you help).*(ux audit|competitive analysis|user persona|customer journey|journey map|design sprint|mvp|product strategy|redesign|maintenance|design handoff|workshop|train|design review|branding strategy|style guide|build design system|illustration|icon design|marketing material|presentation|cms|seo|hosting)/.test(msg)) return 'services'
  if (/(can you|do you).*(map).*(journey|customer)/.test(msg)) return 'services'
  if (/what universities.*attend|have you worked at.*startup|have you worked at.*tech|have you mentored|what companies.*worked for/.test(msg)) return 'experience'
  if (/what makes you qualified|can you share qualifications/.test(msg)) return 'experience'
  if (/background|qualification|internship|where have you worked|teaching experience|what is her experience|experience|work history|career|previous (roles|jobs)/.test(msg)) return 'experience'
  if (/process|approach|methodology|workflow|how do you/.test(msg)) return 'process'
  if (/(how do you|what is your|what.*metric).*(start|research|gather|design thinking|validate|iterative|handle feedback|collaboration|communicate|deliverable|prioritize|tool.*collaboration|ensure quality|agile|measure success|metric|track|test design|qa)/.test(msg)) return 'process'
  if (/what tools do you use|do you follow agile/.test(msg)) return 'process'
  if (/price|cost|rate|budget|how much|fee|payment|charge|investment/.test(msg)) return 'pricing'
  if (/(minimum|pricing model|fixed price|pay monthly|deposit|payment method|payment plan|within.*budget|pricing include|additional cost|charge for revision|cancellation|refund|quote|estimate|pricing.*calculat|included in investment)/.test(msg)) return 'pricing'
  if (/timeline|how long|duration|time frame|deadline|how fast|turnaround|when can we launch/.test(msg)) return 'timeline'
  if (/(when are you available|your availability|how soon|current availability|simple website|tight deadline|minimum.*duration|discovery take|when.*deliver|quickly.*prototype|lead time|rush project|taking new project|when can we start)/.test(msg)) return 'timeline'
  if (/(design philosophy|why.*ux important|define.*design|what makes.*great product|balance.*aesthetic|user-centered|ucd|what makes you unique|stay current|what inspires you|what problem solving|what drives you|focus.*satisfaction|your vision|define success|believe.*data-driven|what values|why.*design|why should.*choose you|why.*choose)/.test(msg)) return 'philosophy'
  if (/philosophy|believe|principle/.test(msg)) return 'philosophy'
  return 'general'
}

function respondLegacy(intent: string, message: string, context: ConversationContext): SmartResponse | null {
  const email = PROFILE.email
  switch (intent) {
    case 'skills': {
      context.askedAboutSkills = true
      const s = AI_EXTRA_FACTS.skills
      return {
        topic: intent,
        response:
          'Karishma’s skills at a glance:\n\n' +
          `- **Research:** ${s.research.split(', ').slice(0, 5).join(', ')}\n` +
          `- **Design:** ${s.design.split(', ').slice(0, 6).join(', ')}\n` +
          '- **Accessibility:** WCAG 2.2 AA, inclusive design, screen reader testing\n' +
          '- **AI:** conversational UI, copilots, generative AI ideation\n' +
          '- **Code:** React, TypeScript, JavaScript, Node.js, D3.js, Storybook',
        suggestions: FOLLOW_UPS.afterSkill,
        sources: [SRC.resume],
      }
    }
    case 'projects': {
      const unseen = projects.filter(p => !context.projectsDiscussed.includes(p.id))
      if (/another|other|next|different/.test(message) && unseen.length) {
        const p = unseen[0]
        context.lastProject = p.id
        context.projectsDiscussed.push(p.id)
        return { topic: intent, response: projectDetail(p), suggestions: FOLLOW_UPS.afterProject, actions: [ACTIONS.caseStudy(p)], sources: [SRC.caseStudy(p)] }
      }
      const list = projects.map(p => `- **${p.title}:** ${lower(p.subtitle)}, ${p.metrics[0].value} ${p.metrics[0].label.toLowerCase()}`)
      return {
        topic: intent,
        response: `There are six case studies on this site:\n\n${list.join('\n')}\n\nAsk about any of them and I will walk you through it.`,
        suggestions: ['Which is her best project?', 'Tell me about Pulse', 'Tell me about RePack Portal'],
        sources: [SRC.site],
      }
    }
    case 'experience': {
      context.lastTopic = 'experience'
      context.lastRole = EXPERIENCE[0]?.id
      const roles = EXPERIENCE.map(r => `- **${r.title}**, ${orgShort(r.org)} (${r.period}): ${lower(r.summary ?? '')}`)
      return {
        topic: intent,
        response: `Karishma has ${PROFILE.yearsExperience} years of product design experience:\n\n${roles.join('\n')}\n\nShe has also taught and conducted research at Northeastern University and the University of Mumbai.`,
        suggestions: FOLLOW_UPS.afterRole,
        actions: [ACTIONS.resume],
        sources: [SRC.resume],
      }
    }
    case 'services':
      return {
        topic: intent,
        response: 'Karishma can help with:\n\n- UX and UI strategy\n- Web application design and development\n- Design systems and component libraries\n- Brand identity and visual design\n- Landing pages and marketing sites\n- Motion and 3D visuals\n\nEvery engagement is grounded in research and measured by outcomes.',
        suggestions: ['What is her process?', 'Show me examples', 'How do I contact her?'],
        sources: [SRC.site],
      }
    case 'contact':
      context.askedAboutContact = true
      return {
        topic: intent,
        response: `The best way to reach Karishma is by email at **${email}**. She typically replies within 24 hours.\n\nShe is based in ${PROFILE.location}, and you can also find her on LinkedIn.`,
        suggestions: ['Why hire Karishma?', 'Open her résumé', 'Show me her best work'],
        actions: [ACTIONS.email, ACTIONS.linkedin, ACTIONS.resume],
      }
    case 'process':
      return {
        topic: intent,
        response:
          'Her process is collaborative and evidence-led:\n\n' +
          '- **Discover:** interviews, Jobs-to-Be-Done, journey mapping and competitive analysis\n' +
          '- **Define:** success metrics, design principles and a clear problem statement\n' +
          '- **Design:** flows, prototypes and rounds of usability testing\n' +
          '- **Deliver:** specifications, design QA and handoff she can support in React and TypeScript\n' +
          '- **Measure:** analytics, A/B tests and iteration after launch',
        suggestions: ['Show me examples', 'How does she work with engineers?', 'Why hire Karishma?'],
        sources: [SRC.resume],
      }
    case 'pricing':
      return {
        topic: intent,
        response: `For freelance work, Karishma offers project-based, hourly and retainer engagements. Typical ranges:\n\n- UX audit: from $2,500\n- Landing page: $3,000 to $8,000\n- Brand identity: $5,000 to $15,000\n- Web application: $15,000 to $50,000+\n\nEvery project is scoped individually. Reach out at ${email} for a tailored proposal.`,
        suggestions: ['How long does a project take?', 'What services?', 'How do I contact her?'],
      }
    case 'timeline':
      return {
        topic: intent,
        response: 'Timelines depend on scope:\n\n- UX consultation: 1 to 2 weeks\n- Landing page: 2 to 3 weeks\n- Brand identity: 3 to 4 weeks\n- Web application: 8 to 12 weeks\n- Complete product: 3 to 6 months\n\nShe will give you an accurate estimate once she understands your goals.',
        suggestions: ['What is her process?', 'What are her rates?', 'How do I contact her?'],
      }
    case 'philosophy':
      return {
        topic: intent,
        response:
          'Karishma’s philosophy is to **make complex work feel effortless.**\n\n' +
          '- **Research over assumptions:** every decision traces back to evidence.\n' +
          '- **Outcomes over output:** success is measured in task completion, adoption and trust.\n' +
          '- **Accessible by default:** inclusive design from the first sketch.\n' +
          '- **Designed to ship:** she thinks in systems and code, so ideas survive handoff.',
        suggestions: ['Show me examples', 'What is her process?', 'Why hire Karishma?'],
      }
    default:
      return null
  }
}

/* ───────────────────────── Orchestration ───────────────────────── */

const withTopic = (r: SmartResponse, context: ConversationContext): SmartResponse => {
  context.lastTopic = r.topic
  return r
}

export const generateSmartResponse = (userMessage: string, context: ConversationContext): SmartResponse => {
  let msg = userMessage.toLowerCase().replace(/\s+/g, ' ').trim()

  // A greeting on its own is a greeting; "hi, <question>" is the question.
  const greeting = msg.match(/^(hi|hello|hey|good morning|good evening|good afternoon|greetings|sup|welcome|hola|namaste)\b[\s,!.]*/)
  if (greeting) {
    const rest = msg.slice(greeting[0].length).replace(/^(there|karishma|team)\b[\s,!.]*/, '').trim()
    if (rest.length < 3) {
      return withTopic({
        topic: 'greeting',
        response: 'Hello. I am Karishma’s AI assistant, and I know her experience, case studies and how she works.\n\nAsk me anything, or paste a job description and I will show you how she fits.',
        suggestions: ['Why hire Karishma?', 'Show me her best work', 'Check fit for my role'],
      }, context)
    }
    msg = rest
  }

  // 1. Job descriptions
  if (looksLikeJobDescription(msg)) {
    return withTopic({ topic: 'fit', response: analyzeFit(userMessage), suggestions: ['Show relevant case studies', 'Why hire Karishma?', 'How do I contact her?'], actions: [ACTIONS.resume, ACTIONS.email], sources: [SRC.resume, SRC.site] }, context)
  }

  // 2. Privacy first
  const privacy = isPrivate(msg)
  if (privacy) return withTopic({ topic: privacy, response: DEFER_TEXT, suggestions: ['Email Karishma'], actions: [ACTIONS.email] }, context)

  // 3. Follow-ups build on the previous answer
  const followUp = /^(tell me more|more|more details|go on|continue|elaborate|and\?|what else|keep going|expand on that|say more|how did she (do|achieve) (that|it)|how did she achieve that)\b/.test(msg)
  const refersBack = /\b(there|that role|that job|that project|it)\b/.test(msg) && /\b(metric|result|impact|number|achieve|do|work|role)\b/.test(msg)
  if (followUp || refersBack) {
    const p = context.lastProject ? projectById(context.lastProject) : undefined
    if (p && (context.lastTopic === 'projects' || context.lastTopic === 'followup')) {
      return withTopic({ topic: 'followup', response: projectDetail(p, true), suggestions: ['Show another project', 'Why hire Karishma?', 'How do I contact her?'], actions: [ACTIONS.caseStudy(p)], sources: [SRC.caseStudy(p)] }, context)
    }
    const role = EXPERIENCE.find(r => r.id === context.lastRole) ?? (context.lastTopic === 'impact' || context.lastTopic === 'experience' ? EXPERIENCE[0] : undefined)
    if (role) {
      context.lastRole = role.id
      return withTopic({ topic: 'role', response: roleDetail(role, msg), suggestions: FOLLOW_UPS.afterRole, actions: [ACTIONS.resume], sources: [SRC.resume] }, context)
    }
  }

  // 4. Specific project
  const project = findProject(msg)
  if (project) {
    context.lastProject = project.id
    if (!context.projectsDiscussed.includes(project.id)) context.projectsDiscussed.push(project.id)
    const deep = /\b(process|how did|approach|research|steps|phases|built|build|tech|stack|how was)\b/.test(msg)
    return withTopic({ topic: 'projects', response: projectDetail(project, deep), suggestions: FOLLOW_UPS.afterProject, actions: [ACTIONS.caseStudy(project)], sources: [SRC.caseStudy(project)] }, context)
  }

  // 5. Specific role ("what did she do at Roux?")
  const role = findRole(msg)
  if (role && !SKILL_QUESTION.test(msg)) {
    context.lastRole = role.id
    return withTopic({ topic: 'role', response: roleDetail(role, msg), suggestions: FOLLOW_UPS.afterRole, actions: [ACTIONS.resume], sources: [SRC.resume] }, context)
  }

  // 6. Clear topics (summary, strengths, impact, education…)
  const topic = detectTopic(msg)
  const skills = skillMatches(msg)
  if (topic && !(topic === 'ai' && skills.length > 1)) {
    const r = respondTopic(topic, context)
    if (r) return withTopic(r, context)
  }

  // 7. Skills, alone or combined ("design systems and accessibility")
  if (skills.length > 1) {
    const parts = skills.slice(0, 4).map(({ skill }) => skill.short)
    return withTopic({
      topic: 'skills',
      response: `Yes, Karishma has strong experience in each of these:\n\n${parts.map(p => `- ${p}`).join('\n')}`,
      suggestions: FOLLOW_UPS.afterSkill,
      actions: projectsAsActions(skills.flatMap(s => s.skill.examples ?? [])),
      sources: [SRC.resume],
    }, context)
  }
  if (skills.length === 1) {
    const { skill, alias } = skills[0]
    context.askedAboutSkills = true
    return withTopic({ topic: 'skills', response: skill.answer(alias), suggestions: FOLLOW_UPS.afterSkill, actions: projectsAsActions(skill.examples ?? []), sources: [SRC.resume] }, context)
  }

  // 8. Industries and domains ("would she fit a fintech company?")
  const workContext = /experience|worked?|projects?|case stud|fit|background|industr|compan|products?|design|clients?|domain|space|sector|startup|knowledge|familiar|done|team|role/.test(msg)
  const domain = workContext ? DOMAINS.find(d => d.aliases.some(a => msg.includes(a))) : undefined
  if (domain) {
    return withTopic({ topic: 'domain', response: domain.answer, suggestions: FOLLOW_UPS.general, actions: projectsAsActions(domain.projects), sources: [SRC.resume, SRC.site] }, context)
  }

  // 9. Specific technology from a case study stack, or an honest "not listed"
  if (SKILL_QUESTION.test(msg)) {
    const tech = [...projectTechIndex.keys()].find(t => msg.includes(t))
    if (tech) {
      const ps = projectTechIndex.get(tech)!
      return withTopic({
        topic: 'skills',
        response: `Yes. ${ps[0].caseStudy.technologies.find(t => t.toLowerCase() === tech)} is part of the stack in her ${ps.map(p => `**${p.title}**`).join(' and ')} case ${ps.length > 1 ? 'studies' : 'study'}.`,
        suggestions: FOLLOW_UPS.afterSkill,
        actions: projectsAsActions(ps.map(p => p.id)),
        sources: ps.map(SRC.caseStudy),
      }, context)
    }
    const subject = extractSubject(msg)
    if (subject && subject.split(' ').length <= 3) {
      return withTopic({
        topic: 'not-listed',
        response: `${subject.charAt(0).toUpperCase() + subject.slice(1)} is not listed on her résumé or in her case studies, so I cannot confirm it. Her core toolkit is Figma, ProtoPie and Framer for design, and HTML, CSS, JavaScript, TypeScript and React for front-end work.\n\nIf it matters for your role, you can ask her directly at ${PROFILE.email}.`,
        suggestions: ['What are her skills?', 'Check fit for my role', 'How do I contact her?'],
        actions: [ACTIONS.email],
        sources: [SRC.resume],
      }, context)
    }
  }

  // 10. Broader legacy topics (services, process, pricing…)
  const legacy = legacyIntent(msg)
  const legacyAnswer = respondLegacy(legacy, msg, context)
  if (legacyAnswer) return withTopic(legacyAnswer, context)

  // 11. Search everything she has published
  const workQuestion = /\b(design\w*|projects?|case stud\w*|products?|research|ux|ui|features?|platforms?|apps?|dashboards?|components?|prototyp\w*|usability|interfaces?|flows?|metrics?|accessib\w*|tokens?|figma|engineer\w*|clients?|startups?|portal|tracker|users?|patients?|banking|trading|wearables?|ai|data|systems?|teams?|built|build|launch\w*)\b/.test(msg)
  const found = workQuestion ? retrieve(msg) : []
  if (found.length) {
    return withTopic({
      topic: 'fact',
      response: found.length > 1 ? `Here is what I found in her work:\n\n${found.map(f => `- ${f.text}`).join('\n')}` : found[0].text,
      suggestions: FOLLOW_UPS.general,
      sources: [...new Set(found.map(f => f.source))],
    }, context)
  }

  return withTopic({ topic: 'general', response: DEFER_TEXT, suggestions: ['Email Karishma'], actions: [ACTIONS.email] }, context)
}

/** Suggestions to show under an answer from the live model, based on the question asked. */
export const suggestionsFor = (userMessage: string): string[] =>
  generateSmartResponse(userMessage, { projectsDiscussed: [], askedAboutContact: false, askedAboutSkills: false }).suggestions
