import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import EditCell from './budget-edit-cell';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { EXPENSE_CATEGORIES } from '@/constants';
import { fmt, uid } from '@/lib/utils';
import AddRowBtn from './add-row-button';
import DeleteBtn from './delete-button';

const ExpensesTable = ({ data, expenseTotal, isEditing, onUpdate, onChange, onRemove }
    : {
        data: BudgetData;
        expenseTotal: { budget: number, actual: number };
        isEditing: boolean;
        onUpdate: (section: keyof BudgetData, id: string, changes: Record<string, unknown>) => void;
        onChange: (expenses: ExpenseBudgetsItem[], budgets: Record<string, number>) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const updateRow = (id: string, field: keyof ExpenseBudgetsItem, v: string | number) =>
        onChange(
            data.expense_budgets.map(e => e.id === id ? { ...e, [field]: v } : e),
            data.expense_items
        );
    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/80">
                        <TableHead colSpan={5} className="font-semibold tracking-widest text-center text-muted-foreground">
                            Expenses
                        </TableHead>
                    </TableRow>
                    <TableRow className="bg-muted/20">
                        <TableHead>
                            Category
                        </TableHead>
                        <TableHead className="text-right">
                            Budget
                        </TableHead>
                        <TableHead className="text-right">
                            Actual
                        </TableHead>
                        <TableHead className="text-right">
                            Remaining
                        </TableHead>
                        <TableHead className="w-8" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.expense_budgets.map(e => (
                        e.remaining = e.budget - e.actual,
                        <TableRow key={e.category}>
                            <TableCell>
                                <Select value={e.category} onValueChange={(val) => onUpdate("expense_budgets", e.id, { category: val })}>
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
                            </TableCell>
                            <TableCell>
                                <EditCell value={e.budget} currency={data.currency} type="number" isEditing={isEditing} onSave={v => updateRow(e.id, "budget", v)} />
                            </TableCell>
                            <TableCell>
                                <EditCell value={e.actual} currency={data.currency} type="number" isEditing={isEditing} onSave={v => updateRow(e.id, "actual", v)} />
                            </TableCell>
                            <TableCell
                                align="right"
                                className={
                                    e.remaining < 0 ? "text-red-600 dark:text-red-800" :
                                        e.remaining > 0 ? "text-green-600 dark:text-green-800" :
                                            "text-primary"
                                }>
                                {fmt(e.remaining, data.currency)}
                            </TableCell>
                            <TableCell className="w-8 p-0">
                                <DeleteBtn onClick={() => onRemove("expense_budgets", e.id)} isEditing={isEditing} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">{fmt(expenseTotal.budget, data.currency)}</TableCell>
                        <TableCell align="right">{fmt(expenseTotal.actual, data.currency)}</TableCell>
                        <TableCell align="right">{fmt(expenseTotal.budget - expenseTotal.actual, data.currency)}</TableCell>
                        <TableCell className="w-8" />
                    </TableRow>
                </TableFooter>
            </Table>
            <AddRowBtn onClick={() =>
                onChange([...data.expense_budgets, { id: uid(), category: "", budget: 0, actual: 0, remaining: 0 }], data.expense_items)
            }
                isEditing={isEditing}
            />
        </div>
    )
}

export default ExpensesTable