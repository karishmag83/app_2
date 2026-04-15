const ChallengeSection = () => {
  return (
    <section className="repack-section py-24 px-6" style={{ background: `var(--repack-section-gradient)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Challenge */}
          <div className="repack-case-study-card">
            <h3 className="text-lg font-medium mb-4" style={{ color: `hsl(var(--repack-muted-foreground))` }}>The Challenge</h3>
            <p className="leading-relaxed" style={{ color: `hsl(var(--repack-foreground))` }}>
              E-commerce returns were confusing and time-consuming. Users abandoned returns due to complex workflows, unclear instructions, and lack of transparency.
            </p>
          </div>

          {/* Solution */}
          <div className="repack-case-study-card">
            <h3 className="text-lg font-medium mb-4" style={{ color: `hsl(var(--repack-muted-foreground))` }}>The Solution</h3>
            <p className="leading-relaxed" style={{ color: `hsl(var(--repack-foreground))` }}>
              A guided, step-by-step return experience with real-time tracking, automated label generation, and proactive communication.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="repack-stat-value">-40%</div>
            <div className="repack-stat-label">Support Tickets</div>
          </div>
          <div>
            <div className="repack-stat-value">+35%</div>
            <div className="repack-stat-label">User Satisfaction</div>
          </div>
          <div>
            <div className="repack-stat-value">94%</div>
            <div className="repack-stat-label">Task Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
