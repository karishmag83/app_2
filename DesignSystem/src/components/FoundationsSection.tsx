import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Contrast, Type, Grid3X3, Layers } from "lucide-react";

// Sample placeholder tokens (TBD until Figma is accessible)
const colorTokens = [
  { name: "primary", hsl: "36 90% 50%", hex: "#F5A623" },
  { name: "primary-dark", hsl: "36 90% 40%", hex: "#CC8400" },
  { name: "secondary", hsl: "220 14% 20%", hex: "#2C3039" },
  { name: "background", hsl: "40 33% 97%", hex: "#FAF8F5" },
  { name: "foreground", hsl: "220 20% 12%", hex: "#181C24" },
  { name: "muted", hsl: "40 15% 90%", hex: "#E8E4DF" },
  { name: "success", hsl: "152 60% 40%", hex: "#29A366" },
  { name: "destructive", hsl: "0 72% 51%", hex: "#DE3B40" },
  { name: "info", hsl: "210 80% 55%", hex: "#3B8FDE" },
  { name: "warning", hsl: "36 90% 50%", hex: "#F5A623" },
  { name: "card", hsl: "40 25% 95%", hex: "#F3F0EC" },
  { name: "border", hsl: "40 15% 88%", hex: "#E2DED8" },
];

const typeScale = [
  { name: "Display", size: "48px", weight: "700", font: "Sora" },
  { name: "H1", size: "36px", weight: "700", font: "Sora" },
  { name: "H2", size: "28px", weight: "600", font: "Sora" },
  { name: "H3", size: "22px", weight: "600", font: "Sora" },
  { name: "Body", size: "16px", weight: "400", font: "DM Sans" },
  { name: "Caption", size: "12px", weight: "500", font: "DM Sans" },
];

