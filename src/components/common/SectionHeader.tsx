import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Theme } from '../../theme';
import { Icons } from '../../assets/icons';

interface SectionHeaderProps {
  title: string;
  onSeeAllPress?: () => void;
  showSeeAll?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onSeeAllPress,
  showSeeAll = true,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showSeeAll && (
        <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllRow}>
          <Text style={styles.seeAll}>See All</Text>
          <Image source={Icons.seeAll} style={styles.seeAllIcon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.l,
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.m * 2.5,
  },
  title: {
    ...Theme.typography.h3,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  seeAll: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.primary,
    fontWeight: '700',
  },
  seeAllIcon: {
    width: 16,
    height: 16,
    // tintColor: Theme.colors.primary,
  },
});
