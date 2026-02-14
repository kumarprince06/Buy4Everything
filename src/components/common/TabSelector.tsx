import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';

interface Tab {
  id: string;
  label: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  activeTabId,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTabId === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTabId === tab.id && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
    gap: Theme.spacing.s,
  },
  tab: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Theme.colors.surface,
  },
  activeTab: {
    backgroundColor: Theme.colors.primary,
  },
  tabText: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
  },
  activeTabText: {
    color: Theme.colors.white,
  },
});
