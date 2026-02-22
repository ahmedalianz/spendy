import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AppBody from '@/components/AppBody';
import AppContainer from '@/components/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppScreen from '@/components/AppScreen';
import AppText from '@/components/AppText';
import EmptyState from '@/components/EmptyState';
import { useFinanceStore } from '@/store/finance/useFinanceStore';
import { theme } from '@/theme';
import { InsightsScreenProps } from '@/types/navigation';
import { formatMoney } from '@/utils/money';

type Period = 'week' | 'month' | 'year';

const PERIODS: { key: Period; label: string }[] = [
  { key: 'week', label: 'أسبوع' },
  { key: 'month', label: 'شهر' },
  { key: 'year', label: 'سنة' },
];

type CategoryRow = {
  id: string;
  label: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  spent: number;
  budget: number;
};

const MOCK_BREAKDOWN: CategoryRow[] = [
  {
    id: 'food',
    label: 'أكل وشرب',
    icon: 'restaurant-outline',
    iconBg: '#FFF1DD',
    iconColor: '#F97316',
    spent: 1240,
    budget: 1600,
  },
  {
    id: 'transport',
    label: 'مواصلات',
    icon: 'car-outline',
    iconBg: '#E8F0FF',
    iconColor: theme.colors.primary,
    spent: 420,
    budget: 900,
  },
  {
    id: 'shopping',
    label: 'تسوق',
    icon: 'bag-handle-outline',
    iconBg: '#F1E8FF',
    iconColor: '#9333EA',
    spent: 890,
    budget: 1000,
  },
];

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

