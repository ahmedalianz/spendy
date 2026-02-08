import React from 'react';
import { Text } from 'react-native';

export const createBottomTabNavigator = () => ({
  Navigator: ({ children }: any) => <>{children}</>,
  Screen: ({ name }: any) => <Text testID={`Tab-${name}`}>{name}</Text>,
});
