import { formatDollars } from "@/lib/budget";

interface StatCardProps {
  label: string;
  value: number;
  sourcePages: number[];
  color?: "default" | "red" | "green";
  isCalculated?: boolean;
}

export default function StatCard({ label, value, sourcePages, color = "default", isCalculated = false }: StatCardProps) {
  const formattedValue = formatDollars(value);

  const valueColor = color === "red" ? "text-red-600 dark:text-red-400" : color === "green" ? "text-green-600 dark:text-green-400" : "text-foreground";

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-sm transition-shadow duration-200 hover:shadow-md">
      <dt className="text-sm text-muted-foreground mb-1">{label}</dt>
      <dd className={`text-3xl font-semibold ${valueColor}`}>
        {formattedValue}
        {isCalculated && <span className="ml-2 text-xs text-muted-foreground font-normal">(calculated)</span>}
      </dd>
      <dd className="text-xs text-muted-foreground mt-1">
        Source:{sourcePages.map((p) => (
          <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1 hover:text-primary transition-colors duration-200">p. {p}</a>
        ))}
      </dd>
    </div>
  );
}