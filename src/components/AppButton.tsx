import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import AppText from './AppText';

import { theme } from '@/theme';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
} & TouchableOpacityProps;

const AppButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  isLoading,
  ...props
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.surface} />
      ) : (
        <AppText
          style={[styles.text, textStyle]}
          testID={props?.testID ? `${props.testID}-text` : undefined}
          weight="bold"
        >
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xxl,
    ...theme.shadows.medium,
  },
  text: {
    color: theme.colors.text.surface,
    ...theme.typography.body,
  },
  buttonDisabled: { opacity: 0.7 },
});
export default AppButton;
