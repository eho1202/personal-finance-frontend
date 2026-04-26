'use server'

import { getTransactionData } from '@/lib/actions/transaction.actions'
import { Suspense } from 'react'
import { SectionCardsSkeleton } from '@/components/dashboard/section-card-skeleton'
import { SectionCardsWrapper } from '@/components/dashboard/section-card-wrapper'
import NotFoundCard from '@/components/dashboard/not-found-card'
import ErrorCard from '@/components/error-card'
import TransactionsDropdownWrapper from "@/components/dashboard/transactions-dropdown-wrapper"
import TransactionsTableWrapper from "@/components/dashboard/transactions-table-wrapper"
import TransactionsSummaryWrapper from "@/components/dashboard/transactions-summary-wrapper"
import { TransactionsSummarySkeleton } from '@/components/dashboard/transactions-summary-skeleton'
import { TransactionsTableSkeleton } from '@/components/dashboard/transactions-table-skeleton'
import { MONTHS } from '@/constants'
import { getServerCookieValue } from '@/lib/utils'

const Dashboard = async ({ searchParams }: DashboardPageProps) => {
  const current_year = new Date().getFullYear();
  const current_month = MONTHS[new Date().getMonth()];

  const savedMonth = await getServerCookieValue('selectedMonth');
  const savedYear = await getServerCookieValue('selectedYear');

  const default_month = savedMonth || current_month;
  const default_year = savedYear ? parseInt(savedYear) : current_year;

  const { month = default_month, year = default_year } = await searchParams;

  // Determine dashboard state
  let state: DashboardState
  try {
    const transactions = await getTransactionData(month, year);
    if (!transactions || transactions.length === 0) {
      state = { status: "not_found" }
    } else {
      state = { status: "ok", transactions }
    }
  } catch (err: any) {
    state = { status: "error", message: err.message }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <TransactionsDropdownWrapper selectedMonth={month} selectedYear={year} />

          {state.status === "not_found" && (
            <div className="px-4 lg:px-6 flex-1 flex">
              <NotFoundCard month={month} year={year} />
            </div>
          )}

          {state.status === "error" && (
            <div className="px-4 lg:px-6 flex-1 flex">
              <ErrorCard message={state.message} />
            </div>
          )}

          {state.status === "ok" && (
            <>
              <div className="px-4 lg:px-6">
                <Suspense fallback={<TransactionsSummarySkeleton />}>
                  <TransactionsSummaryWrapper month={month} year={year} />
                </Suspense>
              </div>
              <Suspense fallback={<SectionCardsSkeleton />}>
                <SectionCardsWrapper month={month} year={year} />
              </Suspense>
              <div className="px-4 lg:px-6">
                <Suspense fallback={<TransactionsTableSkeleton />}>
                  <TransactionsTableWrapper month={month} year={year} />
                </Suspense>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;