/**
 * Shared case-study data: the section lists that drive each page's tracker
 * (desktop rail and phone dock), and the short summaries shown by the
 * "Summarize" button. Summaries are written only from what each case study
 * page itself says, so every figure here can be found on its page.
 */

export interface CaseSection {
  id: string
  label: string
}

export interface CaseSummary {
  title: string
  /** Role, timeline and, when the page states it, status. */
  meta: string[]
  problem: string
  did: string[]
  impact: { value: string; label: string }[]
  questions: { q: string; a: string }[]
}

export const AI_CARE_SECTIONS: CaseSection[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'personas', label: 'Personas' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'wireframes', label: 'Wireframes' },
  { id: 'process', label: 'Process' },
  { id: 'solution', label: 'Solution' },
  { id: 'product', label: 'Final Product' },
  { id: 'testing', label: 'Testing' },
  { id: 'results', label: 'Results' },
]

export const REPACK_SECTIONS: CaseSection[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'solution', label: 'Solution' },
  { id: 'results', label: 'Results' },
  { id: 'reflection', label: 'Reflection' },
]

export const RESTORATION_SECTIONS: CaseSection[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'snapshot', label: 'Project Snapshot' },
  { id: 'challenge', label: 'The Challenge' },
  { id: 'goals', label: 'Goals & Metrics' },
  { id: 'research', label: 'Research' },
  { id: 'users', label: 'Users & Journey' },
  { id: 'ia', label: 'Information Architecture' },
  { id: 'wireframes', label: 'Wireframes' },
  { id: 'branding', label: 'Branding & Assets' },
  { id: 'ui-design', label: 'UI Design' },
  { id: 'frontend', label: 'Frontend Build' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'results', label: 'Results & Impact' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'tldr', label: 'TL;DR' },
]

export const FOLIO_SECTIONS: CaseSection[] = [
  { id: 'walkthrough', label: 'Product Walkthrough' },
  { id: 'hero', label: 'Overview' },
  { id: 'context', label: 'Context & Problem' },
  { id: 'goals', label: 'Goals & Metrics' },
  { id: 'users', label: 'Users & JTBD' },
  { id: 'strategy', label: 'UX Strategy' },
  { id: 'architecture', label: 'IA & Flows' },
  { id: 'data-layer', label: 'Data & Trust' },
  { id: 'visualizations', label: 'Data Viz System' },
  { id: 'screens', label: 'Key Screens' },
  { id: 'components', label: 'Component System' },
  { id: 'performance', label: 'Performance' },
  { id: 'testing', label: 'Usability Testing' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'reflection', label: 'Reflection' },
]

