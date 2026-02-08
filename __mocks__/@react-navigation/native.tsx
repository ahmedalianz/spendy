import React from 'react';
import { View } from 'react-native';

export const NavigationContainer = ({ children }: any) => (
  <View testID="navigation-container">{children}</View>
);

export const DarkTheme = {
  dark: true,
  colors: {},
};

export const DefaultTheme = {
  dark: false,
  colors: {},
};

export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
});

export const useRoute = () => ({
  params: {},
});
