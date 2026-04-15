import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, AlertCircle, Lightbulb } from "lucide-react";

const UserPersonas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const personas = [
    {
      name: "Sarah Mitchell",
      age: 34,
      occupation: "Marketing Manager",
      avatar: "SM",
      avatarBg: "bg-chart-1/20",
      avatarColor: "text-chart-1",
      quote: "I just want to understand what my doctor tells me without feeling like I need a medical degree.",
      goals: [
        "Understand medical information in plain language",
        "Feel prepared before appointments",
        "Keep track of medications and follow-ups",
      ],
      frustrations: [
        "Forgets questions during appointments",
        "Overwhelmed by medical jargon",
        "Difficulty managing multiple care providers",
      ],
      needs: [
        "Simple, clear explanations",
        "Appointment preparation tools",
        "Centralized care management",
      ],
    },
    {
      name: "Robert Chen",
      age: 67,
      occupation: "Retired Teacher",
      avatar: "RC",
      avatarBg: "bg-chart-2/20",
      avatarColor: "text-chart-2",
      quote: "Managing my health conditions feels like a full-time job. I need something to help me stay organized.",
      goals: [
        "Manage multiple chronic conditions",
        "Remember daily medications",
        "Communicate with family about care",
      ],
      frustrations: [
        "Too many appointments to track",
        "Complex medication schedules",
        "Difficulty using technology",
      ],
      needs: [
        "Simple, accessible interface",
        "Medication reminders",
        "Easy sharing with caregivers",
      ],
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-chart-2/10 text-chart-2 rounded-full text-sm font-medium mb-6">
            <User className="w-4 h-4" />
            User Personas
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our Users
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Based on our research, we identified two primary user personas that 
            represent our target audience.
          </p>
        </motion.div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="bg-muted/30 rounded-3xl p-8 hover:shadow-elevated transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl ${persona.avatarBg} flex items-center justify-center`}>
                  <span className={`text-xl font-bold ${persona.avatarColor}`}>{persona.avatar}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">{persona.name}</h3>
                  <p className="text-muted-foreground">{persona.age} • {persona.occupation}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="bg-card rounded-2xl p-4 mb-6 border-l-4 border-primary">
                <p className="text-foreground italic">"{persona.quote}"</p>
              </blockquote>

              {/* Details */}
              <div className="space-y-6">
                {/* Goals */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-chart-2" />
                    <h4 className="font-semibold text-foreground">Goals</h4>
                  </div>
                  <ul className="space-y-2">
                    {persona.goals.map((goal) => (
                      <li key={goal} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 shrink-0" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Frustrations */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold text-foreground">Frustrations</h4>
                  </div>
                  <ul className="space-y-2">
                    {persona.frustrations.map((frustration) => (
                      <li key={frustration} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        {frustration}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Needs */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Needs</h4>
                  </div>
                  <ul className="space-y-2">
                    {persona.needs.map((need) => (
                      <li key={need} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserPersonas;
