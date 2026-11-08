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
    <div className="bg-card rounded-xl border border-border p-6 space-y-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Calculator className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Property Tax Calculator
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        <strong>Estimate only.</strong> Real tax bills can differ. Check your actual bill
        from the county.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="assessed-value"
            className="block text-sm font-medium text-foreground mb-1"
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
            className="w-full max-w-xs px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="homestead-exclusion"
            type="checkbox"
            checked={applyExclusion}
            onChange={(e) => setApplyExclusion(e.target.checked)}
            className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
          />
          <label
            htmlFor="homestead-exclusion"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Apply $300 Homestead Exclusion (Act 1 property tax reduction)
          </label>
        </div>
      </div>

      {assessedValue && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 border border-border">
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Shield className="size-4 text-primary" />
                2025–26 Tax (at {MILLS_2025_26.toFixed(4)} mills)
              </p>
              <p className="text-2xl font-semibold text-foreground">
                {formatDollars(tax2025_26)}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border border-l-4 border-l-primary">
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Shield className="size-4 text-primary" />
                2026–27 Tax (at {MILLS_2026_27.toFixed(4)} mills)
              </p>
              <p className="text-2xl font-semibold text-primary">
                {formatDollars(tax2026_27)}
              </p>
            </div>
          </div>

          <div
            className={`rounded-lg p-4 border ${
              difference > 0
                ? "bg-chart-5/10 dark:bg-chart-5/20 border-chart-5/30"
                : "bg-chart-2/10 dark:bg-chart-2/20 border-chart-2/30"
            }`}
          >
            <p className="text-sm text-muted-foreground mb-1">
              Estimated Change
            </p>
            <p
              className={`text-xl font-semibold ${
                difference > 0
                  ? "text-chart-5"
                  : "text-chart-2"
              }`}
            >
              {difference > 0 ? "+" : ""}{formatDollars(difference)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {applyExclusion ? "taxable" : "full"} assessed value of{" "}
              {formatNumber(taxableValue)} {applyExclusion ? `(after $${HOMESTEAD_EXCLUSION} exclusion)` : ""}
            </p>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        Calculation: (Assessed Value − Exclusion) × Mill Rate ÷ 1,000. Mill rates from budget
        document pages 8–12. Homestead exclusion of $300 applies to qualifying primary
        residences (19,663 properties in district). Median assessed value of homestead
        properties: $39,520 (p. 12).
      </p>
    </div>
  );
}