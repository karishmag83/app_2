import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Bug, Layers, BarChart3 } from "lucide-react";

const outcomes = [
  {
    icon: Layers,
    title: "Reduced Inconsistency",
    desc: "A single source of truth eliminated duplicate patterns and conflicting implementations.",
  },
  {
    icon: Clock,
    title: "Faster Design Decisions",
    desc: "Predefined tokens and components reduced decision fatigue and sped up design iterations.",
  },
  {
    icon: TrendingUp,
    title: "Smoother Dev Handoff",
    desc: "Clear documentation, token mapping, and annotated specs reduced back-and-forth by design.",
  },
  {
    icon: Bug,
    title: "Fewer Visual Defects",
    desc: "Consistent use of tokens and states reduced UI bugs caught in QA.",
  },
];

const framework = [
  { metric: "Time-to-Design", how: "Measure time from ticket to design-ready spec before and after system adoption." },
  { metric: "Defect Rate", how: "Track UI-related bugs per sprint. Compare pre- and post-system adoption." },
  { metric: "Consistency Audits", how: "Periodic visual audits scoring adherence to the design system." },
  { metric: "Adoption Rate", how: "Percentage of new features using system components vs. custom builds." },
];

export default function ImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="impact" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Outcomes & Measurement
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10">
            Before/After metrics and Team Feedback
          </p>
        </motion.div>

        {/* Outcomes */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {outcomes.map((o) => (
            <div
              key={o.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all"
            >
              <o.icon size={22} className="mb-3 text-primary" />
              <h4 className="font-display font-semibold text-sm mb-2">{o.title}</h4>
              <p className="text-sm text-muted-foreground">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Measurement Framework */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h4 className="font-display font-semibold text-base mb-6 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" />
            How to Measure Impact
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {framework.map((f) => (
              <div key={f.metric} className="p-4 rounded-lg bg-muted/50">
                <p className="font-display font-semibold text-xs mb-1">{f.metric}</p>
                <p className="text-xs text-muted-foreground">{f.how}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
