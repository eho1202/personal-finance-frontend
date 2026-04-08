"use server";
import { createClient } from "@/lib/supabase/server";

async function getAuthHeaders() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${session?.access_token}`,
  };
}

export async function getTransactions(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions?month=${month}&year=${year}`,
    { headers: await getAuthHeaders() },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }

  return res.json();
}

export async function getMonthlySummary(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/monthly_summary?month=${month}&year=${year}`,
    { headers: await getAuthHeaders() },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch monthly summary: ${res.status}`);
  }

  return res.json();
}

export async function getGPTAnalysis(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gpt_analysis?month=${month}&year=${year}`,
    { headers: await getAuthHeaders() },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch GPT analysis: ${res.status}`);
  }

  return res.json();
}

export async function getBudget(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/budgets/${year}/${month}`,
    { headers: await getAuthHeaders() },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch budget data: ${res.status}`);
  }

  return res.json();
}

export async function saveBudget(month: string, year: number, data: BudgetData) {
  const payload = {
    currency: data.currency,
    start_date: data.start_date || null,
    end_date: data.end_date || null,
    income: data.income,
    bills: data.bills.map(b => ({
      ...b,
      due_date: b.due_date || null,
    })),
    debts: data.debts.map(d => ({
      ...d,
      due_date: d.due_date || null,
    })),
    savings: data.savings,
    expense_budgets: data.expense_budgets,
    expense_items: data.expense_items,
    expenses: data.expenses,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/budgets/${year}/${month}`,
    {
      method: "PUT",
      headers: {
        ...await getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    console.error("422 detail:", JSON.stringify(error.detail, null, 2));
    throw new Error(error.detail ?? `Failed to save budget: ${res.status}`);
  }

  return res.json();
}
