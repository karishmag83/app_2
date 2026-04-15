import { motion } from "framer-motion";
import { Heart, Calendar, ClipboardList, ArrowDown, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudyHero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-foreground/70 hover:text-foreground transition-colors mb-6 sm:mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            UX Case Study
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            AI Care Navigator
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering patients to feel in control of their healthcare journey, 
            not overwhelmed by it.
          </p>
        </motion.div>

        {/* Project Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Role", value: "UX Designer" },
            { label: "Duration", value: "8 Weeks" },
            { label: "Team", value: "3 Members" },
            { label: "Platform", value: "Web App" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-card text-center"
            >
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Image - App Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: ClipboardList,
                  title: "Understand Visits",
                  desc: "Plain-language summaries",
                  color: "text-chart-1",
                  bg: "bg-chart-1/10",
                },
                {
                  icon: Calendar,
                  title: "Prepare Questions",
                  desc: "AI-generated questions",
                  color: "text-chart-2",
                  bg: "bg-chart-2/10",
                },
                {
                  icon: Heart,
                  title: "Care Plan",
                  desc: "Personalized tracking",
                  color: "text-chart-3",
                  bg: "bg-chart-3/10",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-muted/30"
                >
                  <div className={`inline-flex p-4 rounded-2xl ${feature.bg} mb-4`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
