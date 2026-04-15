const ResultsSection = () => {
  const metrics = [
    { label: "Task Success Rate", before: 67, after: 94, unit: "%" },
    { label: "Avg Time (min)", before: 8, after: 2, unit: "", inverted: true },
    { label: "NPS Score", before: 12, after: 52, unit: "" },
    { label: "Error Rate", before: 24, after: 3, unit: "%", inverted: true },
  ];

  const learnings = [
    "Users preferred QR codes over printed labels for environmental reasons",
    "Clear refund timelines reduced support inquiries by 60%",
    "Progress indicators significantly reduced drop-off rates",
    "Auto-save functionality was critical for mobile users who switched between tasks",
  ];

  return (
    <section className="repack-section py-24 px-6" style={{ background: `var(--repack-section-gradient)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="repack-section-tag mb-4">05 — Validation & Results</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: `var(--repack-font-display)` }}>
          Measuring Success
        </h2>

        <p className="text-lg max-w-3xl mb-12 leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
          We conducted moderated usability testing with 8 participants across different demographics. Each session included task completion, think-aloud protocols, and post-task interviews.
        </p>

        {/* Testimonial */}
        <div className="repack-quote-box mb-16">
          <blockquote className="text-xl md:text-2xl font-display italic" style={{ fontFamily: `var(--repack-font-display)`, color: `hsl(var(--repack-foreground))` }}>
            "This is so much simpler! I was able to start my return in under a minute."
          </blockquote>
          <div className="mt-4">
            <div className="font-semibold">Sarah M.</div>
            <div className="text-sm" style={{ color: `hsl(var(--repack-muted-foreground))` }}>Frequent Online Shopper</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-16">
          <h4 className="font-semibold text-lg mb-6">Key Metrics</h4>
          <div className="grid md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="repack-case-study-card">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm" style={{ color: `hsl(var(--repack-muted-foreground))` }}>{metric.label}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>Before: {metric.before}{metric.unit}</span>
                    <span className="font-semibold" style={{ color: `hsl(var(--repack-stat-highlight))` }}>After: {metric.after}{metric.unit}</span>
                  </div>
                </div>
                <div className="repack-metric-bar">
                  <div
                    className="repack-metric-bar-fill"
                    style={{ width: `${metric.after}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Learnings */}
        <div className="repack-case-study-card">
          <h4 className="font-semibold text-lg mb-6">Key Learnings</h4>
          <ul className="space-y-3">
            {learnings.map((learning, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium" style={{ background: `hsl(var(--repack-accent) / 0.3)` }}>
                  {i + 1}
                </span>
                <span style={{ color: `hsl(var(--repack-muted-foreground))` }} className="leading-relaxed">{learning}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
