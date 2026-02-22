import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AppText from '@/components/AppText';
import { theme } from '@/theme';

interface EmptyHomeScreenProps {
  onAddExpense?: () => void;
}

const EmptyHomeScreen = ({ onAddExpense }: EmptyHomeScreenProps) => {
  const handlePress = () => {
    onAddExpense?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.heroIconCircle}>
          <Icon name="leaf" size={40} color={theme.colors.primary} />
        </View>

        <AppText style={styles.heroTitle} weight="bold">
          ابدأ رحلتك مع مصاريفك
        </AppText>

        <AppText style={styles.heroSubtitle}>
          سجّل أول مصروف ليك علشان تتابع فلوسك وتشوف بتروح فين
        </AppText>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handlePress}
          style={styles.ctaButton}
          accessibilityRole="button"
          accessibilityLabel="Add first expense"
          accessibilityHint="Opens the form to add your first expense"
        >
          <View style={styles.ctaIconCircle}>
            <Icon name="add" size={20} color={theme.colors.primary} />
          </View>
          <AppText style={styles.ctaText} weight="bold">
            سجّل أول مصروف
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.tipCard}>
        <View style={styles.tipIconCircle}>
          <Icon name="bulb" size={22} color={theme.colors.primary} />
        </View>

        <View style={styles.tipContent}>
          <AppText style={styles.tipTitle} weight="bold">
            نصيحة صغيرة
          </AppText>
          <AppText style={styles.tipDescription}>
            الناس اللي مسيطرة على فلوسها بتسجّل المصروف أول ما يحصل. الموضوع مش
            بياخد أكتر من ٥ ثواني.{' '}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default EmptyHomeScreen;

const styles = StyleSheet.create({
  container: { gap: theme.spacing.xl },
  heroCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxxl,
    alignItems: 'center',
  },
  heroIconCircle: {
    width: 120,
    height: 120,
    borderRadius: theme.radius.full,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  heroTitle: {
    ...theme.typography.h2,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  heroSubtitle: {
    ...theme.typography.h4,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: theme.spacing.xxl,
  },
  ctaButton: {
    width: '100%',
    minHeight: 64,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  ctaIconCircle: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { color: theme.colors.text.surface, ...theme.typography.h3 },
  tipCard: {
    backgroundColor: '#F2F6FF',
    borderColor: '#DDE8FF',
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
  },
  tipIconCircle: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  tipContent: { flex: 1 },
  tipTitle: { ...theme.typography.h4, marginBottom: theme.spacing.xs },
  tipDescription: {
    color: theme.colors.text.secondary,
    ...theme.typography.body,
  },
});
