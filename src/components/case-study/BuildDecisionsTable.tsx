const decisions = [
  {
    requirement: 'Modular, editable sections',
    approach: 'Wix Sections with reusable strips',
    tradeoff: 'Less custom flexibility vs. full React',
    outcome: 'Client can update text/images without dev help',
  },
  {
    requirement: 'Responsive across devices',
    approach: 'Wix mobile editor + breakpoint adjustments',
    tradeoff: 'Manual mobile tweaks required',
    outcome: '100% mobile-friendly, tested on iOS/Android',
  },
  {
    requirement: 'Contact form with validation',
    approach: 'Wix Forms with required fields + success message',
    tradeoff: 'Limited custom validation logic',
    outcome: 'Captures leads reliably, notifications to client',
  },
  {
    requirement: 'Custom domain setup',
    approach: 'GoDaddy DNS → Wix domain connection',
    tradeoff: 'DNS propagation wait time',
    outcome: 'Professional URL, SSL auto-provisioned',
  },
  {
    requirement: 'SEO fundamentals',
    approach: 'Meta titles, descriptions, heading structure, alt text',
    tradeoff: 'Wix SEO tools vs. full control',
    outcome: 'Indexed on Google, local search visibility',
  },
];

export const BuildDecisionsTable = () => {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="p-4 font-semibold text-foreground">Requirement</th>
              <th className="p-4 font-semibold text-foreground">Wix Approach</th>
              <th className="p-4 font-semibold text-foreground">Tradeoff</th>
              <th className="p-4 font-semibold text-foreground">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {decisions.map((row, index) => (
              <tr key={index} className="hover:bg-muted/30 transition-colors">
                <td className="p-4 text-sm text-foreground font-medium">{row.requirement}</td>
                <td className="p-4 text-sm text-muted-foreground">{row.approach}</td>
                <td className="p-4 text-sm text-muted-foreground">{row.tradeoff}</td>
                <td className="p-4 text-sm text-accent">{row.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
