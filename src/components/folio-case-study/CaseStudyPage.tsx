import { ArrowLeft, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StickyNav } from './StickyNav';
import { WalkthroughSection } from './WalkthroughSection';
import { HeroSection } from './HeroSection';
import { ContextSection } from './ContextSection';
import { GoalsSection } from './GoalsSection';
import { UsersSection } from './UsersSection';
import { StrategySection } from './StrategySection';
import { ArchitectureSection } from './ArchitectureSection';
import { DataLayerSection } from './DataLayerSection';
import { VisualizationsSection } from './VisualizationsSection';
import { ScreensSection } from './ScreensSection';
import { ComponentsSection } from './ComponentsSection';
import { PerformanceSection } from './PerformanceSection';
import { TestingSection } from './TestingSection';
import { AccessibilitySection } from './AccessibilitySection';
import { RoadmapSection } from './RoadmapSection';
import { ReflectionSection } from './ReflectionSection';

export const CaseStudyPage = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">F</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Folio</span>
              <span className="text-sm text-muted-foreground ml-2">UX Case Study</span>
            </div>
          </div>
          <a 
            href="https://portfoliotrackerwebapp.lovable.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Live App
          </a>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 flex-shrink-0 px-6 py-8">
          <StickyNav />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <WalkthroughSection />
          <HeroSection />
          <ContextSection />
          <GoalsSection />
          <UsersSection />
          <StrategySection />
          <ArchitectureSection />
          <DataLayerSection />
          <VisualizationsSection />
          <ScreensSection />
          <ComponentsSection />
          <PerformanceSection />
          <TestingSection />
          <AccessibilitySection />
          <RoadmapSection />
          <ReflectionSection />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-sm">
              Folio Portfolio Tracker — UX Case Study
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Built with React.js, Chart.js, and REST API integration
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors mx-auto mt-8"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
          </div>
          <div className="border-t border-border pt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
