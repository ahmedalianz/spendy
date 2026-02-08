import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import AddTransactionSheet from './components/AddTransactionSheet';
import BalanceCard from './components/BalanceCard';
import BudgetOverview from './components/BudgetOverview';
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
  return (
    <AppScreen>
      <AppHeader title="محفظتي" leftIcon="home" rightIcon="menu" />
      <AppBody containerStyle={styles.body}>
        <BalanceCard />
        <MonthlyChart goToInsights={goToInsights} />
        <TransactionsPreview goToTransactions={goToTransactions} />
        <BudgetOverview />
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
