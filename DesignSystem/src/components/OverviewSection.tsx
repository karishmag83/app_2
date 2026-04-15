import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Eye,
  Repeat,
  Puzzle,
  Accessibility,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react";

const principles = [
  { icon: Eye, title: "Clarity", desc: "Every element communicates its purpose clearly." },
  { icon: Repeat, title: "Consistency", desc: "Unified patterns across all touchpoints." },
  { icon: Puzzle, title: "Composability", desc: "Small pieces combine into complex UIs." },
  { icon: Accessibility, title: "Accessibility", desc: "Inclusive by default, WCAG-aware." },
  { icon: Zap, title: "Efficiency", desc: "Reduce redundancy, accelerate delivery." },
  { icon: TrendingUp, title: "Scalability", desc: "Grows gracefully with the product." },
  { icon: Shield, title: "Brand Integrity", desc: "Consistent brand expression everywhere." },
];

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function OverviewSection() {
  return (
    <section id="overview" className="section-padding">
      <div className="container-wide">
        <AnimatedCard>
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Overview
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Why this system exists
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            This design system was created to bring structure, speed, and consistency
            to digital product design. It serves as a single source of truth for
            designers, developers, and product managers working across platforms.
          </p>
        </AnimatedCard>

        {/* Context */}
        <AnimatedCard delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <InfoCard
              label="Context"
              text="Built to support scalable product development with reusable, well-documented components and tokens."
            />
            <InfoCard
              label="Audience"
              text="Designers, front-end developers, product managers, and QA engineers who need a shared language."
            />
            <InfoCard
              label="My Responsibilities"
              text="System architecture, tokenization, component design, documentation, and governance planning."
            />
          </div>
        </AnimatedCard>

        {/* Principles */}
        <AnimatedCard delay={0.2}>
          <h3 className="font-display font-semibold text-xl mb-6">Guiding Principles</h3>
        </AnimatedCard>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {principles.map((p, i) => (
            <AnimatedCard key={p.title} delay={0.1 + i * 0.05}>
              <div className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all text-center">
                <p.icon
                  size={22}
                  className="mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors"
                />
                <p className="font-display font-semibold text-xs mb-1">{p.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{p.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, text, tag }: { label: string; text: string; tag?: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <p className="font-display font-semibold text-sm text-primary mb-2">{label}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      {tag && (
        <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium">
          {tag}
        </span>
      )}
    </div>
  );
}
