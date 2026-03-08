export const TAILWIND_COLORS: Record<string, string> = {
  // Light
  "bg-pink-500":    "#ec4899",
  "bg-green-500":   "#22c55e",
  "bg-yellow-500":  "#eab308",
  "bg-blue-500":    "#3b82f6",
  "bg-violet-500":  "#8b5cf6",
  "bg-orange-500":  "#f97316",
  "bg-purple-500":  "#a855f7",
  "bg-red-500":     "#ef4444",
  "bg-fuchsia-500": "#d946ef",
  "bg-teal-500":    "#14b8a6",
  "bg-cyan-500":    "#06b6d4",
  "bg-gray-500":    "#6b7280",
  "bg-gray-400":    "#9ca3af",
  // Dark
  "bg-pink-400":    "#f472b6",
  "bg-green-400":   "#4ade80",
  "bg-yellow-400":  "#facc15",
  "bg-blue-400":    "#60a5fa",
  "bg-violet-400":  "#a78bfa",
  "bg-orange-400":  "#fb923c",
  "bg-purple-400":  "#c084fc",
  "bg-red-400":     "#f87171",
  "bg-fuchsia-400": "#e879f9",
  "bg-teal-400":    "#2dd4bf",
  "bg-cyan-400":    "#22d3ee",
  "bg-gray-600":    "#4b5563",
  "bg-gray-500 dark:bg-gray-400": "#9ca3af",
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-blue-500 dark:border-blue-400",
    backgroundColor: "bg-blue-500 dark:bg-blue-400",
    textColor: "text-blue-700 dark:text-blue-300",
    chipBackgroundColor: "bg-blue-50 dark:bg-blue-950",
  },
  Groceries: {
    borderColor: "border-green-500 dark:border-green-400",
    backgroundColor: "bg-green-500 dark:bg-green-400",
    textColor: "text-green-700 dark:text-green-300",
    chipBackgroundColor: "bg-green-50 dark:bg-green-950",
  },
  Transportation: {
    borderColor: "border-yellow-500 dark:border-yellow-400",
    backgroundColor: "bg-yellow-500 dark:bg-yellow-400",
    textColor: "text-yellow-700 dark:text-yellow-300",
    chipBackgroundColor: "bg-yellow-50 dark:bg-yellow-950",
  },
  Travel: {
    borderColor: "border-pink-500 dark:border-pink-400",
    backgroundColor: "bg-pink-500 dark:bg-pink-400",
    textColor: "text-pink-700 dark:text-pink-300",
    chipBackgroundColor: "bg-pink-50 dark:bg-pink-950",
  },
  Subscriptions: {
    borderColor: "border-violet-500 dark:border-violet-400",
    backgroundColor: "bg-violet-500 dark:bg-violet-400",
    textColor: "text-violet-700 dark:text-violet-300",
    chipBackgroundColor: "bg-violet-50 dark:bg-violet-950",
  },
  Shopping: {
    borderColor: "border-orange-500 dark:border-orange-400",
    backgroundColor: "bg-orange-500 dark:bg-orange-400",
    textColor: "text-orange-700 dark:text-orange-300",
    chipBackgroundColor: "bg-orange-50 dark:bg-orange-950",
  },
  Entertainment: {
    borderColor: "border-purple-500 dark:border-purple-400",
    backgroundColor: "bg-purple-500 dark:bg-purple-400",
    textColor: "text-purple-700 dark:text-purple-300",
    chipBackgroundColor: "bg-purple-50 dark:bg-purple-950",
  },
  Healthcare: {
    borderColor: "border-red-500 dark:border-red-400",
    backgroundColor: "bg-red-500 dark:bg-red-400",
    textColor: "text-red-700 dark:text-red-300",
    chipBackgroundColor: "bg-red-50 dark:bg-red-950",
  },
  "Personal Care": {
    borderColor: "border-fuchsia-500 dark:border-fuchsia-400",
    backgroundColor: "bg-fuchsia-500 dark:bg-fuchsia-400",
    textColor: "text-fuchsia-700 dark:text-fuchsia-300",
    chipBackgroundColor: "bg-fuchsia-50 dark:bg-fuchsia-950",
  },
  Payments: {
    borderColor: "border-teal-500 dark:border-teal-400",
    backgroundColor: "bg-teal-500 dark:bg-teal-400",
    textColor: "text-teal-700 dark:text-teal-300",
    chipBackgroundColor: "bg-teal-50 dark:bg-teal-950",
  },
  "Installment Plan": {
    borderColor: "border-cyan-500 dark:border-cyan-400",
    backgroundColor: "bg-cyan-500 dark:bg-cyan-400",
    textColor: "text-cyan-700 dark:text-cyan-300",
    chipBackgroundColor: "bg-cyan-50 dark:bg-cyan-950",
  },
  Other: {
    borderColor: "border-gray-500 dark:border-gray-400",
    backgroundColor: "bg-gray-500 dark:bg-gray-400",
    textColor: "text-gray-700 dark:text-gray-300",
    chipBackgroundColor: "bg-gray-50 dark:bg-gray-900",
  },
  default: {
    borderColor: "border-gray-400 dark:border-gray-500",
    backgroundColor: "bg-gray-400 dark:bg-gray-500",
    textColor: "text-gray-600 dark:text-gray-400",
    chipBackgroundColor: "bg-gray-50 dark:bg-gray-900",
  },
};

export const INITIAL_STEPS: ETLStep[] = [
  { label: "Extract",   description: "Parsing PDF and uploading to storage",    status: "idle" },
  { label: "Transform", description: "Normalizing and classifying transactions", status: "idle" },
  { label: "Load",      description: "Saving transactions to database",          status: "idle" },
];

export const STEP_EVENT_MAP: Record<string, number> = {
  extract: 0,
  transform: 1,
  load: 2,
};

export const MIME_TYPES: Record<string, string> = {
  pdf:  "application/pdf",
  csv:  "text/csv",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/budget": "Budget",
  "/analytics": "Analytics",
  "/settings": "Settings",
}

export const MONTHS: Record<number, string> = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

export const YEARS = [
  2025,
  2026
]