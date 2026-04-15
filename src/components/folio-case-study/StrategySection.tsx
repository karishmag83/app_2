import { Eye, Layers, Lock, Sparkles } from 'lucide-react';

const principles = [
  {
    icon: Layers,
    title: 'Progressive Disclosure',
    description: 'Overview first, then drill-down on demand',
    details: [
      'Dashboard provides high-level KPIs and trends',
      'Holdings table reveals granular position data',
      'Hover states expose additional context without navigation',
      'Reduces cognitive load by showing only what\'s needed at each level',
    ],
    example: 'Dashboard KPI cards → Holdings table → Individual position details',
  },
  {
    icon: Eye,
    title: 'One Chart = One Question',
    description: 'Each visualization answers a single, clear question',
    details: [
      'Portfolio Value chart: "How is my wealth trending?"',
      'Allocation donut: "Where is my money distributed?"',
      'Gain/Loss bars: "Which holdings are performing best?"',
      'Top Movers: "What moved most today?"',
    ],
    example: 'Users know exactly where to look for specific insights',
  },
  {
    icon: Lock,
    title: 'Trust Through Transparency',
    description: 'Clear definitions, units, and data freshness indicators',
    details: [
      '"Last updated: Just now" timestamp in footer',
      'Consistent $ and % formatting throughout',
      'Tooltip definitions for financial terms',
      'Color-coded positive/negative values (green/red)',
    ],
    example: 'Every metric shows its units; every change shows its direction',
  },
  {
    icon: Sparkles,
    title: 'Accessibility-First Readability',
    description: 'Charts readable without relying solely on color',
    details: [
      'Direction arrows (↑↓) accompany color-coded changes',
      'Minimum contrast ratios for all text on dark background',
      'Clear axis labels and legends on every chart',
      'Monospace font for numerical precision',
    ],
    example: 'Gain/loss values include + or - prefix, not just green/red color',
  },
];

export const StrategySection = () => {
  return (
    <section id="strategy" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 5</span>
      <h2 className="heading-section mb-4">UX Strategy</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I applied FinTech-specific UX principles to ensure the interface builds 
        trust while delivering actionable insights efficiently.
      </p>

      {/* Principles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {principles.map(({ icon: Icon, title, description, details, example }) => (
          <div key={title} className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>

            <div className="bg-secondary/30 rounded-lg p-3 mt-4">
              <span className="label block mb-1">Example</span>
              <p className="text-sm text-foreground font-medium">{example}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Design Decision Framework */}
      <div className="mt-12 card-highlight">
        <h3 className="heading-subsection mb-6">Design Decision Framework</h3>
        <p className="body-regular mb-6">
          Every feature and visual decision passed through this filter:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">Does it reduce time-to-insight?</h4>
            <p className="text-sm text-muted-foreground">
              If a feature doesn't help users get answers faster, it doesn't belong in the POC.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">Does it build trust?</h4>
            <p className="text-sm text-muted-foreground">
              Unclear data erodes confidence. Every element must be transparent and verifiable.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">Is it scannable in 3 seconds?</h4>
            <p className="text-sm text-muted-foreground">
              Users check portfolios frequently but briefly. Key info must be instantly visible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
