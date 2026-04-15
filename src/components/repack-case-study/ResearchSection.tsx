import { Check, X } from "lucide-react";

const ResearchSection = () => {
  const competitors = [
    { name: "Amazon", pros: "Easy process, QR codes", cons: "Limited customization" },
    { name: "Zappos", pros: "Free returns, 365 days", cons: "Slow refunds" },
    { name: "Apple", pros: "In-store option", cons: "Complex online flow" },
    { name: "Nordstrom", pros: "No questions asked", cons: "No tracking" },
  ];

  return (
    <section className="repack-section py-24 px-6" style={{ background: `var(--repack-section-gradient)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="repack-section-tag mb-4">02 — Research & Discovery</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-16" style={{ fontFamily: `var(--repack-font-display)` }}>
          Understanding User Needs
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* User Interviews */}
          <div>
            <h4 className="font-semibold text-lg mb-4">User Interviews</h4>
            <p className="mb-6 leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
              We conducted 12 in-depth interviews with users who had recently attempted returns. Each session lasted 45 minutes and covered their end-to-end experience.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(--repack-stat-highlight))` }} />
                <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>5 users who successfully completed returns</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(--repack-stat-highlight))` }} />
                <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>4 users who abandoned the process</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(--repack-stat-highlight))` }} />
                <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>3 users who contacted support for help</span>
              </li>
            </ul>
          </div>

          {/* Journey Mapping */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Journey Mapping</h4>
            <p className="mb-6 leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
              We mapped the current user journey and identified 7 friction points where users experienced confusion or frustration.
            </p>
            <div className="flex justify-between items-center">
              {["Find", "Select", "Drop-off", "Ship", "Done"].map((step, i) => (
                <div key={step} className="repack-journey-step">
                  <div className="repack-journey-step-number">{i + 1}</div>
                  <span className="text-xs" style={{ color: `hsl(var(--repack-muted-foreground))` }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Analysis */}
        <div className="mb-16">
          <h4 className="font-semibold text-lg mb-6">Competitive Analysis</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitors.map((comp) => (
              <div key={comp.name} className="repack-case-study-card">
                <h5 className="font-semibold mb-3">{comp.name}</h5>
                <div className="flex items-start gap-2 mb-2 text-sm">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: `hsl(120 100% 50%)` }} />
                  <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>{comp.pros}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: `hsl(0 100% 50%)` }} />
                  <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>{comp.cons}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div className="repack-case-study-card" style={{ borderLeftWidth: `4px`, borderLeftColor: `hsl(var(--repack-stat-highlight))` }}>
          <div className="text-xs uppercase tracking-wider font-medium mb-2" style={{ color: `hsl(var(--repack-stat-highlight))` }}>
            Key Insight
          </div>
          <p className="leading-relaxed" style={{ color: `hsl(var(--repack-foreground))` }}>
            68% of users abandoned returns at step 3 of the old flow—the point where they needed to choose a return method. The lack of clear guidance and multiple options without context created decision paralysis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
