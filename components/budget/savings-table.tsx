import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import EditCell from './budget-edit-cell';
import { fmt, uid } from '@/lib/utils';
import AddRowBtn from './add-row-button';
import DeleteBtn from './delete-button';

const SavingsTable = ({ data, savingsTotal, isEditing, onChange, onRemove }
    : {
        data: BudgetData;
        savingsTotal: { budget: number, actual: number };
        isEditing: boolean;
        onChange: (items: SavingsItem[]) => void;
        onRemove: (section: keyof BudgetData, id: string) => void;
    }) => {
    const update = (id: string, field: keyof SavingsItem, v: string | number) =>
        onChange(data.savings.map(d => d.id === id ? { ...d, [field]: v } : d));
    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-muted/80'>
                        <TableHead colSpan={4} className="font-semibold tracking-widest text-center text-muted-foreground">
                            Savings
                        </TableHead>
                    </TableRow>
                    <TableRow className="bg-muted/20">
                        <TableHead>Description</TableHead>
                        <TableHead className='text-right'>Budget</TableHead>
                        <TableHead className='text-right'>Actual</TableHead>
                        <TableHead className="w-8" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.savings.map(s => (
                        <TableRow key={s.id}>
                            <TableCell><EditCell value={s.description} currency={data.currency} type="text" isEditing={isEditing} onSave={v => update(s.id, "description", v)} align="left" /></TableCell>
                            <TableCell><EditCell value={s.budget} currency={data.currency} type="number" isEditing={isEditing} onSave={v => update(s.id, "budget", v)} /></TableCell>
                            <TableCell><EditCell value={s.actual} currency={data.currency} type="number" isEditing={isEditing} onSave={v => update(s.id, "actual", v)} /></TableCell>
                            <TableCell className="w-8 p-0">
                                <DeleteBtn onClick={() => onRemove("savings", s.id)} isEditing={isEditing} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align='right'>
                            {fmt(savingsTotal.budget, data.currency)}
                        </TableCell>
                        <TableCell align='right'>
                            {fmt(savingsTotal.actual, data.currency)}
                        </TableCell>
                        <TableCell className="w-8" />
                    </TableRow>
                </TableFooter>
            </Table>
            <AddRowBtn onClick={() =>
                onChange([...data.savings, { id: uid(), description: "", budget: 0, actual: 0 }])
            }
                isEditing={isEditing}
            />

        </div>
    )
}

export default SavingsTable