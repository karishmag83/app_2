import { Info } from 'lucide-react';

const visualizations = [
  {
    id: 1,
    name: 'Portfolio Value Over Time',
    chartType: 'Area/Line Chart',
    status: 'implemented',
    question: '"How is my portfolio trending over time?"',
    rationale: 'Line charts excel at showing trends. The area fill adds visual weight to emphasize value accumulation.',
    interactions: [
      'Hover: Tooltip shows exact value and date',
      'X-axis: Date labels at readable intervals',
      'Y-axis: Auto-scaled with meaningful tick marks',
    ],
    uxDetails: 'Default 90-day view balances recent trends with medium-term context. Smooth line interpolation.',
    accessibility: 'Clear axis labels, sufficient contrast for line color against dark background.',
    edgeCases: 'Empty state: "Add holdings to see performance" message. Single data point: Show as dot with value.',
  },
  {
    id: 2,
    name: 'Asset Allocation',
    chartType: 'Donut Chart',
    status: 'implemented',
    question: '"How is my money distributed across asset classes?"',
    rationale: 'Donut charts show part-to-whole relationships. Center space used for total or key metric.',
    interactions: [
      'Hover: Segment highlights with tooltip showing name, value, percentage',
      'Legend: Interactive—click to filter',
    ],
    uxDetails: 'Three segments (Stocks, Crypto, ETFs) keep it scannable. Legend positioned right for horizontal reading.',
    accessibility: 'Distinct colors with pattern fills option. Legend provides text alternative to color coding.',
    edgeCases: 'Single asset class: Show full circle. Empty: Placeholder with "Add holdings" CTA.',
  },
  {
    id: 3,
    name: 'Gain/Loss by Holding',
    chartType: 'Horizontal Bar Chart',
    status: 'implemented',
    question: '"Which holdings have made/lost the most money?"',
    rationale: 'Horizontal bars allow easy label reading. Length encodes magnitude; position shows rank.',
    interactions: [
      'Hover: Tooltip with exact gain/loss and percentage',
      'Sorted by value descending',
    ],
    uxDetails: 'Green bars for gains. Labels show ticker symbols for quick recognition.',
    accessibility: 'Value labels on bars for screen readers. Sufficient bar height for touch targets.',
    edgeCases: 'Negative gains: Red bars extending left. All losses: Red-dominant chart with clear labeling.',
  },
  {
    id: 4,
    name: 'Top Movers List',
    chartType: 'List with Sparklines',
    status: 'implemented',
    question: '"What moved most today?"',
    rationale: 'List format for quick scanning. Directional icons (↑↓) plus percentage for at-a-glance status.',
    interactions: [
      'Static list—no hover actions needed',
      'Sorted by absolute daily change',
    ],
    uxDetails: 'Shows top 5 movers. Green/red color coding with icons for direction. Symbol + name for clarity.',
    accessibility: 'Color + icon + text value ensures information isn\'t color-dependent.',
    edgeCases: 'No movers (market closed): "Market closed" message. All flat: Show anyway with 0.00%.',
  },
  {
    id: 5,
    name: 'Holdings Table',
    chartType: 'Sortable Data Table',
    status: 'implemented',
    question: '"What are the details of each position?"',
    rationale: 'Tables handle multi-dimensional data. Columns map to key metrics users need to compare.',
    interactions: [
      'Sort: Click column headers to sort asc/desc',
      'Filter: Type filter dropdown (Stocks/Crypto/ETFs/All)',
      'Search: Text search by symbol or name',
    ],
    uxDetails: 'Columns: Symbol, Qty, Avg Cost, Price, Value, Day %, Gain/Loss. Value sorted by default.',
    accessibility: 'Semantic table markup. Sortable headers with aria-sort. Alternating row shading.',
    edgeCases: 'No results: "No holdings match your filters" with clear filter button. Loading: Skeleton rows.',
  },
  {
    id: 6,
    name: 'KPI Summary Cards',
    chartType: 'Metric Cards',
    status: 'implemented',
    question: '"What are the key numbers right now?"',
    rationale: 'Cards provide scannable, hierarchical display of critical metrics.',
    interactions: [
      'Static display—information, not interaction',
      'Some cards link to relevant detail views',
    ],
    uxDetails: 'Four cards: Total Value, Total Gain/Loss, Daily Change, Cash Balance. Large numbers, secondary context.',
    accessibility: 'High contrast text. Semantic headings for screen readers.',
    edgeCases: 'Loading: Skeleton cards. Error fetching: "Unable to load" with retry option.',
  },
  {
    id: 7,
    name: 'Contribution Waterfall',
    chartType: 'Waterfall Chart',
    status: 'roadmap',
    question: '"How did each holding contribute to my total return?"',
    rationale: 'Waterfall shows sequential contribution. Starting value → individual impacts → ending value.',
    interactions: [
      'Hover: Tooltip with holding details',
      'Visual connectors between bars',
    ],
    uxDetails: 'Green bars for positive contributors, red for negative. Subtotal bar at end.',
    accessibility: 'Pattern fills for color-blind users. Value labels on each bar.',
    edgeCases: 'Many holdings: Group smaller contributors into "Others" bar.',
  },
  {
    id: 8,
    name: 'Drawdown Chart',
    chartType: 'Area Chart (inverted)',
    status: 'roadmap',
    question: '"What is my worst loss from peak?"',
    rationale: 'Drawdown visualization critical for risk assessment. Area fill emphasizes depth of losses.',
    interactions: [
      'Hover: Show drawdown % and date',
      'Highlight max drawdown period',
    ],
    uxDetails: 'Red area fill indicating loss depth. Zero line as reference.',
    accessibility: 'Clear axis labels. Pattern fill option for red area.',
    edgeCases: 'No drawdown (always growing): Show flat line at 0%.',
  },
  {
    id: 9,
    name: 'Returns Distribution',
    chartType: 'Histogram',
    status: 'roadmap',
    question: '"How are my daily/monthly returns distributed?"',
    rationale: 'Histogram reveals return consistency. Normal distribution vs. fat tails.',
    interactions: [
      'Hover: Bar shows return range and count',
      'Toggle: Daily vs. monthly view',
    ],
    uxDetails: 'Bins centered on 0%. Green for positive, red for negative ranges.',
    accessibility: 'Bar labels for screen readers. Legend explaining axes.',
    edgeCases: 'Limited data: Message about minimum required for meaningful distribution.',
  },
  {
    id: 10,
    name: 'Risk vs. Return Scatter',
    chartType: 'Scatter Plot',
    status: 'roadmap',
    question: '"Which holdings offer the best return for the risk?"',
    rationale: 'Scatter plots reveal relationships. Position shows risk-adjusted performance.',
    interactions: [
      'Hover: Tooltip with holding details',
      'Size encoding: Bubble size = position weight',
    ],
    uxDetails: 'X-axis: Volatility (risk). Y-axis: Return. Efficient frontier line overlay.',
    accessibility: 'Labels for each point. Color + size encoding with legend.',
    edgeCases: 'Insufficient data for volatility: Placeholder with "More history needed" message.',
  },
];

