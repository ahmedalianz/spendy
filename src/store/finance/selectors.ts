import { Transaction, TransactionType } from './types';

const isSameMonth = (isoDate: string, now = new Date()) => {
  const d = new Date(isoDate);
  return (
    d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  );
};

export const selectMonthly = (
  transactions: Transaction[],
  now = new Date(),
) => {
  const monthly = transactions.filter(t => isSameMonth(t.date, now));

  const totalExpense = monthly
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = monthly
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const net = totalIncome - totalExpense;

  // chart points (simple): last N transactions amounts as "value"
  const chartPoints = monthly
    .filter(t => t.type === 'EXPENSE')
    .slice(0, 12)
    .map(t => ({ value: t.amount }))
    .reverse();

  return { monthly, totalExpense, totalIncome, net, chartPoints };
};

export const selectPreview = (transactions: Transaction[]) => {
  return transactions.slice(0, 3);
};

export const selectByType = (
  transactions: Transaction[],
  filter: TransactionType | 'ALL',
) => {
  if (filter === 'ALL') return transactions;
  return transactions.filter(t => t.type === filter);
};

export const selectCategoryBreakdown = (
  transactions: Transaction[],
  type: TransactionType,
) => {
  const map = new Map<number, number>();
  transactions
    .filter(t => t.type === type && typeof t.categoryId === 'number')
    .forEach(t => {
      const prev = map.get(t.categoryId!) || 0;
      map.set(t.categoryId!, prev + t.amount);
    });

  return Array.from(map.entries())
    .map(([categoryId, total]) => ({ categoryId, total }))
    .sort((a, b) => b.total - a.total);
};
