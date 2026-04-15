import { AlertTriangle, Brain, Clock, Shield, TrendingDown } from 'lucide-react';

const painPoints = [
  {
    icon: TrendingDown,
    title: 'Fragmented Data',
    description: 'Investors juggle 3-5+ apps and browser tabs to check holdings across different brokers and asset classes.',
  },
  {
    icon: Brain,
    title: 'Cognitive Overload',
    description: 'Raw numbers without context—users struggle to interpret if +2.3% today is good relative to benchmarks or risk taken.',
  },
  {
    icon: Clock,
    title: 'Slow Time-to-Insight',
    description: 'Manual calculations for total value, allocation percentages, and contribution to returns waste valuable decision time.',
  },
  {
    icon: AlertTriangle,
    title: 'Hidden Concentration Risk',
    description: 'Without clear allocation views, investors unknowingly overweight single stocks or sectors, increasing portfolio risk.',
  },
  {
    icon: Shield,
    title: 'Trust Deficit',
    description: 'Unclear data freshness, missing units, and unexplained metrics erode confidence in the numbers displayed.',
  },
];

export const ContextSection = () => {
  return (
    <section id="context" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 2</span>
      <h2 className="heading-section mb-4">Context & Problem</h2>
      
      <div className="prose-fintech max-w-3xl mb-12">
        <p className="body-large">
          Individual investors managing diversified portfolios face a fundamental 
          challenge: <strong>making informed decisions requires synthesizing data 
          scattered across multiple platforms, formats, and timeframes.</strong>
        </p>
        
        <p>
          The rise of commission-free trading has democratized investing, but the 
          tools available to retail investors haven't kept pace. Most portfolio 
          trackers are either too simplistic (basic lists without analytics) or 
          too complex (designed for professional traders with dozens of charts 
          and indicators).
        </p>
        
        <p>
          I identified an opportunity to build a solution that bridges this gap—
          delivering professional-grade analytics in an interface that respects 
          users' limited time and cognitive bandwidth.
        </p>
      </div>

      {/* Pain Points */}
      <div>
        <h3 className="heading-subsection mb-6">Key User Pain Points</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {painPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card-elevated">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-destructive" />
                </div>
                <h4 className="font-semibold text-foreground">{title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why This Matters */}
      <div className="mt-12 card-highlight">
        <h3 className="heading-subsection mb-4">Why This Solution Matters</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Time-to-Insight</h4>
            <p className="text-sm text-muted-foreground">
              Reduce daily portfolio check from 5+ minutes to under 30 seconds 
              with pre-computed KPIs and visual summaries.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Clarity</h4>
            <p className="text-sm text-muted-foreground">
              Transform raw data into actionable insights—visualizations answer 
              specific questions, not just display numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Trust</h4>
            <p className="text-sm text-muted-foreground">
              Build confidence through transparent data sourcing, clear units, 
              and consistent formatting across all metrics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
