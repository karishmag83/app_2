import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PenTool, ArrowRight } from "lucide-react";

// Import wireframe images
import dashboardWireframe from "@/assets/wireframes/dashboard-wireframe.png";
import loginWireframe from "@/assets/wireframes/login-wireframe.png";
import visitSummaryWireframe from "@/assets/wireframes/visit-summary-wireframe.png";
import carePlanWireframe from "@/assets/wireframes/care-plan-wireframe.png";

const WireframesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const wireframes = [
    {
      title: "Dashboard Overview",
      description: "Main navigation hub with quick access to all features",
      image: dashboardWireframe,
      annotations: [
        "Sidebar navigation for core features",
        "Summary cards for quick insights",
        "Action items prominently displayed",
      ],
    },
    {
      title: "Login Screen",
      description: "Simple, welcoming authentication flow",
      image: loginWireframe,
      annotations: [
        "Minimal form fields to reduce friction",
        "Clear call-to-action button",
        "Option to create new account",
      ],
    },
    {
      title: "Visit Summary",
      description: "Detailed breakdown of medical visits",
      image: visitSummaryWireframe,
      annotations: [
        "Key takeaways at the top",
        "Medications and next steps clearly listed",
        "Easy sharing options",
      ],
    },
    {
      title: "Care Plan",
      description: "Daily health management tracker",
      image: carePlanWireframe,
      annotations: [
        "Checkbox-based task completion",
        "Progress visualization",
        "Medication schedule integration",
      ],
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <PenTool className="w-4 h-4" />
            Wireframes
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            From Sketch to Screen
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Low-fidelity wireframes helped us quickly iterate on layout and 
            information hierarchy before investing in visual design.
          </p>
        </motion.div>

        {/* Wireframes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {wireframes.map((wireframe, index) => (
            <motion.div
              key={wireframe.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              {/* Wireframe Image */}
              <div className="bg-muted/50 p-6 flex items-center justify-center min-h-[280px]">
                <img
                  src={wireframe.image}
                  alt={`${wireframe.title} wireframe`}
                  className="max-h-64 w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Wireframe Info */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {wireframe.title}
                </h3>
                <p className="text-muted-foreground mb-4">{wireframe.description}</p>
                
                {/* Annotations */}
                <div className="space-y-2">
                  {wireframe.annotations.map((annotation, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{annotation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Design Evolution Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-3xl p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Iterative Design Process
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We went through 3 major iterations of these wireframes based on user feedback. 
              Each iteration focused on simplifying the interface and reducing cognitive load 
              for users who may already be stressed about their health.
            </p>
            <div className="flex justify-center gap-8 mt-6">
              {[
                { label: "Iterations", value: "3" },
                { label: "User Tests", value: "15" },
                { label: "Changes Made", value: "47" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WireframesSection;
