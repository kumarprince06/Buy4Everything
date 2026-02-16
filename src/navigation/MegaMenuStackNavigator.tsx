/**
 * MegaMenuStackNavigator.tsx
 * Stack for center tab: All Categories → Product List → Product Details. Tab bar stays visible.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AllCategoriesScreen } from '../screens/category/AllCategoriesScreen';
import { ProductListScreen } from '../screens/product/ProductListScreen';
import { ProductDetailScreen } from '../screens/product/ProductDetailScreen';
import { ProductListHeader } from '../components/navigation/ProductListHeader';
import { Routes } from './routes';
import { Theme } from '../theme';

const Stack = createStackNavigator();

export function MegaMenuStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
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
