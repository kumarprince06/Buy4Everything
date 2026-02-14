import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { Routes } from './routes';
import { Theme } from '../theme';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder screens for other tabs
const CartPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cart Screen</Text></View>;
const MenuPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Mega Menu Screen</Text></View>;
const OrdersPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>My Orders Screen</Text></View>;
const ProfilePlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Profile Screen</Text></View>;

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textSecondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // Add icons later
        }}
      />
      <Tab.Screen
        name={Routes.CART}
        component={CartPlaceholder}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen
        name={Routes.MEGA_MENU}
        component={MenuPlaceholder}
        options={{
          tabBarLabel: 'Mega Menu',
        }}
      />
      <Tab.Screen
        name={Routes.MY_ORDERS}
        component={OrdersPlaceholder}
        options={{
          tabBarLabel: 'Orders',
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={ProfilePlaceholder}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
