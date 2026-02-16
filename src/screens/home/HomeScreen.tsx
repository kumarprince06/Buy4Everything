/**
 * HomeScreen.tsx
 *
 * Main home/dashboard screen. Renders (top to bottom):
 * - Green header: Grocery/Ecommerce tabs, greeting, location (with modal), search bar
 * - Banner carousel (overlaps header)
 * - Categories: horizontal list with icons (Fruits, Milk & Egg, etc.)
 * - Bestsellers: horizontal list of BestsellerCard
 * - Middle banner (single image)
 * - Shop by Offer: horizontal list of BestsellerCard
 * - Explore Trending Products: 4×3 grid (no horizontal scroll)
 * - City Best Seller: horizontal list of CityBestSellerCard
 *
 * Uses safe area insets for the green header; ScreenContainer handles scroll and safe edges.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { SearchBar } from '../../components/common/SearchBar';
import { AppTypeSelector } from '../../components/common/AppTypeSelector';
import { SectionHeader } from '../../components/common/SectionHeader';
import { BannerCarousel } from '../../components/common/BannerCarousel';
import { VegetableBanner } from '../../components/common/VegetableBanner';
import { BestsellerCard } from '../../components/product/BestsellerCard';
import { CityBestSellerCard } from '../../components/product/CityBestSellerCard';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/routes';
import { Theme } from '../../theme';
import { LocationSelectionModal } from '../../components/location/LocationSelectionModal';
import { Icons } from '../../assets/icons';
import { CATEGORIES } from '../../constants/categories';
import {
  BESTSELLERS,
  SHOP_BY_OFFER,
  CITY_BEST_SELLER,
  EXPLORE_TRENDING_PRODUCTS,
} from '../../constants/products';
import { MAIN_BANNERS } from '../../constants/banners';
import { scale, moderateScale } from '../../utils/scale';

/** Grid layout: 4 columns for trending products */
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRENDING_COLUMNS = 4;
const TRENDING_GAP = Theme.spacing.s;
const TRENDING_ITEM_WIDTH =
  (SCREEN_WIDTH - Theme.spacing.l * 2 - TRENDING_GAP * (TRENDING_COLUMNS - 1)) /
  TRENDING_COLUMNS;
