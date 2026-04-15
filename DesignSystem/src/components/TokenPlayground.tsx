import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Copy, Check } from "lucide-react";

const bgOptions = [
  { name: "background", value: "hsl(40, 33%, 97%)" },
  { name: "card", value: "hsl(40, 25%, 95%)" },
  { name: "secondary", value: "hsl(220, 14%, 20%)" },
  { name: "muted", value: "hsl(40, 15%, 90%)" },
];

const fgOptions = [
  { name: "foreground", value: "hsl(220, 20%, 12%)" },
  { name: "primary", value: "hsl(36, 90%, 50%)" },
  { name: "muted-fg", value: "hsl(220, 10%, 45%)" },
  { name: "secondary-fg", value: "hsl(40, 25%, 92%)" },
];

const radiusOptions = ["4px", "8px", "12px", "16px", "9999px"];
const shadowOptions = [
  { name: "none", value: "none" },
  { name: "sm", value: "0 1px 2px 0 rgba(24,28,36,0.04)" },
  { name: "md", value: "0 4px 12px -2px rgba(24,28,36,0.06)" },
  { name: "lg", value: "0 12px 32px -8px rgba(24,28,36,0.1)" },
];

export default function TokenPlayground() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [bg, setBg] = useState(bgOptions[0]);
  const [fg, setFg] = useState(fgOptions[0]);
  const [radius, setRadius] = useState("12px");
  const [shadow, setShadow] = useState(shadowOptions[2]);
  const [copied, setCopied] = useState(false);

  const cssSnippet = `background: ${bg.value};\ncolor: ${fg.value};\nborder-radius: ${radius};\nbox-shadow: ${shadow.value};`;

  const copy = () => {
    navigator.clipboard.writeText(cssSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold mb-3 block">
            Interactive
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Token Playground
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10">
            Combine tokens and see the result on a sample card in real time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <ControlGroup label="Background">
              {bgOptions.map((o) => (
                <TokenChip key={o.name} name={o.name} color={o.value} active={bg.name === o.name} onClick={() => setBg(o)} />
              ))}
            </ControlGroup>
            <ControlGroup label="Text Color">
              {fgOptions.map((o) => (
                <TokenChip key={o.name} name={o.name} color={o.value} active={fg.name === o.name} onClick={() => setFg(o)} />
              ))}
            </ControlGroup>
            <ControlGroup label="Border Radius">
              <div className="flex gap-2">
                {radiusOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRadius(r)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      radius === r ? "bg-secondary text-secondary-foreground" : "bg-card border border-border text-muted-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </ControlGroup>
            <ControlGroup label="Shadow">
              <div className="flex gap-2">
                {shadowOptions.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setShadow(s)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      shadow.name === s.name ? "bg-secondary text-secondary-foreground" : "bg-card border border-border text-muted-foreground"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </ControlGroup>

            {/* CSS Output */}
            <div className="p-4 rounded-xl bg-secondary text-secondary-foreground">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest opacity-60">CSS Output</span>
                <button onClick={copy} className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <pre className="text-xs font-mono whitespace-pre-wrap">{cssSnippet}</pre>
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center p-8 rounded-xl bg-muted/30 border border-border">
            <div
              className="w-full max-w-xs p-6 border border-border transition-all duration-300"
              style={{
                backgroundColor: bg.value,
                color: fg.value,
                borderRadius: radius,
                boxShadow: shadow.value,
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-current opacity-20 mb-4" />
              <h4 className="text-lg font-display font-bold mb-2">Card Title</h4>
              <p className="text-sm opacity-70 mb-4">
                This is a sample card using your selected tokens. See how they combine.
              </p>
              <div
                className="inline-block px-4 py-2 rounded-md text-xs font-display font-semibold"
                style={{
                  backgroundColor: fg.value,
                  color: bg.value,
                  borderRadius: radius,
                }}
              >
                Action
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-display font-semibold mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function TokenChip({
  name,
  color,
  active,
  onClick,
}: {
  name: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active ? "bg-secondary text-secondary-foreground ring-2 ring-primary" : "bg-card border border-border text-muted-foreground hover:border-primary/30"
      }`}
    >
      <span className="w-4 h-4 rounded-full border border-border shrink-0" style={{ backgroundColor: color }} />
      {name}
    </button>
  );
}
