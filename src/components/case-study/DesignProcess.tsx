import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, PenTool, Layers, Zap, CheckCircle } from "lucide-react";

const DesignProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const processSteps = [
    {
      icon: Compass,
      phase: "Discover",
      title: "Research & Analysis",
      description: "Conducted user interviews, surveys, and competitive analysis to understand the healthcare navigation landscape.",
      activities: ["User Interviews", "Survey Analysis", "Competitive Audit", "Stakeholder Mapping"],
      color: "chart-1",
    },
    {
      icon: PenTool,
      phase: "Define",
      title: "Problem Framing",
      description: "Synthesized research findings to define user personas, journey maps, and key problem statements.",
      activities: ["Persona Creation", "Journey Mapping", "Problem Statements", "Design Principles"],
      color: "chart-2",
    },
    {
      icon: Layers,
      phase: "Design",
      title: "Ideation & Prototyping",
      description: "Generated solutions through sketching, wireframing, and creating high-fidelity prototypes.",
      activities: ["Sketching Sessions", "Wireframes", "UI Design", "Prototype Development"],
      color: "chart-3",
    },
    {
      icon: Zap,
      phase: "Deliver",
      title: "Testing & Iteration",
      description: "Validated designs through usability testing and iterated based on user feedback.",
      activities: ["Usability Testing", "Feedback Analysis", "Design Iteration", "Final Handoff"],
      color: "chart-4",
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-chart-4/10 text-chart-4 rounded-full text-sm font-medium mb-6">
            <Layers className="w-4 h-4" />
            Design Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            How We Got Here
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We followed a user-centered design process to ensure our solution 
            truly addresses the needs of patients navigating healthcare.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <div className="bg-card rounded-3xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-${step.color}/10 rounded-xl`}>
                      <step.icon className={`w-6 h-6 text-${step.color}`} />
                    </div>
                    <div>
                      <span className={`text-sm font-semibold text-${step.color} uppercase tracking-wider`}>
                        {step.phase}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.activities.map((activity) => (
                      <span
                        key={activity}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                      >
                        <CheckCircle className="w-3 h-3" />
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
