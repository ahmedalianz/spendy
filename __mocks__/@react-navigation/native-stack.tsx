import React from 'react';
import { Text } from 'react-native';

export const createNativeStackNavigator = () => ({
  Navigator: ({ children }: any) => <>{children}</>,
  Screen: ({ name }: any) => <Text testID={`screen-${name}`}>{name}</Text>,
});
