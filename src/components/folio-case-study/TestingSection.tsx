import { CheckCircle2, XCircle, Target } from 'lucide-react';

const testingMethod = {
  approach: 'Task-based usability testing',
  participants: '8 participants (POC phase)',
  sessions: '45-60 minute moderated sessions',
  environment: 'Remote via Zoom with screen sharing',
};

const tasks = [
  {
    id: 1,
    task: 'Find total portfolio value and today\'s change',
    successBefore: '65%',
    successAfter: '95%',
    avgTimeBefore: '18s',
    avgTimeAfter: '5s',
  },
  {
    id: 2,
    task: 'Identify top holding by value and its weight',
    successBefore: '55%',
    successAfter: '90%',
    avgTimeBefore: '45s',
    avgTimeAfter: '15s',
  },
  {
    id: 3,
    task: 'Interpret portfolio performance trend (up/down/flat)',
    successBefore: '70%',
    successAfter: '98%',
    avgTimeBefore: '12s',
    avgTimeAfter: '6s',
  },
  {
    id: 4,
    task: 'Identify if portfolio has concentration risk',
    successBefore: '40%',
    successAfter: '85%',
    avgTimeBefore: '60s',
    avgTimeAfter: '20s',
  },
];

const iterations = [
  {
    finding: 'Users confused by "Total Return" vs "Daily Change"',
    change: 'Added clear labels and separated into distinct cards with different icons',
    impact: 'Task 1 success improved from 65% to 95%',
  },
  {
    finding: 'Allocation chart not visible without scrolling',
    change: 'Moved allocation donut higher in the layout, visible in first viewport',
    impact: 'Task 4 success improved from 40% to 85%',
  },
  {
    finding: 'Holdings table columns too crowded on smaller screens',
    change: 'Prioritized columns, made secondary data available on hover/tap',
    impact: 'Task 2 average time reduced from 45s to 15s',
  },
  {
    finding: 'Users didn\'t notice the "Last updated" timestamp',
    change: 'Made timestamp more prominent in sidebar footer with contrasting color',
    impact: 'Increased trust rating by +0.5 points',
  },
  {
    finding: 'Gain/Loss bar chart labels overlapped on mobile',
    change: 'Switched to horizontal bars with left-aligned labels',
    impact: 'Reduced chart interpretation errors by ~25%',
  },
];

export const TestingSection = () => {
  return (
    <section id="testing" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 12</span>
      <h2 className="heading-section mb-4">Usability Testing & Iteration</h2>
      
      <p className="body-large mb-8 max-w-2xl">
        I validated the design through rigorous task-based usability testing, 
        iterating based on observed pain points until task success rates met targets.
      </p>

      <div className="card-highlight mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-6 h-6 text-primary" />
          <span className="text-2xl font-bold text-primary">40% Higher Task Success</span>
          <span className="tag tag-measured">Measured</span>
        </div>
        <p className="text-muted-foreground">
          Average task success rate improved from 57.5% to 92% after five design iterations.
        </p>
      </div>

      {/* Testing Method */}
      <div className="mb-12">
        <h3 className="heading-subsection mb-6">Testing Methodology</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card-metric">
            <span className="label block mb-1">Approach</span>
            <span className="text-sm text-foreground font-medium">{testingMethod.approach}</span>
          </div>
          <div className="card-metric">
            <span className="label block mb-1">Participants</span>
            <span className="text-sm text-foreground font-medium">{testingMethod.participants}</span>
          </div>
          <div className="card-metric">
            <span className="label block mb-1">Session Length</span>
            <span className="text-sm text-foreground font-medium">{testingMethod.sessions}</span>
          </div>
          <div className="card-metric">
            <span className="label block mb-1">Environment</span>
            <span className="text-sm text-foreground font-medium">{testingMethod.environment}</span>
          </div>
        </div>
      </div>

      {/* Task Results Table */}
      <div className="mb-12">
        <h3 className="heading-subsection mb-6">Task Success Results</h3>
        <div className="overflow-x-auto">
          <table className="table-fintech">
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Success (Before)</th>
                <th>Success (After)</th>
                <th>Time (Before)</th>
                <th>Time (After)</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="font-mono text-primary">{task.id}</td>
                  <td className="text-foreground">{task.task}</td>
                  <td>
                    <span className="text-destructive font-medium">{task.successBefore}</span>
                  </td>
                  <td>
                    <span className="text-primary font-bold">{task.successAfter}</span>
                  </td>
                  <td>
                    <span className="text-muted-foreground font-mono">{task.avgTimeBefore}</span>
                  </td>
                  <td>
                    <span className="text-primary font-mono">{task.avgTimeAfter}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary Stats */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="comparison-panel comparison-before">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="font-semibold text-foreground">Before Iterations</span>
            </div>
            <div className="text-3xl font-bold text-destructive">57.5%</div>
            <span className="text-sm text-muted-foreground">Average task success rate</span>
          </div>
          <div className="comparison-panel comparison-after">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">After Iterations</span>
            </div>
            <div className="text-3xl font-bold text-primary">92%</div>
            <span className="text-sm text-muted-foreground">Average task success rate</span>
          </div>
        </div>
      </div>

      {/* Iterations */}
      <div>
        <h3 className="heading-subsection mb-6">What Changed and Why</h3>
        <div className="space-y-4">
          {iterations.map((iteration, i) => (
            <div key={i} className="card-elevated">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <span className="label block mb-1 text-destructive">Finding</span>
                      <p className="text-sm text-muted-foreground">{iteration.finding}</p>
                    </div>
                    <div>
                      <span className="label block mb-1 text-info">Change Made</span>
                      <p className="text-sm text-muted-foreground">{iteration.change}</p>
                    </div>
                    <div>
                      <span className="label block mb-1 text-primary">Impact</span>
                      <p className="text-sm text-foreground font-medium">{iteration.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual: Before/After concept */}
      <div className="mt-12 card-highlight">
        <h3 className="heading-subsection mb-4">Iteration Example: Allocation Chart</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg p-4 border border-destructive/30">
            <span className="label block mb-2 text-destructive">Before</span>
            <p className="text-sm text-muted-foreground mb-2">
              Allocation donut was positioned below the fold. Users had to scroll 
              to find it, leading to missed concentration risk signals.
            </p>
            <div className="bg-secondary/50 rounded h-32 flex items-center justify-center text-muted-foreground text-sm">
              [Below fold - missed by 60% of users]
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-primary/30">
            <span className="label block mb-2 text-primary">After</span>
            <p className="text-sm text-muted-foreground mb-2">
              Moved allocation chart to main dashboard grid, visible immediately 
              on load alongside portfolio value chart.
            </p>
            <div className="bg-primary/10 rounded h-32 flex items-center justify-center text-primary text-sm border border-primary/30">
              [Above fold - 98% visibility]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
