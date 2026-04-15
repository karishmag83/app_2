import { ArrowRight, LayoutDashboard, Wallet, Eye, Settings, ArrowLeftRight } from 'lucide-react';
import dashboardScreenshot from '@/assets/lovable-screenshots/dashboard.png';
import holdingsScreenshot from '@/assets/lovable-screenshots/holdings.png';

export const ArchitectureSection = () => {
  return (
    <section id="architecture" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 6</span>
      <h2 className="heading-section mb-4">Information Architecture & Flows</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I structured the navigation and user flows based on task frequency and 
        the progressive disclosure principle.
      </p>

      {/* IA Diagram */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Navigation Architecture</h3>
        <div className="diagram-container">
          <div className="flex flex-col items-center gap-8">
            {/* Root */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-primary/20 border border-primary/40 rounded-xl p-4 text-center min-w-[120px]">
                <span className="text-primary font-semibold">Landing</span>
                <p className="text-xs text-muted-foreground mt-1">/</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <ArrowRight className="w-6 h-6 text-primary rotate-90" />
            </div>

            {/* Main Nav */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {[
                { icon: LayoutDashboard, name: 'Dashboard', route: '/dashboard', primary: true },
                { icon: Wallet, name: 'Holdings', route: '/holdings' },
                { icon: ArrowLeftRight, name: 'Transactions', route: '/transactions' },
                { icon: Eye, name: 'Watchlist', route: '/watchlist' },
                { icon: Settings, name: 'Settings', route: '/settings' },
              ].map(({ icon: Icon, name, route, primary }) => (
                <div 
                  key={name}
                  className={`border rounded-xl p-4 text-center min-w-[120px] ${
                    primary 
                      ? 'bg-primary/20 border-primary/40' 
                      : 'bg-card border-border'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${primary ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${primary ? 'text-primary' : 'text-foreground'}`}>{name}</span>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{route}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Flows */}
      <div>
        <h3 className="heading-subsection mb-6">Key User Flows</h3>
        
        {/* Flow 1: Check Portfolio Health */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
            <h4 className="font-semibold text-lg text-foreground">Check Portfolio Health Fast</h4>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { step: 1, action: 'Open App', detail: 'Dashboard loads as default view' },
              { step: 2, action: 'Scan KPI Cards', detail: 'Total Value, Gain/Loss, Daily Change' },
              { step: 3, action: 'Review Trend', detail: 'Portfolio Value chart shows 90-day trend' },
              { step: 4, action: 'Decision', detail: 'All normal → Close / Concern → Investigate' },
            ].map(({ step, action, detail }) => (
              <div key={step} className="flow-step">
                <div className="flow-step-number">{step}</div>
                <div>
                  <span className="font-medium text-foreground block">{action}</span>
                  <span className="text-sm text-muted-foreground">{detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="screenshot-container max-w-3xl">
            <img 
              src={dashboardScreenshot}
              alt="Dashboard showing KPI cards and portfolio value chart for quick health check"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Flow 2: Find Top Contributors */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span>
            <h4 className="font-semibold text-lg text-foreground">Find Top Contributors to Gains/Loss</h4>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { step: 1, action: 'View Gain/Loss Chart', detail: 'Bar chart ranks holdings by performance' },
              { step: 2, action: 'Identify Leader', detail: 'BTC shows largest green bar' },
              { step: 3, action: 'Navigate to Holdings', detail: 'Click sidebar for detailed table' },
              { step: 4, action: 'Analyze Position', detail: 'Review cost basis, gain %, position size' },
            ].map(({ step, action, detail }) => (
              <div key={step} className="flow-step">
                <div className="flow-step-number">{step}</div>
                <div>
                  <span className="font-medium text-foreground block">{action}</span>
                  <span className="text-sm text-muted-foreground">{detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="screenshot-container max-w-3xl">
            <img 
              src={holdingsScreenshot}
              alt="Holdings table showing detailed position data with gain/loss column"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Flow 3: Review Allocation */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</span>
            <h4 className="font-semibold text-lg text-foreground">Review Allocation & Identify Concentration Risk</h4>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { step: 1, action: 'Check Allocation', detail: 'Donut chart shows asset class split' },
              { step: 2, action: 'Spot Imbalance', detail: 'Crypto at 50.4% - high concentration' },
              { step: 3, action: 'Drill into Holdings', detail: 'Sort by Value to see largest positions' },
              { step: 4, action: 'Plan Rebalance', detail: 'Note underweight areas for new investments' },
            ].map(({ step, action, detail }) => (
              <div key={step} className="flow-step">
                <div className="flow-step-number">{step}</div>
                <div>
                  <span className="font-medium text-foreground block">{action}</span>
                  <span className="text-sm text-muted-foreground">{detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="screenshot-container max-w-3xl">
            <img 
              src={dashboardScreenshot}
              alt="Dashboard allocation donut chart highlighting asset class distribution"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
