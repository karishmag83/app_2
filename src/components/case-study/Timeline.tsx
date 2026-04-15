import { useState } from 'react';
import { Check, Circle } from 'lucide-react';

interface TimelinePhase {
  id: string;
  title: string;
  weeks: string;
  deliverables: string[];
  description: string;
}

const phases: TimelinePhase[] = [
  {
    id: 'discovery',
    title: 'Discovery & Strategy',
    weeks: 'Weeks 1–2',
    deliverables: ['Stakeholder interviews', 'Competitive analysis', 'Content audit', 'Design principles'],
    description: 'Deep dive into stakeholder goals, competitor landscape, and defining the emotional tone for a sensitive healthcare topic.',
  },
  {
    id: 'architecture',
    title: 'IA & Wireframes',
    weeks: 'Weeks 3–5',
    deliverables: ['Sitemap', 'User flows', 'Low-fi wireframes', 'Content strategy'],
    description: 'Mapped information architecture to reduce cognitive load. Iterated on wireframes with stakeholder feedback loops.',
  },
  {
    id: 'build',
    title: 'Design & Build',
    weeks: 'Weeks 6–10',
    deliverables: ['UI design', 'Wix development', 'Content integration', 'Form setup'],
    description: 'Translated wireframes into a polished Wix site with modular sections, responsive layouts, and client-editable content areas.',
  },
  {
    id: 'launch',
    title: 'QA & Launch',
    weeks: 'Weeks 11–16',
    deliverables: ['Cross-browser testing', 'Accessibility audit', 'SEO optimization', 'Domain setup', 'Launch'],
    description: 'Thorough QA across devices, accessibility fixes, GoDaddy domain connection, and coordinated launch with the client.',
  },
];

export const Timeline = () => {
  const [activePhase, setActivePhase] = useState(phases[0].id);

  const getPhaseIndex = (id: string) => phases.findIndex((p) => p.id === id);
  const activeIndex = getPhaseIndex(activePhase);

  return (
    <div className="space-y-8">
      {/* Phase selector - horizontal on desktop */}
      <div className="hidden md:flex justify-between items-center relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(activeIndex / (phases.length - 1)) * 100}%` }}
        />

        {phases.map((phase, index) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={`
              relative z-10 flex flex-col items-center gap-2 transition-all duration-300
              ${index <= activeIndex ? 'opacity-100' : 'opacity-60'}
            `}
          >
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${index < activeIndex 
                  ? 'bg-accent text-accent-foreground' 
                  : index === activeIndex 
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                    : 'bg-muted text-muted-foreground'}
              `}
            >
              {index < activeIndex ? <Check size={18} /> : <Circle size={18} />}
            </div>
            <span className={`text-sm font-medium ${index === activeIndex ? 'text-primary' : 'text-muted-foreground'}`}>
              {phase.weeks}
            </span>
          </button>
        ))}
      </div>

      {/* Phase details */}
      <div className="card-elevated p-6 animate-fade-in" key={activePhase}>
        <h4 className="text-xl font-semibold text-foreground mb-2">
          {phases[activeIndex].title}
        </h4>
        <p className="text-muted-foreground mb-4">
          {phases[activeIndex].description}
        </p>
        <div className="flex flex-wrap gap-2">
          {phases[activeIndex].deliverables.map((deliverable) => (
            <span key={deliverable} className="chip-accent text-xs">
              {deliverable}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden space-y-0">
        {phases.map((phase, index) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={`timeline-step w-full text-left ${
              index < activeIndex ? 'completed' : index === activeIndex ? 'active' : ''
            }`}
          >
            <div className="space-y-1">
              <span className="text-xs font-medium text-accent">{phase.weeks}</span>
              <h4 className={`font-medium ${phase.id === activePhase ? 'text-primary' : 'text-foreground'}`}>
                {phase.title}
              </h4>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
