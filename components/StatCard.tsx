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

  const valueColor = color === "red" ? "text-red-600 dark:text-red-400" : color === "green" ? "text-green-600 dark:text-green-400" : "text-zinc-900 dark:text-zinc-100";

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
      <dt className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{label}</dt>
      <dd className={`text-3xl font-semibold ${valueColor}`}>
        {formattedValue}
        {isCalculated && <span className="ml-2 text-xs text-zinc-400 font-normal">(calculated)</span>}
      </dd>
      <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        Source:{sourcePages.map((p) => (
          <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1">p. {p}</a>
        ))}
      </dd>
    </div>
  );
}