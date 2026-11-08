import { getBudgetData, formatDollars, formatPct } from "@/lib/budget";
import HorizontalBar from "@/components/HorizontalBar";

export default function MoneyOutPage() {
  const data = getBudgetData();
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

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Money Out: Expenditures</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Total expenditures for 2026–27: {formatDollars(totalExpenditures)}. Nearly two-thirds goes to classroom instruction.
        </p>
      </header>

      <section className="space-y-6" aria-labelledby="major-groups-heading">
        <h2 id="major-groups-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Major Spending Groups
        </h2>
        <div className="space-y-6">
          {majorGroups.map((group) => (
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
            />
          ))}
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Percentages of total expenditures: Instruction {formatPct((expenditures.major_groups["1000 Instruction"] / totalExpenditures) * 100)},
          Support Services {formatPct((expenditures.major_groups["2000 Support services"] / totalExpenditures) * 100)},
          Non-Instructional {formatPct((expenditures.major_groups["3000 Non-instructional services"] / totalExpenditures) * 100)},
          Other/Financing {formatPct((expenditures.major_groups["5000 Other expenditures and financing uses"] / totalExpenditures) * 100)}.
          Percentages are calculated.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="instruction-detail-heading">
        <h2 id="instruction-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Instruction Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Instruction totals {formatDollars(expenditures.major_groups["1000 Instruction"])} ({formatPct((expenditures.major_groups["1000 Instruction"] / totalExpenditures) * 100)} of spending).
        </p>
        <dl className="space-y-3">
          {instructionItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</dt>
                  <dd className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
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

      <section className="space-y-4" aria-labelledby="support-services-detail-heading">
        <h2 id="support-services-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Support Services Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Support services totals {formatDollars(expenditures.major_groups["2000 Support services"])} ({formatPct((expenditures.major_groups["2000 Support services"] / totalExpenditures) * 100)} of spending).
          Largest items: operation & maintenance of plant, student transportation, and administration.
        </p>
        <dl className="space-y-3">
          {supportServicesItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</dt>
                  <dd className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
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

      <section className="space-y-4" aria-labelledby="non-instructional-detail-heading">
        <h2 id="non-instructional-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Non-Instructional Services Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Non-instructional services totals {formatDollars(expenditures.major_groups["3000 Non-instructional services"])} ({formatPct((expenditures.major_groups["3000 Non-instructional services"] / totalExpenditures) * 100)} of spending).
          Mostly student activities.
        </p>
        <dl className="space-y-3">
          {nonInstructionalItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</dt>
                  <dd className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
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

      <section className="space-y-4" aria-labelledby="other-detail-heading">
        <h2 id="other-detail-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Other Expenditures & Financing Uses Detail
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Other expenditures totals {formatDollars(expenditures.major_groups["5000 Other expenditures and financing uses"])} ({formatPct((expenditures.major_groups["5000 Other expenditures and financing uses"] / totalExpenditures) * 100)} of spending).
          {expenditures.note}
        </p>
        <dl className="space-y-3">
          {otherItems
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</dt>
                  <dd className="font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {formatDollars(item.value)}
                  </dd>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {formatPct((item.value / totalExpenditures) * 100)} of total spending
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