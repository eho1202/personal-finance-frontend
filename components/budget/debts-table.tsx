'use client'
import { uid } from '@/lib/utils';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import AddRowBtn from './add-row-button';
import EditCell from './budget-edit-cell';
import DeleteBtn from './delete-button';

const DebtsTable = ({ data, debtsTotal, isEditing, onChange, onRemove }
    : {
        data: BudgetData;
        debtsTotal: { budget: number, paid: number };
        isEditing: boolean;
        onChange: (items: DebtItem[]) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const update = (id: string, field: keyof DebtItem, v: string | number) =>
        onChange(data.debts.map(d => d.id === id ? { ...d, [field]: v } : d));
    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-muted/80'>
                        <TableHead colSpan={5} className="font-semibold tracking-widest text-center text-muted-foreground">
                            Debts
                        </TableHead>
                    </TableRow>
                    <TableRow className="bg-muted/20">
                        <TableHead>Description</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className='text-right'>Budget</TableHead>
                        <TableHead className='text-right'>Paid</TableHead>
                        <TableHead className="w-8" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.debts.map(d => (
                        <TableRow key={d.id}>
                            <TableCell><EditCell value={d.description} type="text" isEditing={isEditing} onSave={v => update(d.id, "description", v)} align="left" /></TableCell>
                            <TableCell><EditCell value={d.due_date} type="date" isEditing={isEditing} onSave={v => update(d.id, "due_date", v)} align="left" /></TableCell>
                            <TableCell><EditCell value={d.budget} type="number" isEditing={isEditing} onSave={v => update(d.id, "budget", v)} /></TableCell>
                            <TableCell><EditCell value={d.paid} type="number" isEditing={isEditing} onSave={v => update(d.id, "paid", v)} /></TableCell>
                            <TableCell className="w-8 p-0">
                                <DeleteBtn onClick={() => onRemove("debts", d.id)} isEditing={isEditing} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align='right'>
                            ${debtsTotal.budget}
                        </TableCell>
                        <TableCell align='right'>
                            ${debtsTotal.paid}
                        </TableCell>
                        <TableCell className="w-8" />
                    </TableRow>
                </TableFooter>
            </Table>
            <AddRowBtn onClick={() =>
                onChange([...data.debts, { id: uid(), description: "", due_date: "", budget: 0, paid: 0 }])
            }
                isEditing={isEditing}
            />
        </div>
    )
}

export default DebtsTable