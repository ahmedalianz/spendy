import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Transaction, TransactionType } from './types';
import { mmkvZustandStorage } from '../mmkvStorage';
interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  activeTypeFilter: TransactionType | 'ALL';
  setActiveTypeFilter: (type: TransactionType | 'ALL') => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
}

const uid = () => `${Date.now()}_${Math.random().toString(16).substring(2)}`;

export const useFinanceStore = create<FinanceState>()(
  persist(
    set => ({
      transactions: [],
      addTransaction: (transaction: Transaction) => {
        const id = uid();
        transaction = { ...transaction, id };
        set(state => ({ transactions: [transaction, ...state.transactions] }));
      },
      removeTransaction: (id: string) =>
        set(state => ({
          transactions: state.transactions.filter(t => t.id !== id),
        })),
      activeTypeFilter: 'ALL',
      setActiveTypeFilter: (type: TransactionType | 'ALL') =>
        set({ activeTypeFilter: type }),
      hasHydrated: false,
      setHasHydrated: v => set({ hasHydrated: v }),
    }),
    {
      name: 'spendy-store-v1',
      version: 1,
      partialize: state => ({
        transactions: state.transactions,
      }),
      storage: createJSONStorage(() => mmkvZustandStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
