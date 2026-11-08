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
        <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{label}</span>
        <div className="flex items-baseline gap-3 flex-shrink-0">
          <span className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
            {formattedValue}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            {percentage.toFixed(1)}%
            {isCalculated && <span className="ml-1 text-xs text-zinc-400">(calculated)</span>}
          </span>
        </div>
      </div>
      <div className="relative h-6 bg-zinc-100 dark:bg-zinc-800 rounded overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 flex flex-wrap gap-2">
        Source:
        {sourcePages.map((page) => (
          <a
            key={page}
            href={`/source/2026-27-final-general-fund-budget.pdf#page=${page}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary dark:hover:text-primary/80"
          >
            p. {page}
          </a>
        ))}
      </p>
      {subItems && subItems.length > 0 && (
        <details className="group mt-2">
          <summary className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary/80 font-medium select-none">
            Show detail ({subItems.length} items)
          </summary>
          <div className="mt-2 space-y-2 ml-4 border-l border-zinc-200 dark:border-zinc-700 pl-4">
            {subItems
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate">
                      {item.label}
                    </span>
                    <div className="flex items-baseline gap-2 flex-shrink-0">
                      <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(item.value)}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                        {total > 0
                          ? `${((item.value / total) * 100).toFixed(1)}%`
                          : "0%"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 flex flex-wrap gap-2">
                    Source:
                    {item.sourcePages.map((page) => (
                      <a
                        key={page}
                        href={`/source/2026-27-final-general-fund-budget.pdf#page=${page}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary dark:hover:text-primary/80"
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