const chartDecisionMatrix = [
  {
    insight: 'Trend over time',
    chart: 'Line/Area',
    why: 'Shows continuous change, easy to spot patterns',
    whenNot: 'Discrete categories, few data points',
  },
  {
    insight: 'Part of whole',
    chart: 'Donut/Pie',
    why: 'Intuitive percentage comparison',
    whenNot: 'More than 5-6 categories, comparing across groups',
  },
  {
    insight: 'Comparison across items',
    chart: 'Bar (horizontal)',
    why: 'Easy label reading, clear ranking',
    whenNot: 'Time-series data, too many items',
  },
  {
    insight: 'Distribution shape',
    chart: 'Histogram',
    why: 'Reveals frequency patterns',
    whenNot: 'Categorical data, few data points',
  },
  {
    insight: 'Relationship between variables',
    chart: 'Scatter',
    why: 'Shows correlation, clusters, outliers',
    whenNot: 'Single variable, discrete categories',
  },
  {
    insight: 'Sequential contribution',
    chart: 'Waterfall',
    why: 'Shows cumulative impact of parts',
    whenNot: 'Non-additive metrics, many contributors',
  },
];

export const VisualizationsSection = () => {
  return (
    <section id="visualizations" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 8</span>
      <h2 className="heading-section mb-4">Data Visualization System</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I designed a comprehensive visualization library where each chart answers 
        a specific user question. This section documents the rationale, interactions, 
        and edge cases for each visualization.
      </p>

      {/* Visualization Gallery */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Visualization Gallery</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {visualizations.map((viz) => (
            <div key={viz.id} className="chart-gallery-item">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{viz.name}</span>
                  <span className={`tag ${viz.status === 'implemented' ? 'tag-measured' : 'tag-estimated'}`}>
                    {viz.status === 'implemented' ? 'Implemented' : 'Roadmap'}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{viz.chartType}</span>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-4 h-4 text-info" />
                    <span className="label">User Question</span>
                  </div>
                  <p className="text-sm text-foreground italic">{viz.question}</p>
                </div>

                <div>
                  <span className="label block mb-1">Why This Chart</span>
                  <p className="text-sm text-muted-foreground">{viz.rationale}</p>
                </div>

                <div>
                  <span className="label block mb-1">Interactions</span>
                  <ul className="space-y-1">
                    {viz.interactions.map((interaction, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2" />
                        {interaction}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="label block mb-1">UX Details</span>
                  <p className="text-sm text-muted-foreground">{viz.uxDetails}</p>
                </div>

                <div>
                  <span className="label block mb-1">Accessibility</span>
                  <p className="text-sm text-muted-foreground">{viz.accessibility}</p>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <span className="label block mb-1">Edge Cases</span>
                  <p className="text-sm text-foreground">{viz.edgeCases}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Decision Matrix */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Chart Decision Matrix</h3>
        <div className="overflow-x-auto">
          <table className="table-fintech">
            <thead>
              <tr>
                <th>Insight Needed</th>
                <th>Chart Type</th>
                <th>Why</th>
                <th>When NOT to Use</th>
              </tr>
            </thead>
            <tbody>
              {chartDecisionMatrix.map(({ insight, chart, why, whenNot }) => (
                <tr key={insight}>
                  <td className="font-medium text-foreground">{insight}</td>
                  <td className="text-primary">{chart}</td>
                  <td className="text-muted-foreground">{why}</td>
                  <td className="text-muted-foreground">{whenNot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interaction Standards */}
      <div className="card-highlight">
        <h3 className="heading-subsection mb-6">Chart Interaction Standards</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Tooltip Format</h4>
            <div className="bg-card rounded-lg p-3 border border-border">
              <code className="text-xs font-mono text-muted-foreground">
                <span className="text-foreground">Dec 15, 2024</span><br />
                Value: <span className="text-primary">$87,234.56</span><br />
                Change: <span className="text-success">+2.3%</span>
              </code>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Legend Behavior</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Click: Toggle series visibility</li>
              <li>• Hover: Highlight corresponding data</li>
              <li>• Position: Right or bottom based on space</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Hover Highlight</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Active point: Increased size + glow</li>
              <li>• Other elements: Fade to 50% opacity</li>
              <li>• Crosshair: Vertical line at hover point</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Empty/Loading</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Loading: Skeleton with pulse animation</li>
              <li>• Empty: Message + CTA to add data</li>
              <li>• Error: Retry button + support link</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
