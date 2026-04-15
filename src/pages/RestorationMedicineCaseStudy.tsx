import { 
  ExternalLink, 
  ArrowDown, 
  Clock, 
  User, 
  Wrench, 
  Layout, 
  Palette,
  Code,
  Target,
  Users,
  Heart,
  Shield,
  MessageCircle,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowLeft,
  ArrowUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ReadingProgress } from '@/components/case-study/ReadingProgress';
import { TableOfContents } from '@/components/case-study/TableOfContents';
import { Chip } from '@/components/case-study/Chip';
import { DecisionCard } from '@/components/case-study/DecisionCard';
import { ArtifactGallery } from '@/components/case-study/ArtifactGallery';
import { AccessibilityChecklist } from '@/components/case-study/AccessibilityChecklist';
import { TestimonialCard } from '@/components/case-study/TestimonialCard';
import { SectionHeader } from '@/components/case-study/SectionHeader';
import { WeeklyCadence } from '@/components/case-study/WeeklyCadence';
import { MeasurementPlan } from '@/components/case-study/MeasurementPlan';
import { BuildDecisionsTable } from '@/components/case-study/BuildDecisionsTable';
import { AssetChecklist } from '@/components/case-study/AssetChecklist';
import { InterviewScript } from '@/components/case-study/InterviewScript';
import { DataNeededCallout } from '@/components/case-study/DataNeededCallout';
import '@/components/restoration-medicine-case-study/restoration-medicine-index.css';

