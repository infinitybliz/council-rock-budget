import { getBudgetData, formatDollars } from "@/lib/budget";

export default function AboutPage() {
  const data = getBudgetData();
  const { meta, totals } = data;

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">About This Site</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Information about the source data, methodology, and limitations.
        </p>
      </header>

      <section className="space-y-6" aria-labelledby="source-heading">
        <h2 id="source-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Source Document
        </h2>
        <dl className="space-y-3 bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">Document</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{meta.document}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">District</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{meta.district} (AUN: {meta.aun})</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">County</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{meta.county}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">Fiscal Year</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{meta.fiscal_year}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">Adopted</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{meta.signed_dates}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">PDF Pages</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{meta.pdf_pages}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">Source URL</dt>
            <dd>
              <a href={meta.source_url} target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 underline hover:text-zinc-900 dark:hover:text-zinc-100 break-all">
                {meta.source_url}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">Data Retrieved</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{meta.retrieved}</dd>
          </div>
        </dl>
      </section>

      <section className="space-y-6" aria-labelledby="methodology-heading">
        <h2 id="methodology-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Methodology & Accuracy
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <strong>Important:</strong> The source PDF is a scanned document with no selectable text layer.
            All numbers on this site were typed in manually by reading the page images.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Line items were checked to ensure they add up to the printed totals in each section.
            However, <strong>every number still needs a human check against the PDF before relying on it for any decision.</strong>
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Numbers labeled <strong>"calculated"</strong> on this site are derived from other numbers in the document
            (for example, percentages of totals, or the median homestead tax estimate). They do not appear in the
            original document.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            The ending fund balance figures on page 26 of the PDF include nonspendable, restricted, committed,
            assigned, and unassigned categories. This site reports the unassigned fund balance separately
            ({formatDollars(totals.ending_unassigned_fund_balance.value)}, {totals.ending_unassigned_fund_balance_pct_of_expenditures.value}% of expenditures)
            as shown on pages 2 and 26.
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="disclaimer-heading">
        <h2 id="disclaimer-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Disclaimer
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            This site is <strong>NOT run by, affiliated with, or endorsed by</strong> Council Rock School District,
            the Bucks County Intermediate Unit, the Pennsylvania Department of Education, or any government agency.
          </p>
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
        <h2 id="unanswered-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Questions This Document Cannot Answer
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            The state budget form shows <em>what</em> the numbers are, not <em>why</em> they were chosen.
            The following questions are not answered in this document:
          </p>
          <ul className="space-y-3 list-disc list-inside text-zinc-700 dark:text-zinc-300">
            {data.questions_this_document_cannot_answer.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            For board deliberations and votes, see the district's meeting minutes and recordings.
          </p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="debt-heading">
        <h2 id="debt-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Long-Term Debt (From Budget Document)
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300">
            The budget form includes a summary of long-term indebtedness (pp. 20, 24, 25):
          </p>
          <dl className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
              <dt className="text-zinc-500 dark:text-zinc-400">Est. 6/30/2026</dt>
              <dt className="text-zinc-500 dark:text-zinc-400">Proj. 6/30/2027</dt>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">Bonds Payable</dd>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.bonds_payable["2026-06-30_estimate"])}</dd>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.bonds_payable["2027-06-30_projection"])}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">Lease & Right-to-Use</dd>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.lease_and_right_to_use["2026-06-30_estimate"])}</dd>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.lease_and_right_to_use["2027-06-30_projection"])}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">Accumulated Compensated Absences</dd>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.accumulated_compensated_absences["2026-06-30_estimate"])}</dd>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.accumulated_compensated_absences["2027-06-30_projection"])}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-200 dark:border-zinc-700 pt-2">
              <dd className="font-semibold text-zinc-900 dark:text-zinc-100">Total Long-Term Indebtedness</dd>
              <dd className="font-mono font-semibold text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.total_long_term_indebtedness["2026-06-30_estimate"])}</dd>
              <dd className="font-mono font-semibold text-zinc-700 dark:text-zinc-300">{formatDollars(data.debt.total_long_term_indebtedness["2027-06-30_projection"])}</dd>
            </div>
          </dl>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Sources: pp. 20, 24, 25
          </p>
        </div>
      </section>
    </div>
  );
}