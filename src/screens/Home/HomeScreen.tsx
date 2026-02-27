import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import AddTransactionSheet from './components/AddTransactionSheet';
import BalanceCard from './components/BalanceCard';
import BudgetOverview from './components/BudgetOverview';
import EmptyHomeScreen from './components/EmptyHomeScreen';
import MonthlyChart from './components/MonthlyChart';
import TransactionsPreview from './components/TransactionsPreview';

import AppBody from '@/components/AppBody';
import AppButton from '@/components/AppButton';
import AppHeader from '@/components/AppHeader';
import AppScreen from '@/components/AppScreen';
import AppText from '@/components/AppText';
import { selectMonthly, selectPreview } from '@/store/finance/selectors';
import { useFinanceStore } from '@/store/finance/useFinanceStore';
import { theme } from '@/theme';
import { HomeScreenProps } from '@/types/navigation';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const height = useBottomTabBarHeight();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openAddSheet = () => bottomSheetRef.current?.expand();

  const addTransaction = useFinanceStore(s => s.addTransaction);
  const transactions = useFinanceStore(s => s.transactions);
  const hasHydrated = useFinanceStore(s => s.hasHydrated);
  const { net, totalExpense, chartPoints } = useMemo(
    () => selectMonthly(transactions),
    [transactions],
  );
  const previewTransactions = useMemo(
    () => selectPreview(transactions),
    [transactions],
  );

  const goToInsights = () => {
    navigation.navigate('Insights');
  };
  const goToTransactions = () => {
    navigation.navigate('Transactions');
  };

  return (
    <AppScreen>
      <AppHeader title="محفظتي" testID="home-screen-header" />
      <AppBody containerStyle={styles.body}>
        {!hasHydrated ? (
          <AppText>تحميل</AppText>
        ) : (
          <>
            <BalanceCard balance={net} />
            {transactions.length > 0 ? (
              <>
                <MonthlyChart
                  goToInsights={goToInsights}
                  totalExpense={totalExpense}
                  chartPoints={chartPoints}
                />
                <TransactionsPreview
                  goToTransactions={goToTransactions}
                  previewTransactions={previewTransactions}
                />
                <BudgetOverview />
              </>
            ) : (
              <EmptyHomeScreen onAddExpense={openAddSheet} />
            )}
          </>
        )}
      </AppBody>
      {hasHydrated && (
        <>
          <AppButton
            title="+"
            onPress={openAddSheet}
            style={[styles.addExpenseButton, { bottom: height }]}
            textStyle={theme.typography.h1}
            accessibilityLabel="إضافة مصروف جديد"
            accessibilityHint="يفتح نموذج لإضافة مصروف جديد"
          />
          <AddTransactionSheet ref={bottomSheetRef} onSubmit={addTransaction} />
        </>
      )}
    </AppScreen>
  );
};
const styles = StyleSheet.create({
  body: { gap: theme.spacing.xl, paddingBottom: 120 },
  addExpenseButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: theme.radius.full,
    left: 24,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
export default HomeScreen;
