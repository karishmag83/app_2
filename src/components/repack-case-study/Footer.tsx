import { ExternalLink, Mail, Linkedin, Github, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="footer" className="py-20 px-6" style={{ background: `hsl(var(--repack-card))`, borderTop: `1px solid hsl(var(--repack-border))` }}>
      <div className="max-w-4xl mx-auto">
        {/* Back to Top button */}
        <div className="text-center mb-12">
          <Button
            size="sm"
            className="gap-2"
            style={{ backgroundColor: `hsl(var(--repack-primary))`, color: `hsl(var(--repack-primary-foreground))` }}
            onClick={scrollToTop}
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </Button>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: `var(--repack-font-display)` }}>
            Want to See It in Action?
          </h3>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
            Explore the live prototype and experience the streamlined return flow yourself.
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2"
            style={{ backgroundColor: `hsl(var(--repack-primary))`, color: `hsl(var(--repack-primary-foreground))` }}
          >
            <a 
              href="https://return-a-package.lovable.app/orders" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              View Live Prototype
            </a>
          </Button>
        </div>

        {/* Divider */}
        <div className="w-16 h-px mx-auto mb-12" style={{ backgroundColor: `hsl(var(--repack-border))` }} />

        {/* Credits */}
        <div className="text-center space-y-6">
          <div>
            <p className="text-sm mb-2" style={{ color: `hsl(var(--repack-muted-foreground))` }}>Designed & developed by</p>
            <p className="font-display text-xl font-semibold" style={{ fontFamily: `var(--repack-font-display)` }}>Karishma</p>
            <p className="text-sm" style={{ color: `hsl(var(--repack-muted-foreground))` }}>Product Designer</p>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:hello@example.com" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Email"
              style={{ background: `hsl(var(--repack-secondary))`, color: `hsl(var(--repack-muted-foreground))` }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `hsl(var(--repack-secondary) / 0.8)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `hsl(var(--repack-secondary))`}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
              style={{ background: `hsl(var(--repack-secondary))`, color: `hsl(var(--repack-muted-foreground))` }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `hsl(var(--repack-secondary) / 0.8)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `hsl(var(--repack-secondary))`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="GitHub"
              style={{ background: `hsl(var(--repack-secondary))`, color: `hsl(var(--repack-muted-foreground))` }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `hsl(var(--repack-secondary) / 0.8)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `hsl(var(--repack-secondary))`}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
            RePack Case Study © 2024 • Made with care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
