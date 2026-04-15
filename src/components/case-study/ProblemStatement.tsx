import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Brain, Clock, Users } from "lucide-react";

const ProblemStatement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: Brain,
      stat: "73%",
      title: "Overwhelmed Patients",
      description: "Patients feel confused after medical appointments due to complex terminology",
    },
    {
      icon: Clock,
      stat: "45%",
      title: "Missed Follow-ups",
      description: "Nearly half of patients fail to follow their prescribed care plans",
    },
    {
      icon: Users,
      stat: "62%",
      title: "Communication Gap",
      description: "Patients leave appointments with unanswered questions",
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Problem
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Healthcare is Complex
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Patients often leave medical appointments feeling overwhelmed, confused, 
            and uncertain about their next steps. The gap between healthcare providers 
            and patients creates anxiety and poor health outcomes.
          </p>
        </motion.div>

        {/* Problem Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative group"
            >
              <div className="bg-muted/50 rounded-3xl p-8 h-full hover:shadow-elevated transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <problem.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-4xl font-bold text-accent">{problem.stat}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem Statement Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <blockquote className="relative bg-primary/5 rounded-3xl p-8 md:p-12">
            <div className="absolute top-6 left-8 text-6xl text-primary/20 font-display">"</div>
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed relative z-10 pl-8">
              How might we help patients feel empowered and confident in managing 
              their healthcare journey, rather than overwhelmed by medical complexity?
            </p>
            <footer className="mt-6 text-muted-foreground pl-8">
              — Design Challenge
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
