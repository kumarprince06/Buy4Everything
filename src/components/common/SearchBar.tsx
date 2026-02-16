/**
 * SearchBar.tsx
 *
 * Reusable search input with optional variant for dark backgrounds (e.g. green header).
 * - default: standard background and icon
 * - onDark: white/light bar and icon suitable for use on primary (green) header
 *
 * Used on HomeScreen in the green header with variant="onDark".
 */

import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Theme } from '../../theme';
import { Icons } from '../../assets/icons';
import { scale, moderateScale } from '../../utils/scale';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  /** Use when bar sits on dark (e.g. green) background – white bar, dark icon */
  variant?: 'default' | 'onDark';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search anything",
  value,
  onChangeText,
  variant = 'default',
}) => {
  const isOnDark = variant === 'onDark';
  return (
    <View style={[styles.container, isOnDark && styles.containerOnDark]}>
      <View style={[styles.searchBar, isOnDark && styles.searchBarOnDark]}>
        <Image
          source={Icons.search}
          style={[styles.searchIcon, isOnDark && styles.searchIconOnDark]}
          resizeMode="contain"
        />
        <TextInput
          placeholder={placeholder}
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={Theme.colors.textSecondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.xs,
    paddingBottom: Theme.spacing.s,
  },
  searchBar: {
    height: scale(55),
    backgroundColor: Theme.colors.surface,
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: Theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: Theme.colors.textSecondary,
  },
  searchIconOnDark: {
    tintColor: Theme.colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    ...Theme.typography.bodyMedium,
    marginLeft: Theme.spacing.s,
    color: Theme.colors.text,
    fontSize: moderateScale(16),
  },
  containerOnDark: {
    paddingHorizontal: Theme.spacing.l,
  },
  searchBarOnDark: {
    backgroundColor: Theme.colors.white,
    borderWidth: 0,
    shadowColor: Theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
});
