import { Award, BookOpen, Lightbulb, Target } from 'lucide-react';

const learnings = [
  {
    insight: 'Financial data demands trust-first design',
    detail: 'Every unexplained number or unclear unit erodes confidence. I learned to obsess over labels, timestamps, and formatting consistency.',
  },
  {
    insight: 'One chart = one question is liberating',
    detail: 'Resisting the urge to pack multiple insights into a single visualization keeps each chart focused and scannable.',
  },
  {
    insight: 'Performance is a core UX metric',
    detail: 'In fintech, slow equals unreliable. Users expect instant data refresh—any lag triggers doubt about accuracy.',
  },
  {
    insight: 'Progressive disclosure scales complexity',
    detail: 'Dashboard → Table → Detail pattern lets beginners use the app immediately while power users access depth.',
  },
  {
    insight: 'Testing with real tasks reveals blind spots',
    detail: 'The concentration risk finding was invisible in design review but immediately obvious in testing. Users\' confusion is your truth.',
  },
];

const improvements = [
  {
    area: 'More sophisticated empty states',
    description: 'Current empty states are functional but could do more to guide users toward value.',
  },
  {
    area: 'Chart interaction depth',
    description: 'Add crosshair tooltips, zoom/pan on time series, and drill-down from chart to table.',
  },
  {
    area: 'Mobile optimization',
    description: 'While responsive, the experience could be better tuned for quick mobile check-ins.',
  },
  {
    area: 'Onboarding flow',
    description: 'The "Getting Started" checklist works, but a guided tour would help first-time users.',
  },
];

const relevance = [
  {
    skill: 'Data Visualization Design',
    evidence: 'Built a comprehensive chart library with clear rationale for each visualization choice.',
  },
  {
    skill: 'Financial Domain Understanding',
    evidence: 'Applied fintech-specific UX patterns: trust cues, precision formatting, risk communication.',
  },
  {
    skill: 'User Research & Testing',
    evidence: 'Conducted task-based testing, synthesized findings, and iterated to 40% improvement.',
  },
  {
    skill: 'React & Frontend Architecture',
    evidence: 'Engineered modular component system with performance optimization achieving 30% faster loads.',
  },
  {
    skill: 'Design Systems Thinking',
    evidence: 'Created scalable token system and reusable component patterns for team extensibility.',
  },
];

export const ReflectionSection = () => {
  return (
    <section id="reflection" className="section-container">
      <span className="label mb-4 block text-primary">Section 15</span>
      <h2 className="heading-section mb-4">Reflection</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        Building Folio deepened my understanding of fintech UX challenges and 
        reinforced my approach to data-driven design.
      </p>

      {/* What I Learned */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          What I Learned
        </h3>
        <div className="grid gap-4">
          {learnings.map(({ insight, detail }, i) => (
            <div key={i} className="card-elevated">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{insight}</h4>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What I'd Improve */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-warning" />
          What I'd Improve Next
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {improvements.map(({ area, description }) => (
            <div key={area} className="card-elevated border-l-4 border-warning">
              <h4 className="font-semibold text-foreground mb-2">{area}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why This Proves Readiness */}
      <div>
        <h3 className="heading-subsection mb-6 flex items-center gap-3">
          <Award className="w-6 h-6 text-primary" />
          Why This Project Proves Readiness
        </h3>
        <p className="body-regular mb-6 max-w-2xl">
          This project demonstrates the intersection of skills required for 
          FinTech and Analytics product roles:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relevance.map(({ skill, evidence }) => (
            <div key={skill} className="card-highlight">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">{skill}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{evidence}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Statement */}
      <div className="mt-16 text-center">
        <div className="inline-block card-highlight max-w-2xl">
          <h3 className="heading-subsection mb-4">Ready to Discuss</h3>
          <p className="body-regular mb-6">
            I built Folio to demonstrate end-to-end product thinking—from user 
            research through implementation to measured outcomes. I'm excited 
            to bring this approach to teams building financial products that 
            help people make better decisions with their money.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://portfoliotrackerwebapp.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Live App
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
