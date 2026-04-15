import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | null;
  change?: number | null;
  changeLabel?: string;
  isPlaceholder?: boolean;
}

export const KPICard = ({ label, value, change, changeLabel, isPlaceholder }: KPICardProps) => {
  const getTrendIcon = () => {
    if (change === undefined || change === null) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === null) return 'text-muted-foreground';
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  if (isPlaceholder) {
    return (
      <div className="kpi-card relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="mt-2 text-2xl font-bold text-muted-foreground/50">—</div>
        <span className="text-xs text-amber-600 mt-1 block">Data pending</span>
      </div>
    );
  }

  return (
    <div className="kpi-card">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-2 text-3xl font-bold text-primary">{value}</div>
      {change !== undefined && change !== null && (
        <div className={`flex items-center justify-center gap-1 mt-2 text-sm ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{change > 0 ? '+' : ''}{change}%</span>
          {changeLabel && <span className="text-muted-foreground">({changeLabel})</span>}
        </div>
      )}
    </div>
  );
};
