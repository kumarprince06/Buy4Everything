/**
 * HomeStackNavigator.tsx
 * Stack for Home tab: Home → Product List → Product Details. Tab bar stays visible.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductListScreen } from '../screens/product/ProductListScreen';
import { ProductDetailScreen } from '../screens/product/ProductDetailScreen';
import { ProductListHeader } from '../components/navigation/ProductListHeader';
import { Routes } from './routes';
import { Theme } from '../theme';

const Stack = createStackNavigator();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
      <Stack.Screen
        name={Routes.PRODUCT_LIST}
        component={ProductListScreen}
        options={{
          headerShown: true,
          header: () => <ProductListHeader />,
          headerStatusBarHeight: undefined,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.PRODUCT_DETAILS}
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
