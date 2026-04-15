import { CheckCircle2, Target, Users, Zap } from 'lucide-react';

const userGoals = [
  'Check total portfolio value and daily change in seconds',
  'Understand which holdings are driving gains or losses',
  'Visualize asset allocation to spot concentration risk',
  'Compare performance against benchmarks (S&P 500)',
  'Track stocks of interest before buying',
  'Access historical performance trends',
];

const productGoals = [
  'Deliver sub-second data load for core dashboard view',
  'Achieve 90%+ task completion rate for primary user jobs',
  'Establish reusable component patterns for chart modules',
  'Build scalable architecture for future feature additions',
  'Maintain accessibility compliance for all visualizations',
];

const metrics = [
  {
    category: 'Performance',
    items: [
      { metric: 'Data load time', target: '<1.5s', result: '1.2s', type: 'measured', improvement: '30% faster' },
      { metric: 'Time to interactive', target: '<2s', result: '1.8s', type: 'measured', improvement: '25% faster' },
    ],
  },
  {
    category: 'Usability',
    items: [
      { metric: 'Task success rate', target: '>85%', result: '92%', type: 'measured', improvement: '40% improvement' },
      { metric: 'Time-to-insight (portfolio check)', target: '<30s', result: '~20s est.', type: 'estimated', improvement: '35-50% faster' },
      { metric: 'Chart interpretation errors', target: '<15%', result: '~10% est.', type: 'estimated', improvement: '20-30% reduction' },
    ],
  },
  {
    category: 'Confidence',
    items: [
      { metric: 'User confidence rating', target: '4.0/5', result: '~4.3 est.', type: 'estimated', improvement: '+0.8-1.2 lift' },
    ],
  },
];

export const GoalsSection = () => {
  return (
    <section id="goals" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 3</span>
      <h2 className="heading-section mb-4">Goals & Success Metrics</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I defined clear user goals and measurable success criteria to guide 
        design decisions and validate impact.
      </p>

      {/* Goals Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* User Goals */}
        <div className="card-elevated">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="heading-subsection">User Goals</h3>
          </div>
          <ul className="space-y-3">
            {userGoals.map((goal, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Goals */}
        <div className="card-elevated">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-info" />
            </div>
            <h3 className="heading-subsection">Product Goals</h3>
          </div>
          <ul className="space-y-3">
            {productGoals.map((goal, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Success Metrics Table */}
      <div className="mb-12">
        <h3 className="heading-subsection mb-6">Success Metrics</h3>
        <div className="overflow-x-auto">
          <table className="table-fintech">
            <thead>
              <tr>
                <th>Category</th>
                <th>Metric</th>
                <th>Target</th>
                <th>Result</th>
                <th>Improvement</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((category) =>
                category.items.map((item, i) => (
                  <tr key={`${category.category}-${i}`}>
                    {i === 0 && (
                      <td rowSpan={category.items.length} className="font-medium text-foreground">
                        {category.category}
                      </td>
                    )}
                    <td>{item.metric}</td>
                    <td className="font-mono text-sm">{item.target}</td>
                    <td className="font-mono text-sm text-primary">{item.result}</td>
                    <td className="text-primary font-medium">{item.improvement}</td>
                    <td>
                      <span className={`tag ${item.type === 'measured' ? 'tag-measured' : 'tag-estimated'}`}>
                        {item.type === 'measured' ? 'Measured' : 'Estimated'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Plan */}
      <div className="card-highlight">
        <h3 className="heading-subsection mb-4">How I Would Validate Estimates</h3>
        <div className="prose-fintech">
          <p className="mb-4">
            The estimated metrics require instrumentation and user research to validate. 
            Here is the measurement plan I would implement:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 list-none">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Time-to-Insight:</strong>
                <span className="text-muted-foreground"> Instrument task-start and task-complete events for core actions; measure time-on-task in analytics.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Interpretation Errors:</strong>
                <span className="text-muted-foreground"> Tag chart interactions and correlate with subsequent user corrections; conduct think-aloud studies.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Confidence Rating:</strong>
                <span className="text-muted-foreground"> In-app survey after key tasks (5-point scale); A/B test UI variations to isolate impact.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Funnel Analysis:</strong>
                <span className="text-muted-foreground"> Track drop-off rates at each step of core user flows; identify friction points.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
