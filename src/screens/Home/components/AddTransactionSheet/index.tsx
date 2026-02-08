import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

import Categories from './Categories';
import DateInput from './DateInput';
import Header from './Header';
import MoneyInput from './MoneyInput';
import { TRANSACTION_TYPES } from './types';

import AppButton from '@/components/AppButton';
import AppSheet from '@/components/AppSheet';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants';
import { theme } from '@/theme';
import { amountToNumber } from '@/utils/amount';

export type AddTransactionPayload = {
  type: 'EXPENSE' | 'INCOME';
  amount: number;
  categoryId: number;
  date: Date;
  note?: string;
};

type AddTransactionSheetProps = {
  onSubmit: (payload: AddTransactionPayload) => void;
};

const AddTransactionSheet = forwardRef<BottomSheet, AddTransactionSheetProps>(
  ({ onSubmit }, ref) => {
    const [type, setType] = useState<TRANSACTION_TYPES>(
      TRANSACTION_TYPES.EXPENSE,
    );
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [amount, setAmount] = useState('0');
    const [categoryId, setCategoryId] = useState(EXPENSE_CATEGORIES[0].id);

    const categories = useMemo(() => {
      return type === TRANSACTION_TYPES.INCOME
        ? INCOME_CATEGORIES
        : EXPENSE_CATEGORIES;
    }, [type]);

    // reset category when switching type
    useEffect(() => {
      setCategoryId(categories[0]?.id);
    }, [categories]);

    const close = () => {
      (ref as React.RefObject<BottomSheet>)?.current?.close();
    };

    const reset = () => {
      setType(TRANSACTION_TYPES.EXPENSE);
      setSelectedDate(new Date());
      setAmount('0');
      setCategoryId(EXPENSE_CATEGORIES[0].id);
    };

    const value = amountToNumber(amount);
    const canSubmit = value > 0 && Number.isFinite(value) && categoryId != null;

    const submit = () => {
      if (!canSubmit) return;

      onSubmit({
        type: type === TRANSACTION_TYPES.INCOME ? 'INCOME' : 'EXPENSE',
        amount: value,
        categoryId,
        date: selectedDate,
      });

      close();
      reset();
    };

    return (
      <AppSheet ref={ref} snapPoints={['82%']}>
        <View style={styles.topRow}>
          <AppButton
            title="✕"
            onPress={close}
            style={styles.closeBtn}
            textStyle={styles.closeBtnText}
            accessibilityLabel="إغلاق"
          />
        </View>

        <Header
          selectedTransactionType={type}
          setSelectedTransactionType={setType}
        />

        <DateInput
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <MoneyInput amount={amount} setAmount={setAmount} type={type} />

        <Categories
          selectedCategory={categoryId}
          setSelectedCategory={setCategoryId}
          categories={categories}
        />

        <AppButton
          title="تسجيل"
          onPress={submit}
          disabled={!canSubmit}
          style={styles.primaryCta}
          accessibilityLabel="تسجيل الحركة"
          accessibilityHint="يحفظ المصروف أو الدخل"
        />
      </AppSheet>
    );
  },
);

export default AddTransactionSheet;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: theme.colors.backgroundLight,
  },
  closeBtnText: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  primaryCta: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.xl,
  },
});
