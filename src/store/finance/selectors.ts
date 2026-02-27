import {
  AllTransaction,
  PreviewTransaction,
  Transaction,
  TransactionType,
} from './types';

import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, Period } from '@/constants';
import {
  formatTimeLabel,
  isSameMonth,
  isSameWeek,
  isSameYear,
  resolveTxDate,
  toDateGroup,
} from '@/utils/dates';

const sign = (t: Transaction) => (t.type === 'INCOME' ? 1 : -1);

export const selectMonthly = (
  transactions: Transaction[],
  now = new Date(),
) => {
  const selectedTransactions = transactions.filter(t =>
    isSameMonth(t.date, now),
  );

  const totalExpense = selectedTransactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = selectedTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const net = totalIncome - totalExpense;
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const avg = totalExpense / daysInMonth;
  //Add opening balance point for previous month calculation
  let running = 0;

  const chartPoints = selectedTransactions
    .slice()
    .reverse()
    .map((t, index) => {
      running += sign(t) * t.amount;

      const d = new Date(t.date);

      const label =
        selectedTransactions.length <= 6
          ? formatTimeLabel(d)
          : d.getDate().toString();

      return {
        value: running,
        label,
        dataPointText: running.toLocaleString('ar-EG'),
        dateISO: t.date,
        index,
      };
    });
  return {
    selectedTransactions,
    totalExpense,
    totalIncome,
    net,
    avg,
    chartPoints,
  };
};
const selectWeekly = (transactions: Transaction[], now = new Date()) => {
  const selectedTransactions = transactions.filter(t =>
    isSameWeek(t.date, now),
  );

  const totalExpense = selectedTransactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = selectedTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const net = totalIncome - totalExpense;
  const avg = totalExpense / 7;
  return { selectedTransactions, totalExpense, totalIncome, net, avg };
};
const selectYearly = (transactions: Transaction[], now = new Date()) => {
  const selectedTransactions = transactions.filter(t =>
    isSameYear(t.date, now),
  );

  const totalExpense = selectedTransactions
    .filter(t => t.type === 'EXPENSE')

    .reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = selectedTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);
  const net = totalIncome - totalExpense;
  const avg = totalExpense / 12;
  return { selectedTransactions, totalExpense, totalIncome, net, avg };
};
export const selectByPeriod = (transactions: Transaction[], period: Period) => {
  if (period === 'week') return selectWeekly(transactions);
  if (period === 'year') return selectYearly(transactions);
  else return selectMonthly(transactions);
};
const expenseCategoryMap = new Map(EXPENSE_CATEGORIES.map(c => [c.id, c]));
const incomeCategoryMap = new Map(INCOME_CATEGORIES.map(c => [c.id, c]));

export const selectPreview = (
  transactions: Transaction[],
): PreviewTransaction[] =>
  transactions
    .filter(t => t.type === 'EXPENSE')
    .slice(-3)
    .map(transaction => {
      const category = expenseCategoryMap.get(transaction.categoryId);

      return {
        ...transaction,
        label: category?.name ?? 'مصاريف أخرى',
        icon: category?.icon ?? 'receipt',
      };
    });
export const selectAllTransactions = (
  transactions: Transaction[],
): AllTransaction[] =>
  transactions.map(transaction => {
    const txDate = resolveTxDate(transaction.date);
    const category =
      transaction.type === 'INCOME'
        ? incomeCategoryMap.get(transaction.categoryId)
        : expenseCategoryMap.get(transaction.categoryId);

    return {
      ...transaction,
      label: transaction.title ?? category?.name ?? 'مصاريف أخرى',
      icon: category?.icon ?? 'pricetag-outline',
      timeLabel: formatTimeLabel(txDate),
      dateGroup: toDateGroup(txDate),
      sortTime: txDate.getTime(),
      category,
    };
  });

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
      const prev = map.get(t.categoryId) || 0;
      map.set(t.categoryId, prev + t.amount);
    });

  return Array.from(map.entries())
    .map(([categoryId, total]) => ({ categoryId, total }))
    .sort((a, b) => b.total - a.total);
};
