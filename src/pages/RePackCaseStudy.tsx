import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "@/components/repack-case-study/repack-styles.css";
import HeroSection from "@/components/repack-case-study/HeroSection";
import ChallengeSection from "@/components/repack-case-study/ChallengeSection";
import ProblemSection from "@/components/repack-case-study/ProblemSection";
import ResearchSection from "@/components/repack-case-study/ResearchSection";
import DesignProcessSection from "@/components/repack-case-study/DesignProcessSection";
import SolutionSection from "@/components/repack-case-study/SolutionSection";
import ResultsSection from "@/components/repack-case-study/ResultsSection";
import ReflectionSection from "@/components/repack-case-study/ReflectionSection";
import ScrollProgress from "@/components/repack-case-study/ScrollProgress";
import Footer from "@/components/repack-case-study/Footer";

const RePackCaseStudy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main 
      className="repack-case-study min-h-screen relative" 
      style={{
        '--repack-background': '160 25% 18%',
        '--repack-foreground': '60 20% 95%',
        '--repack-card': '160 22% 22%',
        '--repack-card-foreground': '60 20% 95%',
        '--repack-primary': '45 30% 88%',
        '--repack-primary-foreground': '160 25% 18%',
        '--repack-secondary': '160 20% 28%',
        '--repack-secondary-foreground': '60 20% 95%',
        '--repack-muted': '160 15% 25%',
        '--repack-muted-foreground': '160 10% 65%',
        '--repack-accent': '140 25% 35%',
        '--repack-accent-foreground': '60 20% 95%',
        '--repack-border': '160 15% 30%',
        '--repack-input': '160 15% 30%',
        '--repack-ring': '45 30% 88%',
      } as React.CSSProperties}
    >
      {/* Back to Projects button - top left */}
      <button
        onClick={() => navigate("/")}
        className="absolute left-6 top-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: `hsl(var(--repack-primary))`,
          color: `hsl(var(--repack-primary-foreground))`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.9";
          e.currentTarget.style.transform = "translateX(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <ScrollProgress />
      
      <div id="hero">
        <HeroSection />
      </div>
      <div id="challenge">
        <ChallengeSection />
      </div>
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="research">
        <ResearchSection />
      </div>
      <div id="design-process">
        <DesignProcessSection />
      </div>
      <SolutionSection />
      <div id="results">
        <ResultsSection />
      </div>
      <div id="reflection">
        <ReflectionSection />
      </div>
      
      <Footer />
    </main>
  );
};

export default RePackCaseStudy;
