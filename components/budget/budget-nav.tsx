import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Label } from '../ui/label'
import { Progress } from '../ui/progress'
import { MONTHS } from '@/constants'
import { fmt } from '@/lib/utils'

const BudgetNav = ({
    data, month, year, onPrev, onNext }
    : {
        data: BudgetData;
        month: number;
        year: number;
        onPrev: () => void;
        onNext: () => void;
    }
) => {
    const totalIncome = data.income.reduce((s, i) => s + i.actual, 0);
    const totalBills = data.bills.reduce((s, b) => s + b.actual, 0);
    const totalDebts = data.debts.reduce((s, d) => s + d.paid, 0);
    const totalSavings = data.savings.reduce((s, sv) => s + sv.actual, 0);
    const totalExpenses = data.expenses.reduce((s, e) => s + e.amount, 0);
    const totalSpent = totalBills + totalDebts + totalExpenses;
    const totalBudgeted =
        data.bills.reduce((s, b) => s + b.budget, 0) +
        data.debts.reduce((s, d) => s + d.budget, 0) +
        data.savings.reduce((s, sv) => s + sv.budget, 0) +
        Object.values(data.expenseItems).reduce((s, v) => s + v, 0);
    const leftOver = totalIncome - totalSpent - totalSavings;
    const spendPct = totalIncome > 0 ? Math.round((totalSpent / totalIncome) * 100) : 0;

    const BUDGET_HEADERS = [
        { label: "Budgeted", value: fmt(totalBudgeted) },
        { label: "Left to Budget", value: fmt(Math.max(0, totalBudgeted - totalIncome)) },
        { label: "Income", value: fmt(totalIncome) },
        { label: "Total Spent", value: fmt(totalSpent) },
        { label: "Savings", value: fmt(totalSavings) },
        { label: "Left Over", value: fmt(leftOver), danger: leftOver < 0 },
    ];

    return (
        <Card className="w-full">
            <CardContent className="flex flex-wrap items-center gap-4 px-4">
                <div className="flex gap-4 lg:grid lg:grid-cols-[1fr_300px_1fr]">
                    <Button variant="outline" onClick={onPrev}>
                        <IconChevronLeft />
                    </Button>
                    <Label className="uppercase text-2xl justify-center">
                        {MONTHS[month - 1]} {year}
                    </Label>
                    <Button variant="outline" onClick={onNext}>
                        <IconChevronRight />
                    </Button>
                </div>

                <div className="ml-auto flex flex-wrap items-center gap-4">
                    {BUDGET_HEADERS.slice(0, 4).map(h => (
                        <div key={h.label} className="text-center min-w-[90px]">
                            <Label className="text-muted-foreground mb-2">{h.label}</Label>
                            <Label className="">{h.value}</Label>
                        </div>
                    ))}

                    <div className="min-w-[120px] text-center">
                        <Label className="overflow-hidden text-muted-foreground mb-3">{spendPct}% spent</Label>
                        <Progress value={spendPct} />
                    </div>

                    {BUDGET_HEADERS.slice(4).map(h => (
                        <div key={h.label} className="text-center min-w-[90px]">
                            <Label className="text-muted-foreground mb-2">{h.label}</Label>
                            <Label className="">{h.value}</Label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default BudgetNav