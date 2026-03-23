'use client'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import EditCell from './budget-edit-cell';
import AddRowBtn from './add-row-button';
import { fmt, uid } from '@/lib/utils';
import DeleteBtn from './delete-button';

const IncomeTable = ({ data, incomeTotal, onChange, onRemove }
    : {
        data: BudgetData;
        incomeTotal: { expected: number; actual: number };
        onChange: (items: IncomeItem[]) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const update = (id: string, field: keyof IncomeItem, v: string | number) =>
        onChange(data.income.map(i => i.id === id ? { ...i, [field]: v } : i));
    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-muted/80'>
                        <TableHead colSpan={4} className="font-semibold tracking-widest text-center text-muted-foreground">
                            Income
                        </TableHead>
                    </TableRow>
                    <TableRow className="bg-muted/20">
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Expected</TableHead>
                        <TableHead className="text-right">Actual</TableHead>
                        <TableHead className="w-8" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.income.map(i => (
                        <TableRow key={i.id}>
                            <TableCell><EditCell value={i.description} type="text" onSave={v => update(i.id, "description", v)} align="left" /></TableCell>
                            <TableCell><EditCell value={i.expected} type="number" onSave={v => update(i.id, "expected", v)} /></TableCell>
                            <TableCell><EditCell value={i.actual} type="number" onSave={v => update(i.id, "actual", v)} /></TableCell>
                            <TableCell className="w-8 p-0">
                                <DeleteBtn onClick={() => onRemove("income", i.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">
                            {fmt(incomeTotal.expected)}
                        </TableCell>
                        <TableCell align='right'>
                            {fmt(incomeTotal.actual)}
                        </TableCell>
                        <TableCell className="w-8" />
                    </TableRow>
                </TableFooter>
            </Table>
            <AddRowBtn onClick={() =>
                onChange([...data.income, { id: uid(), description: "", expected: 0, actual: 0 }])
            } />
        </div >
    )
}

export default IncomeTable