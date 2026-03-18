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
