const DesignProcessSection = () => {
  const phases = [
    {
      number: "Phase 1",
      title: "Ideation & Sketching",
      description: "Wireframes, Crazy 8s exercise, and collaborative whiteboard sessions with the team.",
    },
    {
      number: "Phase 2",
      title: "User Flows",
      description: "Mapped the happy path vs. edge cases, ensuring all scenarios were covered.",
    },
    {
      number: "Phase 3",
      title: "Prototyping",
      description: "Built an interactive Figma prototype for early stakeholder feedback.",
    },
    {
      number: "Phase 4",
      title: "Testing & Iteration",
      description: "5 usability tests with real users, iterating based on findings.",
    },
  ];

  return (
    <section className="repack-section py-24 px-6" style={{ background: `var(--repack-section-gradient)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="repack-section-tag mb-4">03 — Design Process</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-16" style={{ fontFamily: `var(--repack-font-display)` }}>
          From Ideas to Validation
        </h2>

        {/* Phases */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 repack-stagger-children">
          {phases.map((phase) => (
            <div key={phase.number} className="repack-phase-card">
              <div className="repack-phase-number">{phase.number}</div>
              <h4 className="font-semibold mb-2">{phase.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Real screenshot from RePack app */}
        <div className="flex flex-col items-center">
          <img 
            src="/repack-app-screenshot.png" 
            alt="RePack Return Portal" 
            className="w-full max-w-2xl rounded-lg shadow-lg" 
            style={{ border: `2px solid hsl(var(--repack-border))` }}
          />
        </div>
      </div>
    </section>
  );
};

export default DesignProcessSection;
