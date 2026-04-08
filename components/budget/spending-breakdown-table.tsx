import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { fmt } from '@/lib/utils';

const SpendingBreakdownTable = ({ pieDataWithKeys, total, currency }
    : {
        pieDataWithKeys: { key: string, name: string, value: number }[];
        total:  number;
        currency: string;
    }
) => {
    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-muted/80'>
                        <TableHead colSpan={3} className="font-semibold tracking-widest text-center text-muted-foreground">
                            Spending Breakdown
                        </TableHead>
                    </TableRow>
                    <TableRow className='bg-muted/20'>
                        <TableHead>Expense</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">%</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pieDataWithKeys.map((d, i) => (
                        <TableRow key={d.key}>
                            <TableCell>
                                {d.name}
                            </TableCell>
                            <TableCell align="right">
                                {fmt(d.value, currency)}
                            </TableCell>
                            <TableCell align="right">
                                {((d.value / total) * 100).toFixed(1)}%
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SpendingBreakdownTable