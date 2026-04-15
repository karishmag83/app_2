import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  ChevronDown,
  Copy,
  Check,
  ToggleLeft,
  TextCursorInput,
  RectangleHorizontal,
  Bell,
  Navigation,
  Table,
  Layers,
  MessageSquare,
  Keyboard,
  Info,
} from "lucide-react";

type ComponentDef = {
  name: string;
  category: string;
  status: "Ready" | "In Progress" | "TBD";
  variants: string[];
  states: string[];
  description: string;
  whenToUse: string;
  whenNotToUse: string;
  a11y: string;
};

const componentDefs: ComponentDef[] = [
  {
    name: "Button",
    category: "Inputs",
    status: "TBD",
    variants: ["Primary", "Secondary", "Ghost", "Destructive", "Outline"],
    states: ["Default", "Hover", "Active", "Focus", "Disabled", "Loading"],
    description: "Triggers actions. Supports multiple sizes and variants.",
    whenToUse: "For form submissions, CTAs, or any interactive trigger.",
    whenNotToUse: "For navigation. Use a link instead.",
    a11y: "Use aria-label for icon-only buttons. Ensure 4.5:1 contrast. Support keyboard Enter/Space.",
  },
  {
    name: "Input",
    category: "Inputs",
    status: "TBD",
    variants: ["Text", "Password", "Search", "Number"],
    states: ["Default", "Focus", "Disabled", "Error", "Filled"],
    description: "Single-line text entry with label and helper text support.",
    whenToUse: "For collecting single-line user input.",
    whenNotToUse: "For long-form content. Use Textarea.",
    a11y: "Always pair with a visible label. Use aria-describedby for error messages.",
  },
  {
    name: "Toggle",
    category: "Inputs",
    status: "TBD",
    variants: ["Default", "With Label"],
    states: ["Off", "On", "Disabled"],
    description: "Binary on/off switch for settings.",
    whenToUse: "For immediate-effect settings like dark mode.",
    whenNotToUse: "When the change requires a save action. Use checkbox.",
    a11y: "Use role='switch'. Announce state changes to screen readers.",
  },
  {
    name: "Card",
    category: "Data Display",
    status: "TBD",
    variants: ["Default", "Elevated", "Interactive"],
    states: ["Default", "Hover", "Selected"],
    description: "Container for grouped information with consistent padding.",
    whenToUse: "To group related content in a contained layout.",
    whenNotToUse: "For simple text. Cards add visual weight.",
    a11y: "If interactive, ensure full keyboard navigation and focus ring.",
  },
  {
    name: "Toast",
    category: "Feedback",
    status: "TBD",
    variants: ["Success", "Error", "Info", "Warning"],
    states: ["Entering", "Visible", "Exiting"],
    description: "Brief, non-blocking messages for user feedback.",
    whenToUse: "For success confirmations and non-critical alerts.",
    whenNotToUse: "For errors requiring user action. Use an inline alert.",
    a11y: "Use role='status' or aria-live='polite'. Auto-dismiss after 5s with close option.",
  },
  {
    name: "Navigation Bar",
    category: "Navigation",
    status: "TBD",
    variants: ["Top Bar", "Bottom Tab"],
    states: ["Default", "Active", "Hover"],
    description: "Primary navigation for app-level routing.",
    whenToUse: "As the main structural navigation element.",
    whenNotToUse: "Inside content areas. Use tabs or breadcrumbs.",
    a11y: "Use nav landmark. Mark current page with aria-current='page'.",
  },
  {
    name: "Modal",
    category: "Overlays",
    status: "TBD",
    variants: ["Default", "Full Screen", "Drawer"],
    states: ["Closed", "Open", "Loading"],
    description: "Overlay dialog for focused tasks or confirmations.",
    whenToUse: "For tasks that require focus without leaving context.",
    whenNotToUse: "For content that users need to reference. Use inline.",
    a11y: "Trap focus inside modal. Return focus on close. Support Escape to dismiss.",
  },
  {
    name: "Table",
    category: "Data Display",
    status: "TBD",
    variants: ["Default", "Striped", "Compact"],
    states: ["Default", "Loading", "Empty"],
    description: "Structured data in rows and columns with sorting support.",
    whenToUse: "For displaying tabular data that users compare or scan.",
    whenNotToUse: "For layout. Tables are for data only.",
    a11y: "Use proper th/td semantics. Add scope attributes. Support keyboard navigation.",
  },
];

