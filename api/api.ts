export async function getTransactions(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions?month=${month}&year=${year}`,
    {next: {revalidate: 3600}}
  );
  return res.json();
}

export async function getMonthlySummary(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/monthly_summary?month=${month}&year=${year}`,
    {next: {revalidate: 3600}}
  );
  return res.json();
}

export async function getGPTAnalysis(month: string, year: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gpt_analysis?month=${month}&year=${year}`,
    { next: { revalidate: 60 * 60 * 24 } }
  );
  return res.json();
}

export async function uploadStatement(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  return response.json();
}

export async function fetchETL(formData: FormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/etl`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  return response;
}