const spacingScale = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default function FoundationsSection() {
  const [activeTab, setActiveTab] = useState<"color" | "type" | "spacing" | "elevation">("color");

  const tabs = [
    { id: "color" as const, label: "Color", icon: Contrast },
    { id: "type" as const, label: "Typography", icon: Type },
    { id: "spacing" as const, label: "Spacing & Layout", icon: Grid3X3 },
    { id: "elevation" as const, label: "Elevation & Radius", icon: Layers },
  ];

  return (
    <section id="foundations" className="section-padding bg-surface-sunken">
      <div className="container-wide">
        <AnimatedSection>
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Foundations
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Design Tokens & Primitives
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10">
            The building blocks of every component.
          </p>
        </AnimatedSection>

        {/* Tab bar */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-medium whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "color" && <ColorPanel />}
        {activeTab === "type" && <TypePanel />}
        {activeTab === "spacing" && <SpacingPanel />}
        {activeTab === "elevation" && <ElevationPanel />}
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      title="Copy"
    >
      {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
    </button>
  );
}

function ColorPanel() {
  const [fg, setFg] = useState("#181C24");
  const [bg, setBg] = useState("#FAF8F5");

  const getContrastRatio = (hex1: string, hex2: string) => {
    const lum = (hex: string) => {
      const rgb = [1, 3, 5].map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    };
    const l1 = Math.max(lum(hex1), lum(hex2));
    const l2 = Math.min(lum(hex1), lum(hex2));
    return ((l1 + 0.05) / (l2 + 0.05)).toFixed(2);
  };

  const ratio = parseFloat(getContrastRatio(fg, bg));
  const passAA = ratio >= 4.5;
  const passAAA = ratio >= 7;

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-12">
        {colorTokens.map((c) => (
          <div
            key={c.name}
            className="group p-3 rounded-xl bg-card border border-border hover:shadow-card transition-all"
          >
            <div
              className="w-full aspect-square rounded-lg mb-3 border border-border"
              style={{ backgroundColor: `hsl(${c.hsl})` }}
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-display font-semibold truncate">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">{c.hex}</p>
              </div>
              <CopyButton text={c.hex} />
            </div>
          </div>
        ))}
      </div>

      {/* Contrast Checker */}
      <div className="p-6 rounded-xl bg-card border border-border max-w-lg">
        <h4 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
          <Contrast size={16} className="text-primary" />
          Contrast Checker
        </h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Foreground</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="flex-1 px-2 py-1 rounded-md border border-border bg-background text-xs font-mono"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="flex-1 px-2 py-1 rounded-md border border-border bg-background text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <div
          className="p-4 rounded-lg mb-4 text-center"
          style={{ backgroundColor: bg, color: fg }}
        >
          <p className="text-lg font-display font-bold">Sample Text</p>
          <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-display font-bold">{ratio}:1</span>
          <div className="flex gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                passAA ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}
            >
              AA {passAA ? "Pass" : "Fail"}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                passAAA ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}
            >
              AAA {passAAA ? "Pass" : "Fail"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypePanel() {
  const [baseSize, setBaseSize] = useState(16);

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <label className="text-sm text-muted-foreground">Base size:</label>
        <input
          type="range"
          min={12}
          max={24}
          value={baseSize}
          onChange={(e) => setBaseSize(Number(e.target.value))}
          className="w-48 accent-primary"
        />
        <span className="font-mono text-sm">{baseSize}px</span>
      </div>

      <div className="space-y-4">
        {typeScale.map((t) => {
          const scaledSize = Math.round((parseInt(t.size) / 16) * baseSize);
          return (
            <div
              key={t.name}
              className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="w-20 shrink-0">
                <span className="text-xs text-primary font-display font-semibold">{t.name}</span>
              </div>
              <p
                style={{
                  fontSize: `${scaledSize}px`,
                  fontWeight: t.weight,
                  fontFamily: t.font === "Sora" ? "var(--font-display)" : "var(--font-body)",
                }}
                className="flex-1"
              >
                The quick brown fox
              </p>
              <div className="flex gap-2 items-center shrink-0">
                <span className="text-[10px] text-muted-foreground font-mono">
                  {scaledSize}px / {t.weight} / {t.font}
                </span>
                <CopyButton text={`${scaledSize}px`} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        TBD: Actual type scale from Figma. Provide font files or names to populate.
      </p>
    </div>
  );
}

function SpacingPanel() {
  const [showBreakpoints, setShowBreakpoints] = useState(false);

  return (
    <div>
      <h4 className="font-display font-semibold text-sm mb-4">Spacing Scale (8pt base, placeholder)</h4>
      <div className="flex flex-wrap gap-3 mb-10">
        {spacingScale.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div
              className="bg-primary/20 border border-primary/30 rounded"
              style={{ width: `${Math.min(s, 96)}px`, height: `${Math.min(s, 96)}px` }}
            />
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-muted-foreground">{s}px</span>
              <CopyButton text={`${s}px`} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowBreakpoints(!showBreakpoints)}
        className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-display font-medium hover:bg-muted transition-colors mb-4"
      >
        {showBreakpoints ? "Hide" : "Show"} Breakpoints
      </button>

      {showBreakpoints && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Mobile", width: "375px", cols: "4" },
            { name: "Tablet", width: "768px", cols: "8" },
            { name: "Desktop", width: "1440px", cols: "12" },
          ].map((bp) => (
            <div key={bp.name} className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="font-display font-semibold text-sm">{bp.name}</p>
              <p className="text-xs text-muted-foreground">{bp.width} / {bp.cols} col</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-6">
        TBD: Actual spacing scale and grid specs from Figma file.
      </p>
    </div>
  );
}

function ElevationPanel() {
  return (
    <div>
      <h4 className="font-display font-semibold text-sm mb-4">Elevation Tokens</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { name: "shadow-sm", css: "0 1px 2px 0 rgba(24,28,36,0.04)" },
          { name: "shadow-md", css: "0 4px 12px -2px rgba(24,28,36,0.06)" },
          { name: "shadow-lg", css: "0 12px 32px -8px rgba(24,28,36,0.1)" },
          { name: "shadow-xl", css: "0 24px 56px -12px rgba(24,28,36,0.12)" },
        ].map((s) => (
          <div
            key={s.name}
            className="p-6 rounded-xl bg-card border border-border flex flex-col items-center gap-2"
            style={{ boxShadow: s.css }}
          >
            <span className="text-xs font-display font-semibold">{s.name}</span>
            <CopyButton text={s.css} />
          </div>
        ))}
      </div>

      <h4 className="font-display font-semibold text-sm mb-4">Border Radius</h4>
      <div className="flex gap-4 mb-8">
        {[
          { name: "sm", val: "4px" },
          { name: "md", val: "8px" },
          { name: "lg", val: "12px" },
          { name: "xl", val: "16px" },
          { name: "full", val: "9999px" },
        ].map((r) => (
          <div key={r.name} className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 bg-primary/20 border border-primary/30"
              style={{ borderRadius: r.val }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              {r.name} ({r.val})
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        TBD: Motion tokens (durations, easings). Upload Figma data to populate.
      </p>
    </div>
  );
}
