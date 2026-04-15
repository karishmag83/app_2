import { useState } from 'react';
import { Check, Image, FileText, X } from 'lucide-react';

interface AssetItem {
  id: string;
  name: string;
  section: string;
  type: 'image' | 'document';
  status: 'provided' | 'needed';
  instructions?: string;
}

const assets: AssetItem[] = [
  { id: '1', name: 'Logo (transparent PNG)', section: 'Hero', type: 'image', status: 'provided' },
  { id: '2', name: 'Hero background image', section: 'Hero', type: 'image', status: 'provided' },
  { id: '3', name: 'Telehealth couple image', section: 'About', type: 'image', status: 'provided' },
  { id: '4', name: 'Clinician consultation image', section: 'Services', type: 'image', status: 'provided' },
  { id: '5', name: 'IA mindmap artifact', section: 'IA Section', type: 'image', status: 'provided' },
  { id: '6', name: 'User flow diagram', section: 'IA Section', type: 'image', status: 'provided' },
  { id: '7', name: 'Low-fi wireframe', section: 'Wireframes', type: 'image', status: 'provided' },
  { id: '8', name: 'Homepage full screenshot', section: 'UI Design', type: 'image', status: 'needed', instructions: 'Full-page screenshot at 1440px width' },
  { id: '9', name: 'About page screenshot', section: 'UI Design', type: 'image', status: 'needed', instructions: 'Full-page screenshot showing team section' },
  { id: '10', name: 'Services page screenshot', section: 'UI Design', type: 'image', status: 'needed', instructions: 'Include service cards and CTA' },
  { id: '11', name: 'Contact page screenshot', section: 'UI Design', type: 'image', status: 'needed', instructions: 'Show form in viewport' },
  { id: '12', name: 'Brand guidelines PDF', section: 'Branding', type: 'document', status: 'needed', instructions: 'Export from your brand kit' },
  { id: '13', name: 'Presentation deck', section: 'Branding', type: 'document', status: 'needed', instructions: 'Client-facing proposal or pitch deck' },
];

export const AssetChecklist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const providedCount = assets.filter((a) => a.status === 'provided').length;
  const totalCount = assets.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[80vh] bg-background rounded-2xl shadow-elevated-xl overflow-hidden animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Asset Checklist</h3>
            <p className="text-sm text-muted-foreground">{providedCount} of {totalCount} assets ready</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] divide-y divide-border">
          {assets.map((asset) => (
            <div key={asset.id} className="p-4 flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  asset.status === 'provided' ? 'bg-green-100' : 'bg-amber-100'
                }`}
              >
                {asset.status === 'provided' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : asset.type === 'image' ? (
                  <Image className="w-5 h-5 text-amber-600" />
                ) : (
                  <FileText className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{asset.name}</span>
                  <span className="chip-muted text-xs">{asset.section}</span>
                </div>
                {asset.instructions && (
                  <p className="text-sm text-muted-foreground mt-1">{asset.instructions}</p>
                )}
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  asset.status === 'provided'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {asset.status === 'provided' ? 'Ready' : 'Needed'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
