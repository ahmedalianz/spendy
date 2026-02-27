import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AppText from '@/components/AppText';
import { theme } from '@/theme';

type Props = {
  title: string;
  description?: string;
  iconName: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

const EmptyState = ({
  title,
  description,
  iconName,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Icon name={iconName} size={28} color={theme.colors.primary} />
      </View>

      <View style={styles.textBlock}>
        <AppText style={styles.title} weight="bold">
          {title}
        </AppText>
        {description ? (
          <AppText style={styles.desc}>{description}</AppText>
        ) : null}
      </View>

      {(primaryActionLabel && onPrimaryAction) ||
      (secondaryActionLabel && onSecondaryAction) ? (
        <View style={styles.actionsRow}>
          {secondaryActionLabel && onSecondaryAction ? (
            <Pressable
              onPress={onSecondaryAction}
              style={[styles.btn, styles.btnGhost]}
              accessibilityRole="button"
            >
              <AppText style={styles.btnGhostText} weight="bold">
                {secondaryActionLabel}
              </AppText>
            </Pressable>
          ) : null}

          {primaryActionLabel && onPrimaryAction ? (
            <Pressable
              onPress={onPrimaryAction}
              style={[styles.btn, styles.btnPrimary]}
              accessibilityRole="button"
            >
              <AppText style={styles.btnPrimaryText} weight="bold">
                {primaryActionLabel}
              </AppText>
              <Icon
                name="chevron-back"
                size={16}
                color={theme.colors.text.surface}
              />
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    alignItems: 'center',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.xxl,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { gap: theme.spacing.xs, alignItems: 'center' },
  title: { ...theme.typography.h4, textAlign: 'center' },
  desc: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    width: '100%',
  },
  btn: {
    flex: 1,
    minHeight: 48,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  btnPrimary: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.small,
  },
  btnPrimaryText: {
    color: theme.colors.text.surface,
    ...theme.typography.small,
  },
  btnGhost: {
    backgroundColor: theme.colors.backgroundLight,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  btnGhostText: {
    color: theme.colors.text.primary,
    ...theme.typography.small,
  },
});
