import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../theme';

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
              <Icon 
                name="basket" 
                size={20} 
                color={isActive ? Theme.colors.black : Theme.colors.white} 
              />
            ) : (
              <Icon 
                name="lock-closed" 
                size={20} 
                color={isActive ? Theme.colors.black : Theme.colors.primary} 
              />
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
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.m,
    paddingBottom: Theme.spacing.s,
    gap: Theme.spacing.s,
  },
  tab: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  activeTab: {
    backgroundColor: Theme.colors.secondary, // Yellow
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
});
