import { getGPTAnalysis, getMonthlySummary, getTransactions } from "@/api/api";

export const getTransactionData = async (
  month: string,
  year: number,
): Promise<TransactionParams[]> => {
  const data = await getTransactions(month, year);
  return data;
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
