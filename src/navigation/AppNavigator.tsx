import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { Theme } from '../theme';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OtpScreen } from '../screens/auth/OtpScreen';
import { TabNavigator } from './TabNavigator';
import { ProductDetailScreen } from '../screens/product/ProductDetailScreen';
import { CategoryListScreen } from '../screens/category/CategoryListScreen';

const Stack = createStackNavigator();

const headerOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: Theme.colors.primary },
  headerTintColor: Theme.colors.white,
  headerTitleStyle: { fontWeight: '600' as const, fontSize: 18 },
  headerBackTitleVisible: false,
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SPLASH}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.SPLASH} component={SplashScreen} />
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.OTP} component={OtpScreen} />
      <Stack.Screen name={Routes.MAIN_TABS} component={TabNavigator} />
      <Stack.Screen
        name={Routes.PRODUCT_DETAILS}
        component={ProductDetailScreen}
        options={{
          ...headerOptions,
          title: 'Product',
        }}
      />
      <Stack.Screen
        name={Routes.CATEGORY_LIST}
        component={CategoryListScreen}
        options={({ route }: any) => ({
          ...headerOptions,
          title: route.params?.categoryName ?? 'Category',
        })}
      />
    </Stack.Navigator>
  );
};
