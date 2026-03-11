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
  return res.json();
}

export async function getMonthlySummary(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/monthly_summary?month=${month}&year=${year}`,
    { headers: await getAuthHeaders() },
  );
  return res.json();
}

export async function getGPTAnalysis(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gpt_analysis?month=${month}&year=${year}`,
    { headers: await getAuthHeaders() },
  );
  return res.json();
}
