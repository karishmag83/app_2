import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Network, ArrowRight, Home, User, FileText, Calendar, Heart, Settings, Shield } from "lucide-react";

const InformationArchitecture = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sitemapNodes = [
    { label: "Landing Page" },
    { label: "Authentication" },
    { label: "Dashboard" },
  ];

  void Shield;
  void sitemapNodes;

  const userFlows = [
    {
      title: "New User Onboarding",
      steps: ["Landing Page", "Sign Up", "Email Verification", "Profile Setup", "Dashboard"],
      color: "primary",
    },
    {
      title: "View Visit Summary",
      steps: ["Dashboard", "Visit Summaries", "Select Visit", "View Summary", "Share/Save"],
      color: "chart-2",
    },
    {
      title: "Prepare for Appointment",
      steps: ["Dashboard", "Question Prep", "Select Concerns", "Generate Questions", "Save List"],
      color: "chart-3",
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-chart-4/10 text-chart-4 rounded-full text-sm font-medium mb-6">
            <Network className="w-4 h-4" />
            Information Architecture
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Structuring the Experience
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A clear information architecture ensures users can navigate the app 
            intuitively and find what they need without confusion.
          </p>
        </motion.div>

        {/* Sitemap Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-muted/30 rounded-3xl p-8 md:p-12 mb-16"
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
            Site Map
          </h3>
          
          {/* Visual Sitemap */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Level 0 - Landing */}
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-primary text-black px-6 py-4 rounded-2xl font-semibold flex items-center gap-2 shadow-md"
                >
                  <Home className="w-5 h-5" />
                  Landing Page
                </motion.div>
              </div>

              {/* Connector Line */}
              <div className="flex justify-center mb-4">
                <div className="w-0.5 h-8 bg-border" />
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-96 h-0.5 bg-border" />
              </div>

              {/* Level 1 - Main Sections */}
              <div className="flex justify-center gap-32 mb-8">
                {[
                  { icon: User, label: "Authentication", color: "bg-chart-2" },
                  { icon: Network, label: "Dashboard", color: "bg-chart-3" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-0.5 h-4 bg-border mb-2" />
                    <div className={`${item.color} text-black px-5 py-3 rounded-xl font-medium flex items-center gap-2 shadow-md`}>
                      <item.icon className="w-4 h-4 text-black" />
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Level 2 - Sub Sections */}
              <div className="grid grid-cols-2 gap-8">
                {/* Auth Children */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex gap-4">
                    {["Sign In", "Sign Up", "Forgot Password"].map((label) => (
                      <div key={label} className="bg-card border border-border px-4 py-2 rounded-lg text-sm text-black shadow-sm">
                        {label}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Dashboard Children */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex gap-4 flex-wrap justify-center">
                    {[
                      { icon: FileText, label: "Visits" },
                      { icon: Calendar, label: "Questions" },
                      { icon: Heart, label: "Care Plan" },
                      { icon: Settings, label: "Settings" },
                    ].map((item) => (
                      <div key={item.label} className="bg-card border border-border px-4 py-2 rounded-lg text-sm text-black flex items-center gap-2 shadow-sm">
                        <item.icon className="w-3 h-3 text-black" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Flows */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
            Key User Flows
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userFlows.map((flow, flowIndex) => (
              <motion.div
                key={flow.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + flowIndex * 0.1 }}
                className="bg-muted/30 rounded-2xl p-6"
              >
                <h4 className={`font-semibold text-${flow.color} mb-4`}>{flow.title}</h4>
                <div className="space-y-2">
                  {flow.steps.map((step, stepIndex) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full bg-${flow.color}/20 text-${flow.color} flex items-center justify-center text-xs font-medium`}>
                        {stepIndex + 1}
                      </span>
                      <span className="text-sm text-foreground">{step}</span>
                      {stepIndex < flow.steps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { title: "Flat Hierarchy", desc: "Maximum 3 levels deep for easy navigation" },
            { title: "Progressive Disclosure", desc: "Show information as needed, not all at once" },
            { title: "Clear Labels", desc: "Action-oriented, jargon-free naming" },
            { title: "Consistent Patterns", desc: "Similar tasks work the same way everywhere" },
          ].map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card text-center"
            >
              <span className="inline-block w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-3 mx-auto">
                {index + 1}
              </span>
              <h4 className="font-semibold text-foreground mb-2">{principle.title}</h4>
              <p className="text-sm text-muted-foreground">{principle.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InformationArchitecture;
