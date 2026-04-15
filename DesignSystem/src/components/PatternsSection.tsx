import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, AlertTriangle, Inbox, LayoutDashboard, Info } from "lucide-react";

const patterns = [
  {
    icon: FileText,
    title: "Form Patterns",
    desc: "Validation, inline errors, progressive disclosure, multi-step wizards.",
    rationale: "Reducing cognitive load while ensuring data integrity.",
  },
  {
    icon: Inbox,
    title: "Empty States",
    desc: "First-use, no results, error recovery states with helpful guidance.",
    rationale: "Users should always know what to do next, even when there is no data.",
  },
  {
    icon: AlertTriangle,
    title: "Error States",
    desc: "Inline errors, toast alerts, full-page error screens, retry patterns.",
    rationale: "Errors should be helpful, not hostile. Guide users toward resolution.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Layouts",
    desc: "Card grids, stat summaries, charts, and action panels.",
    rationale: "Information hierarchy drives fast decision-making.",
  },
];

export default function PatternsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="patterns" className="section-padding bg-surface-sunken">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Patterns & Templates
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Reusable Patterns
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10">
            Page-level patterns and interaction guidelines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {patterns.map((p) => (
            <div
              key={p.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all"
            >
              <p.icon
                size={24}
                className="mb-4 text-muted-foreground group-hover:text-primary transition-colors"
              />
              <h4 className="font-display font-semibold text-base mb-2">{p.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-[10px] font-display font-semibold text-primary mb-1 flex items-center gap-1">
                  <Info size={10} /> Decision Rationale
                </p>
                <p className="text-xs text-muted-foreground">{p.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
