import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, FileText, MessageCircle, Heart, Calendar, Bell, Shield } from "lucide-react";

const SolutionShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: FileText,
      title: "Visit Summaries",
      description: "AI-powered plain-language summaries of medical visits that break down complex terminology into understandable terms.",
      benefits: ["Jargon-free explanations", "Key takeaways highlighted", "Shareable with family"],
      mockup: "visit-summary",
    },
    {
      icon: MessageCircle,
      title: "Question Preparation",
      description: "Smart question generator that helps patients prepare for appointments based on their medical history and concerns.",
      benefits: ["AI-generated questions", "Personalized to history", "Save for appointment"],
      mockup: "questions",
    },
    {
      icon: Heart,
      title: "Care Plan Tracking",
      description: "Personalized care plan with daily tasks, medication reminders, and lifestyle recommendations.",
      benefits: ["Daily task checklist", "Medication reminders", "Progress tracking"],
      mockup: "care-plan",
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            The Solution
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI Care Navigator
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A comprehensive healthcare companion that empowers patients with 
            clarity, preparation, and personalized care management.
          </p>
        </motion.div>

        {/* Feature Showcases */}
        <div className="space-y-24 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}
            >
              {/* Feature Info */}
              <div className="lg:w-1/2">
                <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-chart-2/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-chart-2" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Mockup */}
              <div className="lg:w-1/2">
                <div className="bg-muted/50 rounded-3xl p-8 shadow-elevated">
                  <FeatureMockup type={feature.mockup} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24"
        >
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-12">
            Additional Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Calendar, title: "Appointment Calendar", desc: "Sync and manage all medical appointments" },
              { icon: Bell, title: "Smart Reminders", desc: "Never miss medications or follow-ups" },
              { icon: Shield, title: "Privacy First", desc: "HIPAA-compliant data protection" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="bg-muted/30 rounded-2xl p-6 text-center hover:shadow-card transition-shadow duration-300"
              >
                <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Feature Mockup Components
const FeatureMockup = ({ type }: { type: string }) => {
  if (type === "visit-summary") {
    return (
      <div className="bg-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Visit Summary</p>
            <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm font-medium text-foreground mb-1">Key Takeaway</p>
            <p className="text-sm text-muted-foreground">Blood pressure is slightly elevated. Doctor recommends reducing sodium intake.</p>
          </div>
          <div className="bg-chart-2/10 rounded-xl p-4">
            <p className="text-sm font-medium text-chart-2 mb-1">Next Steps</p>
            <p className="text-sm text-muted-foreground">Schedule follow-up in 3 months</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "questions") {
    return (
      <div className="bg-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-chart-2/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-chart-2" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Suggested Questions</p>
            <p className="text-sm text-muted-foreground">For your next visit</p>
          </div>
        </div>
        <div className="space-y-3">
          {["What are the side effects of my new medication?", "Are there lifestyle changes I should make?", "When should I expect to see improvement?"].map((q, i) => (
            <div key={i} className="flex items-start gap-3 bg-muted/50 rounded-xl p-4">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-foreground">{q}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <Heart className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Today's Care Plan</p>
          <p className="text-sm text-muted-foreground">3 of 5 tasks completed</p>
        </div>
      </div>
      <div className="space-y-3">
        {[
          { task: "Take morning medication", done: true },
          { task: "30 min walk", done: true },
          { task: "Blood pressure check", done: true },
          { task: "Evening stretches", done: false },
          { task: "Take evening medication", done: false },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-xl p-3 ${item.done ? "bg-chart-2/10" : "bg-muted/50"}`}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.done ? "border-chart-2 bg-chart-2" : "border-muted-foreground"}`}>
              {item.done && <span className="text-xs text-white">✓</span>}
            </div>
            <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.task}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionShowcase;
