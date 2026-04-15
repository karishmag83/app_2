export interface ConversationContext {
  lastTopic?: string
  projectsDiscussed: string[]
  askedAboutContact: boolean
  askedAboutSkills: boolean
}

// Portfolio knowledge base
const portfolioData = {
  skills: {
    design: ['UX/UI Design', 'Product Design', 'Brand Design', 'Motion Graphics', '3D Design'],
    development: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Sass', 'Bootstrap', 'Redux'],
    tools: ['Figma', 'Adobe Creative Suite', 'Prototyping Tools'],
  },
  projects: [
    {
      name: 'AI Care Navigator',
      description: 'AI-powered healthcare platform for chronic care patients',
      impact: '40% reduced patient anxiety, 3x faster appointments, 85% user satisfaction',
      tech: ['UX Design', 'AI Integration', 'Healthcare', 'Web App'],
      keywords: ['ai care', 'healthcare', 'medical', 'patient', 'chronic', 'care', 'health', 'appointment', 'anxiety'],
    },
    {
      name: 'RePack Portal',
      description: 'Sustainable packaging marketplace connecting businesses with eco-friendly solutions',
      impact: '60% increase in supplier engagement, 1200+ active users',
      tech: ['Web Design', 'Sustainability', 'Marketplace'],
      keywords: ['repack', 'sustainable', 'eco', 'packaging', 'green', 'environment', 'sustainability', 'business'],
    },
    {
      name: 'Folio Tracker',
      description: 'Investment portfolio management dashboard with real-time analytics',
      impact: 'Real-time tracking, intuitive analytics, comprehensive portfolio management',
      tech: ['FinTech', 'Dashboard', 'Data Visualization'],
      keywords: ['folio', 'portfolio', 'investment', 'finance', 'tracker', 'dashboard'],
    },
  ],
  services: [
    'UX/UI Consultation & Strategy',
    'Web Application Design & Development',
    'Brand Identity & Visual Design',
    'Landing Pages & Marketing Sites',
    'Motion Graphics & Animations',
    '3D Design & Visualization',
  ],
  contact: {
    email: 'karishmaworks08@gmail.com',
    location: 'Boston, MA, USA',
  },
}

export const CONTACT_EMAIL = portfolioData.contact.email

// LLM Agent: Data retrieval and grounding
const retrieveRelevantData = (intent: string, message: string) => {
  const context: any = {}

  switch (intent) {
    case 'skills':
      context.skills = portfolioData.skills
      context.focus = message.includes('design')
        ? 'design'
        : message.includes('code') || message.includes('develop')
        ? 'development'
        : null
      break
    case 'projects':
      context.projects = portfolioData.projects
      context.specific =
        portfolioData.projects.find((p) => p.keywords?.some((kw) => message.includes(kw))) || null
      break
    case 'services':
      context.services = portfolioData.services
      break
    case 'contact':
      context.contact = portfolioData.contact
      break
    case 'experience':
      context.background = {
        education:
          'MS in Information Systems from Northeastern University (2023-2025), specialized in UX Design & Web Development',
        experience: [
          'UX/Product Web Developer Co-op at Roux Institute',
          'UX Designer Intern at Webtech Digital Solutions',
          'UX Graduate Head TA at Northeastern University',
        ],
        strength: 'Combines academic rigor with real-world product experience',
      }
      break
    case 'process':
      context.process = [
        { step: 'Discovery', duration: '1-2 weeks', description: 'User research, competitive analysis, problem definition' },
        { step: 'Strategy', duration: '1 week', description: 'Define success metrics, create personas, establish design principles' },
        { step: 'Design', duration: '3-6 weeks', description: 'Wireframing, prototyping, iterative testing' },
        { step: 'Development', duration: '4-8 weeks', description: 'Frontend implementation, QA, optimization' },
        { step: 'Launch & Iterate', duration: 'Ongoing', description: 'Analytics, feedback collection, data-driven optimization' },
      ]
      break
    case 'pricing':
      context.pricingModels = ['Project-Based', 'Hourly Consultation', 'Retainer']
      context.ranges = {
        'UX Audit': 'Starting at $2,500',
        'Landing Page': '$3,000 - $8,000',
        'Web Application': '$15,000 - $50,000+',
        'Brand Identity': '$5,000 - $15,000',
      }
      break
  }

  return context
}

