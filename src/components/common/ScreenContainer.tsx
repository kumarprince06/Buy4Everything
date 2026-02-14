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

type SafeAreaEdge = 'top' | 'left' | 'right' | 'bottom';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  /** Override safe area edges; e.g. omit 'top' so content can extend under status bar */
  safeAreaEdges?: SafeAreaEdge[];
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  backgroundColor = Theme.colors.background,
  statusBarColor = Theme.colors.background,
  barStyle = 'dark-content',
  safeAreaEdges = ['top', 'left', 'right'],
}) => {
  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView 
      style={[styles.safeArea, { backgroundColor }]} 
      edges={safeAreaEdges}
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
