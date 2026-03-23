"use client"
import { IconTrendingDown, IconTrendingUp, IconMinus } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, FormatNumber } from "@/lib/utils"
import { transactionCategoryStyles } from "@/constants"

const TrendIcon = ({ trend }: { trend: MonthOverMonthParams["trend"] }) => {
  if (trend === "down") return <IconTrendingDown className="size-4" />
  if (trend === "flat") return <IconMinus className="size-4" />
  return <IconTrendingUp className="size-4" />
}

const trendColor = (trend: MonthOverMonthParams["trend"]) => {
  if (trend === "up" || trend === "new") return "text-red-500"
  if (trend === "down") return "text-green-500"
  return "text-muted-foreground"
}

export function SectionCards({ spending_insights, month_over_month }: GPTSummaryParams) {
  if (!spending_insights || !month_over_month) return null;

  const top4 = [...spending_insights]
    .sort((a, b) => b.total_amount - a.total_amount)
    .slice(0, 4)

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 lg:px-6 *:data-[slot=card]:bg-gray-50 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {top4.map((item) => {
        const mom = month_over_month.find((m) => m.category === item.category)
        const trend = mom?.trend ?? "flat"
        const changePercent = mom?.change_percent ?? 0
        const isNew = trend === "new"

        const { borderColor, textColor, chipBackgroundColor } = transactionCategoryStyles[item.category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;

        return (
          <Card key={item.category} className="@container/card">
            <CardHeader>
              <CardDescription>
                <Badge variant="outline" className={cn('category-badge', borderColor, chipBackgroundColor)}>
                  <p className={cn(textColor)}>{item.category}</p>
                </Badge>
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {FormatNumber(item.total_amount)}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className={trendColor(trend)}>
                  <TrendIcon trend={trend} />
                  {isNew ? "New" : `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(1)}%`}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className={`line-clamp-1 flex gap-2 font-medium ${trendColor(trend)}`}>
                {isNew && "New category this month"}
                {trend === "up" && `Up ${changePercent.toFixed(1)}% from last period`}
                {trend === "down" && `Down ${Math.abs(changePercent).toFixed(1)}% from last period`}
                {trend === "flat" && "No change from last period"}
                <TrendIcon trend={trend} />
              </div>
              <div className="text-muted-foreground space-y-1">
                {item.insight}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}