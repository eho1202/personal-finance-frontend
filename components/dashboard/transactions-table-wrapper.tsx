import { getTransactionData } from "@/lib/actions/transaction.actions"
import { TransactionsTable } from "./transactions-table"
import { columns } from "./transactions-columns"

const TransactionsTableWrapper = async ({ month, year }: TransactionsTableWrapperProps) => {
    const transactions = await getTransactionData(month, year);

    return (
        <TransactionsTable columns={columns} data={transactions} month={month} year={year} />
    )
}

export default TransactionsTableWrapper