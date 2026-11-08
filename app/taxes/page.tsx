import { getBudgetData, formatDollars, formatNumber } from "@/lib/budget";
import TaxCalculator from "@/components/TaxCalculator";

export default function TaxesPage() {
  const data = getBudgetData();
  const { taxes, totals } = data;

  const medianAssessedValue = taxes.median_assessed_value_homestead;
  const homesteadExclusion = taxes.assessed_value_exclusion_per_homestead;
  const taxableMedian = medianAssessedValue - homesteadExclusion;
  const medianTax2025_26 = (taxableMedian * taxes.real_estate_mills_2025_26_rebalanced) / 1000;
  const medianTax2026_27 = (taxableMedian * taxes.real_estate_mills_2026_27) / 1000;
  const medianIncrease = medianTax2026_27 - medianTax2025_26;

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Taxes</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          How the 2026–27 millage rate affects your property tax bill.
        </p>
      </header>

      <section className="space-y-6" aria-labelledby="what-is-mill-heading">
        <h2 id="what-is-mill-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          What Is a Mill?
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            A <strong>mill</strong> is one-tenth of a cent, or $1 of tax per $1,000 of assessed value.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            The formula: <strong>(Assessed Value − Exemptions) × Mill Rate ÷ 1,000 = Tax Bill</strong>
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <strong>Assessed value</strong> is set by the county (Bucks County), not the school district. It is
            a fraction of market value — in Bucks County, the common level ratio is around 10–12%.
            Your assessment notice from the county shows your assessed value.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            The <strong>homestead exclusion</strong> (Act 1 property tax reduction) subtracts $300 from the
            assessed value before calculating the tax, but only for owner-occupied primary residences that
            have filed the proper application. In this district, 19,663 properties qualify (p. 12).
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Sources: pp. 8–12
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="rate-change-heading">
        <h2 id="rate-change-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          2025–26 vs 2026–27 Millage Rate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">2025–26 (Rebalanced)</h3>
            <p className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {taxes.real_estate_mills_2025_26_rebalanced.toFixed(4)} mills
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Tax levy: {formatDollars(taxes.tax_levy_2025_26)} (p. 8)
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">2026–27 (Adopted)</h3>
            <p className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {taxes.real_estate_mills_2026_27.toFixed(4)} mills
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Tax levy needed: {formatDollars(taxes.tax_levy_needed_2026_27)} (p. 8)
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Change: +{taxes.real_estate_rate_change_pct}%</p>
          <p className="text-zinc-700 dark:text-zinc-300">
            The increase matches the Pennsylvania Act 1 index for 2026–27 ({taxes.act_1_index_pct}%). The district
            did not seek exceptions to exceed the index. The taxable assessed value for 2026–27 is
            {formatNumber(taxes.taxable_assessed_value_2026_27)} with an estimated collection rate of
            {taxes.estimated_collection_pct.toFixed(2)}% (p. 8).
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            Sources: pp. 8–12
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="other-taxes-heading">
        <h2 id="other-taxes-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Other Local Taxes (Unchanged)
        </h2>
        <dl className="space-y-3">
          {Object.entries(taxes.other_local_taxes_unchanged).map(([label, rate]) => (
            <div key={label} className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
              <dt className="font-medium text-zinc-900 dark:text-zinc-100">{label}</dt>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300">{rate}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Source: p. 12
        </p>
      </section>

      <section className="space-y-6" aria-labelledby="calculator-heading">
        <h2 id="calculator-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Estimate Your Tax Bill
        </h2>
        <TaxCalculator />
      </section>

      <section className="space-y-4" aria-labelledby="median-example-heading">
        <h2 id="median-example-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Median Homestead Example
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300">
            The district reports a median assessed value for homestead properties of
            {formatDollars(medianAssessedValue)} (p. 12). With the $300 homestead exclusion:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded p-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Taxable Value</p>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {formatDollars(taxableMedian)}
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded p-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">2025–26 Tax</p>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {formatDollars(medianTax2025_26)}
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded p-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">2026–27 Tax</p>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {formatDollars(medianTax2026_27)}
              </p>
            </div>
          </div>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            Estimated increase: {formatDollars(medianIncrease)} ({taxes.real_estate_rate_change_pct}%)
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <strong>Estimate only.</strong> Real tax bills can differ. Check your actual bill from the county.
            Calculated from median assessed value (p. 12) and mill rates (pp. 8–12).
          </p>
        </div>
      </section>
    </div>
  );
}