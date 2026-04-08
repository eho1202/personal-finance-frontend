import React from 'react'
import { Skeleton } from '../ui/skeleton'

const BudgetSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 mx-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

export default BudgetSkeleton