"use client";

// components/BudgetClient.tsx
// All state — including current month/year — lives here. No API calls yet.
// TODO: wire patch() to FastAPI PUT /api/budgets/{year}/{month} when ready.

import { useState, useCallback } from "react";
import BudgetNav from "./budget-nav";
import BudgetOverview from "./budget-overview";
import BudgetCategories from "./budget-category";
import BudgetExpenseCategories from "./budget-expense-tracker";

export function BudgetDashboard({ initialData }: BudgetDashboardProps) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-indexed
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState<BudgetData>(initialData);

  const onUpdate = (section: keyof BudgetData, id: string, changes: Record<string, unknown>) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((row: any) =>
        row.id === id ? { ...row, ...changes } : row
      )
    }))
  }

  const onChange = useCallback((partial: Partial<BudgetData>) => setData(d => ({ ...d, ...partial })), []);

  const navigate = (offsetMonths: number) => {
    const d = new Date(year, month - 1 + offsetMonths, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth() + 1);
  };

  const removeRow = (section: keyof BudgetData, id: string) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((row: any) => row.id !== id)
    }))
  }

  return (
    <div className="flex flex-col gap-4 mx-4">

      <BudgetNav data={data} month={month} year={year} onPrev={() => navigate(-1)} onNext={() => navigate(+1)} />

      <BudgetOverview data={data} onChange={onChange} />

      <BudgetCategories data={data} onUpdate={onUpdate} onChange={onChange} onRemove={removeRow} />

      <BudgetExpenseCategories data={data} onUpdate={onUpdate} onChange={onChange} onRemove={removeRow}/>

    </div>
  );
}