import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

import {
  RubikBold,
  RubikMedium,
  RubikRegular,
  RubikSemiBold,
} from '@/constants';
import { theme } from '@/theme';
interface AppTextProps extends TextProps {
  weight?: 'regular' | 'bold' | 'semiBold' | 'medium';
}
const AppText = ({ style, weight, ...props }: AppTextProps) => {
  const fontFamily =
    weight === 'bold'
      ? RubikBold
      : weight === 'semiBold'
      ? RubikSemiBold
      : weight === 'medium'
      ? RubikMedium
      : RubikRegular;
  return <Text style={[styles.default, { fontFamily }, style]} {...props} />;
};

const styles = StyleSheet.create({
  default: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
});

export default AppText;
