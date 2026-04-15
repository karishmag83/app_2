import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="repack-section min-h-screen flex flex-col items-center justify-center px-6 py-24 relative" style={{ background: `var(--repack-hero-gradient)` }}>
      {/* Meta badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <span className="px-4 py-2 rounded-full border text-sm" style={{ borderColor: `hsl(var(--repack-border))` }}>
          <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>Role:</span>
          <span className="ml-1 font-medium">Product Designer</span>
        </span>
        <span className="px-4 py-2 rounded-full border text-sm" style={{ borderColor: `hsl(var(--repack-border))` }}>
          <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>Duration:</span>
          <span className="ml-1 font-medium">8 weeks</span>
        </span>
        <span className="px-4 py-2 rounded-full border text-sm" style={{ borderColor: `hsl(var(--repack-border))` }}>
          <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>Platform:</span>
          <span className="ml-1 font-medium">Web & Mobile</span>
        </span>
        <span className="px-4 py-2 rounded-full border text-sm" style={{ borderColor: `hsl(var(--repack-border))` }}>
          <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>Year:</span>
          <span className="ml-1 font-medium">2024</span>
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mb-6 leading-tight" style={{ fontFamily: `var(--repack-font-display)` }}>
        RePack: Redesigning the Post-Purchase Experience
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-center max-w-2xl mb-16" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
        How I streamlined the package return process, reducing support tickets by 40% and improving user satisfaction by 35%
      </p>

      {/* Scroll indicator */}
      <div className="repack-scroll-indicator absolute bottom-12 flex flex-col items-center gap-2" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
        <span className="text-sm">Scroll to explore</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default HeroSection;
