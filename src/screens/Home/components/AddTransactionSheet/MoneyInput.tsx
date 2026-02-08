import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { TRANSACTION_TYPES } from './types';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import { theme } from '@/theme';
import { amountToNumber, normalizeAmountInput } from '@/utils/amount';

type MoneyInputProps = {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  type: TRANSACTION_TYPES;
};

const QUICK_AMOUNTS = [50, 100, 200, 500];

const MoneyInput = ({ amount, setAmount, type }: MoneyInputProps) => {
  const value = amountToNumber(amount);

  const applyQuickAdd = (x: number) => {
    // quick add feels best for EXPENSE; keep it for income too if you want
    const next = value + x;
    setAmount(normalizeAmountInput(String(next)));
  };
  return (
    <View style={styles.amountBlock}>
      <View style={styles.amountRow}>
        <AppText style={styles.currency}>ج.م</AppText>

        <TextInput
          value={amount}
          onChangeText={t => setAmount(normalizeAmountInput(t))}
          keyboardType="decimal-pad"
          returnKeyType="done"
          style={[
            styles.amountInput,
            type === TRANSACTION_TYPES.INCOME ? styles.income : styles.expense,
          ]}
          placeholder="0"
          placeholderTextColor={theme.colors.text.secondary}
          textAlign="center"
          accessibilityLabel="إدخال المبلغ"
        />
      </View>

      {/* Quick add chips */}
      <View style={styles.quickRow}>
        {QUICK_AMOUNTS.map(q => (
          <AppButton
            key={q}
            title={`+${q}`}
            onPress={() => applyQuickAdd(q)}
            style={styles.quickChip}
            textStyle={styles.quickChipText}
            accessibilityLabel={`زيادة ${q} جنيه`}
          />
        ))}
      </View>
    </View>
  );
};

export default MoneyInput;

const styles = StyleSheet.create({
  amountBlock: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.backgroundLight,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  amountRow: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  currency: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  amountInput: {
    ...theme.typography.h1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 160,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  quickRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  quickChip: {
    height: 38,
    borderRadius: theme.radius.full,
    paddingHorizontal: 14,
    paddingVertical: 0,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  quickChipText: {
    ...theme.typography.small,
    color: theme.colors.text.primary,
  },
  income: { color: theme.colors.semantic.success },
  expense: { color: theme.colors.semantic.danger },
});
