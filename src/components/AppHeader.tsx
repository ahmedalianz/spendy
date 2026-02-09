import React from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AppText from './AppText';

import { theme } from '@/theme';
interface AppHeaderProps {
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  testID?: string;
}
const AppHeader = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  testID,
}: AppHeaderProps) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.leftIconContainer}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={theme.colors.text.primary}
            onPress={onLeftPress}
          />
        )}
      </View>
      <View style={styles.titleContainer}>
        {title && (
          <AppText style={styles.title} weight="bold">
            {title}
          </AppText>
        )}
      </View>
      <View style={styles.rightIconContainer}>
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={20}
            color={theme.colors.text.primary}
            onPress={onRightPress}
          />
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  leftIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h3,
    textAlign: 'center',
  },
});
