import StickyNav from "@/components/StickyNav";

import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import FoundationsSection from "@/components/FoundationsSection";
import TokenPlayground from "@/components/TokenPlayground";
import ComponentsLibrary from "@/components/ComponentsLibrary";
import PatternsSection from "@/components/PatternsSection";
import GovernanceSection from "@/components/GovernanceSection";
import TestingSection from "@/components/TestingSection";
import ImpactSection from "@/components/ImpactSection";
import AppendixSection from "@/components/AppendixSection";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <StickyNav />

      <a
        href="/"
        className="fixed left-6 top-6 z-50 inline-flex items-center rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-medium uppercase tracking-wide text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5"
      >
        Back to home
      </a>
      
      <HeroSection />
      <OverviewSection />
      <FoundationsSection />
      <TokenPlayground />
      <ComponentsLibrary />
      <PatternsSection />
      <GovernanceSection />
      <TestingSection />
      <ImpactSection />
      <AppendixSection />
    </div>
  );
};

export default Index;
