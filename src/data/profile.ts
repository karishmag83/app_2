/**
 * Single source of truth for Karishma's career facts.
 *
 * The About section, the on-device chat engine and the Claude-powered chat
 * endpoint all read from this file. When something changes (a new role, a new
 * metric), update it here once and every surface stays in sync.
 *
 * Plain data only: this file is also imported by Node on the server.
 */

export const PROFILE = {
  name: 'Karishma Dilip Gawali',
  firstName: 'Karishma',
  title: 'Product Designer',
  email: 'karishmadilipgawali@gmail.com',
  location: 'Boston, MA',
  resumeUrl: '/Karishma-Dilip-Gawali-Resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/karishmagawali/',
    github: 'https://github.com/karishmag83',
    behance: 'https://www.behance.net/karishmagawali',
  },
  yearsExperience: '4+',
  summary:
    'Product designer with 4+ years shipping web and mobile products for B2B and consumer markets, from discovery through launch. ' +
    'Combines user research and interaction design with front-end development fluency to create accessible design systems and ' +
    'conversational AI experiences that earn sustained adoption. Leads design sprints and mentors emerging designers while partnering ' +
    'with product and engineering to drive measurable outcomes.',
}

export interface Metric {
  value: string
  label: string
}

export interface CareerItem {
  id: string
  /** Which group this belongs to. */
  kind: 'experience' | 'teaching' | 'research' | 'leadership' | 'education'
  /** Role or degree. */
  title: string
  /** Course, field or focus that qualifies the title, e.g. "AI for UX". */
  focus?: string
  org: string
  location: string
  period: string
  /**
   * Shown on the site: one general sentence about the scope of the role.
   * Keep it application-agnostic; tailored achievements belong in the résumé.
   */
  brief?: string
  /** Shown on the site under the brief: two or three broad focus areas. */
  areas?: string[]
  /**
   * Square mark in public/logos, shown on a white tile. Logos are padded so the
   * mark fills about 58% of the canvas; keep new ones the same for even weight.
   */
  logo?: string
  /** Used by the AI assistant only (not rendered on the page). */
  summary?: string
  /** Used by the AI assistant only. */
  tags?: string[]
  /** Used by the AI assistant only. */
  metrics?: Metric[]
  /** Used by the AI assistant only. */
  highlights?: string[]
}

export const EXPERIENCE: CareerItem[] = [
  {
    id: 'atlassian',
    logo: '/logos/atlassian.svg',
    kind: 'experience',
    title: 'Product Designer',
    org: 'Atlassian',
    location: 'Boston, MA',
    period: 'Apr 2026 – Present',
    brief: 'Designing collaboration workflows and AI-assisted experiences for enterprise teams, from discovery research through design system delivery.',
    areas: ['Enterprise SaaS', 'Conversational AI', 'Design systems'],
    summary: 'Enterprise workflows in Jira and Confluence, conversational AI for Rovo, and the Atlassian Design System.',
    tags: ['Jira', 'Confluence', 'Rovo AI', 'Design System', 'Accessibility'],
    metrics: [
      { value: '22%', label: 'Faster task completion in Jira' },
      { value: '11%', label: 'Lift in Rovo AI adoption' },
      { value: '30+', label: 'Design system components unified' },
    ],
    highlights: [
      'Led Jobs-to-Be-Done discovery with Jira administrators and redesigned board and backlog filtering, accelerating task completion by 22%.',
      'Defined conversational patterns for Rovo AI search and agents in Confluence, validated through rapid prototyping and A/B testing, which increased initial adoption by 11%.',
      'Consolidated more than 30 tokenized components in the Atlassian Design System, improving developer handoff and implementation fidelity.',
      'Led WCAG 2.2 AA reviews for Jira Service Management and the Confluence editor, including screen reader and color contrast testing.',
    ],
  },
  {
    id: 'roux',
    logo: '/logos/northeastern.png',
    kind: 'experience',
    title: 'UI/UX Developer Co-op',
    org: 'Roux Institute, Northeastern University',
    location: 'Portland, ME',
    period: 'Jan 2025 – Jun 2025',
    brief: 'Designed and built a digital health portal with patients and clinicians, from participatory research to accessible React and TypeScript interfaces.',
    areas: ['Healthcare', 'Accessibility', 'Front-end development'],
    summary: 'A digital health portal designed with patients and clinicians, and built in React and TypeScript.',
    tags: ['Healthcare', 'HIPAA', 'React', 'TypeScript'],
    metrics: [
      { value: '25%', label: 'Faster scheduling and messaging' },
      { value: '94%', label: 'Biometric login success' },
    ],
    highlights: [
      'Facilitated participatory workshops with patients and clinicians, translating care journey insights into scheduling and secure messaging prototypes that accelerated task completion by 25%.',
      'Developed role-based permission frameworks in React and TypeScript to ensure HIPAA-compliant access to protected medical information.',
      'Conducted usability and accessibility studies of fingerprint and facial recognition sign-in with keyboard and assistive technology users, raising login success to 94%.',
      'Translated product requirements into detailed screen specifications and Agile release plans for predictable sprint delivery.',
    ],
  },
  {
    id: 'hexaware',
    logo: '/logos/hexaware.svg',
    kind: 'experience',
    title: 'Junior Product Designer',
    org: 'Hexaware Technologies',
    location: 'Mumbai, India',
    period: 'Jan 2021 – Jul 2023',
    brief: 'Designed onboarding, payment, and operations experiences for enterprise banking clients, supported by a shared component library.',
    areas: ['Fintech', 'Usability research', 'Component libraries'],
    summary: 'Retail banking onboarding, payment experiences and operations dashboards for enterprise clients.',
    tags: ['Fintech', 'Usability testing', 'Component library', 'Dashboards'],
    metrics: [
      { value: '40%', label: 'Higher onboarding task success' },
      { value: '35%', label: 'More efficient engineering handoff' },
    ],
    highlights: [
      'Mapped the retail banking account onboarding journey and refined the enrollment flow through successive usability studies, increasing task success by 40%.',
      'Created a reusable component library with usage guidelines, improving engineering handoff efficiency by 35%.',
      'Ran A/B experiments on payment screens that informed an optimized checkout experience.',
      'Designed accessible operations dashboards that meet WCAG 2.1 AA contrast and keyboard navigation criteria.',
    ],
  },
]

