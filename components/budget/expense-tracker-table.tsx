import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { EXPENSE_CATEGORIES } from '@/constants'
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, Select } from '../ui/select'
import AddRowBtn from './add-row-button'
import { uid } from '@/lib/utils'
import EditCell from './budget-edit-cell'
import DeleteBtn from './delete-button'

const ExpenseTrackerTable = ({ data, onUpdate, onChange, onRemove }
    : {
        data: BudgetData;
        onUpdate: (section: keyof BudgetData, id: string, changes: Record<string, unknown>) => void;
        onChange: (expenses: ExpenseItem[]) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const update = (id: string, field: keyof ExpenseItem, v: string | number) =>
        onChange(data.expenses.map(d => d.id === id ? { ...d, [field]: v } : d));
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
                                <EditCell value={e.date} type="date" onSave={v => update(e.id, "date", v)} align="left" />
                            </TableCell>
                            <TableCell>
                                <EditCell value={e.amount} type="number" onSave={v => update(e.id, "amount", v)} align="left" />
                            </TableCell>
                            <TableCell>
                                <EditCell value={e.description} type="text" onSave={v => update(e.id, "description", v)} align="left" />
                            </TableCell>
                            <TableCell className='flex items-center justify-between gap-2'>
                                <Select value={e.category} onValueChange={(val) => onUpdate("expenses", e.id, { category: val })}>
                                    <SelectTrigger className='w-full max-w-48' size='sm'>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            {EXPENSE_CATEGORIES.map(c => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <DeleteBtn onClick={() => onRemove("expenses", e.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddRowBtn onClick={() =>
                onChange([...data.expenses, { id: uid(), date: "", amount: 0, description: "", category: "" }])
            } />
        </div>
    )
}

export default ExpenseTrackerTable