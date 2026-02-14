import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../theme';

// import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search anything",
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color={Theme.colors.textSecondary} />
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
    padding: Theme.spacing.l,
  },
  searchBar: {
    height: 48,
    backgroundColor: Theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
  },
  searchInput: {
    flex: 1,
    ...Theme.typography.bodyMedium,
    marginLeft: Theme.spacing.s,
  },
});