// LLM Agent: Response synthesis from grounded data
const synthesizeResponse = (
  intent: string,
  retrievedData: any,
): string => {
  switch (intent) {
    case 'greeting':
      return `Hi there! 👋 I'm Karishma's AI assistant. I'm here to help you learn about her portfolio, explore her impressive skill set, or discuss potential collaborations. What would you like to know?`

    case 'skills': {
      const designSkills = retrievedData.skills?.design || []
      const devSkills = retrievedData.skills?.development || []
      const toolsList = retrievedData.skills?.tools || []

      if (retrievedData.focus === 'design') {
        return `Karishma excels at **Design Skills** 🎨:\n\n${designSkills
          .map((s: string) => `• ${s}`)
          .join('\n')}\n\nShe's particularly strong with Figma and Adobe Suite, specializing in creating strategic designs that drive measurable business growth.`
      } else if (retrievedData.focus === 'development') {
        return `On the **Development** side 💻, Karishma brings:\n\n${devSkills
          .map((s: string) => `• ${s}`)
          .join('\n')}\n\nThis rare combination of design + development expertise means she can bridge the gap between beautiful UI and technically sound implementation.`
      }

      return `Karishma has a **hybrid skill set** that makes her exceptional:\n\n**Design:** ${designSkills.join(', ')}\n**Development:** ${devSkills.join(', ')}\n**Tools:** ${toolsList.join(', ')}\n\nThis combination is rare and powerful for building complete product experiences.`
    }

    case 'projects':
      if (retrievedData.specific) {
        const p = retrievedData.specific
        return `**${p.name}** is a fantastic example of her work! 🚀\n\n${p.description}\n\n✨ **Results:** ${p.impact}\n🛠️ **Tech Stack:** ${p.tech.join(', ')}\n\nThis project showcases her ability to handle ${
          p.name === 'AI Care Navigator'
            ? 'complex healthcare systems'
            : p.name === 'RePack Portal'
            ? 'sustainable business solutions'
            : 'sophisticated financial data visualization'
        }.`
      }

      return `Karishma has worked on **impactful projects** across different domains:\n\n${retrievedData.projects
        ?.map((p: any, i: number) => `**${i + 1}. ${p.name}**\n${p.description}\n📊 Impact: ${p.impact}`)
        .join('\n\n')}\n\nEach project demonstrates her strategic approach to solving real business problems.`

    case 'services':
      return `Here's what Karishma offers:\n\n${retrievedData.services
        ?.map((s: string) => `✨ ${s}`)
        .join('\n')}\n\nEvery service is backed by research and measured by real business impact. She's not just focused on aesthetics—she creates strategic designs that drive growth and conversions.`

    case 'contact':
      return `Let's connect! 📧 Karishma loves discussing new projects and opportunities.\n\n**Reach out:**\n📧 Email: ${retrievedData.contact?.email}\n📍 Location: ${retrievedData.contact?.location}\n\nShe's available for full-time roles, freelance work, consulting, and workshops. Response time is typically within 24 hours.`

    case 'experience':
      return `Karishma brings both **academic excellence** and **real-world experience**:\n\n🎓 **Education:**\n${retrievedData.background?.education}\n\n💼 **Professional Experience:**\n${retrievedData.background?.experience
        ?.map((e: string) => `• ${e}`)
        .join('\n')}\n\n${retrievedData.background?.strength} This means she understands both the theory and practice of creating great products.`

    case 'process':
      return `Karishma's **proven design process** is collaborative and iterative:\n\n${retrievedData.process
        ?.map((p: any) => `**${p.step}** (${p.duration})\n${p.description}`)
        .join('\n\n')}\n\nShe emphasizes continuous collaboration and rapid iteration to ensure the final product truly solves user problems.`

    case 'pricing':
      return `Karishma offers **flexible engagement models**:\n\n${retrievedData.pricingModels
        ?.map((m: string) => `• ${m}`)
        .join('\n')}\n\n**Typical Investment Ranges:**\n${Object.entries(retrievedData.ranges || {})
        .map(([project, range]: any) => `• ${project}: ${range}`)
        .join('\n')}\n\nSince every project is unique, she provides custom proposals based on scope, timeline, and goals. Reach out at ${portfolioData.contact.email} to discuss your specific needs.`

    case 'timeline':
      return `**Project timelines** depend on scope and complexity:\n\n• UX Consultation: 1-2 weeks\n• Landing Page: 2-3 weeks\n• Brand Identity: 3-4 weeks\n• Web Application: 8-12 weeks\n• Complete Product: 3-6 months\n\nWhile Karishma works efficiently, she maintains quality standards—rushing typically takes 2-3 weeks minimum. For your specific project, she can provide an accurate timeline after understanding your needs.`

    case 'philosophy':
      return `Karishma's design philosophy is simple but powerful:\n\n💡 **"I create everything your brand needs to attract customers and turn them into sales."**\n\nShe believes in:\n• **User-Centered Design** - Deep research, not assumptions\n• **Data-Driven Decisions** - Every choice backed by evidence\n• **Strategic Thinking** - Design serves business goals\n• **Technical Feasibility** - Beauty meets reality\n• **Continuous Iteration** - Always improving based on feedback\n\nGreat design, she thinks, is when users don't even realize how elegantly their problem has been solved.`

    case 'current':
      return `Great question. Although I know a lot about Karishma, for that one you might have to ask her personally.\n\n📧 You can reach her at ${portfolioData.contact.email}.`

    case 'personal':
      return `Great question. Although I know a lot about Karishma, for that one you might have to ask her personally.\n\n📧 You can reach her at ${portfolioData.contact.email}.`

    default:
      return `Great question. Although I know a lot about Karishma, for that one you might have to ask her personally.\n\n📧 You can reach her at ${portfolioData.contact.email}.`
  }
}

