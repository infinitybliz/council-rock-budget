import budgetData from "@/data/budget-2026-27.json";

export type BudgetData = typeof budgetData;

export function getBudgetData(): BudgetData {
  return budgetData;
}

export function formatDollars(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPct(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getSourceLink(page: number): string {
  return `/source/2026-27-final-general-fund-budget.pdf#page=${page}`;
}

export function getSourceLinks(pages: number[]): string[] {
  return pages.map(getSourceLink);
}

export function getFirstSourceLink(pages: number[]): string {
  return getSourceLink(pages[0]);
}