interface HorizontalBarProps {
  label: string;
  value: number;
  total: number;
  sourcePages: number[];
  subItems?: Array<{ label: string; value: number; sourcePages: number[] }>;
  isCalculated?: boolean;
  barColor?: string;
}

export default function HorizontalBar({
  label,
  value,
  total,
  sourcePages,
  subItems,
  isCalculated = false,
  barColor = "bg-primary",
}: HorizontalBarProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium text-foreground truncate">{label}</span>
        <div className="flex items-baseline gap-3 flex-shrink-0">
          <span className="font-mono text-muted-foreground whitespace-nowrap">
            {formattedValue}
          </span>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {percentage.toFixed(1)}%
            {isCalculated && <span className="ml-1 text-xs text-muted-foreground">(calculated)</span>}
          </span>
        </div>
      </div>
      <div className="relative h-6 bg-muted rounded overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
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
      {subItems && subItems.length > 0 && (
        <details className="group mt-2">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-primary font-medium select-none transition-colors duration-200">
            Show detail ({subItems.length} items)
          </summary>
          <div className="mt-2 space-y-2 ml-4 border-l border-border pl-4">
            {subItems
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-muted-foreground truncate">
                      {item.label}
                    </span>
                    <div className="flex items-baseline gap-2 flex-shrink-0">
                      <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(item.value)}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {total > 0
                          ? `${((item.value / total) * 100).toFixed(1)}%`
                          : "0%"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground flex flex-wrap gap-2">
                    Source:
                    {item.sourcePages.map((page) => (
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
                </div>
              ))}
          </div>
        </details>
      )}
    </div>
  );
}