import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OtpScreen } from '../screens/auth/OtpScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createStackNavigator();

/** App Navigator: splash, auth, then tabs (Product List / Details live inside tab stacks so tab bar is visible). */
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
    </Stack.Navigator>
  );
};
