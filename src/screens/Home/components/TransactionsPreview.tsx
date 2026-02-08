import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AppText from '@/components/AppText';
import { theme } from '@/theme';
import { formatMoney } from '@/utils/money';
interface TransactionsPreview {
  goToTransactions: () => void;
}
const mockTransactionsData = [
  {
    label: 'مطعم البيتزا',
    spent: 250,
    icon: 'restaurant',
  },
  {
    label: 'تذكرة طيران',
    spent: 1200,
    icon: 'airplane',
  },
  {
    label: 'ملابس جديدة',
    spent: 450,
    icon: 'shirt',
  },
];

const TransactionsPreview = ({ goToTransactions }: TransactionsPreview) => {
  return (
    <View style={styles.transactionsContainer}>
      <View style={styles.transactionsHeader}>
        <AppText style={styles.transactionsHeaderTitle} weight="bold">
          اخر المصاريف
        </AppText>
        <View style={styles.transactionsHeaderLinkContainer}>
          <AppText
            style={styles.transactionsHeaderLink}
            onPress={goToTransactions}
          >
            كل المصاريف
          </AppText>
          <Icon name="chevron-back" size={16} color={theme.colors.primary} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.transactionsList}>
        {mockTransactionsData.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.transactionItem,
              index !== mockTransactionsData.length - 1 &&
                styles.transactionItemBorder,
            ]}
          >
            <View style={styles.transactionLeft}>
              <View style={styles.transactionItemIcon}>
                <Icon name={item.icon} size={16} color={theme.colors.primary} />
              </View>
              <AppText weight="bold">{item.label}</AppText>
            </View>
            <AppText style={styles.transactionItemAmount} weight="bold">
              {formatMoney(item.spent)}
            </AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TransactionsPreview;

const styles = StyleSheet.create({
  transactionsContainer: {
    gap: theme.spacing.lg,
  },
  transactionsHeaderTitle: {
    ...theme.typography.h4,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionsHeaderLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  transactionsHeaderLink: {
    color: theme.colors.primary,
    ...theme.typography.small,
  },
  transactionsList: {
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    overflow: 'hidden',
    padding: theme.spacing.lg,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: theme.colors.border.subtle,
    paddingBottom: theme.spacing.xs,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  transactionItemIcon: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
  },

  transactionItemAmount: {
    marginTop: 2,
    textAlign: 'center',
    ...theme.typography.caption,
  },
});
