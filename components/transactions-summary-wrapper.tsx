import { getMonthlySummaryData } from "@/lib/actions/transaction.actions"
import TransactionsSummary from "./transactions-summary"

const TransactionsSummaryWrapper = async ({ month, year }: TransactionsSummaryWrapperProps) => {
    const monthly_summary = await getMonthlySummaryData(month, year)
    return (
        <TransactionsSummary data={monthly_summary} month={month} year={year} />
    )
}

export default TransactionsSummaryWrapper