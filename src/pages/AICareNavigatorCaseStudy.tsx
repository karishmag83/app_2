import { useEffect } from "react";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import ProblemStatement from "@/components/case-study/ProblemStatement";
import UserResearch from "@/components/case-study/UserResearch";
import UserPersonas from "@/components/case-study/UserPersonas";
import InformationArchitecture from "@/components/case-study/InformationArchitecture";
import WireframesSection from "@/components/case-study/WireframesSection";
import DesignProcess from "@/components/case-study/DesignProcess";
import SolutionShowcase from "@/components/case-study/SolutionShowcase";
import LiveProductShowcase from "@/components/case-study/LiveProductShowcase";
import UsabilityTesting from "@/components/case-study/UsabilityTesting";
import Results from "@/components/case-study/Results";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";
import ScrollProgress from "@/components/case-study/ScrollProgress";

const AICareNavigatorCaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-hidden">
      <ScrollProgress />
      <section id="hero">
        <CaseStudyHero />
      </section>
      <section id="problem">
        <ProblemStatement />
      </section>
      <section id="research">
        <UserResearch />
      </section>
      <section id="personas">
        <UserPersonas />
      </section>
      <section id="architecture">
        <InformationArchitecture />
      </section>
      <section id="wireframes">
        <WireframesSection />
      </section>
      <section id="process">
        <DesignProcess />
      </section>
      <section id="solution">
        <SolutionShowcase />
      </section>
      <section id="product">
        <LiveProductShowcase />
      </section>
      <section id="testing">
        <UsabilityTesting />
      </section>
      <section id="results">
        <Results />
      </section>
      <CaseStudyFooter />
    </main>
  );
};

export default AICareNavigatorCaseStudy;
