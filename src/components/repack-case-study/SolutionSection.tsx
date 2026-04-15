import { CheckCircle, QrCode, ListChecks, Bell } from "lucide-react";

const SolutionSection = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Smart Return Eligibility Checker",
      description: "Automated policy verification that instantly tells users if their item qualifies for return.",
    },
    {
      icon: QrCode,
      title: "One-Tap Label Generation",
      description: "Pre-filled shipping labels that users can print or show as QR codes at drop-off locations.",
    },
    {
      icon: ListChecks,
      title: "Visual Step-by-Step Guide",
      description: "Progress indicators and clear CTAs guiding users through each step of the process.",
    },
    {
      icon: Bell,
      title: "Real-Time Tracking",
      description: "Status updates via SMS and email, keeping users informed at every stage.",
    },
  ];

  return (
    <section id="solution" className="repack-section py-24 px-6" style={{ background: `var(--repack-section-gradient)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="repack-section-tag mb-4">04 — The Solution</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: `var(--repack-font-display)` }}>
          A Streamlined Return Experience
        </h2>

        {/* Orders Dashboard Screenshot */}
        <div className="mb-16 flex flex-col items-center gap-4">
          <img 
            src="/repack-orders-view.png" 
            alt="RePack Orders Dashboard" 
            className="w-full max-w-4xl rounded-lg shadow-lg" 
            style={{ border: `2px solid hsl(var(--repack-border))` }}
          />
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="repack-case-study-card flex gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `hsl(var(--repack-accent) / 0.2)` }}>
                <feature.icon className="w-5 h-5" style={{ color: `hsl(var(--repack-stat-highlight))` }} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-first design with second mockup */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-5 rounded" style={{ background: `hsl(var(--repack-stat-highlight))` }} />
            <span className="text-sm" style={{ color: `hsl(var(--repack-muted-foreground))` }}>Mobile-First Design</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: `var(--repack-font-display)` }}>
            Optimized for Every Screen
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <p className="leading-relaxed" style={{ color: `hsl(var(--repack-muted-foreground))` }}>
              With over 65% of return requests initiated on mobile devices, we designed the experience to be seamless on smaller screens. Large touch targets, simplified navigation, and camera integration for QR codes make mobile returns effortless.
            </p>
            <ul className="space-y-2">
              {[
                "Touch-optimized interface",
                "Camera integration for scanning",
                "Offline-capable label storage",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(--repack-stat-highlight))` }} />
                  <span style={{ color: `hsl(var(--repack-muted-foreground))` }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Completed Returns View */}
        <div className="mt-12 flex flex-col items-center">
          <img 
            src="/repack-completed-view.png" 
            alt="RePack Completed Returns View" 
            className="w-full max-w-4xl rounded-lg shadow-lg" 
            style={{ border: `2px solid hsl(var(--repack-border))` }}
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
