import { Clock, Zap, Target, TrendingUp } from 'lucide-react';
import dashboardScreenshot from '@/assets/lovable-screenshots/dashboard.png';

const impactMetrics = [
  {
    value: '30%',
    label: 'Faster Data Load',
    tag: 'Measured',
    tagType: 'measured' as const,
    icon: Zap,
  },
  {
    value: '40%',
    label: 'Higher Task Success',
    tag: 'Measured',
    tagType: 'measured' as const,
    icon: Target,
  },
  {
    value: '35-50%',
    label: 'Faster Time-to-Insight',
    tag: 'Estimated',
    tagType: 'estimated' as const,
    icon: Clock,
  },
  {
    value: '+0.8-1.2',
    label: 'Confidence Rating Lift',
    tag: 'Estimated',
    tagType: 'estimated' as const,
    icon: TrendingUp,
  },
];

const roleDetails = [
  { label: 'Role', value: 'Product Designer & Frontend Developer' },
  { label: 'Timeline', value: '6 weeks (POC)' },
  { label: 'Tools', value: 'Figma, React.js, Chart.js, REST APIs' },
  { label: 'Type', value: 'Proof of Concept' },
];

export const HeroSection = () => {
  return (
    <section id="hero" className="section-container">
      {/* Header */}
      <div className="mb-12">
        <span className="label mb-4 block text-primary">UX Case Study</span>
        <h1 className="heading-hero mb-6">
          <span className="text-gradient-primary">Folio</span>
          <br />
          Portfolio Tracker
        </h1>
        <p className="body-large max-w-2xl">
          A client-ready financial analytics solution—responsive React.js dashboard 
          with REST API integration and Chart.js visualizations that delivers 
          clarity to complex investment data.
        </p>
      </div>

      {/* Role & Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {roleDetails.map(({ label, value }) => (
          <div key={label} className="card-metric">
            <span className="label block mb-1">{label}</span>
            <span className="text-sm text-foreground font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* Impact Metrics */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Impact & Results</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map(({ value, label, tag, tagType, icon: Icon }) => (
            <div key={label} className="impact-card relative">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className={`tag ${tagType === 'measured' ? 'tag-measured' : 'tag-estimated'}`}>
                    {tag}
                  </span>
                </div>
                <div className="metric-value text-3xl md:text-4xl">{value}</div>
                <div className="metric-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Screenshot with Callouts */}
      <div className="relative">
        <h3 className="heading-subsection mb-6">Dashboard Overview</h3>
        <div className="screenshot-container relative">
          <img 
            src={dashboardScreenshot} 
            alt="Folio Dashboard showing portfolio value chart, allocation donut, top movers list, and gain/loss visualization"
            className="w-full h-auto"
          />
          
          {/* Callout markers */}
          <div className="screenshot-callout top-[15%] left-[35%]" title="Portfolio Value Line Chart">
            1
          </div>
          <div className="screenshot-callout top-[12%] left-[80%]" title="Top Movers Panel">
            2
          </div>
          <div className="screenshot-callout top-[70%] left-[30%]" title="Asset Allocation Donut">
            3
          </div>
          <div className="screenshot-callout top-[70%] left-[75%]" title="Gain/Loss Bar Chart">
            4
          </div>
        </div>
        
        {/* Callout Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-3">
            <span className="annotation-marker">1</span>
            <span className="text-sm text-muted-foreground">Portfolio Value Trend</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="annotation-marker">2</span>
            <span className="text-sm text-muted-foreground">Real-time Top Movers</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="annotation-marker">3</span>
            <span className="text-sm text-muted-foreground">Allocation Breakdown</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="annotation-marker">4</span>
            <span className="text-sm text-muted-foreground">Performance by Holding</span>
          </div>
        </div>
      </div>
    </section>
  );
};
