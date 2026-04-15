import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Monitor, Smartphone, ExternalLink } from "lucide-react";

// Import assets
import loginScreenshot from "@/assets/screenshots/login-page.png";

const LiveProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeScreen, setActiveScreen] = useState<"landing" | "login">("landing");

  const screenshots = [
    {
      id: "landing",
      title: "Landing Page",
      description: "Welcoming hero section with clear value proposition",
      image: "/Landing_page_AI_care.jpg",
    },
    {
      id: "login",
      title: "Authentication",
      description: "Clean, minimal login experience",
      image: loginScreenshot,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[hsl(var(--case-study-section-alt))]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-chart-2/10 text-chart-2 rounded-full text-sm font-medium mb-6">
            <Monitor className="w-4 h-4" />
            Live Product
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Final Product
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From wireframes to a fully functional healthcare companion. 
            See the live application in action.
          </p>
        </motion.div>

        {/* Screenshots Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
            Key Screens
          </h3>

          {/* Screen Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 px-4">
            {screenshots.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id as "landing" | "login")}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all ${
                  activeScreen === screen.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {screen.title}
              </button>
            ))}
          </div>

          {/* Active Screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl overflow-hidden shadow-elevated"
              >
                <img
                  src={screenshots.find((s) => s.id === activeScreen)?.image}
                  alt={screenshots.find((s) => s.id === activeScreen)?.title}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>

            {/* Screenshot Info */}
            <div className="flex flex-col justify-center">
              <motion.div
                key={`info-${activeScreen}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
                  {activeScreen === "landing" ? (
                    <Monitor className="w-6 h-6 text-primary" />
                  ) : (
                    <Smartphone className="w-6 h-6 text-primary" />
                  )}
                </div>
                <h4 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {screenshots.find((s) => s.id === activeScreen)?.title}
                </h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {screenshots.find((s) => s.id === activeScreen)?.description}
                </p>

                {/* Design Highlights */}
                <div className="space-y-3 mb-8">
                  {activeScreen === "landing" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">Clear value proposition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">Feature highlights with icons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">Calming color palette</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">Minimal form fields</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">Tab-based sign in/up toggle</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">Prominent CTA button</span>
                      </div>
                    </>
                  )}
                </div>

                {/* CTA */}
                <a
                  href="https://ai-care-navigator-medical.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  View Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveProductShowcase;
