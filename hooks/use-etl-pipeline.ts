import { fetchETL } from "@/api/api";
import { INITIAL_STEPS, STEP_EVENT_MAP } from "@/constants";
import { useState } from "react";

export function useETLPipeline() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<ETLResult | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [steps, setSteps] = useState<ETLStep[]>(INITIAL_STEPS);

  const updateStep = (index: number, status: StepStatus, detail?: string) => {
    setSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, status, detail } : step))
    );
  };

  const resetSteps = () => {
    setSteps(INITIAL_STEPS);
    setResult(null);
    setGlobalError(null);
  };

  const runPipeline = async (file: File) => {
    setUploading(true);
    resetSteps();

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await fetchETL(formData);

      // Read SSE stream
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response body");

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        let currentEvent = "";
        for (const line of lines) {
          if (line.startsWith("event:")) {
            currentEvent = line.replace("event:", "").trim();
          } else if (line.startsWith("data:")) {
            const data = JSON.parse(line.replace("data:", "").trim());
            const stepIndex = STEP_EVENT_MAP[currentEvent];

            if (currentEvent === "done") {
              setResult(data.result);
            } else if (currentEvent === "error") {
              setGlobalError(data.message);
            } else if (stepIndex !== undefined) {
              updateStep(stepIndex, data.status, data.message);
            }
          }
        }
      }
    } catch (e: any) {
      setGlobalError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const allSuccess = steps.every((s) => s.status === "success");

  return {
    steps,
    uploading,
    result,
    globalError,
    allSuccess,
    resetSteps,
    runPipeline,
  };
}