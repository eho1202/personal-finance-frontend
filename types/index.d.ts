declare type UserInfoProps = {
  first_name: string;
  last_name: string;
  email: string;
}

declare type TransactionParams = {
  trans_date: Date;
  description: string;
  amount: number;
  category: string;
};

declare type TransactionsSummaryParams = {
  category: string;
  transaction_count: number;
  total_amount: number;
  avg_amount: number;
};

declare type SpendingInsights = {
  category: string;
  total_amount: number;
  insight: string;
};

declare type MonthOverMonthParams = {
  category: string;
  current_amount: number;
  previous_amount: number;
  change_percent: number;
  trend: "up" | "down" | "flat" | "new";
};

declare type GPTSummaryParams = {
  month: string;
  year: number;
  spending_insights: SpendingInsights[];
  month_over_month: MonthOverMonthParams[];
};

declare type StepStatus = "idle" | "loading" | "success" | "error";

declare interface NotFoundCardProps {
  month: string;
  year: number;
}

declare interface TransactionProps {
  data: transactionParams[];
}

declare interface TransactionsSummaryProps {
  data: TransactionsSummaryParams[];
  month: string;
  year: number;
}

declare interface TransactionsPaginationProps<TData> {
  table: Table<TData>;
  pagination: PaginationState;
}

declare interface ETLStep {
  label: string;
  description: string;
  status: StepStatus;
  detail?: string;
}

declare interface ETLResult {
  filename: string;
  total: number;
  successful: number;
  failed: number;
  errors?: { description: string; error: string }[] | null;
}

declare interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  allowedTypes?: string[];
  maxSize?: number; // in MB
  bucket?: string;
  formatHint: string;
}

declare interface TransactionsDropdownProps {
  selectedMonth: string;
  selectedYear: number;
  availableMonths: Record<number, string[]>;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
}

declare interface DashboardFiltersProps {
  selectedMonth: string;
  selectedYear: number;
}

declare interface DashboardPageProps {
  searchParams: { month?: string; year?: number };
}

declare interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

declare interface TransactionsTableWrapperProps {
    month: string
    year: number
}

declare interface TransactionsSummaryWrapperProps {
    month: string
    year: number
}

declare interface TransactionsPaginationProps<TData> {
    table: Table<TData>
    pagination: PaginationState
}

declare interface IncomeItem {
  id: string;
  description: string;
  expected: number;
  actual: number;
}

declare interface BillItem {
  id: string;
  description: string;
  due_date: string;
  budget: number;
  actual: number;
  paid: boolean;
}

declare interface DebtItem {
  id: string;
  description: string;
  due_date: string;
  budget: number;
  paid: number;
}

declare interface SavingsItem {
  id: string;
  description: string;
  budget: number;
  actual: number;
}

declare interface ExpenseItem {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
}

declare interface ExpenseBudgetsItem {
  id: string;
  category: string;
  budget: number;
  actual: number;
  remaining: number;
}

declare interface BudgetData {
  currency: string;
  start_date: string;
  end_date: string;
  expense_budgets: ExpenseBudgetsItem[];
  expense_items: Record<string, number>,
  income: IncomeItem[];
  bills: BillItem[];
  debts: DebtItem[];
  savings: SavingsItem[];
  expenses: ExpenseItem[];
}

declare interface BudgetDashboardProps {
  initialData: BudgetData;
}
