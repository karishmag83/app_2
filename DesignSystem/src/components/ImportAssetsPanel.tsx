import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image, FileJson, Camera } from "lucide-react";

export default function ImportAssetsPanel() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-2xl"
      >
        <div className="bg-card border border-primary/20 rounded-2xl p-6 shadow-lg relative">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Upload size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm">
                Import Your Design System Assets
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                The Figma file requires access. Upload these assets to populate the site with real data.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <AssetSlot
              icon={<Image size={16} />}
              label="Screenshots"
              hint="6-12 key screenshots: Foundations, Components, Example screens"
            />
            <AssetSlot
              icon={<FileJson size={16} />}
              label="Token Export"
              hint="JSON or CSV token file from Figma (if available)"
            />
            <AssetSlot
              icon={<Camera size={16} />}
              label="Cover Image"
              hint="A hero or cover image for the case study"
            />
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Until assets are provided, placeholders and "TBD" tags will be shown throughout the site.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function AssetSlot({ icon, label, hint }: { icon: React.ReactNode; label: string; hint: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-dashed border-border hover:border-primary/40 transition-colors cursor-pointer text-center">
      <div className="text-muted-foreground">{icon}</div>
      <p className="font-display font-medium text-xs">{label}</p>
      <p className="text-[10px] text-muted-foreground leading-tight">{hint}</p>
    </div>
  );
}
