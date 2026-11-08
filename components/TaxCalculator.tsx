"use client";

import { useState } from "react";
import { Calculator, Shield } from "lucide-react";

const MILLS_2025_26 = 144.8978;
const MILLS_2026_27 = 149.9692;
const HOMESTEAD_EXCLUSION = 300;

export default function TaxCalculator() {
  const [assessedValue, setAssessedValue] = useState("");
  const [applyExclusion, setApplyExclusion] = useState(true);

  const taxableValue = applyExclusion
    ? Math.max(0, Number(assessedValue) - HOMESTEAD_EXCLUSION)
    : Number(assessedValue);

  const tax2025_26 = assessedValue ? (taxableValue * MILLS_2025_26) / 1000 : 0;
  const tax2026_27 = assessedValue ? (taxableValue * MILLS_2026_27) / 1000 : 0;
  const difference = tax2026_27 - tax2025_26;

  const formatDollars = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Property Tax Calculator
        </h3>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        <strong>Estimate only.</strong> Real tax bills can differ. Check your actual bill
        from the county.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="assessed-value"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
          >
            Assessed Value (from your county assessment notice)
          </label>
          <input
            id="assessed-value"
            type="number"
            min="0"
            step="1"
            value={assessedValue}
            onChange={(e) => setAssessedValue(e.target.value)}
            placeholder="e.g., 39520"
            className="w-full max-w-xs px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="homestead-exclusion"
            type="checkbox"
            checked={applyExclusion}
            onChange={(e) => setApplyExclusion(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="homestead-exclusion"
            className="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            Apply $300 Homestead Exclusion (Act 1 property tax reduction)
          </label>
        </div>
      </div>

      {assessedValue && (
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1">
                <Shield className="size-4 text-blue-600 dark:text-blue-400" />
                2025–26 Tax (at {MILLS_2025_26.toFixed(4)} mills)
              </p>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {formatDollars(tax2025_26)}
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-primary">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1">
                <Shield className="size-4 text-primary" />
                2026–27 Tax (at {MILLS_2026_27.toFixed(4)} mills)
              </p>
              <p className="text-2xl font-semibold text-primary">
                {formatDollars(tax2026_27)}
              </p>
            </div>
          </div>

          <div
            className={`rounded-lg p-4 ${
              difference > 0
                ? "bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800"
                : "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
            }`}
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
              Estimated Change
            </p>
            <p
              className={`text-xl font-semibold ${
                difference > 0
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {difference > 0 ? "+" : ""}{formatDollars(difference)}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Based on {applyExclusion ? "taxable" : "full"} assessed value of{" "}
              {formatNumber(taxableValue)} {applyExclusion ? `(after $${HOMESTEAD_EXCLUSION} exclusion)` : ""}
            </p>
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700 pt-4">
        Calculation: (Assessed Value − Exclusion) × Mill Rate ÷ 1,000. Mill rates from budget
        document pages 8–12. Homestead exclusion of $300 applies to qualifying primary
        residences (19,663 properties in district). Median assessed value of homestead
        properties: $39,520 (p. 12).
      </p>
    </div>
  );
}