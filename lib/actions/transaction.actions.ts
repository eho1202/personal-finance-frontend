import { getGPTAnalysis, getMonthlySummary, getTransactions } from "@/api/api";

export const getTransactionData = async (
  month: string,
  year: number,
): Promise<TransactionParams[]> => {
  try {
    const data = await getTransactions(month, year);
    return data;
  } catch (err) {
    console.error("getTransactionData error:", err);
    return [];
  }
};

export const getMonthlySummaryData = async (
  month: string,
  year: number,
): Promise<TransactionsSummaryParams[]> => {
  const data = await getMonthlySummary(month, year);
  return data;
};

export const getGPTSummaryData = async (
  month: string,
  year: number,
): Promise<GPTSummaryParams> => {
  return getGPTAnalysis(month, year);
};
