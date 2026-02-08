import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { TRANSACTION_TYPES } from './types';

import AppText from '@/components/AppText';
import { theme } from '@/theme';

type HeaderProps = {
  selectedTransactionType: TRANSACTION_TYPES;
  setSelectedTransactionType: (t: TRANSACTION_TYPES) => void;
};

const Header = ({
  selectedTransactionType,
  setSelectedTransactionType,
}: HeaderProps) => {
  return (
    <View style={styles.segment}>
      <TouchableOpacity
        style={[
          styles.btn,
          selectedTransactionType === TRANSACTION_TYPES.EXPENSE &&
            styles.active,
        ]}
        onPress={() => setSelectedTransactionType(TRANSACTION_TYPES.EXPENSE)}
        activeOpacity={0.85}
      >
        <AppText
          style={
            selectedTransactionType === TRANSACTION_TYPES.EXPENSE
              ? styles.activeText
              : styles.text
          }
        >
          مصاريف
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.btn,
          selectedTransactionType === TRANSACTION_TYPES.INCOME && styles.active,
        ]}
        onPress={() => setSelectedTransactionType(TRANSACTION_TYPES.INCOME)}
        activeOpacity={0.85}
      >
        <AppText
          style={
            selectedTransactionType === TRANSACTION_TYPES.INCOME
              ? styles.activeText
              : styles.text
          }
        >
          دخل
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row-reverse',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: theme.radius.md,
  },
  active: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  text: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  activeText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
  },
});
