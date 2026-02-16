import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { HomeStackNavigator } from './HomeStackNavigator';
import { MegaMenuStackNavigator } from './MegaMenuStackNavigator';
import { Routes } from './routes';
import { CustomTabBar } from '../components/navigation/CustomTabBar';

const Tab = createBottomTabNavigator();

const hideTabBar = (route: any) =>
  getFocusedRouteNameFromRoute(route) === Routes.PRODUCT_DETAILS ? { display: 'none' as const } : undefined;

// Placeholder screens for other tabs
const CartPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cart Screen</Text></View>;
const OrdersPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>My Orders Screen</Text></View>;
const ProfilePlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Profile Screen</Text></View>;

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      id="tabs"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={HomeStackNavigator}
        options={({ route }) => ({ tabBarStyle: hideTabBar(route) })}
      />
      <Tab.Screen name={Routes.CART} component={CartPlaceholder} />
      <Tab.Screen
        name={Routes.MEGA_MENU}
        component={MegaMenuStackNavigator}
        options={({ route }) => ({ tabBarStyle: hideTabBar(route) })}
      />
      <Tab.Screen name={Routes.MY_ORDERS} component={OrdersPlaceholder} />
      <Tab.Screen name={Routes.PROFILE} component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
};
