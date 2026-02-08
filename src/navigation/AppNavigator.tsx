/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '@/screens/Home/HomeScreen';
import InsightsScreen from '@/screens/InsightsScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import TransactionsScreen from '@/screens/TransactionsScreen';
import { theme } from '@/theme';
import { RootStackParamList, RootTabsParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabsNavigator() {
  const { bottom } = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          height: bottom + 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'المحفظة',
          tabBarIcon: ({ color, size }) => (
            <Icon name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          title: 'المصاريف',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          title: 'الخلاصة',
          tabBarIcon: ({ color, size }) => (
            <Icon name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainStack" component={TabsNavigator} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
