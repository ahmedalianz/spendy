import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AppBody from '@/components/AppBody';
import AppHeader from '@/components/AppHeader';
import AppScreen from '@/components/AppScreen';
import AppText from '@/components/AppText';
import EmptyState from '@/components/EmptyState';
import {
  selectAllTransactions,
  selectByType,
  selectMonthly,
} from '@/store/finance/selectors';
import { TransactionType } from '@/store/finance/types';
import type { AllTransaction } from '@/store/finance/types'; // ✅ عدّل المسار حسب مكان type
import { useFinanceStore } from '@/store/finance/useFinanceStore';
import { theme } from '@/theme';
import { TransactionsScreenProps } from '@/types/navigation';
import { formatMoney } from '@/utils/money';

type FilterKey = 'ALL' | TransactionType;

export const FILTERS: { key: FilterKey; label: string; icon: string }[] = [
  { key: 'ALL', label: 'الكل', icon: 'apps-outline' },
  { key: 'EXPENSE', label: 'مصروفات', icon: 'arrow-down-outline' },
  { key: 'INCOME', label: 'دخل', icon: 'arrow-up-outline' },
];

function groupByDateGroup(rows: AllTransaction[]) {
  const order: AllTransaction['dateGroup'][] = [
    'النهارده',
    'امبارح',
    'قبل كدا',
  ];

  const map = new Map<string, AllTransaction[]>();
  rows.forEach(r => {
    const arr = map.get(r.dateGroup) ?? [];
    arr.push(r);
    map.set(r.dateGroup, arr);
  });

  return order
    .filter(k => map.has(k))
    .map(title => ({
      title,
      data: (map.get(title) ?? [])
        .slice()
        .sort((a, b) => b.sortTime - a.sortTime),
    }));
}

const TransactionsScreen = ({ navigation }: TransactionsScreenProps) => {
  const [filter, setFilter] = useState<FilterKey>('ALL');

  const transactions = useFinanceStore(s => s.transactions);
  const { selectedTransactions, totalExpense } = useMemo(
    () => selectMonthly(transactions),
    [transactions],
  );

  const uiRows = useMemo<AllTransaction[]>(() => {
    const filtered = selectByType(selectedTransactions, filter);

    return selectAllTransactions(filtered).sort(
      (a, b) => b.sortTime - a.sortTime,
    );
  }, [selectedTransactions, filter]);

  const grouped = useMemo(() => groupByDateGroup(uiRows), [uiRows]);

  const showEmpty = grouped.length === 0;

  return (
    <AppScreen>
      <AppHeader title="المصاريف" />

      <AppBody containerStyle={styles.body}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <AppText style={styles.summaryLabel}>
            إجمالي اللي اتصرف الشهر ده
          </AppText>

          <View style={styles.summaryRow}>
            <AppText style={styles.summaryAmount} weight="bold">
              {formatMoney(totalExpense ?? 0)}
            </AppText>

            <View style={styles.summaryPill}>
              <Icon
                name="trending-up"
                size={14}
                color={theme.colors.semantic.warning}
              />
              <AppText style={styles.summaryPillText} weight="bold">
                +12%
              </AppText>
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate('Insights')}
            style={styles.summaryLink}
            accessibilityRole="button"
          >
            <AppText style={styles.summaryLinkText} weight="bold">
              وريني التحليلات
            </AppText>
            <Icon name="chevron-back" size={16} color={theme.colors.primary} />
          </Pressable>
        </View>

        {/* Filters */}
        <View style={styles.filtersRow}>
          {FILTERS.map(f => {
            const active = f.key === filter;
            return (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[styles.filterChip, active && styles.filterChipActive]}
                accessibilityRole="button"
              >
                <Icon
                  name={f.icon}
                  size={16}
                  color={
                    active
                      ? theme.colors.text.surface
                      : theme.colors.text.secondary
                  }
                />
                <AppText
                  style={[styles.filterText, active && styles.filterTextActive]}
                  weight={active ? 'bold' : 'regular'}
                >
                  {f.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        {/* List / Empty */}
        {showEmpty ? (
          <EmptyState
            iconName="receipt-outline"
            title="مفيش عمليات لحد دلوقتي"
            description="ابدأ سجّل أول مصروف أو دخل… وساعتها هتشوف كل حاجة هنا بشكل منظم."
            primaryActionLabel="روح للمحفظة"
            onPrimaryAction={() => navigation.navigate('Home')}
          />
        ) : (
          grouped.map(section => (
            <View key={section.title} style={styles.sectionBlock}>
              <AppText style={styles.sectionTitle} weight="bold">
                {section.title}
              </AppText>

              <View style={styles.listCard}>
                {section.data.map((tx, idx) => {
                  const isLast = idx === section.data.length - 1;
                  const isIncome = tx.type === 'INCOME';

                  const amountColor = isIncome
                    ? theme.colors.semantic.success
                    : theme.colors.semantic.danger;

                  return (
                    <View
                      key={tx.id}
                      style={[styles.row, !isLast && styles.rowBorder]}
                    >
                      <View style={styles.rowLeft}>
                        <View style={styles.iconCircle}>
                          <Icon
                            name={tx.icon}
                            size={18}
                            color={theme.colors.primary}
                          />
                        </View>

                        <View style={styles.rowText}>
                          <AppText weight="bold">{tx.label}</AppText>

                          <AppText style={styles.metaText}>
                            {tx.timeLabel} • {tx.category?.name ?? 'بدون تصنيف'}
                          </AppText>
                        </View>
                      </View>

                      <AppText
                        style={[styles.amountText, { color: amountColor }]}
                        weight="bold"
                      >
                        {isIncome ? '+' : '-'}
                        {formatMoney(tx.amount)}
                      </AppText>
                    </View>
                  );
                })}
              </View>
            </View>
          ))
        )}

        {/* Tip */}
        <View style={styles.tipCard}>
          <Icon name="bulb-outline" size={20} color={theme.colors.primary} />
          <AppText style={styles.tipText}>
            نصيحة: سجّل المصروف أول ما يحصل… ده اللي بيخلّي الأرقام حقيقية 😉
          </AppText>
        </View>
      </AppBody>
    </AppScreen>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  body: { gap: theme.spacing.xl, paddingBottom: 120 },

  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  summaryLabel: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  summaryAmount: { ...theme.typography.h2 },
  summaryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  summaryPillText: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
  },
  summaryLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryLinkText: { color: theme.colors.primary, ...theme.typography.small },

  filtersRow: { flexDirection: 'row', gap: theme.spacing.sm },
  filterChip: {
    flex: 1,
    height: 44,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: { ...theme.typography.small, color: theme.colors.text.secondary },
  filterTextActive: { color: theme.colors.text.surface },

  sectionBlock: { gap: theme.spacing.md },
  sectionTitle: { ...theme.typography.h4 },

  listCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.subtle,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, gap: 2 },
  metaText: { ...theme.typography.vSmall, color: theme.colors.text.secondary },
  amountText: { ...theme.typography.small },

  tipCard: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
  },
  tipText: {
    ...theme.typography.small,
    color: theme.colors.text.primary,
    flex: 1,
  },
});
