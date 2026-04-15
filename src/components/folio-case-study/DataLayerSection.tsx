import { Database, RefreshCw, Shield, Clock } from 'lucide-react';

const dataModules = [
  {
    module: 'KPI Cards',
    dataPoints: ['Total portfolio value', 'Total gain/loss ($, %)', 'Daily change ($, %)', 'Cash balance'],
    source: 'Aggregated from holdings × current prices',
  },
  {
    module: 'Portfolio Value Chart',
    dataPoints: ['Daily portfolio value over 90 days', 'Historical price data'],
    source: 'Time-series calculation from holdings history',
  },
  {
    module: 'Allocation Donut',
    dataPoints: ['Holdings grouped by asset class', 'Percentage of total value'],
    source: 'Categorized holdings with real-time prices',
  },
  {
    module: 'Top Movers',
    dataPoints: ['Symbol, name, price, daily % change'],
    source: 'Filtered holdings sorted by absolute daily change',
  },
  {
    module: 'Gain/Loss Bars',
    dataPoints: ['Holding symbol', 'Total gain/loss in dollars'],
    source: '(Current value - cost basis) per holding',
  },
  {
    module: 'Holdings Table',
    dataPoints: ['Symbol, qty, avg cost, current price, value, day %, total gain/loss'],
    source: 'Full holdings data with calculated fields',
  },
];

const trustElements = [
  {
    icon: Clock,
    title: 'Data Freshness',
    current: '"Last updated: Just now" timestamp in sidebar footer',
    recommendation: 'Add per-widget timestamps for async data sources',
  },
  {
    icon: Shield,
    title: 'Metric Definitions',
    current: 'Implicit understanding assumed',
    recommendation: 'Add info icons with tooltip definitions (e.g., "Total Return = (Current Value - Cost Basis) / Cost Basis")',
  },
  {
    icon: RefreshCw,
    title: 'Consistent Formatting',
    current: 'Dollar amounts with commas, percentages with 2 decimals, +/- prefixes',
    recommendation: 'Document formatting rules in design system for future contributors',
  },
];

export const DataLayerSection = () => {
  return (
    <section id="data-layer" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 7</span>
      <h2 className="heading-section mb-4">Data & Trust Layer</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I mapped data requirements to UI modules and designed trust-building elements 
        to ensure users have confidence in the numbers they see.
      </p>

      {/* Data Architecture */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Data Architecture</h3>
        <div className="diagram-container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Database className="w-8 h-8 text-primary mx-auto mb-2" />
              <span className="font-semibold text-foreground block">REST API</span>
              <span className="text-xs text-muted-foreground">Market Data Source</span>
            </div>
            <div className="text-primary text-2xl">→</div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <RefreshCw className="w-8 h-8 text-info mx-auto mb-2" />
              <span className="font-semibold text-foreground block">Data Layer</span>
              <span className="text-xs text-muted-foreground">Transform & Aggregate</span>
            </div>
            <div className="text-primary text-2xl">→</div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Shield className="w-8 h-8 text-success mx-auto mb-2" />
              <span className="font-semibold text-foreground block">UI Modules</span>
              <span className="text-xs text-muted-foreground">Charts, Tables, KPIs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Mapping Table */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Data → Module Mapping</h3>
        <div className="overflow-x-auto">
          <table className="table-fintech">
            <thead>
              <tr>
                <th>UI Module</th>
                <th>Data Points</th>
                <th>Data Source</th>
              </tr>
            </thead>
            <tbody>
              {dataModules.map(({ module, dataPoints, source }) => (
                <tr key={module}>
                  <td className="font-medium text-foreground">{module}</td>
                  <td>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {dataPoints.map((point, i) => (
                        <li key={i} className="text-sm">{point}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="text-sm text-muted-foreground">{source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust Layer */}
      <div>
        <h3 className="heading-subsection mb-6">Trust Layer Design</h3>
        <p className="body-regular mb-6 max-w-2xl">
          Financial data demands transparency. I incorporated trust-building elements 
          throughout the interface and identified areas for improvement.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {trustElements.map(({ icon: Icon, title, current, recommendation }) => (
            <div key={title} className="card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">{title}</h4>
              </div>
              
              <div className="mb-4">
                <span className="label block mb-2">Current Implementation</span>
                <p className="text-sm text-muted-foreground">{current}</p>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-3">
                <span className="label block mb-1 text-warning">Recommendation</span>
                <p className="text-sm text-foreground">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Formatting Rules */}
        <div className="mt-8 card-highlight">
          <h4 className="font-semibold text-foreground mb-4">Formatting Standards</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <span className="label block mb-2">Currency</span>
              <code className="text-sm text-primary font-mono">$131,013.15</code>
              <p className="text-xs text-muted-foreground mt-1">Dollar sign, commas, 2 decimals</p>
            </div>
            <div>
              <span className="label block mb-2">Percentage</span>
              <code className="text-sm text-primary font-mono">+62.97%</code>
              <p className="text-xs text-muted-foreground mt-1">Sign prefix, 2 decimals, % suffix</p>
            </div>
            <div>
              <span className="label block mb-2">Positive Change</span>
              <code className="text-sm text-success font-mono">↑ $747.65 (+0.57%)</code>
              <p className="text-xs text-muted-foreground mt-1">Green + arrow + parenthetical %</p>
            </div>
            <div>
              <span className="label block mb-2">Negative Change</span>
              <code className="text-sm text-destructive font-mono">-1.71%</code>
              <p className="text-xs text-muted-foreground mt-1">Red + minus prefix</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
