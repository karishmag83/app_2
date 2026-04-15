import { motion } from "framer-motion";
import { ArrowRight, Figma, Layers, Palette } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding pt-32">
      {/* Decorative accent */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-primary/8 blur-2xl pointer-events-none" />

      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground mb-8">
              <Layers size={14} className="text-primary" />
              Portfolio Case Study
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.95] mb-6"
          >
            Design
            <br />
            <span className="text-gradient-accent">System</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-4 leading-relaxed"
          >
            A scalable, token-driven design system built for consistency, speed,
            and accessible digital experiences.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-10"
          >
            <span className="px-3 py-1 rounded-md bg-card border border-border">
              Karishma Dilip Gawali
            </span>
            <span className="px-3 py-1 rounded-md bg-card border border-border">
              Figma
            </span>
            <span className="px-3 py-1 rounded-md bg-card border border-border">
              Design Tokens
            </span>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://www.figma.com/design/h566EQxtruCFwnYsd9Vjrp/Design-System---Karishma-Dilip-Gawali"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-display font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Figma size={16} />
              Open in Figma
            </a>
            <button
              onClick={() => scrollTo("components")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-medium text-sm hover:opacity-90 transition-opacity shadow-glow"
            >
              <Layers size={16} />
              Explore Components
            </button>
            <button
              onClick={() => scrollTo("foundations")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-display font-medium text-sm hover:bg-muted transition-colors"
            >
              <Palette size={16} />
              Token Playground
            </button>
          </motion.div>
        </div>

        {/* "What it solves" strip */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {[
            { label: "Consistency", desc: "Unified visual language" },
            { label: "Speed", desc: "Faster design to dev" },
            { label: "Scalability", desc: "Grows with the product" },
            { label: "Accessibility", desc: "WCAG-aware defaults" },
            { label: "Handoff", desc: "Clear dev documentation" },
          ].map((item) => (
            <div
              key={item.label}
              className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all cursor-default"
            >
              <p className="font-display font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
