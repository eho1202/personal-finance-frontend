'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { IconChevronDown } from '@tabler/icons-react'

const TransactionsDropdown = ({ selectedMonth, selectedYear, availableMonths, onMonthChange, onYearChange }: TransactionsDropdownProps) => {
    const monthsForYear = availableMonths[selectedYear] ?? []
    const availableYears = Object.keys(availableMonths).map(Number)

    return (
        <div className="flex items-center gap-2 px-4 lg:px-6">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {selectedMonth}
                        <IconChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="start">
                    {monthsForYear.map((month) => (
                        <DropdownMenuItem
                            key={month}
                            onClick={() => onMonthChange(month)}
                            className={selectedMonth === month ? "font-semibold" : ""}
                        >
                            {month}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {selectedYear}
                        <IconChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24" align="start">
                    {availableYears.map((year) => (
                        <DropdownMenuItem
                            key={year}
                            onClick={() => onYearChange(year)}
                            className={selectedYear === year ? "font-semibold" : ""}
                        >
                            {year}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TransactionsDropdown