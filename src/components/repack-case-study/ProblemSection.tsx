import { Layers, Eye, FileQuestion } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="repack-section py-24 px-6" style={{ background: `var(--repack-section-gradient)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="repack-section-tag mb-4">01 — Understanding the Problem</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12" style={{ fontFamily: `var(--repack-font-display)` }}>
          Identifying User Pain Points
        </h2>

        <p className="text-lg max-w-3xl mb-12 leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
          Through extensive user research and stakeholder interviews, we identified that the existing return process was a major source of frustration. Users frequently abandoned returns entirely, leading to decreased customer lifetime value and increased support costs.
        </p>

        {/* Quote */}
        <div className="repack-quote-box mb-16">
          <blockquote className="text-xl md:text-2xl font-display italic" style={{ fontFamily: `var(--repack-font-display)`, color: `hsl(var(--repack-foreground))` }}>
            "I don't know where to start with returns. Every store has different rules."
          </blockquote>
          <cite className="text-sm mt-4 block not-italic" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
            — User Interview, 2024
          </cite>
        </div>

        {/* Pain points */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="repack-case-study-card">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `hsl(var(--repack-accent) / 0.2)` }}>
              <Layers className="w-6 h-6" style={{ color: `hsl(var(--repack-stat-highlight))` }} />
            </div>
            <h4 className="font-semibold mb-2">Fragmented Experience</h4>
            <p className="text-sm leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
              Users had to navigate multiple systems and interfaces just to initiate a simple return request.
            </p>
          </div>

          <div className="repack-case-study-card">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `hsl(var(--repack-accent) / 0.2)` }}>
              <Eye className="w-6 h-6" style={{ color: `hsl(var(--repack-stat-highlight))` }} />
            </div>
            <h4 className="font-semibold mb-2">Lack of Visibility</h4>
            <p className="text-sm leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
              No way to track return status left users anxious about their refunds and package whereabouts.
            </p>
          </div>

          <div className="repack-case-study-card">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `hsl(var(--repack-accent) / 0.2)` }}>
              <FileQuestion className="w-6 h-6" style={{ color: `hsl(var(--repack-stat-highlight))` }} />
            </div>
            <h4 className="font-semibold mb-2">Complex Policies</h4>
            <p className="text-sm leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
              Inconsistent rules across merchants created confusion and increased support calls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