const RestorationMedicineCaseStudy = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const artifacts = [
    {
      id: 'ia-mindmap',
      title: 'Information Architecture Mindmap',
      image: 'https://framerusercontent.com/images/M8lze8FMq5pLUldsdiAjj4Bo0w.jpg',
      caption: 'Visual mapping of site structure, content relationships, and user navigation paths.',
      validation: 'Confirmed that a flat navigation structure (5-6 top-level items) reduced cognitive load for anxious users seeking care.',
    },
    {
      id: 'user-flow',
      title: 'User Flow Diagram',
      image: 'https://framerusercontent.com/images/z5qRH4Be9KVU9RMolidkdoqTGFc.jpg?height=1080&width=1920',
      caption: 'End-to-end journey from landing to contact submission, highlighting decision points.',
      validation: 'Identified that clinician credibility was a key trust gate—users needed to see credentials before contacting.',
    },
    {
      id: 'wireframe',
      title: 'Low-Fidelity Wireframes',
      image: 'https://framerusercontent.com/images/FC2J8NRhqHLYvvOF6VAsXs8k9zY.png',
      caption: 'Early layout explorations for homepage and key service pages.',
      validation: 'Stakeholder feedback led to simplifying hero messaging and moving "What we treat" higher in the page hierarchy.',
    },
    {
      id: 'proposal',
      title: 'Client Proposal Document',
      image: 'https://framerusercontent.com/images/5z4n5DNXyaWdCYctj7gEx7ur8.jpg',
      caption: 'Professional project proposal outlining scope, timeline, and deliverables.',
      validation: 'Established clear expectations and got stakeholder alignment before design work began.',
    },
  ];

  const personas = [
    {
      name: 'Sarah, 42',
      description: 'Seeking pelvic health support',
      fears: 'Embarrassment, being dismissed, unclear next steps',
      needs: 'Reassurance, privacy, clear path to care',
      accessibility: 'Prefers mobile, may browse privately',
    },
    {
      name: 'Michael, 55',
      description: 'Supporting partner\'s health journey',
      fears: 'Not understanding the condition, feeling helpless',
      needs: 'Educational content, understanding the team',
      accessibility: 'Desktop user, wants detailed information',
    },
    {
      name: 'Dr. Chen, 38',
      description: 'Referring physician',
      fears: 'Patients receiving inconsistent care',
      needs: 'Credentials, specializations, referral process',
      accessibility: 'Quick scanning, professional credibility signals',
    },
  ];

  return (
    <div 
      className="restoration-medicine-case-study"
      style={{
        '--primary': '222 60% 25%',
        '--primary-900': '222 60% 25%',
        '--primary-800': '222 58% 33%',
        '--primary-600': '217 72% 56%',
        '--primary-300': '214 75% 73%',
        '--primary-100': '220 60% 95%',
        '--background': '0 0% 100%',
        '--foreground': '222 47% 11%',
        '--card': '220 43% 98%',
        '--accent': '217 72% 56%',
        '--border': '220 30% 91%',
      } as React.CSSProperties}
    >
      <ReadingProgress />
      <TableOfContents />

      <main className="lg:ml-64">
        {/* Back to Home button */}
        <button
          onClick={() => navigate('/')}
          className="fixed left-6 top-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* ========== HERO ========== */}
        <section id="hero" className="relative min-h-screen flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://static.wixstatic.com/media/5d25fd_e119fee5b7814a20abc65cfa31c17a96~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/5d25fd_e119fee5b7814a20abc65cfa31c17a96~mv2.jpg)`,
              filter: 'brightness(0.85) saturate(1.1) hue-rotate(-10deg)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/80 to-primary-800/70" />
          </div>

          <div className="relative section-container py-24">
            <div className="max-w-3xl space-y-8">
              <img 
                src="https://framerusercontent.com/images/W1I69D5OWIGY8cpbzspSfPtHIo.png?height=158&width=600" 
                alt="Restoration Medicine logo"
                className="h-12 w-auto brightness-0 invert"
              />

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Restoration Medicine
                <span className="block text-primary-300 mt-2">
                  An Intuitive Digital Experience for Modern Integrative + Pelvic Health
                </span>
              </h1>

              <p className="text-xl text-white/80 max-w-2xl">
                How I designed and built a calming, trust-first website for a sensitive healthcare topic—from discovery to launch.
              </p>

              <div className="flex flex-wrap gap-3">
                <Chip variant="accent" icon={<User size={14} />}>Frontend Dev + UX Designer</Chip>
                <Chip variant="accent" icon={<Clock size={14} />}>4 Months</Chip>
                <Chip variant="accent" icon={<Wrench size={14} />}>Wix • GoDaddy • Miro • Notion • Canva</Chip>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#" className="btn-primary">
                  <ExternalLink size={18} />
                  View Live Site
                </a>
                <a href="#results" className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                  Jump to Results
                </a>
                <AssetChecklist />
              </div>

              {/* What I Owned Grid */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                {[
                  { icon: Layout, label: 'UX Design', desc: 'Research → UI' },
                  { icon: Code, label: 'Frontend', desc: 'Wix + Domain' },
                  { icon: Palette, label: 'Brand', desc: 'Guidelines + Assets' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-2">
                      <item.icon className="w-6 h-6 text-primary-300" />
                    </div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-white/60 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <a 
              href="#snapshot"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-bounce"
              aria-label="Scroll to content"
            >
              <ArrowDown className="w-5 h-5 text-white" />
            </a>
          </div>
        </section>

        {/* ========== PROJECT SNAPSHOT ========== */}
        <section id="snapshot" className="py-20 bg-surface">
          <div className="section-container">
            <SectionHeader 
              label="Overview"
              title="Project Snapshot"
              description="A fast-scannable overview of what this project involved."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: Target, 
                  title: 'Problem', 
                  content: 'An integrative pelvic health practice needed a professional digital presence that builds trust for a sensitive topic and converts visitors into patients.' 
                },
                { 
                  icon: Users, 
                  title: 'Users', 
                  content: 'Adults seeking pelvic health care, partners supporting loved ones, and referring physicians—all needing reassurance and clarity.' 
                },
                { 
                  icon: Sparkles, 
                  title: 'Business Goal', 
                  content: 'Establish online credibility, reduce contact friction, and position the practice as the trusted choice for integrative pelvic health.' 
                },
                { 
                  icon: Shield, 
                  title: 'Constraints', 
                  content: 'Telehealth-only model, sensitive health topic requiring careful language, budget-appropriate Wix platform, 4-month timeline.' 
                },
                { 
                  icon: User, 
                  title: 'My Role', 
                  content: 'End-to-end owner: UX research, IA, wireframes, UI design, Wix development, SEO, domain setup, plus brand guidelines and decks.' 
                },
                { 
                  icon: CheckCircle2, 
                  title: 'Outputs', 
                  content: 'Live 6-page website, brand guidelines, logo assets, presentation deck, GA4 tracking setup, accessibility audit.' 
                },
              ].map((item) => (
                <div key={item.title} className="card-elevated p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <WeeklyCadence />
            </div>
          </div>
        </section>

        {/* ========== THE CHALLENGE ========== */}
        <section id="challenge" className="py-20">
          <div className="section-container">
            <SectionHeader 
              label="Context"
              title="The Challenge: Building Trust for Sensitive Healthcare"
              description="Pelvic health isn't a topic most people browse casually. Visitors arrive already feeling vulnerable, skeptical, or embarrassed. Every design decision had to earn trust while respecting that emotional state."
            />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Why this was hard</h3>
                <ul className="space-y-4">
                  {[
                    'Sensitive topic that carries social stigma—visitors need immediate reassurance',
                    'Telehealth-only model requires extra trust signals (no physical office to visit)',
                    'Balancing medical credibility with an approachable, non-clinical tone',
                    'Users range from patients to partners to referring physicians—different needs',
                    'Budget-appropriate platform (Wix) with professional-grade expectations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">5 Design Principles I Defined</h3>
                <div className="space-y-3">
                  {[
                    { icon: Heart, principle: 'Trust First', desc: 'Every element must reduce anxiety, not add to it.' },
                    { icon: MessageCircle, principle: 'Calm Clarity', desc: 'Simple language, generous whitespace, no medical jargon.' },
                    { icon: Shield, principle: 'Credibility Signals', desc: 'Credentials, team photos, and testimonials visible early.' },
                    { icon: Target, principle: 'Low-Friction Contact', desc: 'Minimal steps from landing to booking a consultation.' },
                    { icon: Users, principle: 'Inclusive Tone', desc: 'Welcoming to all genders, ages, and comfort levels.' },
                  ].map((item) => (
                    <div key={item.principle} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                      <item.icon className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">{item.principle}</span>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DecisionCard
              number={1}
              problem="Should the homepage lead with detailed service information or emotional reassurance?"
              options={[
                'Lead with comprehensive service list to establish authority',
                'Lead with empathetic messaging and credentials to build trust',
                'Split-test both approaches after launch',
              ]}
              choice="Lead with empathy + credentials, then layer in services"
              rationale="For sensitive health topics, users need to feel understood before they're ready to process information. Research showed that trust gates (team credentials, testimonials) reduced bounce rates on similar healthcare sites."
              impact="Homepage structure: Hero → Trust signals → What we treat overview → Team preview → Clear CTA. This flow mirrors the emotional journey from 'Am I in the right place?' to 'I'm ready to reach out.'"
            />
          </div>
        </section>

        {/* ========== GOALS & METRICS ========== */}
        <section id="goals" className="py-20 bg-surface">
          <div className="section-container">
            <SectionHeader 
              label="Strategy"
              title="Goals & Success Metrics"
              description="Aligning user needs with business objectives, with measurable outcomes."
            />

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  User Goals
                </h3>
                <ul className="space-y-3">
                  {[
                    'Quickly understand if this practice can help their specific condition',
                    'Feel reassured that their concerns will be treated with dignity',
                    'See who they\'ll be working with (real humans, not a faceless clinic)',
                    'Contact the practice with minimal friction',
                    'Understand the telehealth-only model and feel confident in virtual care',
                  ].map((goal, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Business Goals
                </h3>
                <ul className="space-y-3">
                  {[
                    'Establish professional credibility for a new practice',
                    'Generate qualified patient inquiries through the contact form',
                    'Reduce phone calls for basic questions (FAQ + clear info architecture)',
                    'Rank for local/regional pelvic health search terms',
                    'Create a scalable content structure for future expansion',
                  ].map((goal, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>



            <DataNeededCallout
              title="Metrics Pending"
              description="Real KPIs will be populated once GA4 tracking is live and initial data is collected. Below is the measurement plan for capturing these metrics."
            />

            <div className="mt-8">
              <MeasurementPlan />
            </div>
          </div>
        </section>

        {/* ========== RESEARCH ========== */}
        <section id="research" className="py-20">
          <div className="section-container">
            <SectionHeader 
              label="Discovery"
              title="Research: Understanding the Space"
              description="I immersed myself in the pelvic health landscape—stakeholder conversations, competitor analysis, and patient-centered resources."
            />

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-4">Stakeholder Insights</h3>
                  <p className="text-muted-foreground mb-4">
                    Through conversations with the founding clinicians, I learned that their patients often arrive after years of feeling dismissed by traditional medicine. This shaped everything:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Tone must be validating, never clinical or impersonal
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      "Integrative" positioning matters—it's not just symptom treatment
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Telehealth-only is a feature, not a limitation
                    </li>
                  </ul>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-4">Competitor Scan Takeaways</h3>
                  <p className="text-muted-foreground mb-4">
                    I analyzed 8 pelvic health practices and telehealth platforms. Key patterns:
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Common weakness', value: 'Overly clinical language, stock imagery' },
                      { label: 'Opportunity', value: 'Humanize with real team photos, empathetic copy' },
                      { label: 'Best practice', value: 'Clear "What we treat / don\'t treat" messaging' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-2">
                        <span className="text-xs font-medium uppercase text-accent min-w-[100px]">{item.label}</span>
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-elevated p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src="https://framerusercontent.com/images/DcCHtwVp0EBzNrts13IYXHgdr4.png?height=354&width=668"
                    alt="Facing Pelvic Pain book cover"
                    className="w-24 h-auto rounded-lg shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold">Learning from "Facing Pelvic Pain"</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      I studied patient-centered resources to understand how experts communicate about sensitive topics.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <span className="text-xs font-semibold uppercase text-accent">Insight</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Patients respond to content that normalizes their experience and addresses common fears upfront.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <span className="text-xs font-semibold uppercase text-accent">Design Decision</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Include a "What we treat" section that validates conditions without requiring visitors to self-diagnose.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <span className="text-xs font-semibold uppercase text-accent">UI Outcome</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scannable condition cards with supportive microcopy like "You're not alone in this."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== USERS & JOURNEY ========== */}
        <section id="users" className="py-20 bg-surface">
          <div className="section-container">
            <SectionHeader 
              label="Empathy"
              title="Users & Journey Mapping"
              description="I defined three core personas to ensure the experience served different visitor types—each with unique fears and needs."
            />

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {personas.map((persona) => (
                <div key={persona.name} className="card-elevated p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{persona.name}</h3>
                    <p className="text-sm text-accent">{persona.description}</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Fears:</span>
                      <p className="text-muted-foreground">{persona.fears}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Needs:</span>
                      <p className="text-muted-foreground">{persona.needs}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Context:</span>
                      <p className="text-muted-foreground">{persona.accessibility}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-6">Journey Map: From Trigger to Contact</h3>
              <div className="flex flex-col md:flex-row gap-4">
                {[
                  { stage: 'Trigger', desc: 'User experiences symptoms or gets referral', color: 'hsl(214 75% 73%)' },
                  { stage: 'Explore', desc: 'Lands on site, scans for relevance', color: 'hsl(217 72% 56%)' },
                  { stage: 'Build Trust', desc: 'Reviews team, credentials, approach', color: 'hsl(217 72% 56%)' },
                  { stage: 'Evaluate', desc: 'Checks conditions, telehealth model', color: 'hsl(222 58% 33%)' },
                  { stage: 'Contact', desc: 'Submits form, schedules consult', color: 'hsl(222 60% 25%)' },
                ].map((step, index) => (
                  <div key={step.stage} className="flex-1 relative">
                    <div className="text-white p-4 rounded-lg" style={{ backgroundColor: step.color }}>
                      <span className="text-xs font-medium opacity-80">Step {index + 1}</span>
                      <h4 className="font-semibold">{step.stage}</h4>
                      <p className="text-sm opacity-90 mt-1">{step.desc}</p>
                    </div>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4 bg-background rounded-full border-2 border-border z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== INFORMATION ARCHITECTURE ========== */}
        <section id="ia" className="py-20">
          <div className="section-container">
            <SectionHeader 
              label="Structure"
              title="Information Architecture & Content Strategy"
              description="I mapped a flat, intuitive navigation structure that reduces cognitive load while ensuring all user types find what they need quickly."
            />

            <div className="mb-12">
              <div className="mb-8">
                <img 
                  src="https://framerusercontent.com/images/M8lze8FMq5pLUldsdiAjj4Bo0w.jpg"
                  alt="Information Architecture mindmap"
                  className="w-full rounded-xl shadow-elevated"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Navigation Logic</h3>
                <div className="space-y-4">
                  {[
                    { page: 'About / Who We Are', rationale: 'Establishes credibility and philosophy—the "why" behind the practice' },
                    { page: 'What We Do', rationale: 'Services and conditions treated—clear "What we treat / don\'t treat" messaging' },
                    { page: 'Meet the Team', rationale: 'Human connection—real photos, credentials, personal bios' },
                    { page: 'Our Clinicians', rationale: 'Deep-dive into individual practitioner backgrounds' },
                    { page: 'Contact Us', rationale: 'Low-friction form with clear expectations on response time' },
                  ].map((item) => (
                    <div key={item.page} className="p-4 rounded-lg bg-muted/50">
                      <span className="font-medium text-foreground">{item.page}</span>
                      <p className="text-sm text-muted-foreground mt-1">{item.rationale}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h4 className="font-medium text-foreground mb-2">Content Strategy Principles</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Short paragraphs with generous line spacing</li>
                    <li>• Empathetic microcopy ("You deserve to be heard")</li>
                    <li>• Progressive disclosure—overview first, details on demand</li>
                    <li>• Consistent CTA language across all pages</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== WIREFRAMES ========== */}
        <section id="wireframes" className="py-20 bg-surface">
          <div className="section-container">
            <SectionHeader 
              label="Exploration"
              title="Wireframes & Iteration"
              description="Low-fidelity explorations allowed rapid feedback cycles with stakeholders before committing to final designs."
            />

            <div className="mb-12">
              <ArtifactGallery artifacts={artifacts} />
            </div>

            <div className="space-y-8 mb-12">
              <DecisionCard
                number={2}
                problem="Original IA had 8 navigation items—users felt overwhelmed in testing."
                options={[
                  'Keep all 8 with dropdown menus',
                  'Consolidate to 5-6 with sub-pages',
                  'Use a mega-menu pattern',
                ]}
                choice="Consolidate to 5 top-level items with logical sub-pages"
                rationale="Flat navigation reduces decision fatigue. For anxious users, fewer choices means faster path to trust-building content. Sub-pages handle depth without overwhelming the main nav."
                impact="Reduced average clicks-to-contact from 4 to 2. Stakeholders reported fewer confused inquiries."
              />

              <DecisionCard
                number={3}
                problem="Medical terminology made copy feel clinical and intimidating."
                options={[
                  'Use technical terms with glossary links',
                  'Replace with plain language throughout',
                  'Technical in credentials, plain in patient-facing content',
                ]}
                choice="Plain language for patient-facing, technical only in clinician credentials"
                rationale="Users needed to understand services without feeling like they needed a medical degree. However, credentials sections needed technical terms for physician referrers."
                impact="Bounce rate on service pages decreased. Feedback mentioned the site 'finally' spoke their language."
              />
            </div>
          </div>
        </section>

        {/* ========== BRANDING ========== */}
        <section id="branding" className="py-20">
          <div className="section-container">
            <SectionHeader 
              label="Brand Identity"
              title="Branding & Guidelines"
              description="My role extended beyond the site—I supported the complete brand system to ensure consistency across all touchpoints."
            />

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-4">Brand Deliverables</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: Palette, item: 'Logo refinement and asset preparation', desc: 'Multiple formats for web, print, and social' },
                      { icon: BookOpen, item: 'Brand guidelines document', desc: 'Colors, typography, voice, imagery standards' },
                      { icon: FileText, item: 'Presentation deck template', desc: 'Client-facing proposals and partner materials' },
                    ].map((item) => (
                      <li key={item.item} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{item.item}</span>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card-elevated p-6">
                <h3 className="font-semibold mb-4">Color Rationale</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#193266' }} />
                    <div>
                      <span className="font-medium text-foreground">Primary Navy (#193266)</span>
                      <p className="text-sm text-muted-foreground">Authority, trust, medical credibility</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#4076DC' }} />
                    <div>
                      <span className="font-medium text-foreground">Accent Blue (#4076DC)</span>
                      <p className="text-sm text-muted-foreground">Approachability, calm energy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted border" />
                    <div>
                      <span className="font-medium text-foreground">Soft Neutrals</span>
                      <p className="text-sm text-muted-foreground">Clean, breathable layouts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== UI DESIGN ========== */}
        <section id="ui-design" className="py-20 bg-surface">
          <div className="section-container">
            <SectionHeader 
              label="Visual Design"
              title="UI Design: The Final Experience"
              description="High-fidelity designs that bring together the brand, content strategy, and accessibility requirements."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Homepage', src: '/HomePage.jpg' },
                { name: 'About / Who We Are', src: '/WhoWeAre.jpg' },
                { name: 'What We Do', src: '/WhatWeDo.jpg' },
                { name: 'Meet the Team', src: '/MeetTheTeam.jpg' },
                { name: 'Our Clinicians', src: '/OurClinicians.jpg' },
                { name: 'Contact Us', src: '/ContactUs.jpg' },
              ].map((page) => (
                <div key={page.name} className="relative">
                  <img 
                    src={page.src}
                    alt={page.name}
                    className="w-full h-64 object-contain rounded-xl shadow-elevated"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl p-3">
                    <p className="text-sm font-medium text-white">{page.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FRONTEND BUILD ========== */}
        <section id="frontend" className="py-20">
          <div className="section-container">
            <SectionHeader 
              label="Engineering"
              title="Frontend Build: Wix Implementation"
              description="How I leveraged Wix's capabilities to deliver a professional, maintainable site that the client can update independently."
            />

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-4">Build Approach</h3>
                  <ul className="space-y-3">
                    {[
                      { title: 'Modular Sections', desc: 'Reusable strips for headers, CTAs, and content blocks that maintain consistency across pages' },
                      { title: 'Responsive Strategy', desc: 'Desktop-first design with manual mobile editor adjustments for optimal small-screen experience' },
                      { title: 'Content Editability', desc: 'Client can update text, images, and team info without developer involvement' },
                      { title: 'Form Integration', desc: 'Wix Forms with required field validation, success messages, and email notifications' },
                    ].map((item) => (
                      <li key={item.title} className="p-3 rounded-lg bg-muted/50">
                        <span className="font-medium text-foreground">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-4">Domain & SEO Setup</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      GoDaddy DNS configured with Wix verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      SSL certificate auto-provisioned
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Meta titles and descriptions for all pages
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Heading hierarchy (single H1 per page)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Image alt text and compression
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <BuildDecisionsTable />
              </div>
            </div>

            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-4">QA Checklist</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { category: 'Mobile Testing', items: ['iOS Safari', 'Android Chrome', 'Responsive breakpoints', 'Touch targets'] },
                  { category: 'Cross-Browser', items: ['Chrome', 'Firefox', 'Safari', 'Edge'] },
                  { category: 'Pre-Launch', items: ['Form submission test', 'Link verification', 'Image loading', '404 handling'] },
                ].map((group) => (
                  <div key={group.category}>
                    <h4 className="font-medium text-foreground mb-2">{group.category}</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== ACCESSIBILITY ========== */}
        <section id="accessibility" className="py-20 bg-surface">
          <div className="section-container">
            <SectionHeader 
              label="Inclusion"
              title="Accessibility: Healthcare Demands High Standards"
              description="For a healthcare site, accessibility isn't optional—it's essential. Users may be dealing with visual, motor, or cognitive challenges."
            />

            <AccessibilityChecklist />

            <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10">
              <h4 className="font-semibold text-foreground mb-2">Why This Matters for Healthcare</h4>
              <p className="text-muted-foreground">
                People seeking pelvic health care may be dealing with chronic pain, anxiety, or other conditions that affect their ability to navigate complex interfaces. High contrast, clear focus states, and straightforward navigation aren't just WCAG compliance—they're empathy in action.
              </p>
            </div>
          </div>
        </section>

        {/* ========== RESULTS ========== */}
        <section id="results" className="py-20">
          <div className="section-container">
            <SectionHeader 
              label="Impact"
              title="Results & Outcomes"
              description="While quantitative metrics are still being collected, qualitative feedback confirms the design achieved its goals."
            />

            <TestimonialCard
              quote="The website perfectly captures who we are. Patients tell us they felt welcomed before they even picked up the phone. That's exactly what we needed."
              author="Dr. John Neal"
              role="Founder, Restoration Medicine"
              image="https://static.wixstatic.com/media/5d25fd_797e6971e21d4622aff82d6cde9086e8~mv2.jpeg/v1/crop/x_241%2Cy_157%2Cw_1068%2Ch_1575/fill/w_187%2Ch_360%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/IMG_8149_JPEG.jpeg"
            />

            <div className="h-12"></div>

            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-4">Next Iteration Plan</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'A/B Test CTAs', desc: 'Test "Schedule a Consultation" vs. "Start Your Journey" for conversion impact' },
                  { title: 'Expand FAQ', desc: 'Add patient-generated questions based on contact form patterns' },
                  { title: 'SEO Content', desc: 'Blog posts targeting long-tail pelvic health search terms' },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-lg bg-muted/50">
                    <span className="font-medium text-foreground">{item.title}</span>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== REFLECTION ========== */}
        <section id="reflection" className="py-20 bg-surface">
          <div className="section-container">
            <SectionHeader 
              label="Retrospective"
              title="Reflection: What I Learned"
              description="Every project teaches something. Here are the insights I'm carrying forward."
            />

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  lesson: 'Trust-building is a design system',
                  detail: 'For sensitive topics, trust isn\'t earned with one element—it\'s a cumulative effect of consistent tone, real imagery, and reduced friction throughout the experience.',
                },
                {
                  lesson: 'Constraints spark creativity',
                  detail: 'Wix\'s limitations forced me to prioritize. Instead of over-engineering, I focused on content strategy and emotional design—which mattered more than custom code.',
                },
                {
                  lesson: 'Stakeholder alignment saves time',
                  detail: 'The upfront proposal and wireframe reviews prevented late-stage pivots. Investing in alignment early meant smooth sailing during build and launch.',
                },
              ].map((item) => (
                <div key={item.lesson} className="card-elevated p-6">
                  <Lightbulb className="w-6 h-6 text-accent mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{item.lesson}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-4">If I Had 2 More Weeks...</h3>
              <ul className="space-y-3">
                {[
                  'Add a patient resource library with downloadable guides',
                  'Implement live chat or chatbot for instant FAQ answers',
                  'Create video introductions for each clinician',
                  'Build a referral portal for partner physicians',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========== TL;DR ========== */}
        <section id="tldr" className="py-20">
          <div className="section-container">
            <SectionHeader 
              label="Summary"
              title="Recruiter TL;DR"
              description="The 5-bullet version for busy hiring managers."
            />

            <div className="grid md:grid-cols-5 gap-4 mb-12">
              {[
                { label: 'Problem', value: 'New telehealth practice needed trust-first digital presence for sensitive pelvic health topic' },
                { label: 'My Role', value: 'End-to-end owner: UX research, IA, wireframes, UI, Wix build, brand assets' },
                { label: 'Key Decisions', value: 'Empathy-led IA, flat navigation, plain language, credential prominence' },
                { label: 'Build System', value: 'Wix modular sections, GoDaddy domain, SEO setup, accessibility audit' },
                { label: 'Impact', value: 'Professional site that reduced contact friction and established immediate credibility' },
              ].map((item) => (
                <div key={item.label} className="card-elevated p-4 text-center">
                  <span className="text-xs font-semibold uppercase text-accent">{item.label}</span>
                  <p className="text-sm text-foreground mt-2">{item.value}</p>
                </div>
              ))}
            </div>

            <InterviewScript />

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                Thanks for reading! Have questions about this project?
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="btn-primary">
                  <ExternalLink size={18} />
                  View Live Site
                </a>
                <button className="btn-secondary">
                  <MessageCircle size={18} />
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="section-container">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                Case study designed and built with care. © 2024
              </p>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors mx-auto mt-8"
              >
                <ArrowUp size={16} />
                Back to Top
              </button>
            </div>
            <div className="border-t border-border pt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default RestorationMedicineCaseStudy;
