export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER';

export type TransactionCategory = {
  id: number;
  name: string;
  icon: string;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number; // always positive number
  date: string; // ISO string
  categoryId?: number; // for EXPENSE/INCOME
  note?: string;
  title?: string; // optional custom title (e.g. "Uber", "Pizza")
};