export const TEACHING_RESEARCH: CareerItem[] = [
  {
    id: 'neu-ta',
    logo: '/logos/northeastern.png',
    kind: 'teaching',
    title: 'Graduate Head Teaching Assistant',
    focus: 'AI for UX',
    org: 'Northeastern University',
    location: 'Boston, MA',
    period: '2024 – 2025',
    metrics: [{ value: '150+', label: 'Graduate designers mentored' }],
  },
  {
    id: 'mumbai-research',
    logo: '/logos/mumbai.png',
    kind: 'research',
    title: 'Research Scientist',
    focus: 'Human-Computer Interaction',
    org: 'University of Mumbai',
    location: 'Mumbai, India',
    period: '2022 – 2023',
  },
]

export const LEADERSHIP: CareerItem[] = [
  {
    id: 'design-club',
    logo: '/logos/northeastern.png',
    kind: 'leadership',
    title: 'Founder and Creative Director',
    focus: 'Web Design and Communications Club',
    org: 'Northeastern University',
    location: 'Boston, MA',
    period: '2024 – 2025',
    metrics: [
      { value: '90', label: 'Members' },
      { value: '7', label: 'Accessible sites launched' },
    ],
  },
]

export const EDUCATION: CareerItem[] = [
  {
    id: 'neu-ms',
    logo: '/logos/northeastern.png',
    kind: 'education',
    title: 'Master of Science in Information Systems',
    org: 'Northeastern University',
    location: 'Boston, MA',
    period: '2023 – 2025',
  },
  {
    id: 'mumbai-bca',
    logo: '/logos/mumbai.png',
    kind: 'education',
    title: 'PG Diploma in IT · Bachelor of Computer Applications',
    org: 'University of Mumbai',
    location: 'Mumbai, India',
    period: '2018 – 2022',
  },
]

