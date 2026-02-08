/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PieChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/Ionicons';

import AppText from '@/components/AppText';
import { theme } from '@/theme';
import { getBudgetColor } from '@/utils/budget';
import { formatMoney } from '@/utils/money';

const mockBudgetData = [
  {
    label: 'المطاعم',
    spent: 1500,
    budget: 4000,
    icon: 'restaurant',
  },
  {
    label: 'السفر',
    spent: 5600,
    budget: 4000,
    icon: 'car',
  },
  {
    label: 'التسوق',
    spent: 3200,
    budget: 4000,
    icon: 'bag',
  },
];
const BudgetOverview = () => {
  return (
    <View style={styles.transactionsContainer}>
      <AppText style={styles.transactionsHeaderTitle} weight="bold">
        الميزانية الشهرية
      </AppText>

      <ScrollView contentContainerStyle={styles.budgetList} horizontal>
        {mockBudgetData.map(item => (
          <View key={item.label} style={styles.budgetItem}>
            <PieChart
              donut
              radius={30}
              innerRadius={25}
              data={[
                {
                  value: item.spent,
                  color: getBudgetColor(item.spent, item.budget),
                },
                {
                  value: item.budget - item.spent,
                  color: theme.colors.backgroundLight,
                },
              ]}
              centerLabelComponent={() => (
                <Icon
                  name={item.icon}
                  size={24}
                  color={getBudgetColor(item.spent, item.budget)}
                />
              )}
              isAnimated
            />
            <AppText style={styles.budgetItemLabel}>{item.label}</AppText>
            <AppText style={styles.budgetItemAmount} weight="bold">
              {formatMoney(item.spent)}
            </AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BudgetOverview;
const styles = StyleSheet.create({
  transactionsContainer: {
    gap: theme.spacing.lg,
  },
  transactionsHeaderTitle: {
    ...theme.typography.h4,
  },

  budgetList: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  budgetItem: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    overflow: 'hidden',
    padding: theme.spacing.lg,
  },
  budgetItemLabel: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    ...theme.typography.vSmall,
    color: theme.colors.text.secondary,
  },
  budgetItemAmount: {
    marginTop: 2,
    textAlign: 'center',
    ...theme.typography.caption,
  },
});