import { Images } from '../../assets/images';
import { useLocation } from '../../hooks/useLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Header tabs: Grocery vs Ecommerce */
const TABS = [
  { id: 'grocery', label: 'Grocery' },
  { id: 'ecommerce', label: 'Ecommerce' },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('grocery');
  const {
    currentLocation,
    locationModalVisible,
    openLocationModal,
    closeLocationModal,
    updateLocation,
  } = useLocation();

  return (
    <ScreenContainer
      scrollable
      safeAreaEdges={['left', 'right', 'bottom']}
      statusBarColor={Theme.colors.primary}
      barStyle="light-content"
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.primary}
      />
      {/* Green header – toggles, greeting, location, search (per Figma). No logo. */}
      <View style={[styles.greenHeader, { paddingTop: insets.top }]}>
        <AppTypeSelector
          tabs={TABS}
          activeTabId={activeTab}
          onTabChange={setActiveTab}
        />
        <View style={styles.userSection}>
          <Text style={styles.greeting}>
            Hi, <Text style={styles.greetingName}>Prince</Text>
          </Text>
          <TouchableOpacity
            style={styles.locationRow}
            onPress={openLocationModal}
          >
            <Image
              source={Icons.locationPin}
              style={styles.locationPin}
              resizeMode="contain"
            />
            <View style={styles.locationTextAndIcon}>
              <Text style={styles.locationText} numberOfLines={1}>
                {currentLocation}
              </Text>
              <Image source={Icons.expandDown} style={styles.expandDownIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <SearchBar placeholder="Search anything" variant="onDark" />
      </View>

      {/* Carousel overlaps green header (sits on top of curved bottom) */}
      <View style={styles.carouselOverlap}>
        <BannerCarousel
          banners={MAIN_BANNERS}
          onBannerPress={banner => {
            console.log('Banner pressed:', banner);
          }}
        />
      </View>

      {/* Categories - white circle with yellow inner + icon */}
      <View style={styles.categorySection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT_LIST, {
                  categoryName: item.name,
                })
              }
            >
              <View style={styles.categoryCircleOuter}>
                <View style={styles.categoryCircleInner}>
                  {item.icon && (
                    <Image
                      source={item.icon}
                      style={styles.categoryImage}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </View>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Bestsellers */}
      <SectionHeader title="Bestsellers" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {BESTSELLERS.map(item => (
          <BestsellerCard
            key={item.id}
            product={item}
            onPress={() =>
              navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })
            }
            onAdd={() => {}}
          />
        ))}
      </ScrollView>

      {/* Middle Banner (below Bestsellers) */}
      <TouchableOpacity
        style={styles.middleBannerContainer}
        onPress={() => {}}
        activeOpacity={0.9}
      >
        <Image
          source={Images.middleBanner}
          style={styles.middleBannerImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Shop by Offer */}
      <SectionHeader title="Shop by Offer" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {SHOP_BY_OFFER.map(item => (
          <BestsellerCard
            key={item.id}
            product={item}
            onPress={() =>
              navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })
            }
            onAdd={() => {}}
          />
        ))}
      </ScrollView>

      {/* Explore Trending Products – 12 items in 4×3 grid with image, name and details */}
      <View style={styles.trendingSection}>
        <SectionHeader title="Explore Trending Products" />
        <View style={styles.trendingGrid}>
          {EXPLORE_TRENDING_PRODUCTS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.trendingGridItem,
                (index + 1) % TRENDING_COLUMNS === 0 &&
                  styles.trendingGridItemEnd,
              ]}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })
              }
              activeOpacity={0.9}
            >
              <View style={styles.trendingGridImageWrap}>
                <Image
                  source={item.image}
                  style={styles.trendingGridImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.trendingGridName} numberOfLines={2}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* City Best Seller */}
      <SectionHeader title="City Best Seller" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {CITY_BEST_SELLER.map(item => (
          <CityBestSellerCard
            key={item.id}
            product={item}
            onPress={() =>
              navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })
            }
            onAdd={() => {}}
          />
        ))}
      </ScrollView>

      <LocationSelectionModal
        visible={locationModalVisible}
        onClose={closeLocationModal}
        onConfirm={updateLocation}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  /** Green top bar: tabs, greeting, location, search (safe area top applied inline) */
  greenHeader: {
    backgroundColor: Theme.colors.primary,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: scale(28),
    borderBottomRightRadius: scale(28),
  },
  userSection: {
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.s,
    paddingBottom: Theme.spacing.xs,
  },
  greeting: {
    ...Theme.typography.h2,
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  greetingName: {
    fontWeight: '800',
    color: Theme.colors.secondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(6),
    tintColor: Theme.colors.primary,
  },
  locationTextAndIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    minWidth: 0,
  },
  locationText: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.white,
    flexShrink: 1,
    flexGrow: 0,
    maxWidth: '100%',
    opacity: 0.95,
    minWidth: 0,
  },
  expandDownIcon: {
    width: scale(12),
    height: scale(12),
    tintColor: Theme.colors.white,
  },
  carouselOverlap: {
    marginTop: -Theme.spacing.xl,
    zIndex: 1,
    marginBottom: Theme.spacing.l,
  },
  categorySection: {
    backgroundColor: Theme.colors.categoriesSection,
    paddingVertical: Theme.spacing.l,
    marginBottom: Theme.spacing.s,
  },
  categoryList: {
    paddingHorizontal: Theme.spacing.l,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: Theme.spacing.l,
  },
  categoryCircleOuter: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryCircleInner: {
    width: scale(58),
    height: scale(58),
    borderRadius: scale(29),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  categoryImage: {
    width: scale(60),
    height: scale(60),
    opacity: 1,
  },
  categoryName: {
    ...Theme.typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    width: scale(72),
    fontSize: moderateScale(11),
    color: Theme.colors.text,
  },
  productList: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.m,
  },
  trendingSection: {
    paddingVertical: Theme.spacing.m,
    marginBottom: Theme.spacing.xs,
  },
  trendingGrid: {
    backgroundColor: Theme.colors.trendingSection,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.s,
  },
  trendingGridItem: {
    width: TRENDING_ITEM_WIDTH,
    marginRight: TRENDING_GAP,
    marginBottom: TRENDING_GAP,
  },
  trendingGridItemEnd: {
    marginRight: 0,
  },
  trendingGridImageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: scale(12),
    backgroundColor: Theme.colors.white,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingGridImage: {
    width: '85%',
    height: '85%',
  },
  trendingGridName: {
    ...Theme.typography.caption,
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: Theme.colors.text,
    marginTop: Theme.spacing.xs,
    paddingHorizontal: scale(2),
  },
  trendingGridPrice: {
    ...Theme.typography.caption,
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: Theme.colors.primary,
    marginTop: scale(2),
  },
  middleBannerContainer: {
    marginBottom: Theme.spacing.xs,
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  middleBannerImage: {
    width: '100%',
    height: scale(150),
  },
  locationPin: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(6),
    tintColor: Theme.colors.white,
  },
});
