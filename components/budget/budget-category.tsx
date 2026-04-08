"use client"
import { useState } from 'react';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '../ui/card'
import IncomeTable from './income-table';
import DebtsTable from './debts-table';
import SavingsTable from './savings-table';
import BillsTable from './bills-table';
import ExpensesTable from './expenses-table';
import { Button } from "../ui/button"
import { Check, Edit } from 'lucide-react';
import { IconLoader } from '@tabler/icons-react';

const BudgetCategories = ({ data, onUpdate, onChange, onRemove, onSave }:
    {
        data: BudgetData;
        onUpdate: (section: keyof BudgetData, id: string, changes: Record<string, unknown>) => void;
        onChange: (partial: Partial<BudgetData>) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
        onSave: () => Promise<void>;
    }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleDone = async () => {
        setSaving(true);
        try {
            await onSave();
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to save budget: ", err);
        } finally {
            setSaving(false);
        }
    }

    const incomeTotal = data.income.reduce(
        (s, i) => ({ expected: s.expected + i.expected, actual: s.actual + i.actual }),
        { expected: 0, actual: 0 }
    );
    const debtsTotal = data.debts.reduce(
        (s, d) => ({ budget: s.budget + d.budget, paid: s.paid + d.paid }),
        { budget: 0, paid: 0 },
    );
    const savingsTotal = data.savings.reduce(
        (s, sv) => ({ budget: s.budget + sv.budget, actual: s.actual + sv.actual }),
        { budget: 0, actual: 0 },
    );
    const billsTotal = data.bills.reduce(
        (s, b) => ({ budget: s.budget + b.budget, actual: s.actual + b.actual }),
        { budget: 0, actual: 0 },
    );
    const categoryTotals: Record<string, { budget: number; actual: number }> = {};
    data.expense_budgets.forEach(e => {
        categoryTotals[e.category] = {
            budget: (categoryTotals[e.category]?.budget ?? 0) + e.budget,
            actual: categoryTotals[e.category]?.actual ?? 0,
        }
    });
    data.expenses.forEach(e => {
        categoryTotals[e.category] = {
            budget: categoryTotals[e.category]?.budget ?? 0,
            actual: (categoryTotals[e.category]?.actual ?? 0) + e.amount,
        }
    });
    const expenseSummary = Object.entries(categoryTotals).map(([cat, { budget, actual }]) => ({
        category: cat,
        budget,
        actual,
        remaining: budget - actual,
    }));
    console.log(expenseSummary);
    const expenseTotal = expenseSummary.reduce(
        (s, ex) => ({ budget: s.budget + ex.budget, actual: s.actual + ex.actual }),
        { budget: 0, actual: 0 },
    )
    console.log(expenseTotal);

    return (
        <Card className="w-full">
            <CardHeader className='font-semibold'>
                <CardTitle>Set Budgets</CardTitle>
                <CardDescription>
                    {isEditing ? "Click cells to edit, add or remove rows" : "Set your budgets for each section"}
                </CardDescription>
                <CardAction>
                    <Button variant="outline" size="sm" onClick={() => isEditing ? handleDone() : setIsEditing(true)}>
                        {saving ? <IconLoader className="anime-spin" /> : isEditing ? <Check /> : <Edit />}
                        <span className='hidden lg:inline'>{saving ? "Saving..." : isEditing ? "Done" : "Edit"}</span>
                    </Button>
                </CardAction>
            </CardHeader>

            <div className="grid grid-cols-[400px_1fr_1fr] gap-4 px-4 items-start">
                <div className="flex flex-col gap-4">
                    <IncomeTable data={data} incomeTotal={incomeTotal} isEditing={isEditing} onChange={income => onChange({ income })} onRemove={onRemove} />

                    <DebtsTable data={data} debtsTotal={debtsTotal} isEditing={isEditing} onChange={debts => onChange({ debts })} onRemove={onRemove} />

                    <SavingsTable data={data} savingsTotal={savingsTotal} isEditing={isEditing} onChange={savings => onChange({ savings })} onRemove={onRemove} />
                </div>

                <BillsTable data={data} billsTotal={billsTotal} onUpdate={onUpdate} isEditing={isEditing} onChange={bills => onChange({ bills })} onRemove={onRemove} />

                <ExpensesTable data={data} expenseTotal={expenseTotal} onChange={(expense_budgets, expense_items) => onChange({ expense_budgets, expense_items })} isEditing={isEditing} onUpdate={onUpdate} onRemove={onRemove} />
            </div>
        </Card>
    )
}

export default BudgetCategories