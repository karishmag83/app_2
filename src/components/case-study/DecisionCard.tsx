import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react';

interface DecisionCardProps {
  number: number;
  problem: string;
  options: string[];
  choice: string;
  rationale: string;
  impact: string;
}

export const DecisionCard = ({ number, problem, options, choice, rationale, impact }: DecisionCardProps) => {
  return (
    <div className="decision-card">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Decision Log
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Problem</span>
            <p className="text-foreground">{problem}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Options Considered</span>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Choice</span>
            <p className="text-foreground font-medium">{choice}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rationale</span>
          <p className="text-sm text-muted-foreground mt-1">{rationale}</p>
        </div>

        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Impact</span>
            <p className="text-sm text-foreground">{impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
