/**
 * AllCategoriesScreen.tsx
 *
 * Shown when the user taps the Explore/Mega button (center green button) in the bottom tab bar.
 * Displays "All categories" with a white header (back, title, search) and a 2-column grid of
 * category cards. Each card has a pastel background, category name, product count text, and image.
 * Tapping a card navigates to the category product list.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { Theme } from '../../theme';
import { Icons } from '../../assets/icons';
import { Routes } from '../../navigation/routes';
import { ALL_CATEGORIES, AllCategoryItem } from '../../constants/allCategories';
import { scale, moderateScale } from '../../utils/scale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = scale(12);
const PADDING_H = Theme.spacing.l;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (SCREEN_WIDTH - PADDING_H * 2 - CARD_GAP) / NUM_COLUMNS;

export const AllCategoriesScreen = () => {
  const navigation = useNavigation<any>();

  const renderCard = ({ item }: { item: AllCategoryItem }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: item.backgroundColor,
          borderWidth: 1,
          borderColor: item.borderColor,
        },
      ]}
      onPress={() =>
        navigation.navigate(Routes.PRODUCT_LIST, { categoryName: item.name })
      }
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardTextWrap}>
          <Text style={styles.cardTitle}>
            {item.name}
          </Text>
          <Text style={styles.cardCount}>
            {item.productCountText}
          </Text>
        </View>
        <View style={styles.cardImageWrap}>
          <Image
            source={item.image}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer backgroundColor={Theme.colors.white}>
      {/* Header: back + title on left, search on right */}
      <View style={styles.header}>
        <View style={styles.headerLeftGroup}>
          <TouchableOpacity
            style={styles.headerBackBtn}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={Icons.arrowBack}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All categories</Text>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => {}} activeOpacity={0.8}>
          <Image
            source={Icons.search}
            style={[styles.searchIcon, { tintColor: Theme.colors.primary }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 2-column grid */}
      <FlatList
        data={ALL_CATEGORIES}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: Theme.spacing.m,
    backgroundColor: Theme.colors.white,
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  headerBackBtn: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    width: scale(24),
    height: scale(24),
    tintColor: Theme.colors.text,
  },
  headerTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
    fontWeight: '700',
    marginLeft: scale(4),
  },
  /** Search: bg #D7FFD4, icon primary, no border (Figma) */
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
  },
  gridContent: {
    paddingHorizontal: PADDING_H,
    paddingTop: Theme.spacing.l,
    paddingBottom: Theme.spacing.xxl,
  },
  gridRow: {
    gap: CARD_GAP,
    marginBottom: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: scale(16),
    padding: Theme.spacing.m,
    minHeight: scale(100),
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTextWrap: {
    flex: 1,
    minWidth: 0,
    marginRight: Theme.spacing.s,
  },
  cardTitle: {
    ...Theme.typography.bodyMedium,
    fontSize: moderateScale(18),
    lineHeight: moderateScale(22),
    fontWeight: '700',
    width: '75%',
    color: Theme.colors.text,
    marginBottom: scale(4),
  },
  cardCount: {
    ...Theme.typography.caption,
    fontSize: moderateScale(11),
    color: Theme.colors.textSecondary,
    maxWidth: '75%',
    lineHeight: moderateScale(13),
  },
  /** Rounded image area on right of card (Figma) */
  cardImageWrap: {
    position: 'absolute',
    right: scale(-55),
    bottom: scale(-5),
    width: scale(100),
    height: scale(100),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '75%',
  },
});
