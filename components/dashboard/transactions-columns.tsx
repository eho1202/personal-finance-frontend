"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"
import { transactionCategoryStyles } from "@/constants"
import { cn, FormatNumber } from "@/lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
    header: "Category",
    cell: ({ row }) => {
      const { borderColor, textColor, chipBackgroundColor } = transactionCategoryStyles[row.original.category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;

      return (
        <Badge variant="outline" className={cn('category-badge', borderColor, chipBackgroundColor)}>
          <p className={cn(textColor)}>{row.original.category}</p>
        </Badge>
      )
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (FormatNumber(row.original.amount));
    }
  },
]