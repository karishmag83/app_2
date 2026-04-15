import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, MessageSquare, FileSearch, Target } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const UserResearch = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pieData = [
    { name: "Confused by terminology", value: 42, color: "hsl(195, 85%, 45%)" },
    { name: "Forgot questions", value: 28, color: "hsl(165, 60%, 50%)" },
    { name: "Unclear on next steps", value: 20, color: "hsl(15, 85%, 60%)" },
    { name: "Other", value: 10, color: "hsl(280, 60%, 55%)" },
  ];

  const barData = [
    { name: "Ages 25-34", frustration: 78 },
    { name: "Ages 35-44", frustration: 65 },
    { name: "Ages 45-54", frustration: 72 },
    { name: "Ages 55-64", frustration: 68 },
    { name: "Ages 65+", frustration: 82 },
  ];

  const researchMethods = [
    { icon: Users, count: "24", label: "User Interviews" },
    { icon: MessageSquare, count: "156", label: "Survey Responses" },
    { icon: FileSearch, count: "8", label: "Competitor Analysis" },
    { icon: Target, count: "3", label: "Persona Created" },
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
            <Users className="w-4 h-4" />
            User Research
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Understanding Our Users
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We conducted extensive research to understand the pain points and needs 
            of patients navigating the healthcare system.
          </p>
        </motion.div>

        {/* Research Methods Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {researchMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center shadow-card"
            >
              <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
                <method.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{method.count}</p>
              <p className="text-sm text-muted-foreground">{method.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-3xl p-8 shadow-card"
          >
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              Primary Pain Points
            </h3>
            <p className="text-muted-foreground mb-6">
              What frustrates patients most after appointments?
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-3xl p-8 shadow-card"
          >
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              Frustration by Age Group
            </h3>
            <p className="text-muted-foreground mb-6">
              % reporting frustration with healthcare navigation
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="frustration" fill="hsl(195, 85%, 45%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-card"
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
            Key Research Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Information Overload",
                insight: "Patients receive too much information at once without context or prioritization",
              },
              {
                number: "02",
                title: "Preparation Gap",
                insight: "Most patients wish they had prepared better questions before their appointments",
              },
              {
                number: "03",
                title: "Follow-up Confusion",
                insight: "Unclear action items lead to poor adherence to care plans and treatment",
              },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="relative"
              >
                <span className="text-6xl font-bold text-primary/10">{item.number}</span>
                <h4 className="font-semibold text-foreground text-lg mb-2 -mt-4">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.insight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserResearch;
