import { useState } from 'react'
import { Button } from "../ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardAction } from '../ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Cell, Pie, PieChart } from 'recharts';
import ExpenseTrackerTable from './expense-tracker-table';
import SpendingBreakdownTable from './spending-breakdown-table';
import { PALETTE_KEYS } from '@/constants';
import { getHexColor } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Check, Edit } from 'lucide-react';

const BudgetExpenseCategories = ({ data, onUpdate, onChange, onRemove }:
    {
        data: BudgetData;
        onUpdate: (section: keyof BudgetData, id: string, changes: Record<string, unknown>) => void;
        onChange: (partial: Partial<BudgetData>) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const [isEditing, setIsEditing] = useState(false);

    const categoryTotals: Record<string, number> = {};
    data.expenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] ?? 0) + e.amount;
    });

    const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))

    const total = pieData.reduce((s, d) => s + d.value, 0)

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const chartConfig = Object.fromEntries(
        pieData.map((d, i) => {
            const key = PALETTE_KEYS[i % PALETTE_KEYS.length]
            return [d.name, { label: d.name, color: getHexColor(key, isDark) }]
        })
    ) satisfies ChartConfig

    const pieDataWithKeys = pieData.map((d, i) => ({ ...d, key: `slice${i}` }))

    return (
        <Card className="w-full">
            <CardHeader className='font-semibold'>
                <CardTitle>Expenses Overview</CardTitle>
                <CardDescription>{isEditing ? "Click cells to edit, add or remove rows" : "Track your monthly expenses here after budgeting above"}</CardDescription>
                <CardAction>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(prev => !prev)}>
                        {isEditing ? <Check /> : <Edit />}
                        <span className='hidden lg:inline'>{isEditing ? "Done" : "Edit"}</span>
                    </Button>
                </CardAction>
            </CardHeader>
            <div className="lg:grid lg:grid-cols-[1fr_500px] gap-4 px-4 items-start">

                <ExpenseTrackerTable data={data} isEditing={isEditing} onUpdate={onUpdate} onChange={(expenses, expense_budgets) => onChange({ expenses, expense_budgets })} onRemove={onRemove} />

                <div className="flex flex-col gap-4">
                    <Card>
                        <ChartContainer config={chartConfig}>
                            <PieChart>
                                <Pie
                                    data={pieDataWithKeys}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(1)}%`
                                    }
                                >
                                    {pieDataWithKeys.map((_, i) => (
                                        <Cell
                                            key={i}
                                            fill={getHexColor(PALETTE_KEYS[i % PALETTE_KEYS.length], isDark)}
                                        />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ChartContainer>
                    </Card>

                    <SpendingBreakdownTable pieDataWithKeys={pieDataWithKeys} total={total} currency={data.currency} />

                </div>
            </div>
        </Card>
    )
}

export default BudgetExpenseCategories