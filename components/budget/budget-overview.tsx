import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts'
import { getHexColor } from '@/lib/utils'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import OverviewCard from './overview-card'
import CashFlowTable from './cashflow-table'
import { PALETTE_KEYS } from '@/constants'
import { useTheme } from 'next-themes'

const BAR_BUDGET_COLOR = "#cbd5e1"
const BAR_ACTUAL_COLOR = "#64748b"
const barChartConfig = {
    Budget: { label: "Budget", color: BAR_BUDGET_COLOR },
    Actual: { label: "Actual", color: BAR_ACTUAL_COLOR },
} satisfies ChartConfig

const BudgetOverview = ({ data, onChange }:
    {
        data: BudgetData;
        onChange: (partial: Partial<BudgetData>) => void;
    }) => {
    const chartData = [
        {
            name: "Debts",
            Budget: data.debts.reduce((s, d) => s + d.budget, 0),
            Actual: data.debts.reduce((s, d) => s + d.paid, 0),
        },
        {
            name: "Savings",
            Budget: data.savings.reduce((s, sv) => s + sv.budget, 0),
            Actual: data.savings.reduce((s, sv) => s + sv.actual, 0),
        },
        {
            name: "Bills",
            Budget: data.bills.reduce((s, b) => s + b.budget, 0),
            Actual: data.bills.reduce((s, b) => s + b.actual, 0),
        },
        {
            name: "Expenses",
            Budget: data.expenseBudgets.reduce((s, v) => s + v.budget, 0),
            Actual: data.expenses.reduce((s, e) => s + e.amount, 0),
        },
    ]

    const totals: Record<string, number> = {};
    data.expenses.forEach(e => { totals[e.category] = (totals[e.category] ?? 0) + e.amount; });
    data.bills.forEach(b => { if (b.description) totals[b.description] = (totals[b.description] ?? 0) + b.actual; });
    data.debts.forEach(d => { if (d.description) totals[d.description] = (totals[d.description] ?? 0) + d.paid; });
    data.savings.forEach(s => { if (s.description) totals[s.description] = (totals[s.description] ?? 0) + s.actual; });

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const barAndPieConfig = {
        ...barChartConfig,
        ...Object.fromEntries(
            chartData.map((d, i) => {
                const key = PALETTE_KEYS[i % PALETTE_KEYS.length]
                return [d.name, { label: d.name, color: getHexColor(key, isDark) }]
            })
        )
    } satisfies ChartConfig

    return (
        <Card className="w-full">
            <CardHeader className='font-semibold'>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Overview of your Budget with charts</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-[300px_1fr_1fr] gap-4 px-4 items-start">
                <div className="flex flex-col gap-4">
                    <div className='overflow-hidden rounded-lg border'>
                        <OverviewCard data={data} onChange={onChange} />
                    </div>

                    <div className='overflow-hidden rounded-lg border'>
                        <CashFlowTable data={data} />
                    </div>
                </div>

                <Card className='py-0 overflow-hidden'>
                    <CardHeader className="px-4 pt-6 border-b bg-muted/80">
                        <CardTitle className="font-semibold tracking-widest text-center text-muted-foreground">
                            Budget vs. Actual
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 pb-2 px-2">
                        <ChartContainer config={barChartConfig}>
                            <BarChart data={chartData} barCategoryGap="30%" barGap={2}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={v => `$${v}`}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="Budget" fill="var(--color-Budget)" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="Actual" fill="var(--color-Actual)" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="py-0 overflow-hidden">
                    <CardHeader className="px-4 pt-6 border-b bg-muted/80">
                        <CardTitle className="font-semibold tracking-widest text-center text-muted-foreground">
                            Actual Cash Flow Breakdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 pb-2 px-2">
                        <ChartContainer config={barAndPieConfig}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    dataKey="Actual"
                                    nameKey="name"
                                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                                >
                                    {chartData.map((_, i) => (
                                        <Cell
                                            key={i}
                                            fill={getHexColor(PALETTE_KEYS[i % PALETTE_KEYS.length], isDark)}
                                        />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <ChartLegend
                                    content={<ChartLegendContent nameKey='name' />}
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

            </div>
        </Card>
    )
}

export default BudgetOverview