// LLM Agent: Intent detection
const detectIntent = (message: string): string => {
  const msg = message.toLowerCase()

  if (/^(hi|hello|hey|good morning|good evening|greetings|sup|welcome)/.test(msg)) {
    return 'greeting'
  }
  
  // Personal questions - check FIRST before other intents
  if (/currently working|current project|working on now|what are you working on|what project.*working on/.test(msg)) {
    return 'current'
  }
  if (/where does she work|working currently|where is she working|who does she work for|what company does she work for|is she looking for work|looking for work|working full-time|working remotely/.test(msg)) {
    return 'personal'
  }
  if (/father's name|fathers name|mother's name|mothers name|her parent|her sibling|is she married|she have a boyfriend|she have a girlfriend|when is her birthday|where was.*born|what is her address|does she have.*pet|she have.*pet/.test(msg)) {
    return 'personal'
  }
  if (/therapist|therapy|mental health|coffee or tea person|astrology|believe in astrology|lived there|how long.*lived/.test(msg)) {
    return 'personal'
  }
  if (/her salary|her income|how much does she earn|how much does she make|her net worth|how much is she worth|how much did she earn|her debt|she have.*debt|her student loan|how much debt|how much money does she|how much has she saved|how much does she owe|how much is her rent|how much earn|how much make|how much saved/.test(msg)) {
    return 'personal'
  }
  if (/her favorite|her hobby|her hobbies|she do for fun|does she exercise|is she vegan|is she vegetarian|her diet|is she healthy|she wear glasses|does she drink coffee|her daily routine|she wake up|she spend her time|she feeling|she get around|drink coffee|apple or android|how much drink|favorite social media|what good at/.test(msg)) {
    return 'personal'
  }
  if (/her career goal|her aspiration|her dream job|her future plan|she see herself|she introverted|she extroverted|her friend|where does she want to work|her next steps|do believe fate|do believe luck|what life philosophy|how long commute|how long relationship|how long together/.test(msg)) {
    return 'personal'
  }
  if (/cultural background|how long has she been|job offers|considering any offers|she considering|they break up|have received offers|are on social media|is she on social media/.test(msg)) {
    return 'personal'
  }
  
  // Contact intent - must come before projects to catch "work with you"
  if (/contact|your email|email address|reach out|reach you|hire you|work with you|work together|available for|collaboration|get in touch|how can i work|where are you located|schedule a call|book a|taking new clients|how quickly|get started|next step|portfolio website|discovery call|meet in person|work remotely|timezone|international clients|travel for projects|sign nda|provide references|testimonials|see your work|send you a message|send message|verify your work|what information do you need|what information needed|verify work/.test(msg)) {
    return 'contact'
  }
  if (/(linkedin|behance|github|social media|are you on|do you have.*linkedin|do you have.*behance|do you have.*github|what.*linkedin|how.*respond|response time|how.*book|how do i start|work internationally|do you travel)/.test(msg)) {
    return 'contact'
  }
  
  // Skills - check before personal to catch "do you know X", "can you do Y"
  if (/\b(can you code|coding|programming language)\b/.test(msg)) {
    return 'skills'
  }
  if (/\b(typescript|javascript|html|css|react|vue|angular|node)\b/.test(msg)) {
    return 'skills'
  }
  if (/skill|expert|capable|proficient|tech stack|good at|specialty|makes you different|frameworks|technologies do you know|programming languages do you know|experienced in/.test(msg)) {
    return 'skills'
  }
  if (/do you (use|know|have|understand|do).*adobe|sketch|figma|redux|sass|bootstrap|wireframe|prototyp|research|accessibility|design system|front-end|responsive|animation|interaction|information architecture|visual design|product design|documentation|usability|design thinking|api|git|version control|a\/b test|data visual|mobile design|ios|android|component librar|typescript|javascript|html|css/.test(msg)) {
    return 'skills'
  }
  if (/can you (do|create|work with|design|build).*wireframe|wireframing|prototype|research|accessibility|animation|interaction|architecture|documentation|api|a\/b test|data visual|mobile|ios|android/.test(msg)) {
    return 'skills'
  }
  if (/are you (familiar|good|experienced).*redux|sass|bootstrap|adobe|git|component/.test(msg)) {
    return 'skills'
  }
  if (/repack|ai care|folio tracker|what about.*project|case stud|best work|industries.*worked|client work|fintech|show.*ui|saas|show.*recent work|show.*portfolio/.test(msg)) {
    return 'projects'
  }
  // Catch "biggest achievement" for portfolio/projects context
  if (/biggest achievement.*(portfolio|your work)|what is your biggest achievement/.test(msg)) {
    return 'projects'
  }
  // Check for project/experience questions before the broader "have" personal pattern
  if (/(startup|scale|e-commerce|ecommerce|b2b|b2c|cross-platform).*experience/.test(msg)) {
    return 'projects'
  }
  if (/do you have.*(startup|fintech|saas|e-commerce|ecommerce|b2b|b2c|healthcare|mobile.*app).*experience/.test(msg)) {
    return 'projects'
  }
  if (/what.*scale.*product/.test(msg)) {
    return 'projects'
  }
  if (/project|portfolio|built|example|showcase/.test(msg)) {
    return 'projects'
  }
  if (/branding|brand identity/.test(msg)) {
    return 'services'
  }
  if (/service|offer|provide|help|design|develop|user testing|prototypes|create prototype|work with startups|work with my team|join.*team|join existing team/.test(msg)) {
    return 'services'
  }
  if (/(do you|can you|do you offer|can you do|can you help).*(ux audit|competitive analysis|user persona|customer journey|journey map|design sprint|mvp|product strategy|redesign|maintenance|design handoff|workshop|train|design review|branding strategy|style guide|build design system|illustration|icon design|marketing material|presentation|cms|seo|hosting)/.test(msg)) {
    return 'services'
  }
  if (/(can you|do you).*(map).*(journey|customer)/.test(msg)) {
    return 'services'
  }
  if (/where did you study|where did she study|when did you graduate|when did she graduate|what did you major|what was your major|where did you graduate/.test(msg)) {
    return 'experience'
  }
  if (/what universities.*attend|have you worked at.*startup|have you worked at.*tech|have you mentored|what certifications do you have|how many years.*experience|what companies.*worked for/.test(msg)) {
    return 'experience'
  }
  if (/what makes you qualified|can you share qualifications/.test(msg)) {
    return 'experience'
  }
  if (/background|education|degree|university|studied|qualification|internship|where have you worked|teaching experience|what is her experience/.test(msg)) {
    return 'experience'
  }
  if (/process|approach|methodology|workflow|how do you/.test(msg)) {
    return 'process'
  }
  if (/(how do you|what is your|what.*metric).*(start|research|gather|design thinking|validate|iterative|handle feedback|collaboration|communicate|deliverable|prioritize|tool.*collaboration|ensure quality|agile|measure success|metric|track|test design|qa)/.test(msg)) {
    return 'process'
  }
  if (/what tools do you use|do you follow agile/.test(msg)) {
    return 'process'
  }
  if (/price|cost|rate|budget|how much|fee|payment|charge|investment/.test(msg)) {
    return 'pricing'
  }
  if (/(minimum|pricing model|fixed price|pay monthly|deposit|payment method|payment plan|within.*budget|pricing include|additional cost|charge for revision|cancellation|refund|quote|estimate|pricing.*calculat|included in investment)/.test(msg)) {
    return 'pricing'
  }
  if (/timeline|how long|duration|time frame|deadline|how fast|turnaround|when can we launch/.test(msg)) {
    return 'timeline'
  }
  if (/(when are you available|your availability|how soon|current availability|simple website|tight deadline|minimum.*duration|discovery take|when.*deliver|quickly.*prototype|lead time|rush project|taking new project|when can we start)/.test(msg)) {
    return 'timeline'
  }
  
  // Philosophy - check before personal for "what inspires", "what drives", etc.
  if (/(design philosophy|why.*ux important|define.*design|what makes.*great product|balance.*aesthetic|user-centered|ucd|what makes you unique|stay current|what inspires you|what problem solving|what drives you|focus.*satisfaction|your vision|define success|believe.*data-driven|what values|why.*design|why should.*choose you|why.*choose)/.test(msg)) {
    return 'philosophy'
  }
  if (/philosophy|believe|principle/.test(msg)) {
    return 'philosophy'
  }

  return 'general'
}

