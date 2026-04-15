import dashboardScreenshot from '@/assets/lovable-screenshots/dashboard.png';
import holdingsScreenshot from '@/assets/lovable-screenshots/holdings.png';
import watchlistScreenshot from '@/assets/lovable-screenshots/watchlist.png';
import settingsScreenshot from '@/assets/lovable-screenshots/settings.png';

const screens = [
  {
    name: 'Dashboard',
    screenshot: dashboardScreenshot,
    purpose: 'Primary command center for portfolio health. Answers "How am I doing?" in 30 seconds.',
    hierarchy: [
      'KPI cards at top—most critical numbers first',
      'Portfolio Value chart dominates center—trend visualization',
      'Top Movers and Allocation side by side—actionable context',
      'Gain/Loss bar chart—performance ranking',
    ],
    interactions: [
      'Chart hover: Tooltips with exact values',
      'Sidebar navigation: Access all views',
      'Getting Started checklist: Onboarding guidance',
    ],
    states: [
      'Default: Loaded with demo data',
      'Loading: Skeleton cards and chart placeholders',
      'Empty: Onboarding prompts to add data',
    ],
    annotations: [
      { position: 'top-left', label: 'KPI Summary', description: 'Scannable in 3 seconds' },
      { position: 'center', label: 'Trend Chart', description: '90-day performance at a glance' },
      { position: 'bottom-left', label: 'Allocation', description: 'Spot concentration risk' },
      { position: 'bottom-right', label: 'Top Performers', description: 'Winners and losers ranked' },
    ],
  },
  {
    name: 'Holdings',
    screenshot: holdingsScreenshot,
    purpose: 'Detailed position management. Answers "What do I own and how is each position doing?"',
    hierarchy: [
      'Summary KPIs at top—aggregate context',
      'Filter bar—narrow by type or search',
      'Data table—all positions with key metrics',
      'Timestamp—data freshness indicator',
    ],
    interactions: [
      'Column sorting: Click headers to sort',
      'Type filter: Dropdown for Stocks/Crypto/ETFs',
      'Search: Real-time text filtering',
    ],
    states: [
      'Default: All holdings displayed',
      'Filtered: Subset based on type or search',
      'Empty: "No holdings match" with clear filter option',
    ],
    annotations: [
      { position: 'top', label: 'Aggregate KPIs', description: 'Total value across all positions' },
      { position: 'top-right', label: 'Filters', description: 'Narrow by type or search' },
      { position: 'center', label: 'Data Table', description: 'Sortable, scannable rows' },
    ],
  },
  {
    name: 'Watchlist',
    screenshot: watchlistScreenshot,
    purpose: 'Track potential investments. Answers "What stocks am I considering?"',
    hierarchy: [
      'Add Symbol button—primary action top right',
      'Card grid—each stock as a glanceable card',
      'Price and change—key info per card',
    ],
    interactions: [
      'Add Symbol: Modal to search and add',
      'Card click: Could navigate to detail (future)',
      'Remove: Delete from watchlist (future)',
    ],
    states: [
      'Default: 4 watchlist items shown',
      'Empty: Prompt to add first symbol',
      'Loading: Skeleton cards',
    ],
    annotations: [
      { position: 'top-right', label: 'Add Action', description: 'Primary CTA prominent' },
      { position: 'center', label: 'Watchlist Cards', description: 'Price and daily change' },
    ],
  },
  {
    name: 'Settings',
    screenshot: settingsScreenshot,
    purpose: 'App configuration and data management. Answers "How do I customize and manage my data?"',
    hierarchy: [
      'API Status—connection indicator at top',
      'Grouped settings—Appearance, Data & Sync, Data Management',
      'Integration TODOs—transparent roadmap',
    ],
    interactions: [
      'Theme toggle: Dark/Light selector',
      'Refresh interval: Dropdown selection',
      'Load Demo Data: Seed sample portfolios',
      'Clear Data: Reset all data (with confirmation)',
    ],
    states: [
      'Default: Current settings displayed',
      'Saving: Loading indicator on controls',
      'Success: Toast notification on save',
    ],
    annotations: [
      { position: 'top', label: 'Status Indicator', description: 'API connection health' },
      { position: 'center', label: 'Grouped Settings', description: 'Logical grouping by function' },
      { position: 'bottom', label: 'Danger Zone', description: 'Destructive actions separated' },
    ],
  },
];

export const ScreensSection = () => {
  return (
    <section id="screens" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 9</span>
      <h2 className="heading-section mb-4">Key Screens Breakdown</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I analyzed each screen's purpose, hierarchy, interactions, and states 
        to ensure cohesive UX across the application.
      </p>

      {/* Screen Breakdowns */}
      <div className="space-y-16">
        {screens.map((screen, index) => (
          <div key={screen.name} className="relative">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <h3 className="heading-subsection">{screen.name} Screen</h3>
            </div>

            {/* Purpose */}
            <div className="card-highlight mb-6">
              <span className="label block mb-2">Purpose</span>
              <p className="text-foreground">{screen.purpose}</p>
            </div>

            {/* Screenshot with annotations */}
            <div className="screenshot-container mb-6 relative">
              <img 
                src={screen.screenshot}
                alt={`${screen.name} screen from Folio Portfolio Tracker showing ${screen.purpose.toLowerCase()}`}
                className="w-full h-auto"
              />
              
              {/* Visual annotation overlay hint */}
              <div className="absolute top-4 right-4 flex gap-2">
                {screen.annotations.map((_, i) => (
                  <span key={i} className="annotation-marker">{i + 1}</span>
                ))}
              </div>
            </div>

            {/* Annotation Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {screen.annotations.map((anno, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="annotation-marker flex-shrink-0">{i + 1}</span>
                  <div>
                    <span className="text-sm font-medium text-foreground">{anno.label}</span>
                    <p className="text-xs text-muted-foreground">{anno.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Hierarchy */}
              <div className="card-elevated">
                <span className="label block mb-3">Visual Hierarchy</span>
                <ol className="space-y-2">
                  {screen.hierarchy.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Interactions */}
              <div className="card-elevated">
                <span className="label block mb-3">Interactions</span>
                <ul className="space-y-2">
                  {screen.interactions.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* States */}
              <div className="card-elevated">
                <span className="label block mb-3">States</span>
                <ul className="space-y-2">
                  {screen.states.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-info mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
