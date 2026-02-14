import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { AllCategoriesScreen } from '../screens/category/AllCategoriesScreen';
import { Routes } from './routes';
import { CustomTabBar } from '../components/navigation/CustomTabBar';

const Tab = createBottomTabNavigator();

// Placeholder screens for other tabs
const CartPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cart Screen</Text></View>;
const OrdersPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>My Orders Screen</Text></View>;
const ProfilePlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Profile Screen</Text></View>;

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={Routes.HOME} component={HomeScreen} />
      <Tab.Screen name={Routes.CART} component={CartPlaceholder} />
      <Tab.Screen name={Routes.MEGA_MENU} component={AllCategoriesScreen} />
      <Tab.Screen name={Routes.MY_ORDERS} component={OrdersPlaceholder} />
      <Tab.Screen name={Routes.PROFILE} component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
};
