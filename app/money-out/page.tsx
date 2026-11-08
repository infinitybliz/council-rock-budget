import { getBudget, formatDollars, formatPct } from "@/lib/budget";
import HorizontalBar from "@/components/HorizontalBar";
import SpendingRing from "@/components/kokonutui/spending-ring";

export default function MoneyOutPage() {
  const data = getBudget("2026-27");
  const { expenditures, totals } = data;

  const totalExpenditures = totals.total_expenditures.value;

  const majorGroups = [
    { key: "1000 Instruction", label: "Instruction", value: expenditures.major_groups["1000 Instruction"], pages: expenditures.summary_pages },
    { key: "2000 Support services", label: "Support Services", value: expenditures.major_groups["2000 Support services"], pages: expenditures.summary_pages },
    { key: "3000 Non-instructional services", label: "Non-Instructional Services", value: expenditures.major_groups["3000 Non-instructional services"], pages: expenditures.summary_pages },
    { key: "5000 Other expenditures and financing uses", label: "Other Expenditures & Financing Uses", value: expenditures.major_groups["5000 Other expenditures and financing uses"], pages: expenditures.summary_pages },
  ];

  const instructionItems = Object.entries(expenditures.instruction).map(([label, value]) => ({
    label,
    value,
    sourcePages: expenditures.detail_pages,
  }));

  const supportServicesItems = Object.entries(expenditures.support_services).map(([label, value]) => ({
    label,
    value,
    sourcePages: expenditures.detail_pages,
  }));

  const nonInstructionalItems = Object.entries(expenditures.non_instructional).map(([label, value]) => ({
    label,
    value,
    sourcePages: expenditures.detail_pages,
  }));

  const otherItems = Object.entries(expenditures.other).map(([label, value]) => ({
    label,
    value,
    sourcePages: expenditures.detail_pages,
  }));

  // SpendingRing categories from major groups
  const spendingCategories = [
    {
      name: "Instruction",
      amount: expenditures.major_groups["1000 Instruction"],
      stroke: "stroke-primary",
      dot: "bg-primary",
    },
    {
      name: "Support Services",
      amount: expenditures.major_groups["2000 Support services"],
      stroke: "stroke-chart-2",
      dot: "bg-chart-2",
    },
    {
      name: "Non-Instructional",
      amount: expenditures.major_groups["3000 Non-instructional services"],
      stroke: "stroke-chart-3",
      dot: "bg-chart-3",
    },
    {
      name: "Other & Financing",
      amount: expenditures.major_groups["5000 Other expenditures and financing uses"],
      stroke: "stroke-chart-4",
      dot: "bg-chart-4",
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      <a href="#money-out-content" className="skip-link">
        Skip to main content
      </a>

      <header id="money-out-content" className="space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">Money Out: Expenditures</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
          Total expenditures for 2026–27: {formatDollars(totalExpenditures)}. Nearly two-thirds goes to classroom instruction.
        </p>
      </header>

      {/* Spending Ring Visualization */}
      <section className="space-y-6 sm:space-y-8" aria-labelledby="spending-ring-heading">
        <h2 id="spending-ring-heading" className="text-xl sm:text-2xl font-semibold text-foreground">
          Spending by Category (Interactive)
        </h2>
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm">
          <p className="text-muted-foreground mb-4 max-w-2xl">
            Use arrow keys or drag to explore each category. Click a legend item to jump to it.
            Press Escape to pause animation.
          </p>
          <SpendingRing
            title="2026–27 General Fund Expenditures"
            categories={spendingCategories}
            currency="USD"
          />
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8" aria-labelledby="major-groups-heading">
        <h2 id="major-groups-heading" className="text-xl sm:text-2xl font-semibold text-foreground">
          Major Spending Groups (Horizontal Bars)
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {majorGroups.map((group, index) => {
            const colors = [
              "bg-primary",
              "bg-chart-2",
              "bg-chart-3",
              "bg-chart-4",
            ];
            return (
              <HorizontalBar
                key={group.key}
                label={group.label}
                value={group.value}
                total={totalExpenditures}
                sourcePages={group.pages}
                subItems={
                  group.key === "1000 Instruction"
                    ? instructionItems
                    : group.key === "2000 Support services"
                      ? supportServicesItems
                      : group.key === "3000 Non-instructional services"
                        ? nonInstructionalItems
                        : otherItems
                }
                barColor={colors[index]}
              />
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">
          Percentages of total expenditures: Instruction {formatPct((expenditures.major_groups["1000 Instruction"] / totalExpenditures) * 100)},
          Support Services {formatPct((expenditures.major_groups["2000 Support services"] / totalExpenditures) * 100)},
          Non-Instructional {formatPct((expenditures.major_groups["3000 Non-instructional services"] / totalExpenditures) * 100)},
          Other/Financing {formatPct((expenditures.major_groups["5000 Other expenditures and financing uses"] / totalExpenditures) * 100)}.
          Percentages are calculated.
        </p>
      </section>

      <section className="space-y-4 sm:space-y-6" aria-labelledby="instruction-detail-heading">
        <h2 id="instruction-detail-heading" className="text-xl sm:text-2xl font-semibold text-foreground">
          Instruction Detail
        </h2>
        <p className="text-muted-foreground">
          Instruction totals {formatDollars(expenditures.major_groups["1000 Instruction"])} ({formatPct((expenditures.major_groups["1000 Instruction"] / totalExpenditures) * 100)} of spending).
        </p>
        <dl className="space-y-3 sm:space-y-4">
          {instructionItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/30 dark:hover:border-primary/30 transition-colors duration-200 shadow-sm">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-foreground">{item.label}</dt>
                  <dd className="font-mono text-muted-foreground whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
                  </dd>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Source:{item.sourcePages.map((p) => (
                    <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1 hover:text-primary transition-colors duration-200">p. {p}</a>
                  ))}
                </p>
              </div>
            ))}
        </dl>
      </section>

      <section className="space-y-4 sm:space-y-6" aria-labelledby="support-services-detail-heading">
        <h2 id="support-services-detail-heading" className="text-xl sm:text-2xl font-semibold text-foreground">
          Support Services Detail
        </h2>
        <p className="text-muted-foreground">
          Support services totals {formatDollars(expenditures.major_groups["2000 Support services"])} ({formatPct((expenditures.major_groups["2000 Support services"] / totalExpenditures) * 100)} of spending).
          Largest items: operation & maintenance of plant, student transportation, and administration.
        </p>
        <dl className="space-y-3 sm:space-y-4">
          {supportServicesItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-chart-2/30 dark:hover:border-chart-2/30 transition-colors duration-200 shadow-sm">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-foreground">{item.label}</dt>
                  <dd className="font-mono text-muted-foreground whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
                  </dd>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Source:{item.sourcePages.map((p) => (
                    <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1 hover:text-primary transition-colors duration-200">p. {p}</a>
                  ))}
                </p>
              </div>
            ))}
        </dl>
      </section>

      <section className="space-y-4 sm:space-y-6" aria-labelledby="non-instructional-detail-heading">
        <h2 id="non-instructional-detail-heading" className="text-xl sm:text-2xl font-semibold text-foreground">
          Non-Instructional Services Detail
        </h2>
        <p className="text-muted-foreground">
          Non-instructional services totals {formatDollars(expenditures.major_groups["3000 Non-instructional services"])} ({formatPct((expenditures.major_groups["3000 Non-instructional services"] / totalExpenditures) * 100)} of spending).
          Mostly student activities.
        </p>
        <dl className="space-y-3 sm:space-y-4">
          {nonInstructionalItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-chart-3/30 dark:hover:border-chart-3/30 transition-colors duration-200 shadow-sm">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-foreground">{item.label}</dt>
                  <dd className="font-mono text-muted-foreground whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
                  </dd>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Source:{item.sourcePages.map((p) => (
                    <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1 hover:text-primary transition-colors duration-200">p. {p}</a>
                  ))}
                </p>
              </div>
            ))}
        </dl>
      </section>

      <section className="space-y-4 sm:space-y-6" aria-labelledby="other-detail-heading">
        <h2 id="other-detail-heading" className="text-xl sm:text-2xl font-semibold text-foreground">
          Other Expenditures & Financing Uses Detail
        </h2>
        <p className="text-muted-foreground">
          Other expenditures totals {formatDollars(expenditures.major_groups["5000 Other expenditures and financing uses"])} ({formatPct((expenditures.major_groups["5000 Other expenditures and financing uses"] / totalExpenditures) * 100)} of spending).
          {expenditures.note}
        </p>
        <dl className="space-y-3 sm:space-y-4">
          {otherItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-chart-4/30 dark:hover:border-chart-4/30 transition-colors duration-200 shadow-sm">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-foreground">{item.label}</dt>
                  <dd className="font-mono text-muted-foreground whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
                  </dd>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Source:{item.sourcePages.map((p) => (
                    <a key={p} href={`/source/2026-27-final-general-fund-budget.pdf#page=${p}`} target="_blank" rel="noopener noreferrer" className="underline ml-1 hover:text-primary transition-colors duration-200">p. {p}</a>
                  ))}
                </p>
              </div>
            ))}
        </dl>
      </section>
    </div>
  );
}