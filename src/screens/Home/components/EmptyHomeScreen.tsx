import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

const EmptyHomeScreen = () => {
  return (
    <View style={styles.addExpenseContainer}>
      <Text>EmptyHomeScreen</Text>
    </View>
  );
};

export default EmptyHomeScreen;

const styles = StyleSheet.create({
  addExpenseContainer: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border.subtle,
    borderWidth: 1,
    borderRadius: theme.radius.xxl,
    ...theme.shadows.small,
    overflow: 'hidden',
    padding: theme.spacing.lg,
  },
});