// SUMMARIES (generated from the drafts; see below)
export const CASE_SUMMARIES: Record<string, CaseSummary> = {
  "restoration-medicine": {
    "title": "Restoration Medicine",
    "meta": [
      "Front-end Developer and UX Designer",
      "4 months",
      "Live site"
    ],
    "problem": "Restoration Medicine, a new telehealth practice for integrative pelvic health, needed a professional digital presence on a topic that visitors approach feeling vulnerable, skeptical or embarrassed. With no physical office to visit, the website alone had to earn the trust of patients, partners supporting them and referring physicians, and convert that cautious interest into consultation requests.",
    "did": [
      "Interviewed the founding clinicians and scanned 8 pelvic health practices and telehealth platforms, then defined five design principles, including Trust First and Low-Friction Contact.",
      "Consolidated the navigation from 8 items to 5 top-level items, led the homepage with empathy and clinician credentials, and kept patient-facing copy in plain language.",
      "Built the 6-page site in Wix with modular, client-editable sections, then configured the GoDaddy domain and SEO and ran a WCAG 2.1 AA accessibility audit before launch."
    ],
    "impact": [
      {
        "value": "8 → 5",
        "label": "Top-level navigation items"
      },
      {
        "value": "4 → 2",
        "label": "Clicks to contact"
      },
      {
        "value": "6",
        "label": "Live pages launched"
      }
    ],
    "questions": [
      {
        "q": "Why lead with empathy, not services?",
        "a": "Stakeholder conversations showed that the practice’s patients often arrive after years of feeling dismissed by traditional medicine. Karishma weighed a service-first homepage, an empathy-first homepage and a post-launch split test, and chose to lead with empathy and clinician credentials before layering in services, because visitors on a sensitive topic need to feel understood before they can take in detail. The final order of hero, trust signals, a What We Treat overview, a team preview and a clear call to action follows a visitor from asking whether this is the right place to feeling ready to reach out."
      },
      {
        "q": "What did building on Wix trade off?",
        "a": "The practice required a budget-appropriate platform, so Karishma built the site on Wix. She accepted less custom flexibility than a full React build, manual mobile adjustments and limited form validation logic, in exchange for modular sections the client can update without developer involvement. In her reflection, she notes that the constraint pushed her to prioritize content strategy and emotional design, which mattered more than custom code."
      },
      {
        "q": "What changed after user testing?",
        "a": "The original information architecture had 8 navigation items, and users felt overwhelmed in testing. Karishma compared keeping all 8 with dropdown menus, adopting a mega-menu and consolidating, then reduced the navigation to 5 top-level items with logical sub-pages, since fewer choices give anxious visitors a faster path to trust-building content. Average clicks-to-contact fell from 4 to 2, and stakeholders reported fewer confused inquiries."
      },
      {
        "q": "What would she improve next?",
        "a": "Quantitative KPIs are still pending, so Karishma prepared a GA4 measurement plan that tracks CTA clicks, contact form submissions, scroll depth, clinician profile views and navigation usage. Her next iteration would A/B test CTA wording, expand the FAQ based on contact form patterns and add SEO content for long-tail pelvic health searches. With more time, she would also add a patient resource library, video introductions for each clinician and a referral portal for partner physicians."
      }
    ]
  },
  "ai-care-navigator": {
    "title": "AI Care Navigator",
    "meta": [
      "UX Designer",
      "8 weeks · 2025",
      "Live product"
    ],
    "problem": "Patients often leave medical appointments overwhelmed by unfamiliar terminology, unsure of their next steps and holding questions they did not get to ask. That gap between providers and patients creates anxiety and weakens adherence to care plans, particularly for people managing several conditions or providers at once.",
    "did": [
      "Conducted 24 user interviews, analyzed 156 survey responses and reviewed 8 competitors, then synthesized the findings into personas and three insights: information overload, a preparation gap and follow-up confusion.",
      "Designed three core features within a flat information architecture no more than 3 levels deep: plain-language visit summaries, AI-generated appointment questions and care plan tracking.",
      "Iterated the wireframes through 3 major rounds and 47 changes, then validated the design through usability testing with 15 participants."
    ],
    "impact": [
      {
        "value": "92%",
        "label": "Task success rate"
      },
      {
        "value": "32% → 88%",
        "label": "Question generation success"
      },
      {
        "value": "24",
        "label": "User interviews"
      }
    ],
    "questions": [
      {
        "q": "Why these three core features?",
        "a": "Research identified the leading frustrations after appointments as confusing terminology (42%), forgotten questions (28%) and unclear next steps (20%). Karishma mapped each pain point to one feature: plain-language visit summaries with key takeaways at the top, an AI question generator personalized to the patient’s history, and a care plan with daily tasks and medication reminders. Keeping the product to three focused jobs reflected her principle that every element should earn its place."
      },
      {
        "q": "How did she design for older users?",
        "a": "The personas ranged from Sarah, a 34-year-old marketing manager, to Robert, a 67-year-old retired teacher who finds technology difficult, and reported frustration with healthcare navigation was highest, at 82%, among users aged 65 and over. Karishma therefore favored simplicity over feature density: minimal form fields, a hierarchy no more than 3 levels deep and progressive disclosure that shows information only when it is needed. She found that designing for older users with accessibility needs improved the experience for everyone."
      },
      {
        "q": "How was the design validated?",
        "a": "Karishma’s team took the wireframes through 3 major iterations and 47 changes based on user feedback, then ran usability testing with 15 participants across four core tasks. In the before-and-after comparison, question generation rose from 32% to 88% and finding a visit summary rose from 45% to 92%, with overall task success reaching 92%. One participant described the question generator as exactly what they needed, because they always forget what to ask."
      },
      {
        "q": "What would she build next?",
        "a": "Karishma learned that AI summaries work best when they explain the reasoning behind a recommendation, not only the recommendation itself. The roadmap adds wearable integration, a caregiver portal, predictive analytics and a voice interface. The caregiver portal responds to a need that surfaced in both research and testing: the Robert persona calls for easy sharing with caregivers, and one participant said the tool would have helped while managing her father’s care."
      }
    ]
  },
  "repack-portal": {
    "title": "RePack",
    "meta": [
      "Product Designer",
      "8 weeks · 2024",
      "Live prototype"
    ],
    "problem": "Online shoppers found e-commerce returns confusing and time-consuming: they moved between multiple systems to start a single request, faced inconsistent rules across merchants and had no way to track a return or refund. Many abandoned the process entirely, which reduced customer lifetime value and increased support costs. The sharpest drop-off came at the step where users had to choose a return method.",
    "did": [
      "Conducted 12 in-depth interviews with recent returners, mapped the journey to 7 friction points and benchmarked Amazon, Zappos, Apple and Nordstrom.",
      "Designed a guided, step-by-step return flow with an automated eligibility checker, pre-filled labels available as QR codes and real-time SMS and email updates.",
      "Validated an interactive Figma prototype through moderated usability testing with think-aloud protocols and post-task interviews, then iterated on the findings."
    ],
    "impact": [
      {
        "value": "67% → 94%",
        "label": "Task success rate"
      },
      {
        "value": "8 → 2 min",
        "label": "Average task time"
      },
      {
        "value": "24% → 3%",
        "label": "Error rate"
      }
    ],
    "questions": [
      {
        "q": "What drove the guided return flow?",
        "a": "Research showed that 68% of users abandoned returns at step 3 of the old flow, the point where they had to choose a return method without clear guidance. Karishma treated this as decision paralysis and replaced the open choice with a guided sequence: an eligibility checker that instantly confirms whether an item qualifies, followed by a visual step-by-step guide with progress indicators and clear calls to action. The validation round found that progress indicators significantly reduced drop-off rates."
      },
      {
        "q": "Why was the flow built mobile-first?",
        "a": "More than 65% of return requests were initiated on mobile devices, so Karishma designed for small screens first, with large touch targets, simplified navigation and camera integration for scanning QR codes. Rather than forcing one label format, she offered pre-filled labels that can be printed or shown as a QR code at drop-off, with offline-capable label storage. Testing later confirmed that users preferred QR codes for environmental reasons and that auto-save was critical for mobile users who switched between tasks."
      },
      {
        "q": "How was the redesign validated?",
        "a": "Karishma built an interactive Figma prototype for early stakeholder feedback, then ran moderated usability sessions that combined task completion, think-aloud protocols and post-task interviews. Against the previous flow, task success rose from 67% to 94%, average time fell from 8 to 2 minutes and the error rate dropped from 24% to 3%. One participant reported being able to start a return in under a minute."
      },
      {
        "q": "What would she do differently?",
        "a": "Karishma would start with more extreme prototypes to test boundaries, include more edge cases in the initial research and build accessibility considerations into the process earlier. She credits early stakeholder alignment with preventing scope creep and progressive disclosure with keeping the interface clean. The next iteration plans AI-powered return reasons that suggest alternatives before shipping, and carbon-neutral returns through carrier partnerships."
      }
    ]
  },
  "folio-tracker": {
    "title": "Folio",
    "meta": [
      "Product Designer and Front-end Developer",
      "6 weeks",
      "Proof of concept"
    ],
    "problem": "Individual investors managing diversified portfolios had to juggle 3 to 5 or more apps and browser tabs, then interpret raw numbers without context. Existing trackers were either too simplistic or built for professional traders, leaving users to calculate totals by hand, overlook concentration risk and doubt figures with unclear units or data freshness.",
    "did": [
      "Structured the navigation around task frequency and progressive disclosure, scoping each chart to answer a single user question.",
      "Built the dashboard in React.js and Chart.js, using route-level code splitting, lazy-loaded charts and memoization to reduce data load time.",
      "Ran moderated, task-based usability tests with 8 participants and completed five design iterations, including moving the allocation chart above the fold."
    ],
    "impact": [
      {
        "value": "57.5% → 92%",
        "label": "Average task success"
      },
      {
        "value": "1.8s → 1.2s",
        "label": "Dashboard data load"
      },
      {
        "value": "40% → 85%",
        "label": "Concentration-risk task success"
      }
    ],
    "questions": [
      {
        "q": "Why one question per chart?",
        "a": "Investors struggled to interpret raw numbers without context, so Karishma scoped each visualization to answer a single question, for example “Where is my money distributed?” for the allocation donut. She chose chart types through a decision matrix, using horizontal bars for gain and loss because labels stay readable and bar length shows rank. Every change also carries a plus or minus sign and a direction arrow, so meaning never depends on color alone. In reflection, she notes that resisting the urge to pack several insights into one chart kept each view focused and scannable."
      },
      {
        "q": "How was the POC scope decided?",
        "a": "Karishma filtered every feature through three questions: does it reduce time-to-insight, does it build trust, and is it scannable in 3 seconds. Six visualizations were implemented in the proof of concept, while a contribution waterfall, drawdown chart, returns histogram and risk versus return scatter plot were placed on the roadmap. Broker integrations, alerts and rebalancing suggestions were also deferred, keeping the 6-week proof of concept focused on core portfolio tracking."
      },
      {
        "q": "How was the design validated?",
        "a": "Karishma ran remote, moderated, task-based sessions of 45 to 60 minutes with 8 participants during the proof-of-concept phase. Testing exposed an issue that design review had missed: the allocation donut sat below the fold and was missed by 60% of users, so she moved it into the first viewport and success on the concentration-risk task rose from 40% to 85%. Across four core tasks, average task success improved from 57.5% to 92% after five design iterations."
      },
      {
        "q": "What would she improve next?",
        "a": "Karishma would add richer empty states, deeper chart interactions such as crosshair tooltips, zoom and drill-down from chart to table, better tuning for quick mobile check-ins, and a guided tour for first-time users. On the product roadmap, broker integrations with CSV import and configurable alerts are marked as high priority. She also notes that the time-to-insight and confidence figures are still estimates, and she has outlined a measurement plan, including task-timing instrumentation and in-app surveys, to validate them."
      }
    ]
  },
  "smart-home": {
    "title": "Hearth",
    "meta": [
      "UX Designer",
      "14 weeks · 2024"
    ],
    "problem": "Owners of connected kitchen appliances moved between separate manufacturer apps, each with its own navigation logic and no shared view of what was running. First-time pairing averaged 4.2 minutes, and 48% of users dropped off at the Bluetooth handshake step. Key flows also fell short of WCAG 2.1, with touch targets averaging 32pt and low-contrast text.",
    "did": [
      "Interviewed 8 homeowners who owned two or more connected appliances and audited 12 appliance apps for navigation, onboarding and accessibility patterns.",
      "Restructured eight appliance control flows from a four-level hierarchy into two levels built on Spaces, Devices and Routines, with a persistent bottom tab bar as the single navigation surface.",
      "Prototyped three onboarding variants in Principle and tested them in five moderated sessions, then iterated on control density and alert hierarchy through 12 unmoderated Maze sessions."
    ],
    "impact": [
      {
        "value": "54% → 94%",
        "label": "First-attempt task success"
      },
      {
        "value": "4.2 → 2.3 min",
        "label": "Pairing time in testing"
      },
      {
        "value": "35%",
        "label": "Daily engagement lift"
      }
    ],
    "questions": [
      {
        "q": "Why a guided scan for pairing?",
        "a": "Karishma prototyped three onboarding approaches in Principle and tested them in five moderated sessions. A QR-first flow was dropped because most participants could not complete it without assistance, and automatic Bluetooth discovery was dropped because users panicked when four or more devices appeared at once. The guided kitchen scan, which works room by room with visual confirmation, is slightly longer and requires camera permission, but it reached 92% completion and reduced average setup time from 4.2 to 2.3 minutes."
      },
      {
        "q": "How was accessibility built in?",
        "a": "Karishma treated WCAG 2.1 AA as a design constraint from day one and checked every pattern decision against it before moving to the next phase. Touch targets grew from 32pt to 48pt, body text contrast rose from 3.8:1 to 7.2:1, controls per screen fell from 11 to 5, and no control relied on an icon alone. After this accessibility and hierarchy rebuild, first-attempt task success on primary control screens rose from 54% to 94%."
      },
      {
        "q": "What did the research reveal?",
        "a": "Karishma conducted 8 in-depth interviews with homeowners who owned two or more connected appliances. None of the eight had ever set up a routine or automation, five said they had given up on advanced features, and all eight wanted one place to check appliance status. The design answered with a single dashboard and a simplified trigger-and-action routine builder in place of a complex conditional logic interface."
      },
      {
        "q": "What would she do differently?",
        "a": "Karishma would run cross-team alignment workshops before wireframing rather than after. Firmware constraints surfaced in week 8 and required a redesign of the Bluetooth pairing flow mid-prototype. Earlier technical discovery would have saved two weeks and preserved an onboarding variant that tested very well but was not feasible given API limitations."
      }
    ]
  },
  "fitness-wearable": {
    "title": "Pulse",
    "meta": [
      "UX Designer",
      "12 weeks · 2024"
    ],
    "problem": "Wearable owners opened the app an average of 7 times a day but acted on what they saw only 1.2 times, because metrics such as heart rate and HRV appeared without any benchmark or interpretation. Onboarding lost 65% of users during pairing and permissions, where a permission wall appeared before the app had shown its value. All four core flows failed baseline comprehension testing before the redesign.",
    "did": [
      "Interviewed 10 wearable owners, from casual walkers to competitive athletes, and audited Fitbit, Apple Health, Garmin and WHOOP.",
      "Defined a Raw, Context, Insight, Action translation model, applied it to every metric card, notification and empty state, and restructured a six-level hierarchy into four primary tabs.",
      "Prototyped three onboarding variants in Principle and tested four core flows with 6 participants, iterating on insight card density and notification clarity."
    ],
    "impact": [
      {
        "value": "65% → 30%",
        "label": "Onboarding drop-off in testing"
      },
      {
        "value": "91%",
        "label": "Task completion in testing"
      },
      {
        "value": "40%",
        "label": "Comprehension lift in testing"
      }
    ],
    "questions": [
      {
        "q": "Why translate every metric?",
        "a": "Karishma found that none of the 10 interviewees could confidently explain their HRV or VO2 Max score without looking it up, and 6 of 10 ignored everything except steps and heart rate. She therefore set one principle: no raw number appears on screen without a plain-language interpretation. Each metric moves from Raw to Context to Insight to Action, so an HRV of 52ms becomes a personal benchmark and then a specific suggestion, such as a Zone 3 to 4 run. The model also gave designers and engineers a shared test for every screen."
      },
      {
        "q": "Why defer permissions in onboarding?",
        "a": "Karishma prototyped three onboarding approaches in Principle and tested them in moderated sessions. A permission-first flow lost many participants at the Bluetooth prompt before they saw the app, and an automatic device scan led many to cancel when unfamiliar device names appeared. Deferring permissions to the moment of need meant a slightly longer session before full functionality, but it showed value first and reduced drop-off from 65% to 30%."
      },
      {
        "q": "How was the redesign validated?",
        "a": "Karishma tested the four core flows (onboarding, daily check-in, workout start and sleep review) with 6 participants in moderated usability sessions. Task completion reached 91%, above the 90% objective she set at the start, and comprehension of the daily summary screen improved by 40%. Engineering requested zero spec clarifications after her annotated Figma handoff."
      },
      {
        "q": "What would she change next time?",
        "a": "Karishma would bring engineering into the research phase earlier. Some contextual benchmarks, such as comparing real-time HRV against a 30-day rolling average, required complex backend calculation, and that feasibility conversation arrived too late. Next, she would explore how the framework serves users with chronic conditions, where misreading data carries higher stakes, and how it can surface the right insight through notifications."
      }
    ]
  },
  "brand-bloom": {
    "title": "Bloom",
    "meta": [
      "Brand Identity Designer",
      "8 weeks · 2024",
      "Wellness app"
    ],
    "problem": "Bloom needed a brand identity that could compete with Calm and Headspace while establishing a distinctly premium, human-centered niche. Its existing visual identity was generic and indistinguishable from dozens of other wellness apps. The brief called for a brand that felt rooted in yoga tradition yet modern, digital-first and appealing to a Gen Z audience.",
    "did": [
      "Defined the positioning “where ancient wisdom meets modern simplicity” around three audience profiles: the burnout professional, the mindful parent and the yoga-curious beginner.",
      "Explored four logo concepts and selected a six-petal radial bloom mark, supported by a five-color palette led by Bloom Purple and a Fraunces and DM Sans type pairing.",
      "Delivered the logo system, brand guidelines, app icon and social templates, together with a gentle, unhurried voice guide and applications ranging from onboarding cards to a yoga mat."
    ],
    "impact": [
      {
        "value": "92%",
        "label": "Brand recognition in tests"
      },
      {
        "value": "15K+",
        "label": "Launch-month downloads"
      },
      {
        "value": "$500K",
        "label": "Pre-seed funding secured"
      }
    ],
    "questions": [
      {
        "q": "Why a six-petal radial mark?",
        "a": "Karishma explored four logo concepts before committing to a direction. An abstract petal ring felt too close to competitor marks, a lotus lettermark was too literal and lost its meaning at small sizes, and a standalone wordmark lacked recall without an icon. She selected the radial bloom, six petals radiating from a center point, because it scaled cleanly and carried a sacred geometry character. The final mark remains recognizable as an app icon at 29 pixels."
      },
      {
        "q": "How were ancient and modern balanced?",
        "a": "Karishma gave yoga tradition and the digital product distinct roles rather than blending them into one compromise. She set Fraunces, an optical variable serif, for headlines and pull quotes, and DM Sans, a friendly geometric sans, for interface copy and labels. The moodboard drew on botanical forms, Japanese minimalism and wabi-sabi, while the voice stayed gentle and unhurried and excluded performance language such as “crush your goals” and “hustle”. The result positions Bloom as neither a fitness app nor a meditation app, but a space to come home to."
      },
      {
        "q": "How was the identity validated?",
        "a": "Karishma applied the system across four touchpoints, from an app icon recognizable at 29 pixels to full-bleed onboarding cards, a daily quote template for social and a tone-on-tone yoga mat. In user tests, the identity achieved 92% brand recognition. After launch, the app recorded 15K+ downloads in its first month and a 4.9 App Store rating, and Bloom secured $500K in pre-seed funding."
      },
      {
        "q": "What did she learn from Bloom?",
        "a": "The Bloom exploration showed Karishma that a wellness mark has to hold its meaning at small sizes and stand apart from a crowded category. The lotus lettermark lost its meaning when reduced, and the petal ring resembled competitor marks, so both were set aside despite their obvious relevance to the theme. She also treated voice as part of the identity system, defining phrases Bloom would never use, such as “no excuses” and “hustle”, so that the brand could not drift into fitness-app language."
      }
    ]
  },
  "brand-volta": {
    "title": "Volta",
    "meta": [
      "Brand Identity and Strategy Designer",
      "10 weeks · 2024",
      "Electric vehicles"
    ],
    "problem": "Volta was entering a crowded electric vehicle market defined by Tesla’s cold minimalism, Rivian’s adventure-outdoor positioning and Lucid’s ultra-luxury angle. The company needed a brand that felt powerful and technical without alienating mainstream buyers. It also had to speak to three distinct segments: technically minded early adopters, budget-aware commuters and status-driven buyers switching from BMW or Audi.",
    "did": [
      "Developed the brand strategy, positioning Volta on the idea that drivers never have to sacrifice power for principle, and mapped it to three segments: tech early adopters, conscious commuters and status seekers.",
      "Designed a monogram “V” with an integrated negative-space bolt, selected from four concepts, and built a five-color system around Electric Blue, Midnight and a Voltage accent, set in Space Grotesk and Inter.",
      "Delivered the logo system, motion identity, UI kit, vehicle livery and investor deck branding, and applied them to a charging station interface and a spec-forward brand brochure."
    ],
    "impact": [
      {
        "value": "$2M",
        "label": "Seed round post-rebrand"
      },
      {
        "value": "50K+",
        "label": "Pre-order waitlist"
      },
      {
        "value": "300%",
        "label": "Increase in press coverage"
      }
    ],
    "questions": [
      {
        "q": "Why a monogram over a lightning bolt?",
        "a": "Karishma explored four directions for the mark. An abstract lightning bolt was the expected answer, but the device is already used by more than 200 energy brands, a custom electrified wordmark proved too complex, and a circle badge with a chevron felt automotive rather than tech-forward. She chose a monogram “V” with the bolt integrated as negative space, which retained the reference to energy while remaining strong and scalable."
      },
      {
        "q": "Why avoid eco-friendly messaging?",
        "a": "Karishma excluded phrases such as “eco-friendly option”, “save the planet” and “alternative vehicle” from the brand voice. That framing presents an electric vehicle as a sacrifice, which conflicted with the positioning that Volta never asks drivers to trade power for principle. The tradeoff was giving up the category’s most familiar message in exchange for a confident, direct voice that could reach buyers switching from BMW or Audi as well as climate-conscious commuters. Space Grotesk for headlines and Inter for spec sheets reinforced that technical, performance-first tone."
      },
      {
        "q": "How did the market respond?",
        "a": "Karishma extended the identity to the touchpoints that mattered most for an early-stage company: investor deck branding with full-bleed midnight slides, a vehicle livery, a charging station interface and a spec-forward brochure. After the rebrand, Volta closed a $2M seed round, built a pre-order waitlist of 50K+ and recorded a 300% increase in press coverage, with eight auto show features in its first year. The CEO reported that investors said the brand made the company look like a $50M business while it was still pre-revenue."
      },
      {
        "q": "What did she learn from Volta?",
        "a": "Volta showed Karishma that in a crowded category, differentiation has to be settled in strategy before it can be expressed in form. Each established competitor already held a clear territory: Tesla with cold minimalism, Rivian with adventure and Lucid with ultra-luxury. The project therefore moved from a competitor audit to brand strategy before identity design, and the logo exploration confirmed the point: a generic lightning bolt could not separate Volta from more than 200 energy brands."
      }
    ]
  },
  "brand-harvest": {
    "title": "Harvest",
    "meta": [
      "Brand Identity Designer",
      "6 weeks · 2023",
      "Food delivery"
    ],
    "problem": "Harvest competed with Instacart, Imperfect Foods and Thrive Market, none of which told the story of the farmers behind the food. Its advantage was its relationships with more than 500 local farm partners. The brand needed to make customers feel that relationship as well.",
    "did": [
      "Positioned Harvest around the line “Honest food, beautiful stories”, framing the service as a relationship between the people who grow food and the people who eat it.",
      "Selected a hand-drawn grain stalk with a sun mark from four concepts, and built a five-color palette led by Terra orange with Lora and Source Sans Pro for story-led and functional text.",
      "Delivered packaging, an app icon, social templates and a farmer co-branding kit that gives each partner a “Harvest Partner” badge, applied to a kraft delivery box and a weekly “Farm Spotlight” series."
    ],
    "impact": [
      {
        "value": "3×",
        "label": "Six-month revenue growth"
      },
      {
        "value": "98%",
        "label": "Farmer partner retention"
      },
      {
        "value": "4.8★",
        "label": "Average customer rating"
      }
    ],
    "questions": [
      {
        "q": "Why Terra orange and a serif?",
        "a": "Karishma built the palette around Terra, a warm orange used for the logo, calls to action and packaging accents, balanced by Forest green for fresh produce and Wheat as the packaging base color. She set Lora, a humanist serif, for the brand name, headlines and farmer stories, and Source Sans Pro for product descriptions, interface copy and ingredient lists. The pairing gives the farmer stories an editorial warmth while keeping functional information readable for families who read ingredient labels closely."
      },
      {
        "q": "Why pass on the approved monogram?",
        "a": "Karishma’s leaf and circle monogram was clean, scalable and had passed stakeholder review, which made it the lower-risk option. She instead selected a hand-drawn grain stalk with a sun mark because it was warm, artisan and story-led, qualities that expressed Harvest’s real advantage over its competitors: its relationships with farmers. The tradeoff was accepting a less conventional mark in return for an identity that could carry the farmer story onto every box and screen."
      },
      {
        "q": "How did the brand reach farmers?",
        "a": "Karishma designed the identity to serve both sides of the marketplace. Each partner farm received a co-branded “Harvest Partner” badge kit, the app featured farmer profile cards and story-forward product pages, and a weekly “Farm Spotlight” social series paired a farmer portrait with an origin story. The kraft delivery box, with a stamp-print logo, Terra orange tape and a handwritten note slot, carried the same story to the customer’s door. Harvest reported 98% farmer partner retention and 3× revenue growth within six months, and the founder noted that customers began recognizing the boxes before opening them."
      },
      {
        "q": "What did she learn from Harvest?",
        "a": "Harvest showed Karishma that an authentic mark depends on specificity. A barn icon read as a generic American Midwest farm rather than artisan, and a fork and leaf sat too close to existing restaurant brands, so both diluted the story. She judged each concept by whether it could carry the brand’s particular narrative, which is why the hand-drawn grain stalk was preferred even over the monogram that had passed stakeholder review."
      }
    ]
  },
}
