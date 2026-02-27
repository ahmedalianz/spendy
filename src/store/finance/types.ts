export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER';

export type TransactionCategory = {
  id: number;
  name: string;
  icon: string;
};

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // always positive number
  date: Date; // ISO string
  categoryId: number; // for EXPENSE/INCOME
  note?: string;
  title?: string; // optional custom title (e.g. "Uber", "Pizza")
}
export interface PreviewTransaction extends Transaction {
  label: string;
  icon: string;
}
export interface AllTransaction extends Transaction {
  label: string;
  icon: string;
  timeLabel: string;
  dateGroup: string;
  sortTime: number;
  category?: TransactionCategory;
}