const categories = ["All", ...Array.from(new Set(componentDefs.map((c) => c.category)))];
const statusIcons = { Ready: "bg-success/20 text-success", "In Progress": "bg-info/20 text-info", TBD: "bg-primary/10 text-primary" };

const catIcons: Record<string, React.ReactNode> = {
  Inputs: <TextCursorInput size={14} />,
  "Data Display": <Table size={14} />,
  Feedback: <Bell size={14} />,
  Navigation: <Navigation size={14} />,
  Overlays: <Layers size={14} />,
};

export default function ComponentsLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filtered = componentDefs.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <section id="components" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Components
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Component Library
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10">
            Interactive catalog of all components. TBD: Actual variants and visuals from Figma.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters */}
          <div className="md:w-56 shrink-0 space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm"
              />
            </div>

            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat !== "All" && catIcons[cat]}
                  {cat}
                  <span className="ml-auto text-xs opacity-60">
                    {cat === "All"
                      ? componentDefs.length
                      : componentDefs.filter((c) => c.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Component cards */}
          <div className="flex-1 space-y-3">
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">No components found.</p>
            )}
            {filtered.map((comp) => (
              <ComponentCard
                key={comp.name}
                comp={comp}
                expanded={expanded === comp.name}
                onToggle={() => setExpanded(expanded === comp.name ? null : comp.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComponentCard({
  comp,
  expanded,
  onToggle,
}: {
  comp: ComponentDef;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [copiedToken, setCopiedToken] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(`<${comp.name} variant="default" />`);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 1500);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-display font-semibold text-sm">{comp.name}</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusIcons[comp.status]}`}
          >
            {comp.status}
          </span>
          <span className="text-[10px] text-muted-foreground">{comp.category}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 pb-5 space-y-5"
        >
          <p className="text-sm text-muted-foreground">{comp.description}</p>

          {/* Variants */}
          <div>
            <h5 className="text-xs font-display font-semibold mb-2">Variants</h5>
            <div className="flex flex-wrap gap-2">
              {comp.variants.map((v) => (
                <span key={v} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* States */}
          <div>
            <h5 className="text-xs font-display font-semibold mb-2">States</h5>
            <div className="flex flex-wrap gap-2">
              {comp.states.map((s) => (
                <span key={s} className="px-2 py-1 rounded border border-border text-[10px] text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-success/5 border border-success/20">
              <p className="text-[10px] font-display font-semibold text-success mb-1">When to use</p>
              <p className="text-xs text-muted-foreground">{comp.whenToUse}</p>
            </div>
            <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <p className="text-[10px] font-display font-semibold text-destructive mb-1">When not to use</p>
              <p className="text-xs text-muted-foreground">{comp.whenNotToUse}</p>
            </div>
          </div>

          {/* Accessibility */}
          <div className="p-3 rounded-lg bg-info/5 border border-info/20">
            <p className="text-[10px] font-display font-semibold text-info mb-1 flex items-center gap-1">
              <Keyboard size={12} /> Accessibility
            </p>
            <p className="text-xs text-muted-foreground">{comp.a11y}</p>
          </div>

          {/* Copy */}
          <button
            onClick={copyToken}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium hover:bg-border transition-colors"
          >
            {copiedToken ? <Check size={12} className="text-success" /> : <Copy size={12} />}
            Copy component usage
          </button>
        </motion.div>
      )}
    </div>
  );
}
