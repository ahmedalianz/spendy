import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { LineChart, yAxisSides } from 'react-native-gifted-charts';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import { theme } from '@/theme';
import { formatMoney } from '@/utils/money';

const WIDTH = Dimensions.get('window').width;
interface MonthlyChartProps {
  goToInsights: () => void;
}
const MonthlyChart = ({ goToInsights }: MonthlyChartProps) => {
  return (
    <View style={styles.chartCardContainer}>
      <View style={styles.chartHeader}>
        <View style={styles.chartHeaderLeft}>
          <AppText style={styles.chartHeaderTitle} weight="bold">
            صرفت كام الشهر ده
          </AppText>
          <AppText style={styles.chartHeaderSubtitle}>اخر 30 يوم</AppText>
        </View>
        <View style={styles.chartHeaderTag}>
          <AppText style={styles.chartHeaderTagText} weight="bold">
            أعلي من الشهر اللي فات بـ 15%
          </AppText>
        </View>
      </View>
      <View style={styles.chart}>
        <LineChart
          data={[
            { value: 15 },
            { value: 30 },
            { value: 50 },
            { value: 605 },
            { value: 260 },
            { value: 40 },
            { value: 250 },
            { value: 1200 },
            { value: 450 },
          ]
            .slice()
            .reverse()}
          curved
          areaChart
          startFillColor={theme.colors.primary}
          startOpacity={0.2}
          endFillColor={theme.colors.primary}
          endOpacity={0.01}
          color={theme.colors.primary}
          thickness={3}
          hideDataPoints
          yAxisThickness={0}
          xAxisThickness={0}
          hideAxesAndRules
          yAxisSide={yAxisSides.RIGHT}
          width={WIDTH - theme.spacing.xxl}
        />
      </View>

      <View style={styles.chartFooter}>
        <View>
          <AppText style={styles.chartFooterLabel} weight="bold">
            اجمالي المصاريف
          </AppText>
          <AppText style={styles.chartFooterAmount} weight="bold">
            {formatMoney(10300)}
          </AppText>
        </View>
        <AppButton
          title="تفاصيل"
          onPress={goToInsights}
          style={styles.chartFooterButton}
          textStyle={styles.chartFooterButtonText}
          accessibilityLabel="انتقال إلى صفحة التحليلات"
          accessibilityHint="يعرض تحليلات مفصلة عن مصاريفك"
        />
      </View>
    </View>
  );
};

export default MonthlyChart;

const styles = StyleSheet.create({
  chartCardContainer: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    overflow: 'hidden',
    padding: theme.spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartHeaderLeft: {
    flexDirection: 'column',
  },
  chartHeaderTitle: {
    ...theme.typography.body,
  },
  chartHeaderSubtitle: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
  },
  chartHeaderTag: {
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    height: 24,
  },
  chartHeaderTagText: {
    color: theme.colors.primary,
    ...theme.typography.vSmall,
  },
  chart: {
    height: 210,
    marginVertical: theme.spacing.lg,
    overflow: 'hidden',
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  chartFooterLabel: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
  },
  chartFooterAmount: {
    ...theme.typography.h3,
  },
  chartFooterButton: {
    borderRadius: theme.radius.xxl,
  },
  chartFooterButtonText: {
    ...theme.typography.caption,
  },
});
