import { BarChart3, MousePointerClick, Scroll, Users, FileText } from 'lucide-react';

const events = [
  {
    icon: MousePointerClick,
    event: 'cta_click',
    description: 'Primary CTA button clicks (Contact, Schedule)',
    parameters: 'button_text, page_location',
  },
  {
    icon: FileText,
    event: 'contact_form_submit',
    description: 'Successful contact form submissions',
    parameters: 'form_type, referrer',
  },
  {
    icon: Scroll,
    event: 'scroll_depth',
    description: 'Scroll milestones (25%, 50%, 75%, 100%)',
    parameters: 'page_path, depth_threshold',
  },
  {
    icon: Users,
    event: 'clinician_page_view',
    description: 'Clicks to individual clinician profiles',
    parameters: 'clinician_name, source_page',
  },
  {
    icon: BarChart3,
    event: 'nav_usage',
    description: 'Navigation menu interactions',
    parameters: 'menu_item, device_type',
  },
];

export const MeasurementPlan = () => {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30">
        <h4 className="font-semibold text-foreground">GA4 Measurement Plan</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Recommended custom events for tracking success metrics
        </p>
      </div>
      <div className="divide-y divide-border">
        {events.map((item) => (
          <div key={item.event} className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <code className="text-sm font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
                {item.event}
              </code>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                <span className="font-medium">Params:</span> {item.parameters}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
