import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '@/components/AppText';
import { theme } from '@/theme';
import { formatMoney } from '@/utils/money';
interface BalanceCardProps {
  balance: number;
}
const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <View>
      <AppText style={styles.balanceLabel}>رصيدك الحالي</AppText>
      <AppText style={styles.balance} weight="bold">
        {formatMoney(balance)}
      </AppText>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  balanceLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  balance: {
    ...theme.typography.h1,
    textAlign: 'center',
  },
});
