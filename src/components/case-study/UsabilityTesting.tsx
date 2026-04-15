import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TestTube, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const UsabilityTesting = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  void LineChart;
  void Line;
  void XAxis;
  void YAxis;
  void Tooltip;

  const taskSuccessData = [
    { task: "Find visit summary", before: 45, after: 92 },
    { task: "Generate questions", before: 32, after: 88 },
    { task: "Check care plan", before: 58, after: 95 },
    { task: "Set medication reminder", before: 41, after: 91 },
  ];

  const radarData = [
    { metric: "Ease of Use", score: 92 },
    { metric: "Clarity", score: 88 },
    { metric: "Trust", score: 85 },
    { metric: "Satisfaction", score: 94 },
    { metric: "Likelihood to Recommend", score: 91 },
  ];

  const testimonials = [
    {
      quote: "Finally, I can understand what my doctor is telling me without feeling stupid.",
      author: "Test Participant #7",
      demographic: "Female, 45",
    },
    {
      quote: "The question generator is exactly what I needed. I always forget what to ask.",
      author: "Test Participant #12",
      demographic: "Male, 62",
    },
    {
      quote: "I wish I had this when I was managing my father's care. It would have helped so much.",
      author: "Test Participant #3",
      demographic: "Female, 38",
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
            <TestTube className="w-4 h-4" />
            Usability Testing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Validating Our Design
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We conducted extensive usability testing with 15 participants to 
            validate our design decisions and measure success.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: "92%", label: "Task Success Rate", trend: "+47%" },
            { value: "4.8", label: "User Satisfaction", trend: "/5.0" },
            { value: "85%", label: "Reduced Anxiety", trend: "about appointments" },
            { value: "91%", label: "Would Recommend", trend: "to others" },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center shadow-card"
            >
              <p className="text-4xl font-bold text-primary mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
              <span className="inline-block px-2 py-1 bg-chart-2/10 text-chart-2 rounded-full text-xs font-medium">
                {metric.trend}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Task Success Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-3xl p-8 shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">Task Success Rate</h3>
                <p className="text-sm text-muted-foreground">Before vs After AI Care Navigator</p>
              </div>
            </div>
            <div className="space-y-4">
              {taskSuccessData.map((task, index) => (
                <div key={task.task} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{task.task}</span>
                    <span className="text-muted-foreground">{task.before}% → {task.after}%</span>
                  </div>
                  <div className="flex gap-2 h-3">
                    <div className="flex-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${task.before}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-accent/50 rounded-full"
                      />
                    </div>
                    <div className="flex-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${task.after}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent/50" />
                  <span className="text-sm text-muted-foreground">Before</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">After</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User Experience Radar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-3xl p-8 shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <ThumbsUp className="w-6 h-6 text-chart-2" />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">User Experience Scores</h3>
                <p className="text-sm text-muted-foreground">Measured on a scale of 0-100</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(195, 85%, 45%)"
                    fill="hsl(195, 85%, 45%)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* User Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 justify-center mb-8">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h3 className="font-display text-2xl font-semibold text-foreground">What Users Said</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <div className="text-4xl text-primary/20 mb-4">"</div>
                <p className="text-foreground mb-4 leading-relaxed -mt-4">{testimonial.quote}</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.demographic}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UsabilityTesting;