const InsightsScreen = ({ navigation }: InsightsScreenProps) => {
  const [period, setPeriod] = useState<Period>('month');

  const totals = useMemo(() => {
    // TODO later: compute based on real transactions + period
    const spent = 3450;
    const avg = 3280;
    const delta = avg === 0 ? 0 : (spent - avg) / avg;
    return { spent, avg, delta };
  }, [period]);
  const transactions = useFinanceStore(s => s.transactions);
  const hasTransactions = transactions.length > 0;

  return (
    <AppScreen>
      <AppHeader title="الخلاصة" />
      {!hasTransactions ? (
        <AppContainer style={styles.empty}>
          <EmptyState
            iconName="stats-chart-outline"
            title="مفيش بيانات كفاية للتحليل"
            description="أول ما تضيف عمليات (مصروفات/دخل) هنطلعلك الخلاصة والتوزيع والاتجاهات."
            primaryActionLabel="ابدأ من المحفظة"
            onPrimaryAction={() => navigation.navigate('Home')}
          />
        </AppContainer>
      ) : (
        <AppBody containerStyle={styles.body}>
          {/* Period switch */}
          <View style={styles.segmented}>
            {PERIODS.map(p => {
              const active = p.key === period;
              return (
                <Pressable
                  key={p.key}
                  onPress={() => setPeriod(p.key)}
                  style={[
                    styles.segmentItem,
                    active && styles.segmentItemActive,
                  ]}
                >
                  <AppText
                    style={[
                      styles.segmentText,
                      active && styles.segmentTextActive,
                    ]}
                    weight={active ? 'bold' : 'regular'}
                  >
                    {p.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>

          {/* Comparison */}
          <View style={styles.card}>
            <AppText style={styles.cardLabel}>إجمالي الصرف</AppText>

            <View style={styles.amountRow}>
              <AppText style={styles.mainAmount} weight="bold">
                {formatMoney(totals.spent)}
              </AppText>

              <View style={styles.deltaPill}>
                <Icon
                  name={totals.delta >= 0 ? 'trending-up' : 'trending-down'}
                  size={14}
                  color={
                    totals.delta >= 0
                      ? theme.colors.semantic.warning
                      : theme.colors.semantic.success
                  }
                />
                <AppText style={styles.deltaText} weight="bold">
                  {(Math.abs(totals.delta) * 100).toFixed(1)}%
                </AppText>
              </View>
            </View>

            <AppText style={styles.subText}>مقارنة بمتوسط آخر 3 شهور</AppText>
          </View>

          {/* Smart insight */}
          <View style={[styles.card, styles.smartCard]}>
            <View style={styles.smartHeader}>
              <View style={styles.smartBadge}>
                <Icon name="flash" size={14} color={theme.colors.primary} />
                <AppText style={styles.smartBadgeText} weight="bold">
                  ملاحظة ذكية
                </AppText>
              </View>
              <View style={styles.smartIconWrap}>
                <Icon
                  name="cafe-outline"
                  size={22}
                  color={theme.colors.primary}
                />
              </View>
            </View>

            <AppText style={styles.smartTitle} weight="bold">
              القهوة زادت حوالي 15% الشهر ده.
            </AppText>
            <AppText style={styles.smartBody}>
              لو حطّيت حد يومي بسيط… هتلاحظ فرق كبير آخر الشهر.
            </AppText>

            <Pressable style={styles.smartCta}>
              <AppText style={styles.smartCtaText} weight="bold">
                جرّب تحدد حد يومي
              </AppText>
              <Icon
                name="chevron-back"
                size={16}
                color={theme.colors.primary}
              />
            </Pressable>
          </View>

          {/* Breakdown */}
          <View style={styles.breakdownHeader}>
            <AppText style={styles.breakdownTitle} weight="bold">
              توزيع الصرف
            </AppText>
            <Pressable>
              <AppText style={styles.viewAll} weight="bold">
                الكل
              </AppText>
            </Pressable>
          </View>

          <View style={styles.breakdownList}>
            {MOCK_BREAKDOWN.map(item => {
              const progress = clamp01(item.spent / Math.max(1, item.budget));
              const remaining = item.budget - item.spent;

              const remainingColor =
                remaining <= 0
                  ? theme.colors.semantic.danger
                  : theme.colors.text.tertiary;

              return (
                <View key={item.id} style={styles.breakItem}>
                  <View style={styles.breakTop}>
                    <View style={styles.breakLeft}>
                      <View
                        style={[
                          styles.breakIcon,
                          { backgroundColor: item.iconBg },
                        ]}
                      >
                        <Icon
                          name={item.icon}
                          size={18}
                          color={item.iconColor}
                        />
                      </View>
                      <View style={styles.breakLabelContainer}>
                        <AppText style={styles.breakLabel} weight="bold">
                          {item.label}
                        </AppText>
                        <AppText style={styles.breakMeta}>
                          من {formatMoney(item.budget)} ميزانية
                        </AppText>
                      </View>
                    </View>

                    <AppText style={styles.breakAmount} weight="bold">
                      {formatMoney(item.spent)}
                    </AppText>
                  </View>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${progress * 100}%` },
                      ]}
                    />
                  </View>

                  <View style={styles.breakBottom}>
                    <AppText style={styles.breakMeta}>
                      استهلكت {Math.round(progress * 100)}% من الميزانية
                    </AppText>
                    <AppText
                      style={[styles.breakMeta, { color: remainingColor }]}
                    >
                      {remaining <= 0
                        ? 'اتعدّيت الميزانية'
                        : `باقي ${formatMoney(remaining)}`}
                    </AppText>
                  </View>
                </View>
              );
            })}
          </View>
        </AppBody>
      )}
    </AppScreen>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({
  body: { gap: theme.spacing.xl, paddingBottom: 120 },
  empty: {
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  segmented: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.full,
    padding: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  segmentItem: {
    flex: 1,
    height: 44,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentItemActive: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  segmentText: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
  },
  segmentTextActive: { color: theme.colors.primary },

  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xxl,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    padding: theme.spacing.lg,
    ...theme.shadows.small,
    gap: theme.spacing.sm,
  },
  cardLabel: { ...theme.typography.small, color: theme.colors.text.secondary },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  mainAmount: { ...theme.typography.h2 },
  deltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  deltaText: { ...theme.typography.small, color: theme.colors.text.secondary },
  subText: { ...theme.typography.caption, color: theme.colors.text.secondary },

  smartCard: { gap: theme.spacing.md },
  smartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smartBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  smartBadgeText: { color: theme.colors.primary, ...theme.typography.caption },
  smartIconWrap: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartTitle: { ...theme.typography.h4 },
  smartBody: { ...theme.typography.small, color: theme.colors.text.secondary },
  smartCta: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.xl,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  smartCtaText: { color: theme.colors.primary, ...theme.typography.small },

  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownTitle: { ...theme.typography.h4 },
  viewAll: { color: theme.colors.primary, ...theme.typography.small },

  breakdownList: { gap: theme.spacing.lg },
  breakItem: { gap: theme.spacing.sm },
  breakTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  breakIcon: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakLabelContainer: { gap: 2 },
  breakLabel: { ...theme.typography.body },
  breakMeta: { ...theme.typography.vSmall, color: theme.colors.text.secondary },
  breakAmount: { ...theme.typography.small },

  progressTrack: {
    height: 10,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.backgroundLight,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },

  breakBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
