import React from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import { fmt } from '@/lib/utils'

const CashFlowTable = ({ data }: { data: BudgetData }) => {
    const cashFlowRows = [
        {
            name: "Debts",
            budget: data.debts.reduce((s, d) => s + d.budget, 0),
            actual: data.debts.reduce((s, d) => s + d.paid, 0),
        },
        {
            name: "Savings",
            budget: data.savings.reduce((s, sv) => s + sv.budget, 0),
            actual: data.savings.reduce((s, sv) => s + sv.actual, 0),
        },
        {
            name: "Bills",
            budget: data.bills.reduce((s, b) => s + b.budget, 0),
            actual: data.bills.reduce((s, b) => s + b.actual, 0),
        },
        {
            name: "Expenses",
            budget: Object.values(data.expenseItems).reduce((s, v) => s + v, 0),
            actual: data.expenses.reduce((s, e) => s + e.amount, 0),
        },
    ]
    const totalBudget = cashFlowRows.reduce((s, r) => s + r.budget, 0)
    const totalActual = cashFlowRows.reduce((s, r) => s + r.actual, 0)

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-muted/80">
                    <TableHead colSpan={3} className="font-semibold tracking-widest text-center text-muted-foreground">Cash Flow Summary</TableHead>
                </TableRow>
                <TableRow className="bg-muted/20">
                    <TableHead >Name</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                    <TableHead className="text-right">Actual</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cashFlowRows.map(row => (
                    <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="text-right text-muted-foreground">
                            {fmt(row.budget)}
                        </TableCell>
                        <TableCell className="text-right">
                            {fmt(row.actual)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell className="text-sm">Total</TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                        {fmt(totalBudget)}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                        {fmt(totalActual)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CashFlowTable