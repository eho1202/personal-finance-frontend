"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"
import { transactionCategoryStyles } from "@/constants"
import { cn, FormatNumber } from "@/lib/utils"
import { IconArrowsUpDown } from "@tabler/icons-react"
import { Button } from "../ui/button"

const SortableHeader = ({ column, label }: { column: any; label: string }) => {
  const handleSort = () => {
    if (column.getIsSorted() === "asc") {
      column.toggleSorting(true)
    } else if (column.getIsSorted() === "desc") {
      column.clearSorting()
    } else {
      column.toggleSorting(false)
    }
  }

  return (
    <Button variant="ghost" onClick={handleSort}>
      {label}
      <IconArrowsUpDown />
    </Button>
  )
}

export const columns: ColumnDef<TransactionParams>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "trans_date",
    header: "Transaction Date",
  },
  {
    accessorKey: "category",
    header: ({ column }) => <SortableHeader column={column} label="Category" />,
    cell: ({ row }) => {
      const { borderColor, textColor, chipBackgroundColor } = transactionCategoryStyles[row.original.category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;

      return (
        <Badge variant="outline" className={cn('category-badge', borderColor, chipBackgroundColor)}>
          <p className={cn(textColor)}>{row.original.category}</p>
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableHeader column={column} label="Amount" />,
    cell: ({ row }) => FormatNumber(row.original.amount),
  },
]