import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, Select } from '../ui/select'
import AddRowBtn from './add-row-button'
import { uid } from '@/lib/utils'
import EditCell from './budget-edit-cell'
import DeleteBtn from './delete-button'

const ExpenseTrackerTable = ({ data, isEditing, onUpdate, onChange, onRemove }
    : {
        data: BudgetData;
        isEditing: boolean;
        onUpdate: (section: keyof BudgetData, id: string, changes: Record<string, unknown>) => void;
        onChange: (expenses: ExpenseItem[], expenseBudgets: ExpenseBudgetsItem[]) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const update = (id: string, field: keyof ExpenseItem, v: string | number) => {
        const updatedExpenses = data.expenses.map(d => d.id === id ? { ...d, [field]: v } : d);

        if (field === "amount") {
            // Recalculate actuals for all categories from scratch
            const actualsByCategory: Record<string, number> = {};
            updatedExpenses.forEach(e => {
                if (e.category) {
                    actualsByCategory[e.category] = (actualsByCategory[e.category] ?? 0) + Number(e.amount);
                }
            });

            const updatedExpenseBudgets = data.expense_budgets.map(eb => ({
                ...eb,
                actual: actualsByCategory[eb.category] ?? 0,
                remaining: eb.budget - (actualsByCategory[eb.category] ?? 0),
            }));

            onChange(updatedExpenses, updatedExpenseBudgets);
        } else {
            onChange(updatedExpenses, data.expense_budgets);
        }
    };
    return (
        <div className='overflow-hidden rounded-lg border mb-4'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-muted/80'>
                        <TableHead colSpan={4} className="font-semibold tracking-widest text-center text-muted-foreground">
                            Expense Tracker
                        </TableHead>
                    </TableRow>
                    <TableRow className='bg-muted/20'>
                        <TableHead>
                            Date
                        </TableHead>
                        <TableHead>
                            Amount
                        </TableHead>
                        <TableHead>
                            Description
                        </TableHead>
                        <TableHead>
                            Category
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.expenses.map(e => (
                        <TableRow key={e.id}>
                            <TableCell>
                                <EditCell value={e.date} currency={data.currency} type="date" isEditing={isEditing} onSave={v => update(e.id, "date", v)} align="left" />
                            </TableCell>
                            <TableCell>
                                <EditCell value={e.amount} currency={data.currency} type="number" isEditing={isEditing} onSave={v => update(e.id, "amount", v)} align="left" />
                            </TableCell>
                            <TableCell>
                                <EditCell value={e.description} currency={data.currency} type="text" isEditing={isEditing} onSave={v => update(e.id, "description", v)} align="left" />
                            </TableCell>
                            <TableCell className='flex items-center justify-between gap-2'>
                                <Select value={e.category} onValueChange={(val) => onUpdate("expenses", e.id, { category: val })}>
                                    <SelectTrigger className='w-full max-w-48' size='sm'>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>

                                            {[...new Set(data.expense_budgets.map(e => e.category))].map(category => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <DeleteBtn onClick={() => onRemove("expenses", e.id)} isEditing={isEditing} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddRowBtn onClick={() =>
                onChange(
                    [...data.expenses, { id: uid(), date: "", amount: 0, description: "", category: "" }],
                    data.expense_budgets
                )
            }
                isEditing={isEditing}
            />
        </div>
    )
}

export default ExpenseTrackerTable