import { IconLoader, IconCheck, IconX } from "@tabler/icons-react";

export function StepIcon({ status }: { status: StepStatus }) {
  if (status === "loading") return <IconLoader className="w-4 h-4 animate-spin text-blue-500" />;
  if (status === "success") return <IconCheck className="w-4 h-4 text-green-500" />;
  if (status === "error") return <IconX className="w-4 h-4 text-red-500" />;
  return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />;
}