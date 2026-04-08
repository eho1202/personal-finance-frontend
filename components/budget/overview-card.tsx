import { CURRENCIES } from '@/constants';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const OverviewCard = ({ data, onChange }
    : {
        data: BudgetData;
        onChange: (partial: Partial<BudgetData>) => void;
    }) => {
    return (
        <Table>
            <TableHeader className="bg-muted/80 sticky top-0 z-10">
                <TableRow>
                    <TableHead colSpan={2} className="font-semibold tracking-widest text-center text-muted-foreground">Overview</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="text-muted-foreground text-sm">
                        Currency
                    </TableCell>
                    <TableCell className="text-right flex justify-end">
                        <Select value={data.currency} onValueChange={(val) => onChange({ currency: val })}>
                            <SelectTrigger className='w-full max-w-24' size='sm'>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        {CURRENCIES.map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectLabel>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-muted-foreground text-sm">
                        Start Date
                    </TableCell>
                    <TableCell className='text-right'>
                        {data.start_date}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-muted-foreground text-sm">
                        End Date
                    </TableCell>
                    <TableCell className='text-right'>
                        {data.end_date}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default OverviewCard