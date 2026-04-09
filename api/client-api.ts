import { createClient } from "@/lib/supabase/client";

async function getAuthHeaders(includeContentType: boolean = true) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${session?.access_token}`,
  };

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

export async function uploadStatement(formData: FormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: "POST",
    headers: await getAuthHeaders(false),
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  return response;
}

export async function streamChatMessage(
  messages: { role: string; content: string }[],
  onChunk: (content: string) => void,
): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error.detail);
    throw new Error(error.detail);
  }

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) throw new Error("No response body");

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? ""; // keep incomplete line in buffer

    for (const line of lines) {
      if (line.startsWith("data: ") && line !== "data: [DONE]") {
        try {
          const { content } = JSON.parse(line.replace("data: ", ""));
          if (content) onChunk(content);
        } catch {
          // ignore malformed lines
        }
      }
    }
  }
}
