"use client";

import { getBudget, formatDollars, formatNumber } from "@/lib/budget";
import TaxCalculator from "@/components/TaxCalculator";
import LiquidGauge from "@/components/kokonutui/liquid-gauge";
import { Shield, Home, Calculator, TrendingUp } from "lucide-react";

export default function TaxesPage() {
  const data = getBudget("2026-27");
  const { taxes, totals } = data;

  const medianAssessedValue = taxes.median_assessed_value_homestead;
  const homesteadExclusion = taxes.assessed_value_exclusion_per_homestead;
  const taxableMedian = medianAssessedValue - homesteadExclusion;
  const medianTax2025_26 = (taxableMedian * taxes.real_estate_mills_2025_26_rebalanced) / 1000;
  const medianTax2026_27 = (taxableMedian * taxes.real_estate_mills_2026_27) / 1000;
  const medianIncrease = medianTax2026_27 - medianTax2025_26;

  // Fund balance as percentage of expenditures for the gauge
  const fundBalancePct = totals.ending_unassigned_fund_balance_pct_of_expenditures.value;

  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      <header className="space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground flex items-center gap-3">
          <Shield className="text-primary" />
          Taxes
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
          How the 2026–27 millage rate affects your property tax bill.
        </p>
      </header>

      {/* Fund Balance Gauge */}
      <section className="space-y-6 sm:space-y-8" aria-labelledby="fund-balance-gauge-heading">
        <h2 id="fund-balance-gauge-heading" className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="text-chart-2" />
          District Financial Health: Fund Balance
        </h2>
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-1 flex justify-center">
              <LiquidGauge
                value={fundBalancePct}
                readOnly
                label="Unassigned Fund Balance"
                total={Math.round(totals.total_expenditures.value / 1_000_000)}
                unit="% of expenditures"
                warnAt={90}
                className="w-full max-w-xs mx-auto"
              />
            </div>
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4 sm:p-6">
                  <p className="text-sm text-muted-foreground">Ending Unassigned Balance</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-foreground mt-1">
                    {formatDollars(totals.ending_unassigned_fund_balance.value)}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4 sm:p-6">
                  <p className="text-sm text-muted-foreground">As % of Expenditures</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-chart-2 mt-1">
                    {fundBalancePct}%
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4 sm:p-6">
                  <p className="text-sm text-muted-foreground">Beginning Fund Balance</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-foreground mt-1">
                    {formatDollars(totals.beginning_fund_balance_available.value)}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4 sm:p-6">
                  <p className="text-sm text-muted-foreground">Projected Drawdown</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-chart-5 mt-1">
                    {formatDollars(totals.beginning_fund_balance_available.value - totals.ending_unassigned_fund_balance.value)}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                The district plans to spend down its fund balance by drawing {formatDollars(totals.beginning_fund_balance_available.value - totals.ending_unassigned_fund_balance.value)}
                from savings. Even after this drawdown, the projected ending unassigned fund balance of {fundBalancePct}% of expenditures
                exceeds the common 8% guideline for school districts. Source: pp. 2, 26
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8" aria-labelledby="what-is-mill-heading">
        <h2 id="what-is-mill-heading" className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
          <Home className="text-primary" />
          What Is a Mill?
        </h2>
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 space-y-4 shadow-sm">
          <p className="text-foreground leading-relaxed">
            A <strong>mill</strong> is one-tenth of a cent, or $1 of tax per $1,000 of assessed value.
          </p>
          <p className="text-foreground leading-relaxed">
            The formula: <strong>(Assessed Value − Exemptions) × Mill Rate ÷ 1,000 = Tax Bill</strong>
          </p>
          <p className="text-foreground leading-relaxed">
            <strong>Assessed value</strong> is set by the county (Bucks County), not the school district. It is
            a fraction of market value — in Bucks County, the common level ratio is around 10–12%.
            Your assessment notice from the county shows your assessed value.
          </p>
          <p className="text-foreground leading-relaxed">
            The <strong>homestead exclusion</strong> (Act 1 property tax reduction) subtracts $300 from the
            assessed value before calculating the tax, but only for owner-occupied primary residences that
            have filed the proper application. In this district, 19,663 properties qualify (p. 12).
          </p>
          <p className="text-xs text-muted-foreground">
            Sources: pp. 8–12
          </p>
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8" aria-labelledby="rate-change-heading">
        <h2 id="rate-change-heading" className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
          <Calculator className="text-chart-4" />
          2025–26 vs 2026–27 Millage Rate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="text-muted-foreground">2025–26 (Rebalanced)</span>
            </h3>
            <p className="text-3xl sm:text-4xl font-semibold text-foreground">
              {taxes.real_estate_mills_2025_26_rebalanced.toFixed(4)} mills
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Tax levy: {formatDollars(taxes.tax_levy_2025_26)} (p. 8)
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8 border-primary/50 dark:border-primary/50 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="text-primary">2026–27 (Adopted)</span>
            </h3>
            <p className="text-3xl sm:text-4xl font-semibold text-primary">
              {taxes.real_estate_mills_2026_27.toFixed(4)} mills
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Tax levy needed: {formatDollars(taxes.tax_levy_needed_2026_27)} (p. 8)
            </p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div>
              <p className="font-medium text-foreground mb-2">Change: +{taxes.real_estate_rate_change_pct}%</p>
              <p className="text-muted-foreground">
                The increase matches the Pennsylvania Act 1 index for 2026–27 ({taxes.act_1_index_pct}%). The district
                did not seek exceptions to exceed the index. The taxable assessed value for 2026–27 is
                {formatNumber(taxes.taxable_assessed_value_2026_27)} with an estimated collection rate of
                {taxes.estimated_collection_pct.toFixed(2)}% (p. 8).
              </p>
            </div>
            <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-4 sm:p-6">
              <span className="text-2xl sm:text-3xl font-bold text-primary">+{taxes.real_estate_rate_change_pct}%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 sm:mt-4">
            Sources: pp. 8–12
          </p>
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8" aria-labelledby="other-taxes-heading">
        <h2 id="other-taxes-heading" className="text-xl sm:text-2xl font-semibold text-foreground">
          Other Local Taxes (Unchanged)
        </h2>
        <dl className="space-y-3 sm:space-y-4">
          {Object.entries(taxes.other_local_taxes_unchanged).map(([label, rate]) => (
            <div key={label} className="bg-card rounded-lg p-4 sm:p-6 border border-border flex items-center justify-between shadow-sm">
              <dt className="font-medium text-foreground">{label}</dt>
              <dd className="font-mono text-muted-foreground">{rate}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-muted-foreground">
          Source: p. 12
        </p>
      </section>

      <section className="space-y-6 sm:space-y-8" aria-labelledby="calculator-heading">
        <h2 id="calculator-heading" className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
          <Calculator className="text-chart-3" />
          Estimate Your Tax Bill
        </h2>
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm">
          <TaxCalculator />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6" aria-labelledby="median-example-heading">
        <h2 id="median-example-heading" className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
          <Home className="text-chart-2" />
          Median Homestead Example
        </h2>
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 space-y-4 sm:space-y-6 shadow-sm">
          <p className="text-foreground">
            The district reports a median assessed value for homestead properties of
            {formatDollars(medianAssessedValue)} (p. 12). With the $300 homestead exclusion:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="bg-muted rounded-lg p-4 sm:p-6">
              <p className="text-sm text-muted-foreground">Taxable Value</p>
              <p className="text-2xl sm:text-3xl font-semibold text-foreground mt-1">
                {formatDollars(taxableMedian)}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 sm:p-6">
              <p className="text-sm text-muted-foreground">2025–26 Tax</p>
              <p className="text-2xl sm:text-3xl font-semibold text-foreground mt-1">
                {formatDollars(medianTax2025_26)}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 sm:p-6 border-2 border-primary/50 dark:border-primary/50">
              <p className="text-sm text-muted-foreground">2026–27 Tax</p>
              <p className="text-2xl sm:text-3xl font-semibold text-primary mt-1">
                {formatDollars(medianTax2026_27)}
              </p>
            </div>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 sm:p-6">
            <p className="font-medium text-foreground text-center">
              Estimated increase: {formatDollars(medianIncrease)} ({taxes.real_estate_rate_change_pct}%)
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            <strong>Estimate only.</strong> Real tax bills can differ. Check your actual bill from the county.
            Calculated from median assessed value (p. 12) and mill rates (pp. 8–12).
          </p>
        </div>
      </section>
    </div>
  );
}