/**
 * AppTypeSelector.tsx
 *
 * Header tab selector (e.g. Grocery / Ecommerce) with icon and label per tab.
 * Active tab uses Theme.colors.selectorActive; inactive uses muted styling.
 * Icons come from Images (grocery, ecommerce). Used at top of HomeScreen.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';

interface Tab {
  id: string;
  label: string;
  icon?: any;
}

interface AppTypeSelectorProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}

export const AppTypeSelector: React.FC<AppTypeSelectorProps> = ({
  tabs,
  activeTabId,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              isActive && styles.activeTab,
              !isActive && styles.inactiveTab,
            ]}
            onPress={() => onTabChange(tab.id)}
          >
            {tab.id === 'grocery' ? (
              <Image source={Images.grocery} style={styles.tabIcon } resizeMode="contain" />
            ) : (
              <Image source={Images.ecommerce} style={[styles.tabIcon, !isActive && styles.tabIconInactive]} resizeMode="contain" />
            )}
            <Text
              style={[
                styles.tabText,
                isActive && styles.activeTabText,
                !isActive && styles.inactiveTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.m,
    paddingTop: Theme.spacing.m,
    paddingBottom: Theme.spacing.m,
    gap: Theme.spacing.l,
  },
  tab: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Theme.spacing.m,
  },
  activeTab: {
    backgroundColor: Theme.colors.selectorActive,
  },
  inactiveTab: {
    backgroundColor: Theme.colors.white,
  },
  tabText: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
  },
  activeTabText: {
    color: Theme.colors.black,
  },
  inactiveTabText: {
    color: Theme.colors.black,
  },
  tabIcon: {
    width: 30,
    height: 40,
  },
  tabIconInactive: {
    opacity: 0.9,
  },
});
