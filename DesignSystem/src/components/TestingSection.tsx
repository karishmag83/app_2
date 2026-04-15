import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardCheck, Check, Square } from "lucide-react";

const testingChecklist = [
  { category: "Usability", items: [
    "Tested with 5+ users across key flows",
    "Heuristic evaluation completed",
    "Task success rates measured",
  ]},
  { category: "Accessibility", items: [
    "Screen reader tested (VoiceOver + NVDA)",
    "Keyboard navigation verified for all components",
    "Color contrast passes WCAG AA minimum",
    "Focus management tested in modals and drawers",
  ]},
  { category: "Design QA", items: [
    "Pixel-perfect comparison against Figma specs",
    "Token usage verified (no hard-coded values)",
    "Responsive behavior checked at all breakpoints",
    "Visual regression tests baseline created",
  ]},
];

export default function TestingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const total = testingChecklist.reduce((acc, c) => acc + c.items.length, 0);
  const done = checked.size;

  return (
    <section id="testing" className="section-padding bg-surface-sunken">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Testing & Validation
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Quality Assurance
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10">
            A recommended testing plan to ensure quality across all components.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
          <span className="text-sm font-display font-semibold">
            {done}/{total}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testingChecklist.map((cat) => (
            <div key={cat.category} className="p-6 rounded-xl bg-card border border-border">
              <h4 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
                <ClipboardCheck size={16} className="text-primary" />
                {cat.category}
              </h4>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggle(item)}
                    className="flex items-start gap-3 w-full text-left group"
                  >
                    {checked.has(item) ? (
                      <Check size={14} className="mt-0.5 text-success shrink-0" />
                    ) : (
                      <Square size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                    )}
                    <span
                      className={`text-xs transition-colors ${
                        checked.has(item)
                          ? "text-muted-foreground line-through"
                          : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
