"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconCheck, IconX, IconLoader } from "@tabler/icons-react";
import FileUpload from "@/components/file-upload";
import { useETLPipeline } from "@/hooks/use-etl-pipeline";

const StepIcon = ({ status }: { status: StepStatus }) => {
  if (status === "loading") return <IconLoader className="w-4 h-4 animate-spin text-gray-500" />;
  if (status === "success") return <IconCheck className="w-4 h-4 text-green-500" />;
  if (status === "error") return <IconX className="w-4 h-4 text-red-500" />;
  return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />;
};

interface ETLUploadProps {
  onSuccess?: () => void;
}

export default function ETLUpload({ onSuccess }: ETLUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const { steps, uploading, result, globalError, allSuccess, resetSteps, runPipeline } = useETLPipeline({ onSuccess });

  return (
    <div className="space-y-5">
      <FileUpload
        onFileSelect={(f) => { setFile(f); resetSteps(); }}
        allowedTypes={['pdf']}
        formatHint="Format: Month_Year.pdf (e.g. April_2025.pdf)"
      />

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.label} className="flex items-start gap-3">
            <div className="mt-0.5">
              <StepIcon status={step.status} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none">{step.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {step.detail ?? step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {globalError && (
        <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 rounded-md px-3 py-2">
          <IconX className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{globalError}</p>
        </div>
      )}

      {allSuccess && result && (
        <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 rounded-md px-3 py-2">
          <IconCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Pipeline complete</p>
            <p>{result.successful} transactions saved from {result.filename}</p>
            {result.failed > 0 && (
              <p className="text-red-500 mt-0.5">{result.failed} transactions failed</p>
            )}
          </div>
        </div>
      )}

      <Button
        className="w-full disabled:cursor-not-allowed cursor-pointer"
        onClick={() => file && runPipeline(file)}
        disabled={!file || uploading || allSuccess}
      >
        {uploading ? "Processing..." : allSuccess ? "Done" : "Run Pipeline"}
      </Button>
    </div>
  );
}