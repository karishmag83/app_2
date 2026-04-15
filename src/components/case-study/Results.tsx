import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ArrowUpRight, Lightbulb, Rocket } from "lucide-react";

const Results = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const results = [
    {
      metric: "92%",
      label: "Task Completion Rate",
      description: "Users successfully complete healthcare management tasks",
      improvement: "+47% from baseline",
    },
    {
      metric: "85%",
      label: "Anxiety Reduction",
      description: "Users report less anxiety about medical appointments",
      improvement: "Self-reported measure",
    },
    {
      metric: "3x",
      label: "Better Prepared",
      description: "Users feel more prepared for doctor visits",
      improvement: "vs. without the app",
    },
    {
      metric: "4.8/5",
      label: "Satisfaction Score",
      description: "Average user satisfaction rating",
      improvement: "Based on 156 responses",
    },
  ];

  const learnings = [
    {
      title: "Simplicity is Trust",
      insight: "Users trust interfaces that don't overwhelm them. Every element should earn its place.",
    },
    {
      title: "Context Matters",
      insight: "Medical information needs context. AI summaries work best when they explain the 'why' behind recommendations.",
    },
    {
      title: "Accessibility is Universal",
      insight: "Designing for older users with accessibility needs improved the experience for everyone.",
    },
    {
      title: "Emotional Design",
      insight: "Healthcare UX isn't just functional—it must be emotionally supportive and reduce anxiety.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-chart-5/10 text-chart-5 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Results & Impact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Measuring Success
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The AI Care Navigator significantly improved patient outcomes and 
            satisfaction across all measured metrics.
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-gradient-to-br from-primary/5 to-chart-2/5 rounded-3xl p-8 text-center relative overflow-hidden group hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
              <p className="text-5xl font-bold text-primary mb-2">{result.metric}</p>
              <p className="font-semibold text-foreground mb-2">{result.label}</p>
              <p className="text-sm text-muted-foreground mb-4">{result.description}</p>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {result.improvement}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Key Learnings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-3 justify-center mb-12">
            <Lightbulb className="w-6 h-6 text-chart-5" />
            <h3 className="font-display text-2xl font-semibold text-foreground">Key Learnings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnings.map((learning, index) => (
              <motion.div
                key={learning.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-muted/30 rounded-2xl p-6 hover:shadow-card transition-shadow duration-300"
              >
                <span className="inline-block w-8 h-8 rounded-lg bg-chart-5/20 text-chart-5 font-bold flex items-center justify-center mb-4">
                  {index + 1}
                </span>
                <h4 className="font-display text-xl font-semibold text-foreground mb-2">{learning.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{learning.insight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary to-chart-2 rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-6">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What's Next?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Future iterations will include integration with wearable devices, 
              family caregiver dashboards, and expanded AI capabilities for 
              proactive health insights.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Wearable Integration", "Caregiver Portal", "Predictive Analytics", "Voice Interface"].map((feature) => (
                <span key={feature} className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
