import { getBudget, formatDollars, formatPct } from "@/lib/budget";
import HorizontalBar from "@/components/HorizontalBar";
import { TrendingUp, Building2, DollarSign } from "lucide-react";

export default function MoneyInPage() {
  const data = getBudget("2026-27");
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
      <a href="#money-in-content" className="skip-link">
        Skip to main content
      </a>

      <header id="money-in-content" className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
          <TrendingUp className="text-primary" />
          Money In: Revenue
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Total revenue for 2026–27: {formatDollars(totalRevenue)}. Most comes from local property and earned income taxes.
        </p>
      </header>

      {/* Revenue Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-labelledby="revenue-summary-heading">
        <h2 id="revenue-summary-heading" className="sr-only">Revenue Summary</h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="size-5 text-primary" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Local Revenue</h3>
          </div>
          <p className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{formatDollars(localTotal)}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {formatPct((localTotal / totalRevenue) * 100)} of total
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 border-l-4 border-chart-2">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="size-5 text-chart-2" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">State Revenue</h3>
          </div>
          <p className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{formatDollars(stateTotal)}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {formatPct((stateTotal / totalRevenue) * 100)} of total
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 border-l-4 border-chart-3">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-5 text-chart-3" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Federal Revenue</h3>
          </div>
          <p className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{formatDollars(federalTotal)}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {formatPct((federalTotal / totalRevenue) * 100)} of total
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="by-source-heading">
        <h2 id="by-source-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          By Source (Horizontal Bars)
        </h2>
        <div className="space-y-6">
          <HorizontalBar
            label="Local Revenue"
            value={localTotal}
            total={totalRevenue}
            sourcePages={revenue.by_source.local.pages}
            subItems={localItems}
            barColor="bg-primary"
          />
          <HorizontalBar
            label="State Revenue"
            value={stateTotal}
            total={totalRevenue}
            sourcePages={revenue.by_source.state.pages}
            subItems={stateItems}
            barColor="bg-chart-2"
          />
          <HorizontalBar
            label="Federal Revenue"
            value={federalTotal}
            total={totalRevenue}
            sourcePages={revenue.by_source.federal.pages}
            subItems={federalItems}
            barColor="bg-chart-3"
          />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Percentages of total revenue: Local {formatPct((localTotal / totalRevenue) * 100)}, State
          {formatPct((stateTotal / totalRevenue) * 100)}, Federal {formatPct((federalTotal / totalRevenue) * 100)}.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="local-detail-heading">
        <h2 id="local-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Building2 className="text-primary" />
          Local Revenue Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Local revenue totals {formatDollars(localTotal)} ({formatPct((localTotal / totalRevenue) * 100)} of all revenue).
        </p>
        <dl className="space-y-3">
          {localItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
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
        <h2 id="state-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Building2 className="text-chart-2" />
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
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 hover:border-chart-2/30 dark:hover:border-chart-2/30 transition-colors">
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
        <h2 id="federal-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <DollarSign className="text-chart-3" />
          Federal Revenue Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Federal revenue totals {formatDollars(federalTotal)} ({formatPct((federalTotal / totalRevenue) * 100)} of all revenue).
        </p>
        <dl className="space-y-3">
          {federalItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 hover:border-chart-3/30 dark:hover:border-chart-3/30 transition-colors">
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