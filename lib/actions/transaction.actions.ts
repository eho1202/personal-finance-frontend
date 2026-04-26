import { getGPTAnalysis, getMonthlySummary, getTransactions } from "@/api/api";

export const getTransactionData = async (
  month: string,
  year: number,
): Promise<TransactionParams[]> => {
  try {
    const data = await getTransactions(month, year);
    return data;
  } catch (err: any) {
    if (err instanceof TypeError && err.message.includes("fetch failed")) {
      throw new Error("Unable to reach the server. Please check your connection.")
    }
    console.error("getTransactionData error:", err);
    return [];
  }
};

export const getMonthlySummaryData = async (
  month: string,
  year: number,
): Promise<TransactionsSummaryParams[]> => {
  try {
    const data = await getMonthlySummary(month, year);
    return data;
  } catch (err: any) {
    return err;
  }
};

export const getGPTSummaryData = async (
  month: string,
  year: number,
): Promise<GPTSummaryParams> => {
  try {
    const data = await getGPTAnalysis(month, year);
    return data;
  } catch (err: any) {
    return err;
  }
};