export const generateSmartResponse = (
  userMessage: string,
  context: ConversationContext,
): { response: string; suggestions: string[]; topic: string } => {
  const message = userMessage.toLowerCase().trim()
  const intent = detectIntent(message)
  const retrievedData = retrieveRelevantData(intent, message)
  const responseText = synthesizeResponse(intent, retrievedData)

  let suggestions: string[] = []
  switch (intent) {
    case 'greeting':
      suggestions = ['Show me projects', 'What are your skills?', 'Tell me about services']
      break
    case 'skills':
      context.askedAboutSkills = true
      suggestions = ['Show me examples', 'What services?', 'How to contact?']
      break
    case 'projects':
      suggestions = ['Tell me more', 'What services?', 'How can I work with you?']
      break
    case 'services':
      suggestions = ["What's your process?", 'How much does it cost?', 'How to contact?']
      break
    case 'contact':
      context.askedAboutContact = true
      suggestions = ['What are your rates?', 'How long for a project?', 'Tell me about background']
      break
    case 'experience':
      suggestions = ['What projects did you build?', 'Tell me about skills', 'How to hire you?']
      break
    case 'process':
      suggestions = ['Show project results', 'What services?', 'How long does it take?']
      break
    case 'pricing':
      suggestions = ['How long does a project take?', 'What services?', 'Contact Karishma']
      break
    case 'timeline':
      suggestions = ["What's your process?", 'How much does it cost?', 'Show examples']
      break
    case 'philosophy':
      suggestions = ['Show me examples', "What's your process?", 'Tell me about projects']
      break
    case 'current':
      suggestions = ['Email Karishma']
      break
    case 'personal':
      suggestions = ['Email Karishma']
      break
    default:
      suggestions = ['Email Karishma']
  }

  return {
    response: responseText,
    suggestions,
    topic: intent,
  }
}