/** Extra detail used only by the AI assistant (not rendered on the page). */
export const AI_EXTRA_FACTS = {
  teaching: [
    'Lead Teaching Assistant for graduate courses in User Experience Design & Testing and AI for UX at Northeastern University (2024–2025).',
    'Directed a team of TAs across 7 course sections and built calibrated grading rubrics for information architecture and visual composition.',
    'Mentored 150+ graduate students through structured critiques, raising the rigor of their portfolio case studies.',
    'Ran generative-AI ideation workshops and defined quality criteria for model use in design sprints.',
    'Lectured on usability heuristics and moderated testing; evaluation scores rose by 20%.',
  ],
  education: [
    'MS in Information Systems (Human-Computer Interaction and Computer Science), Northeastern University, Boston; completed December 2025; GPA 3.75/4.0.',
    'Postgraduate Diploma in Information Technology and Bachelor of Computer Applications, University of Mumbai; GPA 4.0/4.0.',
  ],
  certifications: [
    'Google UX Design Professional Certificate',
    'Adobe Certified Professional: Product Design',
    'Interaction Design Foundation certificate',
  ],
  leadership: [
    'Founder and Creative Director of the Web Design and Communications Club at Northeastern University (Sep 2024 – Dec 2025): grew it to 90 members and directed team leads who delivered 7 accessible websites for university departments.',
    'Coached members on accessible markup and SEO and formalized review standards for consistent launch quality.',
  ],
  resumeProjects: [
    'Tickerline, a trading analytics web dashboard (Figma, ProtoPie, D3.js, React, TypeScript). Consolidated execution-quality and transaction-cost metrics; streaming price services improved live chart rendering throughput by 40%.',
    'Atlas, an agentic AI assistant for enterprise operations (React, TypeScript, OpenAI API, Claude). Moderated usability sessions reshaped conversational flows and sped up request resolution by 35%; transparent suggestion states with source citations and approval controls.',
    'Quorum, a fintech design system (Figma, Tokens Studio, React, TypeScript). 60+ tokenized components with light and dark themes; 45% faster screen assembly; patterns for masked account details and transaction status.',
  ],
  skills: {
    research: 'Usability testing, user interviews, heuristic evaluation, journey mapping, personas, competitive analysis, A/B testing, UX metrics (SUS, task success, HEART), Jobs-to-Be-Done, product discovery',
    design: 'Wireframing, prototyping, interaction design, information architecture, user flows, visual design, responsive and mobile-first design, microinteractions, data visualization, design systems, design tokens, component libraries, Material Design 3 and Apple HIG',
    accessibility: 'WCAG 2.2 AA, inclusive design, accessible prototyping, color-contrast and screen-reader testing',
    tools: 'Figma (Auto Layout, Variables, Dev Mode), Figma Make, FigJam, ProtoPie, Framer, Miro, Tokens Studio, Maze, Dovetail, Adobe Illustrator',
    ai: 'Generative-AI ideation, AI experience design (conversational UI, copilots), Claude, ChatGPT, OpenAI API',
    development: 'HTML, CSS, JavaScript, TypeScript, React, Angular, Node.js, REST APIs, D3.js, Storybook, GitHub',
    collaboration: 'Agile, design sprints, developer handoff, design QA, stakeholder alignment, Jira, Notion, Confluence',
  },
}

/** Case-study routes on this site, keyed by project id in src/data/projects.ts. */
export const CASE_STUDY_ROUTES: Record<string, string> = {
  'ai-care-navigator': '/ai-care-navigator-case-study',
  'restoration-medicine': '/restoration-medicine',
  'repack-portal': '/repack-portal',
  'folio-tracker': '/folio-tracker-case-study',
  'smart-home-app': '/smart-home',
  'fitness-wearable': '/fitness-wearable',
}

export const BRAND_ROUTES: { name: string; category: string; route: string }[] = [
  { name: 'Bloom', category: 'Wellness app brand identity', route: '/brand/bloom' },
  { name: 'Volta', category: 'EV startup brand identity', route: '/brand/volta' },
  { name: 'Harvest', category: 'Food delivery brand identity', route: '/brand/harvest' },
]

export const TESTIMONIAL_QUOTES: { name: string; role: string; quote: string }[] = [
  {
    name: 'Vishal Chawla',
    role: 'Director, Enterprise Collaboration & AI Web Services, MIT',
    quote: 'Karishma is an exceptional UX designer with strong product thinking and AI-enhanced UX expertise. I highly recommend her for UX and product roles in AI and emerging technologies.',
  },
  {
    name: 'Allyson Goida',
    role: 'Senior Program Manager, Roux Institute (her co-op supervisor)',
    quote: 'What sets Karishma apart is her creative approach combined with remarkable flexibility in implementing feedback… a self-starter trusted to manage projects from conception to completion.',
  },
  {
    name: 'John Neal',
    role: 'Chief Product & Analytics Officer, Restoration Medicine',
    quote: 'Thanks to Karishma, our website redesign became noticeably more user-friendly and conversion-ready. Her ability to simplify complex flows and deliver a refined UI was outstanding.',
  },
  {
    name: 'Matthew Smith',
    role: 'Design Lead, iBec Creative (her manager)',
    quote: 'An inquisitive, dedicated multidisciplinary UI/UX designer and web developer who quickly understands client needs and delivers strong work across decks, brands, and websites.',
  },
  {
    name: 'Uchenna Onyeachom',
    role: 'Founder, Health for Mankind',
    quote: "Karishma's thoughtful design direction brought clarity and cohesion to our showcase deck, making it easier to present and easier to understand.",
  },
]
