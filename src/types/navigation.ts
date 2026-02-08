import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// RootStack
//  ├─ Tabs Navigator
//  │ ├─ (Tab) Home
//  │ ├─ (Tab) Transactions
//  │ └─ (Tab) Insights
//  │
//  ├─ Settings Screen
//  └─ Onboarding Screen

export type RootStackParamList = {
  MainStack: undefined;
  Settings: undefined;
  Onboarding: undefined;
};

export type RootTabsParamList = {
  Home: undefined;
  Transactions: undefined;
  Insights: undefined;
};

// Screen Props

export type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
export type MainStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MainStack'
>;

export type HomeScreenProps = BottomTabScreenProps<RootTabsParamList, 'Home'>;

export type TransactionsScreenProps = BottomTabScreenProps<
  RootTabsParamList,
  'Transactions'
>;

export type InsightsScreenProps = BottomTabScreenProps<
  RootTabsParamList,
  'Insights'
>;
