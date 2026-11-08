"use client";

import Link from "next/link";
import { getBudget, formatDollars, formatPct } from "@/lib/budget";
import SmoothTab from "@/components/kokonutui/smooth-tab";
import DynamicText from "@/components/kokonutui/dynamic-text";
import BentoGrid from "@/components/kokonutui/bento-grid";
import BulletChart from "@/components/BulletChart";
import { TrendingUp, Users, Home, Building2, ArrowUpRight, PiggyBank, Shield, BookOpen, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const data = getBudget("2026-27");
  const { totals, revenue, expenditures, taxes, derived_not_printed_in_document } = data;

  const totalExpenditures = totals.total_expenditures.value;
  const totalRevenues = totals.total_revenues.value;
  const spendingMinusRevenue = totalExpenditures - totalRevenues;
  const beginningBalance = totals.beginning_fund_balance_available.value;
  const endingUnassignedBalance = totals.ending_unassigned_fund_balance.value;
  const endingUnassignedPct = totals.ending_unassigned_fund_balance_pct_of_expenditures.value;

  const localRevenue = revenue.by_source.local.value;
  const stateRevenue = revenue.by_source.state.value;
  const federalRevenue = revenue.by_source.federal.value;

  const instructionSpending = expenditures.major_groups["1000 Instruction"];
  const supportServicesSpending = expenditures.major_groups["2000 Support services"];
  const instructionPct = ((instructionSpending / totalExpenditures) * 100);
  const supportServicesPct = ((supportServicesSpending / totalExpenditures) * 100);

  const tabs = [
    {
      id: "money-in",
      title: "Money In",
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Where the money comes from</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Total revenue: {formatDollars(totalRevenues)}. Local taxes (77.4%), state aid (22.1%), federal grants (0.5%).
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-700 dark:text-zinc-300">Local</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(localRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-700 dark:text-zinc-300">State</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(stateRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-700 dark:text-zinc-300">Federal</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(federalRevenue)}</span>
            </div>
          </div>
          <Link href="/money-in" className="text-sm text-zinc-600 dark:text-zinc-400 underline hover:text-zinc-900 dark:hover:text-zinc-100">
            Full breakdown →
          </Link>
        </div>
      ),
    },
    {
      id: "money-out",
      title: "Money Out",
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Where the money goes</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Total expenditures: {formatDollars(totalExpenditures)}. Instruction (63%), support services (28.7%), other (8.3%).
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-700 dark:text-zinc-300">Instruction</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(instructionSpending)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-700 dark:text-zinc-300">Support Services</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(supportServicesSpending)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-700 dark:text-zinc-300">Other / Financing</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(expenditures.major_groups["5000 Other expenditures and financing uses"])}</span>
            </div>
          </div>
          <Link href="/money-out" className="text-sm text-zinc-600 dark:text-zinc-400 underline hover:text-zinc-900 dark:hover:text-zinc-100">
            Full breakdown →
          </Link>
        </div>
      ),
    },
    {
      id: "taxes",
      title: "Taxes",
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Property tax rate</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Millage increases from {taxes.real_estate_mills_2025_26_rebalanced.toFixed(4)} to{" "}
            {taxes.real_estate_mills_2026_27.toFixed(4)} mills (+{taxes.real_estate_rate_change_pct}%).
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Median homestead (after $300 exclusion): est. {formatDollars(taxes.median_assessed_value_homestead - taxes.assessed_value_exclusion_per_homestead)} taxable.
          </p>
          <Link href="/taxes" className="text-sm text-zinc-600 dark:text-zinc-400 underline hover:text-zinc-900 dark:hover:text-zinc-100">
            Calculator & details →
          </Link>
        </div>
      ),
    },
  ];

  // Bullet Chart KPIs for key metrics
  const kpiCharts = [
    {
      label: "Fund Balance (% of Expenditures)",
      value: endingUnassignedPct,
      target: 8, // Common guideline
      ranges: { poor: 0, fair: 5, good: 15 },
      unit: "%",
      sourcePages: totals.ending_unassigned_fund_balance.pages,
      isCalculated: true,
    },
    {
      label: "Instruction Spending (% of Total)",
      value: instructionPct,
      target: 60, // Target minimum
      ranges: { poor: 0, fair: 50, good: 70 },
      unit: "%",
      sourcePages: expenditures.summary_pages,
      isCalculated: true,
    },
    {
      label: "Revenue Coverage Ratio",
      value: ((totalRevenues / totalExpenditures) * 100),
      target: 100,
      ranges: { poor: 70, fair: 90, good: 110 },
      unit: "%",
      sourcePages: [totals.total_revenues.pages[0], totals.total_expenditures.pages[0]],
      isCalculated: true,
    },
    {
      label: "Tax Rate Increase",
      value: taxes.real_estate_rate_change_pct,
      target: taxes.act_1_index_pct,
      ranges: { poor: 0, fair: taxes.act_1_index_pct * 0.5, good: taxes.act_1_index_pct * 1.5 },
      unit: "%",
      sourcePages: taxes.pages,
      isCalculated: true,
    },
  ];

  // BentoGrid widgets with budget data
  const budgetWidgets = [
    {
      id: "total-expenditures",
      title: "Total Expenditures",
      icon: <Building2 className="size-5" />,
      defaultSpan: 3,
      render: (size: "s" | "m" | "l") => (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">2026–27 Budget</p>
            <p className={cn(
              "font-mono font-semibold tracking-tight",
              size === "s" ? "text-2xl" : size === "m" ? "text-3xl" : "text-4xl"
            )}>
              {formatDollars(totalExpenditures)}
            </p>
          </div>
          {size !== "s" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Source: p. {totals.total_expenditures.pages[0]}
            </p>
          )}
        </div>
      ),
    },
    {
      id: "total-revenues",
      title: "Total Revenues",
      icon: <TrendingUp className="size-5" />,
      defaultSpan: 3,
      render: (size: "s" | "m" | "l") => (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">2026–27 Revenue</p>
            <p className={cn(
              "font-mono font-semibold tracking-tight",
              size === "s" ? "text-2xl" : size === "m" ? "text-3xl" : "text-4xl"
            )}>
              {formatDollars(totalRevenues)}
            </p>
          </div>
          {size !== "s" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Local {((localRevenue / totalRevenues) * 100).toFixed(1)}% · State {((stateRevenue / totalRevenues) * 100).toFixed(1)}% · Federal {((federalRevenue / totalRevenues) * 100).toFixed(1)}%
            </p>
          )}
        </div>
      ),
    },
    {
      id: "fund-balance",
      title: "Ending Fund Balance",
      icon: <PiggyBank className="size-5" />,
      defaultSpan: 3,
      render: (size: "s" | "m" | "l") => (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Unassigned (projected)</p>
            <p className={cn(
              "font-mono font-semibold tracking-tight text-emerald-600 dark:text-emerald-400",
              size === "s" ? "text-2xl" : size === "m" ? "text-3xl" : "text-4xl"
            )}>
              {formatDollars(endingUnassignedBalance)}
            </p>
          </div>
          {size !== "s" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {endingUnassignedPct}% of expenditures · {formatDollars(beginningBalance)} starting balance
            </p>
          )}
        </div>
      ),
    },
    {
      id: "shortfall",
      title: "Budget Shortfall",
      icon: <ArrowUpRight className="size-5" />,
      defaultSpan: 3,
      render: (size: "s" | "m" | "l") => (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Spending − Revenue</p>
            <p className={cn(
              "font-mono font-semibold tracking-tight text-rose-600 dark:text-rose-400",
              size === "s" ? "text-2xl" : size === "m" ? "text-3xl" : "text-4xl"
            )}>
              {formatDollars(spendingMinusRevenue)}
            </p>
          </div>
          {size !== "s" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Drawn from fund balance (calculated)
            </p>
          )}
        </div>
      ),
    },
    {
      id: "instruction-share",
      title: "Instruction Share",
      icon: <Users className="size-5" />,
      defaultSpan: 2,
      render: (size: "s" | "m" | "l") => (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Of total spending</p>
            <p className={cn(
              "font-mono font-semibold tracking-tight text-blue-600 dark:text-blue-400",
              size === "s" ? "text-2xl" : size === "m" ? "text-3xl" : "text-4xl"
            )}>
              {instructionPct.toFixed(1)}%
            </p>
          </div>
          {size !== "s" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {formatDollars(instructionSpending)} of {formatDollars(totalExpenditures)}
            </p>
          )}
        </div>
      ),
    },
    {
      id: "tax-rate",
      title: "Real Estate Millage",
      icon: <Home className="size-5" />,
      defaultSpan: 2,
      render: (size: "s" | "m" | "l") => (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">2026–27 Adopted</p>
            <p className={cn(
              "font-mono font-semibold tracking-tight text-violet-600 dark:text-violet-400",
              size === "s" ? "text-2xl" : size === "m" ? "text-3xl" : "text-4xl"
            )}>
              {taxes.real_estate_mills_2026_27.toFixed(4)} mills
            </p>
          </div>
          {size !== "s" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +{taxes.real_estate_rate_change_pct}% vs prior year (Act 1 index)
            </p>
          )}
        </div>
      ),
    },
    {
      id: "homestead-example",
      title: "Median Homestead Tax",
      icon: <Shield className="size-5" />,
      defaultSpan: 2,
      render: (size: "s" | "m" | "l") => (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">After $300 exclusion</p>
            <p className={cn(
              "font-mono font-semibold tracking-tight text-amber-600 dark:text-amber-400",
              size === "s" ? "text-2xl" : size === "m" ? "text-3xl" : "text-4xl"
            )}>
              {formatDollars(derived_not_printed_in_document.median_homestead_example.tax_2026_27_approx)}
            </p>
          </div>
          {size !== "s" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Was {formatDollars(derived_not_printed_in_document.median_homestead_example.tax_2025_26_approx)} in 2025–26 (calculated)
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Hero Section - Minimal & Direct pattern for government transparency */}
      <section
        id="main-content"
        className="relative min-h-[400px] sm:min-h-[500px] rounded-3xl overflow-hidden bg-gradient-hero border border-zinc-200/50 dark:border-zinc-800/50"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5" />
        <div className="relative z-10 flex min-h-[400px] sm:min-h-[500px] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary-foreground">
                <BookOpen className="size-3" />
                Independent Analysis
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">·</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">2026–27 Fiscal Year</span>
            </div>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight"
            >
              Council Rock School District Budget
              <br />
              <DynamicText
                mode="cycle"
                words={[
                  "Explained Clearly",
                  "Made Transparent",
                  "Easy to Understand",
                  "By the Numbers",
                ]}
                interval={2500}
                className="text-gradient"
              />
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              An independent, unofficial explanation of the Final General Fund Budget adopted June 18, 2026.
              <br />
              <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">
                Not affiliated with or endorsed by the district.
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/money-in"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <TrendingUp className="size-4" />
                Explore Revenue
              </Link>
              <Link
                href="/money-out"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Building2 className="size-4" />
                Explore Spending
              </Link>
              <Link
                href="/taxes"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Calculator className="size-4" />
                Tax Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Performance Indicators - Bullet Charts */}
      <section className="space-y-6" aria-labelledby="kpi-heading">
        <div className="flex items-center justify-between">
          <h2 id="kpi-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Key Performance Indicators</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Benchmarked against common guidelines</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCharts.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 hover:shadow-md transition-shadow"
            >
              <BulletChart {...kpi} />
            </div>
          ))}
        </div>
      </section>

      {/* Key Metrics Dashboard using BentoGrid */}
      <section className="space-y-4" aria-labelledby="dashboard-heading">
        <div className="flex items-center justify-between">
          <h2 id="dashboard-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Key Metrics Dashboard</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Drag to reorder · Drag bottom-right to resize</p>
        </div>
        <BentoGrid items={budgetWidgets} rowHeight={160} />
      </section>

      {/* Three Things to Know */}
      <section className="space-y-4" aria-labelledby="three-things-heading">
        <h2 id="three-things-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Three Things to Know</h2>
        <div className="space-y-4">
          <article className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  The district plans to spend about $5.6 million more than it takes in.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Expenditures are {formatDollars(totalExpenditures)} but revenues are only {formatDollars(totalRevenues)}.
                  The difference will come from the district&rsquo;s fund balance (savings), which starts the year at
                  {formatDollars(beginningBalance)}. Even after the drawdown, the projected ending unassigned fund balance
                  is {formatDollars(endingUnassignedBalance)} ({endingUnassignedPct}% of expenditures).
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  Sources: pp. 2, 5, 13, 17, 26
                </p>
              </div>
            </div>
          </article>

          <article className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Property taxes are going up 3.5%.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The real estate millage rate increases from {taxes.real_estate_mills_2025_26_rebalanced.toFixed(4)} mills to
                  {taxes.real_estate_mills_2026_27.toFixed(4)} mills — a {taxes.real_estate_rate_change_pct}% increase, matching
                  the state&rsquo;s Act 1 index. For a median homestead assessed at {formatDollars(taxes.median_assessed_value_homestead)},
                  the estimated tax bill rises from about
                  {formatDollars(derived_not_printed_in_document.median_homestead_example.tax_2025_26_approx)} to
                  {formatDollars(derived_not_printed_in_document.median_homestead_example.tax_2026_27_approx)} (before the $300 homestead exclusion).
                  Other local taxes (earned income, occupation, real estate transfer, local services) stay the same.
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  Sources: pp. 8–12
                </p>
              </div>
            </div>
          </article>

          <article className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Two-thirds of spending goes to instruction.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Of the {formatDollars(totalExpenditures)} budget, {formatDollars(instructionSpending)} ({formatPct(instructionPct)} of spending) goes to
                  instruction — regular programs, special education, vocational education, and other instructional programs.
                  Support services (transportation, facilities, administration, etc.) take {formatDollars(supportServicesSpending)} ({formatPct(supportServicesPct)}).
                  Debt service and interfund transfers account for {formatDollars(expenditures.major_groups["5000 Other expenditures and financing uses"])} (6.9%).
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  Sources: pp. 13–17. Percentages are calculated.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Explore the Budget */}
      <section className="space-y-4" aria-labelledby="explore-heading">
        <h2 id="explore-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Explore the Budget</h2>
        <SmoothTab items={tabs} label="Budget sections" defaultTabId="money-in" />
      </section>

      {/* Why This Site Exists */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 sm:p-8" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Why This Site Exists</h2>
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            School district budgets are public documents, but they&rsquo;re often difficult to navigate — hundreds of pages of
            line items, scanned PDFs with no searchable text, and jargon that obscures what matters to families and taxpayers.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            This site was built to change that. It takes the Council Rock School District&rsquo;s 2026–27 General Fund Budget
            and presents it in a way that answers the questions people actually have:
          </p>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 pl-6 list-disc mb-4">
            <li>How much is the district spending, and on what?</li>
            <li>Where does the money come from?</li>
            <li>How much will my property taxes change?</li>
            <li>Is the district financially healthy?</li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            Every number here comes directly from the official budget document. Source citations link to specific PDF pages
            so you can verify anything yourself. Calculated figures are clearly labeled. There&rsquo;s no agenda — just the numbers,
            explained clearly.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <strong>Data source:</strong>{" "}
            <a href={data.meta.source_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              {data.meta.document}
            </a>
            {" | Retrieved "}
            {data.meta.retrieved}
          </p>
        </div>
      </section>
    </div>
  );
}