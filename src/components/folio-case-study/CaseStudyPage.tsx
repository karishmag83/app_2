import { ArrowLeft, ArrowUp, ArrowUpRight } from 'lucide-react';
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
        {/* Phones get a compact bar: icon back button, stacked title, short live link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/')}
            aria-label="Back to Home"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground sm:h-auto sm:w-auto sm:gap-2 sm:rounded-lg sm:border-0 sm:px-3 sm:py-2 sm:text-sm sm:font-medium"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span className="hidden whitespace-nowrap sm:inline">Back to Home</span>
          </button>
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-primary">F</span>
            </div>
            <div className="flex flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
              <span className="font-semibold text-foreground">Folio</span>
              <span className="whitespace-nowrap text-xs sm:text-sm text-muted-foreground">UX Case Study</span>
            </div>
          </div>
          <a
            href="https://portfoliotrackerwebapp.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full sm:rounded-lg bg-primary px-3.5 py-2 text-[13px] sm:px-4 sm:text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <span className="sm:hidden">Live app</span>
            <span className="hidden sm:inline">View Live App</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:hidden" aria-hidden="true" />
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
