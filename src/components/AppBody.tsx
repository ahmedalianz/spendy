import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/theme';
interface AppBodyProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
}
const AppBody = ({ children, containerStyle }: AppBodyProps) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={[
        styles.containingContainer,
        { paddingBottom: bottom + 32 },
        containerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
  },
  containingContainer: {
    marginTop: theme.spacing.xl,
  },
});
export default AppBody;
