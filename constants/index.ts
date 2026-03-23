export const TAILWIND_COLORS: Record<string, { light: string; dark: string }> =
  {
    "bg-pink-500 dark:bg-pink-400": { light: "#ec4899", dark: "#e879f9" },
    "bg-green-500 dark:bg-green-400": { light: "#22c55e", dark: "#34d399" },
    "bg-yellow-500 dark:bg-yellow-400": { light: "#eab308", dark: "#fbbf24" },
    "bg-blue-500 dark:bg-blue-400": { light: "#3b82f6", dark: "#60a5fa" },
    "bg-violet-500 dark:bg-violet-400": { light: "#8b5cf6", dark: "#a78bfa" },
    "bg-orange-500 dark:bg-orange-400": { light: "#f97316", dark: "#fb923c" },
    "bg-purple-500 dark:bg-purple-400": { light: "#a855f7", dark: "#c084fc" },
    "bg-red-500 dark:bg-red-400": { light: "#ef4444", dark: "#f87171" },
    "bg-fuchsia-500 dark:bg-fuchsia-400": { light: "#d946ef", dark: "#e879f9" },
    "bg-teal-500 dark:bg-teal-400": { light: "#14b8a6", dark: "#2dd4bf" },
    "bg-cyan-500 dark:bg-cyan-400": { light: "#06b6d4", dark: "#22d3ee" },
    "bg-gray-500 dark:bg-gray-400": { light: "#6b7280", dark: "#9ca3af" },
  };

export const PALETTE_KEYS = [
  "bg-pink-500 dark:bg-pink-400",
  "bg-blue-500 dark:bg-blue-400",
  "bg-green-500 dark:bg-green-400",
  "bg-yellow-500 dark:bg-yellow-400",
  "bg-violet-500 dark:bg-violet-400",
  "bg-orange-500 dark:bg-orange-400",
  "bg-teal-500 dark:bg-teal-400",
  "bg-purple-500 dark:bg-purple-400",
  "bg-red-500 dark:bg-red-400",
  "bg-fuchsia-500 dark:bg-fuchsia-400",
  "bg-cyan-500 dark:bg-cyan-400",
  "bg-gray-500 dark:bg-gray-400",
];

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
  {
    label: "Extract",
    description: "Parsing PDF and uploading to storage",
    status: "idle",
  },
  {
    label: "Transform",
    description: "Normalizing and classifying transactions",
    status: "idle",
  },
  {
    label: "Load",
    description: "Saving transactions to database",
    status: "idle",
  },
];

export const STEP_EVENT_MAP: Record<string, number> = {
  extract: 0,
  transform: 1,
  load: 2,
};

export const MIME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  csv: "text/csv",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/budget": "Budget",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

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
  11: "December",
};

export const EXPENSE_CATEGORIES = [
  "Entertainment",
  "Food and Drink",
  "Groceries",
  "Healthcare",
  "Installment Plan",
  "Payments",
  "Personal Care",
  "Pets",
  "Shopping",
  "Subscription",
  "Transportation",
  "Travel",
  "Other",
];

export const CURRENCIES: string[] = [
    "CAD",
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CNY",
    "AUD",
    "CHF",
    "INR",
    "MXN",
    "BRL",
    "KRW",
    "SGD",
    "HKD",
    "NOK",
    "SEK",
    "DKK",
    "NZD",
    "ZAR",
    "AED",
]