import { ArrowRight, Gauge, Layers, RefreshCw, Zap } from 'lucide-react';

const optimizations = [
  {
    icon: Layers,
    title: 'Modular Component Architecture',
    description: 'Breaking the dashboard into discrete, lazy-loadable components reduces initial bundle size and improves time-to-interactive.',
    techniques: [
      'Code splitting at route level',
      'Lazy loading non-critical charts',
      'Memoization of expensive calculations',
    ],
    impact: 'Reduced initial bundle by ~35%',
  },
  {
    icon: RefreshCw,
    title: 'Optimized Re-renders',
    description: 'Strategic use of React.memo and useCallback prevents unnecessary re-renders when data updates.',
    techniques: [
      'React.memo for chart components',
      'useCallback for event handlers',
      'useMemo for derived calculations',
    ],
    impact: 'Reduced re-render count by ~60%',
  },
  {
    icon: Zap,
    title: 'Efficient Data Transformations',
    description: 'Pre-computing aggregations and chart data before render prevents expensive calculations in the render path.',
    techniques: [
      'Compute totals once on data fetch',
      'Cache allocation percentages',
      'Pre-sort holdings for display',
    ],
    impact: 'Reduced computation time by ~40%',
  },
  {
    icon: Gauge,
    title: 'Progressive Rendering',
    description: 'Skeleton loaders and progressive content display improve perceived performance during data fetching.',
    techniques: [
      'Skeleton states for all async content',
      'Priority loading for above-fold content',
      'Deferred loading for below-fold charts',
    ],
    impact: 'Improved perceived load time by ~50%',
  },
];

const beforeAfter = {
  before: {
    label: 'Before Optimization',
    loadTime: '1.8s',
    tti: '2.5s',
    reRenders: '~45 per update',
    bundleSize: '380KB',
  },
  after: {
    label: 'After Optimization',
    loadTime: '1.2s',
    tti: '1.8s',
    reRenders: '~18 per update',
    bundleSize: '245KB',
  },
};

const perceivedImprovements = [
  {
    metric: 'Interaction responsiveness',
    estimate: '~40% faster',
    validation: 'User timing API measurements on filter/sort actions',
    status: 'estimated',
  },
  {
    metric: 'Chart animation smoothness',
    estimate: '60fps maintained',
    validation: 'Chrome DevTools Performance profiler',
    status: 'estimated',
  },
];

export const PerformanceSection = () => {
  return (
    <section id="performance" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 11</span>
      <h2 className="heading-section mb-4">Performance as UX</h2>
      
      <p className="body-large mb-8 max-w-2xl">
        I treated performance as a first-class UX concern. Slow dashboards erode trust 
        and increase abandonment—financial data demands instant responsiveness.
      </p>

      <div className="card-highlight mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-primary" />
          <span className="text-2xl font-bold text-primary">30% Faster Data Load</span>
          <span className="tag tag-measured">Measured</span>
        </div>
        <p className="text-muted-foreground">
          Through modular component architecture and performance tuning, I reduced 
          dashboard load time from 1.8s to 1.2s.
        </p>
      </div>

      {/* Optimization Strategies */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Optimization Strategies</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {optimizations.map(({ icon: Icon, title, description, techniques, impact }) => (
            <div key={title} className="card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">{title}</h4>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{description}</p>
              
              <div className="mb-4">
                <span className="label block mb-2">Techniques</span>
                <ul className="space-y-1">
                  {techniques.map((technique, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {technique}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-success-muted rounded-lg p-3">
                <span className="text-sm font-medium text-primary">{impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Before vs. After</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="comparison-panel comparison-before">
            <h4 className="font-semibold text-foreground mb-4">{beforeAfter.before.label}</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Load Time</span>
                <span className="font-mono text-foreground">{beforeAfter.before.loadTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time to Interactive</span>
                <span className="font-mono text-foreground">{beforeAfter.before.tti}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Re-renders</span>
                <span className="font-mono text-foreground">{beforeAfter.before.reRenders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bundle Size</span>
                <span className="font-mono text-foreground">{beforeAfter.before.bundleSize}</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="comparison-panel comparison-after">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-semibold text-foreground">{beforeAfter.after.label}</h4>
              <span className="tag tag-measured">Measured</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Load Time</span>
                <span className="font-mono text-primary font-bold">{beforeAfter.after.loadTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time to Interactive</span>
                <span className="font-mono text-primary font-bold">{beforeAfter.after.tti}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Re-renders</span>
                <span className="font-mono text-primary font-bold">{beforeAfter.after.reRenders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bundle Size</span>
                <span className="font-mono text-primary font-bold">{beforeAfter.after.bundleSize}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center my-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-lg font-bold text-destructive">1.8s</span>
            </div>
            <ArrowRight className="w-8 h-8 text-primary" />
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">1.2s</span>
            </div>
            <span className="text-lg font-bold text-primary ml-4">30% Faster</span>
          </div>
        </div>
      </div>

      {/* Perceived Improvements */}
      <div>
        <h3 className="heading-subsection mb-6">Perceived Performance (Estimated)</h3>
        <div className="overflow-x-auto">
          <table className="table-fintech">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Estimate</th>
                <th>Validation Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {perceivedImprovements.map(({ metric, estimate, validation }) => (
                <tr key={metric}>
                  <td className="font-medium text-foreground">{metric}</td>
                  <td className="text-primary">{estimate}</td>
                  <td className="text-muted-foreground">{validation}</td>
                  <td>
                    <span className="tag tag-estimated">Estimated</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
