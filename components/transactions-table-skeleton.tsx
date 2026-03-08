import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TransactionsTableSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-8 w-40" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4">
                {/* Table header */}
                <div className="overflow-hidden rounded-lg border">
                    <div className="bg-muted px-4 py-3 grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-3" />
                        ))}
                    </div>

                    {/* Table rows */}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="px-4 py-3 grid grid-cols-4 gap-4 border-t"
                        >
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-40" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-24" />
                        <div className="flex gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-8 w-8 rounded-md" />
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
