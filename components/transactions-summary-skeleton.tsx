import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TransactionsSummarySkeleton() {
    return (
        <Card className="w-full">
            <CardHeader>
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64 mt-1" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Doughnut placeholder */}
                    <div className="relative flex-shrink-0 w-62 h-62 mx-4 flex items-center justify-center">
                        <Skeleton className="w-56 h-56 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Skeleton className="w-32 h-32 rounded-full bg-background" />
                        </div>
                    </div>

                    {/* Right panel */}
                    <div className="flex-1 w-full">
                        <div className="flex gap-12">

                            {/* Top Categories */}
                            <div className="flex-1 space-y-4">
                                <Skeleton className="h-3 w-32 mb-3" />
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="w-4 h-3" />
                                        <Skeleton className="w-2.5 h-2.5 rounded-full" />
                                        <Skeleton className="h-3 flex-1" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                ))}
                            </div>

                            {/* All Categories */}
                            <div className="flex-1 mr-4 space-y-2">
                                <Skeleton className="h-3 w-28 mb-3" />
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Skeleton className="w-2 h-2 rounded-full" />
                                        <Skeleton className="h-3 flex-1" />
                                        <Skeleton className="h-3 w-6" />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}