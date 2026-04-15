import { CheckCircle2, Eye, Keyboard, Palette, Type, AlertCircle } from 'lucide-react';

const accessibilityFeatures = [
  {
    icon: Palette,
    title: 'Contrast & Readability',
    implemented: [
      'Minimum 4.5:1 contrast ratio for body text',
      'Large text (headings) meets 3:1 ratio',
      'High contrast monospace font for financial data',
    ],
    recommendations: [
      'Add high-contrast mode toggle for users with low vision',
      'Test with color blindness simulators (already designed for)',
    ],
  },
  {
    icon: Eye,
    title: 'Non-Color Cues',
    implemented: [
      'Direction arrows (↑↓) accompany green/red values',
      'Plus/minus prefixes on all change values',
      'Icons differentiate card types beyond color',
    ],
    recommendations: [
      'Add pattern fills option for chart segments',
      'Ensure all status indicators have text alternatives',
    ],
  },
  {
    icon: Keyboard,
    title: 'Keyboard Navigation',
    implemented: [
      'All interactive elements focusable',
      'Logical tab order through dashboard',
      'Visible focus indicators on buttons and links',
    ],
    recommendations: [
      'Add keyboard shortcuts for common actions',
      'Implement skip-to-content link',
      'Ensure chart tooltips accessible via keyboard',
    ],
  },
  {
    icon: Type,
    title: 'Screen Reader Support',
    implemented: [
      'Semantic HTML structure (header, main, nav)',
      'Alt text for images and icons',
      'Aria-labels on interactive elements',
    ],
    recommendations: [
      'Add aria-describedby for complex charts',
      'Implement live regions for data updates',
      'Test with VoiceOver and NVDA',
    ],
  },
];

const trustCues = [
  {
    element: 'Data Freshness',
    implementation: '"Last updated: Just now" in sidebar footer',
    purpose: 'Users know data is current, not stale',
  },
  {
    element: 'Consistent Formatting',
    implementation: 'All currency shows $, commas, 2 decimals; all % shows sign + 2 decimals',
    purpose: 'Predictable format builds trust in accuracy',
  },
  {
    element: 'Direction Indicators',
    implementation: 'Green + ↑ for gains, Red + ↓ for losses, with explicit +/- signs',
    purpose: 'No ambiguity about positive vs negative',
  },
  {
    element: 'Units Always Visible',
    implementation: '$ prefix on values, % suffix on returns, labels on axes',
    purpose: 'Users never guess what the numbers mean',
  },
  {
    element: 'API Status',
    implementation: 'Settings page shows "Connected" status with explanation',
    purpose: 'Transparency about data source and reliability',
  },
];

export const AccessibilitySection = () => {
  return (
    <section id="accessibility" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 13</span>
      <h2 className="heading-section mb-4">Accessibility & FinTech Credibility</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        Financial tools must be accessible to all users and must establish trust 
        through consistent, transparent data presentation.
      </p>

      {/* Accessibility Features */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Accessibility Features</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {accessibilityFeatures.map(({ icon: Icon, title, implemented, recommendations }) => (
            <div key={title} className="card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">{title}</h4>
              </div>

              <div className="mb-4">
                <span className="label block mb-2 text-primary">Implemented</span>
                <ul className="space-y-2">
                  {implemented.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary/30 rounded-lg p-3">
                <span className="label block mb-2 text-warning">Recommendations</span>
                <ul className="space-y-1">
                  {recommendations.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Cues Table */}
      <div>
        <h3 className="heading-subsection mb-6">Trust Cues Recap</h3>
        <p className="body-regular mb-6 max-w-2xl">
          Building trust in financial data requires consistent, transparent 
          presentation. Here are the trust signals I implemented:
        </p>
        <div className="overflow-x-auto">
          <table className="table-fintech">
            <thead>
              <tr>
                <th>Trust Element</th>
                <th>Implementation</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {trustCues.map(({ element, implementation, purpose }) => (
                <tr key={element}>
                  <td className="font-medium text-foreground">{element}</td>
                  <td className="text-muted-foreground">{implementation}</td>
                  <td className="text-muted-foreground">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Color + Non-Color Example */}
      <div className="mt-12 card-highlight">
        <h3 className="heading-subsection mb-4">Color Independence Example</h3>
        <p className="body-regular mb-6">
          Financial values never rely solely on color to communicate direction:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <span className="label block mb-4">Positive Value</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">+$747.65</span>
              <span className="text-lg text-primary">(+0.57%)</span>
              <span className="text-primary">↑</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Green color + Plus sign + Percentage in parentheses + Arrow
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <span className="label block mb-4">Negative Value</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-destructive">-$1,234.56</span>
              <span className="text-lg text-destructive">(-1.71%)</span>
              <span className="text-destructive">↓</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Red color + Minus sign + Percentage in parentheses + Arrow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
