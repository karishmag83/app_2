import { TrendingUp, Users, Clock, Target, Leaf, BarChart3, DollarSign, Shield } from 'lucide-react'

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  metrics: { value: string; label: string; icon: any }[]
  caseStudy: {
    overview: string
    problem: string
    solution: string
    process: { phase: string; description: string }[]
    results: { metric: string; value: string; description: string }[]
    keyFeatures: string[]
    technologies: string[]
  }
}

export const projects: Project[] = [
  {
    id: 'ai-care-navigator',
    title: 'AI Care Navigator',
    subtitle: 'Helping Chronic Care Patients',
    description: 'An AI-powered healthcare platform that empowers patients to feel in control of their healthcare journey, not overwhelmed by it.',
    image: '/project-ai-care.jpg',
    tags: ['UX Design', 'AI Integration', 'Healthcare', 'Web App'],
    metrics: [
      { value: '40%', label: 'Reduced Anxiety', icon: Users },
      { value: '3x', label: 'Faster Appointments', icon: Clock },
      { value: '85%', label: 'User Satisfaction', icon: Target },
    ],
    caseStudy: {
      overview: 'AI Care Navigator is a comprehensive healthcare platform designed to support chronic care patients in managing their medical journey. The platform leverages artificial intelligence to provide personalized care recommendations, appointment scheduling, and health tracking.',
      problem: 'Chronic care patients often feel overwhelmed by the complexity of managing multiple appointments, medications, and health metrics. Traditional healthcare portals are confusing, lack personalization, and fail to provide actionable insights. 67% of patients reported feeling anxious about managing their care, and 45% missed appointments due to poor communication.',
      solution: 'We created an AI-powered care navigator that simplifies healthcare management through intelligent automation. The platform provides plain-language visit summaries, AI-generated preparation questions, personalized care plans, and proactive health reminders. The design focuses on reducing cognitive load while maintaining medical accuracy.',
      process: [
        { phase: 'Discovery', description: 'Conducted 25 user interviews with chronic care patients, analyzed 500+ support tickets, and mapped the complete patient journey to identify pain points.' },
        { phase: 'Strategy', description: 'Defined key user personas, established design principles focused on simplicity and trust, and created a feature prioritization matrix.' },
        { phase: 'Design', description: 'Developed wireframes, high-fidelity prototypes, and conducted 3 rounds of usability testing with 15 participants per round.' },
        { phase: 'Development', description: 'Built the platform using React and integrated AI APIs for natural language processing and personalized recommendations.' },
        { phase: 'Launch', description: 'Soft-launched with 200 beta users, gathered feedback, and iterated based on analytics and user interviews.' },
      ],
      results: [
        { metric: 'Patient Engagement', value: '+73%', description: 'Increase in daily active users within 3 months of launch' },
        { metric: 'Appointment Adherence', value: '94%', description: 'Patients now attend scheduled appointments vs 58% before' },
        { metric: 'Time Saved', value: '2.5 hrs', description: 'Average time saved per patient per week on care management' },
        { metric: 'Support Tickets', value: '-45%', description: 'Reduction in support requests related to appointment confusion' },
        { metric: 'NPS Score', value: '72', description: 'Net Promoter Score from patient surveys' },
        { metric: 'Medication Adherence', value: '+38%', description: 'Improvement in patients following medication schedules' },
      ],
      keyFeatures: [
        'AI-powered visit summaries in plain language',
        'Smart appointment scheduling with preparation checklists',
        'Personalized care plan tracking and reminders',
        'Medication management with interaction warnings',
        'Secure messaging with healthcare providers',
        'Health metrics visualization and trend analysis',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'PostgreSQL', 'AWS'],
    },
  },
  {
    id: 'restoration-medicine',
    title: 'Restoration Medicine',
    subtitle: 'Integrated Regenerative Health Platform',
    description: 'A comprehensive platform connecting patients with regenerative medicine practitioners, offering personalized treatment planning and outcome tracking.',
    image: '/RestorationMedicineCard.png',
    tags: ['Healthcare', 'Regenerative Medicine', 'Wellness', 'Platform'],
    metrics: [
      { value: '500+', label: 'Practitioners', icon: Users },
      { value: '95%', label: 'Patient Satisfaction', icon: Target },
      { value: '60%', label: 'Faster Recovery', icon: TrendingUp },
    ],
    caseStudy: {
      overview: 'Restoration Medicine is an integrated platform designed to connect patients with qualified regenerative medicine practitioners and streamline the treatment journey from consultation through recovery. The platform facilitates personalized treatment planning, secure data management, and evidence-based outcome tracking.',
      problem: 'Patients seeking regenerative medicine treatments face fragmented information, difficulty finding qualified practitioners, and lack of standardized outcome tracking. Many providers operate in silos without access to integrated patient data, making coordinated care difficult. 71% of patients report difficulty finding trustworthy practitioners, and 58% have inconsistent follow-up care.',
      solution: 'We developed an integrated platform that connects patients with vetted practitioners, provides transparent treatment planning, and enables real-time outcome tracking. The solution includes AI-powered practitioner matching, secure telemedicine integration, standardized outcome metrics, and automated follow-up protocols.',
      process: [
        { phase: 'Research', description: 'Conducted 40 interviews with patients and practitioners, analyzed regulatory requirements, and reviewed 30+ regenerative medicine programs.' },
        { phase: 'Strategy', description: 'Defined quality standards for practitioners, created patient onboarding flow, and established outcome measurement framework.' },
        { phase: 'Design', description: 'Developed wireframes for patient and practitioner portals, conducted 2 rounds of usability testing with 20+ users.' },
        { phase: 'Development', description: 'Built HIPAA-compliant infrastructure, integrated telemedicine APIs, and implemented secure data protocols.' },
        { phase: 'Validation', description: 'Launched with 50 beta practitioners, tracked outcome metrics, and refined matching algorithm based on success rates.' },
      ],
      results: [
        { metric: 'Practitioner Network', value: '500+', description: 'Qualified regenerative medicine practitioners on platform' },
        { metric: 'Patient Outcomes', value: '88%', description: 'Patients report significant improvement in targeted health markers' },
        { metric: 'Match Quality', value: '92%', description: 'Compatibility score between patient needs and practitioner expertise' },
        { metric: 'Treatment Adherence', value: '84%', description: 'Patients completing full treatment protocols vs 52% before' },
        { metric: 'Recovery Timeline', value: '-37%', description: 'Faster average recovery with coordinated care approach' },
        { metric: 'Practitioner Utilization', value: '+156%', description: 'Increase in patient volume for participating practitioners' },
      ],
      keyFeatures: [
        'AI-powered practitioner discovery and matching',
        'Secure video telemedicine with HIPAA compliance',
        'Integrated treatment planning and scheduling',
        'Real-time health outcome tracking dashboard',
        'Automated recovery protocol reminders',
        'Peer community and outcome sharing (anonymized)',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Twilio', 'AWS', 'OpenAI API'],
    },
  },
  {
    id: 'repack-portal',
    title: 'RePack Portal',
    subtitle: 'Sustainable Packaging Returns',
    description: 'A sustainable packaging return platform that makes eco-conscious choices simple and rewarding for consumers and businesses.',
    image: '/Repack_thumbail.jpg',
    tags: ['Sustainability', 'UX Design', 'Dashboard', 'E-commerce'],
    metrics: [
      { value: '350kg', label: 'Paper Saved', icon: Leaf },
      { value: '2.5M', label: 'lbs CO₂ Saved', icon: BarChart3 },
      { value: '1200', label: 'Active Users', icon: Users },
    ],
    caseStudy: {
      overview: 'RePack Portal is a comprehensive sustainable packaging return system that enables consumers to easily return reusable packaging while tracking their environmental impact. The platform gamifies sustainability, making eco-friendly choices engaging and rewarding.',
      problem: 'E-commerce packaging waste has reached critical levels, with 165 billion packages shipped annually in the US alone. 73% of consumers want sustainable options, but return processes are complicated and lack transparency. Businesses struggle to implement circular packaging systems due to poor tracking and low customer participation.',
      solution: 'We designed an intuitive portal that simplifies the return process to just 3 clicks while providing real-time environmental impact tracking. The platform includes an eco-points reward system, carbon footprint visualization, and seamless integration with existing e-commerce workflows.',
      process: [
        { phase: 'Research', description: 'Analyzed 10+ existing return systems, conducted surveys with 500+ consumers, and interviewed 20 sustainability-focused brands.' },
        { phase: 'Ideation', description: 'Held design sprints with stakeholders, mapped the circular packaging lifecycle, and prototyped multiple reward mechanisms.' },
        { phase: 'Prototyping', description: 'Created interactive prototypes for both consumer and business dashboards, tested with 30 users across 3 iterations.' },
        { phase: 'Build', description: 'Developed the full-stack application with real-time tracking integration and analytics dashboard.' },
        { phase: 'Scale', description: 'Onboarded 15 pilot brands, optimized based on usage analytics, and expanded to support international returns.' },
      ],
      results: [
        { metric: 'Return Rate', value: '78%', description: 'Of reusable packages are successfully returned vs industry average of 23%' },
        { metric: 'User Retention', value: '89%', description: 'Monthly active user retention rate after 6 months' },
        { metric: 'Carbon Offset', value: '2.5M lbs', description: 'CO₂ emissions prevented through reusable packaging' },
        { metric: 'Cost Savings', value: '$340K', description: 'Average annual packaging cost savings per enterprise client' },
        { metric: 'Customer LTV', value: '+45%', description: 'Increase in customer lifetime value for participating brands' },
        { metric: 'Processing Time', value: '-62%', description: 'Reduction in return processing time vs traditional methods' },
      ],
      keyFeatures: [
        'One-click package return initiation',
        'Real-time carbon footprint tracking dashboard',
        'Eco-points reward system with partner redemption',
        'Business analytics and sustainability reporting',
        'Multi-carrier shipping integration',
        'QR code-based package identification',
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Prisma', 'Stripe', 'Mapbox', 'Vercel'],
    },
  },
  {
    id: 'folio-tracker',
    title: 'Folio Tracker',
    subtitle: 'Investment Portfolio Dashboard',
    description: 'A beautiful, fast, and intuitive portfolio tracker for stocks, ETFs, and crypto with real-time analytics.',
    image: '/Folio_thumbnail.jpg',
    tags: ['Fintech', 'Dashboard', 'Data Viz', 'Web App'],
    metrics: [
      { value: '$131K', label: 'Avg Portfolio', icon: DollarSign },
      { value: '+62.9%', label: 'Avg Return', icon: TrendingUp },
      { value: '100%', label: 'Data Secure', icon: Shield },
    ],
    caseStudy: {
      overview: 'Folio Tracker is a comprehensive investment portfolio management platform that provides real-time tracking, advanced analytics, and intuitive visualization for stocks, ETFs, and cryptocurrency holdings. All data is stored locally for maximum privacy and security.',
      problem: 'Individual investors struggle to get a unified view of their investments across multiple platforms. Existing solutions are either too complex for casual investors or lack the depth needed for serious portfolio analysis. 68% of users abandon portfolio trackers within 30 days due to poor UX or data privacy concerns.',
      solution: 'We created a privacy-first portfolio tracker with a focus on simplicity and powerful analytics. The platform offers real-time price updates, visual asset allocation, performance analytics, and complete transaction history—all while keeping data securely stored locally in the browser.',
      process: [
        { phase: 'Discovery', description: 'Surveyed 200+ investors, analyzed 15 competing products, and identified key pain points in portfolio management.' },
        { phase: 'Design', description: 'Created a clean, data-dense interface with customizable dashboards and dark/light mode options.' },
        { phase: 'Development', description: 'Built with performance in mind, implementing efficient data structures and lazy loading for large portfolios.' },
        { phase: 'Testing', description: 'Conducted beta testing with 50 users, gathered feedback on data import workflows and visualization preferences.' },
        { phase: 'Launch', description: 'Released as a free tool, gathered user feedback, and implemented premium features based on demand.' },
      ],
      results: [
        { metric: 'User Growth', value: '12K+', description: 'Active users within first 6 months of launch' },
        { metric: 'Data Import', value: '3 min', description: 'Average time to set up and import portfolio data' },
        { metric: 'Session Duration', value: '8.5 min', description: 'Average time spent per session analyzing portfolios' },
        { metric: 'Retention', value: '76%', description: '30-day user retention rate' },
        { metric: 'Portfolio Value', value: '$131K', description: 'Average portfolio value tracked per user' },
        { metric: 'Performance', value: '<1s', description: 'Average dashboard load time for 100+ holdings' },
      ],
      keyFeatures: [
        'Real-time price updates for stocks, ETFs, and crypto',
        'Visual asset allocation with interactive charts',
        'Performance analytics with gain/loss tracking',
        'Complete transaction history and cost basis',
        'Local data storage for maximum privacy',
        'CSV import from major brokerages',
      ],
      technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'IndexedDB', 'Yahoo Finance API'],
    },
  },
  
]
