import { ExternalLink, LayoutDashboard, Wallet, Eye, Settings } from 'lucide-react';
import landingScreenshot from '@/assets/lovable-screenshots/landing-page.png';
import dashboardScreenshot from '@/assets/lovable-screenshots/dashboard.png';
import holdingsScreenshot from '@/assets/lovable-screenshots/holdings.png';
import watchlistScreenshot from '@/assets/lovable-screenshots/watchlist.png';
import settingsScreenshot from '@/assets/lovable-screenshots/settings.png';

const screens = [
  {
    route: '/',
    name: 'Landing Page',
    icon: ExternalLink,
    description: 'Marketing homepage with value proposition, feature highlights, and demo CTA. Displays aggregate portfolio stats.',
    screenshot: landingScreenshot,
  },
  {
    route: '/dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Primary analytics view with KPI cards, portfolio value chart (90 days), allocation donut, top movers, and gain/loss bar chart.',
    screenshot: dashboardScreenshot,
  },
  {
    route: '/holdings',
    name: 'Holdings',
    icon: Wallet,
    description: 'Detailed holdings table with symbol, quantity, average cost, current price, value, daily change, and total gain/loss. Includes search and type filtering.',
    screenshot: holdingsScreenshot,
  },
  {
    route: '/watchlist',
    name: 'Watchlist',
    icon: Eye,
    description: 'Track stocks of interest with live price updates and daily change indicators. Add/remove functionality.',
    screenshot: watchlistScreenshot,
  },
  {
    route: '/settings',
    name: 'Settings',
    icon: Settings,
    description: 'App configuration including theme, auto-refresh interval, notifications, and data management (demo data, clear data).',
    screenshot: settingsScreenshot,
  },
];

export const WalkthroughSection = () => {
  return (
    <section id="walkthrough" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 0</span>
      <h2 className="heading-section mb-4">Product Walkthrough</h2>
      <p className="body-large mb-8 max-w-2xl">
        Before diving into the case study, here is a summary of the screens I discovered 
        by crawling the live application.
      </p>

      {/* What the app does */}
      <div className="card-highlight mb-12">
        <h3 className="heading-subsection mb-4">What Folio Does</h3>
        <p className="body-regular">
          Folio is a portfolio tracking web application that consolidates investment 
          holdings across stocks, ETFs, and crypto into a single dashboard. Users can 
          monitor real-time prices, visualize asset allocation, track performance over 
          time, and identify top-performing or underperforming positions—all without 
          switching between broker apps.
        </p>
      </div>

      {/* Screens discovered */}
      <div className="mb-12">
        <h3 className="heading-subsection mb-6">Screens Discovered</h3>
        <div className="grid gap-4">
          {screens.map(({ route, name, icon: Icon, description }) => (
            <div key={route} className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-foreground">{name}</span>
                  <code className="text-xs bg-secondary px-2 py-0.5 rounded text-muted-foreground font-mono">
                    {route}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshot Montage */}
      <div>
        <h3 className="heading-subsection mb-6">Screenshot Montage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screens.map(({ name, screenshot }) => (
            <div key={name} className="screenshot-container">
              <img 
                src={screenshot} 
                alt={`${name} screen from Folio Portfolio Tracker`}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <span className="text-sm text-white font-medium">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
