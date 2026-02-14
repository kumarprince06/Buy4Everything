import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: 'light-content' | 'dark-content';
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  backgroundColor = Theme.colors.background,
  statusBarColor = Theme.colors.background,
  barStyle = 'dark-content',
}) => {
  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView 
      style={[styles.safeArea, { backgroundColor }]} 
      edges={['top', 'left', 'right']}
    >
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
      <Container
        style={[styles.container, style]}
        contentContainerStyle={scrollable ? [styles.scrollContent, contentContainerStyle] : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
