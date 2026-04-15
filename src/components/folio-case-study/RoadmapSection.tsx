import { Bell, BrainCircuit, FileDown, Link2, PieChart, Shield } from 'lucide-react';

const roadmapItems = [
  {
    icon: Link2,
    title: 'Broker Integrations & CSV Import/Export',
    priority: 'High',
    description: 'Connect directly to major brokers (Fidelity, Schwab, Robinhood) via Plaid or broker APIs. Allow CSV import for manual portfolio tracking.',
    value: 'Eliminates manual data entry, keeps holdings automatically synced.',
  },
  {
    icon: Bell,
    title: 'Alerts & Thresholds',
    priority: 'High',
    description: 'User-configurable alerts for price movements, allocation drift, and goal milestones. Push notifications and email digests.',
    value: 'Proactive insights reduce need for constant manual checking.',
  },
  {
    icon: PieChart,
    title: 'Rebalancing Suggestions',
    priority: 'Medium',
    description: 'Compare current allocation to target allocation. Generate specific trade suggestions to rebalance with tax efficiency.',
    value: 'Actionable next steps, not just data visualization.',
  },
  {
    icon: Shield,
    title: 'Risk Analytics Pack',
    priority: 'Medium',
    description: 'Add drawdown analysis, volatility metrics (standard deviation, beta), diversification scores, and Sharpe ratio.',
    value: 'Professional-grade risk assessment for sophisticated investors.',
  },
  {
    icon: FileDown,
    title: 'Reporting (PDF/CSV)',
    priority: 'Medium',
    description: 'Generate portfolio summaries, performance reports, and tax documents. Scheduled email delivery options.',
    value: 'Supports tax prep, advisor conversations, and record-keeping.',
  },
  {
    icon: BrainCircuit,
    title: 'Explainable AI Insights',
    priority: 'Future',
    description: 'AI-generated insights explaining portfolio performance, anomaly detection, and opportunity identification. Must be transparent, source-based, and user-controlled.',
    value: 'Democratizes professional analysis while maintaining trust.',
    requirements: [
      'All AI insights must cite source data',
      'User can hide/disable AI features',
      'No "black box" recommendations',
      'Confidence levels shown for predictions',
    ],
  },
];

export const RoadmapSection = () => {
  return (
    <section id="roadmap" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 14</span>
      <h2 className="heading-section mb-4">Roadmap</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        The POC establishes core portfolio tracking. Here is the product vision 
        for future development, prioritized by user value and technical feasibility.
      </p>

      {/* Roadmap Items */}
      <div className="grid gap-6">
        {roadmapItems.map(({ icon: Icon, title, priority, description, value, requirements }) => (
          <div key={title} className="roadmap-item">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-foreground">{title}</h4>
                <span className={`roadmap-badge ${
                  priority === 'High' 
                    ? 'bg-primary/20 text-primary' 
                    : priority === 'Medium'
                    ? 'bg-warning-muted text-[hsl(38,92%,60%)]'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {priority} Priority
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{description}</p>
              <div className="bg-success-muted rounded-lg p-3 mb-3">
                <span className="label block mb-1">User Value</span>
                <p className="text-sm text-foreground">{value}</p>
              </div>
              
              {requirements && (
                <div className="bg-warning-muted rounded-lg p-3">
                  <span className="label block mb-2">Requirements for Trust</span>
                  <ul className="space-y-1">
                    {requirements.map((req, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integration TODOs from Settings */}
      <div className="mt-12 card-highlight">
        <h3 className="heading-subsection mb-4">Technical Integration TODOs</h3>
        <p className="body-regular mb-6">
          From the Settings page—the transparent roadmap for backend development:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Connect to real market data API (Alpha Vantage, Polygon, etc.)',
            'Implement user authentication with Supabase',
            'Add database persistence for portfolios',
            'Set up environment variables for API keys',
            'Add real-time WebSocket price updates',
          ].map((todo, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
              <div className="w-6 h-6 rounded-full border-2 border-muted-foreground" />
              <span className="text-sm text-muted-foreground">{todo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
