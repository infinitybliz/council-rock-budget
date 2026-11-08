import Link from "next/link";
import { getBudgetData, formatDollars, getFirstSourceLink } from "@/lib/budget";

export default function HomePage() {
  const data = getBudgetData();
  const { totals, revenue, expenditures, taxes } = data;

  const totalExpenditures = totals.total_expenditures.value;
  const totalRevenues = totals.total_revenues.value;
  const spendingMinusRevenue = totalExpenditures - totalRevenues;
  const beginningBalance = totals.beginning_fund_balance_available.value;

  const localRevenue = revenue.by_source.local.value;
  const stateRevenue = revenue.by_source.state.value;
  const federalRevenue = revenue.by_source.federal.value;

  const instructionSpending = expenditures.major_groups["1000 Instruction"];
  const supportServicesSpending = expenditures.major_groups["2000 Support services"];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-100">
          Council Rock School District 2026–27 Budget
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          An independent, unofficial explanation of the Final General Fund Budget adopted June 18, 2026.
          <br />
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Not affiliated with or endorsed by the district.
          </span>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">The Total Budget at a Glance</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <dt className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Expenditures</dt>
            <dd className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {formatDollars(totalExpenditures)}
            </dd>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Source: <a href={getFirstSourceLink(totals.total_expenditures.pages)} target="_blank" rel="noopener noreferrer" className="underline">p. {totals.total_expenditures.pages[0]}</a>
            </dd>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <dt className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Revenues</dt>
            <dd className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {formatDollars(totalRevenues)}
            </dd>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Source: <a href={getFirstSourceLink(totals.total_revenues.pages)} target="_blank" rel="noopener noreferrer" className="underline">p. {totals.total_revenues.pages[0]}</a>
            </dd>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <dt className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Beginning Fund Balance</dt>
            <dd className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {formatDollars(beginningBalance)}
            </dd>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Source: <a href={getFirstSourceLink(totals.beginning_fund_balance_available.pages)} target="_blank" rel="noopener noreferrer" className="underline">p. {totals.beginning_fund_balance_available.pages[0]}</a>
            </dd>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <dt className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Shortfall (Spending − Revenue)</dt>
            <dd className="text-3xl font-semibold text-red-600 dark:text-red-400">
              {formatDollars(spendingMinusRevenue)}
            </dd>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Covered by fund balance. Source: calculated from p. 2, 5, 7, 13, 17
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Three Things to Know</h2>
        <div className="space-y-4">
          <article className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              1. The district plans to spend about $5.6 million more than it takes in.
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Expenditures are {formatDollars(totalExpenditures)} but revenues are only {formatDollars(totalRevenues)}.
              The difference will come from the district's fund balance (savings), which starts the year at
              {formatDollars(beginningBalance)}. Even after the drawdown, the projected ending unassigned fund balance
              is {formatDollars(totals.ending_unassigned_fund_balance.value)} ({totals.ending_unassigned_fund_balance_pct_of_expenditures.value}% of expenditures).
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Sources: pp. 2, 5, 13, 17, 26
            </p>
          </article>

          <article className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              2. Property taxes are going up 3.5%.
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              The real estate millage rate increases from {taxes.real_estate_mills_2025_26_rebalanced.toFixed(4)} mills to
              {taxes.real_estate_mills_2026_27.toFixed(4)} mills — a {taxes.real_estate_rate_change_pct}% increase, matching
              the state's Act 1 index. For a median homestead assessed at {formatDollars(taxes.median_assessed_value_homestead)},
              the estimated tax bill rises from about
              {formatDollars(data.derived_not_printed_in_document.median_homestead_example.tax_2025_26_approx)} to
              {formatDollars(data.derived_not_printed_in_document.median_homestead_example.tax_2026_27_approx)} (before the $300 homestead exclusion).
              Other local taxes (earned income, occupation, real estate transfer, local services) stay the same.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Sources: pp. 8–12
            </p>
          </article>

          <article className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              3. Two-thirds of spending goes to instruction.
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Of the {formatDollars(totalExpenditures)} budget, {formatDollars(instructionSpending)} (63%) goes to
              instruction — regular programs, special education, vocational education, and other instructional programs.
              Support services (transportation, facilities, administration, etc.) take {formatDollars(supportServicesSpending)} (28.7%).
              Debt service and interfund transfers account for {formatDollars(expenditures.major_groups["5000 Other expenditures and financing uses"])} (6.9%).
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Sources: pp. 13–17. Percentages are calculated.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Explore the Budget</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/money-in"
            className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Money In →</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Where the money comes from: local taxes (77.4%), state aid (22.1%), federal grants (0.5%).
              See the full breakdown by revenue code.
            </p>
          </Link>
          <Link
            href="/money-out"
            className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Money Out →</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Where the money goes: instruction (63%), support services (28.7%), non-instructional (1.3%),
              other/financing (6.9%). Drill down into each category.
            </p>
          </Link>
          <Link
            href="/taxes"
            className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Taxes →</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              What a mill means, the rate change for 2026–27, and an interactive calculator to estimate
              your tax bill with the homestead exclusion.
            </p>
          </Link>
          <Link
            href="/about"
            className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">About This Site →</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Source document details, methodology, and the questions this budget document cannot answer.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}