import { Brain, Leaf } from "lucide-react";

const ReflectionSection = () => {
  return (
    <section className="repack-section py-24 px-6" style={{ background: `var(--repack-section-gradient)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="repack-section-tag mb-4">06 — Reflection & Next Steps</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-16" style={{ fontFamily: `var(--repack-font-display)` }}>
          Looking Forward
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* What Worked Well */}
          <div>
            <h4 className="font-semibold text-lg mb-6">What Worked Well</h4>
            <ul className="space-y-3">
              {[
                "Early stakeholder alignment prevented scope creep",
                "Weekly user testing kept us grounded in real needs",
                "Cross-functional collaboration accelerated decision-making",
                "Progressive disclosure kept the interface clean",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: `hsl(120 100% 50%)` }} />
                  <span className="leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What I'd Do Differently */}
          <div>
            <h4 className="font-semibold text-lg mb-6">What I'd Do Differently</h4>
            <ul className="space-y-3">
              {[
                "Start with more extreme prototypes to test boundaries",
                "Include more edge cases in the initial research",
                "Build accessibility considerations earlier in the process",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: `hsl(45 100% 50%)` }} />
                  <span className="leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Iteration Plans */}
        <div>
          <h4 className="font-semibold text-lg mb-6">Next Iteration Plans</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="repack-case-study-card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `hsl(var(--repack-accent) / 0.2)` }}>
                <Brain className="w-6 h-6" style={{ color: `hsl(var(--repack-stat-highlight))` }} />
              </div>
              <h5 className="font-semibold mb-2">AI-Powered Return Reasons</h5>
              <p className="text-sm leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
                Machine learning to predict return reasons and suggest alternatives before shipping.
              </p>
            </div>
            <div className="repack-case-study-card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `hsl(var(--repack-accent) / 0.2)` }}>
                <Leaf className="w-6 h-6" style={{ color: `hsl(var(--repack-stat-highlight))` }} />
              </div>
              <h5 className="font-semibold mb-2">Carbon-Neutral Returns</h5>
              <p className="text-sm leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
                Partner with carriers to offset carbon emissions and provide eco-friendly options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;
