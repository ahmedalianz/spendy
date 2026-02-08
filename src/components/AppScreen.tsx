import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/theme';
interface AppScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
}
const AppScreen = ({ children, style }: AppScreenProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <LinearGradient
      style={[styles.container, { paddingTop: top }, style]}
      colors={theme.gradients.background}
    >
      {children}
    </LinearGradient>
  );
};

export default AppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
