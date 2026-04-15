import { Mic } from 'lucide-react';

const script = `"I led the end-to-end design and frontend build for Restoration Medicine, a telehealth practice specializing in pelvic health.

The challenge was building trust for a sensitive topic while keeping the user journey frictionless.

I conducted stakeholder research, mapped information architecture, iterated on wireframes, and built a fully responsive Wix site with SEO and accessibility baked in.

The result was a professional, calming digital presence that reduced contact friction and established immediate credibility for the practice."`;

export const InterviewScript = () => {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Mic className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">30-Second Interview Script</h4>
          </div>
        </div>
      </div>
      <div className="p-6">
        <blockquote className="text-foreground leading-relaxed whitespace-pre-line">
          {script}
        </blockquote>
      </div>
    </div>
  );
};
