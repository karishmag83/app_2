import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Linkedin, Mail, ExternalLink, ArrowUp } from "lucide-react";

const CaseStudyFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="py-24 bg-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Thank You */}
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex p-4 bg-primary/20 rounded-2xl mb-6"
            >
              <Heart className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-background mb-4">
              Thanks for Reading
            </h2>
            <p className="text-lg text-background/70 max-w-2xl mx-auto leading-relaxed">
              This case study demonstrates my approach to solving complex UX challenges 
              through research-driven design and iterative testing.
            </p>
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-16"
          >
            <a
              href="mailto:karishmaworks08@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
            <a
              href="https://www.linkedin.com/in/karishmagawali/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background/10 text-background rounded-full font-medium hover:bg-background/20 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a
              href="https://ai-care-navigator-medical.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background/10 text-background rounded-full font-medium hover:bg-background/20 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Project
            </a>
          </motion.div>

          {/* Project Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-background/20"
          >
            {[
              { label: "Project", value: "AI Care Navigator" },
              { label: "Role", value: "UX Designer" },
              { label: "Duration", value: "8 Weeks" },
              { label: "Year", value: "2025" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm text-background/50 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-background font-medium">{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center gap-8 mt-12 pt-8 border-t border-background/20"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-background/10 text-background rounded-full font-medium hover:bg-background/20 transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
              Back to Top
            </button>
            <p className="text-background/50 text-sm">
              © 2025 UX Case Study. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default CaseStudyFooter;
