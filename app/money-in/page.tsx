import { getBudgetData, formatDollars, formatPct, getFirstSourceLink } from "@/lib/budget";
import HorizontalBar from "@/components/HorizontalBar";

export default function MoneyInPage() {
  const data = getBudgetData();
  const { revenue, totals } = data;

  const totalRevenue = totals.total_revenues.value;
  const localTotal = revenue.by_source.local.value;
  const stateTotal = revenue.by_source.state.value;
  const federalTotal = revenue.by_source.federal.value;

  const localItems = Object.entries(revenue.local_detail).map(([label, value]) => ({
    label,
    value,
    sourcePages: revenue.local_detail_pages,
  }));

  const stateItems = Object.entries(revenue.state_detail).map(([label, value]) => ({
    label,
    value,
    sourcePages: revenue.state_detail_pages,
  }));

  const federalItems = Object.entries(revenue.federal_detail).map(([label, value]) => ({
    label,
    value,
    sourcePages: revenue.federal_detail_pages,
  }));

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Money In: Revenue</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Total revenue for 2026–27: {formatDollars(totalRevenue)}. Most comes from local property and earned income taxes.
        </p>
      </header>

      <section className="space-y-6" aria-labelledby="by-source-heading">
        <h2 id="by-source-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          By Source
        </h2>
        <div className="space-y-6">
          <HorizontalBar
            label="Local Revenue"
            value={localTotal}
            total={totalRevenue}
            sourcePages={revenue.by_source.local.pages}
            subItems={localItems}
          />
          <HorizontalBar
            label="State Revenue"
            value={stateTotal}
            total={totalRevenue}
            sourcePages={revenue.by_source.state.pages}
            subItems={stateItems}
          />
          <HorizontalBar
            label="Federal Revenue"
            value={federalTotal}
            total={totalRevenue}
            sourcePages={revenue.by_source.federal.pages}
            subItems={federalItems}
          />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Percentages of total revenue: Local {formatPct((localTotal / totalRevenue) * 100)}, State
          {formatPct((stateTotal / totalRevenue) * 100)}, Federal {formatPct((federalTotal / totalRevenue) * 100)}.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="local-detail-heading">
        <h2 id="local-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Local Revenue Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Local revenue totals {formatDollars(localTotal)} ({formatPct((localTotal / totalRevenue) * 100)} of all revenue).
        </p>
        <dl className="space-y-3">
          {localItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</dt>
                  <dd className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {formatPct((item.value / totalRevenue) * 100)} of total revenue
                  </dd>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Source:{item.sourcePages.map((p) => (
                    <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1">p. {p}</a>
                  ))}
                </p>
              </div>
            ))}
        </dl>
      </section>

      <section className="space-y-4" aria-labelledby="state-detail-heading">
        <h2 id="state-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          State Revenue Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          State revenue totals {formatDollars(stateTotal)} ({formatPct((stateTotal / totalRevenue) * 100)} of all revenue).
          The largest items are the state share of retirement contributions and basic education funding.
        </p>
        <dl className="space-y-3">
          {stateItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</dt>
                  <dd className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {formatPct((item.value / totalRevenue) * 100)} of total revenue
                  </dd>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Source:{item.sourcePages.map((p) => (
                    <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1">p. {p}</a>
                  ))}
                </p>
              </div>
            ))}
        </dl>
      </section>

      <section className="space-y-4" aria-labelledby="federal-detail-heading">
        <h2 id="federal-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Federal Revenue Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Federal revenue totals {formatDollars(federalTotal)} ({formatPct((federalTotal / totalRevenue) * 100)} of all revenue).
        </p>
        <dl className="space-y-3">
          {federalItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</dt>
                  <dd className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {formatPct((item.value / totalRevenue) * 100)} of total revenue
                  </dd>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Source:{item.sourcePages.map((p) => (
                    <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1">p. {p}</a>
                  ))}
                </p>
              </div>
            ))}
        </dl>
      </section>
    </div>
  );
}