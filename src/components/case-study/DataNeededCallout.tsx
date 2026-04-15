import { FileQuestion } from 'lucide-react';

interface DataNeededCalloutProps {
  title: string;
  description: string;
}

export const DataNeededCallout = ({ title, description }: DataNeededCalloutProps) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
      <FileQuestion className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-amber-900">{title}</h4>
        <p className="text-sm text-amber-700 mt-1">{description}</p>
      </div>
    </div>
  );
};
