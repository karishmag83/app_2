import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "overview", label: "Overview" },
  { id: "foundations", label: "Foundations" },
  { id: "components", label: "Components" },
  { id: "patterns", label: "Patterns" },
  { id: "governance", label: "Governance" },
  { id: "testing", label: "Testing" },
  { id: "impact", label: "Impact" },
];

export default function StickyNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el?.offsetTop ?? 0 };
      });
      const current = offsets.reverse().find((s) => window.scrollY >= s.top - 120);
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-2"
        >
          <span
            className={`text-[10px] font-display font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
              active === id ? "!opacity-100 !translate-x-0 text-primary" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
          <div className="relative flex items-center justify-center w-3 h-6">
            {active === id && (
              <motion.div
                layoutId="nav-dot"
                className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-glow"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {active !== id && (
              <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-muted-foreground transition-colors" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
