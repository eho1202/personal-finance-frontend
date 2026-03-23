import React from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import EditCell from './budget-edit-cell';
import { fmt, uid } from '@/lib/utils';
import AddRowBtn from './add-row-button';
import DeleteBtn from './delete-button';

const BillsTable = ({ data, billsTotal, onUpdate, onChange, onRemove }
    : {
        data: BudgetData;
        billsTotal: { budget: number, actual: number };
        onUpdate: (section: keyof BudgetData, id: string, changes: Record<string, unknown>) => void;
        onChange: (items: BillItem[]) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const update = (id: string, field: keyof BillItem, v: string | number | boolean) =>
        onChange(data.bills.map(b => b.id === id ? { ...b, [field]: v } : b));
    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-muted/80'>
                        <TableHead colSpan={6} className="font-semibold tracking-widest text-center text-muted-foreground">
                            Bills
                        </TableHead>
                    </TableRow>
                    <TableRow className="bg-muted/20">
                        <TableHead>
                            <Checkbox
                                checked={
                                    data.bills.length > 0 && data.bills.every(b => b.paid)
                                        ? true
                                        : data.bills.some(b => b.paid)
                                            ? "indeterminate"
                                            : false
                                }
                                onCheckedChange={(checked) => {
                                    data.bills.forEach(b =>
                                        onUpdate("bills", b.id, { paid: checked === true })
                                    )
                                }}
                            />
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Due-Date</TableHead>
                        <TableHead className='text-right'>Budget</TableHead>
                        <TableHead className='text-right'>Actual</TableHead>
                        <TableHead className="w-8" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.bills.map(b => (
                        <TableRow key={b.id}>
                            <TableCell>
                                <Checkbox
                                    checked={b.paid}
                                    onCheckedChange={(checked) => {
                                        onUpdate("bills", b.id, { paid: checked === true })
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <EditCell value={b.description} type="text" onSave={v => update(b.id, "description", v)} align="left" />
                            </TableCell>
                            <TableCell>
                                <EditCell value={b.dueDate} type="date" onSave={v => update(b.id, "dueDate", v)} align="left" />
                            </TableCell>
                            <TableCell>
                                <EditCell value={b.budget} type="number" onSave={v => update(b.id, "budget", v)} />
                            </TableCell>
                            <TableCell className='flex'>
                                <EditCell value={b.actual} type="number" onSave={v => update(b.id, "actual", v)} />
                            </TableCell>
                            <TableCell className="w-8 p-0">
                                <DeleteBtn onClick={() => onRemove("bills", b.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Total
                        </TableCell>
                        <TableCell align="right">
                            {fmt(billsTotal.budget)}
                        </TableCell>
                        <TableCell align="right">
                            {fmt(billsTotal.actual)}
                        </TableCell>
                        <TableCell className="w-8" />
                    </TableRow>
                </TableFooter>
            </Table>
            <AddRowBtn onClick={() =>
                onChange([...data.bills, { id: uid(), paid: false, description: "", dueDate: "", budget: 0, actual: 0 }])
            } />
        </div>
    )
}

export default BillsTable