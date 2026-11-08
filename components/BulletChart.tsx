interface BulletChartProps {
  label: string;
  value: number;
  target: number;
  ranges: {
    poor: number;
    fair: number;
    good: number;
  };
  unit?: string;
  sourcePages?: number[];
  isCalculated?: boolean;
  className?: string;
}

export default function BulletChart({
  label,
  value,
  target,
  ranges,
  sourcePages,
  isCalculated = false,
  className = "",
}: BulletChartProps) {
  const maxValue = Math.max(ranges.good, value, target) * 1.1;

  const poorPct = (ranges.poor / maxValue) * 100;
  const fairPct = ((ranges.fair - ranges.poor) / maxValue) * 100;
  const goodPct = ((ranges.good - ranges.fair) / maxValue) * 100;
  const valuePct = Math.min((value / maxValue) * 100, 100);
  const targetPct = Math.min((target / maxValue) * 100, 100);

  const formatValue = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium text-foreground truncate">{label}</span>
        <div className="flex items-baseline gap-3 flex-shrink-0">
          <span className="font-mono text-muted-foreground whitespace-nowrap">
            {formatValue(value)}
          </span>
          {target > 0 && (
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Target: {formatValue(target)}
            </span>
          )}
          {isCalculated && (
            <span className="text-xs text-muted-foreground">(calculated)</span>
          )}
        </div>
      </div>

      {/* Bullet Chart Visualization */}
      <div className="bullet-chart" role="img" aria-label={`${label}: ${formatValue(value)} of ${formatValue(target)} target`}>
        {/* Qualitative ranges */}
        <div className="bullet-chart__range bg-rose-100 dark:bg-rose-900/30 rounded" style={{ width: `${poorPct}%` }} />
        <div
          className="bullet-chart__range bg-amber-100 dark:bg-amber-900/30 rounded"
          style={{ width: `${fairPct}%`, left: `${poorPct}%` }}
        />
        <div
          className="bullet-chart__range bg-emerald-100 dark:bg-emerald-900/30 rounded"
          style={{ width: `${goodPct}%`, left: `${poorPct + fairPct}%` }}
        />

        {/* Actual value bar */}
        <div
          className="bullet-chart__measure"
          style={{ width: `${valuePct}%` }}
        />

        {/* Target marker */}
        {target > 0 && (
          <div
            className="bullet-chart__target"
            style={{ left: `${targetPct}%` }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-rose-100 dark:bg-rose-900/30" />
          <span>Poor</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/30" />
          <span>Fair</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-emerald-100 dark:bg-emerald-900/30" />
          <span>Good</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-0.5 bg-primary" />
          <span>Actual</span>
        </div>
        {target > 0 && (
          <div className="flex items-center gap-1">
            <span className="w-4 h-0.5 border-t-2 border-foreground" />
            <span>Target</span>
          </div>
        )}
      </div>

      {sourcePages && sourcePages.length > 0 && (
        <p className="text-xs text-muted-foreground flex flex-wrap gap-2">
          Source:
          {sourcePages.map((page) => (
            <a
              key={page}
              href={`/source/2026-27-final-general-fund-budget.pdf#page=${page}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors duration-200"
            >
              p. {page}
            </a>
          ))}
        </p>
      )}
    </div>
  );
}