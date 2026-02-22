import React, { useRef } from 'react';
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
import { theme } from '@/theme';
import { HomeScreenProps } from '@/types/navigation';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const height = useBottomTabBarHeight();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const goToInsights = () => {
    navigation.navigate('Insights');
  };
  const goToTransactions = () => {
    navigation.navigate('Transactions');
  };
  const balance = 55685;
  const transactions = [
    { value: 15 },
    { value: 30 },
    { value: 50 },
    { value: 605 },
    { value: 260 },
    { value: 40 },
    { value: 250 },
    { value: 1200 },
    { value: 450 },
  ];
  return (
    <AppScreen>
      <AppHeader
        title="محفظتي"
        leftIcon="home"
        rightIcon="menu"
        testID="home-screen-header"
      />
      <AppBody containerStyle={styles.body}>
        <BalanceCard balance={balance} />
        {transactions.length > 0 ? (
          <>
            <MonthlyChart
              goToInsights={goToInsights}
              transactions={transactions}
            />
            <TransactionsPreview goToTransactions={goToTransactions} />
            <BudgetOverview />
          </>
        ) : (
          <EmptyHomeScreen />
        )}
      </AppBody>

      <AppButton
        title="+"
        onPress={() => bottomSheetRef.current?.expand()}
        style={[styles.addExpenseButton, { bottom: height }]}
        textStyle={theme.typography.h1}
        accessibilityLabel="إضافة مصروف جديد"
        accessibilityHint="يفتح نموذج لإضافة مصروف جديد"
      />
      <AddTransactionSheet ref={bottomSheetRef} onSubmit={() => {}} />
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
