import { getBudget, formatDollars } from "@/lib/budget";
import { Shield, FileText, AlertCircle, Info, Link2, GitBranch } from "lucide-react";

export default function AboutPage() {
  const data = getBudget("2026-27");
  const { meta, totals, debt, questions_this_document_cannot_answer } = data;

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
          <Info className="text-primary" />
          About This Site
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Information about the source data, methodology, and limitations.
        </p>
      </header>

      <section className="space-y-6" aria-labelledby="source-heading">
        <h2 id="source-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <FileText className="text-primary" />
          Source Document
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
          <dl className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">Document</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{meta.document}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">District</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{meta.district} (AUN: {meta.aun})</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">County</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{meta.county}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">Fiscal Year</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{meta.fiscal_year}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">Adopted</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{meta.signed_dates}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">PDF Pages</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{meta.pdf_pages}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">Source URL</dt>
              <dd className="mt-1">
                <a href={meta.source_url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 break-all flex items-center gap-1">
                  <Link2 className="size-4" />
                  {meta.source_url}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">Data Retrieved</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{meta.retrieved}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">PDF Download</dt>
              <dd className="mt-1">
                <a href="/source/2026-27-final-general-fund-budget.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 flex items-center gap-1">
                  <FileText className="size-4" />
                  2026-27-final-general-fund-budget.pdf (2.1 MB)
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="methodology-heading">
        <h2 id="methodology-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <GitBranch className="text-chart-2" />
          Methodology & Accuracy
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
          <div className="flex gap-3 p-4 bg-chart-3/10 dark:bg-chart-3/20 border border-chart-3/30 dark:border-chart-3/40 rounded-lg">
            <AlertCircle className="size-5 text-chart-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Important: Scanned PDF</p>
              <p className="text-zinc-700 dark:text-zinc-300 mt-1">
                The source PDF is a scanned document with no selectable text layer.
                All numbers on this site were typed in manually by reading the page images.
              </p>
            </div>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Line items were checked to ensure they add up to the printed totals in each section.
            However, <strong>every number still needs a human check against the PDF before relying on it for any decision.</strong>
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Numbers labeled <strong>&ldquo;calculated&rdquo;</strong> on this site are derived from other numbers in the document
            (for example, percentages of totals, or the median homestead tax estimate). They do not appear in the
            original document.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            The ending fund balance figures on page 26 of the PDF include nonspendable, restricted, committed,
            assigned, and unassigned categories. This site reports the unassigned fund balance separately
            ({formatDollars(totals.ending_unassigned_fund_balance.value)}, {totals.ending_unassigned_fund_balance_pct_of_expenditures.value}% of expenditures)
            as shown on pages 2 and 26.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Derived (Calculated) Values</p>
              <ul className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 space-y-1 list-disc list-inside">
                <li>Percentages of totals</li>
                <li>Median homestead tax estimate</li>
                <li>Spending minus revenue (shortfall)</li>
                <li>Fund balance as % of expenditures</li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Direct from Document</p>
              <ul className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 space-y-1 list-disc list-inside">
                <li>All line item amounts</li>
                <li>Millage rates</li>
                <li>Assessed values</li>
                <li>Tax levy amounts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="disclaimer-heading">
        <h2 id="disclaimer-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Shield className="text-chart-5" />
          Disclaimer
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
          <div className="flex gap-3 p-4 bg-chart-5/10 dark:bg-chart-5/20 border border-chart-5/30 dark:border-chart-5/40 rounded-lg">
            <Shield className="size-5 text-chart-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Not Affiliated</p>
              <p className="text-zinc-700 dark:text-zinc-300 mt-1">
                This site is <strong>NOT run by, affiliated with, or endorsed by</strong> Council Rock School District,
                the Bucks County Intermediate Unit, the Pennsylvania Department of Education, or any government agency.
              </p>
            </div>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            It is an independent project created to make the budget easier to understand. All data comes from the
            public budget document linked above. Errors are possible — please verify against the source PDF.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            No analytics, tracking, cookies, or third-party scripts are used on this site. No personal information
            is collected.
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="unanswered-heading">
        <h2 id="unanswered-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertCircle className="text-chart-3" />
          Questions This Document Cannot Answer
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            The state budget form shows <em>what</em> the numbers are, not <em>why</em> they were chosen.
            The following questions are not answered in this document:
          </p>
          <ul className="space-y-3 list-disc list-inside text-zinc-700 dark:text-zinc-300">
            {questions_this_document_cannot_answer.map((q, i) => (
              <li key={i} className="leading-relaxed">{q}</li>
            ))}
          </ul>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            For board deliberations and votes, see the district&rsquo;s meeting minutes and recordings.
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="debt-heading">
        <h2 id="debt-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <FileText className="text-chart-4" />
          Long-Term Debt (From Budget Document)
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300">
            The budget form includes a summary of long-term indebtedness (pp. 20, 24, 25):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400 font-mono">Est. 6/30/2026</th>
                  <th className="text-right py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400 font-mono">Proj. 6/30/2027</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">Bonds Payable</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(debt.bonds_payable["2026-06-30_estimate"])}</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(debt.bonds_payable["2027-06-30_projection"])}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">Lease & Right-to-Use</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(debt.lease_and_right_to_use["2026-06-30_estimate"])}</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(debt.lease_and_right_to_use["2027-06-30_projection"])}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">Accumulated Compensated Absences</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(debt.accumulated_compensated_absences["2026-06-30_estimate"])}</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(debt.accumulated_compensated_absences["2027-06-30_projection"])}</td>
                </tr>
                <tr className="bg-muted/50 font-semibold">
                  <td className="py-3 px-4 text-zinc-900 dark:text-zinc-100">Total Long-Term Indebtedness</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(debt.total_long_term_indebtedness["2026-06-30_estimate"])}</td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-900 dark:text-zinc-100">{formatDollars(debt.total_long_term_indebtedness["2027-06-30_projection"])}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Sources: pp. 20, 24, 25
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <GitBranch className="text-muted-foreground" />
          Technical Details
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Built With</h3>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
            <li>Next.js 16 (App Router, Turbopack)</li>
            <li>React 19</li>
            <li>Tailwind CSS v4 with shadcn/ui Nova preset</li>
            <li>Kokonut UI components (via shadcn registry)</li>
            <li>Geist Sans & Mono fonts</li>
          </ul>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mt-4">Design Principles</h3>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
            <li>Server components by default; client components only for interactivity</li>
            <li>Static generation — all pages prerendered at build time</li>
            <li>Light/dark mode via CSS variables (OKLCH color space)</li>
            <li>Respects <code>prefers-reduced-motion</code> for all animations</li>
            <li>Accessible: semantic HTML, ARIA labels, keyboard navigation</li>
            <li>No analytics, tracking, or third-party scripts</li>
          </ul>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mt-4">Source Code</h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            This is an open-source project. View the code on GitHub:
          </p>
          <p className="text-sm">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 flex items-center gap-1 inline-block">
              <GitBranch className="size-4" />
              Repository (add your GitHub URL)
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}