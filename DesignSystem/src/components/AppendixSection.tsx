import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen } from "lucide-react";

const glossary = [
  { term: "Design Token", def: "A named value (color, spacing, typography) that represents a design decision." },
  { term: "Variant", def: "An alternative version of a component (e.g., primary vs. secondary button)." },
  { term: "State", def: "A condition of a component (default, hover, disabled, error, etc.)." },
  { term: "Atom", def: "The smallest UI element (icon, label, color swatch). Part of Atomic Design methodology." },
  { term: "Molecule", def: "A group of atoms that form a simple UI unit (e.g., labeled input field)." },
  { term: "Organism", def: "Complex UI sections made of molecules and atoms (e.g., navigation bar, form)." },
  { term: "Composability", def: "The ability to combine smaller components into larger, more complex ones." },
  { term: "RLS", def: "Row Level Security. Database-level access control." },
];

export default function AppendixSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-surface-sunken">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Appendix
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-10">
            Glossary
          </h2>
        </motion.div>

        {/* Glossary */}
        <div className="mb-12">
          <h4 className="font-display font-semibold text-base mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            Glossary
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {glossary.map((g) => (
              <div key={g.term} className="p-4 rounded-xl bg-card border border-border">
                <p className="font-display font-semibold text-sm mb-1">{g.term}</p>
                <p className="text-xs text-muted-foreground">{g.def}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative mt-0 pt-6 border-t border-border text-center">
          <div className="mb-4 flex justify-center">
            <a
              href="#top"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground transition hover:-translate-y-0.5"
            >
              Back to top
            </a>
          </div>
          <p className="font-display font-semibold text-sm mb-1">
            Karishma Dilip Gawali
          </p>
          <p className="text-xs text-muted-foreground">
            Design System Case Study. Built with care and intention.
          </p>
        </div>
      </div>
    </section>
  );
}
