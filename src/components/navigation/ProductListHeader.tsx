/**
 * ProductListHeader.tsx
 *
 * App Navigator for Product List: white bar, back + left-aligned title + search + filter.
 * Border below header (#ECECEC). Filter chips and data show below.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../theme';
import { Icons } from '../../assets/icons';
import { scale } from '../../utils/scale';

export function ProductListHeader() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const title = route.params?.categoryName ?? 'Product List';

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        hitSlop={{ top: scale(12), bottom: scale(12), left: scale(12), right: scale(12) }}
      >
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.searchButton} onPress={() => {}} activeOpacity={0.8}>
          <Image source={Icons.search} style={styles.searchIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={() => {}} activeOpacity={0.8}>
          <Image source={Icons.filter} style={styles.filterIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.l,
    paddingTop: scale(15),
    paddingBottom: scale(8),
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: scale(24),
    color: Theme.colors.text,
  },
  title: {
    flex: 1,
    ...Theme.typography.h2,
    color: Theme.colors.text,
    textAlign: 'left',
    marginLeft: Theme.spacing.s,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  /** Same as All Categories: light green circle, primary icon (Figma #D7FFD4) */
  searchButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#D7FFD4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: Theme.colors.primary,
  },
  filterIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: Theme.colors.primary,
  },
});
