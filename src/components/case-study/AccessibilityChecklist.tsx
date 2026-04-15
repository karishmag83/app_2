import { Check, X, AlertTriangle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  criterion: string;
  description: string;
  status: 'pass' | 'fail' | 'partial';
  notes?: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'contrast',
    criterion: 'Color Contrast (WCAG AA)',
    description: 'Text meets 4.5:1 ratio for normal text, 3:1 for large text',
    status: 'pass',
    notes: 'Navy (#193266) on white exceeds 10:1 ratio. All interactive elements verified.',
  },
  {
    id: 'headings',
    criterion: 'Heading Hierarchy',
    description: 'Proper H1-H6 structure without skipping levels',
    status: 'pass',
    notes: 'Single H1 per page, logical heading flow throughout.',
  },
  {
    id: 'keyboard',
    criterion: 'Keyboard Navigation',
    description: 'All interactive elements accessible via keyboard',
    status: 'pass',
    notes: 'Tab order follows visual layout. Focus states visible on all buttons and links.',
  },
  {
    id: 'forms',
    criterion: 'Form Labels & Errors',
    description: 'All inputs have associated labels; errors are announced',
    status: 'pass',
    notes: 'Contact form uses explicit labels. Error states use aria-describedby.',
  },
  {
    id: 'alt-text',
    criterion: 'Image Alt Text',
    description: 'Meaningful alt text for informative images; decorative images marked',
    status: 'partial',
    notes: 'Core images have alt text. Some decorative backgrounds need empty alt review.',
  },
  {
    id: 'tap-targets',
    criterion: 'Touch Targets (44×44px)',
    description: 'Interactive elements large enough for touch users',
    status: 'pass',
    notes: 'All buttons and links exceed minimum tap target size.',
  },
  {
    id: 'motion',
    criterion: 'Reduced Motion',
    description: 'Respects prefers-reduced-motion setting',
    status: 'partial',
    notes: 'Wix platform handles some defaults; added CSS where controllable.',
  },
];

export const AccessibilityChecklist = () => {
  const getStatusIcon = (status: 'pass' | 'fail' | 'partial') => {
    switch (status) {
      case 'pass':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <X className="w-5 h-5 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusLabel = (status: 'pass' | 'fail' | 'partial') => {
    switch (status) {
      case 'pass':
        return 'Pass';
      case 'fail':
        return 'Needs Work';
      case 'partial':
        return 'Partial';
    }
  };

  const passCount = checklistItems.filter((i) => i.status === 'pass').length;
  const totalCount = checklistItems.length;

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-foreground">Accessibility Audit</h4>
            <p className="text-sm text-muted-foreground">WCAG 2.1 Level AA compliance check</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{passCount}/{totalCount}</div>
            <span className="text-xs text-muted-foreground">Criteria passing</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {checklistItems.map((item) => (
          <div key={item.id} className="checklist-item">
            <div className="flex-shrink-0">{getStatusIcon(item.status)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-foreground">{item.criterion}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === 'pass'
                      ? 'bg-green-100 text-green-700'
                      : item.status === 'partial'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {getStatusLabel(item.status)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              {item.notes && (
                <p className="text-xs text-muted-foreground/80 mt-2 italic">{item.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
