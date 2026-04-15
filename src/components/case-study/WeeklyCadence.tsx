import { Calendar } from 'lucide-react';
import { Timeline } from './Timeline';

export const WeeklyCadence = () => {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-accent" />
        <h4 className="font-semibold text-foreground">My Weekly Cadence</h4>
      </div>
      <Timeline />
    </div>
  );
};
