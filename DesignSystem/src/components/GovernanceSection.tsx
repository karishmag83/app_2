import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitPullRequest, CheckSquare, Tag, BookOpen } from "lucide-react";

const checklist = [
  "Design spec with all states documented",
  "Variants cover all use cases",
  "Accessibility: keyboard, focus, aria reviewed",
  "Responsive behavior tested at all breakpoints",
  "Token usage verified (no hard-coded values)",
  "Visual regression baseline captured",
  "Content guidelines written",
];

export default function GovernanceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="governance" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Governance
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Contribution & Adoption
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10">
            How the system stays consistent, grows, and is adopted across teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <GovCard
            icon={GitPullRequest}
            title="Request a Component"
            items={[
              "Submit a proposal with use case and context",
              "Include expected variants and states",
              "Review with the system team",
              "Approved components enter the build pipeline",
            ]}
          />
          <GovCard
            icon={Tag}
            title="Naming Conventions"
            items={[
              "Tokens: category/property/modifier (e.g., color/primary/default)",
              "Components: PascalCase, descriptive names",
              "Avoid abbreviations unless universally understood",
              "Version components with semantic numbering",
            ]}
          />
          <GovCard
            icon={BookOpen}
            title="Documentation"
            items={[
              "Every component ships with usage docs",
              "Token tables updated on each release",
              "Changelog maintained per component",
              "Living documentation synced with Figma",
            ]}
          />
        </div>

        {/* Definition of Done Checklist */}
        <div className="p-6 rounded-xl bg-card border border-border max-w-lg">
          <h4 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <CheckSquare size={16} className="text-primary" />
            Definition of Done
          </h4>
          <div className="space-y-2">
            {checklist.map((item) => (
              <label key={item} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-border accent-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GovCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<any>;
  title: string;
  items: string[];
}) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <Icon size={22} className="mb-3 text-primary" />
      <h4 className="font-display font-semibold text-sm mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
