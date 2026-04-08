"use client";

import { useEffect, useState, useCallback } from "react";
import BudgetNav from "./budget-nav";
import BudgetOverview from "./budget-overview";
import BudgetCategories from "./budget-category";
import BudgetExpenseCategories from "./budget-expense-tracker";
import { getBudget, saveBudget } from "@/api/api";
import { MONTHS } from '@/constants'
import { Skeleton } from "../ui/skeleton";
import BudgetSkeleton from "./budget-skeleton";

export function BudgetDashboard() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setData(null);
      try {
        const budget = await getBudget(MONTHS[month - 1], year);
        setData(budget);
      } catch (err) {
        console.error("Failed to load budget:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [month, year]);

  const onUpdate = useCallback((section: keyof BudgetData, id: string, changes: Record<string, unknown>) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: (prev[section] as any[]).map((row: any) =>
          row.id === id ? { ...row, ...changes } : row
        )
      }
    })
  }, []);

  const onChange = useCallback((partial: Partial<BudgetData>) => {
    setData(prev => {
      if (!prev) return prev;
      return { ...prev, ...partial };
    });
  }, []);

  const navigate = (offsetMonths: number) => {
    const d = new Date(year, month - 1 + offsetMonths, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth() + 1);
  };

  const removeRow = useCallback((section: keyof BudgetData, id: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: (prev[section] as any[]).filter((row: any) => row.id !== id)
      }
    });
  }, []);

  const onSave = useCallback(async () => {
    if (!data) return;
    await saveBudget(MONTHS[month - 1], year, data);
  }, [month, year, data]);

  if (loading) return (
    <BudgetSkeleton />
  );

  if (!data) return (
    <div className="flex items-center justify-center mx-4 h-24 text-muted-foreground text-sm">
      Failed to load budget
    </div>
  );

  return (
    <div className="flex flex-col gap-4 mx-4">
      <BudgetNav data={data} month={month} year={year} onPrev={() => navigate(-1)} onNext={() => navigate(+1)} />
      <BudgetOverview data={data} onChange={onChange} />
      <BudgetCategories data={data} onUpdate={onUpdate} onChange={onChange} onRemove={removeRow} onSave={onSave} />
      <BudgetExpenseCategories data={data} onUpdate={onUpdate} onChange={onChange} onRemove={removeRow} />
    </div>
  );
}