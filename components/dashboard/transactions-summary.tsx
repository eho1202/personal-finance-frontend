"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { transactionCategoryStyles } from "@/constants";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
} from "chart.js";
import { FormatNumber, getHexColor } from "@/lib/utils";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

const getCategoryStyle = (category: string) => {
  return (
    transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] ||
    transactionCategoryStyles.default
  );
};

export default function TransactionsSummary({ data, month, year }: TransactionsSummaryProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Sort by total_amount descending for top 3
  const sorted = [...data].sort((a, b) => b.total_amount - a.total_amount);
  const top5 = sorted.slice(0, 5);

  const total_amount = [...data].reduce((partialSum, a) => partialSum + a.total_amount, 0);

  // Build doughnut chart data from transaction_count
  const chartData: ChartData<"doughnut"> = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.transaction_count),
        backgroundColor: data.map(
          (d) => getHexColor(getCategoryStyle(d.category).backgroundColor, isDark)
        ),
        borderColor: "transparent",
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    layout: {
      padding: 10,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"doughnut">) => ` ${ctx.label}: ${ctx.parsed} transactions`,
        },
      },
    },
  };

  // Total transaction count for center label
  const totalTransactions = data.reduce((sum, d) => sum + d.transaction_count, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold tracking-tight">
          {month} {year} Spending Summary
        </CardTitle>
        <CardDescription>
          Total spending for this month: {FormatNumber(total_amount)}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* ---- Doughnut Chart ---- */}
          <div className="relative flex-shrink-0 w-62 h-62 mx-4">
            <Doughnut data={chartData} options={chartOptions} />
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-foreground leading-none">
                {totalTransactions}
              </span>
              <span className="text-xs text-muted-foreground mt-1">transactions</span>
            </div>
          </div>

          {/* ---- Right Panel ---- */}
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Top 3 Categories */}
              <div className="flex-1">
                <p className="text-md font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Top Categories
                </p>
                <div className="space-y-4">
                  {top5.map((item, index) => {
                    const style = getCategoryStyle(item.category);
                    return (
                      <div key={item.category} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-muted-foreground w-4">
                          {index + 1}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${style.backgroundColor}`} />
                        <span className="text-sm font-medium flex-1 truncate">
                          {item.category}
                        </span>
                        <span className={`text-sm font-semibold ${style.textColor}`}>
                          {FormatNumber(item.total_amount)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* All Categories Legend */}
              <div className="flex-1 mr-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  All Categories
                </p>
                <div className="grid grid-cols-1 gap-y-2">
                  {data.map((item) => {
                    const style = getCategoryStyle(item.category);
                    return (
                      <div key={item.category} className="flex items-center gap-2 min-w-0">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.backgroundColor}`} />
                        <span className="text-xs text-muted-foreground truncate">
                          {item.category}
                        </span>
                        <span className="text-xs font-medium ml-auto">
                          {item.transaction_count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}