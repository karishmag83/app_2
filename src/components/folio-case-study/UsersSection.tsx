import { Briefcase, Clock, LineChart, PiggyBank, Target, TrendingUp } from 'lucide-react';

const personas = [
  {
    type: 'Primary',
    name: 'Alex Chen',
    role: 'Tech Professional & Part-Time Investor',
    avatar: 'AC',
    age: 32,
    investingExp: '5+ years',
    portfolioSize: '$80K - $200K',
    checkFrequency: 'Daily (morning + evening)',
    goals: [
      'Grow wealth for early retirement',
      'Optimize tax-advantaged accounts',
      'Balance growth and stability',
    ],
    frustrations: [
      'Switching between 3 broker apps',
      'No consolidated view of allocation',
      'Uncertain if diversified enough',
    ],
    techSavvy: 'High',
    quote: '"I want to see my whole picture in 30 seconds, not 5 minutes."',
  },
  {
    type: 'Secondary',
    name: 'Maria Santos',
    role: 'Financial Advisor Assistant',
    avatar: 'MS',
    age: 28,
    investingExp: '3 years',
    portfolioSize: 'Manages 20+ client accounts',
    checkFrequency: 'Multiple times daily',
    goals: [
      'Quickly review client positions',
      'Identify rebalancing needs',
      'Prepare client reports',
    ],
    frustrations: [
      'Manual data aggregation',
      'Inconsistent formatting across sources',
      'Time-consuming report generation',
    ],
    techSavvy: 'Medium-High',
    quote: '"I need reliable data I can trust to show clients."',
  },
];

const jtbds = [
  {
    when: 'When I wake up and check my phone',
    want: 'I want to see my portfolio value and overnight changes',
    so: 'so I know if anything needs attention before my day starts.',
    icon: Clock,
  },
  {
    when: 'When a stock I own makes big moves',
    want: 'I want to understand its contribution to my total return',
    so: 'so I can decide whether to hold, add, or trim the position.',
    icon: TrendingUp,
  },
  {
    when: 'When I receive my bonus',
    want: 'I want to see my current allocation by asset class',
    so: 'so I can invest new funds where I am underweight.',
    icon: PiggyBank,
  },
  {
    when: 'When market volatility increases',
    want: 'I want to identify my concentration risks',
    so: 'so I can rebalance before a single position hurts me.',
    icon: Target,
  },
  {
    when: 'When researching new investments',
    want: 'I want to track potential buys on a watchlist',
    so: 'so I can monitor price action before committing capital.',
    icon: LineChart,
  },
  {
    when: 'When tax season approaches',
    want: 'I want to review my realized gains and losses',
    so: 'so I can plan tax-loss harvesting strategies.',
    icon: Briefcase,
  },
];

const scenarios = [
  {
    title: 'Daily Check-In',
    duration: '30 seconds',
    steps: [
      'Open app → Dashboard loads immediately',
      'Scan KPI cards: total value, daily change, total return',
      'Glance at Top Movers for notable price action',
      'Decision: All normal, close app / Investigate further',
    ],
  },
  {
    title: 'Performance Driver Analysis',
    duration: '2-3 minutes',
    steps: [
      'Review Gain/Loss by Holding bar chart',
      'Identify top contributor (e.g., BTC +132%)',
      'Navigate to Holdings for detailed metrics',
      'Compare cost basis to current value',
      'Decision: Hold winner / Take profits',
    ],
  },
  {
    title: 'Concentration Risk Review',
    duration: '1-2 minutes',
    steps: [
      'Review Allocation donut chart on Dashboard',
      'Identify 50%+ in single asset class (Crypto)',
      'Drill into Holdings, sort by Value descending',
      'Note: BTC = 37% of portfolio',
      'Decision: Rebalance into underweight sectors',
    ],
  },
];

export const UsersSection = () => {
  return (
    <section id="users" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 4</span>
      <h2 className="heading-section mb-4">Users & Jobs-To-Be-Done</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I developed user personas and mapped their jobs-to-be-done to ensure 
        every design decision serves real user needs.
      </p>

      {/* Personas */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {personas.map((persona) => (
          <div key={persona.name} className="persona-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="persona-avatar">{persona.avatar}</div>
              <div>
                <span className={`tag ${persona.type === 'Primary' ? 'tag-primary' : 'tag'} mb-2`}>
                  {persona.type} Persona
                </span>
                <h3 className="font-semibold text-lg text-foreground">{persona.name}</h3>
                <p className="text-sm text-muted-foreground">{persona.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="label block mb-1">Age</span>
                <span className="text-sm text-foreground">{persona.age}</span>
              </div>
              <div>
                <span className="label block mb-1">Experience</span>
                <span className="text-sm text-foreground">{persona.investingExp}</span>
              </div>
              <div>
                <span className="label block mb-1">Portfolio</span>
                <span className="text-sm text-foreground">{persona.portfolioSize}</span>
              </div>
              <div>
                <span className="label block mb-1">Check Frequency</span>
                <span className="text-sm text-foreground">{persona.checkFrequency}</span>
              </div>
            </div>

            <div className="mb-4">
              <span className="label block mb-2">Goals</span>
              <ul className="space-y-1">
                {persona.goals.map((goal, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <span className="label block mb-2">Frustrations</span>
              <ul className="space-y-1">
                {persona.frustrations.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="border-l-2 border-primary pl-4 mt-6 italic text-muted-foreground">
              {persona.quote}
            </blockquote>
          </div>
        ))}
      </div>

      {/* Jobs-To-Be-Done */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Jobs-To-Be-Done</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jtbds.map(({ when, want, so, icon: Icon }, i) => (
            <div key={i} className="card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  JTBD #{i + 1}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{when}</strong>, {want.toLowerCase()}, {so.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Scenarios */}
      <div>
        <h3 className="heading-subsection mb-6">Key Scenarios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.title} className="card-elevated">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">{scenario.title}</h4>
                <span className="tag">{scenario.duration}</span>
              </div>
              <ol className="space-y-2">
                {scenario.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
