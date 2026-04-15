import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "personas", label: "Personas" },
  { id: "architecture", label: "Architecture" },
  { id: "wireframes", label: "Wireframes" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "product", label: "Final Product" },
  { id: "testing", label: "Testing" },
  { id: "results", label: "Results" },
];

const ScrollProgress = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [checkpointProgressMap, setCheckpointProgressMap] = useState<Array<{ index: number; visualPercent: number }>>([]);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // Show progress bar after scrolling past hero
      setIsVisible(window.scrollY > 300);
      
      // Show labels while scrolling
      setShowLabels(true);
      
      // Hide labels after scrolling stops (1 second delay)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isHovering) {
          setShowLabels(false);
        }
      }, 1000);

      // Calculate overall scroll progress
      const scrollTop = window.scrollY;

      // Find active section based on scroll position
      const sectionElements = sections.map((s, index) => ({
        id: s.id,
        index,
        element: document.getElementById(s.id),
        absolutePosition: 0,
      }));

      // Calculate each section's absolute position in the document
      const sectionsWithPositions = sectionElements.map((section) => {
        if (section.element) {
          // Get the absolute scroll position where this section starts
          const absolutePosition = section.element.getBoundingClientRect().top + scrollTop;
          return { ...section, absolutePosition };
        }
        return section;
      });

      // Find which section we're currently at based on scrollTop
      let activeSectionIndex = 0;
      for (let i = sectionsWithPositions.length - 1; i >= 0; i--) {
        if (scrollTop >= sectionsWithPositions[i].absolutePosition) {
          activeSectionIndex = sectionsWithPositions[i].index;
          break;
        }
      }
      setActiveSection(activeSectionIndex);

      // Calculate checkpoint positions - equally spaced visually
      const checkpointPositions = sectionsWithPositions.map((section, index) => ({
        index: section.index,
        position: section.absolutePosition,
        height: sectionsWithPositions[index + 1]?.absolutePosition - section.absolutePosition || 1000, // Estimate for last section
      }));

      // Checkpoints are visually equally spaced
      const equallySpacedCheckpoints = sections.map((_, index) => ({
        index,
        visualPercent: (index / sections.length) * 100,
      }));
      setCheckpointProgressMap(equallySpacedCheckpoints);

      // Progress bar interpolates between checkpoints as you read through sections
      const currentCheckpointVisual = equallySpacedCheckpoints[activeSectionIndex]?.visualPercent || 0;
      const nextCheckpointVisual = equallySpacedCheckpoints[activeSectionIndex + 1]?.visualPercent || 100;
      
      let targetProgress = currentCheckpointVisual;
      
      // If not at the last section, interpolate between current and next checkpoint
      if (activeSectionIndex < sections.length - 1) {
        const currentSectionPos = checkpointPositions[activeSectionIndex];
        const nextSectionPos = checkpointPositions[activeSectionIndex + 1];
        
        if (currentSectionPos && nextSectionPos) {
          const sectionHeight = nextSectionPos.position - currentSectionPos.position;
          const scrollInSection = Math.max(0, scrollTop - currentSectionPos.position);
          const sectionProgress = Math.min(1, scrollInSection / sectionHeight);
          
          // Interpolate between current and next checkpoint visual positions
          targetProgress = currentCheckpointVisual + (nextCheckpointVisual - currentCheckpointVisual) * sectionProgress;
        }
      } else {
        // At last section, set to 100%
        targetProgress = 100;
      }

      setScrollProgress(targetProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isHovering]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      onMouseEnter={() => {
        setIsHovering(true);
        setShowLabels(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowLabels(false);
      }}
    >
      <div className="relative">
        {/* Background track */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border/40" />
        
        {/* Progress indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary origin-top"
          style={{
            height: `${scrollProgress}%`,
            maxHeight: "100%",
          }}
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Section checkpoints */}
        <div className="relative" style={{ height: "500px" }}>
          {sections.map((section, index) => {
            const isActive = activeSection === index;
            const isPassed = activeSection > index;
            const checkpointPos = checkpointProgressMap[index];
            const positionPercent = checkpointPos?.visualPercent ?? (index / sections.length) * 100;
            
            return (
              <div
                key={section.id}
                className="absolute left-1/2 -translate-x-1/2 w-full flex items-center justify-center gap-4 group cursor-pointer"
                style={{ top: `${positionPercent}%`, transform: "translateX(-50%) translateY(-50%)" }}
                onClick={() => scrollToSection(section.id)}
              >
                {/* Section label - visible when scrolling or hovering */}
                <motion.div
                  className="absolute right-full mr-4 whitespace-nowrap"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: showLabels ? 1 : 0,
                    x: showLabels ? 0 : 10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-card/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-card border border-border transition-all group-hover:shadow-elevated">
                    <span className={`text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                    }`}>
                      {section.label}
                    </span>
                  </div>
                </motion.div>

                {/* Checkpoint dot - centered on track */}
                <motion.div
                  className={`relative z-10 flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? "w-4 h-4"
                      : isPassed
                      ? "w-3 h-3"
                      : "w-2.5 h-2.5"
                  }`}
                  animate={{
                    scale: isActive ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isActive ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full border-2 transition-all ${
                      isActive
                        ? "bg-primary border-primary shadow-lg shadow-primary/50"
                        : isPassed
                        ? "bg-primary/70 border-primary/70"
                        : "bg-background border-border group-hover:border-primary/50 group-hover:bg-primary/20"
                    }`}
                  />
                  
                  {/* Active section pulse */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{
                        scale: 2,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
